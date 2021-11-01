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
import { FiSearch, FiDownload, FiArrowRight } from "react-icons/fi";
import { Hdoujin } from "../../output/hdoujin";
import { Koromo } from "../../output/koromo";

interface FormProps {
    result?: booksProps;
    locale?: string;
    url?: string;
    type?: "ebook" | "manga";
}

const StyledForm: StyledComponent<"div", any, { width }, never> = styled.div`
    width: 49%;
    justify-content: flex-start;
    ${tw`rounded-md p-2`}
    ${any}
`;

const Form = (props: FormProps): JSX.Element => {
    const [info, handleChange] = useForm(props.result || books);
    const [description, setDescription] = useState<string>("");
    const [textFormat, setTextFormat] = useState<string>("");
    const [selector, setSelector] = useState<string>("");

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

    const handleExport = () => {
        const blob = new Blob([textFormat], {
            type: "text/plain",
        });
        const url2 = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url2;
        a.download = selector === "Hdou" ? "info.txt" : "Info.json";
        a.click();
        URL.revokeObjectURL(url2);
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
                        <Box flex justifyContent="flex-start">
                            {key === "description" ? (
                                <Input
                                    name={key}
                                    width={["150px", "150px", "150px", "200px"]}
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            ) : (
                                <Input
                                    name={key}
                                    width={["150px", "150px", "150px", "200px"]}
                                    type="text"
                                    value={info[key]}
                                    onChange={handleChange}
                                />
                            )}
                            {key === "description" && (
                                <Button onClick={() => handleDescription()}>
                                    <FiSearch size="25px" />
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))}
                <Box flex justifyContent="flex-start" marginY="10px">
                    <Text
                        display="flex"
                        alignItems="center"
                        fontSize={["10px", null, null, "15px"]}
                    >
                        Select Metadata Format <FiArrowRight size="25px" />
                    </Text>
                    <Button
                        onClick={() => {
                            setSelector("Hdou");
                            setTextFormat(
                                Hdoujin(info, description, props.url)
                            );
                        }}
                    >
                        HDJ
                    </Button>
                    <Button
                        onClick={() => {
                            setSelector("Koromo");
                            setTextFormat(Koromo(info));
                        }}
                    >
                        Koromo
                    </Button>
                    <Text
                        display="flex"
                        alignItems="center"
                        fontSize={["10px", null, null, "15px"]}
                    >
                        Download <FiArrowRight size="25px" />
                    </Text>
                    <Button onClick={() => handleExport()}>
                        <FiDownload size="25px" />
                    </Button>
                </Box>
                <Text fontSize={["20px", null, null, "35px"]}>Preview</Text>
                <Text fontSize={["10px", null, null, "15px"]}>
                    {textFormat}
                </Text>
            </StyledForm>
        </Box>
    );
};

export default Form;
