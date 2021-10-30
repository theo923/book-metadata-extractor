import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { childNode } from "../interface/interface";
import { StyledForm } from "../styled";

const App: NextPage = (props: childNode): JSX.Element => {
    return (
        <>
            <Head>
                <title>Book Metadata Extractor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Panel />
            </Layout>
        </>
    );
};

export default App;
