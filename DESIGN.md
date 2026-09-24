---
name: Sotardoc
description: Enterprise IT Solutions & Engineering Agency
colors:
  primary: "#ffffff"
  primary-hover: "#e5e5e5"
  neutral-bg: "#080808"
  surface-card: "#0d0d0d"
  surface-elevated: "#18181b"
  border-subtle: "#27272a"
  border-hover: "#3f3f46"
  text-primary: "#ffffff"
  text-muted: "#a1a1aa"
  accent-neural: "#34d399"
  accent-telemetry: "#22d3ee"
  accent-design: "#a78bfa"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  card-project:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: Sotardoc

## Overview

**Creative North Star: "The Precision Foundry"**

Sotardoc's design system embodies razor-sharp clarity, structural monochrome surfaces, and measured engineering rigor. Rooted in deep black obsidian tones, crisp 1-pixel borders, and subtle technical grid coordinates, it projects enterprise-grade credibility rather than consumer novelty. Every element communicates reliability, architectural discipline, and technological gravitas.

The visual atmosphere is deliberately restrained. Surfaces step gently outward through subtle shifts in luminance—from an obsidian canvas (#080808) to carbon cards (#0D0D0D) and elevated preview viewports (#18181B). Interactive elements respond with tactile precision: subtle magnetic lifts, deliberate border illumination, and calm ambient white glows that confirm action without visual hysteria.

**Key Characteristics:**
- **Obsidian Architectural Layering:** Depth is conveyed through precise luminance steps and delicate borders rather than heavy blur shadows.
- **Monochromatic Primacy:** 95%+ of all surfaces remain stark black, carbon, and white; color is strictly reserved for live telemetry, model states, and category pills.
- **Engineered Typography:** Technical headings in Inter paired with scannable, high-legibility body prose in Roboto and monospace telemetry tags.
- **Deliberate Restraint:** High-density information delivered with calm spatial rhythm and zero visual bloat.

## Colors

The palette is anchored by a high-contrast monochromatic core, punctuated strictly by functional category telemetry accents.

### Primary
- **Stark Signal White** (#ffffff): High-contrast primary action fills, main headings, and illuminated border states.
- **Stark Signal White Hover** (#e5e5e5): Subtle dimmed state on primary interactive elements.

### Secondary
- **Neural Emerald** (#34d399): Live system status and AI / Machine Learning category indicators.
- **Telemetry Cyan** (#22d3ee): Cloud infrastructure, microservices, and network architecture indicators.

### Tertiary
- **Design Violet** (#a78bfa): UI/UX design systems, prototyping, and mobile interface indicators.

### Neutral
- **Obsidian Void** (#080808): Canvas background; deep, light-absorbent black foundation.
- **Carbon Surface** (#0d0d0d): Resting card and container background.
- **Elevated Slate** (#18181b): Inset media viewports and graphic preview backdrops.
- **Subtle Boundary** (#27272a): 1px structural borders and division rules.
- **Illuminated Boundary** (#3f3f46): Hovered card outlines and focused boundary states.
- **Signal Muted** (#a1a1aa): Secondary descriptions, explanatory paragraphs, and disabled text.

### Named Rules
**The Monochromatic Authority Rule.** Over 95% of any viewport must consist exclusively of black, carbon, gray, and white. Saturated chromatic accents (Emerald, Cyan, Violet) are strictly forbidden on large backgrounds, banners, or decorative flourishes; they belong only to functional status indicators and category pill badges.

**The Ghost Border Fallback Rule.** Every dark container resting against the canvas must possess a 1px border (#27272A). Pure edge-blending without a boundary is disallowed.

## Typography

**Display Font:** Inter, sans-serif (system-ui fallback)
**Body Font:** Roboto, sans-serif (system-ui fallback)
**Label/Mono Font:** ui-monospace, SFMono-Regular, monospace

**Character:** Technical, confident, and crisp. Inter delivers clean structural authority in headings, while Roboto provides effortless editorial flow for enterprise case studies.

### Hierarchy
- **Display** (weight: 600, size: clamp(2rem, 5vw, 3.5rem), line-height: 1.15): Hero titles and page landmark statements with tight tracking (-0.02em).
- **Headline** (weight: 500, size: clamp(1.75rem, 3vw, 2.25rem), line-height: 1.25): Major section titles ("Proyek Utama Kami", "Hubungi Kami").
- **Title** (weight: 500, size: 1.25rem (20px), line-height: 1.4): Project card titles and modal headers.
- **Body** (weight: 400, size: 0.875rem (14px), line-height: 1.6): Case study descriptions, value propositions, and form copy; comfortable reading measure (60–75ch).
- **Label** (weight: 600, size: 0.75rem (12px), line-height: 1.4, uppercase, letter-spacing: 0.08em): Navigation links, button labels, and section badges.
- **Telemetry / Mono** (weight: 400, size: 0.6875rem (11px), line-height: 1.2, letter-spacing: 0.05em): Client tags, version stamps, and live model status readouts.

### Named Rules
**The Technical Label Rule.** All navigational labels, action triggers, and eyebrow badges must use uppercase styling with positive letter-spacing (0.05em to 0.08em) to maintain crisp scannability across dense layouts.

## Layout

The spatial model relies on a central container architecture flanked by a subtle 40px grid matrix.

- **Primary Container:** Centered column bounded at `max-w-7xl` (1280px) with 24px (`px-6`) mobile gutters.
- **Grid Structure:** Modular 3-column project grid on desktop (1024px+), responsive 2-column tablet grid (768px), and single-column mobile view with 32px (`gap-8`) gutters.
- **Section Rhythm:** Predictable macro spacing; major sections are separated by 80px to 96px (`py-20` / `mt-24`) vertical buffers.
- **Coordinate Matrix:** A 40px × 40px subtle linear grid pattern (`linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)`) underlays the viewport to establish an engineering workbench canvas.

## Elevation & Depth

Sotardoc avoids artificial drop shadows. Surfaces communicate z-index and elevation through luminance stepping, border transitions, and diffused ambient illumination.

### Shadow Vocabulary
- **Ambient Header Glow** (`0 0 18px rgba(255,255,255,0.12)` to `0 0 30px rgba(255,255,255,0.28)`): Reserved for pulsing CTA interaction cues.
- **Hover Card Lift** (`box-shadow: 0 12px 32px rgba(255, 255, 255, 0.06)`): Micro-glow accompanying the -2px translateY card hover interaction.
- **Radial Zenith Glow** (`radial-gradient from white/[0.06] to transparent blur-3xl`): Fixed ambient lighting positioned at the top zenith of the viewport.

### Named Rules
**The Luminance Stacking Rule.** Never convey elevation purely with drop shadows. A higher layer must physically step up in surface luminance (#080808 canvas → #0D0D0D card container → #18181B inner asset well) before applying any ambient glow.

## Shapes

- **Form Language:** Clean, disciplined rectangular geometry softened by balanced rounded corners.
- **Corner Radii:**
  - Micro / Badges (`rounded-md`, 6px): CTA buttons and small tags.
  - Inset Wells / Inputs (`rounded-lg`, 8px): Media containers, input boxes, and textareas.
  - Structural Cards (`rounded-xl`, 12px): Project cards and form enclosures.
  - Continuous Pills (`rounded-full`, 9999px): Category filter buttons and status chips.
- **Borders:** Crisp 1px solid boundaries throughout (`borderDark: #27272A`), expanding to animated gradient border frames on high-priority conversion cards.

## Components

### Buttons
Interactive triggers engineered with high contrast and tactile responsiveness.
- **Shape:** 6px radius (`rounded-md`) for primary CTA, 8px radius (`rounded-lg`) for card action triggers.
- **Primary CTA:** Solid Stark White background (#FFFFFF), Obsidian text (#080808), uppercase text-xs (12px), tracking: 0.08em, padding: 10px 20px. Magnetic hover scale (1.03x) with glowing pulse.
- **Outline Button:** Transparent background, 1px white border (rgba(255,255,255,0.8)), stark white text. Hover state inverts sharply to solid white background with black text.

### Chips & Filter Pills
Pill-shaped selectors for category sorting and tech stack tags.
- **Filter Pills:** `rounded-full` (9999px), padding: 6px 16px. Inactive state is carbon background (#171717) with gray border (#374151) and muted text (#A1A1AA); active state inverts to solid white (#FFFFFF) with black text.
- **Stack Pills:** Small `rounded-full` pills (2px 10px), dark neutral surface with subtle gray border; non-interactive metadata tokens.

### Cards / Containers
- **Corner Style:** 12px radius (`rounded-xl`).
- **Background:** Carbon Surface (#0D0D0D).
- **Border:** 1px solid #27272A resting; illuminates to #3F3F46 on hover.
- **Internal Padding:** 24px (`p-6`).
- **Hover Reaction:** -8px vertical translation with diffuse white ambient shadow (`rgba(255,255,255,0.06)`).

### Inputs / Fields
- **Style:** Neutral dark background (#171717), 1px border (#374151), 8px radius (`rounded-lg`), padding: 12px 16px, white typography.
- **Focus:** Sharp border shift to pure white (#FFFFFF) with 1px focus ring.
- **Floating Labels:** Uppercase text-xs (12px), bold tracking (0.05em), light gray (#D1D5DB).

### Navigation
- **Style:** Fixed top header with 20px height, backdrop blur (blur-md) with 85% obsidian fill (`#080808/85`), bounded by a subtle bottom border (`#27272A/60`).
- **Links:** Horizontal link group with dynamic hover underline draw (expanding white 1px line from 0% to 100% width).

## Do's and Don'ts

### Do:
- **Do** preserve the stark monochromatic balance: let black, carbon, and white carry the interface weight.
- **Do** wrap every elevated surface in a crisp 1px border (#27272A).
- **Do** use uppercase typography with tracking (+0.05em to +0.08em) on all small metadata, labels, and action verbs.
- **Do** restrict status accent dots (Emerald, Cyan, Violet) to functional categorization and live indicators.
- **Do** use subtle, physics-based micro-interactions (magnetic button scaling, 1px underline transitions).

### Don't:
- **Don't** introduce saturated background gradients, rainbow hero glows, or generic purple SaaS palettes.
- **Don't** use bubbly, exaggerated border-radii (>16px on structural cards) or playful cartoonish assets.
- **Don't** float dark cards over dark backgrounds without a 1px boundary stroke.
- **Don't** apply colored text to headings or large body copy; all primary text must remain white (#FFFFFF) or high-contrast gray (#A1A1AA).
- **Don't** use heavy skeuomorphic drop shadows; depth must be built with luminance stepping and faint ambient blurs.
