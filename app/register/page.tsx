"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const [Success, setSuccess] = useState(false);

  async function RegisterUser(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
      options: {
        data: {
          name: Name,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user && data.session) {
      const { error: ProfileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          name: Name,
          email: Email,
        });

      if (ProfileError) {
        setMessage(ProfileError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setMessage("Account created successfully! 🎉");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setSuccess(true);
      setMessage(
        "Account created! Please check your email to confirm your account."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative">

      {/* SUCCESS POPUP */}
      {Success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-md">

          <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-[#101510] px-5 py-4 shadow-2xl shadow-green-500/10">

            <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
              <span className="text-green-400 text-lg">
                ✓
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Registration Successful
              </p>

              <p className="text-xs text-zinc-400 mt-0.5">
                {dataMessage(Message)}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* REGISTER CARD */}
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <span className="text-xl">
              ⚡
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            FIT<span className="text-purple-500">FORGE</span>
          </h1>

          <p className="text-zinc-500 text-xs mt-2">
            Forge your strongest self
          </p>

        </div>

        {/* HEADING */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Create Your Account
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            Start your fitness journey today.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={RegisterUser}
          className="rounded-3xl border border-white/10 bg-zinc-950 p-7 shadow-2xl shadow-purple-500/5 space-y-5"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Name
            </label>

            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
            />

            <p className="text-[11px] text-zinc-600 mt-2">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={Loading}
            className="w-full rounded-xl bg-purple-600 py-3.5 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-600/20"
          >
            {Loading ? "Creating Account..." : "Create Account"}
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

        {/* LOGIN */}
        <p className="text-center text-zinc-500 text-sm mt-7">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            className="text-purple-400 font-medium hover:text-purple-300 transition"
          >
            Login
          </button>
        </p>

      </div>

    </main>
  );
}

/* SUCCESS MESSAGE HELPER */
function dataMessage(Message: string) {
  if (Message.includes("Please check")) {
    return "Check your email for confirmation.";
  }

  return "Welcome to FitForge! Redirecting...";
}