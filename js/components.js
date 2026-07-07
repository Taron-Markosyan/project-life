/* =================================================================
   PROJECT LIFE — Shared components (header + footer), multilingual
   -----------------------------------------------------------------
   This file is shared by every page, in every language folder
   (root = Armenian, /en/ = English, /ru/ = Russian). It detects which
   language folder the current page lives in from the URL, and shows
   the matching nav/footer text automatically — no need for a separate
   copy of this file per language.
   ================================================================= */

/* Figures out the current language and how many folders deep we are
   (root = 0, /en/ or /ru/ = 1), purely from the URL. This is also how
   we know whether asset paths need an extra "../" in front. */
function getLangInfo() {
  const path = window.location.pathname;
  const inEn = /\/en\//.test(path);
  return {
    lang: inEn ? 'en' : 'hy',
    prefix: inEn ? '../' : ''
  };
}

function brandLogo(prefix) {
  return `<img src="${prefix}assets/images/logo.png" alt="Project LIFE">`;
}

/* Navigation links, per language. Nav labels stay SHORT on purpose
   (space is tight in the header) even though the same tools are
   referred to by their full name elsewhere on each page. */
const NAV_LINKS = {
  hy: [
    { label: 'Project LIFE-ի մասին', href: 'index.html#about' },
    { label: 'Տիպ 1 շաքարային դիաբետ', href: 'index.html#type1' },
    { label: 'Հաշվիչ', href: 'calculator.html' },
    { label: 'Օրագիր', href: 'diary.html' },
    { label: 'Հետադարձ կապ', href: 'index.html#contact' },
  ],
  en: [
    { label: 'About Project LIFE', href: 'index.html#about' },
    { label: 'Type 1 Diabetes', href: 'index.html#type1' },
    { label: 'Calculator', href: 'calculator.html' },
    { label: 'Diary', href: 'diary.html' },
    { label: 'Contact', href: 'index.html#contact' },
  ],
};

const NAV_ARIA_LABEL = { hy: 'Գլխավոր նավիգացիա', en: 'Main navigation' };
const NAV_TOGGLE_LABEL = { hy: 'Բացել մենյուն', en: 'Open menu' };
const LANG_TOGGLE_LABEL = { hy: 'Ընտրել լեզուն', en: 'Choose language' };
const LANG_CODE = { hy: 'ՀԱՅ', en: 'EN' };

/* Builds the header HTML for the current page's language. `activePage`
   is the current filename so we can mark the matching link as active. */
function renderHeader(activePage) {
  const { lang, prefix } = getLangInfo();
  const links = NAV_LINKS[lang].map(function (link) {
    const isActive = link.href === activePage ? ' aria-current="page"' : '';
    return `<li><a href="${link.href}"${isActive}>${link.label}</a></li>`;
  }).join('');

  return `
    <header class="site-header">
      <nav class="nav container" aria-label="${NAV_ARIA_LABEL[lang]}">
        <a class="nav__brand" href="index.html">
          ${brandLogo(prefix)}
          <span>Project LIFE</span>
        </a>

        <button class="nav__toggle" aria-label="${NAV_TOGGLE_LABEL[lang]}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav__links" id="nav-links">
          ${links}
        </ul>

        <div class="nav__lang">
          <button class="nav__lang-toggle" aria-label="${LANG_TOGGLE_LABEL[lang]}" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="12" cy="12" r="9"/>
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
            </svg>
            <span class="nav__lang-code">${LANG_CODE[lang]}</span>
          </button>
          <ul class="nav__lang-menu">
            <li><a data-lang="hy" href="#">Հայերեն</a></li>
            <li><a data-lang="en" href="#">English</a></li>
          </ul>
        </div>
      </nav>
    </header>`;
}

/* Footer text, per language. */
const FOOTER_TXT = {
  hy: {
    site: 'Կայք',
    about: 'Project LIFE-ի մասին',
    legal: 'Իրավաբանական աջակցություն',
    type1: 'Տիպ 1 շաքարային դիաբետ',
    programs: 'Պետական աջակցության ծրագրեր',
    tools: 'Գործիքներ',
    doctor: 'Կապ Էնդոկրինոլոգ-խորհրդատուի հետ',
    calc: 'Հացային միավորների հաշվիչ',
    diary: 'Գլյուկոզի մոնիթորինգի օրագիր',
    contact: 'Հետադարձ կապ',
    disclaimer: 'Այս կայքէջը ստեղծվել և թարմացվել է Եվրոպական միության ֆինանսական աջակցությամբ։ Բովանդակության համար պատասխանատվություն է կրում Project LIFE կազմակերպությունը, և պարտադիր չէ, որ այն արտահայտի Եվրոպական միության տեսակետները։',
    rights: '© 2026 Բոլոր իրավունքները պաշտպանված են',
  },
  en: {
    site: 'Site',
    about: 'About Project LIFE',
    legal: 'Legal Support',
    type1: 'Type 1 Diabetes',
    programs: 'State Support Programs',
    tools: 'Tools',
    doctor: 'Contact a Doctor',
    calc: 'Bread Unit Calculator',
    diary: 'Glucose Monitoring Diary',
    contact: 'Contact',
    disclaimer: 'This website was created and is maintained with the financial support of the European Union. Project LIFE is responsible for the content, which does not necessarily reflect the views of the European Union.',
    rights: '© 2026 All rights reserved',
  },
};

function renderFooter() {
  const { lang, prefix } = getLangInfo();
  const t = FOOTER_TXT[lang];

  const phoneIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>`;
  const mailIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`;
  const fbIcon    = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>`;
  const igIcon    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>`;

  return `
    <footer class="site-footer">
      <div class="container footer__grid">

        <div class="footer__brand">
          <div class="footer__logo">
            ${brandLogo(prefix)}
            <span>Project LIFE</span>
          </div>
          <ul class="footer__contact">
            <li><span class="footer__ic">${phoneIcon}</span><span>+374 94 452606</span></li>
            <li><span class="footer__ic">${mailIcon}</span><span>info.projectlife.am@gmail.com</span></li>
          </ul>
          <div class="footer__social">
            <a href="https://www.facebook.com/profile.php?id=61586642500205" aria-label="Facebook" target="_blank" rel="noopener">${fbIcon}</a>
            <a href="https://www.instagram.com/projectlife.am?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" target="_blank" rel="noopener">${igIcon}</a>
          </div>
        </div>

        <div class="footer__col">
          <h4>${t.site}</h4>
          <ul>
            <li><a href="about.html">${t.about}</a></li>
            <li><a href="legal-support.html">${t.legal}</a></li>
            <li><a href="index.html#type1">${t.type1}</a></li>
            <li><a href="index.html#programs">${t.programs}</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>${t.tools}</h4>
          <ul>
            <li><a href="doctor-contact.html">${t.doctor}</a></li>
            <li><a href="calculator.html">${t.calc}</a></li>
            <li><a href="diary.html">${t.diary}</a></li>
            <li><a href="index.html#contact">${t.contact}</a></li>
          </ul>
        </div>

      </div>

      <div class="container footer__bottom">
        <p>${t.disclaimer}</p>
        <p style="margin-top:12px">${t.rights}</p>
      </div>
    </footer>`;
}

/* ---- Language switcher: marks the current language active in the
   dropdown, and rewrites the other two links to the same filename in
   their language folder, so switching keeps you on the same page. */
function initLangSwitcher() {
  const toggle = document.querySelector('.nav__lang-toggle');
  const menu = document.querySelector('.nav__lang-menu');
  if (!toggle || !menu) return;

  const { lang, prefix } = getLangInfo();
  const filename = window.location.pathname.split('/').pop() || 'index.html';

  menu.querySelectorAll('a').forEach(function (link) {
    const linkLang = link.dataset.lang;
    if (linkLang === lang) link.setAttribute('aria-current', 'page');
    const href = linkLang === 'hy' ? prefix + filename : prefix + linkLang + '/' + filename;
    link.setAttribute('href', href);
  });

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__lang')) menu.classList.remove('is-open');
  });
}

/* ---- Wire everything up when the page loads --------------------
   Each page sets `window.ACTIVE_PAGE` (its own filename) before this
   script runs, so the right nav link gets highlighted. */
document.addEventListener('DOMContentLoaded', function () {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) headerSlot.innerHTML = renderHeader(window.ACTIVE_PAGE || '');
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  initLangSwitcher();
});
