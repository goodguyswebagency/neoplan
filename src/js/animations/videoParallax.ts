import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function videoParallax() {
   const videoEl = document.querySelector("[data-video-parallax]");
   if (!videoEl) {
      console.error("No video found");
      return;
   }

   gsap.from(videoEl, {
      clipPath: "inset(15% round 0.25rem)",
      scrollTrigger: {
         trigger: videoEl,
         start: "top bottom",
         end: "top 30%",
         scrub: true,
      },
   });
}
