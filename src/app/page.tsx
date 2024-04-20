import Image from "next/image";
import Hero from '../components/(home)/Hero';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import About from "@/components/(home)/About";
import Services from "@/components/(home)/Services";
import LastWorks from "@/components/(home)/LastWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <LastWorks />
    </>
  );
}
