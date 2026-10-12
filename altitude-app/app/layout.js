import "./globals.css";
import { CartProvider } from "./components/CartProvider";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Voltage Fitness | Personal Training from Kenya",
  description:
    "Personal training from the Kenyan highlands, built around your goals, your schedule and your life, wherever you are. Strength, fat loss, running, mobility — online or in person.",
  openGraph: {
    title: "Voltage Fitness | Personal Training from Kenya",
    description:
      "Personal training from the Kenyan highlands, built around your goals, your schedule and your life, wherever you are.",
    images: [{ url: "/logo.jpeg", width: 1129, height: 489, alt: "Voltage Fitness" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
