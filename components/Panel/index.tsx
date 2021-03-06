import { useEffect, useState } from "react";
import { booksProps, mangaProps, childNode } from "../../interface/interface";
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
import TagManager from "../Tag_Manager";

const StyledPanel: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw` rounded-md  p-2`}
`;

const Panel = (props: childNode): JSX.Element => {
    const [url, setUrl] = useState<string>("");
    const [locale, setLocale] = useState<string>("");
    const [type, setType] = useState<"ebook" | "manga">();
    const [result, setResult] = useState<booksProps | mangaProps | boolean>(
        false
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>();
    const [error, setError] = useState<string>("");
    const [time, setTime] = useState<number>(0);
    const [tagData, setTagData] = useState<string[]>([]);

    useEffect(() => {
        if (!result && loaded) setError("error, please try again!");
    }, [loading]);

    useEffect(() => {
        let timer;
        if (!result && loading)
            timer = setTimeout(() => setTime(time + 1), 1000);
        else setTime(0);
        return () => {
            clearTimeout(timer);
        };
    }, [time, loading]);

    const handleExtract = async (): Promise<any> => {
        setLoading(true);
        if (url.includes("ebook")) setType("ebook");
        else setType("manga");
        if (url.includes(".jp")) setLocale("jp");
        else setLocale("en");
        if (url.includes("amazon")) {
            await axios
                .post("/api/amazon", {
                    url,
                    method: "normal",
                    type: url.includes("ebook") ? "ebook" : "manga",
                })
                .then((data: AxiosResponse<booksProps | mangaProps>) => {
                    if (data.status === 200) {
                        setError("");
                        setResult(data.data);
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
                <>
                    <TagManager tagData={tagData} setTagData={setTagData} />
                    <Form
                        result={ordered(result)}
                        type={type}
                        locale={locale}
                        url={url}
                        tagData={tagData}
                    />
                </>
            )}
        </>
    );
};

export default Panel;
