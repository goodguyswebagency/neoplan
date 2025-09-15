import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("easeMainReverse", "0.55, 0.02, 0.10, 1");

export default function sliderIntoViewSmooth() {
   const swipers = document.querySelectorAll("[data-slider-animation-smooth]");

   swipers.forEach((swiper) => {
      const slides = swiper.querySelectorAll(".swiper-slide");

      gsap.from(slides, {
         yPercent: 65,
         opacity: 0,
         duration: 1.5,
         stagger: 0.15,
         ease: "easeMainReverse",
         scrollTrigger: {
            trigger: swiper,
            start: "top 85%",
            end: "bottom top",
         },
      });
   });
}
