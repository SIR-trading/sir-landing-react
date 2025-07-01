"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once:    false,
      offset:  100,
    });

    const onLoad = () => {
      AOS.refreshHard();  // recalculates offsets for **all** elements
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
