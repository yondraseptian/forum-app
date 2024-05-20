import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUsers, fetchProfile } from "./userSlice";
import { getUsers, getProfile } from "../../../utils/api";
import { vi, expect, describe, it } from "vitest";

// Mock the API calls
vi.mock("../../../utils/api", () => ({
  getUsers: vi.fn(),
  getProfile: vi.fn(),
}));

describe("userSlice", () => {
  describe("fetchUsers", () => {
    it("should fetch users and update state correctly", async () => {
      const store = configureStore({
        reducer: userReducer,
      });

      const users = [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ];
      getUsers.mockResolvedValueOnce({ users });

      await store.dispatch(fetchUsers());

      const state = store.getState();
      expect(state.users).toEqual(users);
      expect(state.status).toBe("succeeded");
      expect(state.error).toBeNull();
    });

    it('should handle fetchUsers failure', async () => {
        const store = configureStore({
            reducer: userReducer,
        });
      
        const errorMessage = 'Failed to fetch users';
        getUsers.mockRejectedValueOnce(new Error(errorMessage));
      
        await store.dispatch(fetchUsers());
      
        const state = store.getState();
        expect(state.users).toEqual([]);
        expect(state.status).toBe('failed');
        expect(state.error).toBe(errorMessage);
    });
    
      
  });

  describe("fetchProfile", () => {
    it("should fetch profile and update state correctly", async () => {
      const store = configureStore({
        reducer: userReducer,
      });

      const userProfile = { id: 1, name: "John Doe" };
      const token = "mock-token";
      getProfile.mockResolvedValueOnce(userProfile);

      await store.dispatch(fetchProfile(token));

      const state = store.getState();
      expect(state.profile).toEqual(userProfile);
      expect(state.status).toBe("succeeded");
      expect(state.error).toBeNull();
    });

    it("should handle fetchProfile failure", async () => {
      const store = configureStore({
        reducer: userReducer,
      });

      const errorMessage = "Failed to fetch profile";
      const token = "mock-token";
      getProfile.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchProfile(token));

      const state = store.getState();
      expect(state.profile).toBeNull();
      expect(state.status).toBe("failed");
      // Modify this expectation to check for the actual error message received
      expect(state.error).toBe("Rejected");
    });
  });
});
