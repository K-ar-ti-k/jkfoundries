'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '917895679965';
  const message = 'Hello JK Foundry,\n\nI am interested in your metal casting services. Could you please provide more information about:\n\n1. Available casting capabilities\n2. Material options\n3. Lead times\n4. Pricing details\n\nThank you!';

  const handleClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 cursor-pointer"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </button>
  );
};

export default WhatsAppButton; 