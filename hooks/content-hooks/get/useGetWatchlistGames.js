import { useQuery } from "react-query";
import { supabase } from "../../../client";

const fetchWatchlistGames = async (user_id) => {
  const { data: watchGameData, error } = await supabase
    .from("watchlist_games")
    .select()
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
  }

  return watchGameData;
};

export default function getWatchlistGames() {
  const user = supabase.auth.user();
  return useQuery("watchlist_games", () => fetchWatchlistGames(user?.id));
}
