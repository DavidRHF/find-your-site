/* ============================================================
   inquiry-discount.js
   Add this to custom-inquiry.html with ONE line before </body>:
     <script src="inquiry-discount.js" defer></script>

   When someone arrives from the spinner's "Claim it" button
   (custom-inquiry.html?discount=CODE&reward=Label), this:
     1. Shows a friendly banner confirming their reward
     2. Attaches the code to your form so it's included on submit
   No other changes to your page are needed.
   ============================================================ */
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var params = new URLSearchParams(window.location.search);
  var code = params.get("discount");
  var reward = params.get("reward");
  if (!code) return; // no discount in the URL — do nothing

  // 1) Friendly confirmation banner at the top of the page content
  var banner = document.createElement("div");
  banner.setAttribute("role", "status");
  banner.style.cssText =
    "max-width:1140px;margin:16px auto;width:92%;background:#eaf6f4;border:1.5px solid #147d74;" +
    "color:#0f5f58;border-radius:14px;padding:14px 18px;font-family:system-ui,-apple-system,sans-serif;" +
    "display:flex;gap:10px;align-items:center;flex-wrap:wrap;line-height:1.5";
  banner.innerHTML =
    '<strong style="font-size:1.05rem">\uD83C\uDF89 ' +
    (reward ? escapeHtml(reward) : "Discount") +
    " unlocked!</strong>" +
    '<span>Your code <b style="letter-spacing:.05em">' +
    escapeHtml(code) +
    "</b> is attached to this inquiry \u2014 I'll apply it when I reply.</span>";

  var host = document.querySelector("main") || document.body;
  host.insertBefore(banner, host.firstChild);

  // 2) Attach the code to the form so it travels with the submission
  var form = document.querySelector("form");
  if (!form) return;

  // hidden field (captured by Formspree and most form handlers)
  if (!form.querySelector('[name="discount_code"]')) {
    var hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "discount_code";
    hidden.value = code + (reward ? " (" + reward + ")" : "");
    form.appendChild(hidden);
  }

  // if the form already has a discount/promo/code field, fill it
  var field = form.querySelector(
    'input[name*="discount" i],input[name*="promo" i],input[name*="code" i],' +
    'input[id*="discount" i],input[id*="promo" i],input[id*="code" i]'
  );
  if (field) {
    field.value = code;
    return;
  }

  // otherwise, gently prepend a note to the message box if there is one
  var msg = form.querySelector("textarea");
  if (msg && msg.value.indexOf(code) === -1) {
    var note = "Discount code: " + code + (reward ? " (" + reward + ")" : "") + "\n\n";
    msg.value = note + msg.value;
  }
})();
