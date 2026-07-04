/* =================================================================
   PROJECT LIFE — Shared components (header + footer)
   -----------------------------------------------------------------
   WHY THIS FILE EXISTS
   The header and footer are identical on every page. Instead of
   copy-pasting that HTML into index.html, about.html, calculator.html…
   (and then having to fix all of them whenever a link changes), we
   write the HTML ONCE here as JavaScript functions, and inject it into
   a placeholder on each page.

   This is the same idea as a reusable method or class in Java:
   define the behaviour once, call it wherever you need it.

   HOW EACH PAGE USES IT
   A page only needs two empty placeholders:
       <div id="site-header"></div>   <!-- at the top -->
       <div id="site-footer"></div>   <!-- at the bottom -->
   …and to load this script. The code at the bottom fills them in.

   The `activePage` argument lets the current page highlight its own
   link in the nav (the little underline). Pass the page's filename.
   ================================================================= */


/* The brand mark (blood drop + heart) as an image file. We keep it in
   one constant and reuse it in both the header and the footer. */
const BRAND_LOGO = `<img src="assets/images/logo.png" alt="Project LIFE">`;

/* The navigation links. Defined as data (an array) so the list is easy
   to edit in one place. `label` is shown to the user; `href` is the page. */
const NAV_LINKS = [
  { label: 'Project LIFE-ի մասին', href: 'index.html#about' },
  { label: 'Տիպ 1 շաքարային դիաբետ',   href: 'index.html#type1' },
  { label: 'Հաշվիչ',                    href: 'calculator.html' },
  { label: 'Օրագիր',                    href: 'diary.html' },
  { label: 'Հետադարձ կապ',              href: 'index.html#contact' },
];


/* Builds the header HTML. `activePage` is the current filename so we
   can mark the matching link as the active one. */
function renderHeader(activePage) {
  // Turn the NAV_LINKS array into <li> items.
  const links = NAV_LINKS.map(function (link) {
    const isActive = link.href === activePage ? ' aria-current="page"' : '';
    return `<li><a href="${link.href}"${isActive}>${link.label}</a></li>`;
  }).join('');

  return `
    <header class="site-header">
      <nav class="nav container" aria-label="Գլխավոր նավիգացիա">
        <a class="nav__brand" href="index.html">
          ${BRAND_LOGO}
          <span>Project LIFE</span>
        </a>

        <button class="nav__toggle" aria-label="Բացել մենյուն" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav__links" id="nav-links">
          ${links}
        </ul>
      </nav>
    </header>`;
}


/* Builds the footer HTML — contact details, social icons, quick links
   and the EU funding disclaimer. */
function renderFooter() {
  // Small inline icons so we don't depend on an icon library.
  const phoneIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>`;
  const mailIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`;
  const fbIcon    = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>`;
  const igIcon    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>`;

  return `
    <footer class="site-footer">
      <div class="container footer__grid">

        <div class="footer__brand">
          <div class="footer__logo">
            ${BRAND_LOGO}
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
          <h4>Կայք</h4>
          <ul>
            <li><a href="about.html">Project LIFE-ի մասին</a></li>
            <li><a href="legal-support.html">Իրավաբանական աջակցություն</a></li>
            <li><a href="index.html#type1">Տիպ 1 շաքարային դիաբետ</a></li>
            <li><a href="index.html#programs">Պետական աջակցության ծրագրեր</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Գործիքներ</h4>
          <ul>
            <li><a href="doctor-contact.html">Կապ բժշկի հետ</a></li>
            <li><a href="calculator.html">Հացային միավորների հաշվիչ</a></li>
            <li><a href="diary.html">Գլյուկոզի մոնիթորինգի օրագիր</a></li>
            <li><a href="index.html#contact">Հետադարձ կապ</a></li>
          </ul>
        </div>

      </div>

      <div class="container footer__bottom">
        <p>Այս կայքէջը ստեղծվել և թարմացվել է Եվրոպական միության ֆինանսական աջակցությամբ։
           Բովանդակության համար պատասխանատվություն է կրում Project LIFE կազմակերպությունը, և
           պարտադիր չէ, որ այն արտահայտի Եվրոպական միության տեսակետները։</p>
        <p style="margin-top:12px">© 2026 Բոլոր իրավունքները պաշտպանված են</p>
      </div>
    </footer>`;
}


/* ---- Wire everything up when the page loads --------------------
   Each page sets `window.ACTIVE_PAGE` (its own filename) before this
   script runs, so the right nav link gets highlighted. */
document.addEventListener('DOMContentLoaded', function () {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) headerSlot.innerHTML = renderHeader(window.ACTIVE_PAGE || '');
  if (footerSlot) footerSlot.innerHTML = renderFooter();
});
