import { useQuery } from "react-query";
import { supabase } from "../../../client";

const fetchFavoriteGames = async (user_id) => {
  const { data: favGameData, error } = await supabase
    .from("favorite_games")
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return favGameData;
};

export default function getFavoriteGames() {
  const user = supabase.auth.user();
  return useQuery("favorite_games", () => fetchFavoriteGames(user?.id));
}
