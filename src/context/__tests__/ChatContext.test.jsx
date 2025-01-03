import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { useChatContext } from "../ChatContext.jsx";
import { friends, initialMessages } from "../../utils/dummyData";
import ChatProvider from '../ChatContext.jsx';
describe("ChatContext", () => {
  test("should provide the initial state", () => {
    const TestComponent = () => {
      const { state } = useChatContext();
      return (
        <div>
          <div>{state.selectedFriend}</div>
          <div>{state.friends.length}</div>
          <div>{state.messages.John?.length}</div>
        </div>
      );
    };

    render(
      <ChatProvider  >
        <TestComponent />
      </ChatProvider>
    );

    expect(screen.getByText(friends.length.toString())).toBeInTheDocument();
    expect(screen.getByText(initialMessages.John.length.toString())).toBeInTheDocument();
  });

  test("should dispatch SET_SELECTED_FRIEND action", () => {
    const TestComponent = () => {
      const { state, dispatch } = useChatContext();
      return (
        <div>
          <button
            onClick={() => dispatch({ type: "SET_SELECTED_FRIEND", payload: "Bob" })}
          >
            Select Bob
          </button>
          <div>{state.selectedFriend}</div>
        </div>
      );
    };

    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    fireEvent.click(screen.getByText("Select Bob"));

    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  test("should dispatch ADD_MESSAGE action", () => {
    const TestComponent = () => {
      const { state, dispatch } = useChatContext();
      const handleSendMessage = () => {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            friend: "John",
            message: { id: 3, text: "New message", sender: "me" },
          },
        });
      };

      return (
        <div>
          <button onClick={handleSendMessage}>Send Message</button>
          <div>{state.messages.John?.length}</div>
        </div>
      );
    };

    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    fireEvent.click(screen.getByText("Send Message"));

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
