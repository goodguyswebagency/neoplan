import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function initLenis() {
   if (lenisInstance) return lenisInstance;

   const lenis = new Lenis({
      lerp: 0.12,
   });

   history.scrollRestoration = "manual";

   lenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => lenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);

   lenisInstance = lenis;
   return lenisInstance;
}

export function getLenis() {
   if (!lenisInstance) {
      throw new Error("Lenis has not been initialized.");
   }
   return lenisInstance;
}

export function startLenis() {
   lenisInstance?.start();
}

export function stopLenis() {
   lenisInstance?.stop();
}
