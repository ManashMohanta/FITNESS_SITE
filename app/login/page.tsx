"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const [Success, setSuccess] = useState(false);

  async function LoginUser(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const { error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    // SUCCESS
    setSuccess(true);
    setMessage("Login successful! Welcome back 🎉");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1200);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] px-4 relative">

      {/* SUCCESS POPUP */}
      {Success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-[#101510] px-5 py-4 shadow-2xl shadow-green-500/10">

            <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
              <span className="text-green-400 text-lg">
                ✓
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Login Successful
              </p>

              <p className="text-xs text-zinc-400 mt-0.5">
                Welcome back! Redirecting...
              </p>
            </div>

          </div>
        </div>
      )}

      {/* LOGIN CARD */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl shadow-purple-500/5">

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center">
            <span className="text-xl">
              ⚡
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            FIT<span className="text-purple-500">FORGE</span>
          </h1>

          <p className="text-zinc-500 text-xs mt-2">
            Forge your strongest self
          </p>

        </div>

        {/* HEADING */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Login to continue your fitness journey.
          </p>
        </div>

        <form onSubmit={LoginUser} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={Loading}
            className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-600/20"
          >
            {Loading ? "Logging in..." : "Login"}
          </button>

          {/* ERROR */}
          {Message && !Success && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-center text-sm text-red-400">
                {Message}
              </p>
            </div>
          )}

        </form>

        {/* REGISTER */}
        <p className="text-center text-zinc-500 text-sm mt-7">
          Don't have an account?{" "}

          <a
            href="/register"
            className="text-purple-400 font-medium hover:text-purple-300 transition"
          >
            Register
          </a>
        </p>

      </div>

    </main>
  );
}