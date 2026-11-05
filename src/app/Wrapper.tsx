import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const isFestive = true; // Replace with your actual condition to check for festive season

  return (
    <div>
      {isFestive ? null : <Navbar />}
      {children}
      {isFestive ? null : <Footer />}
    </div>
  );
}
