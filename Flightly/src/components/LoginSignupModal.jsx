import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Swal from 'sweetalert2'

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const LoginSignupModal = ({ onClose }) => {
  const navigate = useNavigate();
  const countries = useSelector((state) => state.country.countries);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const showLoginPopup = useSelector((state) => state.ui.showLoginPopup);
  const [showLogin, setshowLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    dateOfBirth: "",
  });
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // or setError('') if you prefer
      }, 3000); // 3000ms = 3 seconds
  
      return () => clearTimeout(timer); // Clean up the timer if component unmounts
    }
  }, [error]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleLogin = () => {
    const endpoint = showLogin ? "login" : "register";
    console.log(endpoint);
    axios
      .post(`http://localhost:4000/user/user/${endpoint}`, form)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
          Swal.fire({
            title: response.data.message,
            icon: "success",
            
          });
          dispatch(setToken(response.data.token));
          dispatch(setUser(jwtDecode(response.data.token).id));
          onClose()
        
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!showLoginPopup && form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const {
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      phone,
      address,
      city,
      country,
    } = form;
    console.log(showLogin ? "Connexion" : "Inscription", {
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      phone,
      address,
      city,
      country,
    });
    handleLogin();
    // Ici, tu peux dispatch un login/signup
  };
  const handleChangeLogin = () => {
    setshowLogin(!showLogin);
  };
  return (
    <div className="fixed font-bold inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50">
      <div className="bg-violet-300 rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
        >
          <IoCloseSharp />
        </button>

        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 font-semibold ${
              showLogin ? "border-b-2 border-violet900" : "text-gray-500"
            }`}
            onClick={() => handleChangeLogin("Login")}
          >
            Se connecter
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              !showLogin ? "border-b-2 border-violet900" : "text-gray-500"
            }`}
            onClick={() => handleChangeLogin("Signup")}
          >
            S'inscrire
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!showLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Firstname</label>
                  <input
                    type="text"
                    name="firstname"
                    required
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Lastname</label>
                  <input
                    type="text"
                    name="lastname"
                    required
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
            />
          </div>

          {!showLogin && (
            <>
              <div>
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <select
                    type="text"
                    name="country"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>{" "}
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet900"
                  />
                </div>
              </div>
            </>
          )}
          {error && (
            <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-lg text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-violet900 text-white py-2 rounded-lg hover:bg-violet-300 transition"
          >
            {showLoginPopup ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupModal;
