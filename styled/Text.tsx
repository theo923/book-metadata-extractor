import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { any } from "./styled-system";

const StyledText: StyledComponent<"p", any, {}, never> = styled.p`
    font-family: Mukta;
    ${any}
`;

const Text = ({ ...props }): JSX.Element => {
    return <StyledText {...props}>{props.children}</StyledText>;
};

export default Text;
