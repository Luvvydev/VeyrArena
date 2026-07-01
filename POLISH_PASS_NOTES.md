Veyr Arena v1 2(15) objective polish patch

Changed files:
- src/main.js
- assets/floor_props/*.png
- POLISH_PASS_NOTES.md

What changed:
- Moved retry counter up so it no longer blocks the bottom-right ammo HUD.
- Simplified arena objective wording:
  - Kill all enemies
  - Survive Xs
  - Destroy the cores X/3
  - Hold the circle X/Ys
- Made the top objective banner smaller and less opaque.
- Added objective pressure logic:
  - Hold-circle rooms spawn extra enemies one by one and enemies rush/pressure the circle.
  - Survive rooms spawn controlled reinforcements during the timer.
  - Core rooms spawn some reinforcements and enemies pressure the nearest living core.
- Changed objective core visuals from plain purple diamonds to themed Kenney-based cores.
- Added a pentagram-style hold-circle visual with progress lighting.
- Stopped pulse/enemy reveal from showing enemies through walls without visual line of sight.
- Made board jobs progress in any order. Matching actions now progress every active matching board job, not only the selected card.
- Updated the daily board copy to explain multiple jobs can progress at once.
- Added a seed trade option to town upkeep: 1 supply for 3 seeds.
- Reduced checkpoint stabilization cost to lower supply friction.
- Added extra tower gate glows in town without adding text.
- Added curated Kenney prop preview images for floor/objective dressing.

Notes:
- This patch keeps the existing structure and avoids a full rewrite.
- The new assets are small preview PNGs from the already provided Kenney packs, used as readable top-down props/icons.
