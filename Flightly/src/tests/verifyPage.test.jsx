import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VerifyPage from "../pages/verifyPage";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
vi.mock("axios")
describe("Verify Page tests",()=>{

    beforeEach(() => {
    window.history.pushState({}, "Test page", "/?success=true&orderId=12345");
    axios.get.mockResolvedValue({
        data:{

        }
    })
    });
    afterEach(()=>{
        vi.restoreAllMocks();
    });
    it("Return Paiement confirmed as a message ",async()=>{
    render(
        <MemoryRouter>
        <VerifyPage/>
        </MemoryRouter>
    )
    expect(window.location.search).toContain("success=true");
    expect(window.location.search).toContain("orderId=12345");
    
    waitFor(()=>{
        expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/verify/12345/true")
        );
    expect(screen.getByText("Paiement confirmed !")).toBeInTheDocument();

    })
    })
    {/* it("Return Paiement failed as a message ",async()=>{
    render(
        <MemoryRouter>
        <VerifyPage/>
        </MemoryRouter>
    )
    expect(window.location.search).toContain("success=false");
    expect(window.location.search).toContain("orderId=12345");
    
    waitFor(()=>{
        expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/verify/12345/false")
        );
    expect(screen.getByText("Paiement failed.")).toBeInTheDocument();

    })
    })*/}
})