import React from "react";
import { childNode } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import Box from "../../styled/Box";

const StyledLayout: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw`min-h-screen py-2`}
`;

const Layout = (props: childNode): JSX.Element => {
    return (
        <StyledLayout data-test="component-layout">
            <Box />
            <Box width={["400px", "600px", "800px", "1300px"]}>
                {props.children}
            </Box>
            <Box />
        </StyledLayout>
    );
};

export default Layout;
