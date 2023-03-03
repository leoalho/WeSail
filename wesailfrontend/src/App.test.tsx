import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import userReducer from './reducers/userReducer'

test('renders Wesail link', () => {
 
const store = configureStore({
  reducer: {
    user: userReducer
  }})

  render( <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
  const linkElement = screen.getByText(/Wesail/i);
  expect(linkElement).toBeInTheDocument();
});
