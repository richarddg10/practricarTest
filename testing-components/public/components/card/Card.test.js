/**
 * @jest-environment jsdom
 */
import { CardEvents } from "./types";
describe("Card component", () => {
    test("render custom element tag", () => {
        document.body.innerHTML = `<my-card title="mocked" description="mocked des"></my-card>`;
        const card = document.body.querySelector("my-card");
        expect(card).not.toBeNull();
    });
    test("render title", () => {
        var _a;
        const mockedTitle = "mocked";
        document.body.innerHTML = `<my-card title="${mockedTitle}" description="mocked des"></my-card>`;
        require("./Card.js");
        const card = document.body.querySelector("my-card");
        const titleTag = (_a = card === null || card === void 0 ? void 0 : card.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("h4");
        expect(titleTag === null || titleTag === void 0 ? void 0 : titleTag.textContent).toEqual(mockedTitle);
    });
    test("click triggered", () => {
        var _a;
        const mockedTitle = "mocked";
        const mockedListener = jest.fn();
        document.body.innerHTML = `<my-card title="${mockedTitle}" description="mocked des"></my-card>`;
        require("./Card.js");
        const card = document.body.querySelector("my-card");
        card === null || card === void 0 ? void 0 : card.addEventListener(CardEvents.cardSelected, mockedListener);
        const btn = (_a = card === null || card === void 0 ? void 0 : card.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.click();
        expect(mockedListener).toHaveBeenCalled();
        expect(mockedListener).toHaveBeenCalledTimes(1);
        const expectedEvent = {
            detail: { title: mockedTitle },
            composed: true,
        };
        expect(mockedListener.mock.calls[0][0].detail).toEqual(expectedEvent.detail);
    });
});
