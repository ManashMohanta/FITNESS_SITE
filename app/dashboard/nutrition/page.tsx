"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Sidebar from "../components/Sidebar";

const FoodDatabase = [
  { name: "Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: "Egg", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Soya Chunks", calories: 345, protein: 52, carbs: 33, fat: 0.5 },
  { name: "Dal", calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: "Milk", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  { name: "Curd", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: "Chana", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
  { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
];

const MealTypes = [
  "Breakfast",
  "Lunch",
  "Snacks",
  "Dinner",
];

type Food = {
  id: number;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: string;
  meal_type: string;
  logged_at: string;
};

export default function NutritionPage() {
  const [Foods, setFoods] = useState<Food[]>([]);

  const [FoodName, setFoodName] = useState("");
  const [MealType, setMealType] = useState("Breakfast");
  const [Quantity, setQuantity] = useState("100g");

  const [Calories, setCalories] = useState("");
  const [Protein, setProtein] = useState("");
  const [Carbs, setCarbs] = useState("");
  const [Fat, setFat] = useState("");

  const [UserGoal, setUserGoal] = useState("");
  const [UserWeight, setUserWeight] = useState(0);

  const [Loading, setLoading] = useState(true);
  const [Saving, setSaving] = useState(false);

  useEffect(() => {
    LoadData();
  }, []);

  async function LoadData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: NutritionData, error } = await supabase
      .from("nutrition_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("logged_at", { ascending: false });

    if (!error && NutritionData) {
      setFoods(NutritionData);
    }

    const { data: ProfileData } = await supabase
      .from("profiles")
      .select("goal, weight")
      .eq("id", user.id)
      .single();

    if (ProfileData) {
      setUserGoal(ProfileData.goal || "");
      setUserWeight(Number(ProfileData.weight) || 0);
    }

    setLoading(false);
  }

  function SelectFood(value: string) {
    setFoodName(value);

    const SelectedFood = FoodDatabase.find(
      (Food) => Food.name === value
    );

    if (SelectedFood) {
      setCalories(String(SelectedFood.calories));
      setProtein(String(SelectedFood.protein));
      setCarbs(String(SelectedFood.carbs));
      setFat(String(SelectedFood.fat));
      setQuantity("100g");
    } else {
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
    }
  }

  async function AddFood() {
    if (
      !FoodName ||
      !Calories ||
      !Protein ||
      !Carbs ||
      !Fat ||
      !MealType
    ) {
      alert("Please fill all nutrition details.");
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

    const { error } = await supabase
      .from("nutrition_logs")
      .insert({
        user_id: user.id,
        food_name: FoodName,
        calories: Number(Calories),
        protein: Number(Protein),
        carbs: Number(Carbs),
        fat: Number(Fat),
        quantity: Quantity,
        meal_type: MealType,
      });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    setFoodName("");
    setMealType("Breakfast");
    setQuantity("100g");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");

    await LoadData();

    setSaving(false);
  }

  async function DeleteFood(id: number) {
    const ConfirmDelete = confirm(
      "Are you sure you want to delete this food?"
    );

    if (!ConfirmDelete) return;

    const { error } = await supabase
      .from("nutrition_logs")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setFoods(Foods.filter((Food) => Food.id !== id));
  }

  const TotalCalories = Foods.reduce(
    (total, Food) => total + Number(Food.calories || 0),
    0
  );

  const TotalProtein = Foods.reduce(
    (total, Food) => total + Number(Food.protein || 0),
    0
  );

  const TotalCarbs = Foods.reduce(
    (total, Food) => total + Number(Food.carbs || 0),
    0
  );

  const TotalFat = Foods.reduce(
    (total, Food) => total + Number(Food.fat || 0),
    0
  );

  let CalorieTarget = 2000;
  let ProteinTarget = 100;
  let CarbTarget = 250;
  let FatTarget = 65;

  if (UserWeight > 0) {
    ProteinTarget = Math.round(UserWeight * 1.6);
    CalorieTarget = Math.round(UserWeight * 30);
    CarbTarget = Math.round((CalorieTarget * 0.45) / 4);
    FatTarget = Math.round((CalorieTarget * 0.25) / 9);
  }

  if (
    UserGoal === "Weight Gain" ||
    UserGoal === "Muscle Gain"
  ) {
    CalorieTarget += 300;
  }

  if (UserGoal === "Weight Loss") {
    CalorieTarget -= 300;
  }

  if (Loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🍎</div>
          <p className="text-zinc-400">
            Loading Nutrition...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <section className="flex-1 min-w-0">

        <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-10 py-7">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                  NUTRITION CENTER
                </p>

              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Nutrition{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Tracker 🍎
                </span>
              </h1>

              <p className="text-zinc-500 mt-3">
                Track your daily calories and nutrition goals.
              </p>

            </div>

            <button
              onClick={() =>
                (window.location.href = "/dashboard")
              }
              className="self-start lg:self-auto px-5 py-3 rounded-xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 text-sm font-semibold transition"
            >
              ← Dashboard
            </button>

          </div>

          {/* TARGET CARDS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

            <TargetCard
              title="Calories"
              current={TotalCalories}
              target={CalorieTarget}
              unit="kcal"
              icon="🔥"
              iconBg="bg-orange-500/10"
              border="hover:border-orange-500/30"
            />

            <TargetCard
              title="Protein"
              current={TotalProtein}
              target={ProteinTarget}
              unit="g"
              icon="🥩"
              iconBg="bg-green-500/10"
              border="hover:border-green-500/30"
            />

            <TargetCard
              title="Carbs"
              current={TotalCarbs}
              target={CarbTarget}
              unit="g"
              icon="🍚"
              iconBg="bg-blue-500/10"
              border="hover:border-blue-500/30"
            />

            <TargetCard
              title="Fat"
              current={TotalFat}
              target={FatTarget}
              unit="g"
              icon="🥑"
              iconBg="bg-yellow-500/10"
              border="hover:border-yellow-500/30"
            />

          </div>

          {/* ADD FOOD */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 overflow-hidden mb-7">

            {/* CARD HEADER */}
            <div className="px-6 md:px-7 py-5 border-b border-white/10">

              <div className="flex items-center gap-3">

                <div className="h-11 w-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                  🍽️
                </div>

                <div>

                  <p className="text-xs text-zinc-600 font-semibold tracking-wider">
                    FOOD LOG
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    Add Food
                  </h2>

                </div>

              </div>

              <p className="text-sm text-zinc-500 mt-4">
                Food database values are approximately per 100g.
              </p>

            </div>

            {/* FORM */}
            <div className="p-6 md:p-7">

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                {/* FOOD */}
                <FormField label="Choose Food">

                  <select
                    value={FoodName}
                    onChange={(e) =>
                      SelectFood(e.target.value)
                    }
                    className="NutritionInput"
                  >
                    <option value="">
                      Select Food
                    </option>

                    {FoodDatabase.map((Food) => (
                      <option
                        key={Food.name}
                        value={Food.name}
                      >
                        {Food.name}
                      </option>
                    ))}

                    <option value="Custom">
                      Custom / Manual Entry
                    </option>
                  </select>

                </FormField>

                {/* MEAL */}
                <FormField label="Meal Type">

                  <select
                    value={MealType}
                    onChange={(e) =>
                      setMealType(e.target.value)
                    }
                    className="NutritionInput"
                  >
                    {MealTypes.map((Meal) => (
                      <option key={Meal} value={Meal}>
                        {Meal}
                      </option>
                    ))}
                  </select>

                </FormField>

                {/* QUANTITY */}
                <FormField label="Quantity">

                  <input
                    value={Quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }
                    placeholder="Example: 100g"
                    className="NutritionInput"
                  />

                </FormField>

                {/* CALORIES */}
                <FormField label="Calories">

                  <input
                    type="number"
                    value={Calories}
                    onChange={(e) =>
                      setCalories(e.target.value)
                    }
                    placeholder="Calories"
                    className="NutritionInput"
                  />

                </FormField>

                {/* PROTEIN */}
                <FormField label="Protein (g)">

                  <input
                    type="number"
                    value={Protein}
                    onChange={(e) =>
                      setProtein(e.target.value)
                    }
                    placeholder="Protein"
                    className="NutritionInput"
                  />

                </FormField>

                {/* CARBS */}
                <FormField label="Carbs (g)">

                  <input
                    type="number"
                    value={Carbs}
                    onChange={(e) =>
                      setCarbs(e.target.value)
                    }
                    placeholder="Carbs"
                    className="NutritionInput"
                  />

                </FormField>

                {/* FAT */}
                <FormField label="Fat (g)">

                  <input
                    type="number"
                    value={Fat}
                    onChange={(e) =>
                      setFat(e.target.value)
                    }
                    placeholder="Fat"
                    className="NutritionInput"
                  />

                </FormField>

              </div>

              <button
                onClick={AddFood}
                disabled={Saving}
                className="w-full mt-6 rounded-xl bg-white text-black py-4 font-bold hover:bg-zinc-200 transition disabled:opacity-50"
              >
                {Saving
                  ? "Saving Food..."
                  : "+ Add Food"}
              </button>

            </div>

          </div>

          {/* MEAL HISTORY */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden">

            <div className="px-6 md:px-7 py-5 border-b border-white/10">

              <div className="flex items-center gap-3">

                <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                  📋
                </div>

                <div>

                  <p className="text-xs text-zinc-600 font-semibold tracking-wider">
                    DAILY LOG
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    Today's Meals
                  </h2>

                </div>

              </div>

            </div>

            <div className="p-5 md:p-7">

              <MealSection
                title="🌅 Breakfast"
                foods={Foods.filter(
                  (Food) => Food.meal_type === "Breakfast"
                )}
                DeleteFood={DeleteFood}
              />

              <MealSection
                title="☀️ Lunch"
                foods={Foods.filter(
                  (Food) => Food.meal_type === "Lunch"
                )}
                DeleteFood={DeleteFood}
              />

              <MealSection
                title="🍎 Snacks"
                foods={Foods.filter(
                  (Food) => Food.meal_type === "Snacks"
                )}
                DeleteFood={DeleteFood}
              />

              <MealSection
                title="🌙 Dinner"
                foods={Foods.filter(
                  (Food) => Food.meal_type === "Dinner"
                )}
                DeleteFood={DeleteFood}
              />

            </div>

          </div>

        </div>

      </section>

      {/* INPUT STYLE */}
      <style jsx global>{`
        .NutritionInput {
          width: 100%;
          padding: 13px 14px;
          margin-top: 8px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: white;
          outline: none;
          transition: all 0.2s ease;
        }

        .NutritionInput:focus {
          border-color: rgba(168, 85, 247, 0.5);
          background: rgba(255, 255, 255, 0.06);
        }

        .NutritionInput::placeholder {
          color: #52525b;
        }

        .NutritionInput option {
          background: #18181b;
          color: white;
        }
      `}</style>

    </main>
  );
}


/* FORM FIELD */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className="text-sm font-medium text-zinc-400">
        {label}
      </label>

      {children}

    </div>
  );
}


/* TARGET CARD */

function TargetCard({
  title,
  current,
  target,
  unit,
  icon,
  iconBg,
  border,
}: {
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  iconBg: string;
  border: string;
}) {
  const Percentage =
    target > 0
      ? Math.min(
          Math.round((current / target) * 100),
          100
        )
      : 0;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-zinc-900/70 p-5 transition-all duration-200 ${border}`}
    >

      <div className="flex items-center justify-between">

        <div
          className={`h-11 w-11 rounded-xl ${iconBg} border border-white/5 flex items-center justify-center text-xl`}
        >
          {icon}
        </div>

        <span className="text-xs text-zinc-600">
          DAILY
        </span>

      </div>

      <p className="text-zinc-500 text-sm mt-5">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-1">

        {Math.round(current)}

        <span className="text-sm text-zinc-600 font-normal">
          {" "}
          / {target} {unit}
        </span>

      </h2>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden mt-4">

        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
          style={{
            width: `${Percentage}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-2">

        <span className="text-[11px] text-zinc-600">
          Progress
        </span>

        <span className="text-[11px] text-zinc-500">
          {Percentage}%
        </span>

      </div>

    </div>
  );
}


/* MEAL SECTION */

function MealSection({
  title,
  foods,
  DeleteFood,
}: {
  title: string;
  foods: Food[];
  DeleteFood: (id: number) => void;
}) {
  return (
    <div className="mb-7 last:mb-0">

      <div className="flex items-center justify-between mb-3">

        <h3 className="text-base font-bold">
          {title}
        </h3>

        {foods.length > 0 && (
          <span className="text-xs text-zinc-600">
            {foods.length} item
            {foods.length > 1 ? "s" : ""}
          </span>
        )}

      </div>

      {foods.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-5 text-center">

          <p className="text-sm text-zinc-600">
            No food added yet.
          </p>

        </div>

      ) : (

        <div className="space-y-2">

          {foods.map((Food) => (

            <div
              key={Food.id}
              className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-white/20 transition"
            >

              <div className="flex items-center gap-4">

                <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  🍽️
                </div>

                <div>

                  <h4 className="font-semibold">
                    {Food.food_name}
                  </h4>

                  <p className="text-xs text-zinc-600 mt-1">
                    {Food.quantity}
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap items-center gap-2">

                <NutritionBadge
                  value={`${Food.calories} kcal`}
                  type="calorie"
                />

                <NutritionBadge
                  value={`${Food.protein}g protein`}
                  type="protein"
                />

                <NutritionBadge
                  value={`${Food.carbs}g carbs`}
                  type="carbs"
                />

                <NutritionBadge
                  value={`${Food.fat}g fat`}
                  type="fat"
                />

                <button
                  onClick={() =>
                    DeleteFood(Food.id)
                  }
                  className="ml-0 md:ml-2 px-3 py-2 rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 text-xs font-medium hover:bg-red-500/10 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


/* NUTRITION BADGE */

function NutritionBadge({
  value,
  type,
}: {
  value: string;
  type: "calorie" | "protein" | "carbs" | "fat";
}) {
  const Styles = {
    calorie:
      "bg-orange-500/5 border-orange-500/10 text-orange-300",
    protein:
      "bg-green-500/5 border-green-500/10 text-green-300",
    carbs:
      "bg-blue-500/5 border-blue-500/10 text-blue-300",
    fat:
      "bg-yellow-500/5 border-yellow-500/10 text-yellow-300",
  };

  return (
    <span
      className={`px-3 py-2 rounded-lg border text-[11px] ${Styles[type]}`}
    >
      {value}
    </span>
  );
}