import { describe, it, expect } from 'vitest';
import votesReducer from './votesSlice';
import { 
  upVoteThreadAsync, 
  downVoteThreadAsync, 
  neutralizeThreadVoteAsync, 
  upVoteCommentAsync, 
  downVoteCommentAsync, 
  neutralizeCommentVoteAsync 
} from './votesSlice';


/**
 * skenario test untuk votesSlice (reducer)
 *
 * - initial state
 *   - mengembalikan state awal saat tidak ada aksi yang cocok
 *
 * - upVoteThreadAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - downVoteThreadAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - neutralizeThreadVoteAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - upVoteCommentAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - downVoteCommentAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 *
 * - neutralizeCommentVoteAsync
 *   - pending: mengubah votingStatus menjadi 'loading' dan error menjadi null
 *   - fulfilled: mengubah votingStatus menjadi 'succeeded' dan error menjadi null
 *   - rejected: mengubah votingStatus menjadi 'failed' dan error diperbarui dengan pesan error
 */


  describe('votesSlice', () => {
    it('should handle initial state', () => {
      expect(votesReducer(undefined, {})).toEqual({
        votingStatus: 'idle',
        error: null,
      });
    });
  describe('upVoteThreadAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: upVoteThreadAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: upVoteThreadAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: upVoteThreadAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });

  describe('downVoteThreadAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: downVoteThreadAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: downVoteThreadAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: downVoteThreadAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });

  describe('neutralizeThreadVoteAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: neutralizeThreadVoteAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: neutralizeThreadVoteAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: neutralizeThreadVoteAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });

  describe('upVoteCommentAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: upVoteCommentAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: upVoteCommentAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: upVoteCommentAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });

  describe('downVoteCommentAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: downVoteCommentAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: downVoteCommentAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: downVoteCommentAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });

  describe('neutralizeCommentVoteAsync', () => {
    it('should handle pending state', () => {
      expect(votesReducer(undefined, { type: neutralizeCommentVoteAsync.pending.type })).toEqual({
        votingStatus: 'loading',
        error: null,
      });
    });

    it('should handle fulfilled state', () => {
      expect(votesReducer(undefined, { type: neutralizeCommentVoteAsync.fulfilled.type })).toEqual({
        votingStatus: 'succeeded',
        error: null,
      });
    });

    it('should handle rejected state', () => {
      const error = 'Error message';
      expect(votesReducer(undefined, { type: neutralizeCommentVoteAsync.rejected.type, error: { message: error } })).toEqual({
        votingStatus: 'failed',
        error,
      });
    });
  });
});
