import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FriendsList from "../FriendsList.jsx";
import ChatProvider from '../../context/ChatContext.jsx';

describe("FriendsList", () => {
  test("should display friends list", () => {
    render(
      <ChatProvider>
        <FriendsList />
      </ChatProvider>
    );

    const friendItems = screen.getAllByRole("listitem");
    expect(friendItems.length).toBeGreaterThan(0); 
  });

  test("should highlight selected friend", () => {
    render(
      <ChatProvider>
        <FriendsList />
      </ChatProvider>
    );

    const friend = screen.getByText("John"); 
    fireEvent.click(friend);

    expect(friend).toHaveClass("bg-gray-300 text-gray-900 font-medium");
  });

  test("should dispatch SET_SELECTED_FRIEND action on friend click", () => {
    render(
      <ChatProvider>
        <FriendsList />
      </ChatProvider>
    );

    const friend = screen.getByText("John");
    fireEvent.click(friend);

    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
