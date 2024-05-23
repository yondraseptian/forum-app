/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/**
 * skenario test
 *
 * - AddComment
 *  should display textarea when logged in
 *  should display login when not logged in
 *  should display alert when comment is empty
 */

import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import {
  describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import commentReducer from '../redux/slices/comments/commentSlice';
import AddComment from './AddComment';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Mock Redux store
const createMockStore = (initialState) => configureStore({
  reducer: {
    comments: commentReducer,
  },
  preloadedState: initialState,
});

describe('AddComment', () => {
  it('should display textarea when logged in', async () => {
    // Arrange
    const store = createMockStore({});
    await act(async () => {
      render(
        <Provider store={store}>
          <AddComment isLoggedIn threadId="1" onCommentAdded={vi.fn()} />
        </Provider>,
      );
    });
    const textarea = screen.getByRole('textbox');

    // Action
    await act(async () => {
      await userEvent.type(textarea, 'test comment');
    });

    // Assert
    expect(textarea.value).toBe('test comment');
  });

  it('should display login message when not logged in', async () => {
    // Arrange
    const store = createMockStore({ auth: { isLoggedIn: false } });

    // Act
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddComment isLoggedIn={false} threadId="1" onCommentAdded={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );

    // Assert
    await waitFor(() => {
      const loginLink = screen.getByRole('link', { name: /Login/i });
      const loginMessagePart = screen.getByText(/terlebih dahulu untuk memberi komentar/i);

      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute('href', '/login');
      expect(loginMessagePart).toBeInTheDocument();
    });
  });

  it('should display alert when comment is empty', async () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Arrange
    const store = createMockStore({});
    await act(async () => {
      render(
        <Provider store={store}>
          <AddComment isLoggedIn threadId="1" onCommentAdded={vi.fn()} />
        </Provider>,
      );
    });
    const button = screen.getByRole('button', { name: /komentar/i });

    // Action
    await act(async () => {
      await userEvent.click(button);
    });

    // Assert
    expect(alertMock).toHaveBeenCalledWith('isi comment');

    // Clean up
    alertMock.mockRestore();
  });
});
