"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  const [Goal, setGoal] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [GoalWeight, setGoalWeight] = useState("");

  const [Loading, setLoading] = useState(true);
  const [Saving, setSaving] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    LoadProfile();
  }, []);

  async function LoadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: Profile, error } = await supabase
      .from("profiles")
      .select("goal, weight, height, goal_weight")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.log("Profile Error:", error.message);
    }

    if (Profile) {
      setGoal(Profile.goal || "");
      setWeight(Profile.weight?.toString() || "");
      setHeight(Profile.height?.toString() || "");
      setGoalWeight(Profile.goal_weight?.toString() || "");
    }

    setLoading(false);
  }

  async function SaveProfile() {
    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          name: user.user_metadata?.name || "FitForge User",
          email: user.email || "",
          goal: Goal,
          weight: Weight ? Number(Weight) : null,
          height: Height ? Number(Height) : null,
          goal_weight: GoalWeight ? Number(GoalWeight) : null,
        },
        {
          onConflict: "id",
        }
      );

    if (error) {
      console.log("Save Error:", error.message);
      setMessage("Error: " + error.message);
    } else {
      setMessage("Profile updated successfully! ✅");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }

    setSaving(false);
  }

  if (Loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-zinc-400 text-sm">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-5 py-7 md:px-8 md:py-10">

        <div className="max-w-5xl mx-auto">

          {/* Top Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  FITFORGE / PROFILE
                </p>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Your Profile
              </h1>

              <p className="text-zinc-500 mt-2">
                Manage your fitness information and personal targets.
              </p>
            </div>

            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="w-fit px-5 py-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
            >
              ← Dashboard
            </button>

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Profile Summary */}
            <div className="lg:col-span-1">

              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl">

                {/* Avatar */}
                <div className="flex items-center justify-center mb-6">

                  <div className="relative">

                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/20">

                      <span className="text-4xl">
                        👤
                      </span>

                    </div>

                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-green-500 border-4 border-zinc-950"></div>

                  </div>

                </div>

                <div className="text-center mb-7">

                  <h2 className="text-xl font-bold">
                    FitForge User
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    Fitness Member
                  </p>

                </div>

                {/* Quick Stats */}
                <div className="space-y-3">

                  <div className="rounded-2xl bg-black/40 border border-white/5 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-zinc-500">
                        Current Weight
                      </span>

                      <span className="font-semibold">
                        {Weight ? `${Weight} kg` : "--"}
                      </span>

                    </div>

                  </div>

                  <div className="rounded-2xl bg-black/40 border border-white/5 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-zinc-500">
                        Height
                      </span>

                      <span className="font-semibold">
                        {Height ? `${Height} cm` : "--"}
                      </span>

                    </div>

                  </div>

                  <div className="rounded-2xl bg-black/40 border border-white/5 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-zinc-500">
                        Goal
                      </span>

                      <span className="font-semibold text-purple-400">
                        {Goal || "--"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">

              <div className="rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden">

                {/* Form Header */}
                <div className="p-6 md:p-7 border-b border-white/10 bg-gradient-to-r from-zinc-900/80 to-zinc-950">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">

                      <span className="text-xl">
                        ⚡
                      </span>

                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        Fitness Information
                      </h2>

                      <p className="text-sm text-zinc-500 mt-1">
                        Update your body stats and fitness target.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Form */}
                <div className="p-6 md:p-8">

                  {/* Goal */}
                  <div className="mb-6">

                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Fitness Goal
                    </label>

                    <select
                      value={Goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 text-white outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition appearance-none"
                    >

                      <option value="">
                        Select your goal
                      </option>

                      <option value="Weight Gain">
                        Weight Gain
                      </option>

                      <option value="Weight Loss">
                        Weight Loss
                      </option>

                      <option value="Muscle Gain">
                        Muscle Gain
                      </option>

                      <option value="Stay Fit">
                        Stay Fit
                      </option>

                    </select>

                  </div>

                  {/* Weight + Height */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                    {/* Weight */}
                    <div>

                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Current Weight
                      </label>

                      <div className="relative">

                        <input
                          type="number"
                          value={Weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="65"
                          className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 pr-14 text-white placeholder:text-zinc-700 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                          kg
                        </span>

                      </div>

                    </div>

                    {/* Height */}
                    <div>

                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Height
                      </label>

                      <div className="relative">

                        <input
                          type="number"
                          value={Height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="175"
                          className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 pr-14 text-white placeholder:text-zinc-700 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                          cm
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Goal Weight */}
                  <div className="mb-7">

                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Goal Weight
                    </label>

                    <div className="relative">

                      <input
                        type="number"
                        value={GoalWeight}
                        onChange={(e) => setGoalWeight(e.target.value)}
                        placeholder="70"
                        className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-4 py-4 pr-14 text-white placeholder:text-zinc-700 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                        kg
                      </span>

                    </div>

                    <p className="text-xs text-zinc-600 mt-2">
                      This target will be used on your Progress page.
                    </p>

                  </div>

                  {/* Target Preview */}
                  {Weight && GoalWeight && (

                    <div className="mb-7 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

                      <div className="flex items-center justify-between mb-5">

                        <div>
                          <p className="text-xs uppercase tracking-wider text-purple-400">
                            Target Preview
                          </p>

                          <p className="text-xs text-zinc-600 mt-1">
                            Your fitness journey
                          </p>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                          🎯
                        </div>

                      </div>

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-2xl md:text-3xl font-bold">
                            {Weight}
                            <span className="text-sm text-zinc-500 ml-1">
                              kg
                            </span>
                          </p>

                          <p className="text-xs text-zinc-500 mt-1">
                            Current
                          </p>

                        </div>

                        <div className="flex-1 mx-5">

                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">

                            <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>

                          </div>

                          <div className="flex justify-center mt-2">
                            <span className="text-xs text-zinc-600">
                              GOAL
                            </span>
                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl md:text-3xl font-bold">
                            {GoalWeight}
                            <span className="text-sm text-zinc-500 ml-1">
                              kg
                            </span>
                          </p>

                          <p className="text-xs text-zinc-500 mt-1">
                            Target
                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                  {/* Save Button */}
                  <button
                    onClick={SaveProfile}
                    disabled={Saving}
                    className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 font-semibold shadow-lg shadow-purple-900/20 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >

                    {Saving ? (
                      <span className="flex items-center justify-center gap-3">

                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                        Saving Changes...

                      </span>
                    ) : (
                      "Save Profile →"
                    )}

                  </button>

                  {/* Message */}
                  {Message && (

                    <div
                      className={`mt-5 rounded-xl px-4 py-3 text-center text-sm border ${
                        Message.startsWith("Error")
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : "bg-green-500/10 border-green-500/20 text-green-400"
                      }`}
                    >
                      {Message}
                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="mt-7 text-center">

            <p className="text-xs text-zinc-700">
              🔒 Your fitness data is securely stored in FitForge.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}