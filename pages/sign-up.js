import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button/Button";
import { AuthInput } from "../components/Input/Input";
import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";
import useCreateUser from "../hooks/useCreateUser.";


const Center = styled.div`
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
`;

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const createUserMutation = useCreateUser({
    email,
    password,
    name,
    username,
  });

  if (createUserMutation.isSuccess) {
    router.push("/");
  }

  return (
    <div>
      <Center style={{ maxWidth: "420px", margin: "96px auto" }}>
        <div>
          <p>Name</p>
          <AuthInput onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Email</p>
          <AuthInput onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <AuthInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Username</p>
          <AuthInput onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          {createUserMutation.isError && (
            <p>{createUserMutation.error.message}</p>
          )}
          <Button
            className="bg-blue-500 text-white px-8 py-2 rounded w-full"
            onClick={() => createUserMutation.mutate()}
          >
            {createUserMutation.isLoading ? (
              <span>
                <p>Loading</p>
              </span>
            ) : (
              <span>Sign up</span>
            )}
          </Button>
        </div>
      </Center>
    </div>
  );
}

Signup.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
