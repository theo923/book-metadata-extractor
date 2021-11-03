import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import Tag_Manager from "../components/Tag_Manager";

const setup = (props = {}, state = null) => {
    return shallow(<Tag_Manager {...props} />);
};

test("check if Tag_Manager runs successfully", () => {
    const wrapper = setup();
});

test("check if component-tag-manager runs successfully", () => {
    const wrapper = setup();
    const Tag_Manager = findJSXByAttr(wrapper, "component-tag-manager");
    expect(Tag_Manager.length).toBe(1);
});
