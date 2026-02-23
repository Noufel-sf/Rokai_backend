import express from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistration,
  deleteRegistration,
} from "../Controllers/NewMemberRegesterationController";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistration);
router.delete("/:id", deleteRegistration);

export default router;