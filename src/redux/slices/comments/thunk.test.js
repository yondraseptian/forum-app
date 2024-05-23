/* eslint-disable linebreak-style */
import {
  describe, it, expect, vi,
} from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import commentReducer, { createCommentAsync } from './commentSlice';
import { createComment } from '../../../utils/api';

// Mock the API call
vi.mock('../../../utils/api', () => ({
  createComment: vi.fn(),
}));

// Mock loading bar actions
vi.mock('react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'loadingBar/showLoading' }),
  hideLoading: () => ({ type: 'loadingBar/hideLoading' }),
}));

/**
 * Test scenarios for thunk functions
 *
 * - createCommentAsync
 *   - should handle initial state
 *   - should dispatch showLoading and hideLoading actions
 *   - should handle fulfilled state
 *   - should handle rejected state
 */

describe('commentSlice', () => {
  it('should handle initial state', () => {
    expect(commentReducer(undefined, {})).toEqual({
      comment: null,
      status: 'idle',
      error: null,
    });
  });

  describe('createCommentAsync', () => {
    it('should dispatch showLoading and hideLoading actions', async () => {
      const dispatch = vi.fn();
      const getState = vi.fn();
      const threadId = '1';
      const commentData = {};

      createComment.mockResolvedValueOnce({
        data: { comments: { id: 1, text: 'Test comment' } },
      });

      await createCommentAsync({ threadId, commentData })(
        dispatch,
        getState,
        undefined,
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle fulfilled state', async () => {
      const store = configureStore({
        reducer: commentReducer,
      });

      const threadId = '1';
      const commentData = {};
      const response = { data: { comments: { id: 1, text: 'Test comment' } } };

      createComment.mockResolvedValueOnce(response);

      await store.dispatch(createCommentAsync({ threadId, commentData }));

      const state = store.getState();
      expect(state).toEqual({
        comment: response.data.comments,
        status: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', async () => {
      const store = configureStore({
        reducer: commentReducer,
      });

      const threadId = '1';
      const commentData = {};
      const errorMessage = 'Failed to create comment';

      createComment.mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(createCommentAsync({ threadId, commentData }));

      const state = store.getState();
      expect(state).toEqual({
        comment: null,
        status: 'failed',
        error: 'Rejected',
      });
    });
  });
});
