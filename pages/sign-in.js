/* pages/sign-in.js */
import { useState } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin({ email, password });

  if (loginMutation.isSuccess) {
    router.push("/");
  }

  {
    loginMutation.isError && <p>{loginMutation.error.message}</p>;
  }

  return (
    <div>
      <div style={{ maxWidth: "420px", margin: "96px auto" }}>
        <div>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="my-8 w-full lg:w-auto px-4">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-8 py-2 rounded w-full"
            onClick={() => loginMutation.mutate()}
          >
            {loginMutation.isLoading ? (
              <span>
                <p>Loading</p>
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
