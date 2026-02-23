import express from "express";
import {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
  changeRole,
} from "../Controllers/MembersController";

const router = express.Router();

router.post("/", createMember);

router.get("/", getMembers);

router.get("/:id", getMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

router.patch("/:id/role", changeRole);

export default router;