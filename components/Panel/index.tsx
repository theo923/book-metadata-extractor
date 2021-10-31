import { useEffect, useState } from "react";
import { booksProps, childNode, nextFailedRequest } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import axios, { AxiosResponse } from "axios";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import Form from "../Form";
import router from "next/router";
import { books } from "../../interface/default_value";
import { ordered } from "../../utils/sortObject";
import { FiRefreshCw } from "react-icons/fi";
import { GrClear } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { NextRouter } from "next/dist/client/router";

const StyledPanel: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw`border-2 rounded-md border-blue-500 p-2`}
`;

const Panel = (props: childNode): JSX.Element => {
    const [url, setUrl] = useState<string>("");
    const [locale, setLocale] = useState<string>("");
    const [result, setResult] = useState<booksProps | boolean | any>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>();
    const [error, setError] = useState<string>("");
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        if (!result && loaded) setError("error, please try again!");
    }, [loading]);

    useEffect(() => {
        let timer;
        if (!result && loading)
            timer = setTimeout(() => setTime(time + 1), 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [time, loading]);

    const handleExtract = async (): Promise<any> => {
        setLoading(true);
        if (url.includes(".jp")) setLocale("jp");
        else setLocale("en");
        if (url.includes("amazon")) {
            await axios
                .post("/api/amazon", {
                    url,
                })
                .then((data: AxiosResponse<booksProps | nextFailedRequest>) => {
                    if (data.status === 200) {
                        setError("");
                        setResult(data.data || false);
                    }
                });
            setLoading(false);
            setLoaded(true);
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
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Please insert an url from amazon"
                    ></Input>
                    {!result && !loading && (
                        <Button onClick={() => handleExtract()}>
                            <FiSearch size="25px" />
                        </Button>
                    )}
                    {((result && !loading) || error.length > 0) && (
                        <Button
                            onClick={() => {
                                setLoaded(false);
                                setResult(false);
                                handleExtract();
                            }}
                        >
                            <FiRefreshCw size="25px" />
                        </Button>
                    )}
                    {!result && !loading && (
                        <Button onClick={() => setResult(books)}>
                            <AiOutlinePlus size="25px" />
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            router.reload();
                        }}
                    >
                        <GrClear size="25px" />
                    </Button>
                </Box>
            </StyledPanel>
            <Box flex flexDirection="column">
                {error.length > 0 && (
                    <Text fontSize={["20px", null, null, "30px"]}>{error}</Text>
                )}
                {loading && (
                    <>
                        <Text fontSize={["20px", null, null, "30px"]}>
                            {`Loading...${time}`}
                        </Text>
                        <br />
                        <Text fontSize={["10px", null, null, "15px"]}>
                            If loading time exceeds 15 seconds, please refresh
                            the page and try again
                        </Text>
                    </>
                )}
            </Box>
            {result !== false && (
                <Form result={ordered(result)} locale={locale} />
            )}
        </>
    );
};

export default Panel;
