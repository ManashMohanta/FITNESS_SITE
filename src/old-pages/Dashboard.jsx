import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      window.location.href = "/login";
      return;
    }

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    setUser(data.user);
  };

  const HandleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">
        <h2>FitForge 💪</h2>

        <button onClick={HandleLogout}>
          Logout
        </button>
      </nav>

      <main className="dashboard-content">

        <h1>Welcome to FitForge 🔥</h1>

        {user && (
          <p>
            Logged in as: <strong>{user.email}</strong>
          </p>
        )}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>🏋️ Workouts</h3>
            <p>Track your workouts and build strength.</p>
          </div>

          <div className="dashboard-card">
            <h3>🥗 Nutrition</h3>
            <p>Manage your daily nutrition and meals.</p>
          </div>

          <div className="dashboard-card">
            <h3>📈 Progress</h3>
            <p>Track your fitness progress.</p>
          </div>

          <div className="dashboard-card">
            <h3>👤 Profile</h3>
            <p>Manage your fitness profile.</p>
          </div>

        </div>

      </main>

    </div>
  );
}