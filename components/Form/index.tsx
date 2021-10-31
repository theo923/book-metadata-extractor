import React, { useState } from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import { any } from "../../styled/styled-system";
import { useForm } from "../../utils/useForm";
import { getLabel } from "../../utils/getLabel";
import { books } from "../../interface/default_value";
import { booksProps } from "../../interface/interface";
import axios, { AxiosResponse } from "axios";
import Button from "../../styled/Button";

interface FormProps {
    result?: booksProps;
    locale?: string;
    url?: string;
}

const StyledForm: StyledComponent<"div", any, { width }, never> = styled.div`
    width: 49%;
    justify-content: flex-start;
    ${tw`border-2 rounded-md border-blue-500 p-2`}
    ${any}
`;

const Form = (props: FormProps): JSX.Element => {
    const [info, handleChange] = useForm(props.result || books);
    const [description, setDescription] = useState<string>("");

    const handleDescription = async (): Promise<any> => {
        if (props?.url.includes("amazon")) {
            await axios
                .post("/api/amazon", {
                    method: "description",
                    url: props?.url,
                })
                .then((data: AxiosResponse<string>) => {
                    if (data.status === 200) {
                        setDescription(data.data);
                    }
                });
        }
    };

    return (
        <Box
            data-test="component-form"
            flex
            alignItems="flex-start"
            marginTop="8px"
            flexWrap="wrap"
        >
            <StyledForm width={["100%", null, "50%", "49%"]}>
                <Box flex flexDirection="column">
                    <img src={info?.image}></img>
                    {Object.keys(info).map((key, idx) => (
                        <Box flex flexWrap="wrap" key={idx}>
                            <Text fontSize={["15px", null, null, "20px"]}>
                                {`${getLabel(key, props.locale)} :`}
                            </Text>
                            <Text fontSize={["15px", null, null, "20px"]}>
                                {key === "description"
                                    ? description
                                    : info[key]}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </StyledForm>
            <StyledForm width={["100%", null, "49%", "50%"]}>
                {Object.keys(info).map((key, idx) => (
                    <Box grid gridTemplateColumns="1fr 1fr" key={idx}>
                        <Text fontSize={["20px", null, null, "30px"]}>
                            {`${key} :`}
                        </Text>
                        <Box>
                            <Input
                                name={key}
                                width={["150px", "150px", "150px", "200px"]}
                                type="text"
                                value={
                                    key === "description"
                                        ? description
                                        : info[key]
                                }
                                onChange={handleChange}
                            />
                            {key === "description" && (
                                <Button onClick={() => handleDescription()}>
                                    get
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))}
            </StyledForm>
        </Box>
    );
};

export default Form;
