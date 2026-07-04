/* =================================================================
   PROJECT LIFE — Shared interactions
   -----------------------------------------------------------------
   Small behaviours used across pages:
     1. The mobile menu (hamburger) open/close
     2. The contact form (basic validation + confirmation message)

   The FAQ accordion needs NO JavaScript — it uses the native
   <details>/<summary> HTML elements, which open and close on their own.

   Everything runs after the page's HTML is ready. Because the header
   is injected by components.js (also on DOMContentLoaded), we attach
   the menu handler with a tiny delay-free trick: we listen on the
   document, so it works even for the injected button.
   ================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. MOBILE MENU --------------------------------------------
     The hamburger button and the links list are created by
     components.js. We use "event delegation": instead of attaching a
     click handler directly to the button (which may not exist yet),
     we listen on the whole document and check what was clicked. */
  document.addEventListener('click', function (event) {
    const toggle = event.target.closest('.nav__toggle');
    if (!toggle) return;                       // click wasn't the hamburger

    const links = document.getElementById('nav-links');
    if (!links) return;

    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });


  /* ---- 2. CONTACT FORM (Web3Forms email delivery) ----------------
     This lives on the homepage. We find it by id; if it's not on the
     current page, we simply skip the rest of this file. */
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status    = document.getElementById('contact-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  /* Human-readable label for each routing category. We put this into the
     email subject so whoever opens the inbox immediately sees whether the
     message is for the lawyer, the doctor, or the general team. */
  const categoryLabels = {
    lawyer: 'Իրավաբան',
    doctor: 'Բժիշկ',
    team:   'Թիմ'
  };

  /* Small helper to show a coloured status line on the dark contact
     background: 'note' = neutral, 'ok' = success, 'err' = problem. */
  function showStatus(text, kind) {
    status.textContent = text;
    status.style.color =
      kind === 'ok'  ? '#157347' :   // readable green on cream
      kind === 'err' ? '#c0392b' :   // readable red on cream
                       '';            // default muted (from the stylesheet)
  }

  /* We mark the handler "async" so we can use "await" below — that lets us
     write the network call top-to-bottom instead of nesting callbacks. */
  form.addEventListener('submit', async function (event) {
    event.preventDefault();   // stop the browser's default page reload

    // Read the values the user typed.
    const name     = form.querySelector('[name="name"]').value.trim();
    const email    = form.querySelector('[name="email"]').value.trim();
    const message  = form.querySelector('[name="message"]').value.trim();
    const category = form.querySelector('[name="category"]:checked');

    // Basic checks, with messages written for the user (not jargon).
    if (!category) {
      showStatus('Խնդրում ենք ընտրել, թե ում եք հասցեագրում հաղորդագրությունը։', 'err');
      return;
    }
    if (!name || !email || !message) {
      showStatus('Խնդրում ենք լրացնել բոլոր դաշտերը։', 'err');
      return;
    }

    /* FormData automatically collects every field that has a name="" —
       including the hidden access_key and the spam honeypot. We then add
       three extra fields that make the email nicer to receive. */
    const formData = new FormData(form);
    formData.set('subject',   'Նոր հաղորդագրություն (' + categoryLabels[category.value] + ') — Project LIFE');
    formData.set('from_name', 'Project LIFE կայք');
    formData.set('replyto',   email);   // so "Reply" in Gmail goes to the visitor

    // While the message is on its way, lock the button and reassure the user.
    submitBtn.disabled = true;
    showStatus('Ուղարկվում է...', 'note');

    /* try/catch handles two different things:
         - the "try" runs the network request and reads the reply
         - the "catch" runs only if the request itself fails (no internet) */
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();   // Web3Forms answers in JSON

      if (result.success) {
        showStatus('Շնորհակալություն։ Ձեր հաղորդագրությունն ուղարկվեց։', 'ok');
        form.reset();
      } else {
        showStatus('Կներեք, ուղարկման ընթացքում սխալ տեղի ունեցավ։ Խնդրում ենք փորձել կրկին։', 'err');
      }
    } catch (error) {
      showStatus('Կապի խնդիր կա։ Ստուգեք ինտերնետ կապը և փորձեք կրկին։', 'err');
    } finally {
      // "finally" always runs — success or failure — so the button never
      // stays stuck on "disabled".
      submitBtn.disabled = false;
    }
  });
});
