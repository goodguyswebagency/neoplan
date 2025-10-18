import "../css/index.css";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initLenis } from "./animations/lenis";
import footerCode from "./components/footer";
import { navigationMobile, navigationScroll } from "./components/navigation";

gsap.registerPlugin(ScrollTrigger);

/***********************/
/* Lenis smooth scroll */
/***********************/

// Cubic bezier helper
function cubicBezier(p0x: number, p0y: number, p1x: number, p1y: number) {
   const cx = 3 * p0x,
      bx = 3 * (p1x - p0x) - cx,
      ax = 1 - cx - bx;
   const cy = 3 * p0y,
      by = 3 * (p1y - p0y) - cy,
      ay = 1 - cy - by;

   function sampleX(t: number) {
      return ((ax * t + bx) * t + cx) * t;
   }
   function sampleY(t: number) {
      return ((ay * t + by) * t + cy) * t;
   }
   function sampleDerivX(t: number) {
      return (3 * ax * t + 2 * bx) * t + cx;
   }

   function solveT(x: number) {
      let t = x;
      for (let i = 0; i < 5; i++) {
         const xEst = sampleX(t) - x;
         const d = sampleDerivX(t);
         if (Math.abs(xEst) < 1e-4 || d === 0) break;
         t -= xEst / d;
      }
      return t;
   }

   return (x: number) => sampleY(solveT(x));
}

const easeCustom = cubicBezier(0.625, 0.05, 0, 1);
const ANCHOR_SCROLL_OFFSET = 100;
const SCROLL_PX_PER_SECOND = 2000;

function scrollHashWithOffset(
   lenis: ReturnType<typeof initLenis>,
   hash: string,
   { immediate = false }: { immediate?: boolean } = {},
) {
   if (!hash || hash === "#") return;

   const targetEl = document.querySelector<HTMLElement>(hash);
   const baseTargetY = targetEl
      ? targetEl.getBoundingClientRect().top + window.scrollY
      : 0;
   const destinationY = Math.max(baseTargetY - ANCHOR_SCROLL_OFFSET, 0);
   const currentY = window.scrollY;
   const distance = Math.abs(destinationY - currentY);
   const duration = distance / SCROLL_PX_PER_SECOND;

   if (immediate) {
      lenis.scrollTo(hash, {
         immediate: true,
         offset: -ANCHOR_SCROLL_OFFSET,
      });
      return;
   }

   if (duration === 0) {
      lenis.scrollTo(hash, {
         immediate: true,
         offset: -ANCHOR_SCROLL_OFFSET,
      });
      return;
   }

   lenis.scrollTo(hash, {
      duration,
      easing: easeCustom,
      offset: -ANCHOR_SCROLL_OFFSET,
   });
}

function setupLenis() {
   const lenis = initLenis();

   // Smooth scroll for same-page anchors
   document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener(
         "click",
         (e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            const href = el.getAttribute("href");
            if (!href) return;

            const url = new URL(href, window.location.origin);

            // Only intercept if it's the current page
            if (url.pathname === window.location.pathname && url.hash) {
               e.preventDefault();
               // Stop Webflow's default smooth scroll
               e.stopImmediatePropagation?.();
               e.stopPropagation?.();

               scrollHashWithOffset(lenis, url.hash);

               if (url.hash !== window.location.hash) {
                  history.pushState(null, "", url.hash);
               }
            }
         },
         { capture: true },
      );
   });

   // Handle landing on a hash URL without native jump/blink
   if (window.location.hash) {
      const initialHash = window.location.hash;
      // Prevent the browser's instant jump
      window.scrollTo(0, 0);
      // Defer until next frame so Lenis is ready
      requestAnimationFrame(() => {
         scrollHashWithOffset(lenis, initialHash, { immediate: true });
      });
   }
}

/**************************/
/* Set select placeholder */
/**************************/

function setSelectPlaceholder() {
   const selects = document.querySelectorAll("select");
   selects.forEach((select) => {
      const firstOption = select.querySelector("option");
      if (!firstOption) return;
      firstOption.disabled = true;
      firstOption.hidden = true;
      firstOption.selected = true;
      firstOption.classList.add("form-option-hidden");
      select.classList.add("is-placeholder");
      select.addEventListener("change", () => {
         if (select.selectedIndex === 0) {
            select.classList.add("is-placeholder");
         } else {
            select.classList.remove("is-placeholder");
         }
      });
   });
}

document.addEventListener("DOMContentLoaded", () => {
   setupLenis();
   navigationScroll();
   navigationMobile();
   footerCode();
   setSelectPlaceholder();
});
