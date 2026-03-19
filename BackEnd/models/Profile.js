import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Naqsh",
    },
    role: {
      type: String,
      default: "Full-Stack Developer",
    },
    description: {
      type: String,
      required: true,
      default: "I craft modern, performant web applications with clean code and stunning user experiences. Specializing in the MERN Stack.",
    },
    imageUrl: {
      type: String,
      default: "/profile_premium.png",
    },
    availableForWork: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
