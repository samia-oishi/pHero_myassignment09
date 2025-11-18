import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    if (!/[A-Z]/.test(pwd))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pwd))
      return "Password must contain at least one lowercase letter.";
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword((s) => !s);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setPwError("");

    const name = event.target.name.value.trim();
    const photo = event.target.photo.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    const terms = !!event.target.terms.checked;

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const pwErr = validatePassword(password);
    if (pwErr) {
      setPwError(pwErr);
      return;
    }

    if (!terms) {
      setError("Please accept our terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // update profile
      try {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo || null,
        });
      } catch (upErr) {
        console.error("updateProfile error:", upErr);
      }

      try {
        await signOut(auth);
      } catch (signOutErr) {
        console.error("signOut error after signup:", signOutErr);
      }

      toast.success("Account created. Please sign in.");
      event.target.reset();
      navigate("/signin");
    } catch (err) {
      console.error("signup error:", err);
      const code = err?.code || err?.message || "";
      if (
        code.includes("auth/email-already-in-use") ||
        code === "EMAIL_EXISTS"
      ) {
        setError("An account with this email already exists.");
        toast.error("An account with this email already exists.");
      } else if (
        code.includes("auth/weak-password") ||
        code.startsWith("WEAK_PASSWORD")
      ) {
        setPwError("Password must be at least 6 characters long.");
        toast.error("Password must be at least 6 characters long.");
      } else if (code.includes("operation-not-allowed")) {
        setError("Sign-up method is not enabled in Firebase Console.");
        toast.error("Sign-up method is not enabled in Firebase Console.");
      } else {
        setError("Signup failed. " + (err?.message || ""));
        toast.error("Signup failed.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate(location?.state || "/");
    } catch (err) {
      toast.error("Google sign-in failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 ">
      <div className="card w-full max-w-lg shadow-2xl bg-linear-to-br from-blue-200 via-gray-200 to-purple-200 text-black">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center">Create an account</h1>
          <p className="text-sm text-center text-gray-500 mb-4">
            Sign up to access all PetCare features
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-500">Name</span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full bg-gray-100 border-gray-400"
                placeholder="Full name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-500">Photo URL</span>
              </label>
              <input
                name="photo"
                type="url"
                className="input input-bordered w-full bg-gray-100 border-gray-400"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-500">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-gray-100 border-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-500">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-14 bg-gray-100 border-gray-400"
                  placeholder="Create a password"
                  required
                  onChange={(e) => setPwError(validatePassword(e.target.value))}
                />
                <button
                  onClick={handleTogglePasswordShow}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {pwError ? (
                <p className="text-sm text-red-500 mt-2">{pwError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  Password must contain uppercase, lowercase and be at least 6
                  characters.
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                className="checkbox border-gray-400 text-black"
              />
              <label className="text-sm text-black">
                Accept our Terms and Conditions
              </label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-3"
            disabled={loading}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <div className="divider my-4">OR</div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
