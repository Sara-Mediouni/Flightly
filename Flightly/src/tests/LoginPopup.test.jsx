import React from "react";
import LoginSignupModal from "../components/LoginSignupModal"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import uiReducer from "../redux/uiSlice"; // ← important
import authReducer from "../redux/authSlice";
import countryReducer from "../redux/countrySlice";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("axios");

describe("Login Popup test", () => {
  const onCloseMock = vi.fn();
  
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "user") return null;
      if (key === "token") return null;
    });

    axios.post.mockResolvedValue({ data: { success: true } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("opens the popup and login", async () => {
    const customStore = configureStore({
    reducer: {
      ui: uiReducer,
      auth: authReducer,
      country:countryReducer
    },
    preloadedState: {
      ui: {
        showLoginPopup: true, // ← ici la valeur est forcée à true
      },
      country:{
        countries:["France"],
      },
      auth: {
        token: null,
        user: null,
      },
    },
  });
    render(
     <MemoryRouter>
        <Provider store={customStore}>
          <LoginSignupModal onClose={onCloseMock}/>
        </Provider>
      </MemoryRouter>
      
    )
 
    const EmailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(EmailInput, {
      target: { value: "abc1@gmail.com" },
    });

    const PasswordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(PasswordInput, {
      target: { value: "abc*12345" },
    });

    const signInButton = screen.getByRole("button", { name: /Log In/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        expect.objectContaining({
          email: "abc1@gmail.com",
          password: "abc*12345",
        })
      );
    });

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});