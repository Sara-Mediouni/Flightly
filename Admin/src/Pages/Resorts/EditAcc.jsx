import axios from "axios";
import React, { useEffect, useState } from "react";
import countries from "../../data/countries";
import { FaTrash } from "react-icons/fa";

const EditAcc = () => {
  const [AccommodationData, setAccommodationData] = useState();
  const id = localStorage.getItem("id");
  const token=localStorage.getItem("admin")
  const [offerData, setOfferData] = useState();
  const [Newimages, setNewimages] = useState([])
  const [images, setImages] = useState([]);
  const getAccommodationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/acc/acc/${id}`
      );
      setAccommodationData(response.data);
      setOfferData(response.data.offers || {});
      setImages(response.data.images || []);
    } catch (error) {
      console.error("Error fetching accommodation data:", error);
    }
  };
  const isOfferDataEmpty = (data) => {
    return (
      data.title === "" &&
      data.description === "" &&
      data.discountPercentage === 0 &&
      data.validFrom === "" &&
      data.validTo === "" &&
      data.cancellationPolicy === "" &&
      data.includedServices.length === 0 &&
      data.maxOccupancy === 0
    );
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


  const handleRemoveRoomImage = async (roomIndex, imageIndex, imagePath) => {
    try {
      await axios.delete(`http://localhost:4000/acc/admin/room-image/${id}`, {
        data: {
          // L'id de l'accommodation
          roomIndex,
          imagePath,
        },
      }, {
         headers:{
          'Authorization':`Bearer ${token}`
         }});
      console.log("Image supprimée de MongoDB avec succès");
      alert("Image supprimée de MongoDB avec succès");
      getAccommodationData(); // Récupérer à nouveau les données de l'hébergement
      // Mettre à jour le state local
      const updated = [...AccommodationData.roomTypes];
      updated[roomIndex].RoomImages.splice(imageIndex, 1);
      setAccommodationData((prev) => ({
        ...prev,
        roomTypes: updated,
      }));
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de l'image",error);
    }
  };
  
  const RemoveImageAcc = async (imageIndex, imagePath) => {
    try {
      await axios.delete(`http://localhost:4000/acc/admin/image/${id}`, {
        data: {
          imagePath,
        }},{
         headers:{
          'Authorization':`Bearer ${token}`
         }}
      );
      console.log("Image supprimée de MongoDB avec succès");
      alert("Image supprimée de MongoDB avec succès");
      getAccommodationData(); // Récupérer à nouveau les données de l'hébergement
      // Mettre à jour le state local
      const updated = [...AccommodationData];
      updated.images.splice(imageIndex, 1);
      setAccommodationData(updated);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression de l'image",error);
    }
  };
  
  const removeImageacc = (imgIndex) => {
    
    const updatedImages = [...Newimages || []];
  
    updatedImages.splice(imgIndex, 1); // supprime l'image
  
  
  
    setNewimages(updatedImages);}
  
  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const removeImage = (roomIndex, imageIndex) => {
    const updatedRoomTypes = [...AccommodationData.roomTypes];
    updatedRoomTypes[roomIndex].RoomImages = updatedRoomTypes[roomIndex].RoomImages.filter(
      (_, i) => i !== imageIndex
    );
    setAccommodationData({ ...AccommodationData, roomTypes: updatedRoomTypes });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("offerData", JSON.stringify(isOfferDataEmpty(offerData) ? null : offerData));

    const cleanedRooms = AccommodationData.roomTypes.map((room) => ({
      ...room,
      RoomImagesCount: room.RoomImages?.length,
    }));

    formData.append("accommodationData", JSON.stringify(AccommodationData));
    formData.append("roomsData", JSON.stringify(cleanedRooms));
    images.forEach((img) => formData.append("existingImages", img));

    Newimages.forEach((img) => formData.append("uploadedImages", img));
    
    AccommodationData.roomTypes.forEach((room) => {
      room.RoomImages?.forEach((img) => {
        formData.append("roomImages", img);
      });
    });

    try {
      const res = await axios.put(
        `http://localhost:4000/acc/admin/edit/${id}`,
        formData,
       {
         headers:{
          'Authorization':`Bearer ${token}`
         }}
      );
      alert("Accommodation added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding accommodation", err);
    }
  };
  const handleFileChange = (e) => {
    setNewimages([...e.target.files]);
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
  const addRoom = () => {
    setAccommodationData((prev) => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        {
          name: "",
          price: 0,
          capacity: 0,
          beds: [{  typeBed: "",number: 0 }],
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
  const updateRoom = (index, key, value) => {
    const newRoom = [...AccommodationData.roomTypes];
    newRoom[index][key] = value;
    setAccommodationData((prev) => ({ ...prev, roomTypes: newRoom }));
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

  useEffect(() => {
    getAccommodationData();

    console.log(AccommodationData);
    console.log(offerData);
    console.log(images);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-violet-200 shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl text-violet-900 font-bold mb-4">
        Edit Accommodation
      </h2>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Type</label>
        <select
          className="input"
          value={AccommodationData?.type || ""}
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
          value={AccommodationData?.name || ""}
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, name: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">City</label>
        <input
          type="text"
          placeholder="Name"
          className="input"
          value={AccommodationData?.city || ""}
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, city: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Total Floors</label>
        <input
          type="number"
          placeholder="Floors"
          className="input"
          value={AccommodationData?.TotalFloors || ""}
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, TotalFloors: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Activities</label>
        <input
          type="text"
          placeholder="Activities"
          className="input"
          value={AccommodationData?.activities.join(',') || ""}
          onChange={(e) =>
            setAccommodationData({ ...AccommodationData, activities: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Country</label>
        <select
          className="input"
          value={AccommodationData?.country || ""}
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
          value={AccommodationData?.address || ""}
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
          value={AccommodationData?.city || ""}
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
          value={AccommodationData?.description || ""}
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
          value={AccommodationData?.Phone || ""}
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
          placeholder="Reservation Phone"
          className="input"
          value={AccommodationData?.ReservationPhone || ""}
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
          value={AccommodationData?.Email || ""}
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
          value={AccommodationData?.stars || ""}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              stars: e.target.value,
            })
          }
        />
      </div>
      {featuresList.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          <label className="font-bold text-xl text-violet-900">{label}</label>
          <input
            type="checkbox"
            checked={AccommodationData?.features[key]}
            onChange={(e) =>
              setAccommodationData({
                ...AccommodationData,
                features: {
                  ...AccommodationData?.features,
                  [key]: e.target.checked,
                },
              })
            }
          />
        </div>
      ))}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Total Rooms</label>
        <input
          type="number"
          placeholder="Total Rooms"
          className="input"
          value={AccommodationData?.TotalRooms || ""}
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
          Check-In Time
        </label>
        <input
          type="time"
          className="input"
          value={AccommodationData?.checkInTime || ""}
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
          Check-Out Time
        </label>
        <input
          type="time"
          className="input"
          value={AccommodationData?.checkOutTime || ""}
          onChange={(e) =>
            setAccommodationData({
              ...AccommodationData,
              checkOut: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Room Types</label>
        <div className="grid grid-cols-1 gap-4">
          {AccommodationData?.roomTypes.map((room, index) => (
            <div
              key={index}
              className="border border-violet-300 p-4 rounded-md space-y-2"
            >
              <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Name</label>
              <input
                type="text"
                placeholder="Room Type Name"
                className="input"
                value={room.name || ""}
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].name = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              /> </div>
               <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Description</label>
                 <input
                type="text"
                placeholder="Room Description"
                className="input"
                value={room.description || ""}
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].description = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              />   
              </div>
               <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Area</label>
              <input
                type="number"
                placeholder="Area"
                value={room.area}
                className="input"
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].area = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              />
            </div>
               <div className="flex flex-col"> <label className="font-bold text-xl text-violet-900">
    Amenities (comma separated)
  </label>
  <input
    type="text"
    className="input"
    value={room.amenities?.join(", ") || ""}
    onChange={(e) => {
      const updatedRooms = [...AccommodationData.roomTypes];
      updatedRooms[index].amenities = e.target.value.split(",").map((item) => item.trim());
      setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
    }}
  />
</div>  <div className="flex flex-col">
              <label className="font-bold text-xl text-violet-900">Price</label>
              <input
                type="number"
                placeholder="Room Price"
                className="input"
                value={room.price || ""}
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].price = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              />

              </div>
                <div className="flex flex-col">
                <label className="font-bold text-xl text-violet-900">Available</label>
              <input
                type="number"
                placeholder="available rooms"
                className="input"
                value={room.availableRooms || ""}
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].availableRooms = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              /></div>
                <div className="flex flex-col">
                <label className="font-bold text-xl text-violet-900">Capacity</label>
              <input
                type="number"
                placeholder="Room Quantity"
                className="input"
                value={room.capacity || ""}
                onChange={(e) => {
                  const updatedRooms = [...AccommodationData.roomTypes];
                  updatedRooms[index].capacity = e.target.value;
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {room.roomImages?.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <img
                      src={`http://localhost:4000/acc/uploads/${img}`}
                      alt={`Room ${index} - Img ${imgIndex}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => handleRemoveRoomImage(index, imgIndex, img)}
                      >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <label className="font-bold text-xl text-violet-900">Room Images</label>

<input
  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
  file:rounded file:border-0 file:bg-blue-50 file:text-violet-900 hover:file:bg-violet-300"
  type="file"
  multiple
  onChange={(e) => handleFileRoomChange(e, index)}
/>
              {/* Ajout de nouvelles images */}
              {AccommodationData.roomTypes[index]?.RoomImages?.map((image, imgIndex) => (
  <div key={imgIndex} className="flex items-center gap-4 mt-2">
    <img
      src={URL.createObjectURL(image)}
      alt={`Room image ${imgIndex}`}
      className="w-32 h-32 object-cover rounded shadow"
    />
    <button
      type="button"
      className="text-red-600 underline font-bold hover:bg-red-100 px-2 py-1 rounded"
      onClick={() => removeImage(index, imgIndex)}
    >
      Remove
    </button>
  </div>
))}

              <h1 className="font-bold ">Room Beds</h1>
              {room.beds?.map((bed, bedIndex) => (
                <div className="grid grid-cols-3 gap-10" key={bedIndex}>
                
                 
                    <div><h1>Type</h1>
                    <select className="input" value={bed.typeBed}
                   
  onChange={(e) =>
    updateRoom(
      index,
      "beds",
      room.beds.map((b, index) =>
        index === bedIndex
          ? { ...b, typeBed: e.target.value }
          : b
      )
    )
  }>
                      <option value="">Select bed type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Queen">Queen</option>
                      <option value="King">King</option>
                      <option value="Sofa bed">Sofa bed</option>
                      <option value="Bunk bed">Bunk bed</option>
                    </select>{" "} </div>
                    <div> 
                     <h1>Number</h1>
                    <input className="input" type="number" value={bed.number}  
                    onChange={(e) =>
                        updateRoom(
                          index,
                          "beds",
                          room.beds.map((b, index) =>
                            index === bedIndex
                              ? { ...b, number: parseInt(e.target.value) }
                              : b
                          )
                        )
                      }/>
                    </div>
                  <div className="flex justify-center items-center">
                   <button onClick={()=>removeBed(index,bedIndex)} className="delete">
                   <FaTrash size={20}/></button>
                  </div>
                </div>
             
            ))} 
                  <div className="flex flex-col justify-start items-start">
                <button
                  type="button"
                  className="add"
                  onClick={() => addBed(index)} // Passer l'index de la chambre
                >
                  +Add Bed
                </button>
              </div>

              <h1 className="font-bold ">Room Pricing Seasons</h1>
              <div className="flex flex-col">
                {room.pricingByDate?.map((season, seasonIndex) => (
                  <div key={seasonIndex}>
                    <h1>Start Date</h1>
                    <input
                      className="input"
                      type="date"
                      value={formatDateForInput(season.StartDate)}
                        onChange={(e) => {
                            const updatedRooms = [...AccommodationData.roomTypes];
                            updatedRooms[index].pricingByDate[seasonIndex].StartDate =
                            e.target.value;
                            setAccommodationData({
                            ...AccommodationData,
                            roomTypes: updatedRooms,
                            });
                        }}
                    />
                    <h1>End Date</h1>
                    <input
                      className="input"
                      type="date"
                      value={formatDateForInput(season.EndDate)}
                      onChange={(e) => {
                        const updatedRooms = [...AccommodationData.roomTypes];
                        updatedRooms[index].pricingByDate[seasonIndex].EndDate =
                          e.target.value;
                        setAccommodationData({
                          ...AccommodationData,
                          roomTypes: updatedRooms,
                        });
                      }}
                    />
                    <h1>Price</h1>
                    <input
                      className="input"
                      type="number"
                      value={season.price}
                        onChange={(e) => {
                            const updatedRooms = [...AccommodationData.roomTypes];
                            updatedRooms[index].pricingByDate[seasonIndex].price =
                            e.target.value;
                            setAccommodationData({
                            ...AccommodationData,
                            roomTypes: updatedRooms,
                            });
                        }}
                    />
             
                    <h1>Available Rooms</h1>
                    <input
                      className="input"
                      type="number"
                      value={season.availableRooms}
                        onChange={(e) => {
                            const updatedRooms = [...AccommodationData.roomTypes];
                            updatedRooms[index].pricingByDate[seasonIndex].availableRooms =
                            e.target.value;
                            setAccommodationData({
                            ...AccommodationData,
                            roomTypes: updatedRooms,
                            });
                        }}
                    />
                  </div>
                ))}
                <div className="flex flex-col justify-start items-start mt-10">
                <button
                  type="button"
                  className="add"
                  onClick={() => addSeason(index)} // Passer l'index de la chambre
                >
                  +Add Season
                </button>
              </div>
              </div>
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => {
                  const updatedRooms = AccommodationData?.roomTypes.filter(
                    (_, i) => i !== index
                  );
                  setAccommodationData({
                    ...AccommodationData,
                    roomTypes: updatedRooms,
                  });
                }}
              >
                Remove Room
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-green-500 text-white px-3 py-1 mt-2 rounded-md"
          onClick={addRoom}

          
        >
          Add Room
        </button>
      </div>
       <div className="flex flex-col gap-5">
        <h1>Offer Data</h1>
        <input
          type="text"
          placeholder="Offer Name"
          className="input"
          value={offerData?.title || ""}
          onChange={(e) =>
            setOfferData({ ...offerData, title: e.target.value })
          }
        />
        <input
            type="text"
            placeholder="Offer Description"
            className="input"
            value={offerData?.description || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, description: e.target.value })
            }
        />
           <input
            type="number"
            placeholder="Max Occupancy"
            className="input"
            value={offerData?.maxOccupancy || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, maxOccupancy: e.target.value })
            }
        />
           <input
            type="text"
            placeholder="Cancellation Policy"
            className="input"
            value={offerData?.cancellationPolicy || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, cancellationPolicy: e.target.value })
            }
        />
     <input
            type="text"
            placeholder="Included Services"
            className="input"
            value={offerData?.includedServices?.join(",") || ""}
            onChange={(e) =>
    setOfferData({
      ...offerData,
      includedServices: e.target.value
        .split(",")
        .map((s) => s.trim()),
    })
  }
/>
       
        <input
            type="number"
            placeholder="Offer Discount"
            className="input"
            value={offerData?.discountPercentage || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, discountPercentage: e.target.value })
            }
        />
        <input
            type="date"
            placeholder="Offer Start Date"
            className="input"
            value={formatDateForInput(offerData?.validFrom) || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, validFrom: e.target.value })
            }
        />
        <input
            type="date"
            placeholder="Offer End Date"
            className="input"
            value={formatDateForInput(offerData?.validTo) || ""}
            onChange={(e) =>
                setOfferData({ ...offerData, validTo: e.target.value })
            }
        />

       </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Images</label>
        <div className="flex flex-wrap gap-4">
          {AccommodationData?.images?.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={`http://localhost:4000/acc/uploads/${img}`}
                alt={`Accommodation ${index}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                onClick={() => RemoveImageAcc(index,img)}
              >
                ✕
              </button>
            </div>
          ))}
          <input
  type="file"
  multiple
  onChange={handleFileChange}
  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
 file:rounded file:border-0 file:bg-blue-50 file:text-violet-900 hover:file:bg-violet-300"
/>

<label className="font-bold text-xl text-violet-900 mt-4">
  Add New Images
</label>

<div className="flex flex-wrap gap-4 mt-2">
  {Newimages?.map((image, imgIndex) => (
    <div key={imgIndex} className="relative">
      <img
        src={URL.createObjectURL(image)}
        alt={`new-img-${imgIndex}`}
        className="w-32 h-32 object-cover rounded shadow"
      />
      <button
        type="button"
        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
        onClick={() => removeImageacc(imgIndex)}
      >
        ✕
      </button>
    </div>
  ))}
  </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-violet-900 text-white text-xl font-bold py-3 rounded-lg"
      >
        Update Accommodation
      </button>
    </form>
  );
};

export default EditAcc;
