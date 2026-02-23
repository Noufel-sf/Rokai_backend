import { Request, Response } from "express";
import EventMember from "../Models/EventMember";

type StatusType = "pending" | "accepted" | "rejected";

interface PaginationQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: StatusType;
}



// CREATE
export const createRegistration = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);
    
    const registration = await EventMember.create(req.body);

    return res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



// GET ALL with pagination
export const getRegistrations = async (
  req: Request<{}, {}, {}, PaginationQuery>,
  res: Response
): Promise<Response> => {
  try {
    const { page = "1", limit = "10", status } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filter = status ? { status } : {};

    const total = await EventMember.countDocuments(filter);

    const registrations = await EventMember.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      data: registrations,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



// SEARCH + PAGINATION
export const searchRegistrations = async (
  req: Request<{}, {}, {}, PaginationQuery>,
  res: Response
): Promise<Response> => {
  try {
    const { page = "1", limit = "10", search = "" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filter = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await EventMember.countDocuments(filter);

    const registrations = await EventMember.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      data: registrations,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



// GET ONE
export const getRegistration = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const registration = await EventMember.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.json({
      success: true,
      data: registration,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



// DELETE
export const deleteRegistration = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const registration = await EventMember.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.json({
      success: true,
      message: "Registration deleted",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



// CHANGE STATUS
export const changeStatus = async (
  req: Request<{ id: string }, {}, { status: StatusType }>,
  res: Response
): Promise<Response> => {
  try {
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const registration = await EventMember.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.json({
      success: true,
      data: registration,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};