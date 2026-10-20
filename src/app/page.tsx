import HeroSection from "@/components/home/HeroSection";
import HomeCoreSections from "@/components/home/HomeCoreSections";
import HomeCorporateSections from "@/components/home/HomeCorporateSections";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeCoreSections />
      <HomeCorporateSections />
    </>
  );
}
