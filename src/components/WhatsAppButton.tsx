import { whatsappLink } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander sur WhatsApp"
      className="pulse group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,.5)] transition-transform duration-500 [transition-timing-function:var(--ease)] hover:scale-110 hover:-rotate-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
        <path d="M9 8.5c.4 2.2 2.3 4.6 5.5 5.7l1.4-1.4 1.9.9-.5 1.6c-3.2.5-8.1-3.2-8.3-7z" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
