import Head from "next/head";
import React, { useState, useEffect } from "react";
import clientPromise from "../lib/mongodb";
import styled from "styled-components";
import Layout from "../components/Layout";

const Hero = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 10rem;
  font-weight: 900;
`;

export default function Home({ isConnected }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <Heading>Next</Heading>
      </Hero>
      <p>
        {" "}
        {isConnected ? (
          <p>You are connected to MongoDB</p>
        ) : (
          <p>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </p>
        )}
      </p>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
