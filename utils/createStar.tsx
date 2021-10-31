import Text from "../styled/Text";

export const createStar = (number: string) => {
    if (number.length === 0 || parseInt(number) > 5 || parseInt(number) <= 0)
        return;
    return [...Array(parseInt(number))].map((s, idx) => (
        <Text key={idx} fontSize={["15px", null, null, "20px"]}>
            ★
        </Text>
    ));
};
