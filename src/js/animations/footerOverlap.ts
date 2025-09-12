import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function footerOverlap() {
   const footer = document.querySelector("footer");
   const footerWrapper = document.querySelector(".footer_animation-wrapper");

   if (!footer || !footerWrapper) return;

   gsap.from(footer, {
      yPercent: -50,
      scrollTrigger: {
         trigger: footerWrapper,
         start: "top 85%",
         end: "bottom bottom",
         scrub: true,
      },
   });
}
