import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../client";

const createUser = async (userData) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("username", userData.username)
    .single();

  if (userWithUsername) {
    throw new Error("User with username exists");
  }

  const { user, session, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw error;
  }
  return user;
};

export default function useCreateUser(userData) {
  return useMutation(() => createUser(userData), {
    onSuccess: async (user) => {
      console.log(user);
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          name: userData.name,
          username: userData.username,
          id: user.id,
        });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}
