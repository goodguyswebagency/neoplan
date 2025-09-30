import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function imageParallax() {
   if (window.innerWidth > 991) {
      const el = document.querySelector("[data-image-parallax]");
      if (!el) {
         console.error("No video found");
         return;
      }

      gsap.fromTo(
         el,
         {
            clipPath: "inset(15% round 0.25rem)",
         },
         {
            clipPath: "inset(0% round 0.25rem)",
            scrollTrigger: {
               trigger: el,
               start: "top bottom",
               end: "top 30%",
               scrub: true,
            },
         },
      );
   }
}
