---
name: The Beatles Duo
description: Nocturnal Dark Editorial design system (Iteración 2) with pitch-black ground (#050505), 1px hairlines, and exclusive Luminous Amber (#f58216)
colors:
  amber-primary: "#f58216"
  amber-bright: "#ff9838"
  obsidian-bg: "#050505"
  elevated-bg: "#0a0a0a"
  row-hover-bg: "#0f0e0c"
  ivory-ink: "#f6f4f0"
  parchment-ink: "#d6d2c9"
  silver-ink: "#9a958d"
  ash-ink: "#625e57"
typography:
  display:
    fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(3.25rem, 11vw, 6.2rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.1rem, 5.5vw, 3.35rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.55rem, 3.6vw, 2.05rem)"
    fontWeight: 600
    lineHeight: 1
  body:
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(0.88rem, 1.9vw, 1rem)"
    fontWeight: 300
    lineHeight: 1.75
  label:
    fontFamily: "'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "44px"
  xl: "88px"
components:
  button-magnetic-cta:
    backgroundColor: "{colors.amber-primary}"
    textColor: "{colors.obsidian-bg}"
    rounded: "{rounded.md}"
    padding: "20px 36px"
    height: "74px"
  button-magnetic-cta-hover:
    backgroundColor: "{colors.amber-bright}"
    textColor: "{colors.obsidian-bg}"
    rounded: "{rounded.md}"
  chip-venue-filter:
    backgroundColor: "{colors.obsidian-bg}"
    textColor: "{colors.silver-ink}"
    rounded: "{rounded.xs}"
    padding: "8px 15px"
    height: "44px"
  chip-venue-filter-active:
    backgroundColor: "{colors.ivory-ink}"
    textColor: "{colors.obsidian-bg}"
    rounded: "{rounded.xs}"
---

# Design System: The Beatles Duo

## Overview

**Creative North Star: "Nocturnal Dark Editorial Archive"**

Inspired by high-contrast nocturnal concert editorials (`Silhouette` reference), this system strips away photography and decorative cards so 100% of the visual weight rests on typographic contrast, `1px` low-opacity hairlines (`rgba(246, 244, 240, 0.08)`), and generous negative space over an absolute pitch-black canvas (`#050505`).

Luminous Amber (`#f58216`) is governed by a strict single-purpose doctrine: it appears **exclusively** on the primary WhatsApp booking CTA and on the interactive hover/touch state of the tour dates. All other surfaces, filters, and structural elements remain monochrome ivory and warm silver.

**Key Characteristics:**
- Absolute pitch-black ground (`#050505`) with ultra-subtle analog film grain (`0.032` opacity).
- Editorial Serif + Script italic pairing (`Playfair Display` + `Cormorant Garamond`) contrasted against geometric sans-serif (`Montserrat` + `Inter`) for schedule data.
- Ultra-minimalist vertical event ledger divided by `1px` hairlines (`rgba(246, 244, 240, 0.08)`).
- Exclusive Luminous Amber (`#f58216`) reserved strictly for the magnetic WhatsApp button and date row hover states.

## Colors

A high-contrast nocturnal palette pairing monochrome ivory/silver ink on pitch black with a single high-voltage amber accent.

### Primary
- **Luminous Editorial Amber** (`#f58216`): Reserved exclusively for the WhatsApp booking CTA fill and the hover/touch highlight of tour dates.
- **Amber Spotlight** (`#ff9838`): Active hover state for the magnetic WhatsApp CTA.

### Neutral
- **Pitch Obsidian** (`#050505`): Root background and high-contrast text color atop the amber CTA button.
- **Nocturnal Elevated** (`#0a0a0a`): Subtle surface layer.
- **Nocturnal Row Hover** (`#0f0e0c`): Subtle background shift when hovering or touching an event row.
- **Editorial Ivory** (`#f6f4f0`): Primary display titles, date numerals, and active monochrome filter pill.
- **Warm Parchment** (`#d6d2c9`): Italic serif accents (`Duo`, `Eventos`, `Liverpool`) and confirmed time strings (`18:00 hs`).
- **Editorial Silver** (`#9a958d`): Venue names, subtitle deck, and resting filter tabs.
- **Nocturnal Ash** (`#625e57`): Secondary metadata, city labels at rest, and weekday captions.

### Named Rules
**The Exclusive Amber Rule.** `#f58216` is forbidden on static badges, navigation links, or filter pills. It may only illuminate the primary WhatsApp booking CTA and the interactive hover/touch state of each date row.

## Typography

**Display & Script Font:** `Playfair Display` & `Cormorant Garamond` (with `Georgia, serif` fallback)
**Data & Label Font:** `Montserrat` (with `Inter, sans-serif` fallback)
**Body Font:** `Inter` (with `-apple-system, BlinkMacSystemFont, sans-serif` fallback)

**Character:** Sculpted, nocturnal editorial serif & italic script headlines paired with airy, tracked geometric sans-serif data columns.

### Hierarchy
- **Display** (`600` weight, `clamp(3.25rem, 11vw, 6.2rem)`, `0.94` line-height, `-0.03em` tracking): Hero title "The Beatles Duo" with italic `Cormorant Garamond` on *Duo* and *Live Acoustic Tribute* (`clamp(1.45rem, 4.2vw, 2.35rem)`).
- **Headline** (`600` weight, `clamp(2.1rem, 5.5vw, 3.35rem)`, `1.04` line-height): Section headers ("Próximos *Eventos*", "Lleva el sonido de *Liverpool* a tu sala o evento").
- **Title / Date Numeral** (`600` weight, `clamp(1.55rem, 3.6vw, 2.05rem)`, `1.0` line-height, `tabular-nums`): Two-digit day numeral leading every event row.
- **Body** (`300` weight, `clamp(0.88rem, 1.9vw, 1rem)`, `1.75` line-height, `48ch` max measure): Nocturnal editorial deck copy.
- **Label / Data** (`500–600` weight, `0.64rem–0.98rem`, `tabular-nums`): Event dates, times, venue names, and uppercase tracked cities.

## Layout

- **Negative Space Architecture:** Centered `980px` max-width container with generous horizontal gutters (`clamp(1.5rem, 6vw, 4.5rem)`) and deep vertical section cadence (`clamp(5.5rem, 13vh, 9.5rem)`).
- **Ultra-Minimalist Event Ledger:** Hairline-divided rows (`1px solid rgba(246, 244, 240, 0.08)`) presenting `[Fecha] | [Hora] | [Nombre del Bar/Lugar] | [Ciudad]` without pill boxes or card chrome.

## Elevation & Depth

Surfaces are flat pitch-black (`#050505`) separated solely by `1px` hairlines (`0.08` opacity). The only luminous elevation on the page is the nocturnal amber glow (`0 18px 46px rgba(245, 130, 22, 0.22)`) beneath the WhatsApp booking CTA.

## Shapes

- **Editorial Rectangular Precision:** Buttons and filter tabs use crisp `2px` to `6px` radii matching the reference's rectangular amber CTAs.
- **1px Hairlines:** All structural divisions use `1px` lines at `0.08` opacity (`0.045` for inner stage rules).

## Components

### Buttons
- **Magnetic WhatsApp CTA:** Rectangular editorial button (`6px` radius, `min-height: 74px`), `#f58216` fill with `#050505` bold typography and a `44px` framed arrow box, driven by nocturnal GSAP `quickTo` pointer physics.
- **Nocturnal Scroll Cue:** Vertical hairline indicator (`1px` width, `32px` height) with animated light flow below "VER FECHAS".

### Chips (Monochrome Venue Filters)
- **Style:** `2px` radius, `1px solid rgba(246, 244, 240, 0.08)` border on transparent `#050505` ground.
- **State:** Active tab inverts to `#f6f4f0` background with `#050505` text, keeping amber strictly reserved for the event rows and WhatsApp CTA.

### Signature Component: Ultra-Minimalist Event Row (`.event-row`)
- **Structure:** Unboxed typographic row separated by `1px` hairlines.
- **Hover / Touch State:** Shifts row background to `#0f0e0c`, illuminates the bottom `1px` border in `rgba(245, 130, 22, 0.45)`, glides content `3px` right, and turns the date (`03`, `3 de enero de 2027`) and city (`MORAIRA`) to Luminous Amber (`#f58216`).

## Do's and Don'ts

### Do:
- **Do** keep the background at `#050505` and rely on `1px` low-opacity hairlines (`rgba(246, 244, 240, 0.08)`) and negative space for structure.
- **Do** restrict `#f58216` (amber) exclusively to the WhatsApp CTA button and the hover/touch states of the event rows.

### Don't:
- **Don't** add colored badges, pills, or backgrounds inside the event list rows.
- **Don't** use photographs or heavy card containers; let the serif/sans-serif typographic contrast carry 100% of the visual weight.
