/**
 * @jest-environment jsdom
 */

import { CardEvents, CardSelectedEvent } from "./types";

describe("Card component", () => {
  test("render custom element tag", () => {
    document.body.innerHTML = `<my-card title="mocked" description="mocked des"></my-card>`;
    const card = document.body.querySelector("my-card");
    expect(card).not.toBeNull();
  });

  test("render title", () => {
    const mockedTitle = "mocked";
    document.body.innerHTML = `<my-card title="${mockedTitle}" description="mocked des"></my-card>`;
    require("./Card.js");
    const card = document.body.querySelector("my-card");
    const titleTag = card?.shadowRoot?.querySelector("h4");
    expect(titleTag?.textContent).toEqual(mockedTitle);
  });

  test("click triggered", () => {
    const mockedTitle = "mocked";
    const mockedListener = jest.fn();

    document.body.innerHTML = `<my-card title="${mockedTitle}" description="mocked des"></my-card>`;
    require("./Card.js");

    const card = document.body.querySelector("my-card");
    card?.addEventListener(CardEvents.cardSelected, mockedListener);
    const btn = card?.shadowRoot?.querySelector("button");
    btn?.click();
    expect(mockedListener).toHaveBeenCalled();
    expect(mockedListener).toHaveBeenCalledTimes(1);

    const expectedEvent = {
      detail: { title: mockedTitle },
      composed: true,
    } as CardSelectedEvent;
    expect(mockedListener.mock.calls[0][0].detail).toEqual(
      expectedEvent.detail
    );
  });
});
