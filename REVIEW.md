# Website refinement preview

The current version restores the original colours, pink background, collage details, cards, and section order following Cam’s feedback. The earlier editorial redesign is superseded.

The hero retains the concise first-person introduction and centred composition, with heavy sans-serif headings and the original marker treatment. `styles.css` is restored from the original site; `refinements.css` contains the focused changes so they can be reviewed separately.

## Retained fixes

- First-person studio copy and a clear small digital marketing studio description.
- Optimized artwork where compatible with the original layout; original logos retained for their existing CSS cropping.
- Keyboard-operable project flip controls, FAQ expanded states, and Escape to close the mobile menu.
- No automatic testimonial scrolling; reduced-motion support.
- Honest email contact labels; empty social and legal links omitted.

## Preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` and open http://127.0.0.1:8765/.

Local visual milestones under `.review/` preserve the previous designs for comparison. They are excluded from Git. Nothing has been published.

## Still to confirm

Project descriptions and contributions, testimonials, pricing and deliverables, experience statistics, social profile URLs, any booking-calendar URL, and any real policy-page URLs remain subject to Cam’s confirmation.

The original stylesheet still contains overlapping rules. Further cleanup should preserve its rendered appearance and proceed component by component, rather than replacing the design system.
