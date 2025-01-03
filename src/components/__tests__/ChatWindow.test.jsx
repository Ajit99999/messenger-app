import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ChatWindow from "../ChatWindow";
import ChatProvider, { ChatContext } from "../../context/ChatContext";

const mockState = {
  selectedFriend: "John",
  messages: {
    John: [{ id: 1, text: "Hello", sender: "me" }],
  },
};

const mockDispatch = jest.fn();

describe("ChatWindow", () => {
  it("should display a message to choose a friend if no friend is selected", () => {
    render(
      <ChatProvider>
        <ChatWindow />
      </ChatProvider>
    );
    expect(
      screen.getByText("Choose a friend to start the chat.")
    ).toBeInTheDocument();
  });

  it('should send a message when input is provided and "Send" button is clicked', () => {
    render(
      <ChatContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <ChatWindow />
      </ChatContext.Provider>
    );

    expect(screen.getByText("Chat with John")).toBeInTheDocument();
    const inputField = screen.getByPlaceholderText("Type a message");
    fireEvent.change(inputField, { target: { value: "Hi John!" } });

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_MESSAGE",
      payload: {
        friend: "John",
        message: { id: expect.any(Number), text: "Hi John!", sender: "me" },
      },
    });

    expect(inputField.value).toBe("");
  });
});
