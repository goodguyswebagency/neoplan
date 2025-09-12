import "../css/index.css";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import footerCode from "./components/footer";
import { navigationScroll } from "./components/navigation";

gsap.registerPlugin(ScrollTrigger);

/***********************/
/* Lenis smooth scroll */
/***********************/

function initLenis() {
   const lenis = new Lenis({
      lerp: 0.12,
   });
   lenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((t) => lenis.raf(t * 1000));
   gsap.ticker.lagSmoothing(0);
}

document.addEventListener("DOMContentLoaded", () => {
   navigationScroll();
   footerCode();
   initLenis();
});
