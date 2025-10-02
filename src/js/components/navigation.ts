import { startLenis, stopLenis } from "../animations/lenis";

export function navigationScroll() {
   const navigation = document.querySelector<HTMLElement>(".navigation");
   if (!navigation) {
      console.log("No navigation");
      return;
   }

   let infoBarClosing = false;

   if (navigation.getAttribute("data-info-bar") === "true") {
      const infoBar = document.querySelector<HTMLElement>(".g_info-bar");
      if (!infoBar) {
         console.log("No info bar and data-info-bar is set to true");
         return;
      }
      const infoClose = infoBar.querySelector<HTMLElement>(".info-bar_close");
      if (!infoClose) return;

      // Close info bar on click
      infoClose.addEventListener("click", () => {
         const duration = 800;
         const easing = "cubic-bezier(0.625, 0.05, 0, 1)";

         // Measure the current bottom of the info bar
         const rect = infoBar.getBoundingClientRect();
         const startTop = Math.max(rect.bottom, 0);

         infoBarClosing = true;

         // Fix the nav immediately and animate it up as the info bar collapses
         navigation.classList.add("is-fixed");
         navigation.style.top = `${startTop}px`;
         navigation.style.transition = `top ${duration}ms ${easing}`;

         // Start the info bar close and nav slide-up together
         infoBar.classList.add("is-closed");
         const navigationMobileEl = document.querySelector<HTMLElement>(
            ".navigation_mobile_wrapper",
         );
         if (
            navigationMobileEl &&
            navigation.classList.contains("is-open") &&
            window.innerWidth <= 991
         ) {
            navigationMobileEl.style.height = "100svh";
         }
         requestAnimationFrame(() => {
            navigation.style.top = "0px";
         });

         // Cleanup after animation
         setTimeout(() => {
            navigation.style.transition = "";
            navigation.style.top = "";
            infoBarClosing = false;
         }, duration + 50);
      });

      // Set navigation to fixed
      window.addEventListener("scroll", () => {
         if (infoBarClosing) return;
         if (infoBar) {
            const infoBarRect = infoBar.getBoundingClientRect();
            if (infoBarRect.bottom <= 0) {
               navigation.classList.add("is-fixed");
            } else {
               navigation.classList.remove("is-fixed");
            }
         }
      });
   } else {
      navigation.classList.add("is-fixed");
   }

   const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
   let lastScrollY = window.scrollY;
   let downAccum = 0;
   let upAccum = 0;

   window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      // Toggle .is-scrolled
      if (currentY >= 5 * rem) {
         navigation.classList.add("is-scrolled");
      } else {
         navigation.classList.remove("is-scrolled");
      }

      // If the user is in the top 10rem of the page force the navigation shown
      const topThresholdPx = 10 * rem;
      if (currentY <= topThresholdPx) {
         // Force shown at top via class, not inline transform
         navigation.classList.remove("is-moved");
         // Clear any inline overrides to let CSS drive transitions
         navigation.style.transform = "";
         navigation.style.opacity = "";
         // Reset any accumulated “downward” or “upward” scroll so bounce doesn’t hide it
         downAccum = upAccum = 0;
         lastScrollY = currentY;
         return;
      }

      // Accumulate scroll direction
      if (delta > 0) {
         downAccum += delta;
         upAccum = 0;
      } else if (delta < 0) {
         upAccum += -delta;
         downAccum = 0;
      }

      // Hide nav after 5rem downward
      if (downAccum >= 5 * rem) {
         navigation.classList.add("is-moved");
         downAccum = 0;
      }
      // Show nav after 5rem upward
      else if (upAccum >= 5 * rem) {
         navigation.classList.remove("is-moved");
         upAccum = 0;
      }

      lastScrollY = currentY;
   });
}

export function navigationMobile() {
   if (window.innerWidth > 991) return;

   const navigation = document.querySelector(".navigation");
   const navigationMobile = document.querySelector<HTMLElement>(
      ".navigation_mobile_wrapper",
   );
   const infoBar = document.querySelector(".g_info-bar");
   const button = document.querySelector(".navigation_mobile_button");

   if (!navigation || !navigationMobile || !button) return;

   button.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      let infoBarClosed;
      if (infoBar) {
         infoBarClosed = infoBar.classList.contains("is-closed");
      }
      const isFixed = navigation.classList.contains("is-fixed");

      if (!isOpen) {
         navigationMobile.style.height = "0svh";
         startLenis();
      } else {
         stopLenis();
         if (infoBarClosed || isFixed) {
            navigationMobile.style.height = "100svh";
         } else {
            navigationMobile.style.height = "calc(100svh - 2.875rem)";
         }
      }
   });

   // Link clicks start Lenis and close nav
   const links = document.querySelectorAll(".navigation_nav_link");

   if (links.length === 0) return;

   links.forEach((link) => {
      link.addEventListener("click", () => {
         navigation.classList.remove("is-open");
         navigationMobile.style.height = "0svh";
         startLenis();
      });
   });
}
