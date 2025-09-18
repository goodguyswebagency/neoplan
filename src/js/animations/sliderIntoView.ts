import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function sliderIntoView() {
   const swipers = document.querySelectorAll("[data-slider-animation]");

   swipers.forEach((swiper) => {
      const slides = swiper.querySelectorAll(".swiper-slide");

      gsap.from(slides, {
         yPercent: 15,
         opacity: 0,
         duration: 1.5,
         stagger: 0.075,
         ease: "power3.out",
         scrollTrigger: {
            trigger: swiper,
            start: "top 85%",
            end: "bottom top",
         },
      });
   });
}
