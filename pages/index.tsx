import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { childNode } from "../interface/interface";
import StyledForm from "../styled/index.js";

const App: NextPage = (props: childNode): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <StyledForm>
                    <form>
                        <input type="text" placeholder="Full name" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <button>Sign In</button>
                    </form>
                </StyledForm>
            </Layout>
        </div>
    );
};

export default App;
