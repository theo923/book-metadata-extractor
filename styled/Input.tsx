import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { normal } from "./styled-system";

const StyledInput: StyledComponent<"input", any, {}, never> = styled.input`
    font-family: Mukta;
    outline: none;
    width: 300px;
    height: 40px;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
    ${normal}
`;

const Input = ({ ...props }): JSX.Element => {
    return <StyledInput {...props} className="border-black" />;
};

export default Input;
