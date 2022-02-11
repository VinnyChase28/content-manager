import Head from "next/head";
import React, { useState, useEffect } from "react";
import clientPromise from "../lib/mongodb";
import styled from "styled-components";
import Layout from "../components/Layout";
import TextAnimation from "../components/animations/TextAnimation";
import FadeIn from "../components/animations/FadeIn";
import { Content } from "../components/Tabs/Tab";
import { Button } from "../components/Button/Button";

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
  font-size: 20px;
`;

const Spacer = styled.div`
  width: 200px;
  height: 50px;
  margin-right: 0px;
`;

const Row = styled.section`
  flex-direction: row;
`;

export default function Home({ isConnected }) {
  const [active, setActive] = useState(null);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
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
          <Row>
            <Button active={active === 0} id={0} onClick={handleClick}>
              Movies
            </Button>

            <Button active={active === 1} id={1} onClick={handleClick}>
              Shows
            </Button>
            <Button active={active === 2} id={2} onClick={handleClick}>
              Games
            </Button>
          </Row>
        </FadeIn>
        <>
          <Content active={active === 0}>
            <h1>Content 1</h1>
          </Content>
          <Content active={active === 1}>
            <h1>Content 2</h1>
          </Content>
          <Content active={active === 2}>
            <h1>Content 3</h1>
          </Content>
        </>

        {/* <Text>
          {isConnected ? (
            <Text>You are connected to MongoDB</Text>
          ) : (
            <Text>
              You are NOT (yet) connected to MongoDB. Check the{" "}
              <code>README.md</code>
              for instructions.
            </Text>
          )}
        </Text> */}
      </Hero>
    </>
  );
}

//mogodb connection

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
