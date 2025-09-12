import "swiper/css";
import "../../css/pages/productPage.css";

import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

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
         spaceBetween: rem,
         watchSlidesProgress: true,
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
}

document.addEventListener("DOMContentLoaded", () => {
   productSlider();
});
