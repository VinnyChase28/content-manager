import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../client";

const delFavGame = async (game, user_id) => {
  const { data, error } = await supabase
    .from("favorite_games")
    .delete()
    .match({ game_id: game.game_id, user_id: user_id });

  if (error) {
    throw error;
  }
  return data;
};

export default function delFavoriteGame(game) {
  const queryClient = useQueryClient();
  const user = supabase?.auth.user();
  return useMutation(() => delFavGame(game, user?.id), {
    onSuccess: () => {
      queryClient.refetchQueries("favorite_games");
    },
  });
}
