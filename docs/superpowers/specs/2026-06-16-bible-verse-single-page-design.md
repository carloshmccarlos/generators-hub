# Design Spec: Bible Verse Generator Single-Page Consolidation

## Background & Objective
The Bible Verse Generator (the "Spiritual Prompt Generator") is being refactored from a multi-tab application into a single-page interface. The goal is to reduce cognitive load and provide a pure, meditative, single-screen experience. 

## Key Changes
1. **Remove Tabs**: The 4-tab interface (`Home`, `Explore`, `Saved`, `Settings`) is replaced by a single page.
2. **Remove Library/Saved Features**: The local history and bookmarking/favorites features are completely removed to keep the product extremely simple.
3. **Consolidate Remaining Controls**:
   - **Mood Selector**: Kept as the primary filter mechanism.
   - **Meditative Mode Toggle**: Placed as a clean toggle (sun/moon icon) in the header.
   - **Translation Version Selector**: Placed inline below the verse display.
   - **About / FAQ**: Displayed in a card layout below the generator.

---

## Component Layout Design

### Approach A: Super Minimalist Inline Controls (Recommended)
- **Top Bar**: "Back to Hub" link on the left, "Meditative Mode" (sun/moon toggle) on the right.
- **Header**: Quiet, elegant typographic title.
- **Mood Selector**: Curated mood tag pills (Guide Me, Anxious, Sad, Confused, Grateful, Seeking).
- **Primary Generator Button**: "Give me a verse" / "Seeking..." / "Next Verse" in the center.
- **Verse Display**: Renders the generated verse text, its book/chapter/verse reference, and copy button.
- **Version Selector**: Inline row (e.g. `KJV` | `WEB` | `BBE`) right under the reference.
- **About/FAQ**: Rendered inside a soft card structure at the bottom of the page.

---

## File Changes & Cleanup

### [DELETE] Obsolete Tab Files
- `components/bible-verse/tab-home.tsx`
- `components/bible-verse/tab-explore.tsx`
- `components/bible-verse/tab-collections.tsx`
- `components/bible-verse/tab-settings.tsx`

### [MODIFY] `components/bible-verse/use-bible-verse.ts`
- Remove `favorites`, `history`, `activeTab` states.
- Remove `toggleFavorite`, `removeFavorite`, `clearHistory`, `setActiveTab` actions.
- Remove localStorage syncing for favorites and history.
- Preserve states: `filter` (mood), `currentVerse`, `uiMode`, `version`, `isLoading`, `toast`.

### [MODIFY] `components/bible-verse/index.tsx`
- Completely replace with the consolidated single-page view.
- Embed the core generation layout (originally from `tab-home.tsx`).
- Embed the theme toggle and the version selection inline.
- Keep the `AboutFaqInline` card component at the bottom.

---

## Verification Plan

### Automated Verification
- Run `pnpm run dev` to verify compilation.
- Ensure no TypeScript compile errors.

### Manual Verification
- Verify that clicking different moods updates the selected filter.
- Verify that clicking "Give me a verse" correctly fetches scripture from `bible-api.com` in the chosen version.
- Verify that clicking the version selector (KJV/WEB/BBE) fetches the verse in the new version.
- Verify that toggling Meditative Mode changes the background/foreground colors smoothly between light cream and dark grey.
