"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../../../lib/supabase";
import Sidebar from "../components/Sidebar";

type ProgressLog = {
  id: number;
  weight: number;
  logged_at: string;
};

export default function ProgressPage() {
  const [ProgressLogs, setProgressLogs] = useState<ProgressLog[]>([]);
  const [Weight, setWeight] = useState("");
  const [Goal, setGoal] = useState("");
  const [GoalWeight, setGoalWeight] = useState(0);
  const [CurrentWeight, setCurrentWeight] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [Saving, setSaving] = useState(false);

  useEffect(() => {
    LoadProgress();
  }, []);

  async function LoadProgress() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: ProfileData } = await supabase
      .from("profiles")
      .select("goal, weight, goal_weight")
      .eq("id", user.id)
      .single();

    if (ProfileData) {
      setGoal(ProfileData.goal || "");
      setCurrentWeight(Number(ProfileData.weight) || 0);
      setGoalWeight(Number(ProfileData.goal_weight) || 0);
    }

    const { data: ProgressData, error } = await supabase
      .from("progress_logs")
      .select("id, weight, logged_at")
      .eq("user_id", user.id)
      .order("logged_at", { ascending: false });

    if (!error && ProgressData) {
      setProgressLogs(ProgressData);
    }

    setLoading(false);
  }

  async function AddWeight() {
    if (!Weight || Number(Weight) <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setSaving(false);
      return;
    }

    const NewWeight = Number(Weight);

    const { error } = await supabase
      .from("progress_logs")
      .insert({
        user_id: user.id,
        weight: NewWeight,
      });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    await supabase
      .from("profiles")
      .update({
        weight: NewWeight,
      })
      .eq("id", user.id);

    setWeight("");

    await LoadProgress();

    setSaving(false);
  }

  async function DeleteProgress(id: number) {
    const ConfirmDelete = confirm(
      "Are you sure you want to delete this progress entry?"
    );

    if (!ConfirmDelete) return;

    const { error } = await supabase
      .from("progress_logs")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setProgressLogs(
      ProgressLogs.filter((Log) => Log.id !== id)
    );
  }

  const StartingWeight =
    ProgressLogs.length > 0
      ? Number(ProgressLogs[ProgressLogs.length - 1].weight)
      : CurrentWeight;

  const LatestWeight =
    ProgressLogs.length > 0
      ? Number(ProgressLogs[0].weight)
      : CurrentWeight;

  const WeightChange = LatestWeight - StartingWeight;

  /* =========================
     GOAL PROGRESS
  ========================= */

  let ProgressPercent = 0;
  let RemainingWeight = 0;

  if (GoalWeight > 0 && StartingWeight > 0) {
    if (Goal === "Weight Loss") {
      const TotalDistance = StartingWeight - GoalWeight;
      const Completed = StartingWeight - LatestWeight;

      if (TotalDistance > 0) {
        ProgressPercent =
          (Completed / TotalDistance) * 100;
      }

      RemainingWeight = LatestWeight - GoalWeight;
    } else if (
      Goal === "Weight Gain" ||
      Goal === "Muscle Gain"
    ) {
      const TotalDistance = GoalWeight - StartingWeight;
      const Completed = LatestWeight - StartingWeight;

      if (TotalDistance > 0) {
        ProgressPercent =
          (Completed / TotalDistance) * 100;
      }

      RemainingWeight = GoalWeight - LatestWeight;
    } else {
      ProgressPercent = 0;

      RemainingWeight = Math.abs(
        GoalWeight - LatestWeight
      );
    }
  }

  ProgressPercent = Math.max(
    0,
    Math.min(100, ProgressPercent)
  );

  RemainingWeight = Math.max(
    0,
    RemainingWeight
  );

  const ChartData = [...ProgressLogs]
    .reverse()
    .map((Log) => ({
      date: new Date(
        Log.logged_at
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      weight: Number(Log.weight),
    }));

  if (Loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-zinc-400 text-sm">
            Loading your progress...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 px-5 py-7 md:px-8 md:py-10">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-purple-500"></div>

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                  FITFORGE / PROGRESS
                </p>

              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Progress Tracking 📈
              </h1>

              <p className="text-zinc-500 mt-2">
                Track your weight and see how close you are to your goal.
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

          {/* GOAL CARD */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-zinc-950 p-6 md:p-8 mb-6 shadow-2xl">

            {/* Glow */}

            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

            <div className="relative">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

                <div>

                  <div className="flex items-center gap-2 mb-3">

                    <span className="text-lg">
                      🎯
                    </span>

                    <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold">
                      Your Target
                    </p>

                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold">
                    {GoalWeight > 0
                      ? `${GoalWeight} kg`
                      : "Goal Weight Not Set"}
                  </h2>

                  <p className="text-zinc-500 text-sm mt-2 max-w-lg">

                    {GoalWeight > 0
                      ? Goal === "Weight Loss"
                        ? "Keep going towards your weight loss goal."
                        : Goal === "Weight Gain" ||
                          Goal === "Muscle Gain"
                        ? "Keep going towards your target weight."
                        : "Your personal target weight."
                      : "Set a goal weight from your profile."}

                  </p>

                </div>

                {/* Percentage */}

                <div className="flex items-center gap-4">

                  <div className="relative w-24 h-24">

                    <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>

                    <div
                      className="absolute inset-0 rounded-full border-4 border-purple-500"
                      style={{
                        clipPath: `inset(${100 - ProgressPercent}% 0 0 0)`,
                      }}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center">

                      <span className="text-xl font-bold">
                        {Math.round(ProgressPercent)}%
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Progress Bar */}

              <div className="mt-7">

                <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">

                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${ProgressPercent}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* Goal Bottom */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 text-xs">

                <span className="text-zinc-500">

                  Current:{" "}

                  <strong className="text-white">
                    {LatestWeight.toFixed(1)} kg
                  </strong>

                </span>

                {GoalWeight > 0 && (

                  <span
                    className={
                      RemainingWeight > 0
                        ? "text-zinc-500"
                        : "text-green-400"
                    }
                  >

                    {RemainingWeight > 0
                      ? `${RemainingWeight.toFixed(
                          1
                        )} kg remaining`
                      : "🎉 Target reached!"}

                  </span>

                )}

              </div>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            <SummaryCard
              title="Starting Weight"
              value={`${StartingWeight.toFixed(1)} kg`}
              icon="🏁"
            />

            <SummaryCard
              title="Current Weight"
              value={`${LatestWeight.toFixed(1)} kg`}
              icon="⚖️"
              highlight
            />

            <SummaryCard
              title="Weight Change"
              value={`${
                WeightChange > 0 ? "+" : ""
              }${WeightChange.toFixed(1)} kg`}
              icon="📊"
            />

            <SummaryCard
              title="Goal"
              value={Goal || "Not Set"}
              icon="🎯"
            />

          </div>

          {/* CHART */}

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-7 mb-6 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Weight Progress
                </h2>

                <p className="text-sm text-zinc-600 mt-1">
                  Your weight changes over time
                </p>

              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                📊
              </div>

            </div>

            {ChartData.length < 2 ? (

              <div className="h-80 flex flex-col items-center justify-center text-center">

                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-3xl mb-4">
                  📈
                </div>

                <h3 className="font-semibold text-lg">
                  Not enough data
                </h3>

                <p className="text-zinc-600 text-sm mt-2 max-w-sm">
                  Add at least 2 weight entries to see your progress chart.
                </p>

              </div>

            ) : (

              <div className="w-full h-[350px] mt-7">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={ChartData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#27272a"
                    />

                    <XAxis
                      dataKey="date"
                      tick={{
                        fill: "#71717a",
                        fontSize: 12,
                      }}
                      axisLine={{
                        stroke: "#27272a",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      domain={["auto", "auto"]}
                      tick={{
                        fill: "#71717a",
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      labelStyle={{
                        color: "#a1a1aa",
                      }}
                      formatter={(value) => [
                        `${value} kg`,
                        "Weight",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={{
                        r: 5,
                        fill: "#a855f7",
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 7,
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            )}

          </div>

          {/* UPDATE WEIGHT */}

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-7 mb-6 shadow-xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  Update Weight
                </h2>

                <p className="text-sm text-zinc-600 mt-1">
                  Record your latest weight
                </p>

              </div>

              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/10 flex items-center justify-center">
                ⚖️
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative flex-1">

                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter weight in kg"
                  value={Weight}
                  onChange={(e) =>
                    setWeight(e.target.value)
                  }
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition"
                />

              </div>

              <button
                onClick={AddWeight}
                disabled={Saving}
                className="sm:w-44 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 font-semibold hover:from-purple-500 hover:to-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {Saving ? (
                  <span className="flex items-center justify-center gap-2">

                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                    Saving...

                  </span>
                ) : (
                  "Save Weight"
                )}

              </button>

            </div>

          </div>

          {/* HISTORY */}

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-7 shadow-xl">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-bold">
                  Weight History
                </h2>

                <p className="text-sm text-zinc-600 mt-1">
                  Your previous weight records
                </p>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                📋
              </div>

            </div>

            {ProgressLogs.length === 0 ? (

              <div className="py-12 text-center">

                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-3xl mx-auto mb-4">
                  ⚖️
                </div>

                <p className="font-medium">
                  No progress recorded yet.
                </p>

                <p className="text-zinc-600 text-sm mt-2">
                  Add your first weight above.
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {ProgressLogs.map((Log) => (

                  <div
                    key={Log.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-white/10 transition"
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        ⚖️
                      </div>

                      <div className="min-w-0">

                        <p className="font-semibold">
                          {Number(Log.weight).toFixed(1)} kg
                        </p>

                        <p className="text-xs text-zinc-600 mt-1">

                          {new Date(
                            Log.logged_at
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}

                          {" • "}

                          {new Date(
                            Log.logged_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}

                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        DeleteProgress(Log.id)
                      }
                      className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition flex-shrink-0"
                    >
                      Delete
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* FOOTER */}

          <div className="text-center mt-7">

            <p className="text-xs text-zinc-700">
              Keep tracking. Keep improving. Keep forging. ⚡
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        highlight
          ? "bg-purple-500/5 border-purple-500/20"
          : "bg-zinc-950 border-white/10"
      }`}
    >

      <div className="flex items-center justify-between mb-4">

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            highlight
              ? "bg-purple-500/10"
              : "bg-zinc-900"
          }`}
        >
          {icon}
        </div>

        <span className="text-[10px] uppercase tracking-wider text-zinc-700">
          FITFORGE
        </span>

      </div>

      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <h2
        className={`text-xl font-bold mt-1 ${
          highlight
            ? "text-purple-400"
            : "text-white"
        }`}
      >
        {value}
      </h2>

    </div>
  );
}