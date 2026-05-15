# TikTok Comment Assistant DESIGN.md

## Visual Theme & Atmosphere
- Inspired by modern editorial fashion and clean typography (e.g. Vogue, Kinfolk, Apple).
- The interface should feel light, airy, breathable, and highly user-friendly.
- Use a high-contrast charcoal/black as the primary brand signal over off-white/cream backgrounds.
- Keep the layout spacious to improve touch target accessibility.
- Prefer clear, thin borders, elegant typography, and subtle frosted glass over heavy neon shadows.

## Color Palette & Roles
| Token | Role | Usage |
|---|---|---|
| `background` | Base canvas | Warm off-white/cream background (`#faf9f5`) |
| `surface` | Primary panel | Pure white cards and forms |
| `surface-strong` | Elevated panel | Slight contrast blocks (e.g., `#f3f2ee`) |
| `border` | Separation | Extremely subtle, muted borders (`#e5e4de`) |
| `foreground` | Primary text | Deep charcoal for maximum readability (`#1c1c1c`) |
| `muted` | Secondary text | Smooth gray for helper labels |
| `accent` | Brand signal | Sleek black or high-contrast dark tones |
| `accent-soft` | Soft emphasis | Very pale beige/gray washes |
| `danger` | Error state | Muted elegant red/rose |
| `success` | Positive state | Muted elegant sage/green |

## Typography Rules
- Use a bold geometric sans (`Syne`) for the main UI headings to retain a fashion-forward look.
- Headings should be confident but not overwhelming.
- Body text (`Plus Jakarta Sans`) should have generous line height for readability.
- Labels and counters should use small uppercase mono with wide tracking for an editorial feel.
- Keep line lengths short in the main page copy.

## Layout Principles
- Build a single-screen product layout first.
- Use a two-column structure on desktop: form on the left, results on the right.
- Give elements room to breathe—don't cramp inputs or buttons.
- Reserve large whitespace for page framing and content separation.

## Component Stylings
### Buttons
- Primary actions should be solid black buttons with strong contrast, sleek and Apple-like.
- Secondary actions should be transparent or pale bounds with slight hover dark washes.
- Copy buttons should be accessible and visually clear.

### Inputs
- Inputs should have pure white backgrounds with thin, clean borders.
- Focus states should be obvious but elegant (e.g., a simple black ring).
- Touch limits and padding should be very generous to feel high-quality.

### Cards
- Result groups should look like premium polaroids or minimal content cards.
- Use soft, airy drop shadows, not harsh neon shadows.
- Keep card corners delicately rounded.

### Status Surfaces
- Toasts should be minimal and transient.
- Empty states should look inviting with softer graphical treatments.
- Loading states should be smooth and sophisticated.

## Depth & Elevation
- Use glassmorphism tastefully (`backdrop-filter: blur(28px)`).
- Prefer pale shadows to create floating elegance (`box-shadow: 0 4px 32px rgba(0,0,0,0.04)`).

## Do's and Don'ts
### Do
- Give the UI plenty of breathing room.
- Make the primary CTA obvious with high contrast.
- Ensure text is legible against the light backgrounds.
- Keep results scannable at a glance.

### Don't
- Use heavy neon colors or intense glowing drop-shadows.
- Over-clutter the interface with unnecessary borders.
- Shrink touch targets (user-friendly).

## Agent Prompt Guide
- "Build a premium, light-mode editorial UI with a creamy background and sleek black accents."
- "Ensure large, touch-friendly inputs and high-contrast typography."
- "Use subtle frosted glass and soft elevation."
