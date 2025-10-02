// Helper function
function closeAllDropdowns() {
   const dropdowns = document.querySelectorAll(".footer_links_wrapper");
   if (!dropdowns) return;

   dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
   });
}

export default function footerCode() {
   const dropdowns = document.querySelectorAll(".footer_links_wrapper");

   dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".footer_links_toggle");
      if (!toggle) return;

      toggle.addEventListener("click", () => {
         dropdown.classList.toggle("is-open");
      });
   });
}
