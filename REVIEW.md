# Website refinement preview

This branch implements the type-first direction (concept C). It is a local review version; it has not been deployed.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. No build step is required.

## Changes

- A shorter, centred hero identifies The Good Bit as a small digital marketing studio.
- Studio copy uses first person. Third-party testimonial quotations remain verbatim.
- Selected projects appear immediately after the hero. Four additional projects are available through an expander.
- Repeated service summaries and decorative interludes have been removed.
- A consolidated stylesheet owns typography, spacing, colours and responsive layouts.
- Native project and FAQ disclosures work with keyboard input and without JavaScript.
- Navigation closes on Escape, outside click, link selection and viewport changes.
- Automatic scrolling and GSAP reveals have been removed. Smooth anchor scrolling respects reduced-motion settings.
- Contact actions describe the existing email destination accurately.
- Optimized WebP derivatives, image dimensions and lazy loading reduce image transfer and layout movement. Original assets are retained.
- Empty social links and nonfunctional legal navigation have been omitted.

## Content for Cam to verify before publishing

These are existing content claims, not independently verified facts:

- Each project name, description and contribution, especially the Orbit Labs and Kin & Kind entries, which have no images in the original source.
- Testimonials attributed to Maya Lee, Jordan Pierce and Riley Chen.
- £1,500 project pricing, £3,000 monthly pricing, included deliverables and the “Most popular” claim.
- Experience, project-count and language claims in the About section.
- Instagram, LinkedIn and Upwork profile URLs to restore in the footer.
- Any intended booking-calendar URL. Contact currently uses cam@thegoodbit.studio.
- Any real privacy or terms pages to link. The original footer contained plain text rather than working policy links.

## Verification

Browser checks cover widths of 320, 390, 768, 1024 and 1440 pixels, horizontal overflow, mobile menu states, Escape focus restoration, keyboard disclosure interaction, additional projects, internal anchor targets, image loading, reduced-motion behaviour, and navigation/FAQ use with JavaScript disabled. Desktop and mobile screenshots are inspected separately.

Local milestone previews and screenshots are stored under `.review/`, excluded from Git. Step 1 shows the hero within the previous styling. Step 2 shows the page layout before final asset and content checks. The root page is the latest version.
