import { describe, it, expect } from 'vitest';
import reducer, { fetchThreads, fetchThreadsById, createThreadAsync } from '../thread/threadsSlice';


/**
 * skenario test untuk reducers
 *
 * - initial state
 *   - mengembalikan state awal saat tidak ada aksi yang cocok
 *
 * - fetchThreads.pending
 *   - mengubah status menjadi 'loading' dan error menjadi null
 *
 * - fetchThreads.fulfilled
 *   - mengubah status menjadi 'succeeded' dan threads diperbarui dengan payload
 *
 * - fetchThreads.rejected
 *   - mengubah status menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - fetchThreadsById.pending
 *   - mengubah status menjadi 'loading' dan error menjadi null
 *
 * - fetchThreadsById.fulfilled
 *   - mengubah status menjadi 'succeeded' dan detailThread diperbarui dengan payload
 *
 * - fetchThreadsById.rejected
 *   - mengubah status menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - createThreadAsync.pending
 *   - mengubah status menjadi 'loading' dan error menjadi null
 *
 * - createThreadAsync.fulfilled
 *   - mengubah status menjadi 'succeeded' dan detailThread diperbarui dengan payload
 *
 * - createThreadAsync.rejected
 *   - mengubah status menjadi 'failed' dan error diperbarui dengan pesan error
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
