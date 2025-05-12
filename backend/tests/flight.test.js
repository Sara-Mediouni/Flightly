const sinon = require("sinon");
const mongoose = require("mongoose");
const { expect } = require("chai");
const flightModel = require("../Flight-service/Models/Flight");
const {
  addFlight,
  EditFlight,
  deleteFlight,
  filterFlights,
  getAllFlights,
  FlightById,
} = require("../Flight-service/Controller/FlightController");

describe("FLIGHT CONTROLLER TESTS", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Add Flight should return 201 ", async () => {
    const req = {
      body: {
        flightData: {
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
        },
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const flightAdded = {
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
      _id: new mongoose.Types.ObjectId(),
    };
    const findOneStub = sinon.stub(flightModel, "findOne").resolves(null);
    sinon.stub(flightModel.prototype, "save").resolves(flightAdded);
    await addFlight(req, res);
    expect(findOneStub.calledWith({ flightNumber: "AD1542" })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Vol ajouté avec succès" })).to
      .be.true;
    findOneStub.restore();
  });
  it("Add flight returns 400 because the flight exists", async () => {
    const req = {
      body: {
        flightData: {
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
        },
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findOneStub = sinon
      .stub(flightModel, "findOne")
      .resolves({ flightNumber: "AD1542" });

    await addFlight(req, res);
    expect(findOneStub.calledWith({ flightNumber: "AD1542" })).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({ message: "Un Vol avec ce numéro existe déjà" })
    ).to.be.true;
    findOneStub.restore();
  });
  it("Edit existing flight and returns 200", async () => {
    const req = {
      params: { id: "123" },
      body: {
        flightData: {
          from: "Spain",
        },
      },
    };
    const flightToEdit = {
      _id: "123",
    };
    const updatedFlight = {
      _id: "123",
      from: "Spain",
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
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon
      .stub(flightModel, "findByIdAndUpdate")
      .resolves(flightToEdit);
    await EditFlight(req, res);
    expect(findStub.calledWith("123", req.body.flightData)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Vol mis à jour avec succès",
        updatedFlight,
      })
    );
    findStub.restore();
  });
  it("Edit Fight returns 404 flight not found", async () => {
    const req = {
      params: { id: "123" },
      body: {
        flightData: {
          from: "Spain",
        },
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon
      .stub(flightModel, "findByIdAndUpdate")
      .resolves(null);
    await EditFlight(req, res);
    expect(findStub.calledWith("123", req.body.flightData)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({message: 'Vol non trouvé' })
    );
    findStub.restore();
  });
  it("deleteFlight returns 200",async()=>{
    const req={ 
      params:{
        id:"123"
      }}
      const flightToDelete={_id:123}
    const res={
     status:sinon.stub().returnsThis(),
     json:sinon.stub()
    }
    const findByAndDeleteStub=sinon.stub(flightModel, 'findByIdAndDelete').resolves(flightToDelete);
    await deleteFlight(req, res);
    expect(findByAndDeleteStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Vol supprimé avec succès' })).to.be.true;

  });
  it("deleteFlight return 404 not found",async()=>{
     const req={ 
      params:{
        id:"123"
      }}
     const flightToDelete={_id:123}

    const res={
     status:sinon.stub().returnsThis(),
     json:sinon.stub()
    }
      const findByAndDeleteStub=sinon.stub(flightModel, 'findByIdAndDelete').resolves(null);
    await deleteFlight(req, res);
    expect(findByAndDeleteStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Vol non trouvé' })).to.be.true;

  });
  it("filterFlights returns 200",async()=>{
    const req={
      query:{
        from:"Spain",
        to:"France",
        departureDate:"15/05/2025",

        returnDate:"15/05/2025",
       
      }
    }


    const flightsList=[
      {
        _id:"123"
      }
    ]
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findStub=sinon.stub(flightModel, 'find').resolves(flightsList);
    await filterFlights(req, res);
     expect(findStub.calledWith(sinon.match.has('from', 'Spain'))).to.be.true;
    console.log(res.json.args)
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(sinon.match((val) => {
  return Array.isArray(val) && val.some(item => item._id === '123');
}))).to.be.true;
  })
  it("filterFlights returns 404", async()=>{
    const req={
      query:{
        passengers:"",
        classType:"",
        type:"",
        from:"Spain",
        to:"France",
        departureDate:"15/05/2025",

        returnDate:"15/05/2025",
       
      }
    }


  
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findStub=sinon.stub(flightModel, 'find').resolves([]);
    await filterFlights(req, res);
 
    expect(findStub.calledWith(sinon.match.has('from', 'Spain'))).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
 
    expect(res.json.calledWithMatch({ message: 'Aucun vol trouvé avec ces filtres' })).to.be.true;
    findStub.restore();
  })
  it("getAllFlights() returns 200",async()=>{
    const req={}
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const flightsList=[
      {_id:"123"},
      {_id:"124"}
    ]
    const findStub=sinon.stub(flightModel,"find").resolves(flightsList);
    await getAllFlights(req, res);
    expect(findStub.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(flightsList)).to.be.true;

  })
  it("EditFlight and returns 200",async()=>{
    const req={
      params:{
        id:"123"
      },
      body:{
        flightData: {
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
        },
      
      }
    }
    const updatedFlight={
       _id:"123",
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
        
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findStub=sinon.stub(flightModel,"findByIdAndUpdate").resolves(updatedFlight)
    await EditFlight(req, res);
   
    expect(findStub.calledWith("123",req.body.flightData, { new: true })).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Vol mis à jour avec succès', updatedFlight }))
  })

  it("EditFlight and returns 404 flight not found",async()=>{
    const req={
      params:{
        id:"123"
      },
      body:{
        flightData: {
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
        },
      
      }
    }
    
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const findStub=sinon.stub(flightModel,"findByIdAndUpdate").resolves(null)
    await EditFlight(req, res);
  
    expect(findStub.calledWith("123",req.body.flightData, { new: true })).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Vol non trouvé' }))
  
  })
  it ("FlightById returns 200",async()=>{
    const req={
     params:{
      id:"123"
     }
    } 
    const flightData={
      _id:"123"
    }
    const res={
        status:sinon.stub().returnsThis(),
        json:sinon.stub()
      }
    const findStub=sinon.stub(flightModel,'findById').resolves(flightData);
    await FlightById(req, res);
    expect(findStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(flightData)).to.be.true;
  })
 
  it ("FlightById returns 404 not found",async()=>{
    const req={
     params:{
      id:"123"
     }
    } 
   
    const res={
        status:sinon.stub().returnsThis(),
        json:sinon.stub()
      }
    const findStub=sinon.stub(flightModel,'findById').resolves(null);
    await FlightById(req, res);
    expect(findStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Vol non trouvé' })).to.be.true;
  })
});
