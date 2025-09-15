import "../../css/pages/opt.css";

/*********************************/
/* Helper for counting up from 0 */
/*********************************/

function timeCounter() {
   const elements = document.querySelectorAll<HTMLElement>(
      "[data-time-counter]",
   );
   if (!elements.length) return;

   const pad = (n: number) => String(n).padStart(2, "0");

   const parseDMY = (dmy: string): Date | null => {
      const parts = dmy.split("/").map((v) => Number(v));
      if (parts.length !== 3) return null;
      const [dd, mm, yyyy] = parts;
      if (!dd || !mm || !yyyy) return null;
      const date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
      if (
         date.getFullYear() !== yyyy ||
         date.getMonth() !== mm - 1 ||
         date.getDate() !== dd
      )
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
            attr,
         );
         return;
      }

      const update = () => {
         const now = new Date();
         const diffMs = target.getTime() - now.getTime();

         if (diffMs <= 0) {
            el.textContent = "00:00:00:00";
            clearInterval(timer);
            return;
         }

         const totalSeconds = Math.floor(diffMs / 1000);
         const days = Math.floor(totalSeconds / 86400);
         const hours = Math.floor((totalSeconds % 86400) / 3600);
         const minutes = Math.floor((totalSeconds % 3600) / 60);
         const seconds = totalSeconds % 60;

         el.textContent = `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      };

      update();
      const timer = setInterval(update, 1000);

      const observer = new MutationObserver(() => {
         if (!document.body.contains(el)) {
            clearInterval(timer);
            observer.disconnect();
         }
      });
      observer.observe(document.body, { childList: true, subtree: true });
   });
}

document.addEventListener("DOMContentLoaded", () => {
   timeCounter();
});
