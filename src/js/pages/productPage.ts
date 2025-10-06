import "swiper/css";
import "../../css/pages/productPage.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

import footerOverlap from "../animations/footerOverlap";
import { bookPopupProduct } from "../components/bookPopup";
import { categorySlider } from "../components/categorySlider";

gsap.registerPlugin(ScrollTrigger);

/******************/
/* Product slider */
/******************/

function productSlider() {
   const sliders = document.querySelectorAll(".product_slider");
   const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

   sliders.forEach((slider) => {
      const swiperEl = slider.querySelector<HTMLElement>(
         ".swiper.is-product-main",
      );
      if (!swiperEl) return;

      const swiperThumbs = slider.querySelector<HTMLElement>(
         ".swiper.is-product-thumbs",
      );
      if (!swiperThumbs) return;

      const thumbsSwiper = new Swiper(swiperThumbs, {
         slidesPerView: "auto",
         spaceBetween: 0.375 * rem,
         watchSlidesProgress: true,
         breakpoints: {
            992: {
               spaceBetween: rem,
            },
         },
      });

      new Swiper(swiperEl, {
         modules: [Navigation, Thumbs],
         slidesPerView: 1,
         spaceBetween: 0,
         speed: 800,
         grabCursor: true,
         simulateTouch: true,
         navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
         },
         thumbs: {
            swiper: thumbsSwiper,
         },
      });
   });

   // Load animation (vanilla JS)
   if (window.innerWidth > 991) {
      document.querySelectorAll(".product_slider").forEach((el) => {
         el.animate(
            [{ transform: "translateY(140%)" }, { transform: "translateY(0)" }],
            {
               duration: 2000,
               easing: "cubic-bezier(0.22, 1, 0.36, 1)",
               fill: "forwards",
            },
         );
      });
   }
}

/****************************************/
/* Reusable attribute-selector dropdown */
/****************************************/

function openDropdowns() {
   const dropdowns = document.querySelectorAll<HTMLElement>(
      "[data-dropdown-wrapper]",
   );

   dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector("[data-dropdown-toggle]");

      toggle?.addEventListener("click", () => {
         dropdown.classList.toggle("is-open");
      });
   });
}

/****************************/
/* Benefits arrow animation */
/****************************/

function benefitsArrowAnimation() {
   const animationWrapper = document.querySelector(
      ".product-benefits_grid-3_animation_wrapper",
   );
   const arrow = document.querySelector(
      ".product-benefits_grid-3_animation_arrow",
   );

   if (animationWrapper && arrow) {
      gsap.to(arrow, {
         scrollTrigger: {
            trigger: animationWrapper,
            start: "top 85%",
            end: "bottom top",
            onEnter: () => arrow.classList.add("is-moved"),
         },
      });
   }
}

document.addEventListener("DOMContentLoaded", () => {
   bookPopupProduct();
   productSlider();
   openDropdowns();
   benefitsArrowAnimation();
   categorySlider(".slider-category_slider");
   footerOverlap();
});
