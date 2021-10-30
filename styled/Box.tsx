import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { childNode } from "../interface/interface";
import { flex } from "./index";
import { any } from "./styled-system";

interface BoxProps {
    flex?: boolean;
}

const StyledBox: StyledComponent<"div", any, {}, never> = styled.div<BoxProps>`
    ${(props) => props?.flex && flex}
    ${tw`gap-2`}
    ${any}
`;

const Box = ({ ...props }): JSX.Element => {
    return <StyledBox {...props}>{props.children}</StyledBox>;
};

export default Box;
