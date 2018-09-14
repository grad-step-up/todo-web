import SearchBar from "../view/SearchBarView";
import React from "react";
import {shallow} from "enzyme";
import "../../../testHelper";

describe('todo search bar', function () {
    let component;
    beforeAll(function () {
        component = shallow(<SearchBar criteria="hello"/>)
    });

    it('should show search bar', function () {
        expect(component.find("input").length).toBe(1);
    });
});