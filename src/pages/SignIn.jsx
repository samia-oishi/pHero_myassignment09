import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";

export const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Sign in error:", err);
      const friendly =
        err?.code === "auth/user-not-found"
          ? "No account found with this email."
          : err?.code === "auth/wrong-password"
          ? "Wrong password. Please try again."
          : err?.code === "auth/too-many-requests"
          ? "Too many failed attempts. Try again later."
          : err?.message || "Sign in failed";
      setError(friendly);
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  // inside src/pages/SignIn.jsx (component scope)
  const handleForgetPassword = () => {
    const email = emailRef.current?.value?.trim() || "";

    if (!email) {
      // optional friendly hint before navigating
      toast("Enter your email on the next page to reset password");
    }

    // navigate to forgot-password route and pass the email as state
    navigate("/forgot-password", { state: { email } });
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      // This opens a popup for Google sign-in
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      // Redirect to originally requested page or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      // Friendly messages for common cases
      const code = err?.code || "";
      if (code === "auth/popup-closed-by-user") {
        toast.error("Popup closed before completing sign-in.");
      } else if (code === "auth/cancelled-popup-request") {
        toast.error("Cancelled previous popup request. Try again.");
      } else {
        toast.error(err?.message || "Google sign-in failed");
      }
      setError(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="card w-full max-w-md shadow-2xl bg-linear-to-br from-blue-200 via-gray-100 to-purple-200 text-black">
        <div className="card-body">
          <h2 className="text-3xl font-semibold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Sign in to continue to PetCare
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-gray-100 border-gray-400"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="input input-bordered w-full pr-12 bg-gray-100 border-gray-400"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox border-gray-400 text-black"
                />
                <span className="text-sm">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm link link-hover"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {error && (
            <div className="mt-3">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <div className="divider">OR</div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-3"
              disabled={loading}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <p className="text-center text-sm">
              New to our Website?{" "}
              <Link className="text-primary underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
