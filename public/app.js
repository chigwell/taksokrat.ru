(() => {
  "use strict";

  const CONFIG = window.TAKSOKRAT_CONFIG;
  const HTTP_URL_PATTERN = /^https?:\/\//i;
  const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/;

  const I18N = Object.freeze({
    en: {
      documentTitle: "Taksokrat.ru - Bigger links",
      metaDescription: "Taksokrat.ru turns links into longer encoded URLs.",
      ogDescription: "Paste a URL and get a longer encoded Taksokrat.ru link.",
      brandAria: "Taksokrat.ru home",
      languageSwitcherAria: "Choose interface language",
      switchToDark: "Switch to dark theme",
      switchToLight: "Switch to light theme",
      eyebrow: "Bigger links.",
      heroTitleStart: "Need a bigger link?",
      heroTitleAccent: "We will expand it.",
      heroSubtitle: "Paste a URL and get a longer link.",
      inputLabel: "URL to expand",
      inputPlaceholder: "https://example.com/your/link",
      inputHint: "Only http:// and https:// links are accepted.",
      submitAria: "Expand link",
      loading: "Expanding...",
      resultLabel: "Your bigger link",
      resultRegionAria: "Bigger link result",
      copyAria: "Copy bigger link",
      copiedAria: "Bigger link copied",
      openAria: "Open bigger link in a new tab",
      copiedToast: "Copied to clipboard",
      footerTagline: "Bigger links.",
      invalidProtocol: "Use a full URL starting with http:// or https://.",
      invalidUrl: "This does not look like a valid URL. Check it and try again.",
      invalidRedirectCode: "The encoded link in the address is invalid.",
      copyFailed: "Could not copy automatically. Select and copy the link manually.",
    },
    ru: {
      documentTitle: "Taksokrat.ru - Большие ссылки",
      metaDescription: "Taksokrat.ru делает ссылки длиннее.",
      ogDescription: "Вставьте URL и получите длиннее закодированную ссылку Taksokrat.ru.",
      brandAria: "Главная Taksokrat.ru",
      languageSwitcherAria: "Выбрать язык интерфейса",
      switchToDark: "Включить темную тему",
      switchToLight: "Включить светлую тему",
      eyebrow: "Ссылки больше.",
      heroTitleStart: "Короткая ссылка?",
      heroTitleAccent: "Увеличим.",
      heroSubtitle: "Вставьте URL и получите ссылку длиннее.",
      inputLabel: "Ссылка для увеличения",
      inputPlaceholder: "https://example.com/your/link",
      inputHint: "Поддерживаются только ссылки с http:// или https://.",
      submitAria: "Увеличить ссылку",
      loading: "Увеличиваем...",
      resultLabel: "Ваша большая ссылка",
      resultRegionAria: "Результат увеличения ссылки",
      copyAria: "Скопировать большую ссылку",
      copiedAria: "Большая ссылка скопирована",
      openAria: "Открыть большую ссылку в новой вкладке",
      copiedToast: "Ссылка скопирована",
      footerTagline: "Ссылки больше.",
      invalidProtocol: "Укажите полный URL, начинающийся с http:// или https://.",
      invalidUrl: "Похоже, это некорректный URL. Проверьте ссылку и повторите попытку.",
      invalidRedirectCode: "Закодированная ссылка в адресе некорректна.",
      copyFailed: "Не удалось скопировать автоматически. Выделите ссылку и скопируйте вручную.",
    },
    zh: {
      documentTitle: "Taksokrat.ru - 更长链接",
      metaDescription: "Taksokrat.ru 会把链接变成更长的编码 URL。",
      ogDescription: "粘贴 URL，即可获得更长的 Taksokrat.ru 编码链接。",
      brandAria: "Taksokrat.ru 首页",
      languageSwitcherAria: "选择界面语言",
      switchToDark: "切换到深色主题",
      switchToLight: "切换到浅色主题",
      eyebrow: "链接更长。",
      heroTitleStart: "链接太短？",
      heroTitleAccent: "我们把它变长。",
      heroSubtitle: "粘贴 URL，获得更长链接。",
      inputLabel: "要变长的链接",
      inputPlaceholder: "https://example.com/your/link",
      inputHint: "仅支持以 http:// 或 https:// 开头的链接。",
      submitAria: "生成长链接",
      loading: "正在变长...",
      resultLabel: "你的长链接",
      resultRegionAria: "长链接结果",
      copyAria: "复制长链接",
      copiedAria: "长链接已复制",
      openAria: "在新标签页中打开长链接",
      copiedToast: "已复制到剪贴板",
      footerTagline: "链接更长。",
      invalidProtocol: "请输入以 http:// 或 https:// 开头的完整 URL。",
      invalidUrl: "这似乎不是有效的 URL，请检查后重试。",
      invalidRedirectCode: "地址中的编码链接无效。",
      copyFailed: "无法自动复制，请手动选择并复制链接。",
    },
  });

  const ICONS = Object.freeze({
    moon: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        />
      </svg>
    `,
    sun: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    `,
  });

  const elements = {
    languageSwitcher: document.getElementById("languageSwitcher"),
    themeToggle: document.getElementById("themeToggle"),
    form: document.getElementById("expanderForm"),
    panel: document.getElementById("expanderPanel"),
    input: document.getElementById("urlInput"),
    submitButton: document.getElementById("submitButton"),
    formStatus: document.getElementById("formStatus"),
    feedback: document.getElementById("feedback"),
    feedbackText: document.getElementById("feedbackText"),
    resultCard: document.getElementById("resultCard"),
    resultLink: document.getElementById("resultLink"),
    openButton: document.getElementById("openButton"),
    copyButton: document.getElementById("copyButton"),
    toast: document.getElementById("toast"),
    toastText: document.getElementById("toastText"),
    currentYear: document.getElementById("currentYear"),
    descriptionMeta: document.querySelector('meta[name="description"]'),
    ogDescriptionMeta: document.querySelector('meta[property="og:description"]'),
    ogTitleMeta: document.querySelector('meta[property="og:title"]'),
    themeColorMeta: document.querySelector('meta[name="theme-color"]'),
  };

  const state = {
    locale: "en",
    theme: "light",
    busy: false,
    feedbackKey: null,
    resultUrl: "",
    toastTimer: null,
    copyResetTimer: null,
  };

  function storageKey(name) {
    return `${CONFIG.storagePrefix}:${name}`;
  }

  function getStoredValue(name) {
    try {
      return window.localStorage.getItem(storageKey(name));
    } catch {
      return null;
    }
  }

  function setStoredValue(name, value) {
    try {
      window.localStorage.setItem(storageKey(name), value);
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }

  function getLocaleConfig(localeId) {
    return CONFIG.supportedLocales.find(({ id }) => id === localeId) ?? CONFIG.supportedLocales[0];
  }

  function detectInitialLocale() {
    const storedLocale = getStoredValue("locale");
    if (storedLocale && I18N[storedLocale]) return storedLocale;

    const browserLanguage = (navigator.language || "en").toLowerCase();
    if (browserLanguage.startsWith("ru")) return "ru";
    if (browserLanguage.startsWith("zh")) return "zh";
    return "en";
  }

  function detectInitialTheme() {
    const existingTheme = document.documentElement.dataset.theme;
    if (existingTheme === "light" || existingTheme === "dark") return existingTheme;

    const storedTheme = getStoredValue("theme");
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function t(key) {
    return I18N[state.locale]?.[key] ?? I18N.en[key] ?? key;
  }

  function createLanguageSwitcher() {
    const fragment = document.createDocumentFragment();

    for (const locale of CONFIG.supportedLocales) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-button";
      button.dataset.locale = locale.id;
      button.dataset.active = "false";
      button.textContent = locale.label;
      button.title = locale.nativeName;
      button.setAttribute("aria-label", locale.nativeName);
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => applyLocale(locale.id, true));
      fragment.append(button);
    }

    elements.languageSwitcher.replaceChildren(fragment);
  }

  function applyTranslatedAttributes(selector, attributeName, translationKeyAttribute) {
    document.querySelectorAll(selector).forEach((node) => {
      const key = node.getAttribute(translationKeyAttribute);
      if (key) node.setAttribute(attributeName, t(key));
    });
  }

  function applyLocale(localeId, persist = false) {
    if (!I18N[localeId]) return;

    state.locale = localeId;
    const localeConfig = getLocaleConfig(localeId);
    document.documentElement.lang = localeConfig.htmlLang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });

    applyTranslatedAttributes("[data-i18n-placeholder]", "placeholder", "data-i18n-placeholder");
    applyTranslatedAttributes("[data-i18n-aria-label]", "aria-label", "data-i18n-aria-label");
    applyTranslatedAttributes("[data-i18n-title]", "title", "data-i18n-title");

    document.title = t("documentTitle");
    elements.descriptionMeta?.setAttribute("content", t("metaDescription"));
    elements.ogDescriptionMeta?.setAttribute("content", t("ogDescription"));
    elements.ogTitleMeta?.setAttribute("content", t("documentTitle"));

    elements.languageSwitcher.querySelectorAll("[data-locale]").forEach((button) => {
      const isActive = button.dataset.locale === localeId;
      button.dataset.active = String(isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    updateThemeButtonLabel();
    renderStateText();

    if (persist) setStoredValue("locale", localeId);
  }

  function updateThemeButtonLabel() {
    const key = state.theme === "dark" ? "switchToLight" : "switchToDark";
    elements.themeToggle.setAttribute("aria-label", t(key));
    elements.themeToggle.setAttribute("title", t(key));
    elements.themeToggle.innerHTML = state.theme === "dark" ? ICONS.sun : ICONS.moon;
  }

  function applyTheme(theme, persist = false) {
    if (theme !== "light" && theme !== "dark") return;

    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    elements.themeColorMeta?.setAttribute("content", theme === "dark" ? "#090b12" : "#eef3ff");
    updateThemeButtonLabel();

    if (persist) setStoredValue("theme", theme);
  }

  function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark", true);
  }

  function renderStateText() {
    elements.formStatus.textContent = state.busy ? t("loading") : "";

    if (state.feedbackKey) {
      elements.feedbackText.textContent = t(state.feedbackKey);
      elements.feedback.style.display = "";
    }

    if (elements.copyButton.classList.contains("is-copied")) {
      elements.copyButton.setAttribute("aria-label", t("copiedAria"));
      elements.copyButton.setAttribute("title", t("copiedAria"));
    }
  }

  function clearFeedback() {
    state.feedbackKey = null;
    elements.feedback.style.display = "none";
    elements.feedbackText.textContent = "";
  }

  function showFeedback(key, { preserveResult = false } = {}) {
    state.feedbackKey = key;
    elements.feedbackText.textContent = t(key);
    elements.feedback.style.display = "";
    if (!preserveResult) clearResult();
  }

  function clearResult() {
    state.resultUrl = "";
    elements.resultCard.style.display = "none";
    elements.resultLink.textContent = "";
    elements.resultLink.removeAttribute("href");
    elements.openButton.removeAttribute("href");
  }

  function showResult(url) {
    state.resultUrl = url;
    elements.resultLink.textContent = url;
    elements.resultLink.href = url;
    elements.openButton.href = url;
    elements.resultCard.style.display = "";
    resetCopyButton();
  }

  function validateUrl(value) {
    const trimmed = value.trim();

    if (!HTTP_URL_PATTERN.test(trimmed)) {
      return { ok: false, errorKey: "invalidProtocol" };
    }

    try {
      const parsed = new URL(trimmed);
      if (!parsed.hostname || (parsed.protocol !== "http:" && parsed.protocol !== "https:")) {
        return { ok: false, errorKey: "invalidUrl" };
      }
      return { ok: true, value: parsed.href };
    } catch {
      return { ok: false, errorKey: "invalidUrl" };
    }
  }

  function bytesToBinary(bytes) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return binary;
  }

  function encodeBase64Url(value) {
    const bytes = new TextEncoder().encode(value);
    return window
      .btoa(bytesToBinary(bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  function decodeBase64Url(value) {
    if (!value || value.length % 4 === 1 || !BASE64URL_PATTERN.test(value)) return null;

    try {
      const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
      const binary = window.atob(padded);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      return null;
    }
  }

  function buildPublicBiggerUrl(encodedUrl) {
    const result = new URL("/", `${CONFIG.publicOrigin.replace(/\/+$/, "")}/`);
    result.searchParams.set("l", encodedUrl);
    return result.toString();
  }

  function handleSubmit(event) {
    event.preventDefault();

    clearFeedback();
    clearResult();

    const validation = validateUrl(elements.input.value);
    if (!validation.ok) {
      showFeedback(validation.errorKey);
      elements.input.focus();
      return;
    }

    showResult(buildPublicBiggerUrl(encodeBase64Url(validation.value)));
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("COPY_FAILED");
  }

  function showToast() {
    window.clearTimeout(state.toastTimer);
    elements.toastText.textContent = t("copiedToast");
    elements.toast.classList.add("is-visible");
    state.toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 1800);
  }

  function resetCopyButton() {
    window.clearTimeout(state.copyResetTimer);
    elements.copyButton.classList.remove("is-copied");
    elements.copyButton.setAttribute("aria-label", t("copyAria"));
    elements.copyButton.setAttribute("title", t("copyAria"));
  }

  async function handleCopy() {
    if (!state.resultUrl) return;

    try {
      await copyText(state.resultUrl);
      elements.copyButton.classList.add("is-copied");
      elements.copyButton.setAttribute("aria-label", t("copiedAria"));
      elements.copyButton.setAttribute("title", t("copiedAria"));
      showToast();

      window.clearTimeout(state.copyResetTimer);
      state.copyResetTimer = window.setTimeout(resetCopyButton, 2000);
    } catch {
      showFeedback("copyFailed", { preserveResult: true });
      elements.resultLink.focus();
    }
  }

  function showBootError() {
    if (window.__TAKSOKRAT_BOOT_ERROR__) {
      const decoded = decodeBase64Url(new URLSearchParams(window.location.search).get("l") ?? "");
      if (decoded && validateUrl(decoded).ok) return;
      showFeedback(window.__TAKSOKRAT_BOOT_ERROR__);
    }
  }

  function init() {
    createLanguageSwitcher();
    applyTheme(detectInitialTheme());
    applyLocale(detectInitialLocale());
    elements.currentYear.textContent = String(new Date().getFullYear());

    elements.themeToggle.addEventListener("click", toggleTheme);
    elements.form.addEventListener("submit", handleSubmit);
    elements.copyButton.addEventListener("click", handleCopy);

    showBootError();
  }

  init();
})();
