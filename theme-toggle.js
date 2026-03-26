const storageKey = "mel-theme-preference";

const icons = {
  dark: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.24 1.24A7 7 0 1 0 19.76 14a1 1 0 0 0 1.24-1.21Z"></path>
    </svg>
  `,
  light: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm0-16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Zm10-8a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2ZM5 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1Zm12.66-5.66a1 1 0 0 1 1.41 0l1.42 1.41a1 1 0 1 1-1.42 1.42l-1.41-1.42a1 1 0 0 1 0-1.41ZM4.93 19.07a1 1 0 0 1 1.41 0l1.42 1.42a1 1 0 1 1-1.42 1.41l-1.41-1.41a1 1 0 0 1 0-1.42Zm14.14 2.84a1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 0 1 1.42 1.42l-1.42 1.41a1 1 0 0 1-1.41 0ZM4.93 4.93a1 1 0 0 1 1.41 0l1.42 1.41A1 1 0 0 1 6.34 7.76L4.93 6.34a1 1 0 0 1 0-1.41Z"></path>
    </svg>
  `
};

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function renderButton(button, theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "dark" ? "Activar modo oscuro" : "Activar modo claro";

  button.innerHTML = `${icons[nextTheme]}<span class="sr-only">${label}</span>`;
  button.setAttribute("aria-label", label);
  button.setAttribute("aria-pressed", String(theme === "dark"));
}

function initThemeToggle() {
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.setAttribute("title", "Cambiar tema");

  renderButton(button, currentTheme);

  button.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
    renderButton(button, nextTheme);
  });

  document.body.appendChild(button);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}
