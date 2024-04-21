import Hero from '../components/home/Hero';
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import LastWorks from "@/components/home/LastWorks";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <div className='home-bg'>
        <About />
        <Services />
        <LastWorks />
        <Newsletter />
      </div>
    </>
  );
}
