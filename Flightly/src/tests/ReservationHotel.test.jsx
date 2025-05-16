import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Reservation from "../pages/Reservation";
import React from "react";
vi.mock("axios");
axios.get = vi.fn();
describe("RESERVATION HOTEL PAGE", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "HotelReserveId") return "1524";
      if (key === "user") return "152";
      if (key === "token") return "1514429";

      if (key==="checkin") return "12/06/2025";
      if (key==="checkout") return "14/06/2025"
    });
    (axios.get).mockImplementation((url) => {
  if (url.includes("/acc/1524")) {
    return Promise.resolve({  data: {
        type: "Hotel",
        name: "abcd",
        images:["img0.png"],
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
      },});
  }
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
  if (url.includes("roomPrices/1524")) {
    return Promise.resolve({ data: 
      [{
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
          }]});
  }
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
        (axios.get).toHaveBeenCalledWith(expect.stringContaining("/acc/1524"))
      
      );
       expect(
        (axios.get).toHaveBeenCalledWith(expect.stringContaining("/getuser/152"))
      
      ); 
      expect(screen.getByText("abcd")).toBeInTheDocument();
      expect(screen.getByText("sara")).toBeInTheDocument();
      expect(screen.getByText("mediouni")).toBeInTheDocument();
      expect(screen.getByText("154")).toBeInTheDocument();
      expect(screen.getByText("abc@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("abcdef")).toBeInTheDocument();
      expect(screen.getByTestId("room_1")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("room_1"));});
      waitFor(()=>{
        expect(screen.getByLabelText(/Rooms Number:/)).toBeInTheDocument();
        const NumberInput=screen.getByTestId("number");
        fireEvent.change(NumberInput,{
          target:{
            value:1
          }
        });
        const adultsNumber=screen.getByTestId("adults_number");
        fireEvent.change(adultsNumber,{
          target:{
            value:1
          }
        })
         
      })
   
  });
});
