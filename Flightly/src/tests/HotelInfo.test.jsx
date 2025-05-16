import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HotelDetails from "../pages/HotelInfo";
import { store } from "../redux/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
vi.mock("axios");

describe("HOTEL INFOS PAGE", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key)=>{
        if (key==="details") return "1524"
        if (key==="token") return "152455555"


    })
    axios.get.mockResolvedValue({
        data: {
            type:"Hotel",
            name:"abcd",
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
        }
    })
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("shows hotel's info and redirect to reservation", async () => {
    render(
        <MemoryRouter>
        <Provider store={store}>
            <HotelDetails/>
        </Provider>
        </MemoryRouter>
    )
    waitFor(()=>{
        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("acc/1524")
        )
        expect(screen.getByText(/abcd/)).toBeInTheDocument()
        expect(screen.getByText("Room Types & Prices")).toBeInTheDocument();
        expect(screen.getByText("From $110 / night")).toBeInTheDocument();

        const CheckInInput=screen.getByLabelText(/From/);
        const CheckOutInput=screen.getByLabelText(/To/);
        fireEvent.change(CheckInInput,{target:{value:"25/05/2025"}})
        fireEvent.change(CheckOutInput,{target:{value:"27/05/2025"}})
        const searchBtn=screen.getByRole("button", {name: /Search/})
        fireEvent.click(searchBtn);
        waitFor(()=>{
            expect(screen.getByText("From $150 / night")).toBeInTheDocument()
            expect(screen.getByText("Selected Dates :")).toBeInTheDocument()
            expect(screen.getByText("Check-in Date:")).toBeInTheDocument()
            expect(screen.getByText("Sun, 25 May 2025")).toBeInTheDocument()
            expect(screen.getByText("Check-out Date:")).toBeInTheDocument()
            expect(screen.getByText("Tue, 27 May 2025")).toBeInTheDocument()
            const reservationBtn=screen.getByRole("button", {name: /Reservation/})
            expect(reservationBtn).toBeInTheDocument();
            fireEvent.click(reservationBtn);
            waitFor(()=>{
             expect(screen.getByText(/Book Your Stay/)).toBeInTheDocument();
            })
        })

    })
  });
});
