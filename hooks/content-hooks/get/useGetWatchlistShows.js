import { useQuery } from "react-query";
import { supabase } from "../../../client";

const fetchWatchlistShows = async (user_id) => {
  const { data, error } = await supabase
    .from("watchlist_shows")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function getWatchlistShows() {
  const user = supabase.auth.user();
  return useQuery("watchlist_shows", () => fetchWatchlistShows(user?.id));
}
