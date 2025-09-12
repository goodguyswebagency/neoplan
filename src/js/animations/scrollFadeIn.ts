import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function scrollFadeIn() {
   const elements = document.querySelectorAll("[data-scroll-into-view]");

   elements.forEach((element) => {
      gsap.from(element, {
         y: 25,
         opacity: 0,
         duration: 1,
         ease: "power3.out",
         scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom top",
         },
      });
   });
}
