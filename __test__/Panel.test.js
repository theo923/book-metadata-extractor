import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import Panel from "../components/Panel";

const setup = (props = {}, state = null) => {
    return shallow(<Panel {...props} />);
};

test("check if Panel runs successfully", () => {
    const wrapper = setup();
});

test("check if component-panel runs successfully", () => {
    const wrapper = setup();
    const Panel = findJSXByAttr(wrapper, "component-panel");
    expect(Panel.length).toBe(1);
});
