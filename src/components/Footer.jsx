import { Icon } from "./Icon.jsx";

/* links point at the Pluto Drones store site, which owns these pages */
const SITE = "https://www.plutodrones.com";

const COLUMNS = [
  ["Products", [["/store#drone-kits", "Drone Kits"], ["/store/spares", "Spares"], ["/store/accessories", "Accessories"], ["/store#merchandise", "Merchandise"]]],
  ["Company", [["/about", "About Us"], ["/contact", "Contact Us"]]],
  ["Resources", [["/blogs", "Blogs"], ["/hardware", "Hardware"], ["/software", "Softwares"], ["/news", "News"]]],
  ["Download App", [["https://apps.apple.com/in/app/pluto-controller/id1173323776", "iOS"], ["https://play.google.com/store/apps/details?id=com.drona.controller", "Android"]]],
];

const SOCIAL = [
  ["i-ig", "Instagram", "https://www.instagram.com/plutodrones"],
  ["i-in", "LinkedIn", "https://www.linkedin.com/company/drona-aviation-pvt-ltd-/"],
  ["i-x", "X", "https://x.com/dronaaviation"],
  ["i-fb", "Facebook", "https://www.facebook.com/plutodrones"],
  ["i-yt", "YouTube", "https://www.youtube.com/dronaaviation"],
  ["i-gh", "GitHub", "https://github.com/DronaAviation"],
];

const POLICIES = [
  ["/shipping-policy", "Shipping Policy"],
  ["/return-and-refund-policy", "Return and Refund Policy"],
  ["/terms-and-conditions", "Terms and Conditions"],
  ["/privacy-policy", "Privacy Policy"],
];

const ext = (href) => (href.startsWith("http") ? href : SITE + href);

/* 10 · Footer: contact block and socials, four link columns, then copyright, policies and back-to-top */
export default function Footer() {
  return (
    <footer>
      <div className="foot-wrap">
        <div className="foot">
          <div className="foot-contact">
            <a className="foot-logo" href="#top" aria-label="PlutoSim, back to top"><img src="/assets/brand/logo.svg" alt="" /></a>
            <h4>Contact Us</h4>
            <a className="foot-line" href="tel:+917066011808"><i><Icon id="i-phone" /></i>+91 70660 11808</a>
            <a className="foot-line" href="mailto:support@plutodrones.com"><i><Icon id="i-mail" /></i>support@plutodrones.com</a>
            <div className="socials">
              {SOCIAL.map(([icon, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon id={icon} /></a>
              ))}
            </div>
          </div>
          <div className="foot-cols">
            {COLUMNS.map(([title, links]) => (
              <nav key={title} className="foot-col" aria-label={title}>
                <h4>{title}</h4>
                {links.map(([href, label]) => <a key={label} href={ext(href)} target="_blank" rel="noopener noreferrer">{label}</a>)}
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="foot-wrap legal-row">
          <span>Copyright © {new Date().getFullYear()} Drona Aviation | All Rights Reserved</span>
          <nav className="policies" aria-label="Policies">
            {POLICIES.map(([href, label]) => <a key={label} href={ext(href)} target="_blank" rel="noopener noreferrer">{label}</a>)}
          </nav>
          <a href="#top" className="to-top" aria-label="Back to top"><Icon id="i-up" /></a>
        </div>
      </div>
    </footer>
  );
}
