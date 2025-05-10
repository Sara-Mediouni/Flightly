import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const [form,setForm] =useState ({
    email: "",
    password: "",
  }); 
  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  
  };
  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (token) {
      navigate("/food"); 
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
   
      await axios.post("http://localhost:4000/user/admin/LoginAdmin", form)
      .then((response)=>{
        console.log(response.data)
        localStorage.setItem("admin",response.data.admin)
        navigate("/flights")
      })
      .catch((err)=>{
        setError(err.response.data.message)
      })
     
    
  };
 

  return (
    <div className="login-form">
   
      <h2 className="text-2xl font-bold text-[#1f1f2e] mb-4 text-center">
        Welcome back
      </h2>

     
      <form className="flex flex-col gap-10 w-full px-10" 
       onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={form?.email}
          className="input-style"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form?.password}
          onChange={handleChange}
          className="input-style"
        />

        <button type="submit" className="button-login">
          Login
        </button>
      </form>

      
      {error && (
        <div
          data-testid="error"
          className="mt-4 p-3 text-violet-700 bg-violet-100 rounded-lg text-center"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
