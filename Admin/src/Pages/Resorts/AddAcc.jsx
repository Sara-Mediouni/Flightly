import { useState } from "react";
import axios from "axios";
import countries from "../../data/countries";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
export default function Add() {
  const [AccommodationData, setAccommodationData] = useState({
    name: "",
    type: "",
    country: "",
    city: "",
    address: "",
    description: "",
    stars: 1,
    TotalRooms: 0,
    TotalFloors: 0,
    activities: [],
    checkInTime: "",
    checkOutTime: "",
    minAgeToCheckIn: 18,
    Email: "",
    Phone: "",
    ReservationPhone: "",
    languagesSpoken: [],
    features: {
      petsAllowed: false,
      hasRestaurant: false,
      hasPool: false,
      hasSpa: false,
      hasGym: false,
      hasParking: false,
      hasWifi: false,
      hasBeach: false,
      hasBar: false,
      weather: "",
    },
    roomTypes: [],
  });

  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    discountPercentage: 0,
    validFrom: "",
    validTo: "",
    cancellationPolicy: "",
    includedServices: [],
    maxOccupancy: 0,
  });

  const [images, setImages] = useState([]);

  const featuresList = [
    { key: "petsAllowed", label: "Pets Allowed" },
    { key: "hasRestaurant", label: "Has Restaurant" },
    { key: "hasPool", label: "Has Pool" },
    { key: "hasBar", label: "Has Bar" },
    { key: "hasWifi", label: "Has Wifi" },
    { key: "hasGym", label: "Has Gym" },
    { key: "hasSpa", label: "Has Spa" },
    { key: "hasParking", label: "Has Parking" },
    { key: "hasBeach", label: "Has Beach" },
  ];

  const removeImage = (roomIndex, imgIndex) => {
    const newRoomTypes = [...AccommodationData.roomTypes];
    const updatedImages = [...(newRoomTypes[roomIndex].RoomImages || [])];

    updatedImages.splice(imgIndex, 1); // supprime l'image

    newRoomTypes[roomIndex] = {
      ...newRoomTypes[roomIndex],
      RoomImages: updatedImages,
    };

    setAccommodationData((prev) => ({
      ...prev,
      roomTypes: newRoomTypes,
    }));
  };
  const removeImageacc = (imgIndex) => {
    const updatedImages = [...(images || [])];

    updatedImages.splice(imgIndex, 1); // supprime l'image

    setImages(updatedImages);
  };
  const isOfferDataEmpty = (data) => {
    return (
      data.title.trim() === "" &&
      data.description.trim() === "" &&
      data.discountPercentage === 0 &&
      data.validFrom === "" &&
      data.validTo === "" &&
      data.cancellationPolicy.trim() === "" &&
      data.includedServices.length === 0 &&
      data.maxOccupancy === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "offerData",
      JSON.stringify(isOfferDataEmpty(offerData) ? null : offerData)
    );

    const cleanedRooms = AccommodationData.roomTypes.map((room) => ({
      ...room,
      RoomImagesCount: room.RoomImages.length,
    }));

    formData.append("accommodationData", JSON.stringify(AccommodationData));
    formData.append("roomsData", JSON.stringify(cleanedRooms));

    images.forEach((img) => formData.append("accommodationImages", img));

    AccommodationData.roomTypes.forEach((room) => {
      room.RoomImages.forEach((img) => {
        formData.append("roomImages", img);
      });
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/accommodation/create",
        formData
      );
      toast.success("Accommodation added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding accommodation", err);
    }
  };
  const addBed = (roomIndex) => {
    setAccommodationData((prev) => {
      const newRoomTypes = [...prev.roomTypes];
      newRoomTypes[roomIndex].beds.push({ typeBed: "", number: 0 });
      return {
        ...prev,
        roomTypes: newRoomTypes,
      };
    });
  };
  const removeBed = (roomIndex, bedIndex) => {
    setAccommodationData((prev) => {
      const newRoomTypes = [...prev.roomTypes];
      const newBeds = [...newRoomTypes[roomIndex].beds];

      newBeds.splice(bedIndex, 1); // Supprime le lit à l'index donné
      newRoomTypes[roomIndex].beds = newBeds;

      return {
        ...prev,
        roomTypes: newRoomTypes,
      };
    });
  };
  const removeSeason = (roomIndex, seasonIndex) => {
    setAccommodationData((prev) => {
      const newRoomTypes = [...prev.roomTypes];
      const newBeds = [...newRoomTypes[roomIndex].pricingByDate];

      newBeds.splice(seasonIndex, 1); // Supprime le lit à l'index donné
      newRoomTypes[roomIndex].pricingByDate = newBeds;

      return {
        ...prev,
        roomTypes: newRoomTypes,
      };
    });
  };
  const removeRoom = (roomIndex) => {
    setAccommodationData((prev) => {
      const RoomTypes = [...prev.roomTypes];
      RoomTypes.splice(roomIndex, 1); // Supprime la chambre à l'index donné

      return {
        ...prev,
        roomTypes: RoomTypes, // On renvoie le tableau modifié
      };
    });
  };
  const handleFileRoomChange = (e, index) => {
    const files = Array.from(e.target.files);
    const newRoomTypes = [...AccommodationData.roomTypes];
    newRoomTypes[index].RoomImages = files;
    setAccommodationData((prev) => ({
      ...prev,
      roomTypes: newRoomTypes,
    }));
  };

  const updateRoom = (index, key, value) => {
    const newRoom = [...AccommodationData.roomTypes];
    newRoom[index][key] = value;
    setAccommodationData((prev) => ({ ...prev, roomTypes: newRoom }));
  };

  const addSeason = (roomIndex) => {
    setAccommodationData((prev) => {
      const newRoomTypes = [...prev.roomTypes];
      newRoomTypes[roomIndex].pricingByDate.push({
        StartDate: "",
        EndDate: "",
        price: 0,
      });
      return {
        ...prev,
        roomTypes: newRoomTypes,
      };
    });
  };

  const addRoom = () => {
    setAccommodationData((prev) => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        {
          name: "",
          price: 0,
          capacity: 0,
          beds: [{ typeBed: "", number: 0 }],
          area: 0,
          amenities: [],
          roomNumber: 0,
          pricingByDate: [],
          description: "",
          availableRooms: 0,
          RoomImages: [],
        },
      ],
    }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };
  const DateFormatter = (dateStr) => {
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("fr-FR"); // format 'jj/mm/aaaa'
    return formattedDate;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-violet-200 shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl text-violet-900 font-bold mb-4">
        Accommodation Info
      </h2>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Type</label>
        <select
          className="input"
          value={AccommodationData.type}
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, type: e.target.value })
          }
        >
          <option value="">Select type</option>
          <option value="Hotel">Hotel</option>
          <option value="Resort">Resort</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="input"
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, name: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Country</label>
        <select
          className="input"
          value={AccommodationData.country}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              country: e.target.value,
            })
          }
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Address</label>
        <input
          type="text"
          placeholder="Address"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              address: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">City</label>
        <input
          type="text"
          placeholder="City"
          className="input"
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, city: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Description</label>
        <input
          type="text"
          placeholder="Description"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              description: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Phone</label>
        <input
          type="text"
          placeholder="Phone"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              Phone: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Reservation Phone
        </label>
        <input
          type="text"
          placeholder="Description"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              ReservationPhone: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Email</label>
        <input
          type="text"
          placeholder="Email"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              Email: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Stars</label>
        <input
          type="number"
          placeholder="Stars"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              stars: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Total Rooms</label>
        <input
          type="number"
          placeholder="Total Rooms"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              TotalRooms: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Total Floors
        </label>
        <input
          type="number"
          placeholder="Total Floors"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              TotalFloors: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Check-in Time
        </label>
        <input
          type="time"
          className="input"
          value={AccommodationData.checkInTime}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              checkInTime: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Check-out Time
        </label>
        <input
          type="time"
          className="input"
          value={AccommodationData.checkOutTime}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              checkOutTime: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Minimum Age to Check-in
        </label>
        <input
          type="number"
          className="input"
          value={AccommodationData.minAgeToCheckIn}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              minAgeToCheckIn: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Languages Spoken (comma separated)
        </label>
        <input
          type="text"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              languagesSpoken: e.target.value
                .split(",")
                .map((lang) => lang.trim()),
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Activities (comma separated)
        </label>
        <input
          type="text"
          className="input"
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              activities: e.target.value.split(",").map((lang) => lang.trim()),
            })
          }
        />
      </div>

      {featuresList.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          <label className="font-bold text-xl text-violet-900">{label}</label>
          <input
            type="checkbox"
            checked={AccommodationData.features[key]}
            onChange={(e) =>
              setAccommodationData({
                ...AccommodationData,
                features: {
                  ...AccommodationData.features,
                  [key]: e.target.checked,
                },
              })
            }
          />
        </div>
      ))}

      <div className="space-y-2">
        <h3 className="font-bold text-xl text-violet-900">Rooms</h3>
        {AccommodationData.roomTypes.map((a, i) => (
          <div key={i} className="grid grid-cols-1 gap-2">
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Name</label>
              <input
                type="text"
                placeholder="name"
                value={a.name}
                className="input"
                onChange={(e) => updateRoom(i, "name", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={a.price}
                className="input"
                onChange={(e) =>
                  updateRoom(i, "price", parseInt(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Area</label>
              <input
                type="number"
                placeholder="Area"
                value={a.area}
                className="input"
                onChange={(e) =>
                  updateRoom(i, "area", parseInt(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                className="input"
                value={a.amenities?.join(", ") || ""}
                onChange={(e) => {
                  const newAmenities = e.target.value
                    .split(",")
                    .map((item) => item.trim());
                  updateRoom(i, "amenities", newAmenities);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">
                Capacity
              </label>
              <input
                type="number"
                placeholder="Capacity"
                value={a.capacity}
                className="input"
                onChange={(e) =>
                  updateRoom(i, "capacity", parseInt(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                value={a.description}
                className="input"
                onChange={(e) => updateRoom(i, "description", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">
                Available Rooms
              </label>
              <input
                type="number"
                placeholder="Available Rooms"
                value={a.availableRooms}
                className="input"
                onChange={(e) =>
                  updateRoom(i, "availableRooms", parseInt(e.target.value))
                }
              />
              <div className="flex flex-col gap-5 mt-10">
                <label className="font-bold text-xl text-violet-900">
                  Seasons
                </label>
                {a.pricingByDate.map((season, idx) => (
                  <div key={idx} className="flex gap-6 gap-y-6">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={season.StartDate}
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "pricingByDate",
                          a.pricingByDate.map((b, index) =>
                            index === idx
                              ? { ...b, StartDate: e.target.value }
                              : b
                          )
                        )
                      }
                      className="input"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      min={new Date().toISOString().split("T")[0]} 
                      value={season.EndDate}
                      onChange={(e) => {
                        const today = new Date();

                        // Assure-toi que Reservation.date est bien un objet Date, sinon convertis-le
                        const reservationDate = new Date(season.EndDate.date);

                        // Mets les heures, minutes, secondes et millisecondes à zéro pour ne comparer que la date
                        today.setHours(0, 0, 0, 0);
                        reservationDate.setHours(0, 0, 0, 0);

                        if (reservationDate < today) {
                          toast.error("The Date has already passed!!");
                        }
                        updateRoom(
                          i,
                          "pricingByDate",
                          a.pricingByDate.map((b, index) =>
                            index === idx
                              ? { ...b, EndDate: e.target.value }
                              : b
                          )
                        );
                      }}
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={season.price}
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "pricingByDate",
                          a.pricingByDate.map((b, index) =>
                            index === idx
                              ? { ...b, price: parseInt(e.target.value) }
                              : b
                          )
                        )
                      }
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Available Rooms"
                      value={season.availableRooms}
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "pricingByDate",
                          a.pricingByDate.map((b, index) =>
                            index === idx
                              ? {
                                  ...b,
                                  availableRooms: parseInt(e.target.value),
                                }
                              : b
                          )
                        )
                      }
                      className="input"
                    />
                    <button
                      className="delete"
                      onClick={() => removeSeason(i, season)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-start items-start mt-10">
                <button
                  type="button"
                  className="add"
                  onClick={() => addSeason(i)} // Passer l'index de la chambre
                >
                  +Add Season
                </button>
              </div>

              <div className="flex flex-col gap-5 py-20">
                <label className="font-bold text-xl  text-violet-900">
                  Beds
                </label>
                {a.beds.map((bed, bedIndex) => (
                  <div key={bedIndex} className="flex gap-6 gap-y-6">
                    <input
                      required
                      type="number"
                      placeholder="Number"
                      value={bed.number}
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "beds",
                          a.beds.map((b, index) =>
                            index === bedIndex
                              ? { ...b, number: parseInt(e.target.value) }
                              : b
                          )
                        )
                      }
                      className="input"
                    />
                    <select
                      value={bed.typeBed}
                      required
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "beds",
                          a.beds.map((b, index) =>
                            index === bedIndex
                              ? { ...b, typeBed: e.target.value }
                              : b
                          )
                        )
                      }
                      className="input"
                    >
                      <option value="">Select bed type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Queen">Queen</option>
                      <option value="King">King</option>
                      <option value="Sofa bed">Sofa bed</option>
                      <option value="Bunk bed">Bunk bed</option>
                    </select>

                    <button
                      className="delete"
                      onClick={() => removeBed(i, bedIndex)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col justify-start items-start">
                  <button
                    type="button"
                    className="add"
                    onClick={() => addBed(i)} // Passer l'index de la chambre
                  >
                    +Add Bed
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-xl text-violet-900">
                  Room Images
                </label>

                <input
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
    file:rounded file:border-0 file:bg-blue-50 file:text-violet-900 hover:file:bg-violet-300"
                  type="file"
                  multiple
                  onChange={(e) => handleFileRoomChange(e, i)}
                />

                {AccommodationData.roomTypes[i]?.RoomImages?.map(
                  (image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="flex items-center gap-4 mt-2"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Room image ${imgIndex}`}
                        className="w-32 h-32 object-cover rounded shadow"
                      />
                      <button
                        type="button"
                        className="text-red-600 underline font-bold hover:bg-red-100 px-2 py-1 rounded"
                        onClick={() => removeImage(i, imgIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col py-10 justify-center items-center">
              <button className="delete" onClick={() => removeRoom(i)}>
                Delete Room
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addRoom} className="add">
          + Add Room
        </button>
      </div>

      <h2 className="text-2xl text-violet-900 font-bold mt-6 mb-4">
        Offer Info
      </h2>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Title</label>
        <input
          type="text"
          placeholder="Title"
          className="input"
          onChange={(e) =>
            setOfferData({ ...offerData, title: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Percentage Offer
        </label>
        <input
          type="number"
          placeholder="Percentage"
          className="input"
          onChange={(e) =>
            setOfferData({
              ...offerData,
              discountPercentage: parseFloat(e.target.value),
            })
          }
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-xl text-violet-900">
          Activities (comma separated)
        </h3>
        <div className="flex flex-col">
          <input
            type="text"
            className="input"
            placeholder="Activities (comma separated)"
            onChange={(e) =>
              setOfferData({
                ...offerData,
                activities: e.target.value
                  .split(",")
                  .map((lang) => lang.trim()),
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Check-in Date
        </label>
        <input
          type="date"
          className="input"
          value={offerData.validFrom}
          onChange={(e) =>
            setOfferData({
              ...offerData,

              validFrom: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Check-out Date
        </label>
        <input
          type="date"
          className="input"
          value={offerData.validTo}
          onChange={(e) => {
            const today = new Date();

            // Assure-toi que Reservation.date est bien un objet Date, sinon convertis-le
            const reservationDate = new Date(offerData.validTo.date);

            // Mets les heures, minutes, secondes et millisecondes à zéro pour ne comparer que la date
            today.setHours(0, 0, 0, 0);
            reservationDate.setHours(0, 0, 0, 0);

            if (reservationDate < today) {
              toast.error("The Date has already passed!!");
            }
            setOfferData({
              ...offerData,

              validTo: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Max Occupancy
        </label>
        <input
          type="number"
          className="input"
          value={offerData.maxOccupancy}
          onChange={(e) =>
            setOfferData({
              ...offerData,

              maxOccupancy: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Included Services (comma separated)
        </label>
        <input
          type="text"
          className="input"
          onChange={(e) =>
            setOfferData({
              ...offerData,
              includedServices: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">
          Cancellation Policy
        </label>
        <textarea
          className="input"
          onChange={(e) =>
            setOfferData({
              ...offerData,

              cancellationPolicy: e.target.value,
            })
          }
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
         file:rounded file:border-0 file:bg-blue-50 file:text-violet-900 hover:file:bg-violet-300"
        />
        {images?.map((image, imgIndex) => (
          <div key={imgIndex} className="flex items-center gap-4 mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt={`Room image ${imgIndex}`}
              className="w-32 h-32 object-cover rounded shadow"
            />
            <button
              type="button"
              className="text-red-600 underline font-bold hover:bg-red-100 px-2 py-1 rounded"
              onClick={() => removeImageacc(imgIndex)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-violet-900 text-white px-4 py-2 rounded hover:bg-violet-300"
      >
        Submit
      </button>
    </form>
  );
}
