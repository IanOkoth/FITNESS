import { waLink } from "../lib/data";

export default function WhatsAppFloat() {
  const defaultMsg = "Hi, I'd like to know more about training with you.";

  return (
    <a
      className="wa"
      id="waFloat"
      href={waLink(defaultMsg)}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.200 8.200 0 1 1 12 20.200z" />
        <path d="M16.600 14.200c-.2-.1-1.400-.7-1.600-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.2-.4.7-1.300.1-.2 0-.3 0-.4l-.7-1.700c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.200s.9 2.500 1 2.700c.1.200 1.800 2.800 4.500 3.900 1.700.7 2.300.8 3.200.6.500-.1 1.400-.6 1.600-1.200.2-.6.2-1.100.1-1.200-.1-.1-.2-.2-.5-.3z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
