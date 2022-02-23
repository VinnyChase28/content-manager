import { useQuery } from "react-query";
import { supabase } from "../../../client";

const fetchWatchlistMovies = async (user_id) => {
  const { data, error } = await supabase
    .from("watchlist_movies")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function getWatchlistMovies() {
  const user = supabase.auth.user();
  return useQuery("watchlist_movies", () => fetchWatchlistMovies(user?.id));
}
