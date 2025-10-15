import "swiper/css";
import "../../css/components/categorySlider.css";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export function categorySlider(selector: string) {
   const sliders = document.querySelectorAll<HTMLElement>(selector);

   sliders.forEach((slider) => {
      const swiperEl = slider.querySelector<HTMLElement>(".swiper");
      if (!swiperEl) return;

      const swiperNavigation =
         slider.querySelector<HTMLElement>(".swiper-navigation");
      const swiperWrapper =
         slider.querySelector<HTMLElement>(".swiper-wrapper");
      const slidesCount =
         swiperEl.querySelectorAll<HTMLElement>(".swiper-slide").length;
      const isMobile = window.innerWidth <= 991;

      if (!isMobile && slidesCount <= 3) {
         if (swiperNavigation && swiperWrapper) {
            swiperNavigation.style.display = "none";
            swiperWrapper.classList.add("is-grid");
         }
         return;
      }

      if (swiperNavigation && swiperWrapper) {
         swiperNavigation.style.display = "";
      }

      const buttonPrev = slider.querySelector<HTMLElement>(
         ".swiper-button-prev",
      );
      const buttonNext = slider.querySelector<HTMLElement>(
         ".swiper-button-next",
      );

      if (!buttonPrev || !buttonNext) return;

      new Swiper(swiperEl, {
         modules: [Navigation],
         slidesPerView: 1,
         spaceBetween: 20,
         grabCursor: true,
         simulateTouch: true,
         speed: 800,
         navigation: {
            prevEl: buttonPrev,
            nextEl: buttonNext,
         },
         breakpoints: {
            992: {
               slidesPerView: 3,
            },
         },
      });
   });
}
