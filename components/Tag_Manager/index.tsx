import { useEffect, useState } from "react";
import { childNode } from "../../interface/interface";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { flex } from "../../styled";
import Box from "../../styled/Box";
import Input from "../../styled/Input";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import router from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClear } from "react-icons/gr";

const StyledTagManager: StyledComponent<"div", any, {}, never> = styled.div`
    ${flex}
    ${tw` rounded-md  p-2`}
`;

const TagManager = (props): JSX.Element => {
    const storageTag: string = window?.localStorage?.getItem("tags");
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>(
        storageTag ? JSON.parse(storageTag) : []
    );

    useEffect(() => {
        console.log(tags);
        window.localStorage.setItem("tags", JSON.stringify(tags));
    }, [tags]);

    const handleTags = (tagg: string) => {
        if (!tags.includes(tagg)) setTags((prev) => [...prev, tagg]);
    };

    const handleTagData = (tagg: string) => {
        if (props.tagData.includes(tagg))
            props.setTagData((prev) => prev.filter((tag) => tag !== tagg));
        else props.setTagData((prev) => [...prev, tagg]);
    };

    return (
        <>
            <StyledTagManager data-test="component-tag-manager">
                <Box flex>
                    <Text fontSize={["20px", null, null, "30px"]}>Tags:</Text>
                    <Input
                        width={["200px", "250px", "300px", "350px"]}
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Insert new tag here"
                    ></Input>
                    <Button
                        disabled={Boolean(!tag)}
                        onClick={(e) => handleTags(tag)}
                    >
                        <AiOutlinePlus size="25px" />
                    </Button>
                    <Button
                        disabled={Boolean(!tag)}
                        onClick={() => {
                            window.localStorage.setItem("tags", "");
                            setTags([]);
                        }}
                    >
                        <GrClear size="25px" />
                    </Button>
                </Box>
            </StyledTagManager>
            <Box flex>
                {tags &&
                    tags.map((buttonTag, idx) => (
                        <Button
                            key={idx}
                            className="mr-2"
                            onClick={() => handleTagData(buttonTag)}
                        >
                            {buttonTag}
                        </Button>
                    ))}
            </Box>
            <Box flex>
                {props?.tagData && props.tagData.map((tag) => ` "${tag}", `)}
            </Box>
        </>
    );
};

export default TagManager;
