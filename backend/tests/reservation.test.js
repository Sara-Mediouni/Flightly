const sinon = require("sinon");
const { expect } = require("chai");
const mongoose = require("mongoose");
const axios = require("axios");
const ReserveModel = require("../reserve-service/Models/HotelReservationSchema");
const stripe = require("../reserve-service/stripeClient");
const { placeOrder, verifyOrder } = require("../reserve-service/Controller/ReserveRoomsController");
const Accommodation = require("../Acc-service/Models/Accomodation");


describe("FLIGHT RESERVATION CONTROLLER UNIT TESTS", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("placeOrder returns 200", async () => {
    const idUser = new mongoose.Types.ObjectId();
    const idAcc = new mongoose.Types.ObjectId();
    const url = "https://fake-checkout-session.url";

    const req = {
      params: {
        userId: idUser.toString(),
        accId: idAcc.toString(),
      },
      body: {
        reservationData: {
        RoomsSelection:[{name:"abc",number:1}],
        checkInDate:"12/06/2025",
        checkOutDate:"15/06/2025",
        personCount:{Adultes:1},
        childrenAges:[],
        specialRequest:'no',
        paymentStatus:"Pending",
        TotalPrice:100
    
        },
      },
    };

    const userData = {
      _id: idUser.toString(),
      fullname: "abcdf",
    };

    const acc = {
      _id: idAcc.toString(),
      name: "abc",
    };

    const newOrder = {
      user: idUser.toString(),
      Acc: idAcc.toString(),
          RoomsSelection:[{name:"abc",number:1}],
        checkInDate:"12/06/2025",
        checkOutDate:"15/06/2025",
        personCount:{Adultes:1},
        childrenAges:[],
        specialRequest:'no',
        paymentStatus:"Pending",
        TotalPrice:100
    
    };
    const userUrl = `http://localhost:4000/user/user/getuser/${req.params.userId}`;
    const accUrl = `http://localhost:4000/acc/acc/${req.params.accId}`;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Stub axios
    const getStub = sinon.stub(axios, "get");
    getStub.withArgs(userUrl).resolves({ data: { user: userData } });
    getStub.withArgs(accUrl).resolves({
      data: {
        _id: idAcc.toString(),
        name: "abc",
      },
    });

    sinon.stub(ReserveModel.prototype, "save").resolves(newOrder);
    const StripeStub = sinon
      .stub(stripe.checkout.sessions, "create")
      .resolves({ url });

    await placeOrder(req, res);

    expect(getStub.calledWith(userUrl)).to.be.true;
    expect(getStub.calledWith(accUrl)).to.be.true;
    expect(StripeStub.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ success: true, session_url: url })).to.be
      .true;
  });
   it("placeOrder returns 404 user not found", async () => {
    const idUser = new mongoose.Types.ObjectId();
    const idAcc = new mongoose.Types.ObjectId();
    const url = "https://fake-checkout-session.url";

    const req = {
      params: {
        userId: idUser.toString(),
        accId: idAcc.toString(),
      },
      body: {
        reservationData: {
        RoomsSelection:[{name:"abc",number:1}],
        checkInDate:"12/06/2025",
        checkOutDate:"15/06/2025",
        personCount:{Adultes:1},
        childrenAges:[],
        specialRequest:'no',
        paymentStatus:"Pending",
        TotalPrice:100
    
        },
      },
    };


    const acc = {
      _id: idAcc.toString(),
      name: "abc",
    };

    const userUrl = `http://localhost:4000/user/user/getuser/${req.params.userId}`;
    const accUrl = `http://localhost:4000/acc/acc/${req.params.accId}`;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Stub axios
    const getStub = sinon.stub(axios, "get");
    getStub.withArgs(userUrl).resolves(null);
    getStub.withArgs(accUrl).resolves({
      data: {
        _id: idAcc.toString(),
        name: "abc",
      },
    });

   
    await placeOrder(req, res);

    expect(getStub.calledWith(userUrl)).to.be.true;
    expect(getStub.calledWith(accUrl)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: "User or Accommodation not found" })).to.be
      .true;
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
    const accSaveStub = sinon.stub().resolves();
     const acc = {
      _id: "123",
      name: "abc",
      roomTypes:[{name:"abc",number:1}],
      save: accSaveStub,

    };
    const orderSaveStub = sinon.stub().resolves(); // Stub pour l'order
    const order = {
            user: "152",
      Acc: "123",
          RoomsSelection:[{name:"abc",number:1}],
        checkInDate:"12/06/2025",
        checkOutDate:"15/06/2025",
        personCount:{Adultes:1},
        childrenAges:[],
        specialRequest:'no',
        paymentStatus:"Pending",
        TotalPrice:100,
    
    
      save: orderSaveStub,
      _id: id.toString(),
     
    };
    const url = `http://localhost:4000/acc/acc/${order.accommodation}`;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findByIdStub = sinon.stub(ReserveModel, "findById").resolves(order);
    const axiosStub = sinon
      .stub(axios, "get")
      .withArgs(url)
      .resolves({ data: { accommodation: acc } });
    sinon.stub(ReserveModel.prototype, "save").resolves(order);
    sinon.stub(Accommodation.prototype, "save");
    await verifyOrder(req, res);
    expect(findByIdStub.calledWith(id.toString())).to.be.true;
    expect(axiosStub.calledOnce).to.be.true;

    expect(accSaveStub.calledOnce).to.be.true;
    expect(orderSaveStub.calledOnce).to.be.true;
   

    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        success: true,
        message: 'Payment successful and room availability updated',
      })
    ).to.be.true;
    findByIdStub.restore();
  });
    it("verifyOrder() returns 404 because Error while getting accommodation for verification ", async () => {
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
        RoomsSelection:[],
        save:orderSaveStub
      };
      const url = `http://localhost:4000/acc/acc/${order.accommodation}`;
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const findByIdStub = sinon.stub(ReserveModel, "findById").resolves(order);
      const axiosStub = sinon
        .stub(axios, "get")
        .withArgs(url)
        .resolves({ data: { accommodation: null } });
  
      await verifyOrder(req, res);
   
      expect(findByIdStub.calledWith(id.toString())).to.be.true;
      expect(axiosStub.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(
        res.json.calledWithMatch({
          message: "Error while getting accommodation for verification ",
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
})