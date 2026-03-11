import mongoose from "mongoose";

const EventMemberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    currentStatus: {
      type: String,
      enum: ["student", "employee", "unemployed" , "freelancer"],
      required: true,
    },

    motivation: {
      type: String,
      required: true,
      trim: true,
    },

    hasAttendedBefore: {
      type: Boolean,
      required: true,
    },

    agreeTerms: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.EventMember ||
  mongoose.model("EventMember", EventMemberSchema);