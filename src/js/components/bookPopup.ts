import "../../css/components/bookPopup.css";

export function bookPopupHome() {
   const isMobile = window.innerWidth < 992;

   /********************************************************/
   /* Opening and closing logic for all popups and buttons */
   /********************************************************/

   const ctaButtons = document.querySelectorAll<HTMLElement>(
      "[data-open-book='true']",
   );
   const popupMain = document.querySelector<HTMLElement>(
      ".g_book_popup-open_wrapper",
   );
   const popupMainOpenButton = document.querySelector<HTMLElement>(
      "[data-open-contact-popup]",
   );
   const popupMainCloseButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-close",
   );
   const nav = document.querySelector<HTMLElement>("header");

   if (!popupMain || !popupMainOpenButton) return;

   // Helper: open popup list wrapper and fade the navigation to focus content
   const openPopupMain = () => {
      popupMainOpenButton.classList.remove("is-open");
      popupMain.classList.add("is-open");
      if (nav) {
         nav.style.opacity = "0";
         nav.style.pointerEvents = "none";
      }
   };

   // Helper: close popup list wrapper and restore navigation visibility
   const closePopupMain = () => {
      popupMainOpenButton.classList.add("is-open");
      popupMain.classList.remove("is-open");
      if (nav) {
         nav.style.opacity = "";
         nav.style.pointerEvents = "";
      }
   };

   // Threshold at which we auto-open the popup (120vh)
   const thresholdMultiplier = 1.2;
   const sectionCta = document.querySelector<HTMLElement>(".section_cta");
   const footer = document.querySelector<HTMLElement>(".footer");

   const handleScroll = () => {
      const threshold = window.innerHeight * thresholdMultiplier;
      const beyondThreshold = window.scrollY >= threshold;

      let ctaInView = false;
      if (sectionCta) {
         const rect = sectionCta.getBoundingClientRect();
         ctaInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      }

      let footerInView = false;
      if (footer) {
         const rect = footer.getBoundingClientRect();
         footerInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      }

      // Show the floating button only after the threshold
      // and before CTA or footer enters view
      const shouldShowButton = beyondThreshold && !ctaInView && !footerInView;
      popupMainOpenButton.classList.toggle("is-open", shouldShowButton);
   };

   // Listen for scrolling to trigger the auto-open button behavior
   window.addEventListener("scroll", handleScroll, { passive: true });
   // Run once in case the page loads already scrolled past the threshold
   handleScroll();

   // Open popup list event listener
   popupMainOpenButton.addEventListener("click", () => {
      openPopupMain();
   });

   // Close popup list event listener
   popupMainCloseButton?.addEventListener("click", () => {
      closePopupMain();
   });

   // Open popup on all CTAs
   ctaButtons.forEach((button) => {
      button.addEventListener("click", () => {
         openPopupMain();
      });
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

   function closeAllImages() {
      document
         .querySelectorAll<HTMLImageElement>("[data-book-image]")
         .forEach((image) => {
            image.classList.remove("is-open");
         });
   }

   function setImage(email: string) {
      closeAllImages();
      const images = Array.from(
         document.querySelectorAll<HTMLImageElement>("[data-book-image]"),
      );

      const match = images.find(
         (image) => image.getAttribute("data-book-image") === email,
      );

      if (match) {
         match.classList.add("is-open");
      }

      return match || null;
   }

   const cards = document.querySelectorAll<HTMLElement>(
      ".g_book_popup-list_card_wrapper",
   );

   const contactImage =
      document.querySelectorAll<HTMLImageElement>("[data-book-image]");
   const contactName = document.querySelector<HTMLElement>("[data-book-name]");
   const contactCity = document.querySelector<HTMLElement>("[data-book-city]");
   const contactPhone =
      document.querySelector<HTMLLinkElement>("[data-book-phone]");
   const contactEmail =
      document.querySelector<HTMLLinkElement>("[data-book-email]");

   // Input fields
   const nameInput = document.querySelector<HTMLInputElement>("#contactName");
   const phoneInput = document.querySelector<HTMLInputElement>("#contactPhone");
   const emailInput = document.querySelector<HTMLInputElement>("#contactEmail");

   if (
      !contactName ||
      !contactCity ||
      !contactImage ||
      !contactPhone ||
      !contactEmail ||
      !nameInput ||
      !phoneInput ||
      !emailInput
   ) {
      return;
   }

   cards.forEach((card) => {
      // Elements with the data values
      const nameEl = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_heading",
      );
      const cityEl = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_subheading",
      );
      const phoneEl = card.querySelector<HTMLElement>("[data-phone-number]");
      const emailEl = card.querySelector<HTMLElement>("[data-email]");

      if (!nameEl || !cityEl || !phoneEl || !emailEl) {
         return;
      }

      // Data values
      const name = nameEl.textContent;
      const city = cityEl.textContent;
      const phoneText = phoneEl.getAttribute("data-phone-number");
      const phoneValue = phoneEl.getAttribute("data-phone-link");
      const email = emailEl.getAttribute("data-email");

      if (!name || !city || !phoneText || !phoneValue || !email) return;

      const cardButton = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_button",
      );

      cardButton?.addEventListener("click", () => {
         popupMain.classList.add("is-form");
         nameInput.value = name;
         phoneInput.value = phoneValue;
         emailInput.value = email;
         contactName.textContent = name;
         contactCity.textContent = city;
         if (phoneText !== "no phone") {
            contactPhone.textContent = phoneText;
            contactPhone.href = `tel:${phoneValue}`;
            contactPhone.style.display = "";
         } else {
            contactPhone.style.display = "none";
         }
         contactEmail.textContent = email;
         contactEmail.href = `mailto:${email}`;
         setImage(email);
      });
   });

   const popupReturnButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-return",
   );

   popupReturnButton?.addEventListener("click", () => {
      popupMain.classList.remove("is-form");
   });

   /****************/
   /* Popup mobile */
   /****************/

   if (isMobile) {
      const listWrapper = document.querySelector<HTMLElement>(
         ".g_book_popup-list_wrapper",
      );
      listWrapper?.setAttribute("data-lenis-prevent", "");
   }
}

export function bookPopupProduct() {
   const isMobile = window.innerWidth < 992;

   const ctaButtons = document.querySelectorAll<HTMLElement>(
      "[data-open-book='true']",
   );
   const button = document.querySelector<HTMLElement>("[data-button-book]");
   const popupMain = document.querySelector<HTMLElement>(
      ".g_book_popup-open_wrapper",
   );
   const popupMainCloseButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-close",
   );
   const nav = document.querySelector<HTMLElement>("header");

   if (!button || !popupMain) return;

   const openPopupMain = () => {
      popupMain.classList.add("is-open");
      if (nav) {
         nav.style.opacity = "0";
         nav.style.pointerEvents = "none";
      }
   };

   const closePopupMain = () => {
      popupMain.classList.remove("is-open");
      if (nav) {
         nav.style.opacity = "";
         nav.style.pointerEvents = "";
      }
   };

   button.addEventListener("click", () => {
      openPopupMain();
   });

   popupMainCloseButton?.addEventListener("click", () => {
      closePopupMain();
   });

   // Open popup on all CTAs
   ctaButtons.forEach((button) => {
      button.addEventListener("click", () => {
         openPopupMain();
      });
   });

   const tabButton1 = document.querySelector<HTMLElement>(
      '[data-popup-tab-button="1"]',
   );
   const tabButton2 = document.querySelector<HTMLElement>(
      '[data-popup-tab-button="2"]',
   );
   const tab1 = document.querySelector<HTMLElement>('[data-popup-tab="1"');
   const tab2 = document.querySelector<HTMLElement>('[data-popup-tab="2"');

   if (!tabButton1 || !tabButton2 || !tab1 || !tab2) return;

   tabButton1.addEventListener("click", () => {
      tab1.classList.add("is-open");
      tabButton1.classList.add("is-open");
      tab2.classList.remove("is-open");
      tabButton2.classList.remove("is-open");
   });

   tabButton2.addEventListener("click", () => {
      tab1.classList.remove("is-open");
      tabButton1.classList.remove("is-open");
      tab2.classList.add("is-open");
      tabButton2.classList.add("is-open");
   });

   /**************/
   /* Form logic */
   /**************/

   function closeAllImages() {
      document
         .querySelectorAll<HTMLImageElement>("[data-book-image]")
         .forEach((image) => {
            image.classList.remove("is-open");
         });
   }

   function setImage(email: string) {
      closeAllImages();
      const images = Array.from(
         document.querySelectorAll<HTMLImageElement>("[data-book-image]"),
      );

      const match = images.find(
         (image) => image.getAttribute("data-book-image") === email,
      );

      if (match) {
         match.classList.add("is-open");
      }

      return match || null;
   }

   const cards = document.querySelectorAll<HTMLElement>(
      ".g_book_popup-list_card_wrapper",
   );

   const contactImage =
      document.querySelectorAll<HTMLImageElement>("[data-book-image]");
   const contactName = document.querySelector<HTMLElement>("[data-book-name]");
   const contactCity = document.querySelector<HTMLElement>("[data-book-city]");
   const contactPhone =
      document.querySelector<HTMLLinkElement>("[data-book-phone]");
   const contactEmail =
      document.querySelector<HTMLLinkElement>("[data-book-email]");

   // Input fields
   const nameInput = document.querySelector<HTMLInputElement>("#contactName");
   const phoneInput = document.querySelector<HTMLInputElement>("#contactPhone");
   const emailInput = document.querySelector<HTMLInputElement>("#contactEmail");

   if (
      !contactName ||
      !contactCity ||
      !contactImage ||
      !contactPhone ||
      !contactEmail ||
      !nameInput ||
      !phoneInput ||
      !emailInput
   ) {
      return;
   }

   cards.forEach((card) => {
      // Elements with the data values
      const nameEl = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_heading",
      );
      const cityEl = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_subheading",
      );
      const phoneEl = card.querySelector<HTMLElement>("[data-phone-number]");
      const emailEl = card.querySelector<HTMLElement>("[data-email]");

      if (!nameEl || !cityEl || !phoneEl || !emailEl) {
         return;
      }

      // Data values
      const name = nameEl.textContent;
      const city = cityEl.textContent;
      const phoneText = phoneEl.getAttribute("data-phone-number");
      const phoneValue = phoneEl.getAttribute("data-phone-link");
      const email = emailEl.getAttribute("data-email");

      if (!name || !city || !phoneText || !phoneValue || !email) return;

      const cardButton = card.querySelector<HTMLElement>(
         ".g_book_popup-list_card_button",
      );

      cardButton?.addEventListener("click", () => {
         popupMain.classList.add("is-form");
         nameInput.value = name;
         phoneInput.value = phoneValue;
         emailInput.value = email;
         contactName.textContent = name;
         contactCity.textContent = city;
         if (phoneText !== "no phone") {
            contactPhone.textContent = phoneText;
            contactPhone.href = `tel:${phoneValue}`;
            contactPhone.style.display = "";
         } else {
            contactPhone.style.display = "none";
         }
         contactEmail.textContent = email;
         contactEmail.href = `mailto:${email}`;
         setImage(email);
      });
   });

   const popupReturnButton = document.querySelector<HTMLElement>(
      ".g_book_popup-list_panel_button.is-return",
   );

   popupReturnButton?.addEventListener("click", () => {
      popupMain.classList.remove("is-form");
   });

   /****************/
   /* Popup mobile */
   /****************/

   if (isMobile) {
      const listWrapper = document.querySelector<HTMLElement>(
         ".g_book_popup-list_wrapper",
      );
      listWrapper?.setAttribute("data-lenis-prevent", "");
   }
}
