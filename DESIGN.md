---
name: Aura
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#d1c5ae'
  on-tertiary: '#36301f'
  tertiary-container: '#171205'
  on-tertiary-container: '#867d68'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#ede1c9'
  tertiary-fixed-dim: '#d1c5ae'
  on-tertiary-fixed: '#211b0c'
  on-tertiary-fixed-variant: '#4d4634'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

This design system is built upon the principles of **discreet luxury and architectural minimalism**. It evokes the atmosphere of a high-end art gallery or a boutique hotel—spaces where the environment recedes to allow the "art" (the interior design projects) to take center stage. 

The aesthetic is characterized by intentionality, quiet confidence, and a sense of exclusivity. It avoids loud trends in favor of a timeless, high-contrast visual language. The user experience is designed to be experiential, prioritizing slow, deliberate interaction over frantic utility. Every element is placed with purpose, reflecting the precision of a master architect.

## Colors

The palette is rooted in a "Dark Mode" default to create a sense of intimacy and depth. 

- **Primary:** A deep, obsidian charcoal (#121212) serves as the primary canvas, providing a sophisticated backdrop that absorbs light and mimics expensive interior finishes.
- **Secondary (Gold):** A refined, muted gold (#C5A059) is used sparingly for interactive highlights and accents, representing quality and craftsmanship.
- **Tertiary (Champagne):** A lighter, metallic champagne (#E8DCC4) is used for subtle gradients, thin borders, or soft highlights.
- **Neutrals:** Mid-tone greys (#2A2A2A) provide structural support for container backgrounds and secondary information.

Colors should never be used in large, vibrant blocks. Accents should feel like jewelry—small, high-quality, and placed with extreme care.

## Typography

Typography in this design system relies on the interplay between a classic, high-contrast serif and a modernist, low-contrast sans-serif.

- **Headlines:** Use **Bodoni Moda**. Its extreme stroke contrast embodies fashion and luxury. Use it for high-impact statements and section headers.
- **Body:** Use **DM Sans**. It is chosen for its understated, geometric character, ensuring that long-form text feels contemporary and readable without competing with the headlines.
- **Alignment:** Prefer flush-left alignment for body text to maintain a clean vertical axis. Headlines can be centered if used in an editorial "hero" context.
- **Rhythm:** Generous line-heights are mandatory to maintain "airiness" and prevent the UI from feeling cramped.

## Layout & Spacing

The layout philosophy is defined by **intentional whitespace**. Negative space is not "empty"—it is a premium design element that guides the eye and signals luxury.

- **Grid:** Use a 12-column fixed grid with a maximum width of 1440px. The margins are significantly larger than standard web layouts (80px on desktop) to "frame" the content like a piece of art.
- **Vertical Spacing:** Use a large 8px-based scale. Section gaps should be substantial (160px+) to allow the user to focus on one concept at a time.
- **Alignment:** Use an asymmetrical "gallery" layout where elements may be offset from the center to create a dynamic, curated feel. 
- **Mobile:** On smaller screens, shift to a 4-column grid with reduced margins, but maintain the vertical airiness.

## Elevation & Depth

This design system avoids heavy shadows and traditional skeuomorphism. Instead, it uses **Tonal Layering** and **Low-Contrast Outlines**.

- **Layers:** Depth is created by placing #2A2A2A containers on top of the #121212 background.
- **Borders:** Use ultra-thin (1px) borders in Gold (#C5A059 at 30% opacity) to define surfaces. This mimics the look of fine metal inlays in furniture.
- **Glassmorphism:** For overlays like navigation menus or modals, use a heavy backdrop blur (20px+) with a 10% opacity black fill. This creates a "smoked glass" effect that feels exclusive and private.
- **Interaction:** Hover states should be subtle, such as a slight shift in text color or a delicate border fade-in, rather than a physical elevation change.

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. 

Luxury interior design often relies on architectural precision and hard edges (stone slabs, custom cabinetry, structural beams). The UI mirrors this by using perfectly square corners for all buttons, containers, and images. 

Rounding corners would introduce a "friendliness" that contradicts the desired aesthetic of "exclusive and sophisticated." Use sharp edges to convey strength, precision, and an uncompromising dedication to modern design.

## Components

Components should feel bespoke rather than mass-produced.

- **Buttons:** Use "Ghost" style buttons as the default. A 1px gold border with sharp corners and centered, letter-spaced label-caps text. On hover, the button fills with gold and flips the text to black.
- **Input Fields:** Minimalist under-lines (bottom border only) instead of enclosed boxes. The label should float above the line in a small sans-serif caps font.
- **Cards:** No shadows. Use a subtle 1px border or a slightly lighter background shade (#1A1A1A). Images within cards should use "zoom-on-hover" effects to create a tactile, experiential feel.
- **Lists:** High-contrast separators using 1px charcoal lines. Icons, if used, should be ultra-thin line art in Gold.
- **Image Treatment:** All photography should have a consistent color grade—slightly desaturated with deep blacks to match the primary palette.
- **Navigation:** A minimal top-bar or a hidden "hamburger" menu that opens into a full-screen, smoked-glass overlay with large, serif typography.