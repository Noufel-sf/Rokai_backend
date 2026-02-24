import { Request, Response } from "express";
import Member from "../Models/Member";

type RoleType = "عضو" | "منخرط";

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: RoleType;
}


export const createMember = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const member = await Member.create(req.body);

    return res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const getMembers = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
): Promise<Response> => {
  try {
    const { page = "1", limit = "10", search = "", role } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};

    if (role) filter.role = role;

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Member.countDocuments(filter);

    const members = await Member.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      data: members,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const getMember = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateMember = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteMember = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.json({
      success: true,
      message: "Member deleted",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


export const changeRole = async (
  req: Request<{ id: string }, {}, { role: RoleType }>,
  res: Response
): Promise<Response> => {
  try {
    const { role } = req.body;

    if (!["member", "new" , "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};