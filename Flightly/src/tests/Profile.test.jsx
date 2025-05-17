import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProfilePage from "../components/ProfilePage";
import { Provider } from "react-redux";
import authReducer from "../redux/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
  vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put:vi.fn()
  },
}));
    const customStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: "152",
      token:"154"
    },
  },
});
describe("PROFILE PAGE TESTS",()=>{
    beforeEach(()=>{
        axios.get.mockResolvedValue({
           data: {
            user: {
              firstname: "sara",
              lastname: "mediouni",
              phone: "154",
              email: "abc@gmail.com",
              dateOfBirth:"15/05/1999"
            },
          },
        })
    })
    it("Edit profile infos",async()=>{
    render(
        <Provider store={customStore}>
         <ProfilePage/>   
        </Provider>
        
    )
    waitFor(()=>{
        expect(screen.getByText("sara")).toBeInTheDocument();
        expect(screen.getByText("mediouni")).toBeInTheDocument();
        expect(screen.getByText("15/05/1999")).toBeInTheDocument();
        expect(screen.getByText("abc@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("154")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Update"));

        expect(screen.getByRole("textbox")).toBeInTheDocument();
        const firstnameInput=screen.getAllByLabelText(/Firstname/);
        fireEvent.change(firstnameInput,{target:{value:"sarah"}});
        const cityInput=screen.getAllByLabelText(/City/);
        fireEvent.change(cityInput,{target:{value:"abc"}});
        const saveBtn=screen.getByRole("button",{name: /Save/i});
        fireEvent.click(saveBtn);
        waitFor(()=>{
            expect((axios.put).toHaveBeenCalledWith(
                expect.stringContaining("/updateuser/152"),
                expect.objectContaining({
                    firstname:"sarah",
                    city:"abc"
                })
            ))
        })
    })
    })
})