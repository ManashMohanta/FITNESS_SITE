"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Sidebar from "../components/Sidebar";

type Workout = {
  id: number;
  workout_name: string;
  exercises: number;
  duration: number;
  completed_at: string;
};

export default function HistoryPage() {
  const [Workouts, setWorkouts] = useState<Workout[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    LoadHistory();
  }, []);

  async function LoadHistory() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("workouts")
      .select(
        "id, workout_name, exercises, duration, completed_at"
      )
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false });

    if (error) {
      console.log("History Error:", error.message);
    } else {
      setWorkouts(data || []);
    }

    setLoading(false);
  }

  function FormatDate(DateValue: string) {
    return new Date(DateValue).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  function FormatTime(DateValue: string) {
    return new Date(DateValue).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  function TotalExercises() {
    return Workouts.reduce(
      (Total, Workout) =>
        Total + Number(Workout.exercises || 0),
      0
    );
  }

  function TotalDuration() {
    return Workouts.reduce(
      (Total, Workout) =>
        Total + Number(Workout.duration || 0),
      0
    );
  }

  if (Loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-zinc-400 text-sm">
            Loading workout history...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 px-5 py-7 md:px-8 md:py-10">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-purple-500"></div>

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                  FITFORGE / HISTORY
                </p>

              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Workout History 📊
              </h1>

              <p className="text-zinc-500 mt-2">
                Review your completed workouts and training activity.
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

          {/* SUMMARY STATS */}

          {Workouts.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

              <StatCard
                icon="🏋️"
                title="Total Workouts"
                value={Workouts.length.toString()}
              />

              <StatCard
                icon="💪"
                title="Exercises Completed"
                value={TotalExercises().toString()}
              />

              <StatCard
                icon="⏱️"
                title="Training Time"
                value={`${TotalDuration()} min`}
              />

            </div>

          )}

          {/* EMPTY STATE */}

          {Workouts.length === 0 ? (

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 md:p-14 text-center shadow-2xl">

              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

              <div className="relative">

                <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center text-4xl mx-auto mb-6">
                  🏋️
                </div>

                <h2 className="text-2xl font-bold">
                  No workouts yet
                </h2>

                <p className="text-zinc-500 mt-2 max-w-md mx-auto">
                  Complete your first workout and your training history will appear here.
                </p>

                <button
                  onClick={() => {
                    window.location.href =
                      "/dashboard/workout";
                  }}
                  className="mt-7 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold hover:from-purple-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/20"
                >
                  Start Your First Workout →
                </button>

              </div>

            </div>

          ) : (

            /* WORKOUT LIST */

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-7 shadow-xl">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-xl font-bold">
                    Completed Workouts
                  </h2>

                  <p className="text-sm text-zinc-600 mt-1">
                    Your latest training sessions
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                  📋
                </div>

              </div>

              <div className="space-y-3">

                {Workouts.map((Workout, Index) => (

                  <div
                    key={Workout.id}
                    className="group rounded-2xl border border-white/5 bg-zinc-900/60 p-5 hover:bg-zinc-900 hover:border-purple-500/20 transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                      {/* LEFT */}

                      <div className="flex items-center gap-4 min-w-0">

                        <div className="relative flex-shrink-0">

                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/10 flex items-center justify-center text-2xl">
                            🏋️
                          </div>

                          {Index === 0 && (

                            <span className="absolute -top-2 -right-2 text-[9px] font-bold bg-purple-600 px-2 py-1 rounded-full">
                              LATEST
                            </span>

                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="text-xs uppercase tracking-wider text-zinc-600 mb-1">
                            Completed Workout
                          </p>

                          <h3 className="text-lg md:text-xl font-bold truncate">
                            {Workout.workout_name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-zinc-500">

                            <span>
                              📅 {FormatDate(
                                Workout.completed_at
                              )}
                            </span>

                            <span className="hidden sm:inline text-zinc-700">
                              •
                            </span>

                            <span>
                              🕐 {FormatTime(
                                Workout.completed_at
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* STATS */}

                      <div className="grid grid-cols-2 gap-3 lg:w-auto">

                        <div className="min-w-[120px] rounded-xl bg-black/40 border border-white/5 px-5 py-3">

                          <div className="flex items-center gap-2 mb-1">

                            <span className="text-sm">
                              💪
                            </span>

                            <p className="text-[11px] text-zinc-600 uppercase tracking-wider">
                              Exercises
                            </p>

                          </div>

                          <p className="text-lg font-bold">
                            {Workout.exercises}
                          </p>

                        </div>

                        <div className="min-w-[120px] rounded-xl bg-black/40 border border-white/5 px-5 py-3">

                          <div className="flex items-center gap-2 mb-1">

                            <span className="text-sm">
                              ⏱️
                            </span>

                            <p className="text-[11px] text-zinc-600 uppercase tracking-wider">
                              Duration
                            </p>

                          </div>

                          <p className="text-lg font-bold">
                            {Workout.duration}{" "}
                            <span className="text-xs text-zinc-500 font-normal">
                              min
                            </span>
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* FOOTER */}

          <div className="text-center mt-7">

            <p className="text-xs text-zinc-700">
              Every workout counts. Keep forging. ⚡
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5 hover:border-purple-500/20 transition">

      <div className="flex items-center justify-between mb-4">

        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center">
          {icon}
        </div>

        <span className="text-[10px] uppercase tracking-wider text-zinc-700">
          FITFORGE
        </span>

      </div>

      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-1">
        {value}
      </h2>

    </div>
  );
}