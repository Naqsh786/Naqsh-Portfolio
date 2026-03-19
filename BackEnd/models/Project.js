import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
      default: "",
    },
    githubLink: {
      type: String,
      trim: true,
      default: "",
    },
    techStack: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema, "projects");
