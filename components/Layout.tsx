import React from "react";
import { childNode } from "../interface/interface";

const Layout = (props: childNode): JSX.Element => {
    return (
        <div data-test="component-layout" className="layout">
            <div />
            <div style={{ maxWidth: "1300px" }}>{props.children}</div>
            <div />
        </div>
    );
};

export default Layout;
