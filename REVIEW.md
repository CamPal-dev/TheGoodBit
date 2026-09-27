# Reference-led preview

The latest preview follows Cam’s supplied visual reference using the existing artwork. The hero reuses the megaphone and star already present in the repository. Every existing image source and every non-empty body text node is retained, verified against the previous version.

`reference.css` is the active standalone stylesheet. The older stylesheets are retained for comparison but are not loaded. Navigation, project-card controls and FAQs retain their JavaScript interactions; the old scroll-reveal library has been removed so content is immediately visible.

The visual changes include a split hero with handwritten emphasis, full-width dark service and work sections, pink pricing and statistics bands, cream supporting sections and rounded navigation. Existing additional content is retained, so the page is longer than the visual reference. No client names, prices, statistics or copy from the reference were introduced.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` and visit http://127.0.0.1:8765/.

The previous personality version is saved locally at `.review/personality.html`. Local screenshots and review snapshots are excluded from Git. Nothing is deployed.

## Validation

- Exact body text-node comparison against the previous version.
- All existing image sources retained.
- Browser checks at 320, 390, 768 and 1440 pixels: horizontal overflow, FAQ state, project controls and Escape, mobile navigation, and JavaScript errors.
- Desktop and mobile visual inspection.

Previously flagged project claims, testimonials, pricing, profile URLs and policy destinations still need the owner’s confirmation before publication.

## September 27 annotated review

Applied the 21 browser notes: removed the trust strip, marquee, mini-service section and approach section; updated the quick-facts label and requested CTA text; removed the specified arrows; standardized eyebrow type and added rotating eyebrow stars; reflowed the process cards with separate arrow tracks; matched pricing underline widths; enlarged FAQ questions and icons with a click-pop animation; replaced FAQ supporting copy with an image placeholder; reused FAQ illustrations for the statistics badges.

Feedback now contains the existing three reviews plus six explicitly labelled placeholder cards, each with a replaceable photo slot. The rail auto-scrolls when visible, offers previous/next and pause controls, pauses on hover/focus and manual interaction, and disables automatic motion for reduced-motion preferences. Duplicate visual cards are hidden from assistive technology.

Additional checks cover autoplay, pause, manual navigation and wrapping, reduced-motion changes, FAQ animation completion, identical eyebrow sizes, removed content, and process-arrow separation at 320/390/768/1041/1440px. Copy outside the specifically requested edits remains unchanged.
