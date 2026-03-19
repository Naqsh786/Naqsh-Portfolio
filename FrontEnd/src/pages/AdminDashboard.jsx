import { useState, useRef } from "react";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../redux/api/apiSlice";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiX,
  FiSave,
  FiImage,
  FiLogOut,
  FiUser
} from "react-icons/fi";
import { FaTerminal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/apiConfig";

const emptyForm = {
  title: "",
  description: "",
  liveLink: "",
  githubLink: "",
  techStack: "",
  imageUrl: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: projects = [], isLoading: loading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("naqsh-admin-token");
    navigate("/");
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImageUrl = form.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const token = localStorage.getItem("naqsh-admin-token");
        const res = await fetch(`${API_BASE_URL}/api/projects/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        finalImageUrl = data.imageUrl;
      }

      const projectData = {
        ...form,
        imageUrl: finalImageUrl,
        techStack: form.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateProject({ id: editingId, ...projectData }).unwrap();
        showMessage("Project updated successfully!");
      } else {
        await createProject(projectData).unwrap();
        showMessage("New project added to portfolio!");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      console.error("Save Error:", err);
      showMessage(err.data?.message || err.message || "Failed to save project.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      techStack: (project.techStack || []).join(", "),
      imageUrl: project.imageUrl || "",
    });
    setImageFile(null);
    setImagePreview(project.imageUrl || "");
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDestroy = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteProject(deleteConfirm).unwrap();
      showMessage("Project deleted from database");
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete Error:", err);
      showMessage("Failed to delete project. Check your connection.", "error");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-grid pt-24 pb-12 px-4 sm:px-6">
      {/* ── CUSTOM TOAST ── */}
      {message.text && (
        <div
          className={`fixed top-6 left-6 right-6 sm:left-auto sm:top-24 sm:right-6 z-[60] px-6 py-4 rounded-xl border-l-[6px] shadow-2xl flex items-center gap-4 animate-slide-up ${message.type === "error"
            ? "bg-red-500/10 border-red-500 text-red-500 glass"
            : "bg-neon-green/10 border-neon-green text-neon-green glass"
            }`}
        >
          <div className={`p-2 rounded-lg flex-shrink-0 ${message.type === "error" ? "bg-red-500/20" : "bg-neon-green/20"}`}>
            {message.type === "error" ? <FiX className="text-xl" /> : <FiSave className="text-xl" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm tracking-wide truncate">
              {message.type === "error" ? "System Error" : "System Notification"}
            </h4>
            <p className="text-xs font-mono opacity-80 truncate">{message.text}</p>
          </div>
          <button
            onClick={() => setMessage({ text: "", type: "" })}
            className="p-1 hover:opacity-60 transition-opacity flex-shrink-0"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative glass p-8 rounded-2xl border border-red-500/30 max-w-sm w-full text-center animate-fade-in">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
              <FiTrash2 className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Confirm Delete?</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              This action cannot be undone. This project will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDestroy}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border border-gray-700 text-gray-400 font-medium rounded-xl hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FaTerminal className="text-neon-green text-xl" />
              <h1 className="text-3xl font-black text-white">
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-mono tracking-tight cursor-default">
              Manage your portfolio projects with ease
            </p>
          </div>
          {!showForm && (
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate("/admin-naqsh/profile")}
                className="flex items-center justify-center gap-2 bg-dark-card border border-gray-800 text-gray-300 px-4 py-3 sm:px-6 rounded-xl font-bold hover:text-neon-green hover:border-neon-green/30 transition-all duration-300 transform active:scale-95 text-sm sm:text-base"
              >
                <FiUser className="text-lg sm:text-xl" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 bg-neon-green text-dark-bg px-4 py-3 sm:px-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300 transform active:scale-95 text-sm sm:text-base"
              >
                <FiPlus className="text-lg sm:text-xl" />
                <span>Add Project</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 sm:px-6 rounded-xl font-bold hover:bg-red-500/20 transition-all duration-300 transform active:scale-95 text-sm sm:text-base"
              >
                <FiLogOut className="text-lg sm:text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {showForm && (
          <div className="glass rounded-xl p-4 sm:p-6 md:p-8 mb-10 animate-slide-up opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your project..."
                  className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all resize-none"
                />
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-gray-400 text-sm font-medium mb-1.5">
                    <FiExternalLink className="text-xs" /> Live Link
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={form.liveLink}
                    onChange={handleChange}
                    placeholder="https://myproject.vercel.app"
                    className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-gray-400 text-sm font-medium mb-1.5">
                    <FiGithub className="text-xs" /> GitHub Link
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={form.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/user/repo"
                    className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">
                  Tech Stack{" "}
                  <span className="text-gray-600">(comma separated)</span>
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={form.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, Express"
                  className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-1.5 text-gray-400 text-sm font-medium mb-1.5">
                  <FiImage className="text-xs" /> Project Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300 min-h-[120px]"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FiImage className="text-3xl text-gray-600" />
                      <p className="text-gray-500 text-sm text-center">
                        Click to upload image<br />
                        <span className="text-xs text-gray-600">JPG, PNG, WEBP supported</span>
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(""); setForm({...form, imageUrl: ""}); }}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    ✕ Remove image
                  </button>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:py-3 bg-neon-green text-dark-bg font-bold rounded-xl hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave />
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Project"
                      : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-4 sm:py-3 border border-gray-700 text-gray-400 font-medium rounded-xl hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 font-mono">
            Projects ({projects.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 glass rounded-xl">
              <p className="text-gray-500 text-lg mb-2">No projects yet</p>
              <p className="text-gray-600 text-sm">
                Click &quot;Add Project&quot; to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glow-border"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base break-all">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 break-all">
                      {project.description}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20 break-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 sm:flex-initial p-3 rounded-lg border border-gray-700 text-gray-400 hover:border-neon-green/50 hover:text-neon-green transition-all duration-300 flex items-center justify-center"
                      title="Edit"
                    >
                      <FiEdit2 />
                      <span className="sm:hidden ml-2 text-xs font-bold uppercase tracking-wider">Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(project._id)}
                      className="flex-1 sm:flex-initial p-3 rounded-lg border border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 flex items-center justify-center"
                      title="Delete"
                    >
                      <FiTrash2 />
                      <span className="sm:hidden ml-2 text-xs font-bold uppercase tracking-wider">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
