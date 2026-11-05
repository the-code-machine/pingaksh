'use client";';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div>
      {router.pathname === "/festive/diwali" ? null : <Navbar />}
      {children}
      {router.pathname === "/festive/diwali" ? null : <Footer />}
    </div>
  );
}
