import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const addFavGame = async (game, user_id) => {
  const { data, error } = await supabase.from("favorite_games").upsert({
    game_id: game.game_id,
    name: game.name,
    summary: game.summary,
    image_id: game.image_id,
    first_release_date: game.first_release_date,
    user_id,
  });

  if (error) {
    throw error;
  }
  return data;
};

export default function addFavoriteGame(game) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => addFavGame(game, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("favorite_games");
    },
  });
}
