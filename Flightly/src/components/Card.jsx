import { Carousel } from "../ui/carousel";

export function CarouselDemo() {
    const slideData = [
      {
        title: "Mystic Mountains",
        button: "Explore Packs",
        src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Urban Dreams",
        button: "Explore Packs",
        src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Neon Nights",
        button: "Explore Packs",
        src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Desert Whispers",
        button: "Explore Packs",
        src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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