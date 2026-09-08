"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
  const Router = useRouter();

  const [UserName, setUserName] = useState("FitForge User");
  const [UserGoal, setUserGoal] = useState("");
  const [UserWeight, setUserWeight] = useState(0);
  const [GoalWeight, setGoalWeight] = useState(0);

  const [WorkoutCount, setWorkoutCount] = useState(0);
  const [TodayCalories, setTodayCalories] = useState(0);
  const [TodayProtein, setTodayProtein] = useState(0);

  const [WorkoutToday, setWorkoutToday] = useState(false);
  const [NutritionToday, setNutritionToday] = useState(false);
  const [ProgressToday, setProgressToday] = useState(false);

  const [FitnessScore, setFitnessScore] = useState(0);
  const [WorkoutStreak, setWorkoutStreak] = useState(0);

  useEffect(() => {
    LoadDashboard();
  }, []);

  async function LoadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Router.push("/login");
      return;
    }

    // PROFILE
    const { data: Profile } = await supabase
      .from("profiles")
      .select("name, goal, weight, goal_weight")
      .eq("id", user.id)
      .single();

    if (Profile) {
      setUserName(Profile.name || "FitForge User");
      setUserGoal(Profile.goal || "");
      setUserWeight(Number(Profile.weight) || 0);
      setGoalWeight(Number(Profile.goal_weight) || 0);
    }

    // TODAY
    const Today = new Date();

    const StartOfDay = new Date(
      Today.getFullYear(),
      Today.getMonth(),
      Today.getDate()
    );

    const EndOfDay = new Date(
      Today.getFullYear(),
      Today.getMonth(),
      Today.getDate() + 1
    );

    // WORKOUTS
    const { data: Workouts, count } = await supabase
      .from("workouts")
      .select("*", { count: "exact" })
      .eq("user_id", user.id);

    setWorkoutCount(count || 0);

    const TodayWorkouts =
      Workouts?.filter((Workout) => {
        const WorkoutDate = new Date(Workout.completed_at);

        return (
          WorkoutDate >= StartOfDay &&
          WorkoutDate < EndOfDay
        );
      }) || [];

    setWorkoutToday(TodayWorkouts.length > 0);

    // NUTRITION
    const { data: Nutrition } = await supabase
      .from("nutrition_logs")
      .select("calories, protein, logged_at")
      .eq("user_id", user.id)
      .gte("logged_at", StartOfDay.toISOString())
      .lt("logged_at", EndOfDay.toISOString());

    let Calories = 0;
    let Protein = 0;

    Nutrition?.forEach((Food) => {
      Calories += Number(Food.calories) || 0;
      Protein += Number(Food.protein) || 0;
    });

    setTodayCalories(Math.round(Calories));
    setTodayProtein(Math.round(Protein));

    setNutritionToday(
      (Nutrition?.length || 0) > 0
    );

    // PROGRESS
    const { data: Progress } = await supabase
      .from("progress_logs")
      .select("logged_at")
      .eq("user_id", user.id)
      .gte("logged_at", StartOfDay.toISOString())
      .lt("logged_at", EndOfDay.toISOString());

    setProgressToday(
      (Progress?.length || 0) > 0
    );

    // FITNESS SCORE
    let Score = 0;

    if (TodayWorkouts.length > 0) {
      Score += 40;
    }

    if ((Nutrition?.length || 0) > 0) {
      Score += 30;
    }

    if ((Progress?.length || 0) > 0) {
      Score += 30;
    }

    setFitnessScore(Score);

    // WORKOUT STREAK
    if (Workouts && Workouts.length > 0) {
      const WorkoutDates = Array.from(
        new Set(
          Workouts.map((Workout) =>
            new Date(Workout.completed_at)
              .toISOString()
              .split("T")[0]
          )
        )
      ).sort((a, b) => b.localeCompare(a));

      let Streak = 0;

      const CheckDate = new Date();

      for (const DateString of WorkoutDates) {
        const CurrentDate = CheckDate
          .toISOString()
          .split("T")[0];

        if (DateString === CurrentDate) {
          Streak++;

          CheckDate.setDate(
            CheckDate.getDate() - 1
          );
        } else {
          break;
        }
      }

      setWorkoutStreak(Streak);
    }
  }

  const ActivityItems = [
    {
      name: "Workout",
      icon: "🏋️",
      completed: WorkoutToday,
      points: "40 pts",
    },
    {
      name: "Nutrition",
      icon: "🍎",
      completed: NutritionToday,
      points: "30 pts",
    },
    {
      name: "Progress",
      icon: "📈",
      completed: ProgressToday,
      points: "30 pts",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 min-w-0">

        <div className="px-5 md:px-8 lg:px-10 py-6 md:py-8 max-w-[1600px] mx-auto">

          {/* TOP HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                  FITFORGE DASHBOARD
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {UserName}
                </span>{" "}
                👋
              </h1>

              <p className="text-zinc-500 mt-2">
                Here's your fitness overview for today.
              </p>
            </div>

            {/* STREAK */}
            <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl">
                🔥
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  CURRENT STREAK
                </p>

                <p className="font-bold">
                  {WorkoutStreak}{" "}
                  <span className="text-zinc-400 font-normal">
                    days
                  </span>
                </p>
              </div>
            </div>

          </div>

          {/* FITNESS SCORE */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/50 via-zinc-900 to-zinc-950 p-6 md:p-8 mb-6 shadow-2xl">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">

              {/* SCORE */}
              <div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    ⚡
                  </div>

                  <p className="text-zinc-400 text-sm font-medium">
                    Today's Fitness Score
                  </p>
                </div>

                <div className="flex items-end gap-3">

                  <h2 className="text-7xl font-black tracking-tight">
                    {FitnessScore}
                  </h2>

                  <span className="text-zinc-500 text-lg mb-3">
                    /100
                  </span>

                </div>

                <p className="text-zinc-400 mt-2">
                  {FitnessScore >= 80
                    ? "Excellent work! You're crushing it. 🔥"
                    : FitnessScore >= 50
                    ? "Good progress! Keep pushing. 💪"
                    : "Start your activities today. 🚀"}
                </p>

              </div>

              {/* PROGRESS */}
              <div className="bg-black/20 rounded-2xl border border-white/5 p-5">

                <div className="flex justify-between items-center mb-3">

                  <div>
                    <p className="text-sm font-semibold">
                      Daily Progress
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                      Complete your daily goals
                    </p>
                  </div>

                  <span className="text-sm font-bold text-purple-400">
                    {FitnessScore}%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-white/5 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-700"
                    style={{
                      width: `${FitnessScore}%`,
                    }}
                  />

                </div>

                {/* ACTIVITIES */}
                <div className="grid grid-cols-3 gap-3 mt-6">

                  {ActivityItems.map((Activity) => (
                    <div
                      key={Activity.name}
                      className={`rounded-xl border p-3 text-center transition ${
                        Activity.completed
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-white/[0.02] border-white/5"
                      }`}
                    >

                      <div className="text-lg">
                        {Activity.completed ? "✅" : Activity.icon}
                      </div>

                      <p className="text-xs font-medium mt-1">
                        {Activity.name}
                      </p>

                      <p className="text-[10px] text-zinc-500 mt-1">
                        {Activity.completed
                          ? "Completed"
                          : Activity.points}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* WEIGHT */}
            <div className="group rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-purple-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-xl">
                  ⚖️
                </div>

                <span className="text-xs text-zinc-600">
                  BODY
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Current Weight
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {UserWeight || "--"}
                <span className="text-sm text-zinc-500 ml-1">
                  kg
                </span>
              </h3>

            </div>

            {/* CALORIES */}
            <div className="group rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-orange-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-xl">
                  🔥
                </div>

                <span className="text-xs text-zinc-600">
                  TODAY
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Calories
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {TodayCalories}
                <span className="text-sm text-zinc-500 ml-1">
                  kcal
                </span>
              </h3>

            </div>

            {/* PROTEIN */}
            <div className="group rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-green-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-green-500/10 border border-green-500/10 flex items-center justify-center text-xl">
                  🥩
                </div>

                <span className="text-xs text-zinc-600">
                  TODAY
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Protein
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {TodayProtein}
                <span className="text-sm text-zinc-500 ml-1">
                  g
                </span>
              </h3>

            </div>

            {/* WORKOUTS */}
            <div className="group rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-purple-500/30 transition">

              <div className="flex items-center justify-between">

                <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-xl">
                  🏋️
                </div>

                <span className="text-xs text-zinc-600">
                  ALL TIME
                </span>

              </div>

              <p className="text-zinc-500 text-sm mt-5">
                Total Workouts
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {WorkoutCount}
              </h3>

            </div>

          </div>

          {/* GOAL + STREAK */}
          <div className="grid lg:grid-cols-2 gap-5 mb-7">

            {/* GOAL */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 hover:border-purple-500/20 transition">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold tracking-wider text-zinc-500">
                    YOUR GOAL
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {UserGoal || "Not Set"}
                  </h2>
                </div>

                <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                  🎯
                </div>

              </div>

              <div className="h-px bg-white/5 my-5" />

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-black/20 p-4">
                  <p className="text-xs text-zinc-500">
                    Current
                  </p>

                  <p className="text-xl font-bold mt-1">
                    {UserWeight || "--"}
                    <span className="text-xs text-zinc-500 ml-1">
                      kg
                    </span>
                  </p>
                </div>

                <div className="rounded-xl bg-black/20 p-4">
                  <p className="text-xs text-zinc-500">
                    Target
                  </p>

                  <p className="text-xl font-bold mt-1">
                    {GoalWeight || "--"}
                    <span className="text-xs text-zinc-500 ml-1">
                      kg
                    </span>
                  </p>
                </div>

              </div>

            </div>

            {/* STREAK */}
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-zinc-900/70 p-6">

              <div className="absolute right-5 top-5 text-5xl opacity-10">
                🔥
              </div>

              <p className="text-xs font-semibold tracking-wider text-orange-300/60">
                CONSISTENCY
              </p>

              <h2 className="text-4xl font-black mt-2">
                {WorkoutStreak} Days
              </h2>

              <p className="text-zinc-500 mt-2 max-w-md">
                Consistency is the key to transformation. Keep your streak alive!
              </p>

              <div className="flex items-center gap-2 mt-5">

                <span className="h-2 w-2 rounded-full bg-orange-400" />

                <span className="text-xs text-zinc-400">
                  Keep showing up
                </span>

              </div>

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div>

            <div className="flex items-end justify-between mb-4">

              <div>
                <p className="text-xs font-semibold tracking-wider text-zinc-500">
                  SHORTCUTS
                </p>

                <h2 className="text-xl font-bold mt-1">
                  Quick Actions
                </h2>
              </div>

              <p className="hidden md:block text-xs text-zinc-600">
                Manage your fitness journey
              </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              {/* WORKOUT */}
              <button
                onClick={() =>
                  Router.push("/dashboard/workout")
                }
                className="group text-left rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 to-zinc-900/70 p-5 hover:border-purple-400/40 hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex justify-between items-start">

                  <div className="h-11 w-11 rounded-xl bg-purple-500/20 border border-purple-400/20 flex items-center justify-center text-xl">
                    🏋️
                  </div>

                  <span className="text-zinc-600 group-hover:text-purple-400 transition">
                    →
                  </span>

                </div>

                <p className="font-semibold mt-5">
                  Start Workout
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Train and get stronger
                </p>

              </button>

              {/* NUTRITION */}
              <button
                onClick={() =>
                  Router.push("/dashboard/nutrition")
                }
                className="group text-left rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-green-500/30 hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex justify-between items-start">

                  <div className="h-11 w-11 rounded-xl bg-green-500/10 border border-green-500/10 flex items-center justify-center text-xl">
                    🍎
                  </div>

                  <span className="text-zinc-600 group-hover:text-green-400 transition">
                    →
                  </span>

                </div>

                <p className="font-semibold mt-5">
                  Nutrition
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Track your daily food
                </p>

              </button>

              {/* PROGRESS */}
              <button
                onClick={() =>
                  Router.push("/dashboard/progress")
                }
                className="group text-left rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex justify-between items-start">

                  <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-xl">
                    📈
                  </div>

                  <span className="text-zinc-600 group-hover:text-blue-400 transition">
                    →
                  </span>

                </div>

                <p className="font-semibold mt-5">
                  Progress
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Track your growth
                </p>

              </button>

              {/* HISTORY */}
              <button
                onClick={() =>
                  Router.push("/dashboard/history")
                }
                className="group text-left rounded-2xl border border-white/10 bg-zinc-900/70 p-5 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-200"
              >

                <div className="flex justify-between items-start">

                  <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center text-xl">
                    📜
                  </div>

                  <span className="text-zinc-600 group-hover:text-orange-400 transition">
                    →
                  </span>

                </div>

                <p className="font-semibold mt-5">
                  History
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  View your activities
                </p>

              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}