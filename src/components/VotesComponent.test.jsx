/**
 * skenario test
 *
 * - VotesComponent
 *  should display upvote and downvote buttons
 *  should alert when trying to vote while not logged in
 *  should upvote and downvote correctly when logged in
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import VotesComponent from "./VotesComponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import votesReducer from "../redux/slices/votes/votesSlice";
import authReducer from "../redux/slices/authUser/authSlice";
import userReducer from "../redux/slices/users/userSlice";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Mock Redux store
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      votes: votesReducer,
      auth: authReducer,
      users: userReducer,
    },
    preloadedState: initialState,
  });
};

const mockThread = {
  upVotesBy: ["user1"],
  downVotesBy: [],
};

describe("VotesComponent", () => {
  it("should display upvote and downvote buttons", () => {
    // Arrange
    const store = createMockStore({
      auth: { isLoggedIn: false },
      users: { profile: null },
    });

    render(
      <Provider store={store}>
        <VotesComponent thread={mockThread} id="1" />
      </Provider>
    );

    // Assert
    expect(screen.getByRole("button", { name: /0/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
  });

  it("should alert when trying to vote while not logged in", async () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Arrange
    const store = createMockStore({
        auth: { isLoggedIn: false },
        users: { profile: null },
      });
  
      render(
        <Provider store={store}>
          <VotesComponent thread={mockThread} id="1" />
        </Provider>
      );
  
      // Act
      const upVoteButton = screen.getByRole("button", { name: /1/i });
      await userEvent.click(upVoteButton);
  
      // Assert
      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith("Silakan login terlebih dahulu");
      });
  
      // Clean up
      alertMock.mockRestore();
    });
  
    it("should upvote and downvote correctly when logged in", async () => {
      // Arrange
      const store = createMockStore({
        auth: { isLoggedIn: true },
        users: { profile: { id: "user2" } },
      });
  
      render(
        <Provider store={store}>
          <VotesComponent thread={mockThread} id="1" />
        </Provider>
      );
  
      // Initial upvote and downvote counts
      const upVoteButton = screen.getByRole("button", { name: /1/i });
      const downVoteButton = screen.getByRole("button", { name: /0/i });
  
      expect(upVoteButton).toHaveTextContent("1");
      expect(downVoteButton).toHaveTextContent("0");
  
      // Upvote the thread
      await userEvent.click(upVoteButton);
      await waitFor(() => {
        expect(upVoteButton).toHaveTextContent("2");
        expect(downVoteButton).toHaveTextContent("0");
      });
  
      // Downvote the thread
      await userEvent.click(downVoteButton);
      await waitFor(() => {
        expect(upVoteButton).toHaveTextContent("1");
        expect(downVoteButton).toHaveTextContent("1");
      });
  
      // Neutralize the downvote
      await userEvent.click(downVoteButton);
      await waitFor(() => {
        expect(upVoteButton).toHaveTextContent("1");
        expect(downVoteButton).toHaveTextContent("0");
      });
    });
  });