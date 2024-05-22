import { describe, it, expect } from 'vitest';
import reducer, { fetchThreads, fetchThreadsById, createThreadAsync } from '../thread/threadsSlice';


/**
 * skenario test untuk reducers
 *
 * - should handle initial state
 * - should handle pending state
 * - should handle fulfilled state
 * - should handle rejected state
 */


const initialState = {
  threads: [],
  detailThread: [],
  status: 'idle',
  error: null,
};

describe('threads reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchThreads.pending', () => {
    const action = { type: fetchThreads.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'loading' });
  });

  it('should handle fetchThreads.fulfilled', () => {
    const action = {
      type: fetchThreads.fulfilled.type,
      payload: [{ id: 1, title: 'Thread 1' }],
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'succeeded', threads: action.payload });
  });

  it('should handle fetchThreads.rejected', () => {
    const action = {
      type: fetchThreads.rejected.type,
      error: { message: 'Failed to fetch threads' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'failed', error: action.error.message });
  });

  it('should handle fetchThreadsById.pending', () => {
    const action = { type: fetchThreadsById.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'loading' });
  });

  it('should handle fetchThreadsById.fulfilled', () => {
    const action = {
      type: fetchThreadsById.fulfilled.type,
      payload: { id: 1, title: 'Detail Thread 1' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'succeeded', detailThread: [action.payload] });
  });

  it('should handle fetchThreadsById.rejected', () => {
    const action = {
      type: fetchThreadsById.rejected.type,
      error: { message: 'Failed to fetch thread by id' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'failed', error: action.error.message });
  });

  it('should handle createThreadAsync.pending', () => {
    const action = { type: createThreadAsync.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'loading' });
  });

  it('should handle createThreadAsync.fulfilled', () => {
    const action = {
      type: createThreadAsync.fulfilled.type,
      payload: { id: 2, title: 'New Thread' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'succeeded', detailThread: [action.payload] });
  });

  it('should handle createThreadAsync.rejected', () => {
    const action = {
      type: createThreadAsync.rejected.type,
      error: { message: 'Failed to create thread' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: 'failed', error: action.error.message });
  });
});
