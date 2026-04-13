import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/59899123456?text=Hola!%20Quiero%20info%20sobre%20InvertíUY"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    aria-label="Contactar por WhatsApp"
  >
    <MessageCircle size={24} />
  </a>
);

export default WhatsAppButton;
