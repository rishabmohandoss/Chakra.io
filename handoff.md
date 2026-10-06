# Chakra.io Project Handoff

This file consolidates Rosalind “Roz” Griffie’s website and product-world instructions, plus the project owner’s implementation preferences, so another agent can continue without reopening the original email PDFs.

## Repository and current state

- Repository: `rishabmohandoss/Chakra.io`
- Production branch: `main`
- Hosting: GitHub Pages at `https://rishabmohandoss.github.io/Chakra.io/`
- Site type: static HTML, CSS, and JavaScript; no build step.
- Current commit when this handoff was written: `f624b9d` (homepage readability and navigation fixes).
- GitHub Pages publishes the project from `main`; pushes there update the public site.
- Keep the `/Chakra.io/` path prefix in asset and internal links. The site is a GitHub Pages project site.

## Brand and company direction from Roz

### Brand line

- **After AI™ / Enabling the Intelligence Continuum**
- **One company. One digital ecosystem. Multiple product worlds within.**

### Company, mission, philosophy, and vision

- **Who we are:** “We develop solutions and technologies designed to ensure intelligent systems operate with integrity wherever and whenever those systems shape people, workforces, organizations, or the communities in which they live.”
- **Mission:** “To ensure intelligent systems operate with integrity whenever and wherever intelligent systems influence people, organizations, workforces, and communities.”
- **Philosophy:** “We believe reliable information must be a foundational property of intelligent systems wherever and whenever system-generated information informs or influences people, organizations, workforces, and communities.”
- **Vision:** “We envision a world where intelligent systems enrich human lived experience—not diminish it.”
- Supporting signature: **Intelligent Systems Operating with Integrity, Trust and Accountability**.
- A later update asked to remove the standalone “Our Vision” section because its language had been incorporated elsewhere. Preserve that instruction; do not restore the standalone section without new direction.

## Site architecture and build sequence

Roz described the corporate website as the “house” and product experiences as distinct worlds within one organized ecosystem.

1. **Phase 1 — Build the house:** finish the Chakra.io corporate website as a complete site that can stand on its own, while establishing stable routes and architecture for future product worlds.
2. **Phase 2 — Build the ROSA world:** ROSA® should become a distinct, immersive environment and should not ultimately feel like a standard corporate page.
3. **Phase 3 — Make the ROSA MVP the destination:** the MVP is ultimately the main attraction inside ROSA; it should be an experience, not a small demo buried in the corporate site.

Planned route architecture:

- `/` — Chakra corporate site (the house)
- `/rosa/` — ROSA® world
- `/rosa/systems-information-readiness/` — Systems Information Readiness™ experience
- `/rosa/runtime/` — Runtime Information Transformation™ experience
- `/rosa/mvp/` — ROSA® MVP destination
- `/hci/` — HCI product world

The routes should remain stable as their experiences develop. ROSA and HCI may have their own visual identities, interaction, and technology; HCI does not need to look like ROSA. Roz cited an immersive custom web application, potentially using WebGL, Three.js, or an equivalent, as a future direction. **Do not build the full immersive ROSA product or functional MVP as part of the corporate-site phase.**

Roz noted that Jordyn Washington is the company tech lead, has already been experimenting with a clickable MVP buildout, and that future ROSA implementation should align with her work. Roz’s email described the MVP as a later phase after the website, with a target of roughly 7–8 weeks; that schedule/payment discussion is planning context, not authorization to start the MVP.

## ROSA consumer-facing story from Roz

Roz supplied this sequence for the ROSA website introduction:

1. ROSA means **Runtime Operations & Systems Analytics**.
2. ROSA detects information arriving from an LLM.
3. The information is attempting to enter a business environment.
4. ROSA intercepts information candidates before they enter the business environment and before they can shape or influence business actions or decisions.
5. ROSA isolates the information candidate, classifies it, assigns identifiers, secures custody, and prepares it for Runtime transformation.
6. ROSA transports source information into Runtime, where it becomes decision-ready information.
7. The information candidate completes intake and custody.
8. ROSA transports the custodied, conditioned candidate to the Runtime Transformation MVP to undergo Systems Information Readiness.
9. The consumer-facing ROSA journey ends at the **ROSA Runtime Systems Information Readiness MVP**.

Roz said to stop at the consumer-facing upfront ROSA website journey for now. The functional MVP build belongs to the next phase.

## Visual and interaction direction from Roz

- Slow the orbital movement down significantly. It should feel like **slow celestial drift, not rotation or spinning**.
- Keep movement subtle, continuous, graceful, and mysterious: the ecosystem should feel alive, but the motion should be noticed gradually rather than immediately.
- Keep the ecosystem motion atmospheric and centered on the Chakra core.
- Maintain distinct product worlds and permanent places for ROSA and HCI in the architecture, even while their full experiences are in development.
- Later website feedback says some letter spacing is too tight: increase horizontal spacing so characters can breathe and align sizing and spacing consistently throughout the site.
- Keep the lime-green emphasis style. Make the three emphasized headline phrases use the same font treatment and alignment.
- The site should work on phones as well as desktop; preserve readable, non-distorted responsive layouts.

### Ecosystem orbit and hierarchy — original company website feedback

- Keep the central Chakra symbol exactly as it is as a placeholder until the official logo is supplied. The intended final mark is the chakra/mandala symbol.
- The orbital diagram should contain six connected celestial elements: **ROSA**, **Human-Computer Interaction (HCI)**, **Decisioning Intelligence**, **Systems Information Readiness™**, **Runtime Information Transformation™**, and **Information Candidate™**.
- Give ROSA, HCI, and Decisioning Intelligence greater prominence as major products/technologies/dimensions. The three foundational elements (Systems Information Readiness, Runtime Information Transformation, and Information Candidate) can be smaller or visually differentiated.
- Add the subtitle **Human-Computer Interaction** to the HCI orbit node. All six bodies belong to one connected universe.

### Hero and ecosystem copy — Website Refinement Requests #3 and #4

- The hero title instruction was to change **“Intelligence”** to **“Information”**, change **“in motion”** to **“Becomes”**, and remove **“in”**. The resulting title is **“Information Becomes”**; retain that wording.
- Use this hero supporting copy from Roz:

  > Chakra.io is built on a very simple belief: intelligent systems should operate with integrity—wherever, whenever, and however systems impact people, workforces, organizations, and the communities they serve.

- In the ecosystem section, use the headline **“One Intra-Connected Ecosystem. Distinct Product worlds.”** and the CTA **“ENTER THE CHAKRA ECOSYSTEM”** (replacing “Meet The Ecosystem”).
- Roz supplied this ecosystem paragraph:

  > Chakra is built on a simple belief: intelligent systems should operate with integrity—wherever, whenever, and however systems impact people, workforces, organizations, and the communities they serve. Across our intra-connected ecosystem, Chakra.io’s products and technologies each have a distinct purpose—while contributing to a shared vision of intelligent systems that enrich the human lived experience.

- Roz allowed editorial discretion if that paragraph makes the section too dense: split it into two sections with another headline, or omit its second sentence.

## Copy and layout change requests from Roz

### Contact section — Website Refinement Request #5

- Remove **“Chakra is building a connected ecosystem for ideas that deserve their own world.”** Roz said to save this phrase for later use.
- Replace the contact subtext with:

  > You’ve entered the Chakra Ecosystem. Now tell us what brought you here.
  >
  > Whether you’re exploring our technologies, building intelligent systems, solving a problem, or imagining what comes next—we’d love to begin the conversation.

- Change the CTA from **“Start A Conversation”** to **“Let’s Connect”**.

### Day 3 Chakra.io Website Updates PDF

- The technology table/list should have four rows total.
- Remove the **Systems Information Readiness** row from that table/list.
- Row 1: **Information Intelligence** — **Before Information Becomes**.
- Row 4: **Decisioning Intelligence** — **The Next Intelligence Domain**.
- Change **“Chapter”** to **“Dimension”** in the referenced headline.
- Replace the marked paragraph with:

  > Advancing a connected product ethosphere in which intelligent technologies inform, influence, and shape people, workplaces, organizations, and communities—so that integrity is built into intelligent systems before human, social, or environmental impacts occur.

- Improve tight font spacing and align font sizing/spacing throughout.
- The referenced three headline treatments should match; keep the lime-green style.
- Remove the marked standalone vision section (“Our Vision”); Roz said the language had been incorporated elsewhere.
- Add a footer row containing **Privacy Statement**, **Copyright Chakra Intelligent Systems, Inc. 2026**, **LinkedIn**, **Blue Sky/Bluesky**, and **YouTube**.
- Include this information-reliability question in the site:

  > Your organization is allowing generated information to flow through intelligent and automated systems to inform consequential actions and decisions. How do you know that information is actually fit to rely upon?

- Two product areas should remain closed and must not open when clicked. In the reference, these are the ROSA and HCI product cards. Keep product entry points non-actionable until Roz says to open them.

### Website Refinement Request #6 — Supported By section

- Add a minimal **SUPPORTED BY** section near the bottom, just above Let’s Connect or the footer.
- It should present institutional supporters with generous whitespace, even alignment and sizing, muted or monochrome treatment where possible, and no heavy borders or extra copy. Keep Chakra’s visual aesthetic.
- The five institutions named by Roz are:
  1. NJEDA
  2. Princeton University Office of Innovation
  3. Rutgers MBS
  4. NJIT
  5. NSF I-Corps
- Roz said she would obtain approval and formal logos from all five before release. The current implementation uses text wordmarks as placeholders. Replace them with supplied, approved logo assets when received; do not invent or download substitute logos.

### Website Refinement Request #6 — Navigation and Information Gap

- Navigation journey: **Chakra.io › The Information Gap › The Information Ecosystem › Technologies › Let’s Connect**.
- Rename the old **Our Approach** tab to **Technologies**.
- Use subtle, lightweight, right-facing chevrons between the navigation items.
- Add a dedicated page or full-page section for **The Information Gap** before **The Information Ecosystem**. Keep it visually consistent with Chakra, but cleaner and more explanatory than the ecosystem section.
- Visitor journey: understand Chakra, then the problem, then the broader information ecosystem, then the technologies, and finally how to engage.
- Explain **The Systems Information Readiness Gap** with this core statement:

  > Organizations increasingly rely on intelligent systems to produce information, inform decisions, and drive outcomes before the organization can determine whether that information is ready to be relied upon.

- Present these three cards and preserve their meaning:
  - **Operational Influence:** Once introduced into the enterprise operational environment, information directly informs and influences downstream decisions, actions, operations, and outcomes.
  - **Unready Information:** Organizations lack an operational mechanism to ready upstream information BEFORE that information is acted upon or shapes and influences downstream business operations.
  - **Consequential Reliance:** When unreadied, deficient information reaches or informs a consequential decision; the failure can become operational, regulatory, evidentiary, financial, or human.
- After explaining the problem, invite the visitor into the Information Ecosystem to see Chakra’s response.

## Project owner preferences and recent implementation notes

These are the website owner’s directions, separate from Roz’s source feedback:

- Keep a video-game influence in the visual design, with animated transitions inspired by landonorris.com.
- The brand symbol should be a chakra/mandala, not a letter C.
- Support both desktop and mobile without distorting the layout.
- The owner most recently said not to prioritize or change the social links yet. The current footer social links may still point to general platform homepages; wait for official profile URLs before changing those destinations.

Recent fixes already pushed to `main` in `f624b9d`:

- Made the marquee static under reduced-motion preference so it cannot stop after one pass; it loops continuously for visitors with normal motion enabled.
- Increased the smallest text sizes and switched to a menu layout at narrower widths.
- Kept the navigation fixed while scrolling and added anchor offset spacing.
- Made reveal content visible by default, using scroll observation only when supported.
- Updated the hero orbit label to Information Intelligence to match its accessible description.
- Disabled homepage ROSA/HCI cards and ROSA destination links so they do not imply that the product experiences are open.

## Current source map

- `index.html` — corporate home, primary navigation, information gap, ecosystem, technology list, supporters, contact, and footer.
- `assets/site.css` — shared corporate styles, mobile rules, typography, motion, and navigation.
- `assets/site.js` — reveal effects, mobile navigation, and ROSA story progress behavior.
- `assets/world.css` — ROSA/HCI and dedicated-world presentation.
- `rosa/index.html` — consumer-facing ROSA story.
- `rosa/systems-information-readiness/index.html`, `rosa/runtime/index.html`, `rosa/mvp/index.html` — stable ROSA routes.
- `hci/index.html` — HCI world route.
- `privacy/index.html` — privacy statement.

## Pending inputs

- Receive approved logo assets and approval for all five supporters before replacing the text wordmarks with official marks.
- Obtain Chakra’s official LinkedIn, Bluesky, and YouTube profile URLs before changing the footer social destinations.
- Keep ROSA/HCI entry points closed until Roz explicitly changes that direction.
- Coordinate any functional ROSA MVP work with Jordyn; it is a separate phase from corporate-site refinements.
