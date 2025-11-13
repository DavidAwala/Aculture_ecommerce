import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signInEmail = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    alert("Check your email for a login link!");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, signInEmail, signOut };
}
