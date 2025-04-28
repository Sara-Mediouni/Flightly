import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Feedbacks from "../components/feedbacks";
import { CarouselDemo } from "../components/Card";
import Story from "../components/Story";
import Footer from "../components/Footer";
import Section from "../components/Section";
import FeaturesSection from "../components/FeaturesSections";
import TopTours from "../components/Tours";
import Dream from "../components/Dream";
import Japan from "../components/Japan";
import DestinationCard from "../components/DestinationCard";
import AdvantagesSection from "../components/Avantages";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
        
     
      <FeaturesSection />
      <Section />
      <CarouselDemo />
     
      <Dream/> <AdvantagesSection/>
      <Feedbacks />

      <Story />
 
    </div>
  );
};

export default Home;
