const sinon = require("sinon");
const { expect } = require("chai");
const AccommodationModel = require("../Acc-service/Models/Accomodation");
const { addAccommodation, editAccommodation } = require("../Acc-service/Controller/AccomodationController");
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
            { StartDate: "12/05/2025", EndDate: "15/09/2025", price: 150, availableRooms: 5 },
          ],
          description: "abcdefg",
          availableRooms: 4,
            },
          ],
        },
        roomsData: [{
          name: "abcdef",
          price: 110,
          capacity: 2,
          beds: [{ typeBed: "Single", number: 2 }],
          area: 40,
          amenities: ["tv", "air conditioner"],
          roomNumber: 5,
          pricingByDate: [
            { StartDate: "12/05/2025", EndDate: "15/09/2025", price: 150, availableRooms: 5 },
          ],
          description: "abcdefg",
          availableRooms: 4,
          RoomImagesCount: 1,
        }],
        offerData: {},
      },
      files: {
        accommodationImages: ["test.png"],
        roomImages: ["test.png"],
      },
    };
    const newAccommodation={
    offers:null,
    roomTypes:[{
      name: "abcdef",
          price: 110,
          capacity: 2,
          beds: [{ typeBed: "Single", number: 2 }],
          area: 40,
          amenities: ["tv", "air conditioner"],
          roomNumber: 5,
          pricingByDate: [
            { StartDate: "12/05/2025", EndDate: "15/09/2025", price: 150, availableRooms: 5 },
          ],
          description: "abcdefg",
          availableRooms: 4,
          RoomImagesCount: 1,
          roomImages:["test.png"]
    }],
    images:["test.png"]
    }

    const res = {
      json: sinon.stub(),
      status: sinon.stub().returnsThis(),
    };
    sinon.stub(AccommodationModel,'findOne').resolves(null);
    sinon.stub(AccommodationModel.prototype, "save").resolves(newAccommodation);
    
    await addAccommodation(req,res)
    
    console.log(res.status.args)
    console.log(res.json.args)
    expect(res.status.calledWith(201)).to.be.true;
   
   
  });
  it("Add Accommodation should return 400 because the accommodation already exists", async()=>{
   
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
            { StartDate: "12/05/2025", EndDate: "15/09/2025", price: 150, availableRooms: 5 },
          ],
          description: "abcdefg",
          availableRooms: 4,
            },
          ],
        },
        roomsData: [{
          name: "abcdef",
          price: 110,
          capacity: 2,
          beds: [{ typeBed: "Single", number: 2 }],
          area: 40,
          amenities: ["tv", "air conditioner"],
          roomNumber: 5,
          pricingByDate: [
            { StartDate: "12/05/2025", EndDate: "15/09/2025", price: 150, availableRooms: 5 },
          ],
          description: "abcdefg",
          availableRooms: 4,
          RoomImagesCount: 1,
        }],
        offerData: {},
      },
      files: {
        accommodationImages: ["test.png"],
        roomImages: ["test.png"],
      },
    }
     const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
     }

     sinon.stub(AccommodationModel, 'findOne').resolves({ name: "abcd" });

     await addAccommodation(req, res)
      console.log(res.status.args)
      console.log(res.json.args)
     expect(res.status.calledWith(400)).to.be.true;
     expect(res.json.calledWithMatch({ message: 'Accommodation Already exists'}))
    })
   it("Edit Accommodation should return 200 and update accommodation", async()=>{
      const id=new mongoose.Types.ObjectId;
      const req = {
      params:{
        id:id.toString()
      },
      body:{
        accommodationData:{
          name:"adfcg"
        }
      }
     
    }
     const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
     }

     sinon.stub(AccommodationModel, 'findById').resolves(id);
     const findStub=sinon.stub(AccommodationModel,'findByIdAndUpdate').resolves()
     await editAccommodation(req, res)
     expect(findStub.calledWith(id,))
      console.log(res.status.args)
      console.log(res.json.args)
     expect(res.status.calledWith(200)).to.be.true;
     expect(res.json.calledWithMatch({ message: 'Accommodation updated successfully'}))
    })
  })

