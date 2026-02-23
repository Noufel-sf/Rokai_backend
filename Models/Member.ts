import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
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

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      trim: true,
    },

    currentStatus: {
      type: String,
      enum: ["student", "employee", "unemployed"],
      required: true,
    },

    universityName: {
      type: String,
      trim: true,
    },

    specialization: {
      type: String,
      trim: true,
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
      },
    ],

    otherSkills: {
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

    department:{
        type: String,
    },

    role: {
      type: String,
      enum: ["member", "new" , "admin"],
      default: "new",
    },


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Member", MemberSchema);