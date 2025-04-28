import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ProfilePage = () => {
    const token=useSelector((state)=>state.auth.token);
   const user=useSelector((state=>state.auth.user));
    const hiddenFields = ["id", "createdAt", "updatedAt"]; // Ajoute les champs à cacher ici

  const [form, setForm] = useState(null);
 
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getUser = async () => {
     axios.get(`http://localhost:4000/api/user/getuser/${user}`)
         .then((response) => {
                console.log(response.data);
                setForm(response.data.user);
                console.log("Infos de l'utilisateur :", response.data.user);
            })
         .catch((error) => {
                console.log(error);
            });
    };        
  const handleUpdate = () => {
    axios.put(`http://localhost:4000/api/user/updateuser/${user}`,
        form
    )
    // Appelle ici une API si besoin
    toast.success("Profil mis à jour !");
    setIsEditing(false);
  };
  useEffect(() => {
    if (token) 
    getUser();

  }
, [token]);
  return (
    <div className="flex justify-center mt-50 my-10">
      <ToastContainer />
      <div className="bg-violet-300 rounded-2xl p-6 shadow-xl w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <FaUserCircle size={100} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-6">
            {form?.firstname} {form?.lastname}
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {form && Object.entries(form).map(([key, value]) => (
            key !== "_id"  && (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={key === "dateOfBirth" ? "date" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-violet900 focus:ring-violet900 rounded-lg focus:outline-none"
                 
              />
            </div>)
          ))}

          <div className="col-span-2 mt-6 text-center">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-violet900 text-white px-6 py-2 rounded-lg font-bold hover:bg-violet700 transition"
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Enregistrer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
