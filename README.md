# Lumora Living website

A static, no-build website for Lumora (smart home installation, Kosovo): `index.html`, `style.css`, `script.js`. No framework, no dependencies, works as-is on GitHub Pages or Vercel.

## Before you publish

Most of the Gallery section now uses real photos from your German partner's projects (`images/gallery/`): the wall-mounted touch panels, the lighting control screen, and the perimeter cameras. Two extra photos are already in that folder but not yet placed on the page (`camera-corner-2.jpg`, `install-progress-2.jpg`), use them to replace any image below once you have more to choose from.

The hero background and the developer-section aerial shot are still placeholder stock images pulled live from `loremflickr.com`, since neither a lifestyle hero photo nor a real gated-community aerial exists yet. Replace them the same way once you have your own:

1. Put your image file in `images/` (or `images/gallery/`).
2. In `index.html`, swap the relevant `src="..."` for `src="images/your-file.jpg"`.

## Publish on GitHub

1. Create a new repository on GitHub (e.g. `lumora-living`).
2. Push these files to it:
   ```
   git init
   git add .
   git commit -m "Lumora website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/lumora-living.git
   git push -u origin main
   ```
3. In the repo, go to **Settings > Pages**, set **Source** to the `main` branch and `/ (root)` folder, and save.
4. Your site goes live at `https://<your-username>.github.io/lumora-living/` within a minute or two.

## Publish on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New > Project** and import the `lumora-living` repository.
3. Framework preset: choose **Other** (it's a static site, no build step needed). Leave build and output settings blank.
4. Click **Deploy**. Vercel gives you a live `.vercel.app` URL immediately, and you can attach your own domain (e.g. `lumoraliving.com`) under **Settings > Domains** once you own one.

Either host works from the same repository, you don't have to pick just one.

## Making the contact form work

The enquiry form currently just shows a thank-you message in the browser, it doesn't send anywhere yet. The simplest fix once you're on Vercel is a free form backend such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com): create an account, and change the form's opening tag in `index.html` to point at the endpoint they give you, for example:

```html
<form id="enquiryForm" action="https://formspree.io/f/yourFormId" method="POST">
```
