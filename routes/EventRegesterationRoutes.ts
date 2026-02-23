import express from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistration,
  deleteRegistration,
  changeStatus,
  searchRegistrations,
} from "../Controllers/EventRegesterationController";

const router = express.Router();

router.post("/", createRegistration);

router.get("/", getRegistrations);

router.get("/q", searchRegistrations);

router.get("/:id", getRegistration);

router.delete("/:id", deleteRegistration);

router.patch("/:id/status", changeStatus);

export default router;