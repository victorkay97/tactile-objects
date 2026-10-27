/**
 * Runs before React hydration so a saved preference or system dark appearance
 * is applied before the first visible paint. Only trusted literal values are
 * read from storage; neither user input nor page data is evaluated.
 */
export const themeInitScript = `(function () {
  var preference = "system";
  try {
    var saved = localStorage.getItem("tactile-objects:theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      preference = saved;
    }
  } catch (_) {}
  var prefersDark = false;
  try { prefersDark = matchMedia("(prefers-color-scheme: dark)").matches; } catch (_) {}
  var resolved = preference === "system" ? (prefersDark ? "dark" : "light") : preference;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.setAttribute("data-theme-preference", preference);
  document.documentElement.style.colorScheme = resolved;
})();`;
