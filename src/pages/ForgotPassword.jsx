import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

export const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = (location.state && location.state.email) || "";
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = (email || "").trim();
    if (!trimmed) {
      toast.error("Please enter your email to reset password.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, trimmed);

      toast.success("Password reset email sent. Opening Gmail...");

      try {
        window.open("https://mail.google.com", "_blank");
      } catch (openErr) {
        console.warn("Could not open Gmail:", openErr);
      }

      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("sendPasswordResetEmail error:", err);
      const code = err?.code || "";
      const friendly =
        code === "auth/user-not-found"
          ? "No account found with this email."
          : code === "auth/invalid-email"
          ? "Please enter a valid email address."
          : err?.message || "Failed to send reset email.";
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="card w-full max-w-md shadow-2xl bg-gray-100 text-black">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Reset your password
          </h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Enter the email for the account and we'll send a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-500">Email</span>
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered w-full bg-gray-100 border-gray-400"
                required
                autoComplete="email"
              />
            </div>

            <div className="flex gap-3 items-center">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Reset password"}
              </button>

              <Link to="/signin" className="btn btn-ghost">
                Back to Sign In
              </Link>
            </div>
          </form>

          <div className="divider">OR</div>
          <p className="text-sm text-center">
            Haven't registered yet?{" "}
            <Link to="/signup" className="text-primary underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
