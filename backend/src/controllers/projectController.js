import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this project" });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    const projectCount = await Project.countDocuments({ user: req.user._id });
    if (projectCount >= 4) {
      return res.status(400).json({ message: "Project limit reached (max 4)" });
    }

    const project = await Project.create({
      title,
      description,
      color,
      user: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, color } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this project" });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, color },
      { new: true, runValidators: true }
    );

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();

    res.json({ message: "Project removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
