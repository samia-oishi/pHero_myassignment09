import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../Firebase/firebase.config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

export const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", photo: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoadingAuth(false);
      if (u) {
        setForm({ name: u.displayName || "", photo: u.photoURL || "" });
      }
    });
    return () => unsub();
  }, []);

  if (loadingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="card w-full max-w-md shadow-lg bg-base-100">
          <div className="card-body text-center">
            <h2 className="text-2xl font-semibold">You are not signed in</h2>
            <p className="text-sm text-gray-500 my-3">
              Please sign in to view and update your profile.
            </p>
            <div className="flex justify-center gap-2">
              <Link to="/signin" className="btn btn-primary">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-ghost">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setForm({ name: user.displayName || "", photo: user.photoURL || "" });
    setEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter a display name.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: form.name.trim(),
        photoURL: form.photo.trim() || null,
      });

      setUser((u) => ({
        ...u,
        displayName: form.name.trim(),
        photoURL: form.photo.trim() || null,
      }));

      toast.success("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      console.error("updateProfile error:", err);
      toast.error("Failed to update profile. Try again.");
    }
  };

  return (
    <div className="min-h-[70vh] p-6 flex items-start justify-center">
      <div className="card w-full max-w-3xl shadow-lg bg-linear-to-br from-blue-200 via-gray-300 to-purple-200 text-black p-5">
        <div className="card-body">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-gray-500">
            View and edit your account information.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-200 shadow">
                <img
                  src={user.photoURL || "/src/assets/HeaderImg/logo.jpg"}
                  alt={user.displayName || "Avatar"}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">Signed in as</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Profile Info</h2>
                <p className="text-sm text-gray-500">
                  Your public display name and image.
                </p>
              </div>

              {!editing && (
                <div className="space-y-3">
                  <div>
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <div className="input input-bordered bg-gray-100 w-full break-words whitespace-normal">
                      {user.displayName || (
                        <span className="text-gray-400">No name set</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <div className="input input-bordered bg-gray-100 w-full break-words whitespace-normal">
                      {user.email}
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Image URL</span>
                    </label>

                    <div className="input input-bordered bg-gray-100 w-full break-words whitespace-pre-wrap">
                      {user.photoURL ? (
                        <span style={{ wordBreak: "break-word" }}>
                          {user.photoURL}
                        </span>
                      ) : (
                        <span className="text-gray-400">No image set</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditing(true)}
                    >
                      Update Profile
                    </button>

                    <button
                      className="btn btn-ghost"
                      onClick={() => navigate("/")}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}

              {editing && (
                <form onSubmit={handleUpdate} className="mt-6 space-y-3">
                  <div>
                    <label className="label">
                      <span className="label-text">Display Name</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-gray-100"
                      placeholder="Display name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>

                    <textarea
                      name="photo"
                      value={form.photo}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full break-words bg-gray-100"
                      placeholder="https://..."
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
