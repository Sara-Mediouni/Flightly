const sinon = require("sinon");
const { expect } = require("chai");
const fs = require("fs");
const path = require("path");
const AccommodationModel = require("../Acc-service/Models/Accomodation");
const {
  addAccommodation,
  editAccommodation,
  deleteAccommodation,
  filterAccommodations,
  getAccommodationById,
  getAllAccommodations,
  getRoomPricesByDate,
  deleteRoomImage,
  deleteImage,
} = require("../Acc-service/Controller/AccomodationController");
const { default: mongoose } = require("mongoose");

describe("Accommodation Controller tests", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("Add accommodation should return 201 and create accommodation", async () => {
    const req = {
      body: {
        accommodationData: {
          name: "abcd",
          type: "Hotel",
          country: "Tunisia",
          city: "abcdef",
          address: "abcdef",
          description: "abcdef",
          stars: 1,
          TotalRooms: 120,
          TotalFloors: 3,
          activities: ["spa", "massage", "yoga"],
          checkInTime: "12/05/2025",
          checkOutTime: "14/05/2025",
          minAgeToCheckIn: 18,
          Email: "test1@gmail.com",
          Phone: "123456",
          ReservationPhone: "123456",
          languagesSpoken: ["english", "french"],
          features: {
            petsAllowed: true,
            hasRestaurant: false,
            hasPool: false,
            hasSpa: false,
            hasGym: true,
            hasParking: false,
            hasWifi: false,
            hasBeach: true,
            hasBar: false,
            weather: "",
          },
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
        roomsData: [
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
            RoomImagesCount: 1,
          },
        ],
        offerData: {},
      },
      files: {
        accommodationImages: ["test.png"],
        roomImages: ["test.png"],
      },
    };
    const idacc = new mongoose.Types.ObjectId();
    const newAccommodation = {
      offers: null,
      name: "abcd",
      type: "Hotel",
      country: "Tunisia",
      city: "abcdef",
      address: "abcdef",
      description: "abcdef",
      stars: 1,
      TotalRooms: 120,
      TotalFloors: 3,
      activities: ["spa", "massage", "yoga"],
      checkInTime: "12/05/2025",
      checkOutTime: "14/05/2025",
      minAgeToCheckIn: 18,
      Email: "test1@gmail.com",
      Phone: "123456",
      ReservationPhone: "123456",
      languagesSpoken: ["english", "french"],
      features: {
        petsAllowed: true,
        hasRestaurant: false,
        hasPool: false,
        hasSpa: false,
        hasGym: true,
        hasParking: false,
        hasWifi: false,
        hasBeach: true,
        hasBar: false,
        weather: "",
        activities: ["spa"],
        _id: idacc.toString(),

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
            RoomImagesCount: 1,
            roomImages: ["test.png"],
          },
        ],
        images: ["test.png"],
      },
    };

    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };
    sinon.stub(AccommodationModel, "findOne").resolves(null);
    sinon.stub(AccommodationModel.prototype, "save").resolves(newAccommodation);

    await addAccommodation(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Accommodation and offer added successfully",
        accommodation: newAccommodation,
      })
    );
  });
  it("Add Accommodation should return 400 because the accommodation already exists", async () => {
    const req = {
      body: {
        accommodationData: {
          name: "abcd",
          type: "Hotel",
          country: "Tunisia",
          city: "abcdef",
          address: "abcdef",
          description: "abcdef",
          stars: 1,
          TotalRooms: 120,
          TotalFloors: 3,
          activities: ["spa", "massage", "yoga"],
          checkInTime: "12/05/2025",
          checkOutTime: "14/05/2025",
          minAgeToCheckIn: 18,
          Email: "test1@gmail.com",
          Phone: "123456",
          ReservationPhone: "123456",
          languagesSpoken: ["english", "french"],
          features: {
            petsAllowed: true,
            hasRestaurant: false,
            hasPool: false,
            hasSpa: false,
            hasGym: true,
            hasParking: false,
            hasWifi: false,
            hasBeach: true,
            hasBar: false,
            weather: "",
          },
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
        roomsData: [
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
            RoomImagesCount: 1,
          },
        ],
        offerData: {},
      },
      files: {
        accommodationImages: ["test.png"],
        roomImages: ["test.png"],
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(AccommodationModel, "findOne").resolves({ name: "abcd" });

    await addAccommodation(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({ message: "Accommodation Already exists" })
    );
  });
  it("Edit Accommodation should return 200 and update accommodation", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        id: id.toString(),
      },
      body: {
        accommodationData: {
          name: "abcd",
          type: "Hotel",
          country: "Tunisia",
          city: "abcdef",
          address: "abcdef",
          description: "abcdef",
          stars: 1,
          TotalRooms: 120,
          TotalFloors: 3,
          activities: ["spa", "massage", "yoga"],
          checkInTime: "12/05/2025",
          checkOutTime: "14/05/2025",
          minAgeToCheckIn: 18,
          Email: "test1@gmail.com",
          Phone: "123456",
          ReservationPhone: "123456",
          languagesSpoken: ["english", "french"],
          features: {
            petsAllowed: true,
            hasRestaurant: false,
            hasPool: false,
            hasSpa: false,
            hasGym: true,
            hasParking: false,
            hasWifi: false,
            hasBeach: true,
            hasBar: false,
            weather: "",
          },
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
        roomsData: [
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
            RoomImagesCount: 1,
          },
        ],
        offerData: {},
      },
      files: {
        accommodationImages: ["test.png"],
        roomImages: ["test.png"],
      },
    };
    const newAccommodation = {
      _id: id.toString(),
      offers: null,
      name: "adfcg",
      type: "Hotel",
      country: "Tunisia",
      city: "abcdef",
      address: "abcdef",
      description: "abcdef",
      stars: 1,
      TotalRooms: 120,
      TotalFloors: 3,
      activities: ["spa", "massage", "yoga"],
      checkInTime: "12/05/2025",
      checkOutTime: "14/05/2025",
      minAgeToCheckIn: 18,
      Email: "test1@gmail.com",
      Phone: "123456",
      ReservationPhone: "123456",
      languagesSpoken: ["english", "french"],
      features: {
        petsAllowed: true,
        hasRestaurant: false,
        hasPool: false,
        hasSpa: false,
        hasGym: true,
        hasParking: false,
        hasWifi: false,
        hasBeach: true,
        hasBar: false,
        weather: "",
        activities: ["spa"],
      },

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
          RoomImagesCount: 1,
          roomImages: ["test.png"],
        },
      ],
      images: ["test.png"],
    };
    const updatedAccommodation = {
      _id: id.toString(),
      offers: null,
      name: "adfcg",
      type: "Hotel",
      country: "Tunisia",
      city: "abcdef",
      address: "abcdef",
      description: "abcdef",
      stars: 1,
      TotalRooms: 120,
      TotalFloors: 3,
      activities: ["spa", "massage", "yoga"],
      checkInTime: "12/05/2025",
      checkOutTime: "14/05/2025",
      minAgeToCheckIn: 18,
      Email: "test1@gmail.com",
      Phone: "123456",
      ReservationPhone: "123456",
      languagesSpoken: ["english", "french"],
      features: {
        petsAllowed: true,
        hasRestaurant: false,
        hasPool: false,
        hasSpa: false,
        hasGym: true,
        hasParking: false,
        hasWifi: false,
        hasBeach: true,
        hasBar: false,
        weather: "",
        activities: ["spa"],

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
            RoomImagesCount: 1,
            roomImages: ["test.png"],
          },
        ],
        images: ["test.png"],
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(AccommodationModel, "findById").resolves(newAccommodation);
    const findStub = sinon
      .stub(AccommodationModel, "findByIdAndUpdate")
      .resolves(updatedAccommodation);
    await editAccommodation(req, res);

    expect(findStub.called).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.have.property(
      "message",
      "Accommodation updated successfully"
    );
    expect(res.json.firstCall.args[0]).to.have.property("accommodation");
    findStub.restore();
  });
  it("Edit Accommodation should return 404 the accommodation doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        id: id.toString(),
      },
      body: {
        accommodationData: {
          name: "adfcg",
        },
        roomsData: [],
        offerData: [],
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findStub = sinon.stub(AccommodationModel, "findById").resolves(null);
    await editAccommodation(req, res);

    expect(findStub.called).to.be.true;

    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch(
        sinon.match.has("message", "Accommodation not found")
      )
    ).to.be.true;
  });
  it("Delete Accommodation and returns 200", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        id: id.toString(),
      },
    };
    const AccommodationToDelete = {
      _id: id.toString(),
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon
      .stub(AccommodationModel, "findByIdAndDelete")
      .resolves(AccommodationToDelete);
    await deleteAccommodation(req, res);
    expect(findStub.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Accommodation deleted successfully",
      })
    );
  });
  it("tries to delete Accommodation and returns 404 because it's not found", async () => {
    const id = new mongoose.Types.ObjectId();
    const req = {
      params: {
        id: id.toString(),
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const findStub = sinon
      .stub(AccommodationModel, "findByIdAndDelete")
      .resolves(null);
    await deleteAccommodation(req, res);
    expect(findStub.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Accommodation not found" }));
  });

  it("Send filters and returns 200", async () => {
    const req = {
      query: {
        type: "Hotel",
        country: "Tunisia",
      },
    };
    const id = new mongoose.Types.ObjectId();
    const id2 = new mongoose.Types.ObjectId();
    const accommodations = [
      {
        _id: id.toString(),
      },
      {
        _id: id2.toString(),
      },
    ];
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(AccommodationModel, "find").resolves(accommodations);
    await filterAccommodations(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(accommodations)).to.be.true;
    AccommodationModel.find.restore();
  });
  it("returns accommodation by id and returns 200", async () => {
    const req = {
      params: { id: "123" },
    };
    const accommodation = {
      _id: "123",
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const populateStub = {
      populate: sinon.stub().returnsThis(), // pour permettre le chaînage
      exec: sinon.stub().resolves(accommodation), // renvoie finalement la promesse
    };
    const findStub = sinon
      .stub(AccommodationModel, "findById")
      .returns(populateStub);
    await getAccommodationById(req, res);
    expect(findStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(accommodation)).to.be.true;
    findStub.restore();
  });
  it("returns accommodation not found and returns 404", async () => {
    const populateStub = {
      populate: sinon.stub().returnsThis(),
      exec: sinon.stub().resolves(null), // simulate not found
    };

    const findByIdStub = sinon
      .stub(AccommodationModel, "findById")
      .returns(populateStub);

    const req = { params: { id: "123" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await getAccommodationById(req, res);

    expect(findByIdStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Accommodation not found" })).to
      .be.true;

    findByIdStub.restore();
  });
  it("Returns all accommodations and returns 200", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const id = new mongoose.Types.ObjectId();
    const id2 = new mongoose.Types.ObjectId();
    const accommodations = [
      {
        _id: id.toString(),
      },
      {
        _id: id2.toString(),
      },
    ];
    const populateStub = {
      populate: sinon.stub().returnsThis(),
      exec: sinon.stub().resolves(accommodations),
    };
    sinon.stub(AccommodationModel, "find").returns(populateStub);
    await getAllAccommodations(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(populateStub)).to.be.true;
    AccommodationModel.find.restore();
  });
  it("getRoomPricesByDate returns 200", async () => {
    const req = {
      params: {
        hotelId: "123",
      },
      query: {
        startDate: "12/06/2025",
        endDate: "25/07/2025",
      },
    };
    const accommodation = {
      _id: "123",
      roomTypes: [
        {
          name: "Deluxe Room",
          price: 100,
          pricingByDate: [
            { StartDate: "2025-05-01", EndDate: "2025-07-01", price: 150 },
          ],
          toObject: () => ({
            name: "Deluxe Room",
            price: 100,
            pricingByDate: [
              { StartDate: "2025-05-01", EndDate: "2025-07-01", price: 150 },
            ],
          }),
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const findByIdStub = sinon
      .stub(AccommodationModel, "findById")
      .resolves(accommodation);
    await getRoomPricesByDate(req, res);
 
    expect(findByIdStub.calledWith("123")).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({
        name: "Deluxe Room",
        basePrice: 100,
        dynamicPrice: 150,
      })
    );
  });
  it("deleteRoomImage et renvoie 200",async()=>{
    const req={
      params:{
        id:"120"
      },
      body:{
        roomIndex:0,
        imagePath:"test1.png"
      }
    }    
   
     const accommodation = {
      _id: "120",
      save: sinon.stub().resolves(),
      roomTypes: [
        {
          name: "Deluxe Room",
          price: 100,
          pricingByDate: [
            { StartDate: "2025-05-01", EndDate: "2025-07-01", price: 150 },
          ],
          roomImages:["test.png","test1.png"]
          
        },
      ],
    };
 

    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }

    const findByIdStub=sinon.stub(AccommodationModel,'findById').resolves(accommodation);
     // Stub file system
    sinon.stub(fs, "existsSync").returns(true);
    sinon.stub(fs, "unlinkSync").returns();
    await deleteRoomImage(req,res);
    console.log(res.status.args);
    console.log(res.json.args);
    expect(findByIdStub.calledWith("120")).to.be.true;
    expect(accommodation.roomTypes[0].roomImages).to.deep.equal(["test.png"]);
    expect(accommodation.save.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Image supprimée avec succès" })).to.be.true;
    
    findByIdStub.restore();
  })
  it("deleteRoomImage et renvoie 404 accommodation doesn't exist",async()=>{
    const req={
      params:{
        id:"120"
      },
      body:{
        roomIndex:0,
        imagePath:"test1.png"
      }
    }  
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
  

    const findByIdStub=sinon.stub(AccommodationModel,'findById').resolves(null);
    await deleteRoomImage(req,res);
    expect(findByIdStub.calledWith("120")).to.be.true;
  
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Not found" })).to.be.true;
    
    findByIdStub.restore();
     
  })
  it("deleteImage et renvoie 200 ",async()=>{
    const req={
      params:{
      id:"123"
    },body:{
      imagePath:"test1.png"
    }}
    const accommodation={
      save:sinon.stub().resolves(),
      _id:"123",
      images:["test1.png"]
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const FindStub=sinon.stub(AccommodationModel,'findById').resolves(accommodation);
    sinon.stub(fs,"existsSync").returns(true);
    sinon.stub(fs,"unlinkSync").returns();
    await deleteImage(req, res);
    expect(FindStub.calledWith("123")).to.be.true;
    expect(accommodation.save.called).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Image supprimée avec succès" })).to.be.true;
    FindStub.restore()
    


  })
  it("deleteImage et renvoie 404 Not Found ",async()=>{
    const req={
      params:{
      id:"123"
    },body:{
      imagePath:"test1.png"
    }}
   
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const FindStub=sinon.stub(AccommodationModel,'findById').resolves(null);
   
    await deleteImage(req, res);
    expect(FindStub.calledWith("123")).to.be.true;

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Not found" })).to.be.true;
    FindStub.restore()
    


  })
  it("should return 500 if an error is thrown", async () => {
  const req = {
    params: { id: "123" },
    body: { roomIndex: 0, imagePath: "img1.png" },
  };

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  // Force une erreur sur findById
  sinon.stub(AccommodationModel, "findById").rejects(new Error("DB error"));

  await deleteRoomImage(req, res);

  expect(res.status.calledWith(500)).to.be.true;
  expect(res.json.calledWithMatch({ message: "Erreur suppression image" })).to.be.true;
});

});
