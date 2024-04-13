import Image from "next/image";
import Hero from '../components/Hero';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
