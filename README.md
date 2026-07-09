# Find-Your-Site — Games & Spinner (drop-in files)

Three files, plus this README. Everything goes in the **root** of your repo
(the same folder as index.html).

## 1. leads-game.html  → replace the existing one
The fishing-for-leads game. Click fish to hook mock leads into the sidebar;
catch 5 to finish. Just overwrite your current leads-game.html.

## 2. discount-spinner.html  → replace the existing one
The discount wheel. Spins fast then slows to a stop on the prize, then shows
the code and a "Claim it" button that carries the code to your inquiry page.
Just overwrite your current discount-spinner.html.

- To change the prizes, edit the `SEGMENTS` list near the top of the <script>
  (label, description, code, color, and weight — higher weight = more common).

## 3. inquiry-discount.js  → NEW file, add it
Add this file, then add ONE line to custom-inquiry.html, right before </body>:

    <script src="inquiry-discount.js" defer></script>

When a visitor clicks "Claim it" after winning, this shows a confirmation
banner on the inquiry page and attaches the discount code to your form so it
arrives with their message.

## Good to know
- These are static pages, so discounts are honor-system: the code travels to
  you with the inquiry and you apply it when you reply.
- All three share a warm teal + amber style. If your site uses different brand
  colors, edit the `:root` variables at the top of each HTML file to match.
