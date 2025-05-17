import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import countryReducer from "../redux/countrySlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Resorts from "../pages/Resorts";
import axios from "axios";
import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-mock">LottieMock</div>,
}));



vi.mock("axios");
describe("RESORTS LIST TESTS", () => {
  const customStore = configureStore({
    reducer: {
      country: countryReducer,
    },
    preloadedState: {
      country: {
        countries: [],
      },
    },
    });
  beforeEach(()=>{
    (axios.get).mockResolvedValue({
        data:{
         name:"abcd",
         description:"abcdfr",
         images:["resort.png"],
         type:"Resort",
         price:500
        }
    })
    })
  
  afterEach(()=>{
    vi.restoreAllMocks();
  })
  it("RETURNS RESORTS LIST", async () => {
    <Provider store={customStore}>
      <Resorts />
    </Provider>;
  })
   waitFor(()=>{
        expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/?type=Resort")
        );
  expect(screen.getByText(/The Best Stays, All in One Place/i)).toBeInTheDocument();
  const resortCard=screen.getByTestId(/resort_card/i)
  expect(resortCard).toBeInTheDocument();
  expect(screen.getByText("abcd")).toBeInTheDocument();
  expect(screen.getByText("From 500 $ / night")).toBeInTheDocument();
  fireEvent.click(resortCard);
  waitFor(()=>{
         expect(
         screen.getByText("Room Types & Prices")).toBeInTheDocument();
         })})
})
