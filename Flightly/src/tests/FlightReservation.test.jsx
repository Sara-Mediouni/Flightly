import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import authReducer from "../redux/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import axios from "axios";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import ReservationFlight from "../pages/ReservationFlight";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));
const customStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: "152",
    },
  },
});
describe("FLIGHT RESERVATION TEST", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "idFlight") return "163";
    });
    axios.get.mockImplementation((url) => {
      if (url.includes("user/user/getuser/152")) {
        return Promise.resolve({
          data: {
            user: {
              firstname: "sara",
              lastname: "mediouni",
              phone: "154",
              email: "abc@gmail.com",
            },
          },
        });
      }
      if (url.includes("/flight/163")) {
        return Promise.resolve({
          data: {
            flightNumber: "125",
            from: "France",
            to: "Spain",
            departurePlace: "abc",
            departureAirport: "hggs",
            returnPlace: "sss",
            returnAirport: "jjs",
            classes: [
              {
                name: "abc",
                price: 500,
                availableSeats: 4,
              },
            ],
            returnTime: "12:00",
            departureTime: "12:00",
          },
        });
      }
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("reservation flight form", async () => {
   render  (
   <Provider store={customStore}>
      <ReservationFlight />
    </Provider>);
  })
   waitFor(() => {
      expect(
        (axios.get).toHaveBeenCalledWith(expect.stringContaining("/flight/163"))
      
      );
       expect(
        (axios.get).toHaveBeenCalledWith(expect.stringContaining("/getuser/152"))
      
      ); 
  expect(screen.getByText(/Book Your Flight/i)).toBeInTheDocument();
  expect(screen.getByText("Traveling From:")).toBeInTheDocument();
  expect(screen.getByText("abc, hggs")).toBeInTheDocument();
  expect(screen.getByText("Destination:")).toBeInTheDocument();
  expect(screen.getByText("sss, jjs")).toBeInTheDocument();
  expect(screen.getByText("Select Your Flight Class")).toBeInTheDocument();
  expect(screen.getByTestId("flight_type")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("flight_type"));
  const AdultsInput = screen.getByPlaceholderText(/Adults/i);
  expect(AdultsInput).toBeInTheDocument();
  fireEvent.change(AdultsInput, {
    target: { value: "2" },
  });
  expect(screen.getByText("sara")).toBeInTheDocument();
  expect(screen.getByText("mediouni")).toBeInTheDocument();
  expect(screen.getByText("154")).toBeInTheDocument();
  expect(screen.getByText("abc@gmail.com")).toBeInTheDocument();
  const requestsInput = screen.getByPlaceholderText("Special Requests");
  expect(requestsInput).toBeInTheDocument();
  fireEvent.change(AdultsInput, {
    target: { value: "no requests" },
  });
  expect(screen.getByText("Total Price:")).toBeInTheDocument();
  expect(screen.getByText("1000 USD")).toBeInTheDocument();
  const reservationBtn = screen.getByRole("button", {
    name: /Complete Reservation/,
  });
  expect(reservationBtn).toBeInTheDocument();
  fireEvent.click(reservationBtn);
  waitFor(() => {
    axios.post.toHaveBeenCalledWith(
      expect.stringContaining("order/152/163"),
      expect.objectContaining({
        flightClass: "abc",
        personCount: { Adultes: 2, Enfants: 0 },
        TotalPrice: 1000,
        childrenAges: [],
        SpecialRequest: "no requests",
        paymentStatus: "Pending",
      })
    );
  });})
});
