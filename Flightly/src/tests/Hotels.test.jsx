import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Hotels from "../pages/Hotels";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";
import { MemoryRouter } from "react-router-dom";
vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-mock">LottieMock</div>,
}));



vi.mock("axios");
describe("HOTEL PAGE TESTS",()=>{
    
    beforeEach(()=>{
      axios.get.mockResolvedValue({
        data: 
        [
            {
                name:"abcdef",
                roomTypes:[],
                
                
            }
        ]
      })
    })

    afterEach(()=>{
        vi.resetAllMocks();
    })
it("Show hotels list",async()=>{
    render(
      <MemoryRouter>
        <Provider store={store}>
        <Hotels/>
        </Provider>
        </MemoryRouter>
    )
    waitFor(()=>{
        expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/?type=Hotel")
        );
        expect(screen.getByText("abcdef")).toBeInTheDocument();
        const card=screen.getByTestId("card");
        expect(card).toBeInTheDocument();
        fireEvent.click(card);
        waitFor(()=>{
        expect(
        screen.getByText("Room Types & Prices")).toBeInTheDocument();
        })
        
      })  
     
})
  
})