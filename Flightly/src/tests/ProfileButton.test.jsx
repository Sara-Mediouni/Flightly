import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import authReducer from "../redux/authSlice";
import uiReducer from '../redux/uiSlice'
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import React from "react";
import '@testing-library/jest-dom';

    const customStore = configureStore({
  reducer: {
    auth: authReducer,
    ui:uiReducer
  },
  preloadedState: {
    ui:{
      showLoginPopup:false
    },
    auth: {
      user: "152",
      token:"154"
    },
  },
});
describe("Profile buttons tests",()=>{
     beforeEach(()=>{
   vi.spyOn(Storage.prototype, "getItem").mockImplementation((key)=>{
    if (key==="user") return null;
    if (key==="token") return null;
   })
  })
  afterEach(()=>{
    vi.clearAllMocks();
  })
      it("PROFILE BUTTON CLICK OPENS MODAL",async()=>{
           render(
           <MemoryRouter>
           <Provider store={customStore}>
           <Navbar/>
           </Provider>
           </MemoryRouter>
           )
          
          const ProfileButton=screen.getByTestId(/button_profile/);
          fireEvent.click(ProfileButton);
          const ProfileInput=screen.getByText(/Profile/);
          expect(ProfileInput).toBeInTheDocument();
          fireEvent.click(ProfileInput);
          waitFor(()=>{
          expect(screen.getByRole("button",{name: /Update/})).toBeInTheDocument()
           
          })
         
        })
})