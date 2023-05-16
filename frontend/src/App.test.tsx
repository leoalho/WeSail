import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import userReducer from "./reducers/userReducer";

test("renders Wesail link", async () => {
  const consoleSpy = jest.spyOn(console, "log");

  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  await waitFor(() => expect(consoleSpy).toHaveBeenCalledTimes(2));
});
