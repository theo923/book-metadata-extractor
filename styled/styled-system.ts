import {
    typography,
    shadow,
    position,
    background,
    compose,
    layout,
    flexbox,
    space,
    border,
    display,
    grid,
} from "styled-system";

export const normal = compose(space, layout, display);

export const any = compose(
    typography,
    flexbox,
    position,
    background,
    border,
    shadow,
    normal,
    grid
);
