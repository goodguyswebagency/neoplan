export function navigationScroll() {
   const navigation = document.querySelector<HTMLElement>(".navigation");
   if (!navigation) {
      console.error("No navigation");
      return;
   }

   if (navigation.getAttribute("data-info-bar") === "true") {
      const infoBar = document.querySelector(".g_info-bar");
      if (!infoBar) {
         console.error("No info bar and data-info-bar is set to true");
         return;
      }
      const infoClose = infoBar.querySelector(".info-bar_close");
      if (!infoClose) return;

      // Close info bar on click
      infoClose.addEventListener("click", () => {
         infoBar.classList.add("is-closed");
         setTimeout(() => {
            navigation.classList.add("is-fixed");
         }, 800);
      });

      // Set navigation to fixed
      window.addEventListener("scroll", () => {
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

      // If the user is in the top 3rem of the page force the navigation shown
      const topThresholdPx = 3 * rem;
      if (currentY <= topThresholdPx) {
         navigation.style.transform = "translateY(0%)";
         navigation.style.opacity = "1";
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
