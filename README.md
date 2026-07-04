# Project LIFE — Website

Non-profit information & support platform for people living with diabetes.
Static site (HTML / CSS / JavaScript), ready to host on Netlify, Vercel, or GitHub Pages.

## Folder structure

```
project-life/
├── index.html                    ← Homepage (DONE)
├── about.html                    ← About page (DONE)
│
├── legal-support.html            ← stub, content coming next
├── type1.html                    ← stub
├── calculator.html               ← stub (interactive tool)
├── diary.html                    ← stub (interactive tool)
├── doctor-contact.html           ← stub
├── article-what-is-type1.html    ← stub
├── article-managing-type1.html   ← stub
├── article-nutrition.html        ← stub
│
├── css/
│   └── styles.css                ← ALL styling for ALL pages (one file)
│
└── js/
    ├── components.js             ← header + footer, injected on every page
    └── main.js                   ← mobile menu + contact form
```

## The two ideas that keep this organised

1. **One stylesheet, design tokens at the top.** All colours, fonts and sizes
   are named once at the top of `css/styles.css` (the `:root { --navy: … }`
   block). Use `var(--navy)` everywhere else. Change a value once → it updates
   site-wide. Same principle as a constant in Java.

2. **Header & footer written once.** They live in `js/components.js` and are
   injected into every page. You never copy-paste them. Change a nav link in
   that one file → every page updates. Same principle as a reusable method.

## How a page is built

Every page is the same skeleton:

```html
<head> … loads css/styles.css and the fonts … </head>
<body>
  <div id="site-header"></div>   <!-- header drops in here -->
  <main> … the page's own content … </main>
  <div id="site-footer"></div>   <!-- footer drops in here -->

  <script>window.ACTIVE_PAGE = 'thispage.html';</script>  <!-- highlights nav -->
  <script src="js/components.js"></script>
  <script src="js/main.js"></script>
</body>
```

To build a new page: copy an existing one, change the `<main>` content and the
`ACTIVE_PAGE` value. That's it.

## Running it locally

Because the header/footer load via JavaScript, open the site through a tiny
local server (not by double-clicking the file). With VS Code, the **Live Server**
extension is the easiest: right-click `index.html` → "Open with Live Server".

Or from a terminal in this folder:
```
python -m http.server 8000
```
then visit http://localhost:8000

## Deploying

It's a static site, so any of these work with zero configuration:
- **Netlify** — drag the folder onto the dashboard, done.
- **Vercel** — import the folder / git repo.
- **GitHub Pages** — push to a repo, enable Pages.

## Notes

- Images in the design are placeholders. Drop real files into an `assets/`
  folder and replace the placeholder `<div>`s / SVG logo when ready.
- The contact form validates input but doesn't send email yet — static hosts
  can't send mail alone. Connect a free service (Formspree or Netlify Forms)
  when you're ready. See the comment in `js/main.js`.
```
