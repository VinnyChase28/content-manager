/* pages/profile.js */
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userData = await supabase.auth.user();
    if (!userData) {
      router.push("/sign-in");
    } else {
      setUser(userData);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/sign-up");
  }
  if (!user) return null;
  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <h2>Hello, {user.email}</h2>
      <p>User ID: {user.id}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
