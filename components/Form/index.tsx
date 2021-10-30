import React, { useEffect } from "react";
import { childNode } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import { any } from "../../styled/styled-system";
import { useForm } from "../../utils/useForm";

interface FormProps {
    result?: any;
}

interface useFormProps {
    "ASIN‏": string;
    "出版社‏": string;
    "発売日‏": string;
    "言語‏": string;
    "ファイルサイズ‏": string;
    "Text-to-Speech（テキスト読み上げ機能）‏": string;
    "X-Ray‏": string;
    "Word Wise‏": string;
    "本の長さ‏": string;
    "Amazon 売れ筋ランキング": string;
    カスタマーレビュー: string;
    image: string;
    stars: string;
    authors: string[];
    title: string;
    description: string;
}

const StyledForm: StyledComponent<"div", any, { width }, never> = styled.div`
    width: 49%;
    ${flex}
    flex-direction: column;
    ${tw`border-2 rounded-md border-blue-500 p-2`}
    ${any}
`;

const Form = (props: FormProps): JSX.Element => {
    const [info, handleChange] = useForm(props.result || {});

    useEffect(() => {
        // handleChange(props.result);
        console.log(props.result);
        console.log(info);
    }, [props.result]);

    return (
        <Box flex marginTop="8px" flexWrap="wrap">
            <StyledForm
                data-test="component-form"
                width={["100%", null, "49%", "50%"]}
            >
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props1:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props2:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props3:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props4:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props5:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Props6:</Text>
                    <Input
                        width={["50px", "100px", "150px", "200px"]}
                        type="text"
                    />
                </Box>
            </StyledForm>
            <StyledForm width={["100%", null, "50%", "49%"]}>
                <Box flex flexDirection="column">
                    <Text fontSize={["20px", null, null, "30px"]}>Props1:</Text>
                    <Text fontSize={["20px", null, null, "30px"]}>Props2:</Text>
                    <Text fontSize={["20px", null, null, "30px"]}>Props3:</Text>
                    <Text fontSize={["20px", null, null, "30px"]}>Props4:</Text>
                    <Text fontSize={["20px", null, null, "30px"]}>Props5:</Text>
                </Box>
            </StyledForm>
        </Box>
    );
};

export default Form;
