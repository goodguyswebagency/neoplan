import "../../css/components/bookPopup.css";

import { initLenis } from "../animations/lenis";

export function bookPopupHome() {
   const lenis = initLenis();

   /********************************************************/
   /* Opening and closing logic for all popups and buttons */
   /********************************************************/

   const buttonSmall = document.querySelector<HTMLElement>(
      ".g_book_popup_button",
   );
   const popupCTA = document.querySelector<HTMLElement>(".g_book_popup_open");
   const popupCTACloseButton = document.querySelector<HTMLElement>(
      ".g_book_popup_button-close",
   );
   const popupMain = document.querySelector<HTMLElement>(
      ".g_book_popup-open_wrapper",
   );
   const popupMainOpenButton = document.querySelector<HTMLElement>(
      ".g_book_popup_button-open",
   );
   const popupMainCloseButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-close",
   );

   if (
      !buttonSmall ||
      !popupCTACloseButton ||
      !popupCTA ||
      !popupMain ||
      !popupMainOpenButton
   )
      return;

   // Helper: show the large popup CTA and hide the small button
   const openPopupCTA = () => {
      popupCTA.classList.add("is-open");
      buttonSmall.classList.remove("is-open");
   };

   // Helper: hide the large popup CTA and show the small button
   const openButtonSmall = () => {
      popupCTA.classList.remove("is-open");
      buttonSmall.classList.add("is-open");
   };

   // Helper: open popup list wrapper and hide popup CTA
   const openPopupMain = () => {
      popupCTA.classList.remove("is-open");
      popupMain.classList.add("is-open");
   };

   // Helper: close popup list wrapper and open popup CTA
   const closePopupMain = () => {
      popupCTA.classList.add("is-open");
      popupMain.classList.remove("is-open");
   };

   // Threshold at which we auto-open the popup (150vh)
   const thresholdMultiplier = 1.5;
   // Ensure we trigger the auto-open only once per page view
   let hasTriggeredFromScroll = false;

   const handleScroll = () => {
      if (hasTriggeredFromScroll) return;

      // When user scrolls past 150vh from the top, open the popup
      if (window.scrollY >= window.innerHeight * thresholdMultiplier) {
         hasTriggeredFromScroll = true;
         window.removeEventListener("scroll", handleScroll);
         openPopupCTA();
      }
   };

   // Listen for scrolling to trigger the auto-open behavior
   window.addEventListener("scroll", handleScroll, { passive: true });
   // Run once in case the page loads already scrolled past the threshold
   handleScroll();

   // Close popup CTA event listener
   popupCTACloseButton.addEventListener("click", () => {
      hasTriggeredFromScroll = true;
      openButtonSmall();
   });

   // Open popup CTA event listener
   buttonSmall.addEventListener("click", () => {
      openPopupCTA();
   });

   // Open popup list event listener
   popupMainOpenButton.addEventListener("click", () => {
      openPopupMain();
      lenis.stop();
      console.log("Lenis stopped");
   });

   // Close popup list event listener
   popupMainCloseButton?.addEventListener("click", () => {
      closePopupMain();
      lenis.start();
      console.log("Lenis started");
   });

   /****************************/
   /* Tab logic for popup list */
   /****************************/

   const tabButton1 = document.querySelector<HTMLElement>(
      '[data-popup-tab-button="1"]',
   );
   const tabButton2 = document.querySelector<HTMLElement>(
      '[data-popup-tab-button="2"]',
   );
   const tab1 = document.querySelector<HTMLElement>('[data-popup-tab="1"');
   const tab2 = document.querySelector<HTMLElement>('[data-popup-tab="2"');

   if (!tabButton1 || !tabButton2 || !tab1 || !tab2) return;

   // Open tab 1
   tabButton1.addEventListener("click", () => {
      tab1.classList.add("is-open");
      tabButton1.classList.add("is-open");
      tab2.classList.remove("is-open");
      tabButton2.classList.remove("is-open");
   });

   // Open tab 2
   tabButton2.addEventListener("click", () => {
      tab1.classList.remove("is-open");
      tabButton1.classList.remove("is-open");
      tab2.classList.add("is-open");
      tabButton2.classList.add("is-open");
   });

   /**************/
   /* Form logic */
   /**************/

   const cards = document.querySelectorAll<HTMLElement>(
      ".g_book_popup-list_card_wrapper",
   );
   const formInput = document.querySelector<HTMLInputElement>("#contactName");

   cards.forEach((card) => {
      const nameEl = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_heading",
      );
      const name = nameEl?.textContent;
      const button = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_button",
      );

      button?.addEventListener("click", () => {
         popupMain.classList.add("is-form");
         if (formInput && name) {
            formInput.value = name;
         }
      });
   });

   const popupReturnButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-return",
   );

   popupReturnButton?.addEventListener("click", () => {
      popupMain.classList.remove("is-form");
   });
}

export function bookPopupProduct() {}
