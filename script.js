(function () {
  var STORAGE_KEY = "theme";
  var TOGGLE_ID = "theme-toggle";
  var TOGGLE_TEXT_ID = "theme-toggle-text";
  var root = document.documentElement;
  var toggle = null;
  var toggleText = null;
  var mediaQuery = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  function normalizeTheme(value) {
    if (value === "light" || value === "dark") {
      return value;
    }
    return null;
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem(STORAGE_KEY));
    } catch (err) {
      return null;
    }
  }

  function hasStoredTheme() {
    return getStoredTheme() !== null;
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* no-op */
    }
  }

  function updateToggleLabel(theme) {
    if (!toggle || !toggleText) {
      return;
    }
    var normalized = normalizeTheme(theme) || "dark";
    var next = normalized === "dark" ? "Light" : "Dark";
    toggle.setAttribute(
      "aria-label",
      "Switch to " + next.toLowerCase() + " theme"
    );
    toggleText.textContent = next + " mode";
  }

  function setTheme(theme, persist) {
    var normalized = normalizeTheme(theme) || "dark";
    root.setAttribute("data-theme", normalized);
    if (persist) {
      persistTheme(normalized);
    }
    updateToggleLabel(normalized);
  }

  function handleSystemChange(event) {
    if (hasStoredTheme()) {
      return;
    }
    setTheme(event.matches ? "dark" : "light", false);
  }

  function initTheme() {
    var stored = getStoredTheme();
    var fallback = normalizeTheme(root.getAttribute("data-theme")) || "dark";
    var prefers = mediaQuery
      ? mediaQuery.matches
        ? "dark"
        : "light"
      : null;
    var initial = stored || prefers || fallback;
    setTheme(initial, false);
  }

  function initUI() {
    toggle = document.getElementById(TOGGLE_ID);
    toggleText = document.getElementById(TOGGLE_TEXT_ID);
    updateToggleLabel(root.getAttribute("data-theme"));

    if (toggle) {
      toggle.addEventListener("click", function () {
        var current =
          root.getAttribute("data-theme") === "light" ? "light" : "dark";
        var next = current === "dark" ? "light" : "dark";
        setTheme(next, true);
      });
    }

    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  initTheme();

  if (mediaQuery) {
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleSystemChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleSystemChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();
