import React, { useEffect } from "react";
import { Hero } from "../components/Hero";
import OurServices from "../components/OurServices";
import { useLoaderData } from "react-router";
import { Tips } from "../components/Tips";
import AOS from "aos";
import { Vet } from "../components/Vet";

export const Home = () => {
  const servicedata = useLoaderData();

  useEffect(() => {
    AOS.init({
      duration: 800, // global animation duration (ms)
      once: true, // whether animation should happen only once - while scrolling down
      offset: 120, // offset (in px) from the original trigger point
      easing: "ease-out-cubic",
    });

    // If you dynamically add content later, call AOS.refresh() or AOS.refreshHard()
    // return () => {}; // no cleanup required
  }, []);

  return (
    <>
      <Hero></Hero>
      <OurServices servicedata={servicedata}></OurServices>
      <Tips></Tips>
      <Vet></Vet>
    </>
  );
};
