"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/js/pages/vsl.ts
  function timeCounter() {
    const elements = document.querySelectorAll(
      "[data-time-counter]"
    );
    if (!elements.length) return;
    const pad = (n) => String(n).padStart(2, "0");
    const parseDMY = (dmy) => {
      const parts = dmy.split("/").map((v) => Number(v));
      if (parts.length !== 3) return null;
      const [dd, mm, yyyy] = parts;
      if (!dd || !mm || !yyyy) return null;
      const date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
      if (date.getFullYear() !== yyyy || date.getMonth() !== mm - 1 || date.getDate() !== dd)
        return null;
      return date;
    };
    elements.forEach((el) => {
      const attr = el.getAttribute("data-time-counter");
      if (!attr) return;
      const target = parseDMY(attr);
      if (!target) {
        console.warn(
          "[time-counter] Invalid date format, expected dd/mm/yyyy:",
          attr
        );
        return;
      }
      const update = () => {
        const now = /* @__PURE__ */ new Date();
        const diffMs = target.getTime() - now.getTime();
        if (diffMs <= 0) {
          el.textContent = "00:00:00:00";
          clearInterval(timer);
          return;
        }
        const totalSeconds = Math.floor(diffMs / 1e3);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds % 86400 / 3600);
        const minutes = Math.floor(totalSeconds % 3600 / 60);
        const seconds = totalSeconds % 60;
        el.textContent = `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      };
      update();
      const timer = setInterval(update, 1e3);
      const observer = new MutationObserver(() => {
        if (!document.body.contains(el)) {
          clearInterval(timer);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  function setMarqueeSpeed() {
    const SPEED_PX_PER_SEC = 50;
    const applyMarqueeSpeed = (el) => {
      const width = el.scrollWidth || el.offsetWidth;
      const seconds = width / SPEED_PX_PER_SEC;
      const varName = el.classList.contains("is-reverse") ? "--marquee-reverse-duration" : "--marquee-duration";
      el.style.setProperty(varName, `${seconds}s`);
    };
    const all = document.querySelectorAll(".vsl_marquee_animation");
    if (!all.length) return;
    all.forEach((el) => applyMarqueeSpeed(el));
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const target = entry.target;
          applyMarqueeSpeed(target);
        }
      });
      all.forEach((el) => ro.observe(el));
    }
    window.addEventListener(
      "resize",
      () => {
        all.forEach((el) => applyMarqueeSpeed(el));
      },
      { passive: true }
    );
    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready.then(() => {
        all.forEach((el) => applyMarqueeSpeed(el));
      });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    timeCounter();
    setMarqueeSpeed();
  });
})();
//# sourceMappingURL=vsl.js.map
