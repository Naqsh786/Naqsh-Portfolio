import { useState, useRef, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileDataMutation } from "../redux/api/apiSlice";
import { FiSave, FiImage, FiArrowLeft, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/apiConfig";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfileData] = useUpdateProfileDataMutation();

  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
    imageUrl: "",
    availableForWork: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        role: profile.role || "",
        description: profile.description || "",
        imageUrl: profile.imageUrl || "",
        availableForWork: profile.availableForWork ?? true,
      });
      setImagePreview(profile.imageUrl || "");
    }
  }, [profile]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const token = localStorage.getItem("naqsh-admin-token");
        const res = await fetch(`${API_BASE_URL}/api/profile/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        finalImageUrl = data.imageUrl;
      }

      const profileDataToSave = {
        ...form,
        imageUrl: finalImageUrl,
      };

      await updateProfileData(profileDataToSave).unwrap();
      showMessage("Profile updated successfully!");
      setImageFile(null);
    } catch (err) {
      console.error("Save Error:", err);
      showMessage(err.data?.message || err.message || "Failed to save profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg bg-grid flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg bg-grid pt-24 pb-12 px-4 sm:px-6">
      {/* ── CUSTOM TOAST ── */}
      {message.text && (
        <div
          className={`fixed top-6 left-6 right-6 sm:left-auto sm:top-24 sm:right-6 z-[60] px-6 py-4 rounded-xl border-l-[6px] shadow-2xl flex items-center gap-4 animate-slide-up ${
            message.type === "error"
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

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin-naqsh")}
                className="p-2 bg-dark-card border border-gray-800 rounded-lg text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all"
              >
                <FiArrowLeft />
              </button>
              <h1 className="text-3xl font-black text-white">
                Edit <span className="gradient-text">Profile</span>
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-mono tracking-tight sm:ml-11">
              Customize your portfolio&apos;s personal details
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 animate-slide-up opacity-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload Row */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Profile Image
                </label>
                <label
                  className="block w-full aspect-square border-2 border-dashed border-gray-700 rounded-2xl p-2 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300 overflow-hidden relative group"
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-xl group-hover:opacity-50 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="bg-dark-bg/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                          Change Image
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <FiImage className="text-4xl text-gray-600" />
                      <p className="text-gray-500 text-sm text-center">
                        Upload Image<br />
                        <span className="text-xs text-gray-600">Max size: 5MB</span>
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Text Fields */}
              <div className="w-full md:w-2/3 space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">
                    Display Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Naqsh"
                    className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">
                    Professional Role <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Full-Stack Developer"
                    className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg bg-dark-surface cursor-pointer hover:border-gray-500 transition-colors">
                    <input
                      type="checkbox"
                      name="availableForWork"
                      checked={form.availableForWork}
                      onChange={handleChange}
                      className="w-5 h-5 accent-neon-green rounded bg-dark-bg border-gray-600"
                    />
                    <div>
                      <span className="block text-white font-medium text-sm">Available for work</span>
                      <span className="block text-gray-500 text-xs mt-0.5">Show &quot;Available for work&quot; badge to visitors</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <label className="block text-gray-400 text-sm font-medium mb-1.5">
                About / Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Talk about your experience, skills, and passion..."
                className="w-full px-4 py-3 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end pt-4 border-t border-gray-800">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:py-3 bg-neon-green text-dark-bg font-bold rounded-xl hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                <FiSave className={saving ? "animate-pulse" : ""} />
                {saving ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
