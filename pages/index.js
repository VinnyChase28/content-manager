import Head from "next/head";
import React, { useState, useEffect } from "react";
import clientPromise from "../lib/mongodb";
import styled from "styled-components";
import Layout from "../components/Layout";
import TextAnimation from "../components/animations/TextAnimation";
import FadeIn from "../components/animations/FadeIn";
import { MoviePlay, Tv, Game } from "styled-icons/boxicons-regular";

const Hero = styled.div`
  margin: auto;
  text-align: center;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 3rem;
  font-weight: 900;
  margin-top: 100px;
`;

const Text = styled.text`
  font-size: 15px;
`;

const Spacer = styled.div`
  width: 200px;
  height: 50px;
  margin-right: 0px;
`;

const IconRow = styled.div`
  flex-direction: row;
`;

const types = [
  <MoviePlay style={{ height: 100, width: 100 }} />,
  <Tv style={{ height: 100, width: 100 }} />,
  <Game style={{ height: 100, width: 100 }} />,
];
const IconGroup = () => {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <div>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <Text> Your selection: {active} </Text>
    </>
  );
};

export default function Home({ isConnected }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>
      <Hero>
        <Heading>
          <TextAnimation />
          <Spacer></Spacer>
        </Heading>

        <FadeIn duration="2s" delay="2.5s">
          <IconRow>
            <MoviePlay style={{ height: 100, width: 100 }} />
            <Tv style={{ height: 100, width: 100 }} />
            <Game style={{ height: 100, width: 100 }} />
          </IconRow>
        </FadeIn>

        <p>
          {isConnected ? (
            <Text>You are connected to MongoDB</Text>
          ) : (
            <Text>
              You are NOT (yet) connected to MongoDB. Check the{" "}
              <code>README.md</code>
              for instructions.
            </Text>
          )}
        </p>
      </Hero>
    </>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     // client.db() will be the default database passed in the MONGODB_URI
//     // You can change the database by calling the client.db() function and specifying a database like:
//     // const db = client.db("myDatabase");
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
//     await clientPromise;
//     return {
//       props: { isConnected: true },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// }
