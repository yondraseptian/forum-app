import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import leaderboardsReducer, { fetchLeaderBoard } from './leaderboardSlice';
import { getLeaderBoard } from '../../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

// Mock the API call
vi.mock('../../../utils/api', () => ({
  getLeaderBoard: vi.fn(),
}));

// Mock loading bar actions
vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loadingBar/showLoading' }),
  hideLoading: () => ({ type: 'loadingBar/hideLoading' }),
}));

/**
 * skenario test untuk thunks
 *
 * - fetchLeaderBoard
 *   - pending: dispatch showLoading, mengubah status menjadi 'loading' dan error menjadi null
 *   - fulfilled: dispatch hideLoading, mengubah status menjadi 'succeeded', leaderboards diperbarui dengan payload, dan error menjadi null
 *   - rejected: dispatch hideLoading, mengubah status menjadi 'failed' dan error diperbarui dengan pesan error
 */

describe('leaderboardsSlice', () => {
  it('should handle initial state', () => {
    expect(leaderboardsReducer(undefined, {})).toEqual({
      leaderboards: [],
      status: 'idle',
      error: null,
    });
  });

  describe('fetchLeaderBoard', () => {
    it('should dispatch showLoading and hideLoading actions', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const leaderboards = [{ id: 1, name: 'Test Leaderboard' }];
      
      getLeaderBoard.mockResolvedValueOnce(leaderboards);

      await fetchLeaderBoard()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle fulfilled state', async () => {
      const store = configureStore({
        reducer: leaderboardsReducer,
      });

      const leaderboards = [{ id: 1, name: 'Test Leaderboard' }];
      getLeaderBoard.mockResolvedValueOnce(leaderboards);

      await store.dispatch(fetchLeaderBoard());

      const state = store.getState();
      expect(state).toEqual({
        leaderboards,
        status: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', async () => {
      const store = configureStore({
        reducer: leaderboardsReducer,
      });

      const errorMessage = 'Failed to fetch';
      getLeaderBoard.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(fetchLeaderBoard());

      const state = store.getState();
      expect(state).toEqual({
        leaderboards: [],
        status: 'failed',
        error: errorMessage,
      });
    });
  });
});
