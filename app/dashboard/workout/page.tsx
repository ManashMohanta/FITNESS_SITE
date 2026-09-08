"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Sidebar from "../components/Sidebar";

export default function WorkoutPage() {
  const [CompletedExercises, setCompletedExercises] = useState<number[]>([]);
  const [Saving, setSaving] = useState(false);
  const [Completed, setCompleted] = useState(false);
  const [Message, setMessage] = useState("");
  const [UserId, setUserId] = useState("");

  const Exercises = [
    {
      name: "Push Ups",
      sets: "3 Sets",
      reps: "12 Reps",
      icon: "💪",
    },
    {
      name: "Squats",
      sets: "3 Sets",
      reps: "15 Reps",
      icon: "🦵",
    },
    {
      name: "Lunges",
      sets: "3 Sets",
      reps: "10 Reps",
      icon: "🏃",
    },
    {
      name: "Plank",
      sets: "3 Sets",
      reps: "30 Seconds",
      icon: "🔥",
    },
    {
      name: "Jumping Jacks",
      sets: "3 Sets",
      reps: "20 Reps",
      icon: "⚡",
    },
  ];

  useEffect(() => {
    CheckUser();
  }, []);

  async function CheckUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      window.location.href = "/login";
      return;
    }

    setUserId(user.id);
  }

  function ToggleExercise(index: number) {
    if (Completed) {
      return;
    }

    setMessage("");

    setCompletedExercises((Current) => {
      if (Current.includes(index)) {
        return Current.filter((item) => item !== index);
      }

      return [...Current, index];
    });
  }

  async function FinishWorkout() {
    setMessage("");

    if (!UserId) {
      setMessage("User not found. Please login again.");
      return;
    }

    if (CompletedExercises.length !== Exercises.length) {
      setMessage(
        `Complete all exercises first! (${CompletedExercises.length}/${Exercises.length})`
      );
      return;
    }

    if (Completed) {
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("workouts")
      .insert({
        user_id: UserId,
        workout_name: "Full Body Workout",
        exercises: Exercises.length,
        duration: 30,
      })
      .select();

    if (error) {
      console.log("Workout Save Error:", error);

      setMessage("Workout save nahi hua: " + error.message);

      setSaving(false);
      return;
    }

    console.log("Workout Saved:", data);

    setCompleted(true);
    setMessage("Workout completed and saved successfully! 🎉");

    setSaving(false);
  }

  const CompletedCount = CompletedExercises.length;

  const ProgressPercent =
    (CompletedCount / Exercises.length) * 100;

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <section className="flex-1 min-w-0">

        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-7">

          {/* HEADER */}
          <div className="mb-8">

            <button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition mb-6 text-sm"
            >
              <span className="group-hover:-translate-x-1 transition">
                ←
              </span>
              Back to Dashboard
            </button>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              <div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                  <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                    WORKOUT CENTER
                  </p>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Today's Workout{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🏋️
                  </span>
                </h1>

                <p className="text-zinc-500 mt-3">
                  Complete your exercises and keep your fitness streak alive.
                </p>

              </div>

              {/* COMPLETION */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/70 px-5 py-4 min-w-[190px]">

                <div className="flex justify-between items-center mb-3">

                  <span className="text-xs text-zinc-500">
                    WORKOUT PROGRESS
                  </span>

                  <span className="text-sm font-bold text-purple-400">
                    {Math.round(ProgressPercent)}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{
                      width: `${ProgressPercent}%`,
                    }}
                  />

                </div>

                <p className="text-xs text-zinc-600 mt-2">
                  {CompletedCount} of {Exercises.length} exercises
                </p>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            {/* EXERCISES */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-purple-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                  🏋️
                </div>

                <span className="text-xs text-zinc-600">
                  TOTAL
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Exercises
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {Exercises.length}
              </h2>

            </div>

            {/* COMPLETED */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-green-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                  ✓
                </div>

                <span className="text-xs text-zinc-600">
                  DONE
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {CompletedCount}
                <span className="text-base text-zinc-600 ml-1">
                  / {Exercises.length}
                </span>
              </h2>

            </div>

            {/* DURATION */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-blue-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                  ⏱️
                </div>

                <span className="text-xs text-zinc-600">
                  ESTIMATE
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Duration
              </p>

              <h2 className="text-3xl font-bold mt-1">
                30
                <span className="text-base text-zinc-500 ml-1">
                  min
                </span>
              </h2>

            </div>

          </div>

          {/* EXERCISE SECTION */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden">

            {/* SECTION HEADER */}
            <div className="px-5 md:px-7 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <p className="text-xs font-semibold tracking-wider text-zinc-600">
                  FULL BODY PROGRAM
                </p>

                <h2 className="text-xl font-bold mt-1">
                  Exercise Plan
                </h2>
              </div>

              <div className="text-sm text-zinc-500">
                {Completed
                  ? "Workout completed 🎉"
                  : "Tap Complete after each exercise"}
              </div>

            </div>

            {/* EXERCISES */}
            <div className="p-4 md:p-6 space-y-3">

              {Exercises.map((Exercise, index) => {

                const IsCompleted =
                  CompletedExercises.includes(index);

                return (
                  <div
                    key={index}
                    className={`group rounded-2xl border p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-200 ${
                      IsCompleted
                        ? "bg-green-500/[0.04] border-green-500/20"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      {/* NUMBER */}
                      <div
                        className={`hidden sm:flex h-10 w-10 shrink-0 rounded-xl items-center justify-center text-xs font-bold border ${
                          IsCompleted
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-white/5 border-white/10 text-zinc-500"
                        }`}
                      >
                        {IsCompleted ? "✓" : `0${index + 1}`}
                      </div>

                      {/* ICON */}
                      <div
                        className={`h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl border transition ${
                          IsCompleted
                            ? "bg-green-500/10 border-green-500/20"
                            : "bg-zinc-900 border-white/10 group-hover:border-purple-500/20"
                        }`}
                      >
                        {Exercise.icon}
                      </div>

                      {/* INFO */}
                      <div>

                        <p className="text-xs text-zinc-600 mb-1">
                          EXERCISE {index + 1}
                        </p>

                        <h3
                          className={`text-lg font-bold ${
                            IsCompleted
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          {Exercise.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">

                          <span className="text-sm text-zinc-500">
                            {Exercise.sets}
                          </span>

                          <span className="text-zinc-700">
                            •
                          </span>

                          <span className="text-sm text-zinc-500">
                            {Exercise.reps}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => ToggleExercise(index)}
                      disabled={Completed}
                      className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                        IsCompleted
                          ? "bg-green-500/10 border border-green-500/20 text-green-400"
                          : "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]"
                      } disabled:cursor-not-allowed`}
                    >
                      {IsCompleted
                        ? "Completed ✓"
                        : "Complete"}
                    </button>

                  </div>
                );
              })}

            </div>

          </div>

          {/* FINISH CARD */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/30 via-zinc-900/70 to-zinc-950 p-6 md:p-7">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <div className="flex items-center gap-2">

                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    🏆
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Ready to finish?
                    </h3>

                    <p className="text-xs text-zinc-500 mt-1">
                      Complete all exercises before saving.
                    </p>

                  </div>

                </div>

              </div>

              <button
                onClick={FinishWorkout}
                disabled={Saving || Completed}
                className="w-full md:w-auto min-w-[220px] rounded-xl bg-white text-black px-7 py-4 font-bold hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Saving
                  ? "Saving Workout..."
                  : Completed
                  ? "Workout Completed ✅"
                  : "Finish Workout 🏆"}
              </button>

            </div>

          </div>

          {/* MESSAGE */}
          {Message && (
            <div
              className={`mt-5 rounded-2xl border p-5 text-center ${
                Completed
                  ? "bg-green-500/5 border-green-500/20"
                  : "bg-zinc-900 border-white/10"
              }`}
            >
              <p
                className={
                  Completed
                    ? "text-green-400 font-medium"
                    : "text-zinc-300"
                }
              >
                {Message}
              </p>
            </div>
          )}

        </div>

      </section>

    </main>
  );
}