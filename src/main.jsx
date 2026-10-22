import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections/nav.css";
import "./styles/sections/hero.css";
import "./styles/sections/why.css";
import "./styles/sections/features.css";
import "./styles/sections/controls.css";
import "./styles/sections/school.css";
import "./styles/sections/missions.css";
import "./styles/sections/drones.css";
import "./styles/sections/faq.css";
import "./styles/sections/footer.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
