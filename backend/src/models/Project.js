import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
      maxlength: [100, "Project title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
      trim: true,
      maxlength: [
        500,
        "Project description cannot be more than 500 characters",
      ],
    },
    color: {
      type: String,
      default: "#3563E9",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
