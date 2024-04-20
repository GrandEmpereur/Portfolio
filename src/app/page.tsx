import Image from "next/image";
import Hero from '../components/Hero';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import About from "@/components/About";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  );
}
