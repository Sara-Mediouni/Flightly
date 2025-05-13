const sinon = require("sinon");
const { expect } = require("chai");
const mongoose = require("mongoose");
const axios = require("axios");
const {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} = require("../reserveflight-service/Controller/ReservationController");
const ReserveModel = require("../reserveflight-service/Models/Reservation");
const stripe = require("../reserveflight-service/stripeClient");
const flight = require("../Flight-service/Models/Flight");

describe("FLIGHT RESERVATION CONTROLLER UNIT TESTS", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("placeOrder returns 200", async () => {
    const idUser = new mongoose.Types.ObjectId();
    const idFlight = new mongoose.Types.ObjectId();
    const url = "https://fake-checkout-session.url";

    const req = {
      params: {
        userId: idUser.toString(),
        flightId: idFlight.toString(),
      },
      body: {
        flightData: {
          flightClass: "Economy",
          personCount: 1,
          childrenAges: [],
          specialRequest: "no",
          paymentStatus: "Pending",
          TotalPrice: 100,
        },
      },
    };

    const userData = {
      _id: idUser.toString(),
      fullname: "abcdf",
    };

    const flight = {
      _id: idFlight.toString(),
      flightNumber: "ADF45112",
    };

    const newOrder = {
      user: idUser.toString(),
      flight: idFlight.toString(),

      flightClass: "Economy",
      personCount: 1,
      childrenAges: [],
      specialRequest: "no",
      paymentStatus: "Pending",
      TotalPrice: 100,
    };
    const userUrl = `http://localhost:4000/user/user/getuser/${req.params.userId}`;
    const flightUrl = `http://localhost:4000/flight/flight/${req.params.flightId}`;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Stub axios
    const getStub = sinon.stub(axios, "get");
    getStub.withArgs(userUrl).resolves({ data: { user: userData } });
    getStub.withArgs(flightUrl).resolves({
      data: {
        _id: idFlight.toString(),
        flightNumber: "ADF45112",
        name: "abc",
      },
    });

    sinon.stub(ReserveModel.prototype, "save").resolves(newOrder);
    const StripeStub = sinon
      .stub(stripe.checkout.sessions, "create")
      .resolves({ url });

    await placeOrder(req, res);

    expect(getStub.calledWith(userUrl)).to.be.true;
    expect(getStub.calledWith(flightUrl)).to.be.true;
    expect(StripeStub.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ success: true, session_url: url })).to.be
      .true;
  });

  it("placeOrder returns 404 flight not found", async () => {
    const idUser = new mongoose.Types.ObjectId();
    const idFlight = new mongoose.Types.ObjectId();
    const url = "https://fake-checkout-session.url";

    const req = {
      params: {
        userId: idUser.toString(),
        flightId: idFlight.toString(),
      },
      body: {
        flightData: {
          flightClass: "Economy",
          personCount: 1,
          childrenAges: [],
          specialRequest: "no",
          paymentStatus: "Pending",
          TotalPrice: 100,
        },
      },
    };

    const userData = {
      _id: idUser.toString(),
      fullname: "abcdf",
    };

    const flight = {
      _id: idFlight.toString(),
      flightNumber: "ADF45112",
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const userUrl = `http://localhost:4000/user/user/getuser/${req.params.userId}`;
    const flightUrl = `http://localhost:4000/flight/flight/${req.params.flightId}`;

    const getStub = sinon.stub(axios, "get");
    getStub.withArgs(userUrl).resolves({ data: null });
    getStub.withArgs(flightUrl).resolves({ data: { flight } });

    sinon.stub(ReserveModel.prototype, "save").resolves();

    await placeOrder(req, res);

    expect(getStub.calledWith(userUrl)).to.be.true;
    expect(getStub.calledWith(flightUrl)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "User or flight not found",
      })
    ).to.be.true;
  });
  it("verifyOrder returns 404 order not found", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        orderId: id.toString(),
        success: "true",
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findByIdStub = sinon.stub(ReserveModel, "findById").resolves(null);
    await verifyOrder(req, res);
    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({ success: false, message: "Order not found" })
    ).to.be.true;
  });
  it("verifyOrder returns 200 and order paid", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        orderId: id.toString(),
        success: "true",
      },
    };
    const flightSaveStub = sinon.stub().resolves();
    const flightData = {
      from: "Germany",
      to: "Tunisia",
      departurePlace: "Berlin",
      departureAirport: "Berlin Airport",
      returnPlace: "Tunis",
      returnAirport: "Carthage",
      duration: "2h",
      airline: "Berlin Airlines",
      departureDate: "12/06/2025",
      returnDate: "12/06/2025",
      flightType: "one-way", // ✅ string, pas {type: "one-way"}
      onboardServices: [],
      classes: [
        {
          name: "Economy",
          price: 100, // ✅ number
          availableSeats: 5, // ✅ number
        },
      ],
      flightNumber: "AD1542",
      departureTime: "10:00",
      returnTime: "13:00",
      Includedbaggage: {
        included: false,
        weight: 0,
      },
      cabinAllowance: 0,
      refundable: false,
      save: flightSaveStub,
    };
    const orderSaveStub = sinon.stub().resolves(); // Stub pour l'order
    const order = {
      save: orderSaveStub,
      _id: id.toString(),
      flight: "123",
      user: "1234",
      flightClass: "Economy",
      personCount: {
        Adultes: 1,
      },
      childrenAges: [],
      specialRequest: "no",
      paymentStatus: "Pending",
      TotalPrice: 100,
    };
    const url = `http://localhost:4000/flight/flight/${order.flight}`;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon.stub(ReserveModel, "findById").resolves(order);
    const axiosStub = sinon
      .stub(axios, "get")
      .withArgs(url)
      .resolves({ data: { flightData: flightData } });
    sinon.stub(ReserveModel.prototype, "save").resolves(order);
    sinon.stub(flight.prototype, "save");
    await verifyOrder(req, res);
    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(axiosStub.calledOnce).to.be.true;

    expect(flightSaveStub.calledOnce).to.be.true;
    expect(orderSaveStub.calledOnce).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        message: "Payment successful and seats updated",
      })
    ).to.be.true;
    findByIdStub.restore();
  });
  it("verifyOrder return 404", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        orderId: id.toString(),
        success: "true",
      },
    };

    const orderSaveStub = sinon.stub().resolves(); // Stub pour l'order
    const order = {
      save: orderSaveStub,
      _id: id.toString(),
      flight: "123",
      user: "1234",
      flightClass: "Economy",
      personCount: {
        Adultes: 1,
      },
      childrenAges: [],
      specialRequest: "no",
      paymentStatus: "Pending",
      TotalPrice: 100,
    };
    const url = `http://localhost:4000/flight/flight/${order.flight}`;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon.stub(ReserveModel, "findById").resolves(order);
    const axiosStub = sinon
      .stub(axios, "get")
      .withArgs(url)
      .resolves({ data: { flightData: null } });

    await verifyOrder(req, res);
    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(axiosStub.calledOnce).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Error while getting flight for verification ",
      })
    ).to.be.true;
    findByIdStub.restore();
  });
  it("verifyOrder returns 400 and order not paid", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        orderId: id.toString(),
        success: "false",
      },
    };

    const order = {
      _id: id.toString(),
      flight: "123",
      user: "1234",
      flightClass: "Economy",
      personCount: {
        Adultes: 1,
      },
      childrenAges: [],
      specialRequest: "no",
      paymentStatus: "Pending",
      TotalPrice: 100,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon
      .stub(ReserveModel, "findByIdAndDelete")
      .resolves(order);

    await verifyOrder(req, res);
    expect(findByIdStub.calledWith(id.toString())).to.be.true;

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: false,
        message: "Payment canceled and order deleted",
      })
    ).to.be.true;
    findByIdStub.restore();
  });
  it("userOrders() returns 200 and orders", async () => {
    const req = {
      params: {
        userId: "123",
      },
    };
    const order1 = {
      flight: "flight1",
      toObject: () => ({ _id: "1", flight: "flight1" }),
    };

    const order2 = {
      flight: "flight2",
      toObject: () => ({ _id: "2", flight: "flight2" }),
    };
    const fakeFlight1 = { flightNumber: "A123" };
    const fakeFlight2 = { flightNumber: "B456" };
    const formatOrders = [
      {
        order1,
        flight: { flightNumber: "A123" },
      },
      {
        order2,
        flight: { flightNumber: "B456" },
      },
    ];

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const axiosStub = sinon.stub(axios, "get");
    const flightStub1 = axiosStub
      .withArgs(`http://localhost:4000/flight/flight/${order1.flight}`)
      .resolves({ data: fakeFlight1 });
    const flightStub2 = axiosStub
      .withArgs(`http://localhost:4000/flight/flight/${order2.flight}`)
      .resolves({ data: fakeFlight2 });

    const findStub = sinon
      .stub(ReserveModel, "find")
      .resolves([order1, order2]);
    await userOrders(req, res);

    expect(flightStub1.called).to.be.true;
    expect(flightStub2.called).to.be.true;
    expect(findStub.called).to.be.true;
    console.log(res.status.args);
    console.log(res.json.args);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(sinon.match.array)).to.be.true;
    findStub.restore();
  });
  it("listOrders() and returns 200", async () => {
    const req = {};
    const order1 = {
      userId: "125",
      flight: "485",
      toObject: () => ({ _id: "1", flight: "485", userId: "125" }),
    };
    const orders = [
      {
        userId: "125",
        flight: "485",
        toObject: () => ({ _id: "1", flight: "485", userId: "125" }),
      },
    ];
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const urlUsers = `http://localhost:4000/user/user/getuser/${order1.userId}`;
    const urlflight = `http://localhost:4000/flight/flight/${order1.flight}`;
    const axiosgetStub = sinon.stub(axios, "get");
    sinon.stub(ReserveModel, "find").resolves(orders);
    const userStub = axiosgetStub
      .withArgs(urlUsers)
      .resolves({ data: { user: { _id: "152" } } });
    const flightStub = axiosgetStub
      .withArgs(urlflight)
      .resolves({ data: { flight: { _id: "152" } } });
    await listOrders(req, res);
    expect(userStub.calledOnce).to.be.true;
    expect(flightStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        data: sinon.match.array,
      })
    ).to.be.true;
  });
  it ("updateStatus() et returns 200",async()=>{
    const req={
      body:{
        reserveId:"152",
        status:"Pending"
      }

    }
    const order={
      status:"Pending"
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findByIdAndUpdateStub=sinon.stub(ReserveModel, 'findByIdAndUpdate').resolves(order);
    await updateStatus(req, res);
    expect(findByIdAndUpdateStub.calledWith("152",{status:"Pending"})).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ success: true, message: "Status updated" })).to.be.true;
  })
   it ("updateStatus() et returns 500",async()=>{
    const req = {
     params: {
    orderId: "invalidId"
  }
};
    
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findByIdAndUpdateStub=sinon.stub(ReserveModel, 'findByIdAndUpdate').resolves(null);
    await updateStatus(req, res);
    console.log(res.status.args);
    console.log(res.json.args)
    expect(findByIdAndUpdateStub.calledWith("invalidId", {status:"Pending"})).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: 'Error updating status' })).to.be.true;
  })
});
