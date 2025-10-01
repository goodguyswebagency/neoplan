import "../../css/pages/home.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

import footerOverlap from "../animations/footerOverlap";
import { initHeroAnimations } from "../animations/heroAnimations";
import imageParallax from "../animations/imageParallax";
import { introAnimations } from "../animations/introAnimations";
import scrollFadeIn from "../animations/scrollFadeIn";
import sliderIntoView from "../animations/sliderIntoView";
import sliderIntoViewSmooth from "../animations/sliderIntoViewSmooth";
import { bookPopupHome } from "../components/bookPopup";
import { categorySlider } from "../components/categorySlider";

/********************/
/* Hero video popup */
/********************/

function heroVideo() {
   const button = document.querySelector<HTMLElement>(".hero_video_wrapper");
   const dialog = document.querySelector<HTMLDialogElement>(
      ".hero_dialog_wrapper",
   );
   const closeDialogButton = document.querySelector<HTMLElement>(
      ".hero_dialog_button",
   );
   const nav = document.querySelector<HTMLElement>(".navigation");

   if (!button || !dialog || !closeDialogButton || !nav) return;

   const video = dialog.querySelector<HTMLVideoElement>("video");
   if (!video) return;

   const startPlayback = () => {
      video.playsInline = true as unknown as boolean;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
   };

   const stopPlayback = () => {
      video.pause();
   };

   button.addEventListener("click", () => {
      dialog.showModal();
      startPlayback();
      nav.style.opacity = "0";
   });

   closeDialogButton.addEventListener("click", () => {
      dialog.close();
      stopPlayback();
      nav.style.opacity = "";
   });

   dialog.addEventListener("cancel", () => {
      stopPlayback();
      nav.style.opacity = "";
   });
   dialog.addEventListener("close", () => {
      stopPlayback();
      nav.style.opacity = "";
   });
   dialog.addEventListener("click", (ev) => {
      if (ev.target === dialog) {
         dialog.close();
      }
   });
}

/*********************************/
/* Helper for counting up from 0 */
/*********************************/

export function countUp(
   element: HTMLElement,
   targetValue: number,
   duration: number = 1000,
) {
   let startTime: number | null = null;
   const startValue: number = 0;

   function updateCounter(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(
         startValue + progress * (targetValue - startValue),
      ).toString();

      if (progress < 1) {
         requestAnimationFrame(updateCounter);
      }
   }

   requestAnimationFrame(updateCounter);
}

/****************************/
/* Bento counting animation */
/****************************/

function bentoCountGSAP() {
   const selectors = [
      ".bento_grid-1_number",
      ".bento_grid-2_text.heading-style-h1",
   ] as const;

   selectors.forEach((sel) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return;

      // Store the final value from the DOM, then reset to 0 for the animation start
      const targetValue = parseInt(el.textContent || "0", 10);
      el.textContent = "0";

      ScrollTrigger.create({
         trigger: el,
         start: "top 85%",
         once: true,
         onEnter: () => {
            countUp(el, targetValue, 1000);
         },
      });
   });
}

/*********************/
/* Bento lottie code */
/*********************/

function bentoLottie() {
   const wrappers = document.querySelectorAll<HTMLElement>(".bento-lottie");

   wrappers.forEach((el) => {
      const jsonUrl = el.getAttribute("data-lottie-src");
      if (!jsonUrl) return;

      const anim = lottie.loadAnimation({
         container: el,
         renderer: "svg",
         loop: false,
         autoplay: false,
         path: jsonUrl,
      });

      ScrollTrigger.create({
         trigger: el,
         start: "top 85%",
         once: true,
         onEnter: () => anim.play(),
      });
   });
}

/****************************************************/
/* Dropdown animation for the buy and lease section */
/****************************************************/

function buyLeaseDropdown() {
   const dropdowns = document.querySelectorAll<HTMLElement>(
      ".buy-lease_dropdown_wrapper",
   );

   dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".buy-lease_dropdown_toggle");
      if (!toggle) return;

      toggle.addEventListener("click", () => {
         dropdown.classList.toggle("is-open");
      });
   });
}

/*********************************/
/* Services slider tab animation */
/*********************************/

function servicesOpen() {
   const tabs = document.querySelectorAll<HTMLElement>(
      ".services_slide_tab_wrapper",
   );

   tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
         tab.classList.toggle("is-open");
      });
   });
}

/*************/
/* PDF popup */
/*************/

function homePDF() {
   const dialog = document.querySelector<HTMLDialogElement>(
      ".c_pdf-popup_wrapper",
   );
   const trigger = document.querySelector<HTMLElement>("[data-dialog-trigger]");
   const button = document.querySelector<HTMLElement>(".c_pdf-popup_button");
   const form = document.querySelector<HTMLFormElement>(".c_pdf-popup_form");

   if (!dialog || !trigger || !button || !form) return;

   if (localStorage.getItem("form-submitted") !== "true") {
      setTimeout(() => {
         ScrollTrigger.create({
            trigger: trigger,
            start: "top 100%",
            once: true,
            onEnter: () => {
               dialog.showModal();
            },
         });
      }, 3000);
   }

   button.addEventListener("click", () => {
      dialog.close();
   });

   form.addEventListener("submit", () => {
      localStorage.setItem("form-submitted", "true");
   });
}

document.addEventListener("DOMContentLoaded", () => {
   initHeroAnimations();
   heroVideo();
   bookPopupHome();
   introAnimations();
   imageParallax();
   scrollFadeIn();
   sliderIntoView();
   categorySlider(".slider-category_slider");
   bentoLottie();
   buyLeaseDropdown();
   sliderIntoViewSmooth();
   categorySlider(".services_slider");
   servicesOpen();
   footerOverlap();
   homePDF();
});
