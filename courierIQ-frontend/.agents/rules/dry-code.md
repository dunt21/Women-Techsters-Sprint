---
trigger: always_on
---

# UI & Component Standards

## 1. Keep Code DRY

- Always map over arrays or configuration objects when rendering repetitive lists, cards, navigation items, or structural tags instead of hardcoding duplicated elements.

## 2. Reusable Component First

- Always prioritize and utilize pre-existing reusable components (such as Shadcn UI primitives from `@/components/ui`) rather than writing raw, unstyled HTML elements.
- If a custom composite component is needed multiple times, abstract it into a reusable component inside the components directory.

## 3. Styling & Theming

- Always use the centralized color theme and CSS variables defined in `index.css` (or Tailwind theme configurations mapping to it).
- Avoid hardcoding arbitrary hex or RGB color values; rely on theme classes (e.g., `bg-background`, `text-foreground`, `text-primary`) to maintain consistency across light/dark modes.
- always use the right tailwind width and height sizes for the elements instead of hardcoding them in pixels
