import React from "react";
import Hero from "../components/Hero";
import Feedbacks from "../components/feedbacks";
import { CarouselDemo } from "../components/Card";
import Story from "../components/Story";
import Section from "../components/Section";
import FeaturesSection from "../components/FeaturesSections";

import Dream from "../components/Dream";
import AdvantagesSection from "../components/Avantages";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
        
     
      <FeaturesSection />
      <Section />
      <CarouselDemo />
     
      <Dream/> 
        
      <AdvantagesSection/>
      <Feedbacks />

      <Story />
 
    </div>
  );
};

export default Home;
