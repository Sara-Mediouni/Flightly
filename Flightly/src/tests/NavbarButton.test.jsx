import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { store } from "../redux/store";
import Navbar from "../components/Navbar";
import { fireEvent, screen } from "@testing-library/dom";
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
describe("NAVBAR LOGIN BUTTON",()=>{
  beforeEach(()=>{
   vi.spyOn(Storage.prototype, "getItem").mockImplementation((key)=>{
    if (key==="user") return null;
    if (key==="token") return null;
   })
  })
  afterEach(()=>{
    vi.clearAllMocks();
  })
  it("LOGIN BUTTON CLICK OPENS MODAL",async()=>{
     render(
        <MemoryRouter>
     <Provider store={store}>
     <Navbar/>
     </Provider>
     </MemoryRouter>
     )
    
    const LoginButton=screen.getByRole("button",{name:/Login/i});
    fireEvent.click(LoginButton);
    const EmailInput=screen.getByPlaceholderText(/Email/);
    expect(EmailInput).toBeInTheDocument();

  })

})