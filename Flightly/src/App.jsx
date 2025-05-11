import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hotels from "./pages/Hotels";
import Loader from "./ui/Loader";
import Flights from "./pages/Flights";
import Contact from "./pages/Contact";
import About from "./pages/About";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HotelDetails from "./pages/HotelInfo";
import Resorts from "./pages/Resorts";
import Reservation from "./pages/Reservation";
import ReservationFlight from "./pages/ReservationFlight";
import MyReservations from "./pages/MyReservations";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./components/ProfilePage";
import VerifyPage from "./pages/verifyPage";
function App() {
  const location = useLocation();
  const AppRef=useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const hideFooterRoutes = ["/login", "/signup"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  useGSAP(()=>{
    gsap.fromTo(
      AppRef.current,
      {opacity:0},
      {opacity:1, duration:1.5}
    )
  },[]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="min-h-screen flex flex-col">
  <main className="flex-grow">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/resorts" element={<Resorts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/info" element={<HotelDetails />} />
        <Route path="/reservation" element={<ProtectedRoute><Reservation/></ProtectedRoute>} />
        <Route path="/reservflight" element={<ProtectedRoute><ReservationFlight /></ProtectedRoute>} />
        <Route path="/my" element={<ProtectedRoute><MyReservations /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute>} />
      </Routes>
     
    </main> {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;