import { Carousel } from "../ui/carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Alpine Escape – Switzerland",
      button: "Explore Packs",
      src: "https://images.unsplash.com/photo-1742992682920-c3b80c6e9094?q=80&w=1254&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Breathe in fresh mountain air and unwind in luxury lodges.",
    },
    {
      title: "Parisian Weekend – France",
      button: "Explore Packs",
      src: "https://plus.unsplash.com/premium_photo-1717422935480-6a66474b88a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Wander through charming streets and iconic landmarks.",
    },
    {
      title: "Neon Dreams – Tokyo, Japan",
      button: "Explore Packs",
      src: "https://images.unsplash.com/photo-1607419726991-5fc7e74cda67?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Dive into futuristic vibes and timeless traditions.",
    },
    {
      title: "Desert Serenity – Morocco",
      button: "Explore Packs",
      src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Experience golden dunes and star-lit silence.",
    },
  ];
  
  
    return (
      <div className="flex items-center justify-center">
      <div className="relative overflow-hidden w-full h-full px-20  ">
       <h1 className="relative my-20 text-3xl md:text-6xl font-bold px-20 text-white flex items-center justify-start"><span className="text-violet900">Top</span> destinations</h1>
       
        <Carousel slides={slideData} />
      </div>
      </div>
    );
  }