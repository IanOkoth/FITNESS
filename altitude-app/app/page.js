import Header from "./components/Header";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import Programs from "./components/Programs";
import Builder from "./components/Builder";
import Videos from "./components/Videos";
import HowItWorks from "./components/HowItWorks";
import Stories from "./components/Stories";
import Shop from "./components/Shop";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CartDrawer from "./components/CartDrawer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <div className="proof">
          <div className="wrap">
            <p>
              Training clients in Kenya, Germany, France, Canada, the UK, the
              UAE and Australia
            </p>
          </div>
        </div>
        <Vision />
        <Programs />
        <Builder />
        <Videos />
        <HowItWorks />
        <Stories />
        <Shop />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
    </>
  );
}
