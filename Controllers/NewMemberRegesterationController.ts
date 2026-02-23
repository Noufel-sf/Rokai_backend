import { Request, Response } from "express"
import Registration from "../Models/NewMemberRegesteration"



/* =========================
   TYPES
========================= */

interface RegistrationQuery {
  page?: string
  limit?: string
  search?: string
}

interface StatusBody {
  status: "pending" | "approved" | "rejected"
}



/* =========================
   CREATE REGISTRATION
========================= */

export const createRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const registration = await Registration.create(req.body)

    res.status(201).json({
      success: true,
      data: registration,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



/* =========================
   GET ALL REGISTRATIONS
   Pagination + Search
========================= */

export const getRegistrations = async (
  req: Request<{}, {}, {}, RegistrationQuery>,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const search = req.query.search || ""

    const query = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { registrationId: { $regex: search, $options: "i" } },
          ],
        }
      : {}

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Registration.countDocuments(query)

    res.json({
      success: true,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      data: registrations,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



/* =========================
   GET SINGLE REGISTRATION
========================= */

export const getRegistration = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id)

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Registration not found",
      })
      return
    }

    res.json({
      success: true,
      data: registration,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



/* =========================
   DELETE REGISTRATION
========================= */

export const deleteRegistration = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id)

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Registration not found",
      })
      return
    }

    res.json({
      success: true,
      message: "Registration deleted successfully",
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



/* =========================
   UPDATE STATUS
========================= */

export const updateRegistrationStatus = async (
  req: Request<{ id: string }, {}, StatusBody>,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body

    if (!["pending", "approved", "rejected"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid status value",
      })
      return
    }

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!registration) {
      res.status(404).json({
        success: false,
        message: "Registration not found",
      })
      return
    }

    res.json({
      success: true,
      data: registration,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}