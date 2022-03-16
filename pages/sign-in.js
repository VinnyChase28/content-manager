/* pages/sign-in.js */
import { useState } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import useLogin from "../hooks/useLogin";

import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";
import styled from "styled-components";
import { AuthInput } from "../components/Input/Input";
import { Button } from "../components/Button/Button";

const Center = styled.div`
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
`;

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
      <Center style={{ maxWidth: "420px", margin: "96px auto" }}>
        <div>
          <p>Email</p>
          <AuthInput type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="my-8 w-full lg:w-auto px-4">
          <p>Password</p>
          <AuthInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button
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
          </Button>
        </div>
      </Center>
    </div>
  );
}
Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
