export default function DestinationCard({ image, title, description }) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div
          className="w-full md:w-1/2 h-[300px] rounded-3xl bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition">
            Discover More
          </button>
        </div>
      </div>
    );
  }
  