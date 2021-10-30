import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import Form from "../components/Form";

const setup = (props = {}, state = null) => {
    return shallow(<Form {...props} />);
};

test("check if Form runs successfully", () => {
    const wrapper = setup();
});

test("check if component-form runs successfully", () => {
    const wrapper = setup();
    const Form = findJSXByAttr(wrapper, "component-form");
    expect(Form.length).toBe(1);
});
