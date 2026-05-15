# Design Brief: Homepage Refactoring

## 1. Feature Summary
Refactor the Generator Hub homepage with a complete structure and visual overhaul. The page serves as a central hub for two live generator tools (TikTok Comment Generator and Sequence Generator) plus upcoming tools. Target audience includes content creators, social media managers, data analysts, and developers who need quick access to generators.

## 2. Primary User Action
Quickly identify and navigate to the desired generator tool. Users should immediately understand what's available (live tools) vs. what's coming soon.

## 3. Design Direction
**Fusion of Technical & Editorial**: Combine precision-like developer tools aesthetics with premium editorial layout (Kinfolk/Vogue-inspired). The page should feel like a high-end technical manual — precise, structured, and beautifully typeset.

- **Typography**: Pair a distinctive technical/geometric display font (NOT Syne, Inter, or IBM Plex) with a refined body font
- **Color**: Warm cream background (#faf9f5) with sleek black accents, thin borders, subtle tinted surfaces
- **Layout**: Two-column structure refined — left column for live tools, right for coming soon. Editorial whitespace and rhythm
- **Details**: Technical precision in spacing (4pt grid), frosted glass effects, soft shadows, no neon/glow

## 4. Layout Strategy
**Two-column editorial grid** with asymmetric rhythm:

- **Left Column (Live Tools)**: Takes slight visual prominence. Each tool as a refined card with clear hierarchy: status badge → tool name → description → CTA arrow
- **Right Column (Coming Soon)**: More subdued visually. Single placeholder with clock icon, clearly differentiated from live tools
- **Header Section**: Editorial typography treatment. Large display heading with tight leading, small mono label above, short descriptive text
- **Spatial Rhythm**: Varied spacing (not uniform padding). More space above headings, tighter groupings within cards. Max line-length 65-75ch for body text

## 5. Key States
- **Default**: Two live tools displayed, one coming soon placeholder
- **Empty (hypothetical)**: If no live tools, show empty state with clear message
- **Hover**: Subtle translate-y and border color shift on tool cards
- **Responsive**: Two columns collapse to single column on mobile. Header text scales fluidly

## 6. Interaction Model
- **Tool cards**: Hover → slight upward movement (-0.5px), border shifts to brand color, arrow translates right
- **Page load**: Staggered fade-in of header → left column → right column (using framer-motion)
- **Navigation**: Click tool card → navigate to tool page (standard <a> link with href)
- **No modals**: All information visible or accessible via navigation

## 7. Content Requirements
- **Header**: "One hub. Multiple generators." (display heading), "Generator Hub" (mono label with sparkle icon), descriptive text about live tools
- **Live tools section**: "Live tools" label, "Ready now" subheading, count badge (emerald accent)
- **Coming soon section**: "Coming soon" label, "Placeholder tools" subheading, count badge
- **Tool cards**: name, description, "Live" badge (brand color)
- **Coming soon card**: "More generators" title, "Additional generators will appear here." description

## 8. Recommended References
- **spatial-design.md**: For layout rhythm, asymmetric spacing, container queries
- **typography.md**: For font pairing (find technical + editorial combo), fluid type scales
- **color-and-contrast.md**: For OKLCH palette, tinted neutrals toward brand hue
- **motion-design.md**: For staggered page load animations, hover transitions
- **interaction-design.md**: For hover states, focus management

## 9. Open Questions
- Should we add a subtle background pattern or keep it clean?
- Any specific technical/developer tool references to draw inspiration from?
- Should the "coming soon" section eventually show actual upcoming tools with descriptions?

---

**Confirmed**: Ready for implementation with $impeccable craft
