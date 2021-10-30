import { useState } from "react";
import { childNode } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import axios from "axios";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import Form from "../Form";

const StyledPanel: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw`border-2 rounded-md border-blue-500 p-2`}
`;

const Panel = (props: childNode): JSX.Element => {
    const [url, setUrl] = useState<string>("");
    const [result, setResult] = useState({});

    const handleExtract = async (): Promise<any> => {
        if (url.includes("amazon")) {
            await axios
                .post("/api/amazon", {
                    url,
                })
                .then(({data}) => {
                    if (Object.keys(data).length !== 0)
                        setResult(data);
                });
        }
    };

    return (
        <>
            <StyledPanel data-test="component-panel">
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>URL:</Text>
                    <Input
                        width={["200px", "250px", "300px", "350px"]}
                        type="text"
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Please insert an url from amazon"
                    ></Input>
                    <Button onClick={() => handleExtract()}>Submit</Button>
                </Box>
            </StyledPanel>
            {/* {<Form result={result} />} */}
            {Object.keys(result).length !== 0 && <Form result={result} />}
        </>
    );
};

export default Panel;
