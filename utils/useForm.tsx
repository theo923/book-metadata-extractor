import { useState } from "react";

export const useForm = (defaultValues) => {
    const [value, setValues] = useState(defaultValues);

    return [
        value,
        (e) =>
            setValues({
                ...value,
                [e.target.name]: e.target.value,
            }),
    ];
};
