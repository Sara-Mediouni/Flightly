import { FaLock, FaHeadset, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: <FaLock className="text-3xl text-violet900" />,
      title: 'Secure reservations',
      description: 'Your payments are protected with our secure system.',
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-violet900" />,
      title: 'Best prices guaranteed',
      description: 'Take advantage of exclusive offers with the best value for money.',
    },
    {
      icon: <FaHeadset className="text-3xl text-violet900" />,
      title: '24h/24 Assistance',
      description: 'Our team is there for you anytime, even while you travel.',
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl text-violet900" />,
      title: 'Certified guides',
      description: 'Travel with complete peace of mind with our experienced guides.',
    },
  ];

  return (
    <section className="py-16 px-4 mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-20 text-white">Our Advantages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4 flex justify-center">{adv.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{adv.title}</h3>
              <p className="text-gray-600 text-sm">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
