import { useState } from "react";
import { booksProps, childNode } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import axios, { AxiosResponse } from "axios";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import Form from "../Form";

const StyledPanel: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw`border-2 rounded-md border-blue-500 p-2`}
`;

const isBook = (x: any): x is booksProps => x !== undefined;

const Panel = (props: childNode): JSX.Element => {
    const [url, setUrl] = useState<string>("");
    const [locale, setLocale] = useState<string>("");
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleExtract = async (): Promise<any> => {
        setLoading(true);
        if (url.includes(".jp")) setLocale("jp");
        else setLocale("en");
        if (url.includes("amazon")) {
            await axios
                .post("/api/amazon", {
                    url,
                })
                .then((data: AxiosResponse<booksProps>) => {
                    if (data.status === 200) setResult(data.data);
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
                    {!loading && (
                        <Button onClick={() => handleExtract()}>Submit</Button>
                    )}
                </Box>
            </StyledPanel>
            {Object.keys(result).length !== 0 && (
                <Form result={result} locale={locale} />
            )}
        </>
    );
};

export default Panel;
