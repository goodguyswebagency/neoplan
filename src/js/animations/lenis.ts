import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis() {
   if (lenis) return lenis;

   const createdLenis = new Lenis({
      lerp: 0.12,
   });

   lenis = createdLenis;

   history.scrollRestoration = "manual";

   createdLenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => createdLenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);

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
