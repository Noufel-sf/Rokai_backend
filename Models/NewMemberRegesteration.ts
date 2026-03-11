import mongoose from "mongoose";

const NewMemberRegistrationSchema = new mongoose.Schema(
  {
  
    submittedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    birthDate: {
      type: Date,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    currentStatus: {
      type: String,
      enum: ["student", "employee", "unemployed" , "freelancer"],
    },

    specialization: {
      type: String,
      trim: true,
    },

    universityName: {
      type: String,
      trim: true,
    },

    academicYear: {
      type: String,
    },

    discoverySource: {
      type: String,
    },

    discoveryOther: {
      type: String,
    },

    favoriteActivity: {
      type: String,
    },

    contributionActivity: {
      type: String,
    },

    improvementIdea: {
      type: String,
    },

    hasVolunteered: {
      type: Boolean,
      default: false,
    },

    volunteerDesc: {
      type: String,
    },

    participatedInOrganizing: {
      type: Boolean,
      default: false,
    },

    organizationName: {
      type: String,
    },

    tasksDescription: {
      type: String,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    otherSkills: {
      type: String,
    },

    certifications: {
      type: String,
    },

    activityIdeas: {
      type: String,
    },

    motivation: {
      type: String,
      required: true,
    },

    commitmentLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    lifeBalance: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Registration", NewMemberRegistrationSchema);