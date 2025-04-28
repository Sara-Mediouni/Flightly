import DestinationCard from './DestinationCard';

const destinations = [
  {
    image: '/images/japan.jpg',
    title: 'Japan in Spring',
    description: 'Experience cherry blossoms and Kyoto’s ancient beauty.',
  },
  {
    image: '/images/maldives.jpg',
    title: 'Maldives',
    description: 'Relax in turquoise waters and white sand beaches.',
  },
  {
    image: '/images/morocco.jpg',
    title: 'Morocco',
    description: 'Explore colorful souks and desert adventures.',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 md:px-24 bg-[#f8f9fa]">
      <div className="flex flex-col gap-20">
        {destinations.map((dest, i) => (
          <DestinationCard key={i} {...dest} />
        ))}
      </div>
    </section>
  );
}
