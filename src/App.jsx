import { useState } from "react";
import { Sprite } from "./components/Icon.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Why from "./components/Why.jsx";
import Features from "./components/Features.jsx";
import Controls from "./components/Controls.jsx";
import FlightSchool from "./components/FlightSchool.jsx";
import Missions from "./components/Missions.jsx";
import Drones from "./components/Drones.jsx";
import Gallery from "./components/Gallery.jsx";
import Checklist from "./components/Checklist.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";
import { usePlatform, useReveal } from "./hooks.js";

/* Sections in page order; numbers in each component match the reference designs (01 Hero … 10 Footer) */
export default function App() {
  const platform = usePlatform();
  const [missionMap, setMissionMap] = useState("all");
  useReveal();

  return (
    <>
      <Sprite />
      <Nav />
      <Hero platform={platform} onPickMap={setMissionMap} />
      <Why />
      <Features />
      <Controls />
      <FlightSchool />
      <Missions map={missionMap} onPickMap={setMissionMap} />
      <Drones />
      <Gallery />
      <Checklist />
      <Faq />
      <Footer />
    </>
  );
}
