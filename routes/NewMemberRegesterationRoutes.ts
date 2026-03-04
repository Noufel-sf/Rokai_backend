import express from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistration,
  deleteRegistration,
  updateRegistrationStatus,
} from "../Controllers/NewMemberRegesterationController";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistration);
router.patch("/:id/status", updateRegistrationStatus);
router.delete("/:id", deleteRegistration);

export default router;