import React from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import { any } from "../../styled/styled-system";
import { useForm } from "../../utils/useForm";
import { getLabel } from "../../utils/getLabel";

interface FormProps {
    result?: any;
    locale?: string;
}

const StyledForm: StyledComponent<"div", any, { width }, never> = styled.div`
    width: 49%;
    justify-content: flex-start;
    ${tw`border-2 rounded-md border-blue-500 p-2`}
    ${any}
`;

const Form = (props: FormProps): JSX.Element => {
    const [info, handleChange] = useForm(props.result || {});

    return (
        <Box flex alignItems="flex-start" marginTop="8px" flexWrap="wrap">
            <StyledForm width={["100%", null, "50%", "49%"]}>
                <Box flex flexDirection="column">
                    <img src={info.image}></img>
                    {Object.keys(info).map((key, idx) => (
                        <Box flex flexWrap="wrap" key={idx}>
                            <Text fontSize={["15px", null, null, "20px"]}>
                                {`${getLabel(key, props.locale)} :`}
                            </Text>
                            <Text fontSize={["15px", null, null, "20px"]}>
                                {info[key]}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </StyledForm>
            <StyledForm
                data-test="component-form"
                width={["100%", null, "49%", "50%"]}
            >
                {Object.keys(info).map((key, idx) => (
                    <Box grid gridTemplateColumns="1fr 1fr" key={idx}>
                        <Text fontSize={["20px", null, null, "30px"]}>
                            {`${key} :`}
                        </Text>
                        <Input
                            name={key}
                            width={["150px", "150px", "150px", "200px"]}
                            type="text"
                            value={info[key]}
                            onChange={handleChange}
                        />
                    </Box>
                ))}
            </StyledForm>
        </Box>
    );
};

export default Form;
