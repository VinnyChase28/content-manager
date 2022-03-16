import { useRouter } from "next/router";
import { useState } from "react";
import useCreateUser from "../hooks/useCreateUser.";

import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";

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
      <div style={{ maxWidth: "420px", margin: "96px auto" }}>
        <h1>Sign up</h1>

        <div>
          {createUserMutation.isError && (
            <p>{createUserMutation.error.message}</p>
          )}
          <p>Name</p>
          <input onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <p>Username</p>
          <input onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <button
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
          </button>
        </div>
      </div>
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
