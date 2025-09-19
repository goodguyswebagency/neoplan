import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase);

CustomEase.create("easeMain", "0.625,0.05,0,1");
CustomEase.create("easeMainReverse", "0.55, 0.02, 0.10, 1");

gsap.registerPlugin(ScrollTrigger, SplitText);

/****************************/
/* Intro section animations */
/****************************/

export function introAnimations() {
   const number = document.querySelector("[data-intro-number]");
   const heading = document.querySelector("[data-intro-heading]");
   const subheading = document.querySelector("[data-intro-subheading]");
   const line = document.querySelector("[data-intro-line]");
   const paragraph = document.querySelector("[data-intro-paragraph]");
   const headingSpans = document.querySelectorAll(".intro_heading-span");

   const splitHeading = new SplitText(heading, { type: "lines" });
   const splitSubheading = new SplitText(subheading, { type: "lines" });
   const splitParagraph = new SplitText(paragraph, { type: "lines" });

   // Remove accessibility attributes added by SplitText that cause Lighthouse warnings
   [heading, subheading, paragraph].forEach((el) => {
      if (!el) return;
      // SplitText may set aria-label on the source element
      el.removeAttribute("aria-label");
      // And it may mark split nodes as aria-hidden; allow SRs to read the visible text
      el.querySelectorAll('[aria-hidden="true"]').forEach((n) =>
         n.removeAttribute("aria-hidden"),
      );
   });

   // Wrap each line in a div with overflow: hidden
   [
      ...splitHeading.lines,
      ...splitSubheading.lines,
      ...splitParagraph.lines,
   ].forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: number,
         start: "top 85%",
         end: "bottom top",
      },
   });

   tl.from(number, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
   })
      .to(
         headingSpans,
         {
            backgroundPosition: "0% 0",
            duration: 1,
            ease: "easeMain",
         },
         "<",
      )
      .from(
         [...splitHeading.lines, ...splitSubheading.lines],
         {
            yPercent: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
         },
         "<",
      )
      .from(
         line,
         {
            width: "0%",
            duration: 0.8,
            ease: "easeMainReverse",
         },
         ">-0.3",
      )
      .from([...splitParagraph.lines], {
         yPercent: 50,
         opacity: 0,
         duration: 1,
         ease: "power3.out",
      });
}
