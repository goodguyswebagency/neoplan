import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import lottie from "lottie-web";

gsap.registerPlugin(CustomEase);

CustomEase.create("easeMain", "0.625,0.05,0,1");

/*************************/
/* Page load with Lottie */
/*************************/
function pageLoad(): Promise<void> {
   return new Promise<void>((resolve, reject) => {
      const loadWrapper = document.querySelector<HTMLElement>(
         ".g_page-load_wrapper",
      );
      const lottieContainer = document.querySelector<HTMLElement>(
         ".g_page-load_lottie",
      );

      if (!loadWrapper || !lottieContainer) {
         // If missing, just resolve so the site can proceed
         resolve();
         return;
      }

      const jsonSrc = lottieContainer.getAttribute("data-src") || "";
      if (!jsonSrc) {
         resolve();
         return;
      }

      const anim = lottie.loadAnimation({
         container: lottieContainer,
         renderer: "svg",
         loop: false,
         autoplay: false,
         path: jsonSrc,
      });

      const startPlayback = () => {
         gsap.delayedCall(0.5, () => {
            anim.play();
         });
      };

      let domLoaded = false;
      anim.addEventListener("DOMLoaded", () => {
         domLoaded = true;
         startPlayback();
      });

      // Fallback if DOMLoaded fires before listener or is skipped
      requestAnimationFrame(() => {
         if (!domLoaded) startPlayback();
      });

      anim.addEventListener("complete", () => {
         loadWrapper.classList.add("is-closed");
         gsap.delayedCall(0.5, () => {
            (loadWrapper as HTMLElement).style.display = "none";
            resolve();
         });
      });
   });
}

/***********************/
/* Hero load animation */
/***********************/

function heroLoad() {
   const heading = document.querySelector(".hero_heading");
   const paragraph = document.querySelector(".hero_paragraph");
   const ctaWrapper = document.querySelector(".hero_cta-wrapper");
   const videoWrapper = document.querySelector(".hero_video_wrapper");

   const tl = gsap.timeline();

   // Animate main content
   tl.to([heading, paragraph, ctaWrapper], {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
   }).to(
      videoWrapper,
      {
         clipPath: "inset(0% 0% 0% 0%)",
         opacity: 1,
         duration: 1.5,
         ease: "easeMain",
      },
      ">-0.5",
   );
}

/***************************/
/* Hero counting animation */
/***************************/

// function countUp(
//    element: HTMLElement,
//    targetValue: number,
//    duration: number = 1000,
// ) {
//    element.textContent = "0";
//    let startTime: number | null = null;
//    const startValue = 0;

//    function updateCounter(timestamp: number) {
//       if (startTime === null) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       element.textContent = Math.floor(
//          startValue + progress * (targetValue - startValue),
//       ).toString();

//       if (progress < 1) {
//          requestAnimationFrame(updateCounter);
//       }
//    }

//    requestAnimationFrame(updateCounter);
// }

// function heroCount() {
//    const usps = document.querySelectorAll(".hero_usp_item");

//    usps.forEach((usp) => {
//       const numberSpan = usp.querySelector<HTMLElement>(".hero_usp_text-span");
//       if (!numberSpan) return;

//       const targetAttr = numberSpan.getAttribute("data-target");
//       const targetStr = targetAttr ?? (numberSpan.textContent || "0");
//       const numberValue = parseInt(targetStr, 10);

//       countUp(numberSpan, numberValue, 1000);
//    });
// }

/*******************************/
/* Hero combined init function */
/*******************************/

export function initHeroAnimations() {
   const heading = document.querySelector(".hero_heading");
   const paragraph = document.querySelector(".hero_paragraph");
   const ctaWrapper = document.querySelector(".hero_cta-wrapper");
   const videoWrapper = document.querySelector(".hero_video_wrapper");

   // Prevent flash: set initial hidden state before starting loader
   gsap.set([heading, paragraph, ctaWrapper], { opacity: 0, y: 25 });
   gsap.set(videoWrapper, { opacity: 0, clipPath: "inset(50% 50% 50% 50%)" });

   // Pre-set counters: store final value and show 0 to avoid pre-flash
   const counterSpans = document.querySelectorAll<HTMLElement>(
      ".hero_usp_text-span",
   );
   counterSpans.forEach((el) => {
      const finalVal = parseInt(el.textContent || "0", 10);
      el.setAttribute("data-target", String(finalVal));
      el.textContent = "0";
   });

   pageLoad()
      .then(() => {
         heroLoad();
         // heroCount();
      })
      .catch(() => {
         // If something goes wrong, run hero animations immediately
         heroLoad();
         // heroCount();
      });
}
