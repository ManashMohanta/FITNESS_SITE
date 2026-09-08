"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <div className="text-2xl font-black tracking-tight">
            FIT<span className="text-lime-400">FORGE</span>
          </div>

          {/* Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#programs" className="text-sm text-gray-300 hover:text-white">
              Programs
            </a>
            <a href="#workouts" className="text-sm text-gray-300 hover:text-white">
              Workouts
            </a>
            <a href="#nutrition" className="text-sm text-gray-300 hover:text-white">
              Nutrition
            </a>
            <a href="#about" className="text-sm text-gray-300 hover:text-white">
              About
            </a>
          </div>
      {/* Login */}
<button
  onClick={() => {
    window.location.href = "/login";
  }}
  className="rounded-full border border-white/20 px-5 py-2.5"
>
  Login
</button>
          
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">

        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/10 blur-[150px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <span className="h-2 w-2 rounded-full bg-lime-400" />
              Your fitness journey starts here
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              BUILD YOUR
              <br />
              <span className="text-lime-400">STRONGER</span>
              <br />
              SELF.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              Personalized workouts, smarter nutrition and powerful progress
              tracking — all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">

              <button className="group flex items-center gap-3 rounded-full bg-lime-400 px-7 py-4 font-bold text-black transition hover:bg-lime-300">
                Start Training
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold transition hover:bg-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Play size={14} fill="white" />
                </span>
                Explore Workouts
              </button>

            </div>

            {/* STATS */}
            <div className="mt-12 flex gap-10 border-t border-white/10 pt-7">

              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="mt-1 text-sm text-gray-500">Members</p>
              </div>

              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="mt-1 text-sm text-gray-500">Workouts</p>
              </div>

              <div>
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="mt-1 text-sm text-gray-500">Rating</p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >

            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-white/10">

              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1a?auto=format&fit=crop&w=1000&q=85"
                alt="Fitness athlete"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Progress Card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-400">
                      TODAY'S PROGRESS
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      Upper Body Strength
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                    82%
                  </div>

                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-lime-400" />
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </section>
      {/* PROGRAMS SECTION */}
<section
  id="programs"
  className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
          Training Programs
        </p>

        <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
          TRAIN WITH
          <span className="text-lime-400"> PURPOSE.</span>
        </h2>

        <p className="mt-4 max-w-xl text-gray-400">
          Choose a program designed around your goals, experience and fitness
          level.
        </p>
      </div>

      <button className="w-fit rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black">
        View All Programs →
      </button>
    </motion.div>

    {/* Program Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      {/* Muscle Gain */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85"
            alt="Muscle gain workout"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
            POPULAR
          </div>

          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-gray-300">01</p>
            <h3 className="mt-1 text-2xl font-black">Muscle Gain</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-6 text-gray-400">
            Build lean muscle and increase your strength with progressive
            training.
          </p>

          <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
            <span>8 Weeks</span>
            <span>Intermediate</span>
          </div>

          <button className="mt-5 w-full rounded-full bg-white/10 py-3 text-sm font-semibold transition hover:bg-lime-400 hover:text-black">
            View Program →
          </button>
        </div>
      </motion.div>

      {/* Weight Loss */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=85"
            alt="Weight loss workout"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-gray-300">02</p>
            <h3 className="mt-1 text-2xl font-black">Weight Loss</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-6 text-gray-400">
            Burn calories, improve endurance and build a stronger, healthier
            body.
          </p>

          <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
            <span>6 Weeks</span>
            <span>Beginner</span>
          </div>

          <button className="mt-5 w-full rounded-full bg-white/10 py-3 text-sm font-semibold transition hover:bg-lime-400 hover:text-black">
            View Program →
          </button>
        </div>
      </motion.div>

      {/* Strength */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85"
            alt="Strength training"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-gray-300">03</p>
            <h3 className="mt-1 text-2xl font-black">Strength</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-6 text-gray-400">
            Improve raw strength, power and performance with focused training.
          </p>

          <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
            <span>10 Weeks</span>
            <span>Advanced</span>
          </div>

          <button className="mt-5 w-full rounded-full bg-white/10 py-3 text-sm font-semibold transition hover:bg-lime-400 hover:text-black">
            View Program →
          </button>
        </div>
      </motion.div>

      {/* Beginner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=85"
            alt="Beginner fitness workout"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-gray-300">04</p>
            <h3 className="mt-1 text-2xl font-black">Beginner</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-6 text-gray-400">
            Start your fitness journey with simple and effective workouts.
          </p>

          <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
            <span>4 Weeks</span>
            <span>Beginner</span>
          </div>

          <button className="mt-5 w-full rounded-full bg-white/10 py-3 text-sm font-semibold transition hover:bg-lime-400 hover:text-black">
            View Program →
          </button>
        </div>
      </motion.div>

    </div>
  </div>
</section>
{/* WHY FITFORGE SECTION */}
<section
  id="about"
  className="border-t border-white/10 bg-[#080808] px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
        Why FitForge
      </p>

      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        EVERYTHING YOU NEED
        <br />
        TO <span className="text-lime-400">LEVEL UP.</span>
      </h2>

      <p className="mt-5 text-gray-400">
        Stop guessing. Start following a smarter fitness system designed to
        help you stay consistent and see real results.
      </p>
    </motion.div>

    {/* Features */}
    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

      {/* Feature 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-xl text-black">
          ⚡
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Smart Workouts
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Structured workouts built around your fitness level, goals and
          available equipment.
        </p>
      </motion.div>

      {/* Feature 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-xl text-black">
          🥗
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Smart Nutrition
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Track calories, protein and macros while keeping your nutrition
          simple and effective.
        </p>
      </motion.div>

      {/* Feature 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-xl text-black">
          📈
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Track Progress
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Monitor your workouts, weight, strength and achievements from one
          powerful dashboard.
        </p>
      </motion.div>

      {/* Feature 4 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ y: -6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-xl text-black">
          🤖
        </div>

        <h3 className="mt-6 text-xl font-bold">
          AI Coach
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Get personalized recommendations and guidance based on your fitness
          goals and progress.
        </p>
      </motion.div>

    </div>

    {/* Stats */}
    <div className="mt-20 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-4">

      <div className="border-b border-white/10 p-8 text-center sm:border-r lg:border-b-0">
        <p className="text-4xl font-black text-lime-400">50K+</p>
        <p className="mt-2 text-sm text-gray-500">Active Members</p>
      </div>

      <div className="border-b border-white/10 p-8 text-center lg:border-b-0 lg:border-r">
        <p className="text-4xl font-black text-lime-400">500+</p>
        <p className="mt-2 text-sm text-gray-500">Workout Plans</p>
      </div>

      <div className="border-b border-white/10 p-8 text-center sm:border-r lg:border-b-0">
        <p className="text-4xl font-black text-lime-400">1M+</p>
        <p className="mt-2 text-sm text-gray-500">Workouts Completed</p>
      </div>

      <div className="p-8 text-center">
        <p className="text-4xl font-black text-lime-400">4.9/5</p>
        <p className="mt-2 text-sm text-gray-500">Average Rating</p>
      </div>

    </div>

  </div>
</section>{/* NUTRITION SECTION */}
<section
  id="nutrition"
  className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
          Smart Nutrition
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          FUEL YOUR
          <span className="text-lime-400"> PERFORMANCE.</span>
        </h2>

        <p className="mt-5 max-w-xl text-gray-400">
          Track your calories and macros while building better eating habits
          around your fitness goals.
        </p>
      </div>

      <button className="w-fit rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300">
        Open Nutrition Tracker →
      </button>
    </motion.div>

    {/* Nutrition Dashboard */}
    <div className="mt-14 grid gap-6 lg:grid-cols-3">

      {/* Calories */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Daily Calories</p>
            <p className="mt-2 text-4xl font-black">1,840</p>
            <p className="mt-1 text-sm text-gray-500">
              of 2,400 kcal
            </p>
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-white/10">
            <div className="absolute inset-0 rounded-full border-[10px] border-lime-400 border-r-transparent border-b-transparent border-t-transparent rotate-45" />

            <div className="text-center">
              <p className="text-xl font-bold">77%</p>
              <p className="text-[10px] text-gray-500">GOAL</p>
            </div>
          </div>
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[77%] rounded-full bg-lime-400" />
        </div>

        <p className="mt-3 text-xs text-gray-500">
          560 calories remaining today
        </p>
      </motion.div>

      {/* Macros */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <p className="text-sm text-gray-500">
          Today's Macros
        </p>

        <div className="mt-7 space-y-6">

          {/* Protein */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Protein</span>
              <span className="text-gray-500">128g / 160g</span>
            </div>

            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[80%] rounded-full bg-lime-400" />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Carbs</span>
              <span className="text-gray-500">176g / 250g</span>
            </div>

            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[70%] rounded-full bg-white" />
            </div>
          </div>

          {/* Fats */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Fats</span>
              <span className="text-gray-500">48g / 70g</span>
            </div>

            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gray-500" />
            </div>
          </div>

        </div>
      </motion.div>

      {/* Today's Meals */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Today's Meals
          </p>

          <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs text-lime-400">
            3 / 5
          </span>
        </div>

        <div className="mt-6 space-y-3">

          <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
            <div>
              <p className="font-semibold">Breakfast</p>
              <p className="mt-1 text-xs text-gray-500">
                Oats + Eggs + Banana
              </p>
            </div>

            <span className="text-sm text-gray-400">
              520 kcal
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
            <div>
              <p className="font-semibold">Lunch</p>
              <p className="mt-1 text-xs text-gray-500">
                Chicken + Rice + Salad
              </p>
            </div>

            <span className="text-sm text-gray-400">
              680 kcal
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
            <div>
              <p className="font-semibold">Snack</p>
              <p className="mt-1 text-xs text-gray-500">
                Greek Yogurt + Nuts
              </p>
            </div>

            <span className="text-sm text-gray-400">
              310 kcal
            </span>
          </div>

        </div>

        <button className="mt-5 w-full rounded-full border border-white/10 py-3 text-sm font-semibold transition hover:bg-white hover:text-black">
          + Add Meal
        </button>
      </motion.div>

    </div>

    {/* Nutrition CTA */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-8 overflow-hidden rounded-3xl border border-lime-400/20 bg-lime-400/[0.06] p-8 md:p-10"
    >
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

        <div>
          <p className="text-2xl font-black">
            Your body deserves better fuel.
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
            Set your nutrition goal and let FitForge help you stay on track
            every day.
          </p>
        </div>

        <button className="w-fit whitespace-nowrap rounded-full bg-lime-400 px-7 py-3.5 font-bold text-black transition hover:bg-lime-300">
          Set My Goal →
        </button>

      </div>
    </motion.div>

  </div>
</section>
{/* WORKOUT SECTION */}
<section
  id="workouts"
  className="border-t border-white/10 bg-[#080808] px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
        Workout Experience
      </p>

      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        TRAIN
        <span className="text-lime-400"> HARDER.</span>
        <br />
        TRAIN SMARTER.
      </h2>

      <p className="mt-5 text-gray-400">
        Follow structured workouts, track every set and keep your progress
        moving forward.
      </p>
    </motion.div>

    {/* Workout Dashboard */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
    >

      {/* Dashboard Header */}
      <div className="border-b border-white/10 p-6 md:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />

              <p className="text-sm font-medium text-gray-400">
                TODAY'S WORKOUT
              </p>
            </div>

            <h3 className="mt-3 text-3xl font-black">
              Upper Body Strength
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Chest • Back • Shoulders • Arms
            </p>
          </div>

          <button className="rounded-full bg-lime-400 px-7 py-3.5 font-bold text-black transition hover:bg-lime-300">
            Start Workout →
          </button>

        </div>
      </div>

      {/* Workout Stats */}
      <div className="grid border-b border-white/10 sm:grid-cols-3">

        <div className="border-b border-white/10 p-6 sm:border-r sm:border-b-0">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Duration
          </p>

          <p className="mt-2 text-2xl font-black">
            48 min
          </p>
        </div>

        <div className="border-b border-white/10 p-6 sm:border-r sm:border-b-0">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Exercises
          </p>

          <p className="mt-2 text-2xl font-black">
            08
          </p>
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Estimated Burn
          </p>

          <p className="mt-2 text-2xl font-black">
            420 kcal
          </p>
        </div>

      </div>

      {/* Exercise List */}
      <div className="p-6 md:p-8">

        <div className="mb-5 flex items-center justify-between">
          <h4 className="text-lg font-bold">
            Exercise Plan
          </h4>

          <span className="text-sm text-gray-500">
            3 / 8 completed
          </span>
        </div>

        <div className="space-y-3">

          {/* Exercise 1 */}
          <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-lime-400/30 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-bold text-black">
                ✓
              </div>

              <div>
                <p className="font-semibold">
                  Barbell Bench Press
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Chest • Compound
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-400">
                4 Sets
              </span>

              <span className="text-gray-400">
                8–10 Reps
              </span>

              <span className="font-semibold text-lime-400">
                Done
              </span>
            </div>

          </div>

          {/* Exercise 2 */}
          <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-lime-400/30 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-bold text-black">
                ✓
              </div>

              <div>
                <p className="font-semibold">
                  Lat Pulldown
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Back • Pull
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-400">
                3 Sets
              </span>

              <span className="text-gray-400">
                10–12 Reps
              </span>

              <span className="font-semibold text-lime-400">
                Done
              </span>
            </div>

          </div>

          {/* Exercise 3 */}
          <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-lime-400/30 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-bold text-black">
                ✓
              </div>

              <div>
                <p className="font-semibold">
                  Dumbbell Shoulder Press
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Shoulders • Push
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-400">
                3 Sets
              </span>

              <span className="text-gray-400">
                8–12 Reps
              </span>

              <span className="font-semibold text-lime-400">
                Done
              </span>
            </div>

          </div>

          {/* Exercise 4 */}
          <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-lime-400/30 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-bold text-gray-400">
                04
              </div>

              <div>
                <p className="font-semibold">
                  Cable Bicep Curl
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Arms • Isolation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-400">
                3 Sets
              </span>

              <span className="text-gray-400">
                10–12 Reps
              </span>

              <span className="font-semibold text-gray-500">
                Upcoming
              </span>
            </div>

          </div>

        </div>

        {/* Progress */}
        <div className="mt-7">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-gray-500">
              Workout Progress
            </span>

            <span className="font-semibold text-lime-400">
              38%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[38%] rounded-full bg-lime-400" />
          </div>
        </div>

      </div>
    </motion.div>

  </div>
</section>
{/* PROGRESS SECTION */}
<section
  id="progress"
  className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24"
>
  <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
        Track Your Progress
      </p>

      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        SEE THE
        <span className="text-lime-400"> CHANGE.</span>
      </h2>

      <p className="mt-5 max-w-xl text-gray-400">
        Your consistency creates results. Track your progress and stay
        motivated every step of the way.
      </p>
    </motion.div>

    {/* Dashboard */}
    <div className="mt-14 grid gap-6 lg:grid-cols-3">

      {/* Weight Progress */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:col-span-2"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Weight Progress
            </p>

            <div className="mt-2 flex items-end gap-3">
              <p className="text-4xl font-black">
                72.4 kg
              </p>

              <span className="mb-1 rounded-full bg-lime-400/10 px-2.5 py-1 text-xs font-semibold text-lime-400">
                -4.6 kg
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Last 8 weeks
            </p>
          </div>

          <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 outline-none">
            <option className="bg-[#111]">8 Weeks</option>
            <option className="bg-[#111]">3 Months</option>
            <option className="bg-[#111]">6 Months</option>
          </select>
        </div>

        {/* Chart */}
        <div className="relative mt-10 h-64">

          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-t border-white/5" />
            <div className="border-t border-white/5" />
            <div className="border-t border-white/5" />
            <div className="border-t border-white/5" />
            <div className="border-t border-white/5" />
          </div>

          {/* Chart Line */}
          <svg
            viewBox="0 0 800 250"
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 55 C80 65 100 75 170 85 C240 95 270 115 340 105 C410 95 450 140 520 130 C590 120 620 160 680 145 C730 135 760 175 800 160 L800 250 L0 250 Z"
              fill="url(#progressGradient)"
            />

            <path
              d="M0 55 C80 65 100 75 170 85 C240 95 270 115 340 105 C410 95 450 140 520 130 C590 120 620 160 680 145 C730 135 760 175 800 160"
              fill="none"
              stroke="#a3e635"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-gray-600">
            <span>JUL 01</span>
            <span>JUL 15</span>
            <span>AUG 01</span>
            <span>AUG 15</span>
          </div>

        </div>
      </motion.div>

      {/* Streak */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <p className="text-sm text-gray-500">
          Current Streak
        </p>

        <div className="mt-6 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 text-3xl">
            🔥
          </div>

          <div>
            <p className="text-5xl font-black">
              14
            </p>

            <p className="mt-1 text-sm text-gray-500">
              days
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold">
            Keep going!
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            You're building a strong habit. Two more weeks and you'll hit
            your next milestone.
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div
              key={index}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                index < 6
                  ? "bg-lime-400 text-black"
                  : "bg-white/10 text-gray-500"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Stats */}
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Workouts
        </p>
        <p className="mt-2 text-3xl font-black">
          42
        </p>
        <p className="mt-1 text-xs text-lime-400">
          +12% this month
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Calories Burned
        </p>
        <p className="mt-2 text-3xl font-black">
          18.4K
        </p>
        <p className="mt-1 text-xs text-lime-400">
          +8% this month
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Active Hours
        </p>
        <p className="mt-2 text-3xl font-black">
          31.5
        </p>
        <p className="mt-1 text-xs text-lime-400">
          +5.4 hours
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Personal Records
        </p>
        <p className="mt-2 text-3xl font-black">
          07
        </p>
        <p className="mt-1 text-xs text-lime-400">
          New records
        </p>
      </div>

    </div>

  </div>
</section>
{/* TESTIMONIALS */}
<section className="border-t border-white/10 bg-[#080808] px-6 py-24">
  <div className="mx-auto max-w-7xl">

    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
        Community
      </p>

      <h2 className="mt-3 text-4xl font-black sm:text-5xl">
        BUILT FOR PEOPLE
        <span className="text-lime-400"> WHO SHOW UP.</span>
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-gray-400">
        Real consistency. Real progress. Real people building stronger
        versions of themselves.
      </p>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-3">

      {/* Review 1 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <div className="text-lime-400">
          ★★★★★
        </div>

        <p className="mt-6 leading-7 text-gray-300">
          "FitForge completely changed how I train. Having my workouts,
          nutrition and progress in one place keeps me consistent."
        </p>

        <div className="mt-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-bold">
            AK
          </div>

          <div>
            <p className="text-sm font-semibold">Alex Kumar</p>
            <p className="text-xs text-gray-500">
              Strength Program
            </p>
          </div>
        </div>
      </motion.div>

      {/* Review 2 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <div className="text-lime-400">
          ★★★★★
        </div>

        <p className="mt-6 leading-7 text-gray-300">
          "The progress tracking is my favorite feature. I can actually see
          how much stronger and more consistent I've become."
        </p>

        <div className="mt-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-bold">
            SM
          </div>

          <div>
            <p className="text-sm font-semibold">Sarah Miller</p>
            <p className="text-xs text-gray-500">
              Weight Loss Program
            </p>
          </div>
        </div>
      </motion.div>

      {/* Review 3 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
      >
        <div className="text-lime-400">
          ★★★★★
        </div>

        <p className="mt-6 leading-7 text-gray-300">
          "It feels like having a personal coach in my pocket. Simple,
          motivating and incredibly easy to use."
        </p>

        <div className="mt-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-bold">
            RJ
          </div>

          <div>
            <p className="text-sm font-semibold">Ryan Johnson</p>
            <p className="text-xs text-gray-500">
              Muscle Gain Program
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>


{/* FINAL CTA */}
<section className="px-6 py-24">
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-400 px-8 py-16 text-black md:px-16"
  >

    <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em]">
          Your next chapter starts now
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
          READY TO BECOME
          <br />
          YOUR STRONGEST SELF?
        </h2>

        <p className="mt-5 max-w-xl text-black/60">
          Start training smarter and build habits that last.
        </p>
      </div>

      <button className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-black px-7 py-4 font-bold text-white transition hover:bg-neutral-800">
        Start Training
        <ArrowRight
          size={19}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

    </div>
  </motion.div>
</section>


{/* FOOTER */}
<footer className="border-t border-white/10 bg-[#080808] px-6 pt-16">

  <div className="mx-auto max-w-7xl">

    <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div>
        <div className="text-2xl font-black">
          FIT<span className="text-lime-400">FORGE</span>
        </div>

        <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
          A smarter way to train, eat and track your fitness journey.
        </p>
      </div>

      {/* Product */}
      <div>
        <h3 className="text-sm font-bold">Product</h3>

        <div className="mt-5 space-y-3 text-sm text-gray-500">
          <a href="#programs" className="block hover:text-white">
            Programs
          </a>
          <a href="#workouts" className="block hover:text-white">
            Workouts
          </a>
          <a href="#nutrition" className="block hover:text-white">
            Nutrition
          </a>
          <a href="#progress" className="block hover:text-white">
            Progress
          </a>
        </div>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-sm font-bold">Company</h3>

        <div className="mt-5 space-y-3 text-sm text-gray-500">
          <a href="#about" className="block hover:text-white">
            About
          </a>
          <a href="#" className="block hover:text-white">
            Contact
          </a>
          <a href="#" className="block hover:text-white">
            Careers
          </a>
          <a href="#" className="block hover:text-white">
            Blog
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-sm font-bold">
          Stay in the loop
        </h3>

        <p className="mt-5 text-sm leading-6 text-gray-500">
          Get fitness tips, new workouts and product updates.
        </p>

        <div className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
          <input
            type="email"
            placeholder="Your email"
            className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-gray-600"
          />

          <button className="bg-lime-400 px-5 text-sm font-bold text-black">
            Join
          </button>
        </div>
      </div>

    </div>

    {/* Bottom */}
    <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-7 text-xs text-gray-600 sm:flex-row">
      <p>
        © 2026 FitForge. All rights reserved.
      </p>

      <div className="flex gap-6">
        <a href="#" className="hover:text-white">
          Privacy
        </a>

        <a href="#" className="hover:text-white">
          Terms
        </a>

        <a href="#" className="hover:text-white">
          Cookies
        </a>
      </div>
    </div>

  </div>
</footer>
    </main>
  );
}