import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { store } from "../redux/store";
import Flights from "../pages/Flights";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-mock">LottieMock</div>,
}));
vi.mock("axios");

describe("FLIGHTS PAGE TEST", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "user") return "152";
      if (key === "token") return "15587";
    });
    axios.get.mockResolvedValue({
      data: [
        {
          flightNumber: "125",
          from: "France",
          to: "Spain",
          classes: [],
          returnTime: "12:00",
          departureTime: "12:00",
        },
      ],
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Returns flights", async () => {
    render(
        <MemoryRouter initialEntries={['/flights']}>
        <Provider store={store}>
          <Flights />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/allflights")
      );
      expect(screen.getByTestId("from")).toBeInTheDocument();
      expect(screen.getByTestId("to")).toBeInTheDocument();
 });
    const selectButton = screen.getByRole("button", { name: /Select Flight/i });
    fireEvent.click(selectButton);
    waitFor(()=>{
    expect(screen.getByTestId(/Book Your Flight/i)).toBeInTheDocument();
 
    })
  
});
});
