import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to access profile ❌");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
        setForm(data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  //  Handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("/api/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message || "Profile updated ✅");
      setUser(data.user);
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed ❌");
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.warn("Please fill all password fields ⚠️");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "/api/users/change-password",
        passwordForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message || "Password changed ✅");
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed ❌");
    }
  };

  const handleLogout = () => setConfirmLogout(true);

  const confirmLogoutAction = () => {
    localStorage.removeItem("token");
    setConfirmLogout(false);
    toast.info("👋 Logged out successfully", { autoClose: 1200 });
    setTimeout(() => navigate("/login"), 1300);
  };

  const cancelLogoutAction = () => {
    setConfirmLogout(false);
    toast.info("Logout cancelled 🙌", { autoClose: 1000 });
  };

  
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600 px-4">
        <p className="text-lg mb-3 text-center">
          Please log in to view your profile 🔒
        </p>
        <a
          href="/login"
          className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
        >
          Go to Login
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
         👤 My Account
        </h2>

        {/* Profile Fields */}
        <div className="space-y-5">
          {["name", "email", "mobile"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-600 mb-2 capitalize">
                {field}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full p-3 rounded-xl border text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 ${
                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 py-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-700 text-white shadow-md hover:opacity-90 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 py-2 rounded-xl bg-gray-300 text-gray-700 shadow-sm hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-700 text-white shadow-md hover:scale-105 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Password Section */}
        <div className="mt-8 border-t pt-6">
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full py-2 rounded-xl bg-linear-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:scale-105 transition"
          >
            {showPasswordForm ? "Close Password Form" : "Change Password"}
          </button>

          {showPasswordForm && (
            <div className="mt-5 space-y-4">
              {/* Current Password */}
              <div className="relative">
                <input
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current Password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border rounded-xl pr-10 focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border rounded-xl pr-10 focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                onClick={handlePasswordSave}
                className="w-full py-2 rounded-xl bg-linear-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:opacity-90 transition"
              >
                Save Password
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 py-2 rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white shadow-md hover:scale-105 transition"
        >
          Logout
        </button>

        {/* Logout Modal */}
        {confirmLogout && (
          <div className="absolute inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Are you sure you want to logout?
              </h3>
              <div className="flex justify-center gap-3">
                <button
                  onClick={confirmLogoutAction}
                  className="bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={cancelLogoutAction}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

