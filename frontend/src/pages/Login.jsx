
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message || "Login successful!");
      setPassword("");

      setIsLoggedIn(true);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  
   
return (
  <div className="min-h-[calc(100vh-80px)] bg-[#FAF9F6] px-4 py-10 sm:py-16">
    <div className="mx-auto max-w-md">

      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#557653] text-2xl font-bold text-white shadow-lg shadow-[#557653]/20">
          C
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#71816E]">
          Campus Marketplace
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-[#2F4032]">
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#7C857A]">
          Log in to discover what your campus community has to offer.
        </p>
      </div>

      {/* Login Card */}
      <div className="rounded-3xl border border-[#E8E7DF] bg-white p-6 shadow-[0_12px_40px_rgba(48,64,48,0.06)] sm:p-8">

        <h2 className="text-xl font-bold text-[#344437]">
          Log in to your account
        </h2>

        <p className="mt-1 text-sm text-[#879083]">
          Enter your registered email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#465747]"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[#DCE4D8] bg-white px-4 py-3 text-sm text-[#344437] outline-none transition placeholder:text-[#A0AAA0] focus:border-[#789477] focus:ring-4 focus:ring-[#789477]/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#465747]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#DCE4D8] bg-white px-4 py-3 text-sm text-[#344437] outline-none transition placeholder:text-[#A0AAA0] focus:border-[#789477] focus:ring-4 focus:ring-[#789477]/10"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div
              role="status"
              className="rounded-xl border border-[#DCE6D8] bg-[#F0F5EC] px-4 py-3 text-sm text-[#426442]"
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-[#557653] px-4 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-[#426342] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#789477]/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8EDE5]" />
          <span className="text-xs font-medium text-[#9AA395]">OR</span>
          <div className="h-px flex-1 bg-[#E8EDE5]" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-[#718071]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#557653] transition hover:text-[#344936] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-[#929A8F]">
        Your campus marketplace starts here.
      </p>
    </div>
  </div>
);

}

export default Login;
