import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Reservation from "../pages/Reservation";

vi.mock("axios");
describe("RESERVATION HOTEL PAGE", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "HotelReserveId") return "1524";
      if (key === "token") return "152455555";
    });
    axios.get.mockResolvedValue({
      data: {
        type: "Hotel",
        name: "abcd",
        roomTypes: [
          {
            name: "abcdef",
            price: 110,
            capacity: 2,
            beds: [{ typeBed: "Single", number: 2 }],
            area: 40,
            amenities: ["tv", "air conditioner"],
            roomNumber: 5,
            pricingByDate: [
              {
                StartDate: "12/05/2025",
                EndDate: "15/09/2025",
                price: 150,
                availableRooms: 5,
              },
            ],
            description: "abcdefg",
            availableRooms: 4,
          },
        ],
      },
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Fill reservation form and redirect to payment page", async () => {
    render(
      <Provider store={store}>
        <Reservation />
      </Provider>
    );

    waitFor(() => {
      expect(
        axios.get.toHaveBeenCalledWith(expect.stringContaining("/acc/1524"))
      );
      expect(screen.getByText("abcd")).toBeInTheDocument();
      expect(screen.getByText("abcdef")).toBeInTheDocument();
      expect(screen.getByTestId("room_1")).toBeInTheDocument();
    });
  });
});
