import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import { countUp } from "../pages/home";

gsap.registerPlugin(CustomEase);

CustomEase.create("easeMain", "0.625,0.05,0,1");

/***********************/
/* Hero load animation */
/***********************/

export function heroLoad() {
   const heading = document.querySelector(".hero_heading");
   const paragraph = document.querySelector(".hero_paragraph");
   const ctaWrapper = document.querySelector(".hero_cta-wrapper");
   const videoWrapper = document.querySelector(".hero_video_wrapper");

   const tl = gsap.timeline();

   // Animate main content
   tl.from([heading, paragraph, ctaWrapper], {
      y: 25,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
   }).from(
      videoWrapper,
      {
         clipPath: "inset(50% 50% 50% 50%)",
         opacity: 0,
         duration: 1.5,
         ease: "easeMain",
      },
      ">-0.5",
   );
}

/***************************/
/* Hero counting animation */
/***************************/

export function heroCount() {
   const usps = document.querySelectorAll(".hero_usp_item");

   usps.forEach((usp) => {
      const numberSpan = usp.querySelector<HTMLElement>(".hero_usp_text-span");
      if (!numberSpan) return;

      const originalValue = numberSpan.textContent || "0";
      const numberValue = parseInt(originalValue, 10);
      numberSpan.textContent = "0";

      countUp(numberSpan, numberValue, 1000);
   });
}
