import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis() {
   if (lenis) return lenis;

   const createdLenis = new Lenis({
      lerp: 0.12,
      syncTouch: true,
   });

   lenis = createdLenis;

   createdLenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => createdLenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);

   document.querySelectorAll("[data-lenis-stop]").forEach((el) => {
      el.addEventListener("click", () => {
         createdLenis.stop();
      });
   });

   document.querySelectorAll("[data-lenis-start]").forEach((el) => {
      el.addEventListener("click", () => {
         createdLenis.start();
      });
   });

   return createdLenis;
}

export function getLenis() {
   if (!lenis) {
      throw new Error("Lenis has not been initialized.");
   }
   return lenis;
}

export function startLenis() {
   lenis?.start();
}

export function stopLenis() {
   lenis?.stop();
}
