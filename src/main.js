const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const hudEl = document.getElementById("hud");
const logEl = document.getElementById("log");
const overlay = document.getElementById("overlay");
const titleCard = document.getElementById("titleCard");
const pauseButton = document.getElementById("pauseButton");

const W = canvas.width;
const H = canvas.height;
const SAVE_KEY = "veyrArenaSaveV2";

const ASSET_PATHS = {
  images: {
    player_marine: "./assets/sprites/player_marine.png",
    player_alt: "./assets/sprites/player_alt.png",
    player_vanguard: "./assets/sprites/player_vanguard.png",
    player_phantom: "./assets/sprites/player_phantom.png",
    player_platform_green: "./assets/sprites/platformer_green_front.png",
    player_platform_pink: "./assets/sprites/platformer_pink_front.png",
    player_platform_purple: "./assets/sprites/platformer_purple_front.png",
    player_platform_beige: "./assets/sprites/platformer_beige_front.png",
    enemy_bee: "./assets/sprites/platformer_enemy_bee.png",
    enemy_frog: "./assets/sprites/platformer_enemy_frog.png",
    enemy_mouse: "./assets/sprites/platformer_enemy_mouse.png",
    enemy_fish_blue: "./assets/sprites/platformer_enemy_fish_blue.png",
    enemy_vanta: "./assets/sprites/enemy_vanta.png",
    enemy_mire: "./assets/sprites/enemy_mire.png",
    enemy_sable: "./assets/sprites/enemy_sable.png",
    enemy_rook: "./assets/sprites/enemy_rook.png",
    enemy_null: "./assets/sprites/enemy_null.png",
    boss_vanta: "./assets/sprites/boss_vanta.png",
    boss_null: "./assets/sprites/boss_null.png",

    weapon_pistol: "./assets/weapons/pistol.png",
    weapon_smg: "./assets/weapons/smg.png",
    weapon_shotgun: "./assets/weapons/shotgun.png",
    weapon_carbine: "./assets/weapons/carbine.png",
    weapon_revolver: "./assets/weapons/revolver.png",
    weapon_dmr: "./assets/weapons/dmr.png",
    weapon_lmg: "./assets/weapons/lmg.png",
    weapon_needler: "./assets/weapons/needler.png",
    weapon_breacher: "./assets/weapons/breacher.png",

    floor_stone: "./assets/textures/floor_stone.png",
    floor_blue: "./assets/textures/floor_blue.png",
    floor_sand: "./assets/textures/floor_sand.png",
    floor_wood: "./assets/textures/floor_wood.png",
    floor_red: "./assets/textures/floor_red.png",
    floor_snow: "./assets/textures/floor_snow.png",
    floor_forest: "./assets/textures/floor_forest.png",
    floor_dungeon: "./assets/textures/floor_dungeon.png",
    wall_stone: "./assets/textures/wall_stone.png",
    wall_blue: "./assets/textures/wall_blue.png",
    wall_sand: "./assets/textures/wall_sand.png",
    wall_wood: "./assets/textures/wall_wood.png",
    wall_red: "./assets/textures/wall_red.png",
    wall_snow: "./assets/textures/wall_snow.png",
    wall_forest: "./assets/textures/wall_forest.png",
    wall_dungeon: "./assets/textures/wall_dungeon.png",

    town_grass_a: "./assets/town/town_grass_a.png",
    town_grass_b: "./assets/town/town_grass_b.png",
    town_dirt_a: "./assets/town/town_dirt_a.png",
    town_dirt_b: "./assets/town/town_dirt_b.png",
    town_water_a: "./assets/town/town_water_a.png",
    town_water_b: "./assets/town/town_water_b.png",
    town_stone_a: "./assets/town/town_stone_a.png",
    town_stone_b: "./assets/town/town_stone_b.png",
    town_stone_dark: "./assets/town/town_stone_dark.png",
    town_roof_a: "./assets/town/town_roof_a.png",
    town_roof_b: "./assets/town/town_roof_b.png",
    town_roof_peak: "./assets/town/town_roof_peak.png",
    town_wall_a: "./assets/town/town_wall_a.png",
    town_wall_b: "./assets/town/town_wall_b.png",
    town_wall_c: "./assets/town/town_wall_c.png",
    town_window_a: "./assets/town/town_window_a.png",
    town_window_b: "./assets/town/town_window_b.png",
    town_door_a: "./assets/town/town_door_a.png",
    town_door_b: "./assets/town/town_door_b.png",
    town_tree_green: "./assets/town/town_tree_green.png",
    town_tree_gold: "./assets/town/town_tree_gold.png",
    town_tree_blue: "./assets/town/town_tree_blue.png",
    town_tree_small: "./assets/town/town_tree_small.png",
    town_bush: "./assets/town/town_bush.png",
    town_flower: "./assets/town/town_flower.png",
    town_stump: "./assets/town/town_stump.png",
    town_fence_h: "./assets/town/town_fence_h.png",
    town_fence_v: "./assets/town/town_fence_v.png",
    town_fence_h2: "./assets/town/town_fence_h2.png",
    town_fence_v2: "./assets/town/town_fence_v2.png",
    town_crate_big: "./assets/town/town_crate_big.png",
    town_crate_small: "./assets/town/town_crate_small.png",
    town_barrel_a: "./assets/town/town_barrel_a.png",
    town_barrel_b: "./assets/town/town_barrel_b.png",
    town_barrel_c: "./assets/town/town_barrel_c.png",
    town_arch: "./assets/town/town_arch.png",
    town_lamp: "./assets/town/town_lamp.png",
    town_bridge: "./assets/town/town_bridge.png",
    tiny_flower: "./assets/town/tiny_flower.png",
    tiny_grass_detail: "./assets/town/tiny_grass_detail.png",
    tiny_path_stone: "./assets/town/tiny_path_stone.png",
    tiny_fence_h: "./assets/town/tiny_fence_h.png",
    tiny_fence_v: "./assets/town/tiny_fence_v.png",
    tiny_roof_red: "./assets/town/tiny_roof_red.png",
    tiny_roof_grey: "./assets/town/tiny_roof_grey.png",
    tiny_wall_wood: "./assets/town/tiny_wall_wood.png",
    tiny_wall_blue: "./assets/town/tiny_wall_blue.png",
    tiny_door_wood: "./assets/town/tiny_door_wood.png",
    tiny_window_wood: "./assets/town/tiny_window_wood.png",
    tiny_sign: "./assets/town/tiny_sign.png",
    tiny_chest: "./assets/town/tiny_chest.png",
    tiny_coin: "./assets/town/tiny_coin.png",
    tiny_target: "./assets/town/tiny_target.png",
    tiny_well: "./assets/town/tiny_well.png",
    tiny_tool_pickaxe: "./assets/town/tiny_tool_pickaxe.png",
    tiny_tool_shovel: "./assets/town/tiny_tool_shovel.png",
    tiny_key: "./assets/town/tiny_key.png",
    tiny_axe: "./assets/town/tiny_axe.png",
    tiny_sword: "./assets/town/tiny_sword.png",
    tiny_log: "./assets/town/tiny_log.png",
    tiny_barrel: "./assets/town/tiny_barrel.png",
    platformer_bridge: "./assets/town/platformer_bridge.png",
    platformer_bridge_logs: "./assets/town/platformer_bridge_logs.png",
    platformer_brick_grey: "./assets/town/platformer_brick_grey.png",
    platformer_brick_brown: "./assets/town/platformer_brick_brown.png",
    platformer_block_warning: "./assets/town/platformer_block_warning.png",
    platformer_bush: "./assets/town/platformer_bush.png",
    platformer_cactus: "./assets/town/platformer_cactus.png",
    input_arrow_left: "./assets/ui/input_arrow_left.png",
    input_arrow_right: "./assets/ui/input_arrow_right.png",
    input_arrows_horizontal: "./assets/ui/input_arrows_horizontal.png",
    smoke_white_00: "./assets/fx/smoke/white_00.png",
    smoke_white_04: "./assets/fx/smoke/white_04.png",
    smoke_white_08: "./assets/fx/smoke/white_08.png",
    smoke_white_12: "./assets/fx/smoke/white_12.png",
    smoke_white_16: "./assets/fx/smoke/white_16.png",
    smoke_white_20: "./assets/fx/smoke/white_20.png",
    smoke_white_24: "./assets/fx/smoke/white_24.png",
    smoke_black_00: "./assets/fx/smoke/black_00.png",
    smoke_black_04: "./assets/fx/smoke/black_04.png",
    smoke_black_08: "./assets/fx/smoke/black_08.png",
    smoke_black_12: "./assets/fx/smoke/black_12.png",
    smoke_black_16: "./assets/fx/smoke/black_16.png",
    smoke_black_20: "./assets/fx/smoke/black_20.png",
    smoke_black_24: "./assets/fx/smoke/black_24.png",

    fx_crosshair: "./assets/fx/crosshair.png",
    fx_hit: "./assets/fx/hit.png",
    fx_burst: "./assets/fx/burst.png",
    rpg_soldier: "./assets/sprites/rpg_soldier_idle.png",
    rpg_orc: "./assets/sprites/rpg_orc_idle.png",
    enemy_vampire: "./assets/sprites/enemy_vampire_idle.png",
    story_intake: "./assets/story/story_intake.png",
    story_dust: "./assets/story/story_dust.png",
    story_cold: "./assets/story/story_cold.png",
    story_deadwing: "./assets/story/story_deadwing.png",
    story_broadcast: "./assets/story/story_broadcast.png",
    story_core: "./assets/story/story_core.png"
  },
  audio: {
    shot_light: "./assets/sfx/shoot_light.ogg",
    shot_heavy: "./assets/sfx/shoot_heavy.ogg",
    impact: "./assets/sfx/impact.ogg",
    explosion: "./assets/sfx/explosion.ogg",
    reward: "./assets/sfx/reward.ogg",
    select: "./assets/sfx/select.ogg",
    count: "./assets/sfx/count.ogg",
    fight: "./assets/sfx/fight.ogg",
    smoke: "./assets/sfx/smoke.ogg",
    wall: "./assets/sfx/wall.ogg",
    gun_pistol: "./assets/sfx/gun_pistol.wav",
    gun_smg: "./assets/sfx/gun_smg.wav",
    gun_shotgun: "./assets/sfx/gun_shotgun.wav",
    gun_carbine: "./assets/sfx/gun_carbine.wav",
    gun_revolver: "./assets/sfx/gun_revolver.wav",
    gun_dmr: "./assets/sfx/gun_dmr.wav",
    gun_lmg: "./assets/sfx/gun_lmg.wav",
    gun_needler: "./assets/sfx/gun_needler.wav",
    gun_breacher: "./assets/sfx/gun_breacher.wav",

    fps_blaster: "./assets/sfx/fps_blaster.ogg",
    fps_repeater: "./assets/sfx/fps_repeater.ogg",
    fps_enemy_hurt: "./assets/sfx/fps_enemy_hurt.ogg",
    fps_enemy_attack: "./assets/sfx/fps_enemy_attack.ogg",
    fps_enemy_destroy: "./assets/sfx/fps_enemy_destroy.ogg",
    fps_weapon_change: "./assets/sfx/fps_weapon_change.ogg",


    real_pistol: "./assets/sfx/gun_real_pistol.mp3",
    real_snap: "./assets/sfx/gun_real_snap.mp3",
    real_heavy: "./assets/sfx/gun_real_heavy.mp3",
    real_breacher: "./assets/sfx/gun_real_breacher.mp3",
    real_short: "./assets/sfx/gun_real_short.mp3",
    gun_empty: "./assets/sfx/gun_empty.mp3",
    reload: "./assets/sfx/reload.mp3",
    level_up_chime: "./assets/sfx/level_up_chime.mp3",
    bonus_chime: "./assets/sfx/bonus_chime.mp3",
    ui_button_click: "./assets/sfx/ui_button_click.mp3",
    game_over_balanced: "./assets/sfx/game_over_balanced.mp3",
    music_menu: "./assets/sfx/music_menu.mp3",
    music_run: "./assets/sfx/music_run.mp3",
    music_boss: "./assets/sfx/music_boss.mp3",
    music_intro: "./assets/sfx/music_intro.mp3",
    music_town: "./assets/sfx/music_intro.mp3",
    defeat_outro: "./assets/sfx/defeat_outro.mp3",
    cache_upgrade: "./assets/sfx/cache_upgrade.mp3",
    town_chop: "./assets/sfx/town_chop.mp3",
    town_tree_fall: "./assets/sfx/town_tree_fall.mp3",
    town_mine: "./assets/sfx/town_mine.mp3",
    town_fish_cast: "./assets/sfx/town_fish_cast.mp3",
    town_fish_reel: "./assets/sfx/town_fish_reel.mp3",
    town_leaves: "./assets/sfx/town_leaves.mp3",
    town_forge_ring: "./assets/sfx/town_forge_ring.mp3",
    town_blacksmith_workshop: "./assets/sfx/town_blacksmith_workshop.mp3",
    town_building_work: "./assets/sfx/town_building_work.mp3",
    town_village_day: "./assets/sfx/town_village_day.mp3",
    town_village_night: "./assets/sfx/town_village_night.mp3",
    ui_confirm_001: "./assets/sfx/ui_confirm_001.ogg",
    ui_error_001: "./assets/sfx/ui_error_001.ogg",
    footstep_platformer: "./assets/sfx/footstep_platformer.ogg",
    footstep_concrete_1: "./assets/sfx/footstep_concrete_1.mp3",
    footstep_concrete_2: "./assets/sfx/footstep_concrete_2.mp3",
    footstep_concrete_3: "./assets/sfx/footstep_concrete_3.mp3",
    footstep_concrete_4: "./assets/sfx/footstep_concrete_4.mp3",
    footstep_wood_1: "./assets/sfx/footstep_wood_1.mp3",
    footstep_wood_2: "./assets/sfx/footstep_wood_2.mp3",
    footstep_wood_3: "./assets/sfx/footstep_wood_3.mp3",
    footstep_wood_4: "./assets/sfx/footstep_wood_4.mp3",
    footstep_snow_1: "./assets/sfx/footstep_snow_1.mp3",
    footstep_snow_2: "./assets/sfx/footstep_snow_2.mp3",
    footstep_snow_3: "./assets/sfx/footstep_snow_3.mp3",
    footstep_snow_4: "./assets/sfx/footstep_snow_4.mp3",
    footstep_nature_1: "./assets/sfx/footstep_nature_1.mp3",
    footstep_nature_2: "./assets/sfx/footstep_nature_2.mp3",
    footstep_nature_3: "./assets/sfx/footstep_nature_3.mp3",
    footstep_nature_4: "./assets/sfx/footstep_nature_4.mp3",
    footstep_gravel_1: "./assets/sfx/footstep_gravel_1.mp3",
    footstep_gravel_2: "./assets/sfx/footstep_gravel_2.mp3",
    footstep_gravel_3: "./assets/sfx/footstep_gravel_3.mp3",
    footstep_gravel_4: "./assets/sfx/footstep_gravel_4.mp3",
    footstep_laminate_1: "./assets/sfx/footstep_laminate_1.mp3",
    footstep_laminate_2: "./assets/sfx/footstep_laminate_2.mp3",
    footstep_laminate_3: "./assets/sfx/footstep_laminate_3.mp3",
    footstep_laminate_4: "./assets/sfx/footstep_laminate_4.mp3",
    voice_ready: "./assets/voice/ready.ogg",
    voice_fight: "./assets/voice/fight.ogg",
    voice_winner: "./assets/voice/winner.ogg",
    voice_you_win: "./assets/voice/you_win.ogg",
    voice_game_over: "./assets/voice/game_over.ogg",
    voice_round_1: "./assets/voice/round_1.ogg",
    voice_boss_mwah: "./assets/voice/boss_mwah.mp3",
    voice_boss_cry: "./assets/voice/boss_cry.mp3",
    voice_boss_breath: "./assets/voice/boss_breath.mp3",
    voice_boss_laugh: "./assets/voice/boss_laugh.mp3"
  }
};

const assetImages = {};
const assetAudio = {};
const activeOneShotAudio = new Set();

function loadGameAssets() {
  if (typeof Image !== "undefined") {
    for (const [key, src] of Object.entries(ASSET_PATHS.images)) {
      const img = new Image();
      img.src = src;
      assetImages[key] = img;
    }
  }

  if (typeof Audio !== "undefined") {
    for (const [key, src] of Object.entries(ASSET_PATHS.audio)) {
      const audio = new Audio(src);
      audio.preload = "auto";
      assetAudio[key] = audio;
    }
  }
}

loadGameAssets();

function imageAsset(key) {
  const img = assetImages[key];
  return img && img.complete && img.naturalWidth > 0 ? img : null;
}

function drawImageAsset(key, x, y, w, h, angle = 0, alpha = 1) {
  const img = imageAsset(key);
  if (!img) return false;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();
  return true;
}

function audioCategoryForKey(key, fallback = "sfx") {
  if (key.startsWith("voice_") || key.includes("game_over")) return "voice";
  if (key.startsWith("footstep_")) return "footsteps";
  if (key.startsWith("music_")) return "music";
  return fallback;
}

function muteWhenUnfocusedEnabled() {
  return (save.settings?.muteUnfocused ?? DEFAULT_SAVE.settings.muteUnfocused) !== false;
}

function audioShouldMuteForFocus() {
  if (!muteWhenUnfocusedEnabled()) return false;
  if (typeof document === "undefined") return false;
  return document.hidden || (typeof document.hasFocus === "function" && !document.hasFocus());
}

function volumeFor(category = "sfx") {
  const settings = save.settings || DEFAULT_SAVE.settings;
  const master = settings.master ?? 0.75;
  const value = settings[category] ?? settings.sfx ?? 0.7;
  const focusScale = audioShouldMuteForFocus() ? 0 : 1;
  return clamp(master * value * focusScale, 0, 1);
}

function playAssetSfx(key, volume = 0.45, category = "sfx") {
  resumeAudio();
  const src = assetAudio[key];
  if (!src) return false;
  if (audioShouldMuteForFocus()) return true;

  try {
    const audio = src.cloneNode();
    const resolvedCategory = audioCategoryForKey(key, category);
    audio._veyrBaseVolume = volume;
    audio._veyrCategory = resolvedCategory;
    audio.volume = clamp(volume * volumeFor(resolvedCategory), 0, 0.85);
    activeOneShotAudio.add(audio);
    audio.addEventListener("ended", () => activeOneShotAudio.delete(audio), { once: true });
    audio.play().catch(() => activeOneShotAudio.delete(audio));
    return true;
  } catch {
    return false;
  }
}

function stopMusic() {
  if (!musicAudio) return;
  try {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  } catch {}
  musicAudio = null;
  musicKey = "";
}

function updateMusicVolume() {
  if (!musicAudio) return;
  musicAudio.volume = clamp(0.55 * volumeFor("music"), 0, 0.65);
}

function updateOneShotAudioVolumes() {
  for (const audio of [...activeOneShotAudio]) {
    if (!audio || audio.ended) {
      activeOneShotAudio.delete(audio);
      continue;
    }
    const base = audio._veyrBaseVolume ?? 0.45;
    const category = audio._veyrCategory || "sfx";
    try {
      audio.volume = clamp(base * volumeFor(category), 0, 0.85);
    } catch {
      activeOneShotAudio.delete(audio);
    }
  }
}

function startMusic(key) {
  const src = assetAudio[key];
  if (!src) return;
  if (musicKey === key && musicAudio) {
    updateMusicVolume();
    return;
  }
  stopMusic();
  try {
    musicAudio = src.cloneNode();
    musicAudio.loop = true;
    musicKey = key;
    updateMusicVolume();
    musicAudio.play().catch(() => {});
  } catch {
    musicAudio = null;
    musicKey = "";
  }
}

function startVillageMusic() {
  // Use the soft music cue, not the sharp village ambience loops.
  startMusic("music_town");
}

function isOverlayVisible() {
  return overlay && overlay.style.display && overlay.style.display !== "none";
}

function saveTowerProgress(reason = "progress") {
  if (!currentFloor || currentFloor < 1) return;
  if (["menu", "village", "villagePaused"].includes(mode)) return;
  save.bestFloor = Math.max(Number(save.bestFloor) || 0, Number(currentFloor) || 1);
  save.lastTowerProgress = { floor: currentFloor, mode, reason, ts: Date.now() };
  saveGame();
}

function updateCursorMode() {
  const villageLike = mode === "village" || mode === "villagePaused" || villageMapOpen || villageBuildMode || (isOverlayVisible() && !["running", "countdown", "killReplay"].includes(mode));
  const cursor = villageBuildMode ? (villageMoveState ? "grabbing" : "grab") : villageLike ? "auto" : "none";
  try {
    canvas.style.cursor = cursor;
    document.body.style.cursor = villageLike ? "auto" : "";
    if (document.querySelector("main")) document.querySelector("main").style.cursor = villageLike ? "auto" : "";
  } catch {}
}

function closeVillageMenuOverlay() {
  if (!isOverlayVisible()) return false;
  if (mode !== "village") return false;
  if (villageHistoryOpen) {
    closeVillageHistory();
    return true;
  }
  closeOverlay();
  setVillageMessage("Village", "Closed.", 1.2);
  return true;
}

function handleOverlayEscape() {
  if (!isOverlayVisible()) return false;
  const screen = document.body.dataset.screen || "";
  if (screen === "optionsMenu" && optionsBackAction === "backVillagePause") {
    showVillagePauseOverlay();
    return true;
  }
  if (mode === "village") return closeVillageMenuOverlay();
  if (mode === "villagePaused") {
    resumeVillage();
    return true;
  }
  if (mode === "paused" || mode === "pauseRequest") {
    resumeFight();
    return true;
  }
  if (mode === "routeChoice" || mode === "floorClear") {
    saveTowerProgress("menu exit");
    if (activeStoryMode && villagePendingRouteFloor > 0) returnToVillageFromOverlay();
    else renderMenu();
    return true;
  }
  if (mode === "gameOver") {
    saveTowerProgress("result exit");
    if (activeStoryMode) returnToVillageFromOverlay();
    else renderMenu();
    return true;
  }
  if (mode === "storyBriefing" || mode === "storyScene") {
    renderMenu();
    return true;
  }
  if (screen && screen !== "game") {
    renderMenu();
    return true;
  }
  return false;
}


function stageAssetKey(kind) {
  const id = activeStage?.id || "graybox";
  const map = {
    graybox: { floor: "floor_stone", wall: "wall_stone" },
    blue_halls: { floor: "floor_blue", wall: "wall_blue" },
    amber_cross: { floor: "floor_sand", wall: "wall_sand" },
    violet_split: { floor: "floor_wood", wall: "wall_wood" },
    red_lock: { floor: "floor_red", wall: "wall_red" },
    whiteout: { floor: "floor_snow", wall: "wall_snow" },
    forest_wire: { floor: "floor_forest", wall: "wall_forest" },
    undercrypt: { floor: "floor_dungeon", wall: "wall_dungeon" }
  };
  return (map[id] || map.graybox)[kind];
}



const keys = new Set();
const mouse = { x: W / 2, y: H / 2, screenX: W / 2, screenY: H / 2, down: false };
const bullets = [];
const enemyShots = [];
const floatText = [];
const echoes = [];
const logs = [];
const breakables = [];
const pickups = [];
const particles = [];
const decals = [];
const shellCasings = [];
const muzzleFlashes = [];
const smokes = [];
const movementTraces = [];
const poisonPuddles = [];
let killReplay = null;
let killReplayClearQueued = false;

let hitStop = 0;
let cameraShake = 0;
let screenFlash = 0;
let roundStartAt = 0;
let roundMatchLabel = "";
let roundOpponentLabel = "";
let lastCountdownCue = "";
let audioCtx = null;
let musicAudio = null;
let musicKey = "";
let lastPlayerFootstepAt = 0;
let lastPlayerTraceAt = 0;
let playerTraceSide = 1;
let footstepVariantCursor = 0;
let pauseRequestedAt = 0;
let pauseAcceptedAt = 0;

let lastTime = performance.now();
let mode = "menu";
let running = false;
let gameOver = false;
let showDebug = false;
let message = "";
let walls = [];
let activeStage = null;
let worldW = W;
let worldH = H;
const camera = { x: 0, y: 0 };
let currentFloor = 1;
let towerCleared = false;
let floorStartTime = 0;
let teamPing = null;
let pendingIntel = [];
let offeredUpgrades = [];
let offeredRewards = [];
let pendingFloorReward = null;
let activeRouteType = "standard";
let nextRouteType = "standard";
let lastRouteChoice = null;
let activeStoryMode = false;
let activeStoryChapterId = "ledger";
let pendingStoryFloor = 0;
let currentStoryBriefing = null;
let villagePendingRouteFloor = 0;
let villageReturnChapterId = "";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => min + Math.random() * (max - min);
const choice = arr => arr[Math.floor(Math.random() * arr.length)];
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const len = (x, y) => Math.hypot(x, y);
const nowSec = () => performance.now() / 1000;
const NAV_CELL = 32;
let NAV_COLS = Math.ceil(W / NAV_CELL);
let NAV_ROWS = Math.ceil(H / NAV_CELL);

const WEAPONS = [
  {
    id: "pistol",
    name: "Pistol",
    ammo: 8,
    fireDelay: 0.24,
    reloadTime: 1.0,
    pellets: 1,
    spread: 0.018,
    heatSpread: 0.012,
    damage: [30, 44],
    knockback: 9,
    recoil: 5,
    shake: 1.25,
    hitStop: 0.028,
    tracerTime: 0.09,
    noise: 285,
    casingSpeed: 80,
    color: "#d8f6ff",
    asset: "weapon_pistol",
    shotSfx: "real_pistol",
    aimAssist: 0.42,
    note: "Accurate, clean single shots with a tiny aim settle."
  },
  {
    id: "smg",
    name: "SMG",
    ammo: 24,
    fireDelay: 0.072,
    reloadTime: 1.35,
    pellets: 1,
    spread: 0.05,
    heatSpread: 0.055,
    damage: [10, 16],
    knockback: 3,
    recoil: 2.4,
    shake: 0.7,
    hitStop: 0.01,
    tracerTime: 0.055,
    noise: 330,
    casingSpeed: 120,
    color: "#7cc7ff",
    asset: "weapon_smg",
    shotSfx: "real_short",
    aimAssist: 0.16,
    suppression: 0.68,
    note: "Fast, messy, suppressive."
  },
  {
    id: "shotgun",
    name: "Shotgun",
    ammo: 4,
    fireDelay: 0.68,
    reloadTime: 1.42,
    pellets: 7,
    spread: 0.18,
    heatSpread: 0,
    damage: [13, 22],
    knockback: 20,
    recoil: 9,
    shake: 3.2,
    hitStop: 0.038,
    tracerTime: 0.075,
    noise: 390,
    casingSpeed: 65,
    color: "#ffd166",
    asset: "weapon_shotgun",
    shotSfx: "real_heavy",
    aimAssist: 0.08,
    suppression: 0.45,
    note: "Short range, heavy knockback."
  },
  {
    id: "carbine",
    name: "Carbine",
    ammo: 18,
    fireDelay: 0.145,
    reloadTime: 1.22,
    pellets: 1,
    spread: 0.032,
    heatSpread: 0.018,
    damage: [19, 27],
    knockback: 6,
    recoil: 3.5,
    shake: 0.95,
    hitStop: 0.018,
    tracerTime: 0.07,
    noise: 315,
    casingSpeed: 105,
    color: "#a1ffce",
    asset: "weapon_carbine",
    shotSfx: "real_snap",
    aimAssist: 0.28,
    suppression: 0.38,
    note: "Controlled mid range pressure."
  },
  {
    id: "revolver",
    name: "Revolver",
    ammo: 6,
    fireDelay: 0.42,
    reloadTime: 1.55,
    pellets: 1,
    spread: 0.01,
    heatSpread: 0.006,
    damage: [48, 66],
    knockback: 14,
    recoil: 8,
    shake: 2.8,
    hitStop: 0.046,
    tracerTime: 0.1,
    noise: 360,
    casingSpeed: 75,
    color: "#ffb86b",
    asset: "weapon_revolver",
    shotSfx: "real_pistol",
    aimAssist: 0.34,
    ricochet: 1,
    note: "Slow hand cannon. Bankable wall threat."
  },
  {
    id: "dmr",
    name: "DMR",
    ammo: 5,
    fireDelay: 0.72,
    reloadTime: 1.65,
    pellets: 1,
    spread: 0.006,
    heatSpread: 0.004,
    damage: [68, 92],
    knockback: 18,
    recoil: 10,
    shake: 3.4,
    hitStop: 0.055,
    tracerTime: 0.13,
    noise: 405,
    casingSpeed: 70,
    color: "#ffffff",
    asset: "weapon_dmr",
    shotSfx: "real_heavy",
    aimAssist: 0.3,
    pierce: 1,
    note: "Slow, loud, surgical piercer."
  },
  {
    id: "lmg",
    name: "LMG",
    ammo: 48,
    fireDelay: 0.095,
    reloadTime: 2.25,
    pellets: 1,
    spread: 0.095,
    heatSpread: -0.045,
    damage: [12, 18],
    knockback: 4,
    recoil: 4.8,
    shake: 1.1,
    hitStop: 0.006,
    tracerTime: 0.052,
    noise: 430,
    casingSpeed: 135,
    color: "#ff5c7a",
    asset: "weapon_lmg",
    shotSfx: "real_short",
    aimAssist: 0.12,
    suppression: 0.85,
    note: "Unstable at first, steadier while sustained."
  },
  {
    id: "needler",
    name: "Needler",
    ammo: 12,
    fireDelay: 0.18,
    reloadTime: 1.25,
    pellets: 1,
    spread: 0.028,
    heatSpread: 0.01,
    damage: [16, 23],
    knockback: 2,
    recoil: 2.2,
    shake: 0.55,
    hitStop: 0.008,
    tracerTime: 0.06,
    noise: 240,
    casingSpeed: 65,
    color: "#c77dff",
    asset: "weapon_needler",
    shotSfx: "shot_light",
    dot: { damage: 8, ticks: 3, interval: 0.42 },
    aimAssist: 0.48,
    note: "Quiet tagging pistol. Lower burst, better for stalking."
  },
  {
    id: "breacher",
    name: "Breacher",
    ammo: 2,
    fireDelay: 0.95,
    reloadTime: 1.7,
    pellets: 9,
    spread: 0.24,
    heatSpread: 0,
    damage: [10, 18],
    knockback: 30,
    recoil: 13,
    shake: 4.1,
    hitStop: 0.05,
    tracerTime: 0.08,
    noise: 450,
    casingSpeed: 55,
    color: "#ff8a3d",
    asset: "weapon_breacher",
    shotSfx: "real_breacher",
    aimAssist: 0.06,
    suppression: 0.7,
    note: "Two-shot room clearer. Huge shove, risky reload."
  }
];

const WEAPON_BY_ID = Object.fromEntries(WEAPONS.map(weapon => [weapon.id, weapon]));

const HUB_VILLAGERS = [
  {
    id: "maren",
    name: "Maren",
    role: "Healer",
    sprite: "rpg_soldier",
    max: 5,
    help: "Maren treats the people waking up sick after Mira was taken.",
    need: "blankets, medicine, clean water",
    bonus: "+4 max HP per help rank"
  },
  {
    id: "rowan",
    name: "Rowan",
    role: "Smith",
    sprite: "player_vanguard",
    max: 5,
    help: "Rowan repairs weapons and keeps your gear from falling apart.",
    need: "tools, springs, old steel",
    bonus: "+3% weapon damage per help rank"
  },
  {
    id: "tavi",
    name: "Tavi",
    role: "Lookout",
    sprite: "player_phantom",
    max: 5,
    help: "Tavi watches the tower lights and marks safer doors before each climb.",
    need: "maps, batteries, radio parts",
    bonus: "+12 pulse range per help rank"
  }
];

const DEFAULT_HUB_SAVE = {
  supplies: 0,
  hope: 0,
  retries: 0,
  townLog: [],
  homeRank: 0,
  homeRestDay: -1,
  chest: { supplies: 0, seeds: 0, ore: 0, fish: 0, crops: 0 },
  helped: {
    maren: 0,
    rowan: 0,
    tavi: 0
  },
  rubbleCleared: {},
  projects: {},
  stumpsCleared: {},
  stumpHits: {},
  stumpDrops: {},
  mineCleared: {},
  mineHits: {},
  farmPlots: {},
  seeds: 2,
  fish: 0,
  ore: 0,
  crops: 0,
  farmHarvests: 0,
  energy: 7,
  towerDay: 0,
  fishingDay: -1,
  fishingUses: 0,
  fishingRodRank: 0,
  bait: 0,
  visitor: null,
  activeTask: null,
  boardTasks: [],
  boardTaskDay: -1,
  selectedTaskId: null,
  completedDailyTaskIds: {},
  towerOmen: null,
  dailyEvent: null,
  dailyEventUsed: {},
  prep: { meal: null, tool: null, scout: null, shrine: null },
  collection: { fish: 0, ore: 0, crops: 0, relics: 0, visitors: {}, memories: {} },
  lastReturnCard: null,
  nightFallDay: -1,
  nightFallPending: false,
  taskCounter: 0,
  lastGain: "",
  lastHelp: "",
  bridgeFixed: false,
  bridgeCutsceneSeen: false,
  layout: {},
  townSinksUsed: {}
};


const DEFAULT_SAVE = {
  shards: 0,
  bestFloor: 0,
  totalClears: 0,
  totalWeaponFinds: 0,
  storyClears: 0,
  completedChapters: [],
  selectedShape: "circle",
  selectedColor: "pale",
  unlockedShapes: ["circle"],
  unlockedColors: ["pale"],
  powerups: {
    might: 0,
    armor: 0,
    maxHealth: 0,
    cooldown: 0,
    area: 0,
    speed: 0,
    reload: 0,
    luck: 0,
    traceMemory: 0,
    noiseDiscipline: 0,
    smokeKit: 0,
    medSense: 0,
    contractPay: 0,
    bossRead: 0
  },
  storyFlags: {},
  achievements: {},
  hub: structuredClone(DEFAULT_HUB_SAVE),
  settings: {
    master: 0.75,
    sfx: 0.7,
    voice: 0.42,
    music: 0.22,
    footsteps: 0.8,
    muteUnfocused: true
  }
};

let save = loadSave();

const SHAPES = [
  { id: "circle", name: "Rift Runner", cost: 0, req: 0, sprite: "player_marine" },
  { id: "diamond", name: "Vanguard", cost: 8, req: 2, sprite: "player_vanguard" },
  { id: "triangle", name: "Outrider", cost: 12, req: 3, sprite: "player_alt" },
  { id: "hex", name: "Phantom", cost: 16, req: 4, sprite: "player_phantom" },
  { id: "medic", name: "Field Medic", cost: 20, req: 3, sprite: "player_alt" },
  { id: "breaker", name: "Breaker", cost: 24, req: 4, sprite: "player_vanguard" },
  { id: "rook", name: "Rook Guard", cost: 28, req: 4, sprite: "enemy_rook" },
  { id: "mire", name: "Mire Scout", cost: 32, req: 5, sprite: "enemy_mire" },
  { id: "sable", name: "Sable Knife", cost: 36, req: 5, sprite: "enemy_sable" },
  { id: "vampire", name: "Night Glass", cost: 42, req: 6, sprite: "enemy_vampire" },
  { id: "nullSuit", name: "Null Frame", cost: 55, req: 7, sprite: "enemy_null" },
  { id: "bossVanta", name: "Vanta Shell", cost: 70, req: 8, sprite: "boss_vanta" },
  { id: "bossNull", name: "Null Crown", cost: 90, req: 8, sprite: "boss_null" },
  { id: "greenRunner", name: "Green Hopper", cost: 18, req: 3, sprite: "player_platform_green" },
  { id: "pinkRunner", name: "Pink Lantern", cost: 22, req: 4, sprite: "player_platform_pink" },
  { id: "purpleRunner", name: "Purple Jumper", cost: 28, req: 5, sprite: "player_platform_purple" },
  { id: "beigeRunner", name: "Dust Walker", cost: 34, req: 6, sprite: "player_platform_beige" }
];

const COLORS = [
  { id: "pale", name: "Pale Trace", value: "#d8f6ff", cost: 0, req: 0 },
  { id: "arc", name: "Arc Blue", value: "#7cc7ff", cost: 5, req: 1 },
  { id: "volt", name: "Volt Green", value: "#7dffb2", cost: 8, req: 2 },
  { id: "ember", name: "Ember", value: "#ffb86b", cost: 10, req: 3 },
  { id: "void", name: "Void Violet", value: "#c77dff", cost: 12, req: 4 },
  { id: "blood", name: "Bloodline", value: "#ff304f", cost: 18, req: 5 },
  { id: "snow", name: "Whiteout", value: "#eef8ff", cost: 24, req: 6 },
  { id: "toxin", name: "Toxin", value: "#9dff63", cost: 32, req: 7 },
  { id: "gold", name: "Gold", value: "#ffd35a", cost: 46, req: 8 }
];



const STORY_CHAPTERS = [
  {
    "id": "ledger",
    "contractNo": "01",
    "name": "The Village Curse",
    "subtitle": "Bring back proof",
    "handler": "Village guide",
    "target": "First locked stairs",
    "objective": "Clear eight floors and bring back proof that Mira is alive.",
    "payout": "+12 shards, village supplies",
    "risk": "Basic guards, locked doors, and one boss at the stairs.",
    "art": "story_intake",
    "accent": "#52e4ff",
    "stageIds": ["graybox", "blue_halls", "amber_cross"],
    "unlockAt": 0,
    "log": "Village chapter started.",
    "summary": "Mira protected the village. The tower took her. The curse started the same night.",
    "briefingSlides": [
      {
        "speaker": "GUIDE",
        "title": "Mira is gone",
        "text": "Mira kept the village safe for as long as anyone here can remember. People prayed to her because the tower left us alone while she was here. Last night the tower doors opened and men dragged her inside."
      },
      {
        "speaker": "RUNNER",
        "title": "Why I am going",
        "text": "The wells turned black this morning. The lanterns died before sunset. The children heard Mira calling from the hill. I am going into the tower because someone has to bring her back."
      },
      {
        "speaker": "GUIDE",
        "title": "What to bring home",
        "text": "Clear the lower floors first. Bring back supplies when you find them. Maren, Rowan, and Tavi can use anything you recover to help you survive the next climb."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "First floor",
        "text": "You are inside the lower tower. The village is behind you and Mira is somewhere above you. Clear the room and look for anything useful."
      },
      "2": {
        "speaker": "RUNNER",
        "title": "After the first fight",
        "text": "I found dry food and clean bandages in a side box. Maren can use this if I make it back."
      },
      "4": {
        "speaker": "GUIDE",
        "title": "First sign",
        "text": "I found a camera still from last night. Mira was alive when they took her past this floor. She was standing on her own."
      },
      "6": {
        "speaker": "RUNNER",
        "title": "Keep going",
        "text": "Then I keep climbing. Tell the village she was alive when she passed here."
      },
      "8": {
        "speaker": "GUIDE",
        "title": "Stair guard",
        "text": "The first guard is behind this door. Beat him and the lower stairs open."
      }
    }
  },
  {
    "id": "iron",
    "contractNo": "02",
    "name": "Medicine Run",
    "subtitle": "Help Maren",
    "handler": "Maren",
    "target": "Old clinic floor",
    "objective": "Find medicine and open the next stair door.",
    "payout": "+16 shards, medicine crates",
    "risk": "Tighter rooms and a stronger stair guard.",
    "art": "story_dust",
    "accent": "#ffb86b",
    "stageIds": ["amber_cross", "forest_wire", "graybox"],
    "unlockAt": 2,
    "log": "Medicine run started.",
    "summary": "People in the village are getting sick. Maren needs medicine from the tower storage rooms.",
    "briefingSlides": [
      {
        "speaker": "MAREN",
        "title": "People are sick",
        "text": "The curse is making people weak. They wake up cold, even beside the fire. The tower used to keep medicine in the lower storage rooms."
      },
      {
        "speaker": "RUNNER",
        "title": "What I need",
        "text": "I will bring back what I can carry. Keep everyone alive until I return."
      },
      {
        "speaker": "GUIDE",
        "title": "Second climb",
        "text": "The next floors are tighter. Guards wait behind cover. Use smoke when you need to cross open ground."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "Storage level",
        "text": "This section used to feed the tower workers. Search boxes after the fight. Medicine will be marked with a red strip."
      },
      "3": {
        "speaker": "RUNNER",
        "title": "Found a crate",
        "text": "I found one crate with clean seals. It is heavy, so I am marking it for the way back."
      },
      "5": {
        "speaker": "MAREN",
        "title": "Hold steady",
        "text": "The children are sleeping now. The fever comes and goes. Keep moving if you can hear me."
      },
      "7": {
        "speaker": "STAIR GUARD",
        "title": "Before the stairs",
        "text": "Your village sent another one. They always send someone when the fires start going out."
      },
      "8": {
        "speaker": "GUIDE",
        "title": "Boss door",
        "text": "The guard is in the next room. Win this and Maren gets the medicine."
      }
    }
  },
  {
    "id": "whiteout",
    "contractNo": "03",
    "name": "The Snow Yard",
    "subtitle": "Follow Mira's trail",
    "handler": "Tavi",
    "target": "Cold outer yard",
    "objective": "Follow the trail and find where Mira was moved.",
    "payout": "+18 shards, torn cloth",
    "risk": "Bad vision, quiet enemies, and hidden movement.",
    "art": "story_cold",
    "accent": "#dff7ff",
    "stageIds": ["whiteout", "blue_halls", "graybox"],
    "unlockAt": 3,
    "log": "Snow yard started.",
    "summary": "Snow blew through the broken tower wall. Mira left a trail there.",
    "briefingSlides": [
      {
        "speaker": "TAVI",
        "title": "Tracks in the snow",
        "text": "I watched the tower lights last night. They moved Mira across the outside yard. Snow covered most of the trail, but some marks should still be there."
      },
      {
        "speaker": "RUNNER",
        "title": "Her trail",
        "text": "If she left cloth, blood, or a mark on the wall, I want to see it."
      },
      {
        "speaker": "GUIDE",
        "title": "Bad sight lines",
        "text": "The snow makes rooms harder to read. Pulse before you cross open space. Some enemies wait longer before they shoot."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "Cold entry",
        "text": "You are in the snow yard. Visibility is bad. Move from cover to cover."
      },
      "2": {
        "speaker": "RUNNER",
        "title": "Tracks",
        "text": "I see smaller footprints near the wall. They are half covered, but they point toward the next door."
      },
      "4": {
        "speaker": "TAVI",
        "title": "Torn cloth",
        "text": "The cloth you found matches Mira's cloak. Bring it back if you can. The village needs proof she passed this way."
      },
      "6": {
        "speaker": "RUNNER",
        "title": "Still alive",
        "text": "She left signs because she knew someone would look. I am still looking."
      },
      "8": {
        "speaker": "SNOW GUARD",
        "title": "Yard boss",
        "text": "She was cold when they brought her past me. She still asked whether anyone from the village had come."
      }
    }
  },
  {
    "id": "deadwing",
    "contractNo": "04",
    "name": "The Old Wing",
    "subtitle": "Find tools for Rowan",
    "handler": "Rowan",
    "target": "Broken workshop",
    "objective": "Search the old rooms and bring back tools.",
    "payout": "+20 shards, repair tools",
    "risk": "Broken rooms, ambushes, and enemies behind you.",
    "art": "story_deadwing",
    "accent": "#c77dff",
    "stageIds": ["undercrypt", "violet_split", "forest_wire"],
    "unlockAt": 4,
    "log": "Old wing started.",
    "summary": "The old wing has tools and metal Rowan can use to make your weapons safer.",
    "briefingSlides": [
      {
        "speaker": "ROWAN",
        "title": "Bad weapons fail",
        "text": "Your gun is going to break if you keep dragging it through the tower. The old wing has tools, springs, and decent steel. Bring me what you find."
      },
      {
        "speaker": "RUNNER",
        "title": "Search rooms",
        "text": "I will check lockers, wall boxes, and workshops. If it helps me reach Mira, I am taking it."
      },
      {
        "speaker": "GUIDE",
        "title": "Old wing",
        "text": "The cameras fail in this section. Watch your back. Some guards enter after the fight starts."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "Wing entry",
        "text": "The old wing is unstable. Stay near cover and listen for doors opening behind you."
      },
      "3": {
        "speaker": "RUNNER",
        "title": "Tool box",
        "text": "I found a tool box under a bench. Rowan will know what half of this is."
      },
      "5": {
        "speaker": "OLD GUARD",
        "title": "Locked shop",
        "text": "Other people came through here to save someone. Most of them left gear behind."
      },
      "7": {
        "speaker": "ROWAN",
        "title": "Take the steel",
        "text": "If you see blue stamped steel, take it. I can use that for a better barrel brace."
      },
      "8": {
        "speaker": "GUIDE",
        "title": "Workshop boss",
        "text": "The boss is holding the workshop door. Win this and Rowan gets enough tools to help."
      }
    }
  },
  {
    "id": "broadcast",
    "contractNo": "05",
    "name": "The Map Room",
    "subtitle": "Find Mira's door",
    "handler": "Tavi",
    "target": "Camera map",
    "objective": "Open the map room and find Mira's cell number.",
    "payout": "+24 shards, cell number",
    "risk": "Crowd hazards, poison, and boss pressure.",
    "art": "story_broadcast",
    "accent": "#ff304f",
    "stageIds": ["red_lock", "amber_cross", "violet_split"],
    "unlockAt": 5,
    "log": "Map room started.",
    "summary": "The tower cameras can show where Mira is held if you reach the map room.",
    "briefingSlides": [
      {
        "speaker": "TAVI",
        "title": "A way to find her",
        "text": "The tower has a camera map. If you reach it, I can look for Mira's door from the village radio."
      },
      {
        "speaker": "RUNNER",
        "title": "Use the cameras",
        "text": "If the tower can watch her, we can find her. Keep the line open."
      },
      {
        "speaker": "GUIDE",
        "title": "Hard floor",
        "text": "The guards know why you are here now. They will try to slow you down before you reach the map room."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "Camera floor",
        "text": "You are near the tower cameras. Clear rooms fast and look for a locked wall screen."
      },
      "2": {
        "speaker": "RUNNER",
        "title": "Her door",
        "text": "I need a room number, a hallway mark, anything that tells us where she is."
      },
      "4": {
        "speaker": "TAVI",
        "title": "Three rooms",
        "text": "I see three possible doors. One has food outside it. One has a chair against the handle. One has blue cloth on the floor."
      },
      "6": {
        "speaker": "PAID GUARD",
        "title": "Delay",
        "text": "They told me to keep you here. The longer you stay downstairs, the weaker your village gets."
      },
      "8": {
        "speaker": "GUIDE",
        "title": "Map room",
        "text": "Win this fight and Tavi can keep the camera map open long enough to find Mira's cell."
      }
    }
  },
  {
    "id": "core",
    "contractNo": "06",
    "name": "Mira's Door",
    "subtitle": "Bring her home",
    "handler": "Village guide",
    "target": "Final cell door",
    "objective": "Reach Mira's cell, beat the final guard, and bring her home.",
    "payout": "+30 shards, rescue",
    "risk": "Final boss, locked cell, and changing doors.",
    "art": "story_core",
    "accent": "#7cc7ff",
    "stageIds": ["blue_halls", "undercrypt", "whiteout", "red_lock"],
    "unlockAt": 7,
    "log": "Mira's door started.",
    "summary": "Mira is near the top. The village has one more chance to get her back.",
    "briefingSlides": [
      {
        "speaker": "TAVI",
        "title": "I found her",
        "text": "The camera map showed Mira's door. She is near the top, behind blue doors. She was sitting up when the camera passed."
      },
      {
        "speaker": "MAREN",
        "title": "The village is fading",
        "text": "People are trying to stay awake because the dreams are worse now. Bring her home if you can."
      },
      {
        "speaker": "RUNNER",
        "title": "Last climb",
        "text": "I know where she is now. I am going to her door."
      }
    ],
    "lines": {
      "1": {
        "speaker": "GUIDE",
        "title": "Top floor",
        "text": "You are close to her cell. The tower is moving guards into every room ahead of you."
      },
      "3": {
        "speaker": "RUNNER",
        "title": "Cell number",
        "text": "Keep her door on the screen. If it moves, call out the new room."
      },
      "5": {
        "speaker": "FINAL GUARD",
        "title": "Near the cell",
        "text": "Mira asked if the village was still alive. I told her I would know soon."
      },
      "7": {
        "speaker": "GUIDE",
        "title": "Last door",
        "text": "This is the last door before her cell. Take what you need and go through."
      },
      "8": {
        "speaker": "TOWER VOICE",
        "title": "Mira's door",
        "text": "The cell opens after the final fight. She can hear you from the room above."
      }
    }
  }
];

function storyChapterById(id) {
  return STORY_CHAPTERS.find(chapter => chapter.id === id) || STORY_CHAPTERS[0];
}

function storySceneForFloor(floor) {
  if (!activeStoryMode) return null;
  const chapter = storyChapterById(activeStoryChapterId);
  const line = (chapter.lines || {})[floor];
  if (!line) return null;
  return { chapter, line };
}


function storyTextHtml(text) {
  return String(text || "")
    .split(/\n\s*\n/)
    .map(part => `<p>${part.trim()}</p>`)
    .join("");
}

function stageById(id) {
  return STAGES.find(stage => stage.id === id);
}

const POWERUPS = [
  { id: "might", name: "Might", icon: "I", max: 8, cost: 6, desc: "Raises shot damage by 5% per rank." },
  { id: "armor", name: "Armor", icon: "A", max: 7, cost: 7, desc: "Reduces incoming damage by 6% per rank." },
  { id: "maxHealth", name: "Max Health", icon: "H", max: 8, cost: 7, desc: "Adds 10 max HP per rank." },
  { id: "cooldown", name: "Cooldown", icon: "C", max: 7, cost: 6, desc: "Reduces Pulse cooldown by 8% per rank." },
  { id: "area", name: "Area", icon: "R", max: 7, cost: 6, desc: "Adds Pulse reveal range per rank." },
  { id: "speed", name: "Move Speed", icon: "S", max: 6, cost: 8, desc: "Raises movement speed by 4% per rank." },
  { id: "reload", name: "Reload", icon: "L", max: 6, cost: 7, desc: "Reloads faster by 7% per rank." },
  { id: "luck", name: "Luck", icon: "?", max: 6, cost: 8, desc: "Adds bonus shards from cleared floors." },
  { id: "traceMemory", name: "Trace Memory", icon: "T", max: 5, cost: 9, desc: "Pulse echoes linger longer." },
  { id: "noiseDiscipline", name: "Quiet Step", icon: "Q", max: 5, cost: 9, desc: "Sneaking makes less sound." },
  { id: "smokeKit", name: "Smoke Kit", icon: "M", max: 4, cost: 10, desc: "Start each floor with more smoke." },
  { id: "medSense", name: "Med Sense", icon: "+", max: 4, cost: 9, desc: "Health pickups restore more HP." },
  { id: "contractPay", name: "Floor Pay", icon: "$", max: 5, cost: 11, desc: "Cleared floors pay more shards." },
  { id: "bossRead", name: "Boss Read", icon: "B", max: 4, cost: 12, desc: "Boss pressure is easier to survive." }
];

const RUN_UPGRADES = [
  {
    id: "pulse_core",
    name: "Pulse Core",
    tag: "Awareness",
    desc: "Pulse cooldown reduced by 18%.",
    apply: () => runStats.pulseCdMult *= 0.82
  },
  {
    id: "echo_trace",
    name: "Echo Trace",
    tag: "Awareness",
    desc: "Pulse reveals contact echoes longer and from farther away.",
    apply: () => {
      runStats.pulseRange += 70;
      runStats.echoDuration += 0.8;
    }
  },
  {
    id: "hollow_points",
    name: "Hollow Points",
    tag: "Combat",
    desc: "Shots deal 18% more damage.",
    apply: () => runStats.damageMult *= 1.18
  },
  {
    id: "deep_mag",
    name: "Deep Mag",
    tag: "Combat",
    desc: "Magazine size increased by 2.",
    apply: () => {
      runStats.ammoBonus += 2;
      player.ammo += 2;
    }
  },
  {
    id: "fast_hands",
    name: "Fast Hands",
    tag: "Combat",
    desc: "Reload time reduced by 18%.",
    apply: () => runStats.reloadMult *= 0.82
  },
  {
    id: "ghost_step",
    name: "Ghost Step",
    tag: "Movement",
    desc: "Sneaking makes less noise and pressure fades faster.",
    apply: () => {
      runStats.sneakNoiseMult *= 0.65;
      runStats.suspicionBleed += 2.5;
    }
  },
  {
    id: "reflex_buffer",
    name: "Reflex Buffer",
    tag: "Defense",
    desc: "Once per floor, the first hit is softened by 70%.",
    apply: () => runStats.reflexBuffer += 1
  },
  {
    id: "threat_read",
    name: "Threat Read",
    tag: "Awareness",
    desc: "Threat Sense gives a stronger warning when pressure builds.",
    apply: () => runStats.threatRead += 1
  },
  {
    id: "runner_frame",
    name: "Runner Frame",
    tag: "Movement",
    desc: "Move speed increased by 10%.",
    apply: () => runStats.moveMult *= 1.1
  },
  {
    id: "pulse_amp",
    name: "Pulse Amp",
    tag: "Awareness",
    desc: "Pulse range increased by 110.",
    apply: () => runStats.pulseRange += 110
  },
  {
    id: "echo_hold",
    name: "Echo Hold",
    tag: "Awareness",
    desc: "Pulse echoes remain visible 1.2s longer.",
    apply: () => runStats.echoDuration += 1.2
  },
  {
    id: "fast_ping",
    name: "Fast Ping",
    tag: "Awareness",
    desc: "Pulse cooldown reduced by 12%.",
    apply: () => runStats.pulseCdMult *= 0.88
  },
  {
    id: "spare_smoke",
    name: "Spare Smoke",
    tag: "Utility",
    desc: "Gain one extra smoke charge each floor.",
    apply: () => {
      runStats.smokeBonus += 1;
      player.smokeCharges += 1;
    }
  },
  {
    id: "field_patch",
    name: "Field Patch",
    tag: "Defense",
    desc: "Gain 18 max HP and heal 18 now.",
    apply: () => {
      runStats.maxHpBonus += 18;
      player.maxHp += 18;
      player.hp = Math.min(player.maxHp, player.hp + 18);
    }
  },
  {
    id: "calm_hands",
    name: "Calm Hands",
    tag: "Combat",
    desc: "Weapon heat builds 18% slower.",
    apply: () => runStats.heatMult *= 0.82
  }
];

const BOSS_ABILITY_REWARDS = {
  smoke: {
    id: "vanta_smoke_step",
    name: "Smoke Step",
    tag: "Boss ability",
    bossAbility: true,
    desc: "Your dodge cools down faster and leaves a short smoke cloud. Lasts one floor or three hits.",
    apply: () => grantBossAbility("vanta_smoke_step", "Smoke Step")
  },
  flicker: {
    id: "null_flicker",
    name: "Flicker Step",
    tag: "Boss ability",
    bossAbility: true,
    desc: "Your dodge travels farther and cools down faster. Lasts one floor or three hits.",
    apply: () => grantBossAbility("null_flicker", "Flicker Step")
  },
  poison: {
    id: "venom_rounds",
    name: "Venom Rounds",
    tag: "Boss ability",
    bossAbility: true,
    desc: "Your shots add a small poison tick. Lasts one floor or three hits.",
    apply: () => grantBossAbility("venom_rounds", "Venom Rounds")
  },
  necro: {
    id: "graves_guard",
    name: "Old Guard",
    tag: "Boss ability",
    bossAbility: true,
    desc: "The first hits next floor hurt less. Lasts one floor or three hits.",
    apply: () => grantBossAbility("graves_guard", "Old Guard")
  },
  mirror: {
    id: "mirror_step",
    name: "Mirror Step",
    tag: "Boss ability",
    bossAbility: true,
    desc: "Your dodge cools down faster after the boss fight. Lasts one floor or three hits.",
    apply: () => grantBossAbility("mirror_step", "Mirror Step")
  }
};

let runStats = null;

const STAGES = [
  {
    id: "graybox",
    name: "Graybox Entry",
    material: "concrete",
    palette: {
      floor: "#070a0f",
      grid: "rgba(255,255,255,0.035)",
      wall: "#202637",
      wallLine: "#343d55",
      pulse: "#7cc7ff"
    },
    spawn: { x: 76, y: 92 },
    botSpawns: [
      { x: 768, y: 88, role: "hunter" },
      { x: 838, y: 508, role: "coward" },
      { x: 650, y: 610, role: "baiter" },
      { x: 515, y: 128, role: "anchor" }
    ],
    walls: [
      { x: 140, y: 80, w: 40, h: 210 },
      { x: 285, y: 70, w: 240, h: 36 },
      { x: 620, y: 70, w: 46, h: 180 },
      { x: 730, y: 150, w: 120, h: 38 },
      { x: 90, y: 390, w: 220, h: 42 },
      { x: 385, y: 250, w: 46, h: 210 },
      { x: 510, y: 345, w: 215, h: 42 },
      { x: 780, y: 360, w: 42, h: 180 },
      { x: 220, y: 535, w: 360, h: 34 }
    ]
  },
  {
    id: "blue_halls",
    name: "Blue Halls",
    material: "concrete",
    palette: {
      floor: "#060b13",
      grid: "rgba(124,199,255,0.04)",
      wall: "#1a2b40",
      wallLine: "#31506c",
      pulse: "#7cc7ff"
    },
    spawn: { x: 82, y: 560 },
    botSpawns: [
      { x: 820, y: 78, role: "hunter" },
      { x: 820, y: 560, role: "flanker" },
      { x: 460, y: 310, role: "anchor" },
      { x: 720, y: 320, role: "baiter" },
      { x: 290, y: 110, role: "support" }
    ],
    walls: [
      { x: 180, y: 80, w: 42, h: 170 },
      { x: 180, y: 390, w: 42, h: 170 },
      { x: 330, y: 190, w: 260, h: 38 },
      { x: 330, y: 410, w: 260, h: 38 },
      { x: 470, y: 228, w: 42, h: 182 },
      { x: 710, y: 80, w: 46, h: 210 },
      { x: 710, y: 350, w: 46, h: 210 }
    ]
  },
  {
    id: "amber_cross",
    name: "Amber Cross",
    material: "gravel",
    palette: {
      floor: "#100b07",
      grid: "rgba(255,184,107,0.04)",
      wall: "#30251d",
      wallLine: "#6b4c31",
      pulse: "#ffd166"
    },
    spawn: { x: 480, y: 590 },
    botSpawns: [
      { x: 480, y: 64, role: "hunter" },
      { x: 850, y: 120, role: "flanker" },
      { x: 110, y: 120, role: "flanker" },
      { x: 850, y: 520, role: "baiter" },
      { x: 110, y: 520, role: "support" }
    ],
    walls: [
      { x: 105, y: 160, w: 230, h: 36 },
      { x: 625, y: 160, w: 230, h: 36 },
      { x: 105, y: 444, w: 230, h: 36 },
      { x: 625, y: 444, w: 230, h: 36 },
      { x: 462, y: 110, w: 36, h: 180 },
      { x: 462, y: 350, w: 36, h: 180 },
      { x: 365, y: 302, w: 230, h: 36 }
    ]
  },
  {
    id: "violet_split",
    name: "Violet Split",
    material: "wood",
    palette: {
      floor: "#0d0714",
      grid: "rgba(199,125,255,0.045)",
      wall: "#2a1b3c",
      wallLine: "#553b79",
      pulse: "#c77dff"
    },
    spawn: { x: 80, y: 320 },
    botSpawns: [
      { x: 875, y: 320, role: "hunter" },
      { x: 510, y: 100, role: "anchor" },
      { x: 510, y: 540, role: "anchor" },
      { x: 765, y: 120, role: "flanker" },
      { x: 765, y: 520, role: "baiter" },
      { x: 240, y: 120, role: "support" }
    ],
    walls: [
      { x: 220, y: 64, w: 40, h: 190 },
      { x: 220, y: 386, w: 40, h: 190 },
      { x: 410, y: 0, w: 42, h: 220 },
      { x: 410, y: 420, w: 42, h: 220 },
      { x: 590, y: 210, w: 42, h: 220 },
      { x: 745, y: 64, w: 40, h: 190 },
      { x: 745, y: 386, w: 40, h: 190 },
      { x: 350, y: 300, w: 260, h: 40 }
    ]
  },
  {
    id: "red_lock",
    name: "Red Lock",
    material: "laminate",
    palette: {
      floor: "#120608",
      grid: "rgba(255,92,122,0.04)",
      wall: "#341820",
      wallLine: "#78364a",
      pulse: "#ff5c7a"
    },
    spawn: { x: 80, y: 80 },
    botSpawns: [
      { x: 880, y: 560, role: "hunter" },
      { x: 880, y: 80, role: "flanker" },
      { x: 80, y: 560, role: "flanker" },
      { x: 480, y: 320, role: "anchor" },
      { x: 480, y: 100, role: "baiter" },
      { x: 480, y: 540, role: "support" },
      { x: 820, y: 320, role: "hunter" }
    ],
    walls: [
      { x: 160, y: 145, w: 220, h: 36 },
      { x: 580, y: 145, w: 220, h: 36 },
      { x: 160, y: 459, w: 220, h: 36 },
      { x: 580, y: 459, w: 220, h: 36 },
      { x: 290, y: 265, w: 110, h: 36 },
      { x: 560, y: 265, w: 110, h: 36 },
      { x: 290, y: 339, w: 110, h: 36 },
      { x: 560, y: 339, w: 110, h: 36 },
      { x: 462, y: 220, w: 36, h: 200 }
    ]
  },
  {
    id: "whiteout",
    name: "Whiteout Yard",
    material: "snow",
    palette: {
      floor: "#c7d7e6",
      grid: "rgba(23, 55, 83, 0.06)",
      wall: "#9fb2c6",
      wallLine: "#5b7897",
      pulse: "#7cc7ff"
    },
    spawn: { x: 88, y: 550 },
    botSpawns: [
      { x: 845, y: 82, role: "duelist" },
      { x: 840, y: 540, role: "anchor" },
      { x: 500, y: 90, role: "hunter" }
    ],
    walls: [
      { x: 172, y: 130, w: 170, h: 34 },
      { x: 618, y: 130, w: 170, h: 34 },
      { x: 170, y: 478, w: 170, h: 34 },
      { x: 620, y: 478, w: 170, h: 34 },
      { x: 448, y: 210, w: 64, h: 220 },
      { x: 320, y: 305, w: 96, h: 30 },
      { x: 545, y: 305, w: 96, h: 30 }
    ]
  },
  {
    id: "forest_wire",
    name: "Forest Wire",
    material: "nature",
    palette: {
      floor: "#0f261b",
      grid: "rgba(125,255,178,0.045)",
      wall: "#263b23",
      wallLine: "#637b38",
      pulse: "#7dffb2"
    },
    spawn: { x: 78, y: 320 },
    botSpawns: [
      { x: 870, y: 320, role: "hunter" },
      { x: 480, y: 92, role: "flanker" },
      { x: 480, y: 548, role: "anchor" }
    ],
    walls: [
      { x: 190, y: 90, w: 42, h: 190 },
      { x: 190, y: 360, w: 42, h: 190 },
      { x: 380, y: 80, w: 210, h: 34 },
      { x: 380, y: 526, w: 210, h: 34 },
      { x: 460, y: 245, w: 40, h: 150 },
      { x: 710, y: 180, w: 42, h: 110 },
      { x: 710, y: 350, w: 42, h: 110 }
    ]
  },
  {
    id: "undercrypt",
    name: "Undercrypt",
    material: "concrete",
    palette: {
      floor: "#111015",
      grid: "rgba(255,211,90,0.035)",
      wall: "#29232d",
      wallLine: "#6f5b6d",
      pulse: "#ffd35a"
    },
    spawn: { x: 480, y: 590 },
    botSpawns: [
      { x: 480, y: 62, role: "boss" },
      { x: 110, y: 105, role: "flanker" },
      { x: 850, y: 105, role: "hunter" }
    ],
    walls: [
      { x: 120, y: 135, w: 220, h: 38 },
      { x: 620, y: 135, w: 220, h: 38 },
      { x: 120, y: 465, w: 220, h: 38 },
      { x: 620, y: 465, w: 220, h: 38 },
      { x: 452, y: 120, w: 56, h: 150 },
      { x: 452, y: 370, w: 56, h: 150 },
      { x: 330, y: 302, w: 300, h: 36 }
    ]
  }
];

const BOT_COLORS = ["#ff6b6b", "#ffb86b", "#c77dff", "#ffd166", "#ff5c7a", "#a1ffce", "#7cc7ff"];
const BOSS_FLOORS = new Set([3, 5, 7, 8]);

const BOT_PROFILES = [
  {
    name: "Vanta",
    callSign: "Angle Demon",
    color: "#ff6b6b",
    model: "blade",
    sprite: "enemy_vanta",
    weaponId: "carbine",
    trait: "wide swings, fast shoulder peeks, and commits hard after contact",
    patience: 0.62,
    coverBias: 0.5,
    aggression: 0.92,
    aim: 0.82,
    reactionBoost: 0.1,
    peekBias: 0.95,
    smokeBias: 0.05
  },
  {
    name: "Mire",
    callSign: "Turtle",
    color: "#ffb86b",
    model: "shield",
    sprite: "enemy_mire",
    weaponId: "shotgun",
    trait: "backs into cover, forces close corners, and waits for overpeeks",
    patience: 1.08,
    coverBias: 1.0,
    aggression: 0.46,
    aim: 0.58,
    reactionBoost: -0.04,
    peekBias: 0.35,
    smokeBias: 0.18
  },
  {
    name: "Sable",
    callSign: "Reload Thief",
    color: "#c77dff",
    model: "split",
    sprite: "enemy_sable",
    weaponId: "smg",
    trait: "presses reloads, stutter steps, and punishes repeated paths",
    patience: 0.8,
    coverBias: 0.7,
    aggression: 0.7,
    aim: 0.64,
    reactionBoost: 0.02,
    peekBias: 0.72,
    smokeBias: 0.14
  },
  {
    name: "Rook",
    callSign: "Hard Hold",
    color: "#ffd166",
    model: "anchor",
    sprite: "enemy_rook",
    weaponId: "dmr",
    trait: "holds long lanes and relocates after losing the angle",
    patience: 1.18,
    coverBias: 1.0,
    aggression: 0.52,
    aim: 0.78,
    reactionBoost: 0.04,
    peekBias: 0.28,
    smokeBias: 0.06
  },
  {
    name: "Null",
    callSign: "Smoke Rat",
    color: "#a1ffce",
    model: "needle",
    sprite: "enemy_null",
    weaponId: "needler",
    trait: "breaks vision with smoke and changes angles",
    patience: 0.7,
    coverBias: 0.72,
    aggression: 0.76,
    aim: 0.68,
    reactionBoost: 0.06,
    peekBias: 0.75,
    smokeBias: 0.72
  },
  { name: "Buzz", callSign: "Needle Wing", color: "#ffd35a", model: "flit", sprite: "enemy_bee", weaponId: "smg", trait: "zigzags through short lanes and forces fast reactions", patience: 0.55, coverBias: 0.52, aggression: 0.9, aim: 0.58, reactionBoost: 0.04, peekBias: 0.82, smokeBias: 0.16 },
  { name: "Croak", callSign: "Mud Anchor", color: "#7dffb2", model: "guard", sprite: "enemy_frog", weaponId: "shotgun", trait: "holds dirty corners and jumps after contact", patience: 0.9, coverBias: 0.9, aggression: 0.62, aim: 0.6, reactionBoost: 0.0, peekBias: 0.45, smokeBias: 0.12 },
  { name: "Skitter", callSign: "Wall Mouse", color: "#c77dff", model: "runner", sprite: "enemy_mouse", weaponId: "revolver", trait: "takes side paths and punishes slow reloads", patience: 0.72, coverBias: 0.66, aggression: 0.78, aim: 0.66, reactionBoost: 0.03, peekBias: 0.74, smokeBias: 0.08 }
];

const BOSS_PROFILES = [
  {
    name: "Vanta",
    title: "Gate Guard",
    color: "#ff3b57",
    model: "boss_blade",
    sprite: "boss_vanta",
    weaponId: "revolver",
    trait: "guards the stairs and fights hard from cover",
    bossKit: "mirror",
    barks: ["go home", "she waited", "you look tired"],
    patience: 0.78,
    coverBias: 0.86,
    aggression: 1.04,
    aim: 0.92,
    reactionBoost: 0.16,
    peekBias: 1.0,
    smokeBias: 0.14
  },
  {
    name: "Flicker",
    title: "Cold Room Hunter",
    color: "#8cf4ff",
    model: "boss_eye",
    sprite: "boss_null",
    weaponId: "needler",
    trait: "hides in smoke and waits for clean shots",
    bossKit: "flicker",
    barks: ["she heard me", "keep walking", "wrong room"],
    patience: 0.84,
    coverBias: 1.02,
    aggression: 0.94,
    aim: 0.91,
    reactionBoost: 0.14,
    peekBias: 0.9,
    smokeBias: 0.72
  },
  {
    name: "Venom",
    title: "Paid Guard",
    color: "#7dff72",
    model: "needle",
    sprite: "enemy_null",
    weaponId: "breacher",
    trait: "uses poison and pressure to slow the rescue",
    bossKit: "poison",
    barks: ["slow down", "she is upstairs", "keep bleeding"],
    patience: 0.92,
    coverBias: 0.88,
    aggression: 0.82,
    aim: 0.86,
    reactionBoost: 0.1,
    peekBias: 0.62,
    smokeBias: 0.28
  },
  {
    name: "Graves",
    title: "Old Wing Guard",
    color: "#c77dff",
    model: "anchor",
    sprite: "boss_null",
    weaponId: "dmr",
    trait: "calls weak guards from side rooms",
    bossKit: "necro",
    barks: ["doors open", "more coming", "leave something"],
    patience: 1.02,
    coverBias: 1.08,
    aggression: 0.7,
    aim: 0.88,
    reactionBoost: 0.12,
    peekBias: 0.42,
    smokeBias: 0.18
  }
];

const player = {
  x: 76,
  y: 92,
  r: 10,
  baseSpeed: 176,
  hp: 100,
  maxHp: 100,
  angle: 0,
  ammo: 6,
  maxAmmo: 6,
  reload: 0,
  shotCd: 0,
  pulseCd: 0,
  pulseActive: 0,
  noise: 0,
  spotted: 0,
  kills: 0,
  shots: 0,
  hits: 0,
  reflexReady: 0,
  weaponId: "pistol",
  weaponHeat: 0,
  recoil: 0,
  smokeCharges: 0,
  fireBuffer: 0,
  nearMissCd: 0,
  dashCd: 0,
  dashTime: 0,
  dashInvuln: 0,
  dashAngle: 0,
  moveIntent: 0
};

let bots = [];

const VILLAGE_WORLD = { w: 3100, h: 1680 };
const villagePlayer = {
  x: 1100,
  y: 650,
  r: 12,
  speed: 178,
  angle: -Math.PI / 2,
  bob: 0,
  interactCooldown: 0
};
let villageInteractTarget = null;
let villageMessage = { speaker: "Maren", text: "Walk the village. Press E near people, buildings, rubble, the shrine, or the tower gate.", t: 5 };
let villagePulse = 0;
let villageEnergyFlash = 0;
let villageHistoryOpen = false;
let villageMesses = [];
let villageNextMessAt = 0;
let villageFishingGame = null;
let villageMapOpen = false;
let villageBuildMode = false;
let villageMoveState = null;
let villageDistrictLabel = { name: "Mira's Road", last: "", t: 0, maxT: 0 };
let villageBridgeCutscene = null;
const achievementToasts = [];

const VILLAGE_TOWER_GATE = { x: 1100, y: 155 };
const VILLAGE_SHRINE = { x: 1100, y: 440 };
const VILLAGE_WELL = { x: 912, y: 420 };
const VILLAGE_POND = { x: 330, y: 300, rx: 156, ry: 88 };
const VILLAGE_HOME = { x: 1320, y: 430, w: 180, h: 120 };
const VILLAGE_CHEST = { x: 1248, y: 282 };
const VILLAGE_RIVER = { x: 2260, y: 0, w: 128, h: VILLAGE_WORLD.h };
const VILLAGE_BRIDGE = { x: 2324, y: 720, w: 210, h: 104, cost: { supplies: 24, ore: 8, hope: 6 }, req: { homeRank: 3, bestFloor: 5, text: "House rank 3 and floor 5" } };
const VILLAGE_DARK_DISTRICT = { x: 2400, y: 0, w: VILLAGE_WORLD.w - 2400, h: VILLAGE_WORLD.h };
const VILLAGE_VISITOR_SPOT = { x: 1395, y: 282 };
const VILLAGE_DAILY_BOARD = { x: 846, y: 288, r: 58 };

const VILLAGE_MESS_SPOTS = [
  { x: 650, y: 360 }, { x: 930, y: 350 }, { x: 1290, y: 360 }, { x: 1540, y: 420 },
  { x: 475, y: 475 }, { x: 820, y: 520 }, { x: 1180, y: 615 }, { x: 1515, y: 650 },
  { x: 425, y: 770 }, { x: 760, y: 810 }, { x: 1160, y: 810 }, { x: 1635, y: 840 },
  { x: 610, y: 1040 }, { x: 980, y: 1120 }, { x: 1360, y: 1100 }, { x: 1765, y: 1040 }
];

const VILLAGER_PATROLS = {
  maren: [{ x: 360, y: 720 }, { x: 465, y: 630 }, { x: 618, y: 540 }, { x: 450, y: 805 }, { x: 360, y: 720 }],
  rowan: [{ x: 950, y: 930 }, { x: 1120, y: 850 }, { x: 1280, y: 880 }, { x: 1010, y: 1080 }, { x: 820, y: 930 }, { x: 950, y: 930 }],
  tavi: [{ x: 1720, y: 720 }, { x: 1540, y: 610 }, { x: 1440, y: 370 }, { x: 1900, y: 600 }, { x: 1720, y: 720 }]
};

const VILLAGE_VILLAGER_SPOTS = [
  { id: "maren", x: 360, y: 720, hut: { x: 220, y: 548, w: 230, h: 152 }, color: "#7dffb2" },
  { id: "rowan", x: 950, y: 930, hut: { x: 820, y: 756, w: 250, h: 164 }, color: "#ffd35a" },
  { id: "tavi", x: 1720, y: 720, hut: { x: 1585, y: 548, w: 230, h: 152 }, color: "#7cc7ff" }
];

const VILLAGE_TOWNSFOLK = [
  { id: "pella", name: "Pella", title: "Builder", x: 1500, y: 520, sprite: "player_alt", icon: "tiny_axe", action: "help Pella", need: { supplies: 3 }, prep: "kitchen_stew", rewardHope: 2, text: "Pella can shore up the road before the next climb." },
  { id: "nix", name: "Nix", title: "Forager", x: 620, y: 610, sprite: "player_marine", icon: "tiny_flower", action: "help Nix", need: { crops: 1, seeds: 1 }, prep: "garden_tonic", rewardHope: 1, text: "Nix turns spare food into a small field tonic." },
  { id: "orin", name: "Orin", title: "Cartographer", x: 1640, y: 440, sprite: "player_phantom", icon: "tiny_target", action: "help Orin", need: { ore: 1 }, prep: "tavi_map", rewardHope: 1, text: "Orin marks a safer stair path for tonight." },
  { id: "vesper", name: "Vesper", title: "Gate Keeper", x: 2590, y: 510, sprite: "enemy_vampire", icon: "tiny_key", action: "help Vesper", need: { ore: 2 }, prep: "shrine_candle", rewardHope: 2, needsBridge: true, text: "Vesper trades grave wards for ore." },
  { id: "moss", name: "Moss", title: "Marsh Cook", x: 2760, y: 920, sprite: "rpg_orc", icon: "tiny_flower", action: "help Moss", need: { fish: 2 }, prep: "garden_tonic", rewardHope: 2, needsBridge: true, text: "Moss cooks tonics across the bridge." }
];

const VILLAGE_TOWNSFOLK_PATROLS = {
  pella: [{ x: 1500, y: 520 }, { x: 1580, y: 470 }, { x: 1685, y: 560 }, { x: 1515, y: 650 }, { x: 1420, y: 565 }, { x: 1500, y: 520 }],
  nix: [{ x: 620, y: 610 }, { x: 520, y: 550 }, { x: 440, y: 690 }, { x: 590, y: 820 }, { x: 745, y: 650 }, { x: 620, y: 610 }],
  orin: [{ x: 1640, y: 440 }, { x: 1740, y: 475 }, { x: 1840, y: 610 }, { x: 1690, y: 760 }, { x: 1510, y: 610 }, { x: 1640, y: 440 }],
  vesper: [{ x: 2590, y: 510 }, { x: 2690, y: 480 }, { x: 2860, y: 650 }, { x: 2700, y: 760 }, { x: 2520, y: 640 }, { x: 2590, y: 510 }],
  moss: [{ x: 2760, y: 920 }, { x: 2890, y: 860 }, { x: 2940, y: 1040 }, { x: 2655, y: 1110 }, { x: 2520, y: 960 }, { x: 2760, y: 920 }]
};

const VILLAGE_RUBBLE = [
  { id: "rubble_well", x: 872, y: 432, r: 22, label: "old stones" },
  { id: "rubble_shrine", x: 1225, y: 440, r: 22, label: "broken candles" },
  { id: "rubble_maren", x: 224, y: 736, r: 23, label: "fallen wood" },
  { id: "rubble_rowan", x: 1092, y: 932, r: 21, label: "scrap pile" },
  { id: "rubble_tavi", x: 1905, y: 690, r: 24, label: "dead lanterns" },
  { id: "rubble_gate_left", x: 945, y: 210, r: 24, label: "gate rubble" },
  { id: "rubble_gate_right", x: 1265, y: 210, r: 24, label: "gate rubble" },
  { id: "rubble_path", x: 1098, y: 690, r: 22, label: "path debris" },
  { id: "rubble_garden", x: 574, y: 548, r: 24, label: "dead garden beds" },
  { id: "rubble_watch", x: 1850, y: 570, r: 24, label: "watch post boards" },
  { id: "rubble_kitchen", x: 1298, y: 896, r: 22, label: "cold firepit" },
  { id: "rubble_road", x: 1110, y: 1235, r: 24, label: "road debris" },
  { id: "blocker_old_oak", x: 725, y: 380, r: 38, label: "fallen old oak", kind: "oak", supplies: 3, shards: 1, req: { homeRank: 1, text: "House rank 1" } },
  { id: "blocker_cracked_boulder", x: 1515, y: 1285, r: 42, label: "cracked tower boulder", kind: "boulder", supplies: 2, ore: 2, shards: 1, req: { bestFloor: 4, text: "Reach floor 4" } },
  { id: "blocker_sealed_cart", x: 2020, y: 1015, r: 42, label: "sealed supply cart", kind: "cart", supplies: 5, shards: 3, req: { homeRank: 3, bestFloor: 6, text: "House rank 3 and floor 6" } },
  { id: "blocker_crypt_vines", x: 2600, y: 680, r: 34, label: "crypt vines", kind: "oak", supplies: 3, shards: 2, req: { bridge: true, text: "Repair bridge" } },
  { id: "blocker_grave_cache", x: 2860, y: 980, r: 38, label: "buried cache", kind: "cart", supplies: 4, ore: 2, shards: 2, req: { bridge: true, bestFloor: 5, text: "Bridge and floor 5" } }
];

const VILLAGE_STUMPS = [
  { id: "stump_west_pond", x: 112, y: 342, r: 20, hp: 3, supplies: 1 },
  { id: "stump_pond_south", x: 506, y: 382, r: 20, hp: 3, supplies: 1 },
  { id: "stump_gate_left", x: 852, y: 392, r: 20, hp: 4, supplies: 1, shards: 1 },
  { id: "stump_gate_right", x: 1350, y: 392, r: 20, hp: 4, supplies: 1, shards: 1 },
  { id: "stump_maren_outer", x: 128, y: 740, r: 20, hp: 3, supplies: 1 },
  { id: "stump_maren_south", x: 518, y: 852, r: 20, hp: 3, supplies: 1 },
  { id: "stump_rowan_south", x: 1142, y: 1052, r: 20, hp: 3, supplies: 1 },
  { id: "stump_tavi_outer", x: 1988, y: 728, r: 20, hp: 3, supplies: 1 },
  { id: "stump_garden_left", x: 458, y: 604, r: 20, hp: 3, supplies: 1 },
  { id: "stump_garden_right", x: 828, y: 648, r: 20, hp: 3, supplies: 1 },
  { id: "stump_kitchen_left", x: 1140, y: 902, r: 20, hp: 4, supplies: 1, shards: 1 },
  { id: "stump_kitchen_right", x: 1450, y: 1008, r: 20, hp: 3, supplies: 1 },
  { id: "stump_watch_north", x: 1745, y: 464, r: 20, hp: 3, supplies: 1 },
  { id: "stump_watch_south", x: 1920, y: 840, r: 20, hp: 3, supplies: 1 },
  { id: "stump_road_left", x: 760, y: 1280, r: 20, hp: 3, supplies: 1 },
  { id: "stump_road_right", x: 1430, y: 1274, r: 20, hp: 3, supplies: 1 },
  { id: "tree_west_green", x: 330, y: 970, r: 28, hp: 5, supplies: 2, treeKey: "town_tree_green" },
  { id: "tree_north_gold", x: 620, y: 260, r: 28, hp: 5, supplies: 2, shards: 1, treeKey: "town_tree_gold" },
  { id: "tree_east_blue", x: 1850, y: 335, r: 30, hp: 6, supplies: 2, treeKey: "town_tree_blue" },
  { id: "stump_giant_oak", x: 520, y: 1160, r: 36, hp: 8, supplies: 4, shards: 2, longGoal: true, req: { homeRank: 2, text: "House rank 2" } },
  { id: "stump_ironroot", x: 1668, y: 1180, r: 40, hp: 10, supplies: 5, shards: 3, longGoal: true, req: { homeRank: 3, bestFloor: 4, text: "House rank 3 and floor 4" } },
  { id: "stump_ancient_root", x: 2050, y: 1320, r: 44, hp: 12, supplies: 7, shards: 4, longGoal: true, req: { homeRank: 5, bestFloor: 6, text: "House rank 5 and floor 6" } },
  { id: "tree_grave_pine_a", x: 2450, y: 300, r: 34, hp: 8, supplies: 3, shards: 1, longGoal: true, treeKey: "town_tree_blue", req: { bridge: true, text: "Repair bridge" } },
  { id: "tree_grave_pine_b", x: 2770, y: 430, r: 36, hp: 9, supplies: 4, shards: 1, longGoal: true, treeKey: "town_tree_gold", req: { bridge: true, text: "Repair bridge" } },
  { id: "stump_gloom_oak", x: 2505, y: 360, r: 38, hp: 10, supplies: 5, shards: 2, longGoal: true, req: { bridge: true, text: "Repair bridge" } },
  { id: "stump_bone_root", x: 2845, y: 620, r: 42, hp: 12, supplies: 6, shards: 3, longGoal: true, req: { bridge: true, bestFloor: 5, text: "Bridge and floor 5" } },
  { id: "stump_grave_heart", x: 2680, y: 1210, r: 46, hp: 15, supplies: 8, shards: 5, longGoal: true, req: { bridge: true, homeRank: 4, text: "Bridge and house rank 4" } }
];

let villageToolSwing = { t: 0, x: 0, y: 0, angle: 0 };

const VILLAGE_MINE_NODES = [
  { id: "mine_north", x: 1762, y: 286, r: 24, ore: 1, shards: 1, hp: 3 },
  { id: "mine_east", x: 2030, y: 488, r: 24, ore: 1, shards: 0, hp: 3 },
  { id: "mine_watch", x: 1888, y: 860, r: 24, ore: 2, shards: 1, hp: 3 },
  { id: "mine_grave_a", x: 2575, y: 820, r: 28, ore: 2, shards: 1, hp: 4, req: { bridge: true, text: "Repair bridge" } },
  { id: "mine_grave_b", x: 2910, y: 1120, r: 30, ore: 3, shards: 2, hp: 5, req: { bridge: true, bestFloor: 5, text: "Bridge and floor 5" } }
];

const VILLAGE_FISHING_SPOTS = [
  { id: "pond", x: 464, y: 320, r: 36, name: "pond" }
];

const VILLAGE_FARM_PLOTS = [
  { id: "farm_1", x: 548, y: 520 },
  { id: "farm_2", x: 598, y: 520 },
  { id: "farm_3", x: 648, y: 520 },
  { id: "farm_4", x: 698, y: 520 },
  { id: "farm_5", x: 548, y: 570 },
  { id: "farm_6", x: 598, y: 570 },
  { id: "farm_7", x: 648, y: 570 },
  { id: "farm_8", x: 698, y: 570 }
];

const VILLAGE_VISITORS = {
  seed: { name: "Seed Seller", title: "seed cart", sprite: "player_alt", action: "buy seeds", text: "Seeds for supplies. No speech, no ceremony.", cost: { supplies: 2 }, reward: { seeds: 2 } },
  miner: { name: "Ore Buyer", title: "road trader", sprite: "player_vanguard", action: "trade ore", text: "Ore for shards. Simple trade.", cost: { ore: 3 }, reward: { shards: 3 } },
  fisher: { name: "Fish Cook", title: "camp cook", sprite: "player_marine", action: "trade fish", text: "Fish becomes travel food.", cost: { fish: 2 }, reward: { supplies: 2 } },
  gift: { name: "Lost Pilgrim", title: "visitor", sprite: "player_phantom", action: "accept gift", text: "A quiet gift left by the road.", cost: {}, reward: { supplies: 1, seeds: 1 } },
  relic: { name: "Relic Picker", title: "junk hunter", sprite: "player_vanguard", action: "swap supplies", text: "Supplies for one clean relic shard.", cost: { supplies: 3 }, reward: { shards: 2 } },
  medic: { name: "Road Medic", title: "field tent", sprite: "player_alt", action: "trade crops", text: "Crops for field supplies.", cost: { crops: 2 }, reward: { supplies: 2 } }
};

const VILLAGE_PROJECTS = [
  {
    id: "garden",
    name: "Garden",
    x: 640,
    y: 555,
    color: "#7dffb2",
    max: 99,
    action: "repair garden",
    text: "Add one better garden row.",
    reward: "The garden has another working row.",
    bonus: "+3 max HP per rank. Ranks 2 and 4 add one extra supply from campaign floors."
  },
  {
    id: "kitchen",
    name: "Kitchen",
    x: 1280,
    y: 890,
    color: "#ffd35a",
    max: 99,
    action: "repair kitchen",
    text: "Make the kitchen feed one more climb.",
    reward: "The kitchen can feed more people before each climb.",
    bonus: "+1 starting smoke per kitchen rank."
  },
  {
    id: "watchpost",
    name: "Watch Post",
    x: 1840,
    y: 560,
    color: "#7cc7ff",
    max: 99,
    action: "raise watch post",
    text: "Raise the watch so scouts can see farther.",
    reward: "The watch post can see farther into the tower.",
    bonus: "+22 pulse range per watch post rank."
  }
];

const VILLAGE_SERVICE_BUILDINGS = {
  collection: { x: 1510, y: 965, w: 190, h: 128, label: "Gear House", action: "open collection", color: "#c77dff" },
  power: { x: 650, y: 1020, w: 190, h: 128, label: "Training Hall", action: "open power ups", color: "#7cc7ff" },
  road: { x: 1030, y: 1280, w: 160, h: 108, label: "Road House", action: "main menu", color: "#ffd35a" }
};

const VILLAGE_OBSTACLES = [
  { x: 0, y: -80, w: VILLAGE_WORLD.w, h: 100 },
  { x: -80, y: 0, w: 100, h: VILLAGE_WORLD.h },
  { x: VILLAGE_WORLD.w - 20, y: 0, w: 100, h: VILLAGE_WORLD.h },
  { x: 0, y: VILLAGE_WORLD.h - 20, w: VILLAGE_WORLD.w, h: 100 },
  { x: VILLAGE_TOWER_GATE.x - 150, y: VILLAGE_TOWER_GATE.y - 62, w: 300, h: 104 },
  { x: VILLAGE_SHRINE.x - 92, y: VILLAGE_SHRINE.y - 70, w: 184, h: 120 },
  { x: VILLAGE_VILLAGER_SPOTS[0].hut.x + 12, y: VILLAGE_VILLAGER_SPOTS[0].hut.y + 64, w: VILLAGE_VILLAGER_SPOTS[0].hut.w - 24, h: 68 },
  { x: VILLAGE_VILLAGER_SPOTS[1].hut.x + 12, y: VILLAGE_VILLAGER_SPOTS[1].hut.y + 64, w: VILLAGE_VILLAGER_SPOTS[1].hut.w - 24, h: 72 },
  { x: VILLAGE_VILLAGER_SPOTS[2].hut.x + 12, y: VILLAGE_VILLAGER_SPOTS[2].hut.y + 64, w: VILLAGE_VILLAGER_SPOTS[2].hut.w - 24, h: 68 },
  { x: VILLAGE_SERVICE_BUILDINGS.collection.x + 18, y: VILLAGE_SERVICE_BUILDINGS.collection.y + 42, w: VILLAGE_SERVICE_BUILDINGS.collection.w - 36, h: 70 },
  { x: VILLAGE_SERVICE_BUILDINGS.power.x + 18, y: VILLAGE_SERVICE_BUILDINGS.power.y + 42, w: VILLAGE_SERVICE_BUILDINGS.power.w - 36, h: 70 },
  { x: VILLAGE_SERVICE_BUILDINGS.road.x + 18, y: VILLAGE_SERVICE_BUILDINGS.road.y + 42, w: VILLAGE_SERVICE_BUILDINGS.road.w - 36, h: 54 },
  { x: VILLAGE_HOME.x - 84, y: VILLAGE_HOME.y - 52, w: 168, h: 92 },
  { x: VILLAGE_POND.x - VILLAGE_POND.rx + 18, y: VILLAGE_POND.y - VILLAGE_POND.ry + 10, w: VILLAGE_POND.rx * 2 - 36, h: VILLAGE_POND.ry * 2 - 20 }
];

const VILLAGE_DECOR = Array.from({ length: 245 }, (_, i) => ({
  x: 54 + ((i * 173) % (VILLAGE_WORLD.w - 108)),
  y: 82 + ((i * 91) % (VILLAGE_WORLD.h - 164)),
  s: 0.5 + ((i * 37) % 82) / 100,
  a: ((i * 29) % 628) / 100,
  kind: i % 13 === 0 ? "flower" : i % 7 === 0 ? "bush" : "grass"
}));

const VILLAGE_TREE_LINES = [
  [74, 120, "town_tree_green"], [132, 96, "town_tree_green"], [292, 120, "town_tree_blue"],
  [1600, 92, "town_tree_gold"], [1735, 110, "town_tree_green"], [2030, 158, "town_tree_blue"],
  [88, 1180, "town_tree_green"], [170, 1330, "town_tree_gold"], [312, 1420, "town_tree_green"],
  [1920, 1250, "town_tree_blue"], [2040, 1120, "town_tree_green"], [2140, 890, "town_tree_gold"],
  [120, 740, "town_tree_blue"], [2048, 720, "town_tree_green"], [80, 520, "town_tree_green"], [2100, 420, "town_tree_green"],
  [520, 1240, "town_tree_blue"], [1580, 1320, "town_tree_green"],
  [2440, 260, "town_tree_blue"], [2620, 320, "town_tree_gold"], [2860, 420, "town_tree_blue"],
  [2510, 1180, "town_tree_green"], [2920, 1320, "town_tree_gold"]
];

const VILLAGE_PREP_DEFS = {
  maren_meal: { slot: "meal", name: "Maren's Meal", text: "+15 max HP next floor", apply: () => { runStats.maxHpBonus += 15; }, revert: () => { runStats.maxHpBonus -= 15; } },
  garden_tonic: { slot: "meal", name: "Garden Tonic", text: "healing pickups restore 25% more", apply: () => { runStats.healMult = (runStats.healMult || 1) * 1.25; }, revert: () => { runStats.healMult = (runStats.healMult || 1) / 1.25; } },
  rowan_oil: { slot: "tool", name: "Rowan's Oil", text: "+20% damage next floor", apply: () => { runStats.damageMult *= 1.2; }, revert: () => { runStats.damageMult /= 1.2; } },
  kitchen_stew: { slot: "tool", name: "Kitchen Stew", text: "+1 smoke charge next floor", apply: () => { runStats.smokeBonus += 1; }, revert: () => { runStats.smokeBonus -= 1; } },
  tavi_map: { slot: "scout", name: "Tavi's Map", text: "+90 Pulse range next floor", apply: () => { runStats.pulseRange += 90; }, revert: () => { runStats.pulseRange -= 90; } },
  shrine_candle: { slot: "shrine", name: "Mira's Ward", text: "+1 death retry on the next run", apply: () => { runStats.retries = (runStats.retries || 0) + 1; }, revert: () => { runStats.retries = Math.max(0, (runStats.retries || 0) - 1); } },
  shrine_endure: { slot: "shrine", name: "Vow of Endurance", text: "+20 max HP next run", apply: () => { runStats.maxHpBonus += 20; }, revert: () => { runStats.maxHpBonus -= 20; } },
  shrine_smoke: { slot: "shrine", name: "Vow of Smoke", text: "+1 smoke next run", apply: () => { runStats.smokeBonus += 1; }, revert: () => { runStats.smokeBonus -= 1; } },
  shrine_lantern: { slot: "shrine", name: "Grave Lantern", text: "+120 Pulse range next run", apply: () => { runStats.pulseRange += 120; }, revert: () => { runStats.pulseRange -= 120; } }
};

const VILLAGE_TOWER_OMENS = [
  { id: "supply_hum", name: "Supply hum", text: "Supply rooms are louder tonight. Extra cache, more enemies watching.", rewardText: "+1 supply from the next story floor.", supplyBonus: 1 },
  { id: "cold_east", name: "Cold east stair", text: "The east stairs are cold. Boss floors pay better, but the tower feels meaner.", rewardText: "+2 shards from boss floors.", bossShardBonus: 2 },
  { id: "quiet_tower", name: "Quiet tower", text: "The tower is quiet. Fewer chances, safer climb.", rewardText: "+6 max HP if you enter now.", hpPrepBonus: 6 },
  { id: "red_lights", name: "Red lights", text: "Red lights burn above the gate. Rival floors are worth the risk.", rewardText: "+2 shards from rival floors.", rivalShardBonus: 2 },
  { id: "mira_whisper", name: "Mira whisper", text: "Mira's voice is close. Story floors bring back more for the village.", rewardText: "+1 supply from story floors.", supplyBonus: 1 }
];

const VILLAGE_DAILY_EVENTS = [
  { id: "fish_biting", name: "Fish are biting", text: "First catches bring an extra fish today." },
  { id: "loose_stone", name: "Loose stone", text: "The first mine swing today pulls extra ore." },
  { id: "forge_heat", name: "Forge heat", text: "Village projects cost one less supply today." },
  { id: "rain", name: "Soft rain", text: "New seeds are planted and watered together." },
  { id: "sick_tent", name: "Sick tent", text: "Helping Maren pays extra trust today." }
];

const SMOKE_WHITE_FRAMES = ["smoke_white_00", "smoke_white_04", "smoke_white_08", "smoke_white_12", "smoke_white_16", "smoke_white_20", "smoke_white_24"];
const SMOKE_BLACK_FRAMES = ["smoke_black_00", "smoke_black_04", "smoke_black_08", "smoke_black_12", "smoke_black_16", "smoke_black_20", "smoke_black_24"];

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_SAVE),
      ...parsed,
      unlockedShapes: parsed.unlockedShapes?.length ? parsed.unlockedShapes : ["circle"],
      unlockedColors: parsed.unlockedColors?.length ? parsed.unlockedColors : ["pale"],
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      storyFlags: {
        ...(parsed.storyFlags || {})
      },
      achievements: {
        ...(parsed.achievements || {})
      },
      hub: {
        ...structuredClone(DEFAULT_HUB_SAVE),
        ...(parsed.hub || {}),
        helped: {
          ...structuredClone(DEFAULT_HUB_SAVE).helped,
          ...(parsed.hub?.helped || {})
        },
        rubbleCleared: {
          ...(parsed.hub?.rubbleCleared || {})
        },
        projects: {
          ...(parsed.hub?.projects || {})
        },
        stumpsCleared: {
          ...(parsed.hub?.stumpsCleared || {})
        },
        stumpHits: {
          ...(parsed.hub?.stumpHits || {})
        },
        stumpDrops: {
          ...(parsed.hub?.stumpDrops || {})
        },
        mineCleared: {
          ...(parsed.hub?.mineCleared || {})
        },
        mineHits: {
          ...(parsed.hub?.mineHits || {})
        },
        farmPlots: {
          ...(parsed.hub?.farmPlots || {})
        },
        hope: Number(parsed.hub?.hope ?? DEFAULT_HUB_SAVE.hope) || 0,
        retries: Number(parsed.hub?.retries ?? DEFAULT_HUB_SAVE.retries) || 0,
        townLog: Array.isArray(parsed.hub?.townLog) ? parsed.hub.townLog.slice(0, 32) : [],
        homeRank: Number(parsed.hub?.homeRank) || 0,
        homeRestDay: Number(parsed.hub?.homeRestDay ?? -1),
        chest: {
          ...structuredClone(DEFAULT_HUB_SAVE).chest,
          ...(parsed.hub?.chest || {})
        },
        seeds: Number(parsed.hub?.seeds ?? DEFAULT_HUB_SAVE.seeds) || 0,
        fish: Number(parsed.hub?.fish) || 0,
        ore: Number(parsed.hub?.ore) || 0,
        crops: Number(parsed.hub?.crops) || 0,
        farmHarvests: Number(parsed.hub?.farmHarvests) || 0,
        energy: Number(parsed.hub?.energy ?? DEFAULT_HUB_SAVE.energy) || 0,
        towerDay: Number(parsed.hub?.towerDay) || 0,
        fishingDay: Number(parsed.hub?.fishingDay ?? -1),
        fishingUses: Number(parsed.hub?.fishingUses) || 0,
        fishingRodRank: Number(parsed.hub?.fishingRodRank) || 0,
        bait: Number(parsed.hub?.bait) || 0,
        visitor: parsed.hub?.visitor || null,
        activeTask: parsed.hub?.activeTask || null,
        taskCounter: Number(parsed.hub?.taskCounter) || 0
      },
      powerups: {
        ...structuredClone(DEFAULT_SAVE).powerups,
        ...(parsed.powerups || {})
      },
      settings: {
        ...structuredClone(DEFAULT_SAVE).settings,
        ...(parsed.settings || {})
      }
    };
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function unlockAchievement(id, title, text) {
  save.achievements = save.achievements || {};
  if (save.achievements[id]) return false;
  save.achievements[id] = true;
  saveGame();
  achievementToasts.unshift({ id, title, text, t: 4.2, maxT: 4.2 });
  achievementToasts.splice(4);
  playAssetSfx("bonus_chime", 0.34);
  return true;
}

function checkVillageAchievements(source = "") {
  const hub = ensureHubSave();
  if (save.totalClears >= 1) unlockAchievement("first_floor", "First Floor Down", "The tower blinked first.");
  if (save.totalClears >= 5) unlockAchievement("five_floors", "One More Run", "Five floors cleared across attempts.");
  if (save.bestFloor >= 4) unlockAchievement("floor_four", "Halfway Hungry", "Reached floor 4.");
  if (hubHope() >= 5) unlockAchievement("hope_5", "People Are Watching", "Held 5 hope at once.");
  if ((hub.retries || 0) > 0) unlockAchievement("bought_retry", "Pocket Miracle", "Stored a boss retry token.");
  if (hubProjectTotal() >= 3) unlockAchievement("builder_3", "Actual Contractor", "Upgraded town projects 3 times.");
  if (hubRubbleClearedCount() >= 5) unlockAchievement("cleanup_5", "Less Embarrassing", "Cleared 5 rubble piles.");
  if (hubStumpClearedCount() >= 3) unlockAchievement("wood_3", "Stump Goblin", "Chopped 3 stumps.");
  if ((hub.collection?.visitors && Object.keys(hub.collection.visitors).length >= 3)) unlockAchievement("visitors_3", "Road Gets Busy", "Met 3 visitor types.");
  if ((hub.boardTasks || []).some(task => task.done)) unlockAchievement("first_board", "Pinned And Done", "Finished a daily board job.");
  if (Object.keys(hub.completedDailyTaskIds || {}).length >= 5) unlockAchievement("board_5", "Clipboard Goblin", "Finished 5 board jobs.");
  if ((hub.homeRank || 0) >= 1) unlockAchievement("home_rank_1", "Mine, Not The Tower's", "Built your first house.");
  if ((hub.homeRank || 0) >= 3) unlockAchievement("home_rank_3", "Indoor Person", "Reached house rank 3.");
  if (source === "hairball") unlockAchievement("first_hairball", "Not My Job", "Cleaned your first hairball.");
  if (source === "chest") unlockAchievement("used_chest", "It Stacks", "Moved an item through the chest.");
  if (hubRubbleClearedCount() + hubStumpClearedCount() >= 24) unlockAchievement("town_unblocked", "No Excuses Left", "Removed 24 town blockers.");
}

function updateAchievementToasts(dt) {
  for (const toast of achievementToasts) toast.t -= dt;
  for (let i = achievementToasts.length - 1; i >= 0; i--) {
    if (achievementToasts[i].t <= 0) achievementToasts.splice(i, 1);
  }
}

function drawAchievementToasts() {
  if (!achievementToasts.length) return;
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  achievementToasts.forEach((toast, i) => {
    const alpha = clamp(Math.min(toast.t, toast.maxT - toast.t) * 2.2, 0, 1);
    const x = W - 344;
    const y = 118 + i * 72;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(3,5,12,0.82)";
    ctx.fillRect(x, y, 318, 58);
    ctx.strokeStyle = "rgba(255,211,90,0.82)";
    ctx.strokeRect(x + 0.5, y + 0.5, 317, 57);
    ctx.fillStyle = "#ffd35a";
    ctx.font = "900 10px ui-monospace, monospace";
    ctx.fillText("ACHIEVEMENT", x + 14, y + 10);
    ctx.fillStyle = "#f5f1ff";
    ctx.font = "900 15px ui-monospace, monospace";
    ctx.fillText(toast.title, x + 14, y + 26);
    ctx.fillStyle = "rgba(217,222,234,0.78)";
    ctx.font = "800 10px ui-monospace, monospace";
    ctx.fillText(toast.text, x + 14, y + 44);
  });
  ctx.restore();
}

function setVolumeSetting(name, value) {
  const allowed = new Set(["master", "sfx", "voice", "music", "footsteps"]);
  if (!allowed.has(name)) return;
  save.settings = {
    ...structuredClone(DEFAULT_SAVE.settings),
    ...(save.settings || {})
  };
  save.settings[name] = clamp(value, 0, 1);
  saveGame();
  updateMusicVolume();
  updateOneShotAudioVolumes();
}

function setMuteUnfocused(enabled) {
  save.settings = {
    ...structuredClone(DEFAULT_SAVE.settings),
    ...(save.settings || {})
  };
  save.settings.muteUnfocused = !!enabled;
  saveGame();
  updateMusicVolume();
  updateOneShotAudioVolumes();
}

function resetSave() {
  save = structuredClone(DEFAULT_SAVE);
  saveGame();
  renderMenu();
  addLog("Save reset.");
}


function ensureHubSave() {
  const previousHubRef = save.hub || null;
  save.hub = {
    ...structuredClone(DEFAULT_HUB_SAVE),
    ...(save.hub || {}),
    helped: {
      ...structuredClone(DEFAULT_HUB_SAVE).helped,
      ...(save.hub?.helped || {})
    },
    rubbleCleared: {
      ...(save.hub?.rubbleCleared || {})
    },
    projects: {
      ...(save.hub?.projects || {})
    },
    stumpsCleared: {
      ...(save.hub?.stumpsCleared || {})
    },
    stumpHits: {
      ...(save.hub?.stumpHits || {})
    },
    stumpDrops: {
      ...(save.hub?.stumpDrops || {})
    },
    mineCleared: {
      ...(save.hub?.mineCleared || {})
    },
    mineHits: {
      ...(save.hub?.mineHits || {})
    },
    farmPlots: {
      ...(save.hub?.farmPlots || {})
    },
    hope: Number(save.hub?.hope ?? DEFAULT_HUB_SAVE.hope) || 0,
    retries: Number(save.hub?.retries ?? DEFAULT_HUB_SAVE.retries) || 0,
    townLog: Array.isArray(save.hub?.townLog) ? save.hub.townLog.slice(0, 32) : [],
    homeRank: Number(save.hub?.homeRank) || 0,
    homeRestDay: Number(save.hub?.homeRestDay ?? -1),
    chest: {
      ...structuredClone(DEFAULT_HUB_SAVE).chest,
      ...(save.hub?.chest || {})
    },
    seeds: Number(save.hub?.seeds ?? DEFAULT_HUB_SAVE.seeds) || 0,
    fish: Number(save.hub?.fish) || 0,
    ore: Number(save.hub?.ore) || 0,
    crops: Number(save.hub?.crops) || 0,
    farmHarvests: Number(save.hub?.farmHarvests) || 0,
    energy: Number(save.hub?.energy ?? DEFAULT_HUB_SAVE.energy) || 0,
    towerDay: Number(save.hub?.towerDay) || 0,
    fishingDay: Number(save.hub?.fishingDay ?? -1),
    fishingUses: Number(save.hub?.fishingUses) || 0,
    fishingRodRank: Number(save.hub?.fishingRodRank) || 0,
    bait: Number(save.hub?.bait) || 0,
    visitor: save.hub?.visitor || null,
    activeTask: save.hub?.activeTask || null,
    boardTasks: Array.isArray(save.hub?.boardTasks) ? save.hub.boardTasks : [],
    boardTaskDay: Number(save.hub?.boardTaskDay ?? -1),
    selectedTaskId: save.hub?.selectedTaskId || null,
    completedDailyTaskIds: {
      ...(save.hub?.completedDailyTaskIds || {})
    },
    towerOmen: save.hub?.towerOmen || null,
    dailyEvent: save.hub?.dailyEvent || null,
    dailyEventUsed: {
      ...(save.hub?.dailyEventUsed || {})
    },
    prep: {
      ...structuredClone(DEFAULT_HUB_SAVE).prep,
      ...(save.hub?.prep || {})
    },
    collection: {
      ...structuredClone(DEFAULT_HUB_SAVE).collection,
      ...(save.hub?.collection || {}),
      visitors: {
        ...(save.hub?.collection?.visitors || {})
      },
      memories: {
        ...(save.hub?.collection?.memories || {})
      }
    },
    lastReturnCard: save.hub?.lastReturnCard || null,
    bridgeFixed: Boolean(save.hub?.bridgeFixed),
    bridgeCutsceneSeen: Boolean(save.hub?.bridgeCutsceneSeen),
    layout: {
      ...(save.hub?.layout || {})
    },
    townSinksUsed: {
      ...(save.hub?.townSinksUsed || {})
    },
    nightFallDay: Number(save.hub?.nightFallDay ?? -1),
    nightFallPending: Boolean(save.hub?.nightFallPending),
    taskCounter: Number(save.hub?.taskCounter) || 0
  };
  if (previousHubRef) {
    const normalizedHub = save.hub;
    save.hub = previousHubRef;
    for (const key of Object.keys(save.hub)) delete save.hub[key];
    Object.assign(save.hub, normalizedHub);
  }
  return save.hub;
}

function hubHope() {
  return Number(ensureHubSave().hope) || 0;
}

function pushVillageLogEntry(speaker, text) {
  const hub = ensureHubSave();
  const line = `${speaker}: ${text}`;
  const list = Array.isArray(hub.townLog) ? hub.townLog : [];
  if (list[0] === line) return;
  list.unshift(line);
  hub.townLog = list.slice(0, 32);
  saveGame();
}

function addVillageHope(amount = 1, source = "") {
  const hub = ensureHubSave();
  hub.hope = Math.max(0, (Number(hub.hope) || 0) + amount);
  if (source) hub.lastHelp = `${source}. Hope +${amount}.`;
  saveGame();
  return hub.hope;
}

function spendVillageHope(amount, reason = "") {
  const hub = ensureHubSave();
  if ((Number(hub.hope) || 0) < amount) return false;
  hub.hope = Math.max(0, (Number(hub.hope) || 0) - amount);
  if (reason) hub.lastHelp = `${reason}. Hope -${amount}.`;
  saveGame();
  return true;
}

function villageRestoredCount() {
  return Math.min(hubTotalHelp(), hubHopeMax());
}

function villageHasVisibleOverlay() {
  return overlay && overlay.classList.contains("show");
}

function villageVillagerPoint(spot) {
  const path = VILLAGER_PATROLS[spot.id] || [{ x: spot.x, y: spot.y }];
  if (path.length < 2) return { x: spot.x, y: spot.y };
  const rank = hubVillagerRank(spot.id);
  const speed = 0.045 + Math.min(5, rank) * 0.006;
  const progress = (nowSec() * speed + spot.x * 0.001) % 1;
  const scaled = progress * (path.length - 1);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const a = path[index];
  const b = path[Math.min(path.length - 1, index + 1)];
  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local
  };
}

function villagePathPoint(path, speed = 0.05, seed = 0) {
  if (!Array.isArray(path) || path.length < 2) return path?.[0] || { x: 0, y: 0 };
  const progress = (nowSec() * speed + seed) % 1;
  const scaled = progress * (path.length - 1);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const a = path[index];
  const b = path[Math.min(path.length - 1, index + 1)];
  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local
  };
}

function villageTownfolkPoint(npc) {
  const path = VILLAGE_TOWNSFOLK_PATROLS[npc.id] || [{ x: npc.x, y: npc.y }];
  return villagePathPoint(path, 0.04 + (npc.name.length % 3) * 0.006, npc.x * 0.0007);
}

function shiftVillagePath(path, dx, dy) {
  if (!Array.isArray(path)) return;
  for (const point of path) {
    point.x += dx;
    point.y += dy;
  }
}

function villagePlaceableEntries() {
  const entries = [];
  const addPoint = (id, label, object, radius = 34, locked = false) => entries.push({
    id,
    label,
    x: object.x,
    y: object.y,
    r: radius,
    locked,
    set: (x, y) => { object.x = x; object.y = y; }
  });
  const addRect = (id, label, object, locked = false) => entries.push({
    id,
    label,
    x: object.x + object.w / 2,
    y: object.y + object.h / 2,
    r: Math.max(object.w, object.h) * 0.34,
    locked,
    set: (x, y) => { object.x = x - object.w / 2; object.y = y - object.h / 2; }
  });
  addPoint("home", "House", VILLAGE_HOME, 74);
  addPoint("chest", "Storage", VILLAGE_CHEST, 34);
  addPoint("board", "Daily Board", VILLAGE_DAILY_BOARD, 42);
  addPoint("shrine", "Shrine", VILLAGE_SHRINE, 62);
  addPoint("tower", "Tower Gate", VILLAGE_TOWER_GATE, 76, true);
  addPoint("pond", "Pond", VILLAGE_POND, 92, true);
  addPoint("visitor", "Visitor Camp", VILLAGE_VISITOR_SPOT, 58);
  for (const [key, building] of Object.entries(VILLAGE_SERVICE_BUILDINGS)) addRect(`service_${key}`, building.label, building);
  for (const spot of VILLAGE_VILLAGER_SPOTS) {
    addRect(`hut_${spot.id}`, `${hubVillagerById(spot.id)?.name || spot.id} Hut`, spot.hut);
    entries.push({
      id: `villager_${spot.id}`,
      label: hubVillagerById(spot.id)?.name || spot.id,
      x: spot.x,
      y: spot.y,
      r: 36,
      set: (x, y) => { spot.x = x; spot.y = y; }
    });
  }
  for (const npc of VILLAGE_TOWNSFOLK) entries.push({
    id: `npc_${npc.id}`,
    label: npc.name,
    x: npc.x,
    y: npc.y,
    r: 36,
    set: (x, y) => {
      const dx = x - npc.x;
      const dy = y - npc.y;
      npc.x = x;
      npc.y = y;
      shiftVillagePath(VILLAGE_TOWNSFOLK_PATROLS[npc.id], dx, dy);
    }
  });
  for (const project of VILLAGE_PROJECTS) addPoint(`project_${project.id}`, project.name, project, 78);
  for (const plot of VILLAGE_FARM_PLOTS) addPoint(`farm_${plot.id}`, "Farm Plot", plot, 28);
  for (const mine of VILLAGE_MINE_NODES) addPoint(`mine_${mine.id}`, "Ore Node", mine, 34);
  for (const spot of VILLAGE_FISHING_SPOTS) addPoint(`fish_${spot.id}`, "Fishing Spot", spot, 44);
  for (const rubble of VILLAGE_RUBBLE) {
    if (villageRubbleCleared(rubble.id)) continue;
    addPoint(`rubble_${rubble.id}`, rubble.label || "Rubble", rubble, Math.max(26, rubble.r || 24));
  }
  for (const stump of VILLAGE_STUMPS) {
    if (villageStumpCleared(stump.id)) continue;
    addPoint(`stump_${stump.id}`, stump.treeKey ? "Tree" : stump.longGoal ? "Old Growth" : "Stump", stump, Math.max(26, stump.r || 22));
  }
  return entries;
}

function applyVillageLayout() {
  const hub = ensureHubSave();
  const layout = hub.layout || {};
  if (!layout || !Object.keys(layout).length) return;
  for (const entry of villagePlaceableEntries()) {
    const pos = layout[entry.id];
    if (!pos || entry.locked) continue;
    entry.set(clamp(Number(pos.x) || entry.x, 24, VILLAGE_WORLD.w - 24), clamp(Number(pos.y) || entry.y, 24, VILLAGE_WORLD.h - 24));
  }
}

function saveVillageLayoutEntry(entry, x, y) {
  if (!entry || entry.locked) return;
  const hub = ensureHubSave();
  hub.layout = hub.layout || {};
  hub.layout[entry.id] = { x: Math.round(x), y: Math.round(y) };
  saveGame();
}

function findVillagePlaceableAt(x, y) {
  let best = null;
  for (const entry of villagePlaceableEntries()) {
    if (entry.locked) continue;
    const d = Math.hypot(x - entry.x, y - entry.y);
    if (d <= Math.max(28, entry.r || 34) && (!best || d < best.d)) best = { ...entry, d };
  }
  return best;
}

function toggleVillageBuildMode() {
  if (mode !== "village" || villageHasVisibleOverlay()) return;
  villageBuildMode = !villageBuildMode;
  villageMapOpen = false;
  villageMoveState = null;
  setVillageMessage("Move Mode", villageBuildMode ? "Click a town object, drag it, click again to place." : "Town layout saved.", 3.2);
}

function handleVillageBuildMouseDown(x, y) {
  if (!villageBuildMode) return false;
  if (villageMoveState?.entry) {
    saveVillageLayoutEntry(villageMoveState.entry, villageMoveState.entry.x, villageMoveState.entry.y);
    setVillageMessage("Move Mode", `${villageMoveState.entry.label} placed.`, 1.8);
    villageMoveState = null;
    return true;
  }
  const entry = findVillagePlaceableAt(x, y);
  if (!entry) {
    setVillageMessage("Move Mode", "Click an object to move it. Press B to finish.", 2.2);
    return true;
  }
  villageMoveState = { entry, dx: entry.x - x, dy: entry.y - y };
  setVillageMessage("Move Mode", `Moving ${entry.label}. Click to place.`, 2.2);
  return true;
}

function updateVillageBuildMove() {
  if (!villageBuildMode || !villageMoveState?.entry) return;
  const entry = villageMoveState.entry;
  const x = clamp(mouse.x + villageMoveState.dx, 32, VILLAGE_WORLD.w - 32);
  const y = clamp(mouse.y + villageMoveState.dy, 32, VILLAGE_WORLD.h - 32);
  entry.x = x;
  entry.y = y;
  entry.set(x, y);
}

function villageObstacleRects() {
  const rects = [
    { x: 0, y: -80, w: VILLAGE_WORLD.w, h: 100 },
    { x: -80, y: 0, w: 100, h: VILLAGE_WORLD.h },
    { x: VILLAGE_WORLD.w - 20, y: 0, w: 100, h: VILLAGE_WORLD.h },
    { x: 0, y: VILLAGE_WORLD.h - 20, w: VILLAGE_WORLD.w, h: 100 },
    { x: VILLAGE_TOWER_GATE.x - 150, y: VILLAGE_TOWER_GATE.y - 62, w: 300, h: 104 },
    { x: VILLAGE_SHRINE.x - 92, y: VILLAGE_SHRINE.y - 70, w: 184, h: 120 },
    { x: VILLAGE_HOME.x - 84, y: VILLAGE_HOME.y - 52, w: 168, h: 92 },
    { x: VILLAGE_POND.x - VILLAGE_POND.rx + 18, y: VILLAGE_POND.y - VILLAGE_POND.ry + 10, w: VILLAGE_POND.rx * 2 - 36, h: VILLAGE_POND.ry * 2 - 20 }
  ];
  for (const spot of VILLAGE_VILLAGER_SPOTS) rects.push({ x: spot.hut.x + 12, y: spot.hut.y + 64, w: spot.hut.w - 24, h: Math.max(54, spot.hut.h - 86) });
  for (const building of Object.values(VILLAGE_SERVICE_BUILDINGS)) rects.push({ x: building.x + 18, y: building.y + 42, w: building.w - 36, h: Math.max(52, building.h - 58) });
  return rects;
}

function villagePointIsDark(x, y) {
  return x >= VILLAGE_DARK_DISTRICT.x;
}

function currentVillageDistrict(x = villagePlayer.x, y = villagePlayer.y) {
  if (villagePointIsDark(x, y) && villageBridgeFixed()) return "Grave Road";
  if (y < 300) return "Tower Gate";
  if (Math.hypot(x - VILLAGE_POND.x, y - VILLAGE_POND.y) < 260) return "Pond Path";
  const garden = hubProjectById("garden");
  if (garden && Math.hypot(x - garden.x, y - garden.y) < 260) return "Garden Row";
  if (Math.hypot(x - VILLAGE_HOME.x, y - VILLAGE_HOME.y) < 220) return "Home Yard";
  if (y > 1080) return "Old Road";
  return "Mira's Road";
}

function updateVillageDistrictLabel(dt) {
  const district = currentVillageDistrict();
  if (district !== villageDistrictLabel.last) {
    villageDistrictLabel = { name: district, last: district, t: 4.8, maxT: 4.8 };
  } else {
    villageDistrictLabel.t = Math.max(0, villageDistrictLabel.t - dt);
  }
}

function toggleVillageMap() {
  if (mode !== "village" || villageHasVisibleOverlay()) return;
  villageMapOpen = !villageMapOpen;
  if (villageMapOpen) villageBuildMode = false;
  setVillageMessage("Map", villageMapOpen ? "Map open. Press M or Esc to close." : "Map closed.", 1.8);
}

function startVillageBridgeCutscene() {
  villageBridgeCutscene = { t: 4.2, maxT: 4.2 };
  villageDistrictLabel = { name: "Grave Road", last: "Grave Road", t: 5.5, maxT: 5.5 };
}

function updateVillageBridgeCutscene(dt) {
  if (!villageBridgeCutscene) return;
  villageBridgeCutscene.t = Math.max(0, villageBridgeCutscene.t - dt);
  if (villageBridgeCutscene.t <= 0) villageBridgeCutscene = null;
}

function villageMessSpotSafe(x, y) {
  if (villageBlocked(x, y, 16)) return false;
  const keepAway = [
    VILLAGE_TOWER_GATE,
    VILLAGE_SHRINE,
    VILLAGE_HOME,
    VILLAGE_DAILY_BOARD,
    VILLAGE_VISITOR_SPOT,
    VILLAGE_CHEST,
    ...VILLAGE_MINE_NODES,
    ...VILLAGE_FISHING_SPOTS,
    ...VILLAGE_PROJECTS,
    ...VILLAGE_VILLAGER_SPOTS.map(spot => villageVillagerPoint(spot)),
    ...VILLAGE_TOWNSFOLK.map(npc => villageTownfolkPoint(npc))
  ];
  return !keepAway.some(point => Math.hypot(x - point.x, y - point.y) < 72);
}

function hubVillagerById(id) {
  return HUB_VILLAGERS.find(villager => villager.id === id);
}

function hubVillagerRank(id) {
  return ensureHubSave().helped[id] || 0;
}

function hubRubbleClearedCount() {
  return Object.values(ensureHubSave().rubbleCleared || {}).filter(Boolean).length;
}

function hubStumpClearedCount() {
  return Object.values(ensureHubSave().stumpsCleared || {}).filter(Boolean).length;
}

function hubProjectRank(id) {
  const project = VILLAGE_PROJECTS.find(item => item.id === id);
  const raw = Number(ensureHubSave().projects?.[id]) || 0;
  return clamp(raw, 0, project?.max ?? raw);
}

function hubProjectTotal() {
  return Object.values(ensureHubSave().projects || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function hubTotalHelp() {
  const hub = ensureHubSave();
  const villagerHelp = Object.values(hub.helped).reduce((sum, value) => sum + (Number(value) || 0), 0);
  const farmHelp = Math.min(Number(hub.farmHarvests) || 0, VILLAGE_FARM_PLOTS.length);
  return villagerHelp + hubRubbleClearedCount() + hubStumpClearedCount() + hubProjectTotal() + farmHelp;
}

function hubHopeMax() {
  const villagerMax = HUB_VILLAGERS.reduce((sum, villager) => sum + villager.max, 0);
  const projectMax = VILLAGE_PROJECTS.reduce((sum, project) => sum + project.max, 0);
  return villagerMax + VILLAGE_RUBBLE.length + VILLAGE_STUMPS.length + projectMax + VILLAGE_FARM_PLOTS.length;
}

function hubHopePercent() {
  return Math.round((hubTotalHelp() / Math.max(1, hubHopeMax())) * 100);
}

function villageMaxEnergy() {
  return 7;
}

function villageEnergy() {
  const hub = ensureHubSave();
  const max = villageMaxEnergy();
  const raw = hub.energy;
  hub.energy = raw === undefined || raw === null
    ? max
    : clamp(Number(raw) || 0, 0, max);
  return hub.energy;
}

function activeVillageOmen() {
  const omen = ensureHubSave().towerOmen;
  if (!omen) return null;
  const def = VILLAGE_TOWER_OMENS.find(item => item.id === omen.id);
  return def ? { ...def, day: omen.day } : null;
}

function activeVillageDailyEvent() {
  const event = ensureHubSave().dailyEvent;
  if (!event) return null;
  const def = VILLAGE_DAILY_EVENTS.find(item => item.id === event.id);
  return def ? { ...def, day: event.day } : null;
}

function pickVillageOmen(source = "tower") {
  const hub = ensureHubSave();
  const index = Math.abs(Math.floor(villageHash(hub.towerDay, String(source).length) * VILLAGE_TOWER_OMENS.length)) % VILLAGE_TOWER_OMENS.length;
  const omen = VILLAGE_TOWER_OMENS[index];
  hub.towerOmen = { id: omen.id, day: hub.towerDay };
  return omen;
}

function pickVillageDailyEvent(source = "tower") {
  const hub = ensureHubSave();
  const index = Math.abs(Math.floor(villageHash(hub.towerDay + 7, String(source).length + 3) * VILLAGE_DAILY_EVENTS.length)) % VILLAGE_DAILY_EVENTS.length;
  const event = VILLAGE_DAILY_EVENTS[index];
  hub.dailyEvent = { id: event.id, day: hub.towerDay };
  hub.dailyEventUsed = {};
  return event;
}

function refillVillageEnergy(source = "after tower") {
  const hub = ensureHubSave();
  hub.towerDay = (Number(hub.towerDay) || 0) + 1;
  hub.energy = villageMaxEnergy();
  hub.fishingDay = hub.towerDay;
  hub.fishingUses = 0;
  hub.nightFallPending = false;
  assignVillageVisitor(source);
  updateFarmGrowthAfterTower();
  const omen = pickVillageOmen(source);
  const event = pickVillageDailyEvent(source);
  assignVillageBoardAfterFloor(Math.max(1, currentFloor || hub.towerDay));
  hub.lastGain = `Day ${hub.towerDay}: energy restored. ${omen.name}: ${omen.rewardText}`;
  villageEnergyFlash = 1;
  playAssetSfx("town_leaves", 0.12) || playAssetSfx("town_building_work", 0.08);
  saveGame();
  return { omen, event };
}

function spendVillageEnergy(cost, label = "work") {
  const hub = ensureHubSave();
  const max = villageMaxEnergy();
  const energy = clamp(Number(hub.energy ?? max) || 0, 0, max);
  const spend = Math.max(1, Math.ceil(Number(cost) || 1));
  if (energy < spend) {
    hub.energy = energy;
    saveGame();
    updateHud();
    playAssetSfx("ui_error_001", 0.28) || playAssetSfx("ui_button_click", 0.16);
    floatText.push({ x: villagePlayer.x - 48, y: villagePlayer.y - 46, text: "NO ENERGY", t: 1.1 });
    setVillageMessage("Too tired", `You need ${spend} energy for ${label}. The tower refills the day after a fight.`, 3.0);
    return false;
  }
  hub.energy = clamp(energy - spend, 0, max);
  if (hub.energy <= 0 && hub.nightFallDay !== hub.towerDay) {
    hub.nightFallPending = true;
    hub.nightFallDay = hub.towerDay;
  }
  villageEnergyFlash = 1;
  villagePulse = Math.max(villagePulse, 0.35);
  floatText.push({ x: villagePlayer.x - 30, y: villagePlayer.y - 58, text: `-${spend} energy`, t: 0.9 });
  saveGame();
  updateHud();
  return true;
}

function hubResource(name) {
  return Number(ensureHubSave()[name]) || 0;
}

function addHubResource(name, amount) {
  const hub = ensureHubSave();
  hub[name] = Math.max(0, (Number(hub[name]) || 0) + amount);
  if (amount > 0 && hub.collection && ["fish", "ore", "crops"].includes(name)) {
    hub.collection[name] = Math.max(Number(hub.collection[name]) || 0, Number(hub[name]) || 0);
  }
  return hub[name];
}

function villageFarmPlot(id) {
  const hub = ensureHubSave();
  return hub.farmPlots?.[id] || { state: "empty" };
}

function saveVillageFarmPlot(id, data) {
  const hub = ensureHubSave();
  hub.farmPlots[id] = data;
}

function updateFarmGrowthAfterTower() {
  const hub = ensureHubSave();
  for (const plot of VILLAGE_FARM_PLOTS) {
    const state = hub.farmPlots?.[plot.id];
    if (state?.state === "planted" && state.watered && hub.towerDay >= (state.readyDay || 999)) {
      state.state = "ready";
      hub.farmPlots[plot.id] = state;
    }
  }
}

function assignVillageVisitor(source = "tower") {
  const hub = ensureHubSave();
  const types = ["seed", "gift", "miner", "fisher", "relic", "medic"];
  const type = types[(hub.towerDay + String(source).length) % types.length];
  hub.visitor = { type, day: hub.towerDay, bought: false };
}

function activeVillageVisitor() {
  const visitor = ensureHubSave().visitor;
  if (!visitor || visitor.bought) return null;
  const def = VILLAGE_VISITORS[visitor.type];
  return def ? { ...def, type: visitor.type } : null;
}

function villagePrepSummary() {
  const prep = ensureHubSave().prep || {};
  return ["meal", "tool", "scout", "shrine"].map(slot => {
    const def = VILLAGE_PREP_DEFS[prep[slot]];
    return { slot, def };
  });
}

function grantVillagePrep(prepId, reason = "Village prep") {
  const def = VILLAGE_PREP_DEFS[prepId];
  if (!def) return false;
  const hub = ensureHubSave();
  hub.prep[def.slot] = prepId;
  hub.lastGain = `${def.name} readied. ${def.text}.`;
  saveGame();
  playAssetSfx("ui_confirm_001", 0.32) || playAssetSfx("bonus_chime", 0.28);
  villagePulse = 1;
  floatText.push({ x: villagePlayer.x - 44, y: villagePlayer.y - 64, text: "PREP READY", t: 1.2 });
  setVillageMessage(reason, `${def.name} is in tonight's prep tray. ${def.text}.`, 3.4);
  return true;
}

function applyVillagePrepToRunStats(context = "tower") {
  if (!runStats) return [];
  const hub = ensureHubSave();
  const applied = [];
  const prep = hub.prep || {};
  for (const slot of ["meal", "tool", "scout", "shrine"]) {
    const def = VILLAGE_PREP_DEFS[prep[slot]];
    if (!def) continue;
    def.apply();
    if (def.revert) {
      runStats.villagePrepReverts = runStats.villagePrepReverts || [];
      runStats.villagePrepReverts.push(def.revert);
    }
    applied.push(def.name);
    prep[slot] = null;
  }
  const omen = activeVillageOmen();
  if (omen?.hpPrepBonus) {
    runStats.maxHpBonus += omen.hpPrepBonus;
    runStats.villagePrepReverts = runStats.villagePrepReverts || [];
    runStats.villagePrepReverts.push(() => { runStats.maxHpBonus -= omen.hpPrepBonus; });
    applied.push(`${omen.name} +${omen.hpPrepBonus} HP`);
  }
  hub.prep = prep;
  if (applied.length) {
    saveGame();
    addLog(`Village prep applied: ${applied.join(", ")}.`);
  }
  return applied;
}

function expireVillagePrepEffects() {
  if (!runStats?.villagePrepReverts?.length) return;
  const reverts = runStats.villagePrepReverts.splice(0).reverse();
  for (const revert of reverts) {
    try { revert(); } catch {}
  }
  runStats.healMult = Math.max(1, runStats.healMult || 1);
}

function villageTaskPool(floor = 1) {
  const hub = ensureHubSave();
  const pool = [];
  pool.push({ id: `maren_fish_${hub.towerDay}`, type: "turnin", title: "Fish for Maren", giver: "Maren", text: "Bring 2 fish.", need: 2, resource: "fish", prep: "maren_meal", rewardSupplies: 0, rewardShards: 0, villager: "maren" });
  pool.push({ id: `rowan_ore_${hub.towerDay}`, type: "turnin", title: "Ore for Rowan", giver: "Rowan", text: "Bring 2 ore.", need: 2, resource: "ore", prep: "rowan_oil", rewardSupplies: 0, rewardShards: 0, villager: "rowan" });
  pool.push({ id: `tavi_scout_${hub.towerDay}`, type: "rubble", title: "Clear Tavi's view", giver: "Tavi", text: "Clear 1 rubble pile.", need: 1, prep: "tavi_map", rewardSupplies: 0, rewardShards: 0, villager: "tavi" });
  pool.push({ id: `garden_crop_${hub.towerDay}`, type: "farm", title: "Fresh crop", giver: "Garden", text: "Harvest 1 crop.", need: 1, prep: "garden_tonic", rewardSupplies: 0, rewardShards: 0 });
  pool.push({ id: `smith_project_${hub.towerDay}`, type: "project", title: "Upgrade station", giver: "Board", text: "Upgrade any town project.", need: 1, prep: "kitchen_stew", rewardSupplies: 0, rewardShards: 0 });
  pool.push({ id: `stranger_crop_${hub.towerDay}`, type: "turnin", title: "Crops for cook", giver: "Cook", text: "Bring 2 crops.", need: 2, resource: "crops", prep: "kitchen_stew", rewardSupplies: 0, rewardShards: 0 });
  pool.push({ id: `shrine_candle_${hub.towerDay}`, type: "turnin", title: "Light shrine", giver: "Shrine", text: "Spend 2 supplies.", need: 2, resource: "supplies", prep: "shrine_candle", rewardSupplies: 0, rewardShards: 0 });
  pool.push({ id: `mine_loose_${hub.towerDay}`, type: "mine", title: "Fresh ore", giver: "Rowan", text: "Break 1 ore node.", need: 1, prep: "rowan_oil", rewardSupplies: 0, rewardShards: 0, villager: "rowan" });
  pool.push({ id: `pond_food_${hub.towerDay}`, type: "fish", title: "Pond fish", giver: "Maren", text: "Catch 1 fish.", need: 1, prep: "maren_meal", rewardSupplies: 0, rewardShards: 0, villager: "maren" });
  pool.push({ id: `wood_repairs_${hub.towerDay}`, type: "chop", title: "Repair wood", giver: "Board", text: "Chop 1 stump or tree.", need: 1, prep: "tavi_map", rewardSupplies: 0, rewardShards: 0 });
  pool.push({ id: `hairball_cleanup_${hub.towerDay}`, type: "hairball", title: "Clean hairballs", giver: "Village", text: "Clean 2 hairballs.", need: 2, prep: "garden_tonic", rewardSupplies: 0, rewardShards: 0 });
  if (!villageBridgeFixed() && villageRequirementMet(VILLAGE_BRIDGE.req)) {
    pool.push({ id: `bridge_repair_${hub.towerDay}`, type: "bridge", title: "Repair bridge", giver: "Pella", text: `Spend ${villageBridgeCostText()}.`, need: 1, prep: "tavi_map", rewardSupplies: 0, rewardShards: 0 });
  }
  if (villageBridgeFixed()) {
    pool.push({ id: `grave_wood_${hub.towerDay}`, type: "chop", dark: true, icon: "🌘", title: "Grave wood", giver: "Vesper", text: "Chop 1 Grave Road tree.", need: 1, prep: "shrine_smoke", rewardSupplies: 0, rewardShards: 0 });
    pool.push({ id: `grave_stone_${hub.towerDay}`, type: "mine", dark: true, icon: "🪦", title: "Grave stone", giver: "Moss", text: "Break 1 dark ore node.", need: 1, prep: "shrine_lantern", rewardSupplies: 0, rewardShards: 0 });
    pool.push({ id: `grave_clear_${hub.towerDay}`, type: "rubble", dark: true, icon: "🕯️", title: "Clear graves", giver: "Vesper", text: "Clear 1 dark obstacle.", need: 1, prep: "shrine_endure", rewardSupplies: 0, rewardShards: 0 });
  }
  return pool.filter(task => {
    if (task.type === "chop" && !VILLAGE_STUMPS.some(stump => !villageStumpCleared(stump.id) && !villageObjectLocked(stump))) return false;
    if (task.type === "rubble" && !VILLAGE_RUBBLE.some(rubble => !villageRubbleCleared(rubble.id) && !villageObjectLocked(rubble))) return false;
    if (task.type === "project" && !VILLAGE_PROJECTS.some(project => hubProjectRank(project.id) < project.max)) return false;
    return true;
  });
}

function assignVillageBoardAfterFloor(floor) {
  const hub = ensureHubSave();
  const pool = villageTaskPool(floor);
  hub.taskCounter = (Number(hub.taskCounter) || 0) + 1;
  const tasks = [];
  for (let i = 0; i < pool.length && tasks.length < 3; i++) {
    const index = (hub.taskCounter + floor + i * 3) % pool.length;
    const task = { ...pool[index], progress: 0, floor, done: false };
    if (!tasks.some(item => item.id === task.id || item.type === task.type && item.giver === task.giver)) tasks.push(task);
  }
  while (pool.length && tasks.length < 3) {
    const task = { ...pool[tasks.length % pool.length], progress: 0, floor, done: false };
    if (!tasks.some(item => item.id === task.id)) tasks.push(task);
    else break;
  }
  hub.boardTasks = tasks;
  hub.boardTaskDay = hub.towerDay;
  hub.selectedTaskId = tasks[0]?.id || null;
  hub.activeTask = tasks[0] || null;
  saveGame();
  return tasks;
}

function activeBoardTask() {
  const hub = ensureHubSave();
  return (hub.boardTasks || []).find(task => task.id === hub.selectedTaskId) || hub.activeTask || null;
}

function villageTaskIcon(task) {
  if (!task) return "•";
  if (task.icon) return task.icon;
  if (task.type === "fish" || task.resource === "fish") return "🎣";
  if (task.type === "mine" || task.resource === "ore") return "⛏️";
  if (task.type === "farm" || task.resource === "crops") return "🌽";
  if (task.type === "chop") return "🪓";
  if (task.type === "rubble") return "🧹";
  if (task.type === "hairball") return "🐾";
  if (task.type === "project") return "🔨";
  if (task.type === "bridge") return "🌉";
  if (task.dark) return "🌘";
  if (task.resource === "supplies") return "📦";
  if (task.prep === "maren_meal") return "🍲";
  if (task.prep === "rowan_oil") return "🛢️";
  if (task.prep === "tavi_map") return "🗺️";
  if (task.prep === "shrine_candle") return "🕯️";
  return "📌";
}

function villageTaskText(task = activeBoardTask()) {
  if (!task) return "No board card selected. Open the daily board and pick a job.";
  const progress = task.type === "turnin" ? `${Math.min(hubResource(task.resource), task.need || 1)}/${task.need || 1}` : `${Math.min(task.progress || 0, task.need || 1)}/${task.need || 1}`;
  const prep = VILLAGE_PREP_DEFS[task.prep];
  return `${villageTaskIcon(task)} ${task.title} ${progress}${prep ? ` · ${prep.name}` : ""}`;
}

function completeVillageTask(task, source = "work") {
  if (!task || task.done) return false;
  const hub = ensureHubSave();
  const supplies = Math.min(Number(task.rewardSupplies) || 0, 1);
  const shards = Math.min(Number(task.rewardShards) || 0, 1);
  hub.supplies += supplies;
  save.shards += shards;
  if (task.villager && hub.helped?.[task.villager] !== undefined) {
    hub.collection.memories[`${task.villager}_${Math.min(5, hub.helped[task.villager] + 1)}`] = true;
  }
  const boardTask = (hub.boardTasks || []).find(item => item.id === task.id);
  if (boardTask) {
    boardTask.done = true;
    boardTask.progress = boardTask.need || 1;
  }
  hub.completedDailyTaskIds[task.id] = true;
  hub.activeTask = null;
  if (hub.selectedTaskId === task.id) hub.selectedTaskId = (hub.boardTasks || []).find(item => !item.done)?.id || null;
  hub.activeTask = (hub.boardTasks || []).find(item => item.id === hub.selectedTaskId) || null;
  hub.hope = (Number(hub.hope) || 0) + 1;
  hub.lastGain = `Board job done. +1 hope${supplies ? `, +${supplies} supply` : ""}${shards ? `, +${shards} shard` : ""}.`;
  saveGame();
  villagePulse = 1;
  playAssetSfx("cache_upgrade", 0.42);
  playAssetSfx("ui_confirm_001", 0.34) || playAssetSfx("bonus_chime", 0.34);
  addParticles("reward", VILLAGE_DAILY_BOARD.x, VILLAGE_DAILY_BOARD.y - 22, -Math.PI / 2, 34);
  floatText.push({ x: VILLAGE_DAILY_BOARD.x - 50, y: VILLAGE_DAILY_BOARD.y - 76, text: "+1 hope", t: 2.2 });
  if (task.prep) grantVillagePrep(task.prep, task.giver || "Daily board");
  else setVillageMessage("Board", `${task.title} done. +1 hope.`, 3.2);
  checkVillageAchievements("board");
  updateHud();
  return true;
}

function selectVillageTask(id) {
  const hub = ensureHubSave();
  const task = (hub.boardTasks || []).find(item => item.id === id);
  if (!task) return;
  if (task.done) {
    setVillageMessage("Daily board", `${task.title} is already finished. Pick another task or climb.`, 2.6);
    return;
  }
  hub.selectedTaskId = task.id;
  hub.activeTask = task;
  saveGame();
  playAssetSfx("select", 0.22);
  ensureHairballsForBoardTask(task);

  if (task.type === "turnin") {
    if (hubResource(task.resource) < (task.need || 1)) {
      setVillageMessage(task.giver || "Daily board", `${task.text} Need ${task.need} ${task.resource}. You have ${hubResource(task.resource)}.`, 3.4);
      return;
    }
    addHubResource(task.resource, -(task.need || 1));
    task.progress = task.need || 1;
    completeVillageTask(task, "turn in");
    return;
  }

  setVillageMessage(task.giver || "Board", `${villageTaskIcon(task)} ${task.text}`, 3.4);
}

function advanceVillageTask(type, amount = 1, context = {}) {
  const hub = ensureHubSave();
  const task = activeBoardTask();
  if (!task || task.done || task.type !== type) return false;
  if (task.dark && !context.dark) return false;
  task.progress = Math.min(task.need || 1, (Number(task.progress) || 0) + amount);
  const boardTask = (hub.boardTasks || []).find(item => item.id === task.id);
  if (boardTask) boardTask.progress = task.progress;
  hub.activeTask = task;
  if (task.progress < (task.need || 1)) {
    saveGame();
    return false;
  }
  return completeVillageTask(task, type);
}

function hubHelpCost(villager) {
  return Math.min(5, hubVillagerRank(villager.id) + 1);
}

function hubBonusMaxHp() {
  return hubVillagerRank("maren") * 4;
}

function hubBonusDamageMult() {
  return 1 + hubVillagerRank("rowan") * 0.03;
}

function hubBonusPulseRange() {
  return hubVillagerRank("tavi") * 12;
}

function hubProjectEffectiveRank(id) {
  const rank = hubProjectRank(id);
  return Math.max(0, Math.floor(Math.sqrt(rank) * 2));
}

function hubProjectMaxHpBonus() {
  return hubProjectEffectiveRank("garden") * 3;
}

function hubProjectSmokeBonus() {
  return Math.floor(hubProjectEffectiveRank("kitchen") / 2);
}

function hubProjectPulseRangeBonus() {
  return hubProjectEffectiveRank("watchpost") * 18;
}

function hubProjectTowerText(id, rank = hubProjectRank(id)) {
  const effective = Math.max(0, Math.floor(Math.sqrt(rank) * 2));
  if (id === "garden") {
    const extra = Math.floor(effective / 2);
    return `Tower bonus: +${effective * 3} max HP${extra ? ` and +${extra} supply from each campaign floor` : ""}.`;
  }
  if (id === "kitchen") return `Tower bonus: +${Math.floor(effective / 2)} starting smoke per floor.`;
  if (id === "watchpost") return `Tower bonus: +${effective * 18} Pulse range.`;
  return "Tower bonus active.";
}

function storySupplyRewardForFloor(floor) {
  if (!activeStoryMode) return 0;
  let amount = 1;
  if (activeRouteType === "cache") amount += 1;
  if (isBossFloor(floor)) amount += 2;
  amount += Math.min(4, Math.floor(Math.sqrt(Math.max(0, hubProjectRank("garden"))) / 2));
  return Math.min(6, amount);
}

function addVillageSupplies(amount, source = "from the tower") {
  if (!amount) return 0;
  const hub = ensureHubSave();
  hub.supplies += amount;
  hub.lastGain = `+${amount} supplies ${source}.`;
  return amount;
}

function villagerTrustLine(id, rank) {
  const lines = {
    maren: [
      "Maren starts packing tonic for your next climb.",
      "The hospital tent is standing. Fewer people wake up shaking.",
      "A sick child asks if Mira can still hear the village.",
      "Maren strengthens every healing pickup she can prepare.",
      "Maren remembers Mira leaving a ribbon at the shrine before the tower took her."
    ],
    rowan: [
      "Rowan oils your weapon before the next floor.",
      "Forge sparks return to the road house.",
      "Rowan can reroll broken parts into usable tower gear.",
      "The forge now marks rare caches by sound alone.",
      "Rowan admits the old tower key was made here."
    ],
    tavi: [
      "Tavi sketches a safer route map for the gate.",
      "The watch post lanterns are lit again.",
      "Tavi can count movement behind the next door.",
      "The watch can spot hidden cache rooms before you choose.",
      "Tavi found a map room mark that matches Mira's path."
    ]
  };
  return lines[id]?.[Math.max(0, rank - 1)] || "Trust increased.";
}

function villagerPrepForRank(id, rank) {
  if (id === "maren") return rank >= 4 ? "garden_tonic" : "maren_meal";
  if (id === "rowan") return "rowan_oil";
  if (id === "tavi") return "tavi_map";
  return null;
}

function repeatVillagerFavor(id) {
  const villager = hubVillagerById(id);
  if (!villager) return;
  const hub = ensureHubSave();
  const needs = {
    maren: { resource: "fish", amount: 1, prep: "maren_meal", ask: "Bring me 1 fish and I can pack a meal for your next climb.", done: "Maren packs a meal for tonight's climb." },
    rowan: { resource: "ore", amount: 1, prep: "rowan_oil", ask: "Bring me 1 ore and I can oil your weapon before the gate.", done: "Rowan oils your weapon for tonight's climb." },
    tavi: { resource: "supplies", amount: 1, prep: "tavi_map", ask: "Bring me 1 supply and I can mark the safer route before you climb.", done: "Tavi marks a cleaner route for tonight's climb." }
  };
  const job = needs[id] || needs.tavi;
  const have = hubResource(job.resource);
  if (have < job.amount) {
    setVillageMessage(villager.name, `${job.ask} You have ${have}/${job.amount}.`, 3.2);
    return;
  }
  if (!spendVillageEnergy(1, `helping ${villager.name}`)) return;
  addHubResource(job.resource, -job.amount);
  hub.hope = (Number(hub.hope) || 0) + 1;
  hub.lastHelp = `${villager.name} repeat favor. +1 hope.`;
  saveGame();
  grantVillagePrep(job.prep, villager.name);
  const spot = VILLAGE_VILLAGER_SPOTS.find(item => item.id === id);
  if (spot) {
    const point = villageVillagerPoint(spot);
    addParticles("reward", point.x, point.y - 20, -Math.PI / 2, 18);
    floatText.push({ x: point.x - 28, y: point.y - 42, text: "+1 hope", t: 0.95 });
  }
  setVillageMessage(villager.name, `${job.done} Come back with more ${job.resource} after the next floor.`, 3.4);
}

function helpVillager(id) {
  const villager = hubVillagerById(id);
  if (!villager) return;
  const hub = ensureHubSave();
  const rank = hub.helped[id] || 0;
  if (rank >= villager.max) {
    repeatVillagerFavor(id);
    return;
  }
  const cost = Math.min(5, rank + 1);
  if (hub.supplies < cost) {
    hub.lastHelp = `Need ${cost} supplies to help ${villager.name}.`;
    saveGame();
    setVillageMessage(villager.name, `I need ${cost} supplies before I can do more here.`);
    if (mode !== "village") renderVillageHub();
    return;
  }
  if (!spendVillageEnergy(1, `helping ${villager.name}`)) return;

  hub.supplies -= cost;
  const event = activeVillageDailyEvent();
  const extraTrust = event?.id === "sick_tent" && id === "maren" && rank < villager.max - 1 ? 1 : 0;
  const nextRank = clamp(rank + 1 + extraTrust, 0, villager.max);
  hub.helped[id] = nextRank;
  hub.collection.memories[`${id}_${nextRank}`] = true;
  hub.hope = (Number(hub.hope) || 0) + 1;
  hub.lastHelp = `${villager.name} trust ${nextRank}/${villager.max}. ${villagerTrustLine(id, nextRank)} +1 hope.`;
  hub.lastGain = "";
  saveGame();
  playAssetSfx("bonus_chime", 0.38);
  playAssetSfx("cache_upgrade", 0.28);
  if (id === "rowan") playAssetSfx("town_forge_ring", 0.24);
  villagePulse = 1;
  const spot = VILLAGE_VILLAGER_SPOTS.find(item => item.id === id);
  if (spot) {
    addParticles("reward", spot.x, spot.y - 20, -Math.PI / 2, 22);
    floatText.push({ x: spot.x - 24, y: spot.y - 42, text: `+1 hope`, t: 0.95 });
  }
  const trustLine = villagerTrustLine(id, nextRank);
  const prepId = villagerPrepForRank(id, nextRank);
  if (prepId) grantVillagePrep(prepId, villager.name);
  setVillageMessage(villager.name, `${trustLine} ${villager.bonus}.`);
  advanceVillageTask("villager");
  if (mode !== "village") renderVillageHub();
}

function hubVillagerCard(villager) {
  const rank = hubVillagerRank(villager.id);
  const maxed = rank >= villager.max;
  const cost = hubHelpCost(villager);
  const hub = ensureHubSave();
  const canHelp = !maxed && hub.supplies >= cost;
  const pips = Array.from({ length: villager.max }, (_, i) => `<span class="hubPip ${i < rank ? "filled" : ""}"></span>`).join("");
  const sprite = ASSET_PATHS.images[villager.sprite] || "";
  return `
    <button class="hubVillagerCard ${canHelp ? "canHelp" : ""} ${maxed ? "maxed" : ""}" data-action="helpVillager" data-id="${villager.id}" ${maxed ? "disabled" : ""}>
      <span class="hubVillagerSprite">${sprite ? `<img src="${sprite}" alt="">` : ""}</span>
      <span class="hubVillagerInfo">
        <small>${villager.role}</small>
        <b>${villager.name}</b>
        <em>${villager.help}</em>
        <strong>Needs: ${villager.need}</strong>
        <span class="hubPipRow">${pips}</span>
      </span>
      <span class="hubHelpButton">${maxed ? "HELPED" : canHelp ? `GIVE ${cost}` : `NEED ${cost}`}</span>
    </button>
  `;
}

function ensureVillageBoardTasks(force = false) {
  const hub = ensureHubSave();
  const hasUsableTask = Array.isArray(hub.boardTasks) && hub.boardTasks.some(task => task && task.id && !task.done);
  if (force || !hasUsableTask) assignVillageBoardAfterFloor(Math.max(1, currentFloor || hub.towerDay || 1));
  const nextHub = ensureHubSave();
  if (!Array.isArray(nextHub.boardTasks) || !nextHub.boardTasks.length) {
    nextHub.boardTasks = [
      { id: `emergency_fish_${nextHub.towerDay}`, type: "fish", title: "Catch pond fish", giver: "Maren", text: "Fish once at the pond.", need: 1, prep: "maren_meal", rewardSupplies: 0, rewardShards: 0, done: false, progress: 0 },
      { id: `emergency_ore_${nextHub.towerDay}`, type: "mine", title: "Mine fresh ore", giver: "Rowan", text: "Mine 1 ore node.", need: 1, prep: "rowan_oil", rewardSupplies: 0, rewardShards: 0, done: false, progress: 0 },
      { id: `emergency_shrine_${nextHub.towerDay}`, type: "turnin", title: "Light the shrine", giver: "Shrine", text: "Spend 2 supplies at the shrine.", need: 2, resource: "supplies", prep: "shrine_candle", rewardSupplies: 0, rewardShards: 0, done: false, progress: 0 }
    ];
    nextHub.selectedTaskId = nextHub.boardTasks[0].id;
    nextHub.activeTask = nextHub.boardTasks[0];
    saveGame();
  }
  if (!nextHub.selectedTaskId || !nextHub.boardTasks.some(task => task.id === nextHub.selectedTaskId && !task.done)) {
    nextHub.selectedTaskId = nextHub.boardTasks.find(task => !task.done)?.id || nextHub.boardTasks[0]?.id || null;
    nextHub.activeTask = nextHub.boardTasks.find(task => task.id === nextHub.selectedTaskId) || null;
    saveGame();
  }
  return nextHub.boardTasks || [];
}

function villageResourceSinkDefs() {
  const hub = ensureHubSave();
  return [
    { id: "restock", icon: "📋", title: "Restock board", cost: { supplies: 2 }, desc: "New daily jobs.", blocked: false },
    { id: "tools", icon: "🛠️", title: "Sharpen tools", cost: { supplies: 2, ore: 1 }, desc: "Tool prep.", blocked: Boolean(hub.prep?.tool) },
    { id: "meal", icon: "🍲", title: "Feed camp", cost: { supplies: 2, fish: 1 }, desc: "Meal prep.", blocked: Boolean(hub.prep?.meal) },
    { id: "lamps", icon: "🕯️", title: "Light lamps", cost: { supplies: 2, hope: 1 }, desc: "Shrine prep. Clears hairballs.", blocked: Boolean(hub.prep?.shrine) }
  ];
}

function villageCostText(cost = {}) {
  return Object.entries(cost).filter(([, value]) => value > 0).map(([key, value]) => `${value} ${key}`).join(", ");
}

function canPayVillageCost(cost = {}) {
  return Object.entries(cost).every(([key, value]) => hubResource(key) >= value);
}

function payVillageCost(cost = {}) {
  if (!canPayVillageCost(cost)) return false;
  for (const [key, value] of Object.entries(cost)) addHubResource(key, -value);
  return true;
}

function renderVillageResourceSinkButtons() {
  return villageResourceSinkDefs().map(sink => {
    const canPay = canPayVillageCost(sink.cost);
    const disabled = sink.blocked || !canPay;
    return `
      <button class="dailyTaskCard ${disabled ? "completed" : ""}" data-action="useVillageSink" data-sink-id="${sink.id}" ${disabled ? "disabled" : ""}>
        <span class="routeTag">${villageCostText(sink.cost)}</span>
        <b><span style="font-size:21px; margin-right:8px; vertical-align:-2px;">${sink.icon}</span>${sink.title}</b>
        <p>${sink.desc}</p>
        <small>${sink.blocked ? "Slot already filled" : canPay ? "Spend resources" : "Need resources"}</small>
      </button>
    `;
  }).join("");
}

function useVillageSink(id) {
  const sink = villageResourceSinkDefs().find(item => item.id === id);
  if (!sink || sink.blocked) return;
  if (!payVillageCost(sink.cost)) {
    setVillageMessage("Upkeep", `Need ${villageCostText(sink.cost)}.`, 2.6);
    renderVillageDailyBoard();
    return;
  }
  if (id === "restock") {
    assignVillageBoardAfterFloor(Math.max(1, currentFloor || ensureHubSave().towerDay || 1));
    setVillageMessage("Board", "New jobs posted.", 2.4);
  } else if (id === "tools") {
    grantVillagePrep("rowan_oil", "Upkeep");
  } else if (id === "meal") {
    grantVillagePrep("maren_meal", "Upkeep");
  } else if (id === "lamps") {
    villageMesses = [];
    grantVillagePrep("shrine_candle", "Upkeep");
  }
  ensureHubSave().lastGain = `Upkeep: ${sink.title}.`;
  saveGame();
  renderVillageDailyBoard();
}

function renderVillageDailyBoard() {
  const hub = ensureHubSave();
  const tasks = ensureVillageBoardTasks();
  const omen = activeVillageOmen();
  const event = activeVillageDailyEvent();
  const cards = tasks.map(task => {
    const selected = hub.selectedTaskId === task.id;
    const prep = VILLAGE_PREP_DEFS[task.prep];
    const progress = task.type === "turnin" ? `${Math.min(hubResource(task.resource), task.need || 1)}/${task.need || 1} ${task.resource}` : `${Math.min(task.progress || 0, task.need || 1)}/${task.need || 1}`;
    return `
      <button class="dailyTaskCard ${selected ? "selected" : ""} ${task.done ? "completed" : ""}" data-action="selectVillageTask" data-task-id="${task.id}" ${task.done ? "disabled" : ""}>
        <span class="routeTag">${selected ? "SELECTED" : (task.giver || "BOARD")}</span>
        <b><span style="font-size:22px; margin-right:8px; vertical-align:-2px;">${villageTaskIcon(task)}</span>${task.title}</b>
        <p>${task.text}</p>
        <small>${progress} · ${prep ? prep.slot.toUpperCase() : "REWARD"}: ${prep ? prep.name : "+reward"}</small>
      </button>
    `;
  }).join("");

  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen dailyBoardScreen">
      ${renderTopStrip("Daily Board", "backVillage")}
      <div class="vsPanel levelPanel routePanel">
        <h2>Pick one town job</h2>
        <p class="panelLead">You have ${villageEnergy()}/${villageMaxEnergy()} town energy. Finish jobs to load meal, tool, scout, or shrine prep for the next climb.</p>
        <div class="dailyBoardMeta">
          <div><b>${event?.name || "Quiet day"}</b><span>${event?.text || "Nothing unusual is happening in town today."}</span></div>
          <div><b>${omen?.name || "No omen"}</b><span>${omen?.text || "No clear tower omen right now."}</span></div>
        </div>
        <div class="routeGrid dailyTaskGrid">${cards}</div>
        <h3 style="margin:18px 0 8px;">Town upkeep</h3>
        <div class="routeGrid dailyTaskGrid">${renderVillageResourceSinkButtons()}</div>
        <div class="vsDetailBar">
          <div class="powerIcon big">!</div>
          <div>
            <b>Daily board</b>
            <p>${villageTaskText(activeBoardTask()) || "Pick a board card, finish it, then check the gate."}</p>
          </div>
        </div>
      </div>
    </div>
  `, "dailyBoardMenu");
}

function renderVillagePrepTray() {
  const prep = villagePrepSummary();
  const omen = activeVillageOmen();
  const slots = prep.map(item => `
    <div class="prepSlot ${item.def ? "filled" : ""}">
      <b>${item.slot.toUpperCase()}</b>
      <span>${item.def ? `${item.def.name}<br>${item.def.text}` : item.slot === "meal" ? "Empty. Finish Maren or crop jobs." : item.slot === "tool" ? "Empty. Finish Rowan or kitchen jobs." : item.slot === "scout" ? "Empty. Finish Tavi or wood jobs." : "Empty. Finish shrine work or spend hope."}</span>
    </div>
  `).join("");
  const nextLabel = activeStoryMode && villagePendingRouteFloor > 0 && runStats ? `Enter Floor ${villagePendingRouteFloor}` : "Choose Campaign Climb";
  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen prepTrayScreen">
      ${renderTopStrip("Tower Gate", "backVillage")}
      <div class="vsPanel levelPanel routePanel">
        <h2>Tonight's Prep</h2>
        <p class="panelLead">Each finished board job fills one slot. Empty slots mean you skipped free help before the climb.</p>
        <div class="prepTrayGrid">${slots}</div>
        <div class="dailyBoardMeta">
          <div><b>${omen?.name || "No omen"}</b><span>${omen?.text || "The tower is quiet."}</span></div>
          <div><b>How to fill slots</b><span>Meal comes from Maren or crops. Tool comes from Rowan or kitchen jobs. Scout comes from Tavi jobs. Shrine comes from shrine jobs or spent hope.</span></div>
        </div>
        <div class="menuActions">
          <button class="vsButton green jackpotButton" data-action="continueTowerGate">${nextLabel}</button>
          <button class="vsButton blue" data-action="openVillageBoard">Daily Board</button>
        </div>
      </div>
    </div>
  `, "prepTrayMenu");
}

function continueTowerGate() {
  if (activeStoryMode && villagePendingRouteFloor > 0 && runStats) {
    setVillageMessage("Tower gate", `Choose the route for floor ${villagePendingRouteFloor}.`, 1.2);
    showRouteChoices(villagePendingRouteFloor);
    return;
  }
  renderStorySelect();
}

function renderVillageHub() {
  startVillageHub();
}

function startVillageHub() {
  mode = "village";
  running = false;
  gameOver = false;
  towerCleared = false;
  activeStoryMode = false;
  villagePendingRouteFloor = 0;
  worldW = VILLAGE_WORLD.w;
  worldH = VILLAGE_WORLD.h;
  closeVillageHistory();
  closeOverlay();
  startVillageMusic();
  ensureHubSave();
  player.hp = player.maxHp;
  mouse.down = false;
  villageInteractTarget = null;
  villageNextMessAt = nowSec() + 8;
  villageMessage.t = Math.max(villageMessage.t, 2.4);
  lastTime = performance.now();
  updateHud();
}

function enterVillageBetweenStoryFloors(nextFloor, info = {}) {
  mode = "village";
  running = false;
  gameOver = false;
  refillVillageEnergy(`floor ${Math.max(1, nextFloor - 1)}`);
  towerCleared = false;
  activeStoryMode = true;
  villagePendingRouteFloor = nextFloor;
  villageReturnChapterId = activeStoryChapterId;
  worldW = VILLAGE_WORLD.w;
  worldH = VILLAGE_WORLD.h;
  closeVillageHistory();
  closeOverlay();
  startVillageMusic();
  ensureHubSave();
  mouse.down = false;
  villageInteractTarget = null;
  const hub = ensureHubSave();
  hub.lastTownReturnFloor = currentFloor;
  ensureVillageBoardTasks();
  const task = activeBoardTask();
  const omen = activeVillageOmen();
  const event = activeVillageDailyEvent();
  const visitor = activeVillageVisitor();
  hub.lastReturnCard = {
    floor: currentFloor,
    suppliesFound: info.suppliesFound || 0,
    shardsFound: info.reward || pendingFloorReward?.reward || 0,
    visitor: visitor?.name || "none",
    request: task?.title || "Open the daily board",
    status: event?.name || "quiet day",
    omen: omen?.name || "none",
    ts: Date.now()
  };
  saveGame();
  const supplies = info.suppliesFound ? ` You brought back ${info.suppliesFound} supplies.` : "";
  const boardText = task ? ` Board: ${villageTaskText(task)}.` : "";
  const omenText = omen ? ` ${omen.name}: ${omen.rewardText}` : "";
  setVillageMessage("Back", `Floor ${currentFloor} clear.${supplies} Board has work when you want it.`, 5.2);
  villagePulse = 1;
  lastTime = performance.now();
  updateHud();
}

function returnToVillageFromOverlay() {
  if (activeStoryMode && villagePendingRouteFloor > 0 && runStats) {
    const hub = ensureHubSave();
    if ((mode === "routeChoice" || mode === "floorClear") && hub.lastTownReturnFloor !== currentFloor) {
      refillVillageEnergy(`floor ${Math.max(1, villagePendingRouteFloor - 1)}`);
      hub.lastTownReturnFloor = currentFloor;
      saveGame();
    }
    mode = "village";
    running = false;
    gameOver = false;
    towerCleared = false;
    worldW = VILLAGE_WORLD.w;
    worldH = VILLAGE_WORLD.h;
    closeVillageHistory();
    closeOverlay();
    startVillageMusic();
    ensureHubSave();
    mouse.down = false;
    villageInteractTarget = null;
    setVillageMessage("Village", `Finish any village task, then return to the tower gate for floor ${villagePendingRouteFloor}.`, 3.6);
    lastTime = performance.now();
    updateHud();
    return;
  }
  renderVillageHub();
}

function setVillageMessage(speaker, text, t = 3.4) {
  const ttl = clamp(Number(t) || 3.4, 1.4, 5.0);
  villageMessage = { speaker, text, t: ttl, maxT: ttl };
  pushVillageLogEntry(speaker, text);
}

function toggleVillageHistory() {
  if (mode !== "village") return;
  if (villageHistoryOpen) {
    villageHistoryOpen = false;
    closeOverlay();
    return;
  }
  if (villageHasVisibleOverlay()) return;
  const entries = ensureHubSave().townLog || [];
  villageHistoryOpen = true;
  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen villageHistoryScreen">
      ${renderTopStrip("Town Log", "backVillageHistory")}
      <div class="vsPanel levelPanel routePanel villageHistoryPanel">
        <h2>Town Log</h2>
        <p class="panelLead">Press Enter again to close this and go back to walking the village.</p>
        <div class="villageLogList">
          ${entries.length ? entries.map(line => `<div class="villageLogEntry">${line}</div>`).join("") : `<div class="villageLogEntry empty">Nothing has happened yet.</div>`}
        </div>
      </div>
    </div>
  `, "villageHistoryMenu");
}

function closeVillageHistory() {
  if (!villageHistoryOpen) return;
  villageHistoryOpen = false;
  closeOverlay();
}

function maybeSpawnVillageMess(force = false) {
  if (mode !== "village" && !force) return;
  const hub = ensureHubSave();
  const task = activeBoardTask();
  const hairballNeed = task?.type === "hairball" && !task.done ? Math.max(2, task.need || 2) : 0;
  const messCap = Math.max(4, hairballNeed);
  if (((hub.towerDay || 0) < 1 && !force) || villageMesses.length >= messCap) return;
  const now = nowSec();
  if (!force && now < villageNextMessAt) return;
  const used = new Set(villageMesses.map(item => item.spotIndex));
  let spotIndex = Math.abs(Math.floor(villageHash(hub.towerDay + villageMesses.length, now) * VILLAGE_MESS_SPOTS.length)) % VILLAGE_MESS_SPOTS.length;
  for (let i = 0; i < VILLAGE_MESS_SPOTS.length; i++) {
    const next = (spotIndex + i) % VILLAGE_MESS_SPOTS.length;
    if (!used.has(next)) { spotIndex = next; break; }
  }
  let spot = VILLAGE_MESS_SPOTS[spotIndex];
  let x = spot.x;
  let y = spot.y;
  for (let i = 0; i < VILLAGE_MESS_SPOTS.length; i++) {
    const testIndex = (spotIndex + i) % VILLAGE_MESS_SPOTS.length;
    const test = VILLAGE_MESS_SPOTS[testIndex];
    const tx = test.x + rand(-8, 8);
    const ty = test.y + rand(-8, 8);
    if (!used.has(testIndex) && villageMessSpotSafe(tx, ty)) {
      spotIndex = testIndex;
      spot = test;
      x = tx;
      y = ty;
      break;
    }
  }
  if (!villageMessSpotSafe(x, y)) return;
  villageMesses.push({
    id: `mess_${Math.round(now * 1000)}_${villageMesses.length}`,
    spotIndex,
    x,
    y
  });
  villageNextMessAt = now + rand(force ? 3 : 12, force ? 6 : 20);
  if (villageMesses.length === 1) setVillageMessage("Village", "Hairball on the road. Clean it with E for hope.", 3.2);
}

function ensureHairballsForBoardTask(task = activeBoardTask()) {
  if (!task || task.done || task.type !== "hairball") return;
  const remaining = Math.max(1, (task.need || 1) - (Number(task.progress) || 0));
  const wantedVisible = Math.min(remaining, 3);
  let safety = VILLAGE_MESS_SPOTS.length;
  while (villageMesses.length < wantedVisible && safety-- > 0) {
    const before = villageMesses.length;
    maybeSpawnVillageMess(true);
    if (villageMesses.length === before) break;
  }
}

function cleanVillageMess(id) {
  const index = villageMesses.findIndex(item => item.id === id);
  if (index < 0) return;
  if (!spendVillageEnergy(1, "cleaning hairball")) return;
  const mess = villageMesses[index];
  villageMesses.splice(index, 1);
  playAssetSfx("reward", 0.22);
  addParticles("reward", mess.x, mess.y - 8, -Math.PI / 2, 6);
  floatText.push({ x: mess.x - 24, y: mess.y - 26, text: "clean", t: 0.9 });
  const task = activeBoardTask();
  const trackingHairballs = task?.type === "hairball" && !task.done;
  const completed = advanceVillageTask("hairball", 1);
  if (!completed) {
    if (trackingHairballs) {
      const current = activeBoardTask();
      const progress = current?.type === "hairball" ? `${Math.min(current.progress || 0, current.need || 1)}/${current.need || 1}` : "";
      setVillageMessage("Daily board", `Hairball cleanup ${progress}.`, 2.4);
      ensureHairballsForBoardTask(current);
    } else {
      setVillageMessage("Village", "Hairball cleaned. Board jobs are where the Hope is.", 2.6);
    }
  }
  checkVillageAchievements("hairball");
}

function renderVillageShrine() {
  const hub = ensureHubSave();
  const offers = [
    { id: "retry", title: "Mira's Ward", cost: 3, desc: "Bank +1 boss retry. Max 2.", blocked: hub.retries >= 2 },
    { id: "energy", title: "Catch Breath", cost: 2, desc: "Restore 2 town energy now.", blocked: villageEnergy() >= villageMaxEnergy() },
    { id: "ward", title: "Light Shrine", cost: 2, desc: "+1 retry next run.", blocked: Boolean(hub.prep?.shrine) },
    { id: "endure", title: "Vow: Endure", cost: 3, desc: "+20 HP next run.", blocked: Boolean(hub.prep?.shrine) },
    { id: "smoke", title: "Vow: Smoke", cost: 4, desc: "+1 smoke next run.", blocked: Boolean(hub.prep?.shrine) },
    { id: "lantern", title: "Grave Lantern", cost: 4, desc: "+120 pulse next run.", blocked: Boolean(hub.prep?.shrine) }
  ];
  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen shrineScreen">
      ${renderTopStrip("Mira Shrine", "backVillage")}
      <div class="vsPanel levelPanel routePanel">
        <h2>Shrine Vows</h2>
        <p class="panelLead">Spend Hope for one shrine slot. One vow can be carried into the next run.</p>
        <div class="dailyBoardMeta">
          <div><b>Hope</b><span>${hubHope()} in hand</span></div>
          <div><b>Restored</b><span>${villageRestoredCount()}/${hubHopeMax()} village progress</span></div>
        </div>
        <div class="routeGrid dailyTaskGrid">
          ${offers.map(offer => `
            <button class="dailyTaskCard ${offer.blocked ? "completed" : ""}" data-action="buyShrineOffer" data-offer-id="${offer.id}" ${offer.blocked ? "disabled" : ""}>
              <span class="routeTag">COST ${offer.cost}</span>
              <b>${offer.title}</b>
              <p>${offer.desc}</p>
              <small>${offer.blocked ? "Unavailable right now" : "Spend hope"}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `, "shrineMenu");
}

function buyShrineOffer(id) {
  const hub = ensureHubSave();
  if (id === "retry") {
    if (hub.retries >= 2) {
      setVillageMessage("Mira shrine", "You already have the maximum stored retry tokens.", 2.6);
      return;
    }
    if (!spendVillageHope(3, "Bought Mira's Ward")) {
      setVillageMessage("Mira shrine", "You need 3 hope for that.", 2.6);
      return;
    }
    hub.retries = Math.min(2, (Number(hub.retries) || 0) + 1);
    saveGame();
    setVillageMessage("Mira shrine", "You banked one retry token for a boss death.", 2.8);
    playAssetSfx("bonus_chime", 0.32);
    checkVillageAchievements("retry");
    renderVillageShrine();
    return;
  }
  if (id === "energy") {
    if (villageEnergy() >= villageMaxEnergy()) {
      setVillageMessage("Mira shrine", "Your town energy is already full.", 2.4);
      return;
    }
    if (!spendVillageHope(2, "Caught your breath at the shrine")) {
      setVillageMessage("Mira shrine", "You need 2 hope for that.", 2.6);
      return;
    }
    hub.energy = clamp((Number(hub.energy) || 0) + 2, 0, villageMaxEnergy());
    saveGame();
    villageEnergyFlash = 1;
    setVillageMessage("Mira shrine", "You got 2 town energy back.", 2.6);
    renderVillageShrine();
    return;
  }
  if (id === "ward") {
    if (hub.prep?.shrine) {
      setVillageMessage("Mira shrine", "The shrine slot is already filled for your next run.", 2.6);
      return;
    }
    if (!spendVillageHope(2, "Lit the shrine")) {
      setVillageMessage("Mira shrine", "You need 2 hope for that.", 2.6);
      return;
    }
    grantVillagePrep("shrine_candle", "Mira Shrine");
    setVillageMessage("Mira shrine", "Mira's Ward is ready.", 2.8);
    renderVillageShrine();
    return;
  }
  const vowPrep = id === "endure" ? "shrine_endure" : id === "smoke" ? "shrine_smoke" : id === "lantern" ? "shrine_lantern" : "";
  const vowCost = id === "endure" ? 3 : id === "smoke" ? 4 : id === "lantern" ? 4 : 0;
  if (vowPrep) {
    if (hub.prep?.shrine) {
      setVillageMessage("Mira shrine", "Your shrine slot is already filled.", 2.4);
      return;
    }
    if (!spendVillageHope(vowCost, "Made a shrine vow")) {
      setVillageMessage("Mira shrine", `Need ${vowCost} hope.`, 2.4);
      return;
    }
    grantVillagePrep(vowPrep, "Mira Shrine");
    setVillageMessage("Mira shrine", `${VILLAGE_PREP_DEFS[vowPrep].name} is ready.`, 2.8);
    renderVillageShrine();
  }
}

function homeUpgradeCost() {
  const rank = Number(ensureHubSave().homeRank) || 0;
  return { hope: 4 + rank * 2, supplies: 6 + rank * 3 };
}

function renderVillageHouse() {
  const hub = ensureHubSave();
  const rank = Number(hub.homeRank) || 0;
  const cost = homeUpgradeCost();
  const rested = hub.homeRestDay === hub.towerDay;
  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen houseScreen">
      ${renderTopStrip("Your House", "backVillage")}
      <div class="vsPanel levelPanel routePanel">
        <h2>${rank > 0 ? `House Rank ${rank}` : "Build your house"}</h2>
        <p class="panelLead">A house lets you recover town energy without being forced straight back into the tower.</p>
        <div class="dailyBoardMeta">
          <div><b>Rest</b><span>${rank > 0 ? `Restore ${Math.min(villageMaxEnergy(), 2 + rank)} energy once per town day.` : "Build first, then you can sleep here."}</span></div>
          <div><b>Cost</b><span>${cost.hope} hope and ${cost.supplies} supplies. You have ${hubHope()} hope and ${hub.supplies} supplies.</span></div>
        </div>
        <div class="menuActions">
          <button class="vsButton green" data-action="sleepHouse" ${rank > 0 && !rested && villageEnergy() < villageMaxEnergy() ? "" : "disabled"}>Sleep</button>
          <button class="vsButton blue" data-action="upgradeHouse" ${hubHope() >= cost.hope && hub.supplies >= cost.supplies ? "" : "disabled"}>${rank > 0 ? "Upgrade House" : "Build House"}</button>
        </div>
      </div>
    </div>
  `, "houseMenu");
}

function upgradeVillageHouse() {
  const hub = ensureHubSave();
  const rank = Number(hub.homeRank) || 0;
  const cost = { hope: 4 + rank * 2, supplies: 6 + rank * 3 };
  const currentHope = Number(hub.hope) || 0;
  const currentSupplies = Number(hub.supplies) || 0;
  if (currentHope < cost.hope || currentSupplies < cost.supplies) {
    setVillageMessage("House", `Need ${cost.hope} hope and ${cost.supplies} supplies. You have ${currentHope} hope and ${currentSupplies} supplies.`, 3.2);
    renderVillageHouse();
    return;
  }
  hub.hope = currentHope - cost.hope;
  hub.supplies = currentSupplies - cost.supplies;
  hub.homeRank = rank + 1;
  saveGame();
  playAssetSfx("town_building_work", 0.28);
  playAssetSfx("bonus_chime", 0.32);
  unlockAchievement("home_built", "Front Door Energy", "Built or upgraded your house.");
  checkVillageAchievements("house");
  villageInteractTarget = null;
  villagePulse = 1;
  setVillageMessage("House", `House rank ${hub.homeRank}. It now restores town energy when you sleep.`, 3.2);
  renderVillageHouse();
}

function sleepVillageHouse() {
  const hub = ensureHubSave();
  const rank = Number(hub.homeRank) || 0;
  if (rank <= 0 || hub.homeRestDay === hub.towerDay || villageEnergy() >= villageMaxEnergy()) {
    renderVillageHouse();
    return;
  }
  hub.energy = clamp((Number(hub.energy) || 0) + Math.min(villageMaxEnergy(), 2 + rank), 0, villageMaxEnergy());
  hub.homeRestDay = hub.towerDay;
  saveGame();
  villageEnergyFlash = 1;
  unlockAchievement("first_sleep", "Not A Dungeon Nap", "Recovered energy at home.");
  setVillageMessage("House", "You slept at home and got town energy back.", 2.8);
  renderVillageHouse();
}

const CHEST_RESOURCES = ["supplies", "seeds", "ore", "fish", "crops"];
const CHEST_RESOURCE_META = {
  supplies: { name: "Supplies", glyph: "🪵", hint: "wood, crates, repair parts" },
  seeds: { name: "Seeds", glyph: "🌱", hint: "plant these in the garden" },
  ore: { name: "Ore", glyph: "🪨", hint: "Rowan turns this into tool prep" },
  fish: { name: "Fish", glyph: "🐟", hint: "Maren turns this into meal prep" },
  crops: { name: "Crops", glyph: "🥕", hint: "food for kitchen and board jobs" }
};

function chestSlotHtml(resource, amount, location) {
  const meta = CHEST_RESOURCE_META[resource];
  if (!meta || amount <= 0) return `<button class="inventorySlot empty" disabled></button>`;
  const action = location === "bag" ? "storeChest" : "takeChest";
  const title = location === "bag" ? "Click to store 1. Shift-click stores the stack." : "Click to take 1. Shift-click takes the stack.";
  return `
    <button class="inventorySlot filled ${resource}" data-action="${action}" data-resource="${resource}" title="${title}">
      <span class="slotIcon ${resource}">${meta.glyph}</span>
      <b>${amount}</b>
      <small>${location === "bag" ? "Bag" : "Chest"}</small>
    </button>
  `;
}

function emptyChestSlots(count) {
  return Array.from({ length: count }, () => `<button class="inventorySlot empty" disabled></button>`).join("");
}

function renderVillageChest() {
  const hub = ensureHubSave();
  hub.chest = { ...structuredClone(DEFAULT_HUB_SAVE).chest, ...(hub.chest || {}) };
  const bagItems = CHEST_RESOURCES.map(resource => chestSlotHtml(resource, hubResource(resource), "bag")).join("");
  const chestItems = CHEST_RESOURCES.map(resource => chestSlotHtml(resource, hub.chest?.[resource] || 0, "chest")).join("");
  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen chestScreen">
      ${renderTopStrip("Storage Chest", "backVillage")}
      <div class="vsPanel levelPanel routePanel inventoryPanel">
        <h2>Inventory and Chest</h2>
        <p class="panelLead">Click moves 1. Shift-click moves the whole stack.</p>
        <div class="minecraftInventoryFrame">
          <section>
            <h3>Bag</h3>
            <div class="inventorySlotGrid">${bagItems}${emptyChestSlots(13)}</div>
          </section>
          <div class="inventoryArrow">⇄</div>
          <section>
            <h3>Chest</h3>
            <div class="inventorySlotGrid chestSlots">${chestItems}${emptyChestSlots(13)}</div>
          </section>
        </div>
        <div class="inventoryHintBar">Click: move 1. Shift-click: move all, like stash movement.</div>
      </div>
    </div>
  `, "chestMenu");
}

function moveChestResource(resource, direction, wholeStack = false) {
  if (!CHEST_RESOURCES.includes(resource)) return;
  const hub = ensureHubSave();
  hub.chest = { ...structuredClone(DEFAULT_HUB_SAVE).chest, ...(hub.chest || {}) };
  const bagAmount = resource === "supplies" ? Number(hub.supplies) || 0 : Number(hub[resource]) || 0;
  const chestAmount = Number(hub.chest[resource]) || 0;

  if (direction === "store") {
    if (bagAmount <= 0) return;
    const moved = wholeStack ? bagAmount : 1;
    if (resource === "supplies") hub.supplies = bagAmount - moved;
    else hub[resource] = bagAmount - moved;
    hub.chest[resource] = chestAmount + moved;
    setVillageMessage("Chest", wholeStack ? `Stored all ${resource}.` : `Stored 1 ${resource}.`, 1.6);
  } else {
    if (chestAmount <= 0) return;
    const moved = wholeStack ? chestAmount : 1;
    hub.chest[resource] = chestAmount - moved;
    if (resource === "supplies") hub.supplies = bagAmount + moved;
    else hub[resource] = bagAmount + moved;
    setVillageMessage("Chest", wholeStack ? `Took all ${resource}.` : `Took 1 ${resource}.`, 1.6);
  }

  saveGame();
  playAssetSfx("ui_confirm_001", 0.18) || playAssetSfx("select", 0.16);
  checkVillageAchievements("chest");
  renderVillageChest();
}


function villageRequirementMet(req = {}) {
  const hub = ensureHubSave();
  if (req.bridge && !ensureHubSave().bridgeFixed) return false;
  if (req.homeRank && (Number(hub.homeRank) || 0) < req.homeRank) return false;
  if (req.bestFloor && (Number(save.bestFloor) || 0) < req.bestFloor) return false;
  if (req.project && hubProjectRank(req.project) < (req.projectRank || 1)) return false;
  return true;
}

function villageRequirementText(req = {}) {
  if (req.text) return req.text;
  const parts = [];
  if (req.bridge) parts.push("repair bridge");
  if (req.homeRank) parts.push(`House rank ${req.homeRank}`);
  if (req.bestFloor) parts.push(`floor ${req.bestFloor}`);
  if (req.project) parts.push(`${req.project} rank ${req.projectRank || 1}`);
  return parts.length ? parts.join(" and ") : "more town progress";
}

function villageObjectLocked(item) {
  return item?.req && !villageRequirementMet(item.req);
}

function villageLockedActionText(item) {
  return `locked: ${villageRequirementText(item.req)}`;
}

function villageRubbleActionText(rubble) {
  return villageObjectLocked(rubble) ? villageLockedActionText(rubble) : "clear obstacle";
}

function villageRubbleCleared(id) {
  return Boolean(ensureHubSave().rubbleCleared?.[id]);
}

function villageCircleRectBlocked(x, y, r, rect) {
  const nx = clamp(x, rect.x, rect.x + rect.w);
  const ny = clamp(y, rect.y, rect.y + rect.h);
  return Math.hypot(x - nx, y - ny) < r;
}

function villageBlocked(x, y, r) {
  if (x < r || y < r || x > VILLAGE_WORLD.w - r || y > VILLAGE_WORLD.h - r) return true;
  if (x > VILLAGE_RIVER.x - r && x < VILLAGE_RIVER.x + VILLAGE_RIVER.w + r) {
    const onBridgeLane = y > VILLAGE_BRIDGE.y - VILLAGE_BRIDGE.h * 0.62 && y < VILLAGE_BRIDGE.y + VILLAGE_BRIDGE.h * 0.62;
    if (!onBridgeLane || !villageBridgeFixed()) return true;
  }
  for (const rect of villageObstacleRects()) {
    if (villageCircleRectBlocked(x, y, r, rect)) return true;
  }
  for (const rubble of VILLAGE_RUBBLE) {
    if (villageRubbleCleared(rubble.id)) continue;
    if (Math.hypot(x - rubble.x, y - rubble.y) < r + rubble.r * 0.8) return true;
  }
  for (const stump of VILLAGE_STUMPS) {
    if (villageStumpCleared(stump.id)) continue;
    if (Math.hypot(x - stump.x, y - stump.y) < r + stump.r * 0.75) return true;
  }
  return false;
}

function moveVillagePlayer(dx, dy) {
  const p = villagePlayer;
  const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 5));
  const sx = dx / steps;
  const sy = dy / steps;
  for (let i = 0; i < steps; i++) {
    const nx = p.x + sx;
    if (!villageBlocked(nx, p.y, p.r)) p.x = nx;
    const ny = p.y + sy;
    if (!villageBlocked(p.x, ny, p.r)) p.y = ny;
  }
}

function pointNearVillagePlayer(x, y, range = 62) {
  return Math.hypot(villagePlayer.x - x, villagePlayer.y - y) <= range;
}

function villageRectCenter(rect) {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function villageBridgeFixed() {
  return Boolean(ensureHubSave().bridgeFixed);
}

function villageBridgeCanRepair() {
  return villageRequirementMet(VILLAGE_BRIDGE.req);
}

function villageBridgeCostText() {
  const cost = VILLAGE_BRIDGE.cost;
  const parts = [];
  if (cost.supplies) parts.push(`${cost.supplies} supplies`);
  if (cost.ore) parts.push(`${cost.ore} ore`);
  if (cost.hope) parts.push(`${cost.hope} hope`);
  return parts.join(", ");
}

function villageBridgeActionText() {
  if (villageBridgeFixed()) return "cross bridge";
  if (!villageBridgeCanRepair()) return `bridge locked: ${villageRequirementText(VILLAGE_BRIDGE.req)}`;
  return `repair bridge: ${villageBridgeCostText()}, 1 energy`;
}

function villageBridgeNearPlayer() {
  const bridge = VILLAGE_BRIDGE;
  const approachX = villagePlayer.x < bridge.x ? bridge.x - bridge.w / 2 : bridge.x + bridge.w / 2;
  const nearestX = clamp(villagePlayer.x, bridge.x - bridge.w / 2, bridge.x + bridge.w / 2);
  const nearestY = clamp(villagePlayer.y, bridge.y - bridge.h / 2, bridge.y + bridge.h / 2);
  const d = Math.min(Math.hypot(villagePlayer.x - approachX, villagePlayer.y - bridge.y), Math.hypot(villagePlayer.x - nearestX, villagePlayer.y - nearestY));
  return { x: bridge.x, y: bridge.y, distance: d };
}

function repairVillageBridge() {
  const hub = ensureHubSave();
  if (hub.bridgeFixed) {
    setVillageMessage("Bridge", "Bridge repaired. The dark road is open.", 3.0);
    return;
  }
  if (!villageBridgeCanRepair()) {
    setVillageMessage("Bridge", `Bridge goal: ${villageRequirementText(VILLAGE_BRIDGE.req)}. Current: house rank ${hub.homeRank || 0}, best floor ${save.bestFloor || 0}.`, 4.0);
    return;
  }
  for (const [key, value] of Object.entries(VILLAGE_BRIDGE.cost)) {
    if ((Number(hub[key]) || 0) < value) {
      setVillageMessage("Bridge", `Need ${villageBridgeCostText()} to repair the bridge.`, 3.2);
      return;
    }
  }
  if (!spendVillageEnergy(1, "repairing the bridge")) return;
  for (const [key, value] of Object.entries(VILLAGE_BRIDGE.cost)) hub[key] = (Number(hub[key]) || 0) - value;
  hub.bridgeFixed = true;
  const firstRepair = !hub.bridgeCutsceneSeen;
  hub.bridgeCutsceneSeen = true;
  saveGame();
  if (firstRepair) startVillageBridgeCutscene();
  playAssetSfx("town_building_work", 0.35);
  playAssetSfx("bonus_chime", 0.35);
  unlockAchievement("bridge_repaired", "Other Side Open", "Repaired the bridge into the dark road.");
  advanceVillageTask("bridge");
  setVillageMessage("Bridge", "Bridge repaired. The dark road is open.", 4.5);
}

function findVillageInteractTarget() {
  let best = null;
  const consider = target => {
    if (!target) return;
    if (!best || target.distance < best.distance) best = target;
  };

  for (const mess of villageMesses) {
    const distance = Math.hypot(villagePlayer.x - mess.x, villagePlayer.y - mess.y);
    if (distance <= 84) return { type: "mess", id: mess.id, label: "hairball", action: "clean hairball (1 energy)", distance };
  }

  for (const spot of VILLAGE_VILLAGER_SPOTS) {
    const villager = hubVillagerById(spot.id);
    if (!villager) continue;
    const point = villageVillagerPoint(spot);
    const distance = Math.hypot(villagePlayer.x - point.x, villagePlayer.y - point.y);
    if (distance <= 82) consider({ type: "villager", id: spot.id, label: villager.name, action: `talk to ${villager.name}`, distance });
  }

  for (const rubble of VILLAGE_RUBBLE) {
    if (villageRubbleCleared(rubble.id)) continue;
    const distance = Math.hypot(villagePlayer.x - rubble.x, villagePlayer.y - rubble.y);
    if (distance <= Math.max(66, rubble.r + 44)) consider({ type: "rubble", id: rubble.id, label: rubble.label, action: villageRubbleActionText(rubble), distance });
  }

  for (const stump of VILLAGE_STUMPS) {
    if (villageStumpCleared(stump.id)) continue;
    const distance = Math.hypot(villagePlayer.x - stump.x, villagePlayer.y - stump.y);
    if (distance <= Math.max(66, stump.r + 44)) consider({ type: "stump", id: stump.id, label: stump.longGoal ? "old growth stump" : "tree stump", action: villageStumpActionText(stump), distance });
  }

  for (const plot of VILLAGE_FARM_PLOTS) {
    const distance = Math.hypot(villagePlayer.x - plot.x, villagePlayer.y - plot.y);
    if (distance <= 48) consider({ type: "farm", id: plot.id, label: "garden plot", action: villageFarmActionText(plot.id), distance });
  }

  for (const mine of VILLAGE_MINE_NODES) {
    const distance = Math.hypot(villagePlayer.x - mine.x, villagePlayer.y - mine.y);
    if (distance <= 66) consider({ type: "mine", id: mine.id, label: villageMineClearedToday(mine.id) ? "spent ore node" : "ore node", action: villageMineActionText(mine), distance });
  }

  for (const spot of VILLAGE_FISHING_SPOTS) {
    const distance = Math.hypot(villagePlayer.x - spot.x, villagePlayer.y - spot.y);
    if (distance <= 82) consider({ type: "fish", id: spot.id, label: "village pond", action: villageFishActionText(), distance });
  }

  const bridgePoint = villageBridgeNearPlayer();
  if (bridgePoint.distance <= 112) consider({ type: "bridge", label: villageBridgeFixed() ? "east bridge" : "broken bridge", action: villageBridgeActionText(), distance: bridgePoint.distance });

  const visitor = activeVillageVisitor();
  if (visitor) {
    const distance = Math.hypot(villagePlayer.x - VILLAGE_VISITOR_SPOT.x, villagePlayer.y - VILLAGE_VISITOR_SPOT.y);
    if (distance <= 82) consider({ type: "visitor", label: visitor.name, action: visitor.action, distance });
  }

  for (const npc of VILLAGE_TOWNSFOLK) {
    const point = villageTownfolkPoint(npc);
    const distance = Math.hypot(villagePlayer.x - point.x, villagePlayer.y - point.y);
    if (distance <= 92) consider({ type: "townsperson", id: npc.id, label: `${npc.name} · ${npc.title}`, action: npc.action, distance });
  }

  const boardDistance = Math.hypot(villagePlayer.x - VILLAGE_DAILY_BOARD.x, villagePlayer.y - VILLAGE_DAILY_BOARD.y);
  if (boardDistance <= 92) consider({ type: "board", label: "Daily board", action: "open daily board", distance: boardDistance });

  for (const project of VILLAGE_PROJECTS) {
    const distance = Math.hypot(villagePlayer.x - project.x, villagePlayer.y - project.y);
    if (distance <= 104) consider({ type: "project", id: project.id, label: `${project.name} · ${hubProjectTowerText(project.id)}`, action: hubProjectActionText(project), distance });
  }

  const towerDistance = Math.hypot(villagePlayer.x - VILLAGE_TOWER_GATE.x, villagePlayer.y - VILLAGE_TOWER_GATE.y);
  if (towerDistance <= 126) consider({ type: "tower", label: "Tower gate", action: "choose campaign climb", distance: towerDistance });

  const power = VILLAGE_SERVICE_BUILDINGS.power;
  const powerDistance = Math.hypot(villagePlayer.x - (power.x + power.w / 2), villagePlayer.y - (power.y + power.h - 8));
  if (powerDistance <= 88) consider({ type: "power", label: power.label, action: power.action, distance: powerDistance });

  const collection = VILLAGE_SERVICE_BUILDINGS.collection;
  const collectionDistance = Math.hypot(villagePlayer.x - (collection.x + collection.w / 2), villagePlayer.y - (collection.y + collection.h - 8));
  if (collectionDistance <= 88) consider({ type: "collection", label: collection.label, action: collection.action, distance: collectionDistance });

  const road = VILLAGE_SERVICE_BUILDINGS.road;
  const menuDistance = Math.hypot(villagePlayer.x - (road.x + road.w / 2), villagePlayer.y - (road.y + road.h - 4));
  if (menuDistance <= 82) consider({ type: "menu", label: road.label, action: road.action, distance: menuDistance });

  const homeDistance = Math.hypot(villagePlayer.x - VILLAGE_HOME.x, villagePlayer.y - VILLAGE_HOME.y);
  if (homeDistance <= 96) consider({ type: "home", label: "your house", action: (ensureHubSave().homeRank || 0) > 0 ? "rest or upgrade house" : "build house", distance: homeDistance });

  const chestDistance = Math.hypot(villagePlayer.x - VILLAGE_CHEST.x, villagePlayer.y - VILLAGE_CHEST.y);
  if (chestDistance <= 72) consider({ type: "chest", label: "storage chest", action: "open chest", distance: chestDistance });

  const shrineDistance = Math.hypot(villagePlayer.x - VILLAGE_SHRINE.x, villagePlayer.y - VILLAGE_SHRINE.y);
  if (shrineDistance <= 86) consider({ type: "shrine", label: "Mira shrine", action: "spend hope", distance: shrineDistance });

  return best;
}

function clearVillageRubble(id) {
  const hub = ensureHubSave();
  const rubble = VILLAGE_RUBBLE.find(item => item.id === id);
  if (!rubble || hub.rubbleCleared[id]) return;
  if (villageObjectLocked(rubble)) {
    playAssetSfx("ui_button_click", 0.18);
    floatText.push({ x: rubble.x - 42, y: rubble.y - rubble.r - 28, text: "locked", t: 2.0 });
    setVillageMessage("Long term goal", `${rubble.label} needs ${villageRequirementText(rubble.req)} before you can remove it.`, 3.2);
    return;
  }
  if (!spendVillageEnergy(1, "clearing obstacle")) return;
  hub.rubbleCleared[id] = true;
  const supplies = rubble.supplies || 1;
  const ore = rubble.ore || 0;
  const shards = rubble.shards || 0;
  hub.supplies += supplies;
  hub.ore = (Number(hub.ore) || 0) + ore;
  if (shards) save.shards += shards;
  if (rubble.req) hub.hope = (Number(hub.hope) || 0) + 1;
  hub.lastGain = `+${supplies} supplies${ore ? `, +${ore} ore` : ""}${shards ? `, +${shards} shards` : ""}${rubble.req ? ", +1 hope" : ""}.`;
  hub.lastHelp = "";
  saveGame();
  villagePulse = 1;
  playAssetSfx("reward", 0.34);
  playAssetSfx("bonus_chime", 0.24);
  addParticles("dust", rubble.x, rubble.y, -Math.PI / 2, 18);
  addParticles("reward", rubble.x, rubble.y - 8, -Math.PI / 2, 12);
  const rewardText = `+${supplies} supplies${ore ? `  +${ore} ore` : ""}${shards ? `  +${shards} shards` : ""}${rubble.req ? "  +1 hope" : ""}`;
  floatText.push({ x: rubble.x - 48, y: rubble.y - rubble.r - 12, text: rewardText, t: 2.0 });
  if (rubble.req) unlockAchievement("first_long_blocker", "That Was In The Way", "Removed a milestone locked town blocker.");
  setVillageMessage("Village", `Cleared ${rubble.label}. ${hub.lastGain}`);
  advanceVillageTask("rubble", 1, { dark: villagePointIsDark(rubble.x, rubble.y) });
}



function villageMineClearedToday(id) {
  const hub = ensureHubSave();
  return hub.mineCleared?.[id] === hub.towerDay;
}

function villageMineHitCount(id) {
  return Number(ensureHubSave().mineHits?.[id]) || 0;
}

function villageMineActionText(mine) {
  if (villageObjectLocked(mine)) return villageLockedActionText(mine);
  if (villageMineClearedToday(mine.id)) return "mine is empty today";
  const left = Math.max(1, (mine.hp || 3) - villageMineHitCount(mine.id));
  return `strike ore (${left} hit${left === 1 ? "" : "s"}, 2 energy on break)`;
}

function mineVillageNode(id) {
  const mine = VILLAGE_MINE_NODES.find(item => item.id === id);
  if (!mine) return;
  const hub = ensureHubSave();
  if (villageObjectLocked(mine)) {
    setVillageMessage("Ore node", `This ore needs ${villageRequirementText(mine.req)} first.`, 3.0);
    return;
  }
  if (villageMineClearedToday(id)) {
    setVillageMessage("Ore node", "This spot is empty. New ore will loosen after another tower fight.", 2.5);
    return;
  }
  const hits = villageMineHitCount(id) + 1;
  const hp = mine.hp || 3;
  const hubNow = ensureHubSave();
  hubNow.mineHits[id] = hits;
  villageToolSwing = { t: 0.18, x: villagePlayer.x, y: villagePlayer.y, angle: Math.atan2(mine.y - villagePlayer.y, mine.x - villagePlayer.x) };
  playAssetSfx("town_mine", 0.42);
  addParticles("dust", mine.x, mine.y, -Math.PI / 2, 10);
  if (hits < hp) {
    saveGame();
    const left = hp - hits;
    floatText.push({ x: mine.x - 26, y: mine.y - 40, text: `${left} left`, t: 0.85 });
    setVillageMessage("Ore node", `Strike it ${left} more time${left === 1 ? "" : "s"}. Ore breaks on the final hit.`, 2.2);
    return;
  }
  if (!spendVillageEnergy(2, "mining")) return;
  hubNow.mineCleared[id] = hubNow.towerDay;
  delete hubNow.mineHits[id];
  let oreFound = mine.ore || 1;
  const event = activeVillageDailyEvent();
  if (event?.id === "loose_stone" && !hubNow.dailyEventUsed.loose_stone) {
    oreFound += 1;
    hubNow.dailyEventUsed.loose_stone = true;
  }
  addHubResource("ore", oreFound);
  const bonusRoll = Math.random();
  let bonusText = "";
  if (bonusRoll < 0.10) {
    addHubResource("seeds", 1);
    bonusText = " +1 seed";
  } else if (bonusRoll < 0.17) {
    addHubResource("supplies", 1);
    bonusText = " +1 supply";
  } else if (bonusRoll < 0.20) {
    save.shards += 1;
    bonusText = " +1 shard";
  }
  if (mine.shards) save.shards += mine.shards;
  hubNow.lastGain = mine.shards ? `+${oreFound} ore and +${mine.shards} shard from mining.${bonusText}` : `+${oreFound} ore from mining.${bonusText}`;
  saveGame();
  villagePulse = 1;
  playAssetSfx("bonus_chime", 0.16);
  addParticles("dust", mine.x, mine.y, -Math.PI / 2, 18);
  addParticles("reward", mine.x, mine.y - 8, -Math.PI / 2, 12);
  floatText.push({ x: mine.x - 48, y: mine.y - 42, text: `${oreFound} ore${mine.shards ? " +shard" : ""}${bonusText}`, t: 2.8 });
  setVillageMessage("Mining", `Ore broke loose: ${oreFound} ore${mine.shards ? " and shard" : ""}${bonusText}.`, 3.2);
  advanceVillageTask("mine", 1, { dark: villagePointIsDark(mine.x, mine.y) });
}

function villageFishActionText() {
  const hub = ensureHubSave();
  const uses = hub.fishingDay === hub.towerDay ? Number(hub.fishingUses) || 0 : 0;
  if (villageFishingGame) return "fishing now";
  return uses >= 2 ? "pond is quiet today" : "cast line (2 energy)";
}

function fishVillagePond() {
  const hub = ensureHubSave();
  if (villageFishingGame) return;
  if (hub.fishingDay !== hub.towerDay) {
    hub.fishingDay = hub.towerDay;
    hub.fishingUses = 0;
  }
  if ((Number(hub.fishingUses) || 0) >= 2) {
    setVillageMessage("Pond", "The fish stopped biting. Try again after another tower fight.", 2.5);
    return;
  }
  if (!spendVillageEnergy(2, "casting a line")) return;
  hub.fishingUses = (Number(hub.fishingUses) || 0) + 1;
  saveGame();
  startVillageFishingGame(VILLAGE_FISHING_SPOTS[0]);
}

function startVillageFishingGame(spot) {
  const hub = ensureHubSave();
  const roll = villageHash(hub.towerDay * 37 + hub.fishingUses * 91, save.bestFloor + 17);
  const tier = roll > 0.88 ? "rare" : roll > 0.58 ? "stout" : "common";
  const need = tier === "rare" ? 24 : tier === "stout" ? 14 : 8;
  const baitSlow = Math.min(0.26, (Number(hub.bait) || 0) * 0.03);
  const rodPull = 1 + Math.min(0.6, (Number(hub.fishingRodRank) || 0) * 0.10);
  villageFishingGame = {
    phase: "wait",
    x: spot.x,
    y: spot.y,
    t: 0,
    biteAt: rand(2.4, 4.8),
    react: 3.0,
    progress: 0.58,
    needed: need,
    pulls: 0,
    next: "left",
    tier,
    drain: Math.max(0.035, (tier === "rare" ? 0.105 : tier === "stout" ? 0.075 : 0.045) - baitSlow),
    pullValue: 1.15 * rodPull,
    lastGoodInput: "",
    badInputs: 0
  };
  playAssetSfx("town_fish_cast", 0.42);
  setVillageMessage("Fishing", "Fishing started. Wait for the splash, then alternate Left Arrow and Right Arrow.", 5.5);
}

function updateVillageFishingGame(dt) {
  const game = villageFishingGame;
  if (!game) return;
  game.t += dt;
  if (game.phase === "wait" && game.t >= game.biteAt) {
    game.phase = "bite";
    game.t = 0;
    playAssetSfx("town_fish_reel", 0.34);
    addParticles("reward", game.x, game.y - 8, -Math.PI / 2, 18);
    setVillageMessage("BITE", "Press Left Arrow or Right Arrow. Then alternate arrows to reel.", 5.0);
    return;
  }
  if (game.phase === "bite" && game.t > game.react) {
    failVillageFishingGame("Too slow. Press an arrow when the splash cue appears.");
    return;
  }
  if (game.phase === "struggle") {
    game.progress = Math.max(0, game.progress - Math.max(0.025, game.drain) * dt);
    if (game.tier === "rare" && Math.floor(game.t * 2) !== Math.floor((game.t - dt) * 2) && Math.random() < 0.18) {
      game.progress = Math.max(0, game.progress - 0.035);
      addParticles("dust", game.x, game.y, -Math.PI / 2, 5);
    }
    if (game.progress <= 0) failVillageFishingGame("Line went slack. Keep alternating Left and Right arrows.");
  }
}

function handleVillageFishingInput(key) {
  const game = villageFishingGame;
  if (!game) return false;
  const input = key === "arrowleft" ? "left" : key === "arrowright" ? "right" : "";
  if (!input) return false;
  if (game.phase === "wait") return false;
  if (game.phase === "bite") {
    game.phase = "struggle";
    game.t = 0;
    game.progress = 0.62;
    game.next = input === "left" ? "right" : "left";
    game.lastGoodInput = input;
    game.pulls = 1;
    game.progress += 0.075;
    playAssetSfx("town_fish_reel", 0.28);
    return true;
  }
  if (game.phase === "struggle") {
    if (input !== game.next) {
      game.badInputs = (game.badInputs || 0) + 1;
      game.progress = Math.max(0.12, game.progress - 0.025);
      playAssetSfx("ui_error_001", 0.08);
      return true;
    }
    game.pulls += game.pullValue;
    game.progress = Math.min(1, game.progress + 0.055 + game.pullValue * 0.008);
    game.lastGoodInput = input;
    game.next = input === "left" ? "right" : "left";
    playAssetSfx("town_fish_reel", 0.16);
    if (game.pulls >= game.needed || game.progress >= 1) finishVillageFishingGame();
    return true;
  }
  return true;
}

function failVillageFishingGame(text) {
  const game = villageFishingGame;
  villageFishingGame = null;
  if (game) addParticles("dust", game.x, game.y, -Math.PI / 2, 10);
  setVillageMessage("Fishing", text, 5.0);
}

function finishVillageFishingGame() {
  const game = villageFishingGame;
  if (!game) return;
  villageFishingGame = null;
  const hub = ensureHubSave();
  let fishFound = game.tier === "rare" ? 3 : game.tier === "stout" ? 2 : 1;
  const event = activeVillageDailyEvent();
  if (event?.id === "fish_biting" && !hub.dailyEventUsed.fish_biting) {
    fishFound += 1;
    hub.dailyEventUsed.fish_biting = true;
  }
  addHubResource("fish", fishFound);
  const shard = game.tier !== "common";
  if (shard) save.shards += game.tier === "rare" ? 2 : 1;
  if (game.tier === "rare") hub.bait = (Number(hub.bait) || 0) + 1;
  hub.lastGain = `+${fishFound} fish${shard ? " and shard" : ""}.`;
  saveGame();
  villagePulse = 1;
  playAssetSfx("bonus_chime", 0.32);
  addParticles("reward", game.x, game.y - 8, -Math.PI / 2, 26);
  floatText.push({ x: game.x - 42, y: game.y - 44, text: `+${fishFound} fish${shard ? " +shard" : ""}`, t: 3.0 });
  setVillageMessage("Fishing", `${game.tier === "rare" ? "Rare catch" : "Caught"}: +${fishFound} fish${shard ? " and shard" : ""}.`, 5.0);
  advanceVillageTask("fish");
}

function drawFishingKeyPrompt(x, y, side, active = false) {
  const key = side === "left" ? "input_arrow_left" : "input_arrow_right";
  const w = active ? 58 : 46;
  const h = active ? 58 : 46;
  ctx.save();
  ctx.globalAlpha = active ? 1 : 0.58;
  const drawn = drawImageAsset(key, x, y, w, h);
  if (!drawn) {
    ctx.fillStyle = active ? "rgba(255,211,90,0.95)" : "rgba(245,241,255,0.22)";
    ctx.strokeStyle = active ? "rgba(255,255,255,0.95)" : "rgba(245,241,255,0.38)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x - w / 2, y - h / 2, w, h, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = active ? "#111827" : "#f5f1ff";
    ctx.font = "900 24px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(side === "left" ? "←" : "→", x, y + 1);
  }
  ctx.restore();
}

function drawVillageFishingGame() {
  const game = villageFishingGame;
  if (!game) return;
  ctx.save();
  const panelW = 520;
  const panelH = 126;
  const x = W / 2 - panelW / 2;
  const y = H - 168;
  ctx.fillStyle = "rgba(3,5,12,0.76)";
  ctx.fillRect(x, y, panelW, panelH);
  ctx.strokeStyle = game.phase === "bite" ? "rgba(255,211,90,0.95)" : "rgba(124,199,255,0.58)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 0.5, y + 0.5, panelW - 1, panelH - 1);

  const leftActive = game.phase === "bite" || game.next === "left";
  const rightActive = game.phase === "bite" || game.next === "right";
  drawFishingKeyPrompt(x + 70, y + 62, "left", leftActive);
  drawFishingKeyPrompt(x + panelW - 70, y + 62, "right", rightActive);

  ctx.textAlign = "center";
  ctx.fillStyle = game.phase === "bite" ? "#ffd35a" : "#7cc7ff";
  ctx.font = "900 13px ui-monospace, monospace";
  const title = game.phase === "wait" ? "WAIT FOR SPLASH" : game.phase === "bite" ? "BITE! PRESS EITHER ARROW" : `REEL: PRESS ${game.next === "left" ? "LEFT" : "RIGHT"}`;
  ctx.fillText(title, W / 2, y + 25);

  ctx.fillStyle = "rgba(245,241,255,0.82)";
  ctx.font = "800 10px ui-monospace, monospace";
  const help = game.phase === "wait"
    ? "Do nothing yet. Watch the bobber."
    : game.phase === "bite"
      ? "You have 3 seconds. Press ← or →."
      : "Alternate arrows. Use the highlighted key next.";
  ctx.fillText(help, W / 2, y + 44);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(x + 132, y + 62, panelW - 264, 15);
  const fill = game.phase === "wait" ? clamp(game.t / game.biteAt, 0, 1) : game.phase === "bite" ? clamp(1 - game.t / game.react, 0, 1) : game.progress;
  ctx.fillStyle = game.phase === "bite" ? "#ffd35a" : game.phase === "struggle" ? "#7dffb2" : "#7cc7ff";
  ctx.fillRect(x + 132, y + 62, (panelW - 264) * fill, 15);
  ctx.strokeStyle = "rgba(245,241,255,0.24)";
  ctx.strokeRect(x + 132.5, y + 62.5, panelW - 265, 14);

  ctx.fillStyle = "rgba(245,241,255,0.78)";
  ctx.font = "800 10px ui-monospace, monospace";
  const meta = game.phase === "struggle"
    ? `${game.tier.toUpperCase()} FISH  ·  pulls ${Math.floor(game.pulls)}/${game.needed}  ·  mistakes ${game.badInputs || 0}`
    : `${game.tier.toUpperCase()} FISH  ·  arrows only after splash`;
  ctx.fillText(meta, W / 2, y + 99);
  ctx.restore();
}

function villageFarmActionText(id) {
  const plot = villageFarmPlot(id);
  const day = ensureHubSave().towerDay;
  if (plot.state === "ready") return "harvest crop (1 energy)";
  if (plot.state === "planted" && plot.watered && day < (plot.readyDay || 999)) return "crop growing";
  if (plot.state === "planted" && !plot.watered) return "water crop (free)";
  return hubResource("seeds") > 0 ? "plant and water (1 energy)" : "need seeds";
}

function workVillageFarmPlot(id) {
  const plotDef = VILLAGE_FARM_PLOTS.find(item => item.id === id);
  if (!plotDef) return;
  const hub = ensureHubSave();
  const plot = villageFarmPlot(id);
  const day = hub.towerDay;

  if (plot.state === "ready") {
    if (!spendVillageEnergy(1, "harvesting")) return;
    saveVillageFarmPlot(id, { state: "empty" });
    addHubResource("crops", 1);
    hub.farmHarvests = (Number(hub.farmHarvests) || 0) + 1;
    const supplyBonus = Math.random() < 0.25 ? 1 : 0;
    if (supplyBonus) hub.supplies += 1;
    hub.lastGain = `+1 crop${supplyBonus ? ", +1 supply" : ""}.`;
    saveGame();
    villagePulse = 1;
    playAssetSfx("town_leaves", 0.28);
    playAssetSfx("bonus_chime", 0.28);
    addParticles("reward", plotDef.x, plotDef.y, -Math.PI / 2, 24);
    floatText.push({ x: plotDef.x - 36, y: plotDef.y - 40, text: supplyBonus ? "+crop +supply" : "+crop", t: 1.1 });
    setVillageMessage("Harvest", supplyBonus ? "Crop stored. Found one usable supply." : "Crop stored.", 2.8);
    advanceVillageTask("farm");
    return;
  }

  if (plot.state === "planted" && plot.watered) {
    setVillageMessage("Garden", "This crop needs one tower fight before it is ready. Leave it and come back after the next floor.", 2.8);
    return;
  }

  if (plot.state === "planted" && !plot.watered) {
    saveVillageFarmPlot(id, { state: "planted", watered: true, plantedDay: plot.plantedDay ?? day, readyDay: day + 1 });
    saveGame();
    playAssetSfx("town_leaves", 0.22);
    addParticles("reward", plotDef.x, plotDef.y, -Math.PI / 2, 10);
    floatText.push({ x: plotDef.x - 28, y: plotDef.y - 36, text: "watered", t: 0.9 });
    setVillageMessage("Garden", "Watered for free. The energy was already spent planting this plot.", 2.4);
    advanceVillageTask("farm");
    return;
  }

  if (hubResource("seeds") <= 0) {
    setVillageMessage("Garden", "No seeds. A seed seller can visit after tower fights, and the tower sometimes pays out seeds.", 2.8);
    playAssetSfx("ui_button_click", 0.16);
    return;
  }
  if (!spendVillageEnergy(1, "planting")) return;
  addHubResource("seeds", -1);
  saveVillageFarmPlot(id, { state: "planted", watered: true, plantedDay: day, readyDay: day + 1 });
  saveGame();
  playAssetSfx("town_leaves", 0.24);
  addParticles("dust", plotDef.x, plotDef.y, -Math.PI / 2, 8);
  floatText.push({ x: plotDef.x - 32, y: plotDef.y - 36, text: "seed + water", t: 0.9 });
  setVillageMessage("Garden", "Seed planted and watered with one energy. It will grow after one tower fight.", 2.8);
  advanceVillageTask("farm");
}

function payVisitorCost(cost = {}) {
  const hub = ensureHubSave();
  for (const [key, value] of Object.entries(cost)) {
    if ((Number(hub[key]) || 0) < value) return false;
  }
  for (const [key, value] of Object.entries(cost)) hub[key] = (Number(hub[key]) || 0) - value;
  return true;
}

function applyVisitorReward(reward = {}) {
  const hub = ensureHubSave();
  for (const [key, value] of Object.entries(reward)) {
    if (key === "shards") save.shards += value;
    else hub[key] = (Number(hub[key]) || 0) + value;
  }
}

function interactVillageVisitor() {
  const hub = ensureHubSave();
  const visitor = activeVillageVisitor();
  if (!visitor) {
    setVillageMessage("Road", "No visitor is here. Visitors usually arrive after tower fights.", 2.4);
    return;
  }
  hub.collection.visitors[visitor.type] = true;
  const costText = Object.entries(visitor.cost || {}).map(([k, v]) => `${v} ${k}`).join(", ") || "free";
  for (const [key, value] of Object.entries(visitor.cost || {})) {
    if ((Number(hub[key]) || 0) < value) {
      playAssetSfx("ui_button_click", 0.16);
      setVillageMessage(visitor.name, `Need ${costText}. ${visitor.text}`, 3.0);
      floatText.push({ x: VILLAGE_VISITOR_SPOT.x - 36, y: VILLAGE_VISITOR_SPOT.y - 48, text: "need trade", t: 2.0 });
      return;
    }
  }
  payVisitorCost(visitor.cost);
  applyVisitorReward(visitor.reward);
  hub.visitor.bought = true;
  saveGame();
  villagePulse = 1;
  playAssetSfx("cache_upgrade", 0.34);
  playAssetSfx("bonus_chime", 0.26);
  addParticles("reward", VILLAGE_VISITOR_SPOT.x, VILLAGE_VISITOR_SPOT.y - 12, -Math.PI / 2, 26);
  const rewardText = Object.entries(visitor.reward || {}).map(([k, v]) => `+${v} ${k}`).join("  ");
  floatText.push({ x: VILLAGE_VISITOR_SPOT.x - 48, y: VILLAGE_VISITOR_SPOT.y - 54, text: rewardText, t: 1.2 });
  setVillageMessage(visitor.name, `${visitor.text} Trade complete: ${rewardText}. Another visitor may arrive after your next tower fight.`, 3.4);
}

function costText(cost = {}) {
  return Object.entries(cost).map(([k, v]) => `${v} ${k}`).join(", ") || "free";
}

function interactVillageTownsperson(id) {
  const npc = VILLAGE_TOWNSFOLK.find(item => item.id === id);
  if (!npc) return;
  const hub = ensureHubSave();
  const need = npc.need || {};
  for (const [key, value] of Object.entries(need)) {
    if ((Number(hub[key]) || 0) < value) {
      const point = villageTownfolkPoint(npc);
      setVillageMessage(npc.name, `Need ${costText(need)}. ${npc.text}`, 3.0);
      floatText.push({ x: point.x - 32, y: point.y - 46, text: "need items", t: 0.9 });
      return;
    }
  }
  if (!spendVillageEnergy(1, `helping ${npc.name}`)) return;
  payVisitorCost(need);
  hub.hope = (Number(hub.hope) || 0) + (npc.rewardHope || 1);
  hub.collection.visitors[npc.id] = true;
  saveGame();
  const point = villageTownfolkPoint(npc);
  if (npc.prep) grantVillagePrep(npc.prep, npc.name);
  playAssetSfx("bonus_chime", 0.28);
  addParticles("reward", point.x, point.y - 10, -Math.PI / 2, 18);
  floatText.push({ x: point.x - 36, y: point.y - 48, text: `+${npc.rewardHope || 1} hope`, t: 2.0 });
  setVillageMessage(npc.name, `${npc.text} You helped ${npc.name} and got +${npc.rewardHope || 1} hope.`, 3.0);
}

function villageStumpCleared(id) {
  return Boolean(ensureHubSave().stumpsCleared?.[id]);
}

function villageStumpDropReady(id) {
  return Boolean(ensureHubSave().stumpDrops?.[id]);
}

function collectVillageStumpDrops() {
  const hub = ensureHubSave();
  let collected = false;
  for (const stump of VILLAGE_STUMPS) {
    if (!hub.stumpDrops?.[stump.id]) continue;
    const d = Math.hypot(villagePlayer.x - stump.x, villagePlayer.y - stump.y);
    if (d > 34) continue;
    delete hub.stumpDrops[stump.id];
    hub.supplies += stump.supplies || 1;
    const seedBonus = stump.treeKey || stump.longGoal || Math.random() < 0.35 ? 1 : 0;
    if (seedBonus) hub.seeds = (Number(hub.seeds) || 0) + seedBonus;
    if (stump.longGoal) hub.hope = (Number(hub.hope) || 0) + 1;
    if (stump.shards) save.shards += stump.shards;
    hub.lastGain = `Picked up ${stump.supplies || 1} wood supply${(stump.supplies || 1) === 1 ? "" : "ies"}${seedBonus ? ", +1 seed" : ""}${stump.shards ? `, +${stump.shards} shard${stump.shards === 1 ? "" : "s"}` : ""}${stump.longGoal ? ", +1 hope" : ""}.`;
    collected = true;
    villagePulse = 1;
    playAssetSfx("reward", 0.42);
    playAssetSfx("bonus_chime", 0.26);
    addParticles("reward", stump.x, stump.y - 10, -Math.PI / 2, 22);
    floatText.push({ x: stump.x - 54, y: stump.y - stump.r - 28, text: `+${stump.supplies || 1} supply${seedBonus ? " +seed" : ""}${stump.shards ? ` +${stump.shards} shard` : ""}${stump.longGoal ? " +hope" : ""}`, t: 2.0 });
    setVillageMessage("Wood", hub.lastGain, 2.6);
    advanceVillageTask("chop", 1, { dark: villagePointIsDark(stump.x, stump.y) });
  }
  if (collected) {
    saveGame();
    updateHud();
  }
}

function villageStumpHitCount(id) {
  return Number(ensureHubSave().stumpHits?.[id]) || 0;
}

function villageStumpActionText(stump) {
  if (villageObjectLocked(stump)) return villageLockedActionText(stump);
  const hits = villageStumpHitCount(stump.id);
  const left = Math.max(1, stump.hp - hits);
  const label = stump.treeKey ? "tree" : stump.longGoal ? "old growth" : "stump";
  return `chop ${label} (${left} hit${left === 1 ? "" : "s"}, 1 energy on break)`;
}

function chopVillageStump(id) {
  const stump = VILLAGE_STUMPS.find(item => item.id === id);
  if (!stump || villageStumpCleared(id)) return false;
  if (villageObjectLocked(stump)) {
    playAssetSfx("ui_button_click", 0.18);
    floatText.push({ x: stump.x - 42, y: stump.y - stump.r - 24, text: "locked", t: 2.0 });
    setVillageMessage("Long term goal", `${stump.treeKey ? "This tree" : stump.longGoal ? "This old growth stump" : "This stump"} needs ${villageRequirementText(stump.req)} before you can remove it.`, 3.2);
    return false;
  }

  const hits = villageStumpHitCount(id) + 1;
  if (hits >= stump.hp && !spendVillageEnergy(1, "finishing stump")) return false;
  const hub = ensureHubSave();
  hub.stumpHits[id] = hits;
  villageToolSwing = {
    t: 0.18,
    x: villagePlayer.x,
    y: villagePlayer.y,
    angle: Math.atan2(stump.y - villagePlayer.y, stump.x - villagePlayer.x)
  };
  addParticles("dust", stump.x, stump.y, -Math.PI / 2, 7);
  playAssetSfx("town_chop", 0.42);

  if (hits < stump.hp) {
    saveGame();
    const left = stump.hp - hits;
    floatText.push({ x: stump.x - 24, y: stump.y - 34, text: `${left} left`, t: 0.62 });
    setVillageMessage("Stump", `Chop it ${left} more time${left === 1 ? "" : "s"}. Tree stumps give supplies for village projects.` , 1.8);
    return true;
  }

  hub.stumpsCleared[id] = true;
  hub.stumpDrops[id] = true;
  if (stump.longGoal) unlockAchievement("first_old_growth", "Old Growth, New Road", "Chopped a milestone locked giant stump.");
  delete hub.stumpHits[id];
  hub.lastGain = "Wood is ready to pick up.";
  hub.lastHelp = "";
  saveGame();
  villagePulse = 1;
  playAssetSfx("town_tree_fall", 0.38);
  playAssetSfx("platformer_break", 0.18);
  addParticles("dust", stump.x, stump.y, -Math.PI / 2, 18);
  addParticles("reward", stump.x, stump.y - 8, -Math.PI / 2, 14);
  floatText.push({ x: stump.x - 40, y: stump.y - 42, text: "PICK UP", t: 2.0 });
  setVillageMessage("Stump chopped", "The stump broke into usable wood. Walk over the log pile to pick it up.", 2.6);
  updateHud();
  return true;
}

function swingVillageToolAt(x, y) {
  let best = null;
  for (const stump of VILLAGE_STUMPS) {
    if (villageStumpCleared(stump.id)) continue;
    const playerDistance = Math.hypot(villagePlayer.x - stump.x, villagePlayer.y - stump.y);
    const clickDistance = Math.hypot(x - stump.x, y - stump.y);
    if (playerDistance <= Math.max(74, stump.r + 52) && clickDistance <= Math.max(54, stump.r + 34)) {
      const score = playerDistance + clickDistance * 0.65;
      if (!best || score < best.score) best = { stump, score };
    }
  }
  if (best) return chopVillageStump(best.stump.id);

  villageToolSwing = {
    t: 0.14,
    x: villagePlayer.x,
    y: villagePlayer.y,
    angle: Math.atan2(y - villagePlayer.y, x - villagePlayer.x)
  };
  playAssetSfx("ui_button_click", 0.12);
  return false;
}

function villageTargetWorldPoint(target) {
  if (!target) return null;
  if (target.type === "villager") {
    const spot = VILLAGE_VILLAGER_SPOTS.find(item => item.id === target.id);
    return spot ? villageVillagerPoint(spot) : null;
  }
  if (target.type === "rubble") {
    const item = VILLAGE_RUBBLE.find(rubble => rubble.id === target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "stump") {
    const item = VILLAGE_STUMPS.find(stump => stump.id === target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "farm") {
    const item = VILLAGE_FARM_PLOTS.find(plot => plot.id === target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "mine") {
    const item = VILLAGE_MINE_NODES.find(mine => mine.id === target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "mess") {
    const item = villageMesses.find(mess => mess.id === target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "bridge") return villageBridgeNearPlayer();
  if (target.type === "fish") return { ...VILLAGE_FISHING_SPOTS[0] };
  if (target.type === "visitor") return { ...VILLAGE_VISITOR_SPOT };
  if (target.type === "townsperson") {
    const item = VILLAGE_TOWNSFOLK.find(npc => npc.id === target.id);
    return item ? villageTownfolkPoint(item) : null;
  }
  if (target.type === "board") return { ...VILLAGE_DAILY_BOARD };
  if (target.type === "project") {
    const item = hubProjectById(target.id);
    return item ? { x: item.x, y: item.y } : null;
  }
  if (target.type === "tower") return { ...VILLAGE_TOWER_GATE };
  if (target.type === "home") return { x: VILLAGE_HOME.x, y: VILLAGE_HOME.y };
  if (target.type === "chest") return { ...VILLAGE_CHEST };
  if (target.type === "shrine") return { ...VILLAGE_SHRINE };
  if (target.type === "power") {
    const b = VILLAGE_SERVICE_BUILDINGS.power;
    return { x: b.x + b.w / 2, y: b.y + b.h - 8 };
  }
  if (target.type === "collection") {
    const b = VILLAGE_SERVICE_BUILDINGS.collection;
    return { x: b.x + b.w / 2, y: b.y + b.h - 8 };
  }
  if (target.type === "menu") {
    const b = VILLAGE_SERVICE_BUILDINGS.road;
    return { x: b.x + b.w / 2, y: b.y + b.h - 4 };
  }
  return null;
}

function clickVillageActionAt(x, y) {
  for (const stump of VILLAGE_STUMPS) {
    if (villageStumpCleared(stump.id)) continue;
    const playerDistance = Math.hypot(villagePlayer.x - stump.x, villagePlayer.y - stump.y);
    const clickDistance = Math.hypot(x - stump.x, y - stump.y);
    if (playerDistance <= 74 && clickDistance <= 54) return chopVillageStump(stump.id);
  }

  villageInteractTarget = findVillageInteractTarget();
  const target = villageInteractTarget;
  if (target) {
    const point = villageTargetWorldPoint(target);
    const clickedPrompt = y - camera.y > H - 96;
    const clickedTarget = point && Math.hypot(x - point.x, y - point.y) <= (target.type === "fish" ? 118 : 96);
    if (clickedPrompt || clickedTarget || target.type === "mine" || target.type === "farm" || target.type === "fish" || target.type === "visitor" || target.type === "townsperson") {
      interactVillage();
      return true;
    }
  }

  villageToolSwing = {
    t: 0.14,
    x: villagePlayer.x,
    y: villagePlayer.y,
    angle: Math.atan2(y - villagePlayer.y, x - villagePlayer.x)
  };
  playAssetSfx("ui_button_click", 0.12);
  return false;
}

function hubProjectById(id) {
  return VILLAGE_PROJECTS.find(project => project.id === id);
}

function hubProjectCost(project) {
  const rank = hubProjectRank(project.id);
  const base = Math.max(1, Math.floor(rank / 3) + 1);
  return activeVillageDailyEvent()?.id === "forge_heat" ? Math.max(1, base - 1) : base;
}

function hubProjectActionText(project) {
  const rank = hubProjectRank(project.id);
  if (rank >= project.max) return `check ${project.name}`;
  const cost = hubProjectCost(project);
  return ensureHubSave().supplies >= cost
    ? `upgrade ${project.name} (${cost} supplies, 1 energy)`
    : `need ${cost} supplies`;
}

function improveVillageProject(id) {
  const project = hubProjectById(id);
  if (!project) return;
  const rank = hubProjectRank(id);
  const hub = ensureHubSave();

  if (rank >= project.max) {
    playAssetSfx("select", 0.2);
    floatText.push({ x: project.x - 30, y: project.y - 58, text: "finished", t: 0.9 });
    setVillageMessage(project.name, `${project.name} is finished. ${hubProjectTowerText(id, rank)} This building is already helping every climb.`);
    return;
  }

  const cost = hubProjectCost(project);
  if (hub.supplies < cost) {
    playAssetSfx("ui_button_click", 0.16);
    addParticles("dust", project.x, project.y + 8, -Math.PI / 2, 8);
    floatText.push({ x: project.x - 38, y: project.y - 58, text: `need ${cost}`, t: 2.0 });
    setVillageMessage(project.name, `Need ${cost} supplies. You have ${hub.supplies}. Chop stumps, clear rubble, or bring supplies back from the tower. Nothing was spent.`);
    return;
  }
  if (!spendVillageEnergy(1, `improving ${project.name}`)) return;

  hub.supplies -= cost;
  const nextRank = rank + 1;
  hub.projects[id] = nextRank;
  hub.hope = (Number(hub.hope) || 0) + 1;
  save.shards += 1;
  hub.lastHelp = `${project.name} rank ${nextRank}. ${hubProjectTowerText(id, nextRank)} +1 hope.`;
  hub.lastGain = "";
  saveGame();
  villagePulse = 1;
  playAssetSfx("bonus_chime", 0.36);
  playAssetSfx("cache_upgrade", 0.28);
  playAssetSfx("town_building_work", 0.22);
  addParticles("reward", project.x, project.y - 24, -Math.PI / 2, 30);
  addParticles("dust", project.x, project.y + 6, -Math.PI / 2, 12);
  floatText.push({ x: project.x - 52, y: project.y - 66, text: `rank ${nextRank}`, t: 1.1 });
  floatText.push({ x: project.x - 42, y: project.y - 46, text: "+1 hope  +1 shard", t: 1.2 });
  setVillageMessage(project.name, `Spent ${cost} supplies. ${project.reward} Rank ${nextRank}. ${hubProjectTowerText(id, nextRank)}`);
  advanceVillageTask("project");
  updateHud();
}


function interactVillage() {
  if (mode !== "village") return;
  if (villagePlayer.interactCooldown > 0) return;
  villagePlayer.interactCooldown = 0.18;
  villageInteractTarget = findVillageInteractTarget();
  const target = villageInteractTarget;
  if (!target) {
    setVillageMessage("Village", "Move close to a person, building, rubble, shrine, or the tower gate.", 2.4);
    return;
  }

  if (target.type === "villager") {
    helpVillager(target.id);
    return;
  }
  if (target.type === "rubble") {
    clearVillageRubble(target.id);
    return;
  }
  if (target.type === "stump") {
    chopVillageStump(target.id);
    return;
  }
  if (target.type === "project") {
    improveVillageProject(target.id);
    return;
  }
  if (target.type === "mess") {
    cleanVillageMess(target.id);
    return;
  }
  if (target.type === "farm") {
    workVillageFarmPlot(target.id);
    return;
  }
  if (target.type === "mine") {
    mineVillageNode(target.id);
    return;
  }
  if (target.type === "fish") {
    fishVillagePond();
    return;
  }
  if (target.type === "bridge") {
    repairVillageBridge();
    return;
  }
  if (target.type === "visitor") {
    interactVillageVisitor();
    return;
  }
  if (target.type === "townsperson") {
    interactVillageTownsperson(target.id);
    return;
  }
  if (target.type === "board") {
    renderVillageDailyBoard();
    return;
  }
  if (target.type === "tower") {
    renderVillagePrepTray();
    return;
  }
  if (target.type === "power") {
    renderPowerUps("backVillage");
    return;
  }
  if (target.type === "collection") {
    renderCollection("backVillage");
    return;
  }
  if (target.type === "menu") {
    renderMenu();
    return;
   }
  if (target.type === "home") {
    renderVillageHouse();
    return;
  }
  if (target.type === "chest") {
    renderVillageChest();
    return;
  }
  if (target.type === "shrine") {
    renderVillageShrine();
  }
}

function updateVillage(dt) {
  applyVillageLayout();
  updateVillageBuildMove();
  updateVillageDistrictLabel(dt);
  updateVillageBridgeCutscene(dt);
  const p = villagePlayer;
  let dx = 0;
  let dy = 0;
  const movementLocked = villageMapOpen || Boolean(villageBridgeCutscene);
  if (!movementLocked && (keys.has("w") || keys.has("arrowup"))) dy -= 1;
  if (!movementLocked && (keys.has("s") || keys.has("arrowdown"))) dy += 1;
  if (!movementLocked && (keys.has("a") || keys.has("arrowleft"))) dx -= 1;
  if (!movementLocked && (keys.has("d") || keys.has("arrowright"))) dx += 1;
  if (dx || dy) {
    const l = Math.hypot(dx, dy) || 1;
    dx /= l;
    dy /= l;
    p.angle = Math.atan2(dy, dx);
    const runMult = keys.has("shift") ? 1.55 : 1;
    moveVillagePlayer(dx * p.speed * runMult * dt, dy * p.speed * runMult * dt);
    p.bob += dt * 9 * runMult;
    if (nowSec() - lastPlayerFootstepAt > (runMult > 1 ? 0.23 : 0.34)) {
      playAssetSfx(`footstep_nature_${1 + (footstepVariantCursor++ % 4)}`, 0.16, "footsteps");
      lastPlayerFootstepAt = nowSec();
    }
  } else {
    p.bob *= Math.pow(0.05, dt);
  }

  villagePlayer.interactCooldown = Math.max(0, villagePlayer.interactCooldown - dt);
  villageToolSwing.t = Math.max(0, villageToolSwing.t - dt);
  villageMessage.t = Math.max(0, villageMessage.t - dt);
  updateVillageFishingGame(dt);
  const hub = ensureHubSave();
  if (hub.bridgeFixed && !hub.bridgeCutsceneSeen) {
    hub.bridgeCutsceneSeen = true;
    saveGame();
    startVillageBridgeCutscene();
  }
  if (hub.nightFallPending) {
    hub.nightFallPending = false;
    saveGame();
    setVillageMessage("Night falls", "The tower lights wake. Check tonight's prep at the gate and climb before the day goes cold.", 5.0);
    playAssetSfx("ui_confirm_001", 0.08);
  }
  villagePulse = Math.max(0, villagePulse - dt * 1.8);
  villageEnergyFlash = Math.max(0, villageEnergyFlash - dt * 2.8);
  maybeSpawnVillageMess();
  collectVillageStumpDrops();
  villageInteractTarget = findVillageInteractTarget();
  const camTarget = villageBridgeCutscene ? VILLAGE_BRIDGE : p;
  camera.x = clamp(camTarget.x - W / 2, 0, Math.max(0, VILLAGE_WORLD.w - W));
  camera.y = clamp(camTarget.y - H / 2, 0, Math.max(0, VILLAGE_WORLD.h - H));
}

function drawVillage() {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  drawVillageGround();
  drawVillagePond();
  drawVillageRiverAndBridge();
  drawVillagePaths();
  drawVillageExtraAreas();
  drawVillageHomeAndChest();
  drawVillageFences();
  drawVillageWallsAndTrees();
  drawVillageShrine();
  drawVillageTowerGate();
  drawVillageHuts();
  drawVillageSupplies();
  drawVillageRubble();
  drawVillageStumps();
  drawVillageStumpDrops();
  drawVillageActivitySites();
  drawVillageStations();
  drawVillageTaskMarkers();
  drawVillageMesses();
  drawVillageTownfolk();
  drawVillageVisitor();
  drawVillageVillagers();
  drawVillagePlayer();
  drawVillageToolSwing();
  drawParticles();
  drawFloatText();

  ctx.restore();
  drawVillageScreenUi();
  drawVillageDistrictLabel();
  drawVillageBuildModeUi();
  drawVillageMapOverlay();
  drawVillageBridgeCutscene();
  drawVillageFishingGame();
  drawAchievementToasts();
  drawScreenFlash();
}

function drawTownAsset(key, x, y, size = 32, angle = 0, alpha = 1) {
  const img = imageAsset(key);
  if (!img) return false;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
  return true;
}

function drawTownAssetRect(key, x, y, w, h, alpha = 1) {
  const img = imageAsset(key);
  if (!img) return false;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
  return true;
}

function villageHash(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function drawGrassTuft(x, y, s = 1, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(s, s);
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(42, 92, 48, 0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-5, 5);
  ctx.lineTo(-2, -3);
  ctx.moveTo(0, 6);
  ctx.lineTo(2, -5);
  ctx.moveTo(5, 5);
  ctx.lineTo(4, -2);
  ctx.stroke();
  ctx.fillStyle = "rgba(72, 129, 55, 0.45)";
  ctx.beginPath();
  ctx.ellipse(0, 7, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawVillageGround() {
  ctx.fillStyle = "#4d8e3f";
  ctx.fillRect(0, 0, VILLAGE_WORLD.w, VILLAGE_WORLD.h);

  for (let y = 0; y < VILLAGE_WORLD.h; y += 32) {
    for (let x = 0; x < VILLAGE_WORLD.w; x += 32) {
      const h = villageHash(x, y);
      const key = h > 0.58 ? "town_grass_b" : "town_grass_a";
      if (!drawTownAssetRect(key, x, y, 34, 34, 0.92)) {
        ctx.fillStyle = h > 0.58 ? "#5d9d45" : "#559540";
        ctx.fillRect(x, y, 32, 32);
      }
    }
  }

  const g = ctx.createRadialGradient(VILLAGE_TOWER_GATE.x, VILLAGE_SHRINE.y, 80, VILLAGE_TOWER_GATE.x, VILLAGE_SHRINE.y, 900);
  g.addColorStop(0, "rgba(228,218,131,0.13)");
  g.addColorStop(0.55, "rgba(31,52,43,0.08)");
  g.addColorStop(1, "rgba(3,5,12,0.48)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, VILLAGE_WORLD.w, VILLAGE_WORLD.h);

  ctx.fillStyle = "rgba(72,26,70,0.25)";
  ctx.beginPath();
  ctx.ellipse(62, 768, 210, 78, -0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(1190, 52, 210, 74, 0.25, 0, Math.PI * 2);
  ctx.fill();

  for (const item of VILLAGE_DECOR) {
    if (item.kind === "flower") {
      drawTownAsset("town_flower", item.x, item.y, 18 * item.s, item.a, 0.9);
    } else if (item.kind === "bush") {
      drawTownAsset("town_bush", item.x, item.y, 24 * item.s, item.a, 0.8) || drawGrassTuft(item.x, item.y, item.s, item.a);
    } else {
      drawGrassTuft(item.x, item.y, item.s, item.a);
    }
  }
}

function drawVillageRiverAndBridge() {
  const river = VILLAGE_RIVER;
  ctx.save();
  ctx.fillStyle = "rgba(7, 19, 18, 0.22)";
  ctx.fillRect(river.x - 8, 0, river.w + 16, VILLAGE_WORLD.h);
  for (let y = -16; y < VILLAGE_WORLD.h + 32; y += 32) {
    for (let x = river.x; x < river.x + river.w; x += 32) {
      drawTownAssetRect(villageHash(x, y) > 0.5 ? "town_water_a" : "town_water_b", x, y, 34, 34, 0.95);
    }
  }
  ctx.fillStyle = "rgba(4, 12, 20, 0.20)";
  ctx.fillRect(VILLAGE_DARK_DISTRICT.x, 0, VILLAGE_DARK_DISTRICT.w, VILLAGE_WORLD.h);
  ctx.fillStyle = "rgba(84, 34, 84, 0.10)";
  ctx.fillRect(VILLAGE_DARK_DISTRICT.x, 0, VILLAGE_DARK_DISTRICT.w, VILLAGE_WORLD.h);
  const b = VILLAGE_BRIDGE;
  if (villageBridgeFixed()) {
    for (let x = b.x - b.w / 2; x <= b.x + b.w / 2; x += 34) drawTownAsset("platformer_bridge", x, b.y, 44, 0, 0.95) || drawTownAsset("town_bridge", x, b.y, 42, 0, 0.95);
    drawTownAsset("platformer_bridge_logs", b.x - 58, b.y + 16, 54, 0, 0.95);
    drawTownAsset("platformer_bridge_logs", b.x + 58, b.y + 16, 54, 0, 0.95);
  } else {
    drawTownAsset("platformer_bridge_logs", b.x - 56, b.y + 18, 68, -0.42, 0.85) || drawTownAsset("town_bridge", b.x - 56, b.y + 18, 64, -0.42, 0.85);
    drawTownAsset("platformer_bridge_logs", b.x + 56, b.y - 12, 64, 0.38, 0.75) || drawTownAsset("town_bridge", b.x + 56, b.y - 12, 58, 0.38, 0.75);
    ctx.fillStyle = "rgba(255,92,122,0.78)";
    ctx.font = "900 9px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText(villageBridgeCanRepair() ? "REPAIR BRIDGE" : "BRIDGE LOCKED", b.x, b.y - 50);
    ctx.fillStyle = "rgba(245,241,255,0.68)";
    ctx.font = "800 7px ui-monospace, monospace";
    ctx.fillText(villageBridgeCanRepair() ? villageBridgeCostText().toUpperCase() : villageRequirementText(VILLAGE_BRIDGE.req).toUpperCase(), b.x, b.y - 38);
  }
  const gravestones = [
    [2460, 520], [2550, 560], [2760, 530], [2920, 700], [2500, 970], [2675, 1140], [2860, 1220]
  ];
  for (const [x, y] of gravestones) {
    drawTownAsset("platformer_brick_grey", x, y, 26, 0, 0.42) || drawTownAsset("town_stone_dark", x, y, 26, 0, 0.5);
    drawTownAsset("tiny_fence_h", x + 34, y + 24, 42, 0, 0.32);
  }
  drawTownAsset("platformer_block_warning", 2520, 820, 40, 0, 0.70);
  drawTownAsset("platformer_bush", 2860, 990, 44, 0, 0.55) || drawTownAsset("town_bush", 2860, 990, 44, 0, 0.55);
  drawTownAsset("tiny_sign", 2528, 720, 38, 0, 0.82);
  drawTownAsset("town_lamp", 2720, 705, 34, 0, villageBridgeFixed() ? 0.85 : 0.30);
  drawTownAsset("town_crate_big", 2795, 790, 34, 0.1, 0.55);
  drawTownAsset("town_barrel_b", 2828, 805, 28, 0, 0.48);
  ctx.restore();
}

function drawVillagePond() {
  const px = VILLAGE_POND.x;
  const py = VILLAGE_POND.y;
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(px, py, VILLAGE_POND.rx, VILLAGE_POND.ry, -0.08, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#62cde2";
  ctx.fillRect(px - VILLAGE_POND.rx - 18, py - VILLAGE_POND.ry - 14, VILLAGE_POND.rx * 2 + 36, VILLAGE_POND.ry * 2 + 28);
  for (let y = py - VILLAGE_POND.ry - 16; y < py + VILLAGE_POND.ry + 16; y += 32) {
    for (let x = px - VILLAGE_POND.rx - 18; x < px + VILLAGE_POND.rx + 18; x += 32) {
      drawTownAssetRect(villageHash(x, y) > 0.5 ? "town_water_a" : "town_water_b", x, y, 34, 34, 0.96);
    }
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(156,97,58,0.72)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(px, py, VILLAGE_POND.rx, VILLAGE_POND.ry, -0.08, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.ellipse(px - 34, py - 18, 38, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  drawTownAsset("town_bridge", px + 116, py + 20, 34, 0.1, 0.9);
  drawTownAsset("town_bridge", px + 148, py + 18, 34, 0.1, 0.9);
}

function drawVillagePaths() {
  const cx = VILLAGE_TOWER_GATE.x;
  const drawCurve = (points, width, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i += 2) {
      const c = points[i];
      const e = points[i + 1] || c;
      ctx.quadraticCurveTo(c.x, c.y, e.x, e.y);
    }
    ctx.stroke();
  };
  const branch = points => {
    drawCurve(points, 88, "rgba(88,60,38,0.34)");
    drawCurve(points, 62, "rgba(137,96,58,0.72)");
  };

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  branch([
    { x: cx, y: VILLAGE_WORLD.h - 110 },
    { x: cx - 12, y: 1110 }, { x: cx, y: 790 },
    { x: cx + 10, y: 520 }, { x: cx, y: 220 }
  ]);
  branch([{ x: cx, y: 430 }, { x: 930, y: 385 }, { x: VILLAGE_POND.x + 160, y: VILLAGE_POND.y + 30 }]);
  branch([{ x: cx, y: 470 }, { x: 860, y: 510 }, { x: VILLAGE_PROJECTS[0].x, y: VILLAGE_PROJECTS[0].y }]);
  branch([{ x: cx, y: 500 }, { x: 1225, y: 470 }, { x: VILLAGE_HOME.x, y: VILLAGE_HOME.y + 72 }]);
  branch([{ x: cx, y: 690 }, { x: 1240, y: 760 }, { x: VILLAGE_PROJECTS[1].x, y: VILLAGE_PROJECTS[1].y }]);
  branch([{ x: cx, y: 640 }, { x: 1500, y: 620 }, { x: VILLAGE_PROJECTS[2].x, y: VILLAGE_PROJECTS[2].y }]);
  branch([{ x: cx, y: 820 }, { x: 870, y: 925 }, { x: VILLAGE_SERVICE_BUILDINGS.power.x + 96, y: VILLAGE_SERVICE_BUILDINGS.power.y + 116 }]);
  branch([{ x: cx, y: 910 }, { x: 1380, y: 970 }, { x: VILLAGE_SERVICE_BUILDINGS.collection.x + 96, y: VILLAGE_SERVICE_BUILDINGS.collection.y + 114 }]);
  branch([{ x: cx, y: 1060 }, { x: 1080, y: 1190 }, { x: VILLAGE_SERVICE_BUILDINGS.road.x + 82, y: VILLAGE_SERVICE_BUILDINGS.road.y + 110 }]);
  branch([{ x: VILLAGE_VILLAGER_SPOTS[0].x, y: VILLAGE_VILLAGER_SPOTS[0].y + 70 }, { x: 640, y: 740 }, { x: cx, y: 680 }]);
  branch([{ x: VILLAGE_VILLAGER_SPOTS[1].x, y: VILLAGE_VILLAGER_SPOTS[1].y + 70 }, { x: 1020, y: 860 }, { x: cx, y: 780 }]);
  branch([{ x: VILLAGE_VILLAGER_SPOTS[2].x, y: VILLAGE_VILLAGER_SPOTS[2].y + 70 }, { x: 1510, y: 780 }, { x: cx, y: 690 }]);

  ctx.globalAlpha = 0.20;
  for (let y = 190; y < VILLAGE_WORLD.h - 80; y += 34) {
    drawTownAsset("town_dirt_a", cx - 18 + Math.sin(y * 0.04) * 8, y, 34, 0, 0.9);
    drawTownAsset("town_dirt_b", cx + 18 + Math.cos(y * 0.035) * 8, y + 8, 34, 0, 0.8);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawVillageWell() {
  ctx.save();
  const x = VILLAGE_WELL.x;
  const y = VILLAGE_WELL.y;
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(x + 3, y + 28, 48, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let i = -1; i <= 1; i++) drawTownAsset("town_stone_b", x + i * 22, y + 14, 28, 0, 0.9);
  ctx.fillStyle = "#0b111c";
  ctx.beginPath();
  ctx.ellipse(x, y + 12, 34, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(124,199,255,0.45)";
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,211,90,0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 34, y + 4);
  ctx.quadraticCurveTo(x, y - 36, x + 34, y + 4);
  ctx.stroke();
  drawTownAsset("town_barrel_c", x + 58, y + 30, 28, 0, 0.9);
  ctx.restore();
}

function drawVillageExtraAreas() {
  ctx.save();
  const marketX = VILLAGE_VISITOR_SPOT.x;
  const marketY = VILLAGE_VISITOR_SPOT.y + 16;
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(marketX, marketY + 18, 138, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  drawTownAsset("town_crate_big", marketX - 86, marketY + 14, 34, 0, 0.9);
  drawTownAsset("town_crate_small", marketX - 54, marketY + 18, 28, 0, 0.85);
  drawTownAsset("town_barrel_a", marketX + 74, marketY + 20, 30, 0, 0.85);
  drawTownAsset("tiny_chest", marketX + 104, marketY + 12, 32, 0, 0.96);
  drawTownAsset("tiny_sign", marketX, marketY - 24, 42, 0, 0.92);

  const forgeX = VILLAGE_SERVICE_BUILDINGS.power.x + 250;
  const forgeY = VILLAGE_SERVICE_BUILDINGS.power.y + 44;
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.beginPath();
  ctx.ellipse(forgeX, forgeY + 34, 120, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  drawTownAsset("town_barrel_b", forgeX - 72, forgeY + 22, 30, 0, 0.85);
  drawTownAsset("town_crate_big", forgeX - 34, forgeY + 26, 34, 0, 0.85);
  drawTownAsset("tiny_tool_pickaxe", forgeX + 26, forgeY + 6, 34, -0.65, 0.95);
  drawTownAsset("tiny_axe", forgeX + 64, forgeY + 10, 30, 0.35, 0.95);

  const groveX = 420;
  const groveY = 520;
  drawTownAsset("town_lamp", groveX - 48, groveY, 34, 0, 0.9);
  drawTownAsset("town_barrel_c", groveX + 44, groveY + 28, 28, 0, 0.85);
  drawTownAsset("tiny_flower", groveX, groveY + 34, 22, 0, 0.9);
  ctx.restore();
}

function drawVillageHomeAndChest() {
  const hub = ensureHubSave();
  const rank = Number(hub.homeRank) || 0;
  const h = VILLAGE_HOME;
  ctx.save();
  if (rank <= 0) {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(h.x, h.y + 30, 78, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    drawTownAsset("town_crate_big", h.x - 34, h.y + 18, 32, 0, 0.86);
    drawTownAsset("town_stump", h.x + 34, h.y + 20, 28, 0, 0.75);
    ctx.fillStyle = "rgba(3,5,12,0.62)";
    ctx.fillRect(h.x - 58, h.y - 22, 116, 34);
    ctx.strokeStyle = "rgba(255,211,90,0.58)";
    ctx.strokeRect(h.x - 58, h.y - 22, 116, 34);
    ctx.fillStyle = "#ffd35a";
    ctx.font = "900 9px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("BUILD YOUR HOUSE", h.x, h.y - 2);
  } else {
    drawVillageCottage({ x: h.x - h.w / 2, y: h.y - h.h / 2, w: h.w, h: h.h }, "#c77dff", "Home", Math.min(5, rank), 5);
    ctx.fillStyle = "#f5f1ff";
    ctx.font = "900 11px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`YOUR HOUSE R${rank}`, h.x, h.y + 78);
  }
  drawTownAsset("tiny_chest", VILLAGE_CHEST.x, VILLAGE_CHEST.y, 44, 0, 1) || drawTownAsset("town_crate_big", VILLAGE_CHEST.x, VILLAGE_CHEST.y, 44, 0, 1);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 9px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText("STORAGE", VILLAGE_CHEST.x, VILLAGE_CHEST.y + 38);
  ctx.restore();
}

function drawVillageFences() {
  ctx.save();
  const fenceRuns = [
    [150, 324, 7, "h"], [1110, 324, 8, "h"], [236, 646, 5, "h"], [1160, 646, 7, "h"],
    [160, 930, 6, "h"], [1290, 928, 8, "h"], [155, 676, 4, "v"], [1508, 675, 4, "v"],
    [210, 772, 4, "h"], [1345, 732, 5, "h"]
  ];
  for (const [x, y, count, dir] of fenceRuns) {
    for (let i = 0; i < count; i++) {
      drawTownAsset(dir === "h" ? "town_fence_h" : "town_fence_v", x + (dir === "h" ? i * 30 : 0), y + (dir === "v" ? i * 30 : 0), 34, 0, 0.95);
    }
  }
  ctx.restore();
}

function drawVillageWallsAndTrees() {
  ctx.save();
  ctx.fillStyle = "rgba(4,8,12,0.46)";
  ctx.fillRect(0, 0, VILLAGE_WORLD.w, 48);
  ctx.fillRect(0, 0, 38, VILLAGE_WORLD.h);
  ctx.fillRect(VILLAGE_WORLD.w - 38, 0, 38, VILLAGE_WORLD.h);
  ctx.fillRect(0, VILLAGE_WORLD.h - 38, VILLAGE_WORLD.w, 38);

  for (let x = 44; x < VILLAGE_WORLD.w - 40; x += 46) {
    if (x > VILLAGE_TOWER_GATE.x - 150 && x < VILLAGE_TOWER_GATE.x + 150) continue;
    drawTownAsset("town_tree_small", x, 36 + (x % 3) * 5, 42, 0, 0.84);
  }
  for (const [x, y, key] of VILLAGE_TREE_LINES) drawVillageTree(x, y, key);
  for (let i = 0; i < 12; i++) {
    drawTownAsset("town_bush", 58 + i * 82, VILLAGE_WORLD.h - 62 + (i % 2) * 7, 28, 0, 0.75);
    drawTownAsset("town_bush", VILLAGE_WORLD.w - 64 - i * 82, VILLAGE_WORLD.h - 64 + (i % 2) * 7, 28, 0, 0.75);
  }
  ctx.restore();
}

function drawVillageTree(x, y, key = "town_tree_green") {
  ctx.fillStyle = "rgba(5,8,11,0.34)";
  ctx.beginPath();
  ctx.ellipse(x + 4, y + 28, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  if (!drawTownAsset(key, x, y, 72, 0, 0.98)) {
    ctx.fillStyle = "#28301f";
    ctx.fillRect(x - 7, y + 8, 14, 34);
    ctx.fillStyle = "#235033";
    ctx.beginPath();
    ctx.moveTo(x, y - 52);
    ctx.lineTo(x - 42, y + 22);
    ctx.lineTo(x + 42, y + 22);
    ctx.closePath();
    ctx.fill();
  }
}

function drawVillageShrine() {
  const restored = villageRestoredCount();
  const max = hubHopeMax();
  const pct = clamp(restored / Math.max(1, max), 0, 1);
  const pulse = 1 + villagePulse * 0.4;

  ctx.save();
  ctx.translate(VILLAGE_SHRINE.x, VILLAGE_SHRINE.y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 54, 136, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(91,88,82,0.88)";
  ctx.beginPath();
  ctx.arc(0, 0, 96, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    drawTownAsset("town_stone_a", Math.cos(a) * 86, Math.sin(a) * 86, 28, a, 0.75);
  }

  const glow = ctx.createRadialGradient(0, -12, 5, 0, -12, 126 + villagePulse * 34);
  glow.addColorStop(0, `rgba(124,199,255,${0.14 + pct * 0.24})`);
  glow.addColorStop(1, "rgba(124,199,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, -12, 126, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,211,90,0.88)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 102 * pulse, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
  ctx.stroke();

  ctx.fillStyle = "#0b111c";
  ctx.fillRect(-28, -44, 56, 92);
  ctx.strokeStyle = "rgba(124,199,255,0.58)";
  ctx.strokeRect(-28, -44, 56, 92);
  drawTownAsset("town_arch", 0, 8, 74, 0, 0.75);
  drawVillageCandle(-52, 44, pct);
  drawVillageCandle(52, 44, pct);
  drawVillageCandle(-74, 22, pct * 0.7);
  drawVillageCandle(74, 22, pct * 0.7);

  ctx.fillStyle = "#d9deea";
  ctx.textAlign = "center";
  ctx.font = "900 12px ui-monospace, monospace";
  ctx.fillText("MIRA", 0, 72);
  ctx.fillStyle = "rgba(217,222,234,0.64)";
  ctx.font = "700 10px ui-monospace, monospace";
  ctx.fillText(`${restored}/${max} RESTORED`, 0, 88);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "700 9px ui-monospace, monospace";
  ctx.fillText(`HOPE ${hubHope()}  RETRY ${ensureHubSave().retries || 0}`, 0, 101);
  ctx.restore();
}

function drawVillageCandle(x, y, power = 1) {
  ctx.fillStyle = "#eadfb6";
  ctx.fillRect(x - 3, y - 10, 6, 15);
  ctx.fillStyle = `rgba(255,211,90,${0.2 + power * 0.55})`;
  ctx.beginPath();
  ctx.arc(x, y - 15, 12 + power * 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffd35a";
  ctx.beginPath();
  ctx.moveTo(x, y - 24);
  ctx.quadraticCurveTo(x - 5, y - 16, x, y - 12);
  ctx.quadraticCurveTo(x + 5, y - 16, x, y - 24);
  ctx.fill();
}

function drawVillageTowerGate() {
  ctx.save();
  ctx.translate(VILLAGE_TOWER_GATE.x, VILLAGE_TOWER_GATE.y);
  ctx.fillStyle = "rgba(0,0,0,0.36)";
  ctx.beginPath();
  ctx.ellipse(0, 62, 178, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1b2230";
  ctx.fillRect(-146, -34, 292, 86);
  ctx.strokeStyle = "#ffd35a";
  ctx.lineWidth = 4;
  ctx.strokeRect(-146, -34, 292, 86);

  for (let i = -4; i <= 4; i++) drawTownAsset("town_stone_dark", i * 32, -2, 34, 0, 0.8);
  for (let i = -4; i <= 4; i++) drawTownAsset("town_stone_b", i * 32, 34, 34, 0, 0.7);
  const omen = activeVillageOmen();
  const pulse = 0.7 + Math.sin(nowSec() * 2.4) * 0.25;
  const g = ctx.createRadialGradient(0, 20, 18, 0, 20, 132);
  g.addColorStop(0, omen?.id === "red_lights" ? `rgba(255,92,122,${0.30 + pulse * 0.16})` : `rgba(124,199,255,${0.30 + pulse * 0.12})`);
  g.addColorStop(0.68, "rgba(48,69,98,0.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 22, 126, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  drawTownAsset("town_arch", -78, 26, 62, 0, 0.95);
  drawTownAsset("town_arch", 78, 26, 62, 0, 0.95);
  ctx.fillStyle = "#f5f1ff";
  ctx.textAlign = "center";
  ctx.font = "900 24px ui-monospace, monospace";
  ctx.fillText("TOWER GATE", 0, 8);
  ctx.fillStyle = "rgba(217,222,234,0.66)";
  ctx.font = "900 12px ui-monospace, monospace";
  ctx.fillText("E: prep tray", 0, 42);
  if (omen) {
    ctx.fillStyle = omen.id === "red_lights" ? "#ff6b7d" : "#7cc7ff";
    ctx.font = "900 10px ui-monospace, monospace";
    ctx.fillText(omen.name.toUpperCase(), 0, 62);
  }
  ctx.restore();
}

function drawVillageHuts() {
  for (const spot of VILLAGE_VILLAGER_SPOTS) {
    const rank = hubVillagerRank(spot.id);
    const villager = hubVillagerById(spot.id);
    drawVillageCottage(spot.hut, spot.color, villager.role, rank, villager.max);
  }
}

function drawVillageCottage(h, color, role, rank, max) {
  const cx = h.x + h.w / 2;
  const buildStage = clamp(rank, 0, 5);
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(cx + 8, h.y + h.h + 10, h.w * 0.54, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  if (buildStage <= 0) {
    ctx.fillStyle = "rgba(101,71,44,0.7)";
    ctx.fillRect(h.x + 26, h.y + 98, h.w - 52, 12);
    ctx.fillStyle = "#caa96c";
    ctx.fillRect(cx - 28, h.y + 86, 56, 18);
    ctx.strokeStyle = hexToRgba(color, 0.55);
    ctx.strokeRect(cx - 28, h.y + 86, 56, 18);
    drawTownAsset(role === "Smith" ? "tiny_tool_pickaxe" : role === "Lookout" ? "tiny_target" : "tiny_chest", cx + 42, h.y + 82, 26, 0, 0.95);
    drawTownAsset("town_crate_small", cx - 46, h.y + 102, 24, 0, 0.85);
    drawTownAsset("town_stump", cx - 74, h.y + 104, 26, 0, 0.7);
    ctx.fillStyle = "#f5f1ff";
    ctx.font = "900 11px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("CAMP MAT", cx, h.y + 82);
  } else {
    const wallTop = buildStage <= 2 ? h.y + 70 : h.y + 42;
    const wallInset = buildStage <= 2 ? 32 : 18;
    ctx.fillStyle = "#c9b27f";
    ctx.fillRect(h.x + wallInset, wallTop, h.w - wallInset * 2, h.h - (wallTop - h.y) - 2);
    ctx.strokeStyle = hexToRgba(color, 0.58);
    ctx.lineWidth = 3;
    ctx.strokeRect(h.x + wallInset, wallTop, h.w - wallInset * 2, h.h - (wallTop - h.y) - 2);
    ctx.fillStyle = "#9d6735";
    ctx.beginPath();
    ctx.moveTo(h.x + 4, h.y + 52);
    ctx.lineTo(cx, buildStage <= 2 ? h.y + 8 : h.y - 12);
    ctx.lineTo(h.x + h.w - 4, h.y + 52);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,211,90,0.48)";
    ctx.stroke();
    const roofPieces = buildStage <= 2 ? 3 : 5;
    for (let i = 0; i < roofPieces; i++) {
      const offset = i - Math.floor(roofPieces / 2);
      drawTownAsset("town_roof_a", cx + offset * 28, h.y + 40 - Math.abs(offset) * 8, 34, 0, 0.85);
    }
    if (buildStage >= 2) drawTownAsset("town_door_a", cx, h.y + h.h - 22, 42, 0, 0.98);
    if (buildStage >= 3) drawTownAsset("town_window_a", h.x + 46, h.y + 74, 30, 0, 0.95);
    if (buildStage >= 4) drawTownAsset("town_window_b", h.x + h.w - 46, h.y + 74, 30, 0, 0.95);
  }

  ctx.fillStyle = "rgba(3,5,12,0.46)";
  ctx.beginPath();
  ctx.roundRect(cx - 34, h.y + h.h - 20, 68, 13, 4);
  ctx.fill();
  for (let i = 0; i < max; i++) {
    ctx.fillStyle = i < rank ? color : "rgba(255,255,255,0.2)";
    ctx.fillRect(cx - 26 + i * 11, h.y + h.h - 16, 8, 6);
  }
  ctx.restore();
}

function drawVillageSupplies() {
  const hub = ensureHubSave();
  const count = clamp(hub.supplies, 0, 18);
  const x = 1294;
  const y = 870;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(x + 12, y + 70, 112, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  drawVillageSmallBuilding(x - 88, y - 40, 190, 126, "#ffd35a", "SUPPLY SHED", "Storage", "town_crate_big");
  for (let i = 0; i < Math.max(4, count); i++) {
    const px = x - 62 + (i % 6) * 25;
    const py = y + 62 - Math.floor(i / 6) * 22;
    const key = i % 3 === 0 ? "town_crate_big" : i % 3 === 1 ? "town_barrel_a" : "town_crate_small";
    drawTownAsset(key, px, py, 28, 0, i < count ? 1 : 0.24);
  }
  ctx.restore();
}

function drawVillageRubble() {
  for (const rubble of VILLAGE_RUBBLE) {
    if (villageRubbleCleared(rubble.id)) continue;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(rubble.x + 3, rubble.y + rubble.r * 0.65, rubble.r * 1.15, rubble.r * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();
    if (rubble.kind === "boulder") {
      drawTownAsset("town_stone_dark", rubble.x - rubble.r * 0.15, rubble.y, rubble.r * 1.8, 0.15, 0.9);
      drawTownAsset("town_stone_a", rubble.x + rubble.r * 0.3, rubble.y + rubble.r * 0.25, rubble.r * 1.1, -0.15, 0.75);
    } else if (rubble.kind === "cart") {
      drawTownAsset("town_crate_big", rubble.x - rubble.r * 0.34, rubble.y, rubble.r * 1.35, 0.05, 0.9);
      drawTownAsset("town_barrel_a", rubble.x + rubble.r * 0.36, rubble.y + 6, rubble.r * 1.0, 0, 0.82);
      drawTownAsset("tiny_chest", rubble.x + 2, rubble.y - rubble.r * 0.42, rubble.r * 0.85, 0, 0.95);
    } else if (rubble.kind === "oak") {
      drawTownAsset("town_stump", rubble.x - rubble.r * 0.45, rubble.y + 4, rubble.r * 1.6, 0.25, 0.95);
      drawTownAsset("tiny_log", rubble.x + rubble.r * 0.3, rubble.y - 2, rubble.r * 1.45, -0.18, 0.95);
      drawTownAsset("town_bush", rubble.x + rubble.r * 0.62, rubble.y + 10, rubble.r * 0.8, 0, 0.6);
    } else {
      drawTownAsset("town_stump", rubble.x - rubble.r * 0.26, rubble.y, rubble.r * 1.25, 0.1, 0.9);
      drawTownAsset("town_crate_small", rubble.x + rubble.r * 0.28, rubble.y + 4, rubble.r * 1.05, -0.15, 0.8);
      drawTownAsset("town_stone_dark", rubble.x - rubble.r * 0.16, rubble.y + 12, rubble.r * 0.9, 0.2, 0.6);
    }
    const locked = villageObjectLocked(rubble);
    ctx.strokeStyle = locked ? "rgba(255,92,122,0.55)" : "rgba(255,211,90,0.45)";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(rubble.x, rubble.y, rubble.r + 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    if (locked) {
      ctx.fillStyle = "rgba(3,5,12,0.72)";
      ctx.fillRect(rubble.x - 56, rubble.y - rubble.r - 32, 112, 18);
      ctx.fillStyle = "#ff6b6b";
      ctx.font = "900 8px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(villageRequirementText(rubble.req).toUpperCase(), rubble.x, rubble.y - rubble.r - 19);
    }
    ctx.restore();
  }
}

function drawVillageStumps() {
  for (const stump of VILLAGE_STUMPS) {
    const cleared = villageStumpCleared(stump.id);
    const hits = villageStumpHitCount(stump.id);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    ctx.beginPath();
    ctx.ellipse(stump.x + 2, stump.y + stump.r * 0.6, stump.r * 1.1, Math.max(8, stump.r * 0.38), 0, 0, Math.PI * 2);
    ctx.fill();
    if (cleared) {
      if (!villageStumpDropReady(stump.id)) drawGrassTuft(stump.x + 6, stump.y + 8, 0.55, 0.32);
      ctx.restore();
      continue;
    }
    if (stump.treeKey) {
      drawTownAsset(stump.treeKey, stump.x, stump.y - stump.r * 0.25, Math.max(62, stump.r * 2.2), 0, 0.98);
      drawTownAsset("town_stump", stump.x, stump.y + stump.r * 0.55, Math.max(28, stump.r * 1.0), 0, 0.82);
    } else {
      drawTownAsset("town_stump", stump.x, stump.y, Math.max(34, stump.r * 1.7), 0, 0.95);
    }
    if (stump.longGoal) {
      drawTownAsset("tiny_log", stump.x + stump.r * 0.38, stump.y - stump.r * 0.1, Math.max(42, stump.r * 1.7), -0.22, 0.78);
      drawTownAsset("town_bush", stump.x + stump.r * 0.55, stump.y + stump.r * 0.14, stump.r * 0.92, 0, 0.55);
    }
    if (hits > 0) {
      ctx.strokeStyle = "rgba(255,211,90,0.65)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(stump.x - 10, stump.y - 8);
      ctx.lineTo(stump.x + 10, stump.y + 7);
      ctx.moveTo(stump.x + 8, stump.y - 9);
      ctx.lineTo(stump.x - 8, stump.y + 8);
      ctx.stroke();
      ctx.fillStyle = "rgba(3,5,12,0.68)";
      const barW = Math.max(36, stump.r * 1.6);
      ctx.fillRect(stump.x - barW / 2, stump.y + stump.r + 3, barW, 5);
      ctx.fillStyle = "#ffd35a";
      ctx.fillRect(stump.x - barW / 2, stump.y + stump.r + 3, barW * clamp(hits / stump.hp, 0, 1), 5);
    }
    if (villageObjectLocked(stump)) {
      ctx.strokeStyle = "rgba(255,92,122,0.58)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(stump.x, stump.y, stump.r + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(3,5,12,0.72)";
      ctx.fillRect(stump.x - 58, stump.y - stump.r - 31, 116, 18);
      ctx.fillStyle = "#ff6b6b";
      ctx.font = "900 8px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(villageRequirementText(stump.req).toUpperCase(), stump.x, stump.y - stump.r - 18);
    }
    drawTownAsset("tiny_axe", stump.x + stump.r * 0.85, stump.y - stump.r * 0.75, 24, -0.7, 0.92);
    ctx.restore();
  }
}

function drawVillageStumpDrops() {
  const hub = ensureHubSave();
  for (const stump of VILLAGE_STUMPS) {
    if (!hub.stumpDrops?.[stump.id]) continue;
    const bob = Math.sin(nowSec() * 5 + stump.x) * 2;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.26)";
    ctx.beginPath();
    ctx.ellipse(stump.x + 2, stump.y + 14, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,211,90,0.48)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(stump.x, stump.y + bob, 28 + Math.sin(nowSec() * 4) * 2, 0, Math.PI * 2);
    ctx.stroke();
    drawTownAsset("tiny_log", stump.x - 8, stump.y + bob, 30, -0.25, 1) || drawTownAsset("town_stump", stump.x - 4, stump.y + bob, 25, 0, 0.85);
    drawTownAsset("tiny_chest", stump.x + 13, stump.y + bob + 2, 22, 0.16, 0.9);
    if (stump.shards) drawTownAsset("tiny_coin", stump.x + 2, stump.y + bob - 18, 18, 0, 0.95);
    ctx.fillStyle = "#ffd35a";
    ctx.font = "900 9px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("PICK UP", stump.x, stump.y - 28 + bob);
    ctx.restore();
  }
}

function drawVillageStations() {
  drawVillageServiceBuildings();
  drawVillageDailyBoard();
  drawVillageProjects();
}

function drawVillageDailyBoard() {
  const hub = ensureHubSave();
  const x = VILLAGE_DAILY_BOARD.x;
  const y = VILLAGE_DAILY_BOARD.y;
  const task = activeBoardTask();
  const done = (hub.boardTasks || []).filter(item => item.done).length;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.32)";
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 24, 54, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  drawTownAsset("tiny_sign", x, y, 70, 0, 1);
  ctx.fillStyle = "rgba(3,5,12,0.68)";
  ctx.beginPath();
  ctx.roundRect(x - 58, y + 28, 116, 34, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,211,90,0.72)";
  ctx.stroke();
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText("DAILY BOARD", x, y + 43);
  ctx.fillStyle = "rgba(245,241,255,0.86)";
  ctx.font = "900 9px ui-monospace, monospace";
  ctx.fillText(`${done}/${Math.max(1, hub.boardTasks?.length || 3)} DONE`, x, y + 57);
  if (task) {
    ctx.strokeStyle = "rgba(125,255,178,0.72)";
    ctx.beginPath();
    ctx.arc(x, y + 4, 44 + Math.sin(nowSec() * 3) * 3, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVillageServiceBuildings() {
  const collection = VILLAGE_SERVICE_BUILDINGS.collection;
  const power = VILLAGE_SERVICE_BUILDINGS.power;
  const road = VILLAGE_SERVICE_BUILDINGS.road;
  drawVillageSmallBuilding(collection.x, collection.y, collection.w, collection.h, collection.color, "GEAR", "Collection", "town_crate_big");
  drawVillageSmallBuilding(power.x, power.y, power.w, power.h, power.color, "TRAINING", "Power Up", "town_barrel_b");
  drawVillageSmallBuilding(road.x, road.y, road.w, road.h, road.color, "ROAD", "Main Menu", "town_fence_h2");
}

function drawVillageSmallBuilding(x, y, w, h, color, top, bottom, iconKey) {
  const cx = x + w / 2;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(cx + 8, y + h + 8, w * 0.48, 17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c9b27f";
  ctx.fillRect(x + 18, y + 38, w - 36, h - 42);
  ctx.strokeStyle = hexToRgba(color, 0.5);
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 18, y + 38, w - 36, h - 42);
  ctx.fillStyle = "#9d6735";
  ctx.beginPath();
  ctx.moveTo(x + 5, y + 48);
  ctx.lineTo(cx, y - 16);
  ctx.lineTo(x + w - 5, y + 48);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,211,90,0.45)";
  ctx.stroke();
  for (let i = -2; i <= 2; i++) drawTownAsset("town_roof_b", cx + i * 27, y + 34 - Math.abs(i) * 8, 34, 0, 0.86);
  drawTownAsset("town_door_b", cx, y + h - 22, 42, 0, 0.98);
  drawTownAsset("town_window_a", x + 46, y + 70, 28, 0, 0.95);
  drawTownAsset("town_window_b", x + w - 46, y + 70, 28, 0, 0.95);
  drawTownAsset(iconKey, cx, y + 56, 34, 0, 0.9);
  if (bottom === "Collection") {
    drawTownAsset("tiny_sword", cx - 28, y + 57, 22, -0.7, 0.95);
    drawTownAsset("tiny_chest", cx + 28, y + 57, 24, 0, 0.95);
  } else if (bottom === "Power Up") {
    drawTownAsset("tiny_target", cx - 28, y + 57, 23, 0, 0.95);
    drawTownAsset("tiny_axe", cx + 28, y + 57, 23, -0.5, 0.95);
  } else if (bottom === "Main Menu") {
    drawTownAsset("tiny_sign", cx, y + 56, 28, 0, 0.95);
  }

  ctx.fillStyle = "rgba(3,5,12,0.52)";
  ctx.beginPath();
  ctx.roundRect(cx - 58, y + h + 3, 116, 21, 4);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(color, 0.46);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(bottom.toUpperCase(), cx, y + h + 17);
  ctx.restore();
}


function drawVillageProjects() {
  for (const project of VILLAGE_PROJECTS) {
    const rank = hubProjectRank(project.id);
    if (project.id === "garden") drawVillageGarden(project, rank);
    else if (project.id === "kitchen") drawVillageKitchen(project, rank);
    else drawVillageWatchPost(project, rank);
  }
}

function drawVillageProjectLabel(project, rank) {
  const pipCount = 5;
  const milestone = Math.floor(rank / pipCount) * pipCount;
  ctx.save();
  ctx.fillStyle = "rgba(3,5,12,0.48)";
  ctx.beginPath();
  ctx.roundRect(project.x - 62, project.y + 62, 124, 20, 5);
  ctx.fill();
  for (let i = 0; i < pipCount; i++) {
    ctx.fillStyle = i < (rank - milestone) ? project.color : "rgba(255,255,255,0.22)";
    ctx.fillRect(project.x - 46 + i * 19, project.y + 69, 12, 5);
  }
  ctx.fillStyle = "rgba(245,241,255,0.9)";
  ctx.font = "900 9px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(`RANK ${rank}`, project.x, project.y + 58);
  ctx.restore();
}

function drawVillageGarden(project, rank) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.beginPath();
  ctx.ellipse(project.x, project.y + 28, 150, 48, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = -4; i <= 4; i++) {
    drawTownAsset("town_fence_h", project.x + i * 31, project.y - 58, 34, 0, 0.9);
    drawTownAsset("town_fence_h", project.x + i * 31, project.y + 62, 34, 0, 0.88);
  }
  for (let i = -1; i <= 1; i++) {
    drawTownAsset("town_fence_v", project.x - 142, project.y - 30 + i * 34, 34, 0, 0.86);
    drawTownAsset("town_fence_v", project.x + 142, project.y - 30 + i * 34, 34, 0, 0.86);
  }

  for (let row = 0; row < 4; row++) {
    const x = project.x - 78 + row * 52;
    const restored = row < rank;
    for (let j = -1; j <= 1; j++) drawTownAsset("town_dirt_b", x, project.y + j * 24, 34, 0, restored ? 0.96 : 0.55);
    if (restored) {
      for (let y = project.y - 28; y <= project.y + 34; y += 20) {
        drawGrassTuft(x - 8, y, 0.8, 0);
        drawTownAsset("town_flower", x + 8, y - 3, 14, 0, 0.86);
      }
    } else {
      drawTownAsset("town_stump", x, project.y + 4, 24, 0, 0.7);
      drawTownAsset("town_stone_dark", x + 14, project.y + 18, 18, 0, 0.42);
    }
  }

  drawTownAsset("town_barrel_c", project.x + 118, project.y + 34, 28, 0, 0.95);
  drawTownAsset("town_crate_small", project.x - 118, project.y + 34, 26, 0, 0.85);
  drawTownAsset("tiny_tool_shovel", project.x - 122, project.y - 28, 24, -0.4, 0.92);
  drawTownAsset("tiny_flower", project.x + 122, project.y - 25, 24, 0, 0.92);
  if (rank > 0) drawTownAsset("tiny_grass_detail", project.x, project.y - 58, 30, 0, 0.82);
  drawVillageProjectLabel(project, rank);
  ctx.restore();
}

function drawVillageKitchen(project, rank) {
  ctx.save();
  const cx = project.x;
  const glow = 0.13 + rank * 0.09;
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(cx, project.y + 42, 124, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#bda77b";
  ctx.fillRect(cx - 82, project.y - 32, 164, 88);
  ctx.strokeStyle = hexToRgba(project.color, 0.45 + rank * 0.08);
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 82, project.y - 32, 164, 88);
  ctx.fillStyle = "#9d6735";
  ctx.beginPath();
  ctx.moveTo(cx - 104, project.y - 28);
  ctx.lineTo(cx, project.y - 82);
  ctx.lineTo(cx + 104, project.y - 28);
  ctx.closePath();
  ctx.fill();
  for (let i = -2; i <= 2; i++) drawTownAsset("town_roof_b", cx + i * 29, project.y - 28 - Math.abs(i) * 8, 34, 0, 0.9);
  drawTownAsset("town_door_b", cx, project.y + 34, 42, 0, 0.95);
  drawTownAsset("town_window_a", cx - 50, project.y + 3, 28, 0, 0.9);
  drawTownAsset("town_window_b", cx + 50, project.y + 3, 28, 0, 0.9);

  for (let i = -2; i <= 2; i++) drawTownAsset("town_stone_b", cx + i * 22, project.y + 78, 26, 0, 0.92);
  ctx.fillStyle = `rgba(255,116,66,${glow})`;
  ctx.beginPath();
  ctx.arc(cx, project.y + 68, 24 + rank * 4, 0, Math.PI * 2);
  ctx.fill();
  if (rank > 0) {
    ctx.fillStyle = "#ffb35a";
    ctx.beginPath();
    ctx.moveTo(cx, project.y + 38 - Math.sin(nowSec() * 5) * 3);
    ctx.quadraticCurveTo(cx - 14, project.y + 59, cx, project.y + 80);
    ctx.quadraticCurveTo(cx + 14, project.y + 59, cx, project.y + 38 - Math.sin(nowSec() * 5) * 3);
    ctx.fill();
  }
  drawTownAsset("town_crate_small", cx - 112, project.y + 58, 28, 0, 0.86);
  drawTownAsset("town_barrel_a", cx + 112, project.y + 58, 28, 0, 0.86);
  drawTownAsset("tiny_barrel", cx + 94, project.y + 18, 28, 0, 0.95);
  drawTownAsset("tiny_log", cx - 92, project.y + 18, 28, 0.1, 0.9);
  if (rank > 1) drawTownAsset("tiny_coin", cx, project.y + 5, 24, 0, 0.9);
  drawVillageProjectLabel(project, rank);
  ctx.restore();
}

function drawVillageWatchPost(project, rank) {
  ctx.save();
  const cx = project.x;
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(cx, project.y + 48, 118, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = -1; i <= 1; i++) {
    const x = cx + i * 38;
    ctx.fillStyle = "#7d5638";
    ctx.fillRect(x - 5, project.y - 34, 10, 96);
    drawTownAsset("town_fence_v2", x, project.y + 28, 38, 0, 0.82);
  }
  ctx.fillStyle = "#b78b55";
  ctx.fillRect(cx - 74, project.y - 46, 148, 36);
  ctx.strokeStyle = hexToRgba(project.color, 0.42 + rank * 0.1);
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 74, project.y - 46, 148, 36);
  ctx.fillStyle = "#9d6735";
  ctx.beginPath();
  ctx.moveTo(cx - 88, project.y - 48);
  ctx.lineTo(cx, project.y - 96);
  ctx.lineTo(cx + 88, project.y - 48);
  ctx.closePath();
  ctx.fill();
  drawTownAsset("town_roof_peak", cx, project.y - 54, 62, 0, 0.92);
  drawTownAsset("town_crate_big", cx, project.y + 48, 34, 0, 0.9);
  for (let i = 0; i < rank; i++) {
    drawTownAsset("town_lamp", cx - 58 + i * 38, project.y - 18 - (i % 2) * 10, 34, 0, 0.96);
  }
  ctx.strokeStyle = hexToRgba(project.color, 0.18 + rank * 0.08);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, project.y - 24, 78 + rank * 6, 0, Math.PI * 2);
  ctx.stroke();
  drawTownAsset("tiny_target", cx + 92, project.y - 20, 30, 0, 0.95);
  drawTownAsset("tiny_tool_pickaxe", cx - 94, project.y + 26, 26, 0.5, 0.9);
  drawVillageProjectLabel(project, rank);
  ctx.restore();
}


function drawVillageActivitySites() {
  drawVillageFarmPlots();
  drawVillageMineNodes();
  drawVillageFishingSpot();
}

function drawVillageFarmPlots() {
  ctx.save();
  for (const plot of VILLAGE_FARM_PLOTS) {
    const state = villageFarmPlot(plot.id);
    drawTownAsset("town_dirt_b", plot.x, plot.y, 42, 0, 0.94);
    ctx.strokeStyle = "rgba(64,42,20,0.35)";
    ctx.strokeRect(plot.x - 18, plot.y - 18, 36, 36);
    if (state.state === "planted") {
      const grown = state.watered ? 0.9 : 0.5;
      drawGrassTuft(plot.x - 5, plot.y + 4, grown, 0);
      drawGrassTuft(plot.x + 7, plot.y + 5, grown, 0.2);
      if (state.watered) {
        ctx.fillStyle = "rgba(124,199,255,0.18)";
        ctx.fillRect(plot.x - 16, plot.y - 16, 32, 32);
      }
    } else if (state.state === "ready") {
      drawTownAsset("tiny_flower", plot.x - 6, plot.y, 24, 0, 0.98);
      drawTownAsset("tiny_flower", plot.x + 9, plot.y + 2, 20, 0, 0.98);
      ctx.strokeStyle = "rgba(255,211,90,0.78)";
      ctx.strokeRect(plot.x - 20, plot.y - 20, 40, 40);
    }
  }
  ctx.restore();
}

function drawVillageMineNodes() {
  const day = ensureHubSave().towerDay;
  for (const mine of VILLAGE_MINE_NODES) {
    const spent = ensureHubSave().mineCleared?.[mine.id] === day;
    ctx.save();
    ctx.globalAlpha = spent ? 0.42 : 1;
    drawTownAsset("town_stone_dark", mine.x, mine.y, 42, 0, 0.95);
    drawTownAsset("tiny_tool_pickaxe", mine.x + 22, mine.y - 14, 24, -0.55, 0.9);
    const hits = villageMineHitCount(mine.id);
    if (hits > 0 && !spent) {
      ctx.strokeStyle = "rgba(255,211,90,0.72)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mine.x - 10, mine.y - 8);
      ctx.lineTo(mine.x + 10, mine.y + 9);
      ctx.moveTo(mine.x + 8, mine.y - 10);
      ctx.lineTo(mine.x - 7, mine.y + 10);
      ctx.stroke();
    }
    if (!spent) {
      ctx.strokeStyle = villageObjectLocked(mine) ? "rgba(255,92,122,0.55)" : "rgba(255,211,90,0.42)";
      ctx.beginPath();
      ctx.arc(mine.x, mine.y, 30 + Math.sin(nowSec() * 2 + mine.x) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawVillageFishingSpot() {
  const spot = VILLAGE_FISHING_SPOTS[0];
  if (!spot) return;
  ctx.save();
  ctx.strokeStyle = "rgba(255,211,90,0.42)";
  ctx.beginPath();
  ctx.arc(spot.x, spot.y, 36 + Math.sin(nowSec() * 2.1) * 2, 0, Math.PI * 2);
  ctx.stroke();
  drawTownAsset("tiny_sign", spot.x + 44, spot.y + 18, 22, 0, 0.8);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.ellipse(spot.x - 20 + Math.sin(nowSec() * 1.7) * 12, spot.y - 4, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawVillageMesses() {
  if (!villageMesses.length) return;
  ctx.save();
  for (const mess of villageMesses) {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(mess.x + 2, mess.y + 10, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#58754f";
    ctx.beginPath();
    ctx.arc(mess.x - 4, mess.y, 5, 0, Math.PI * 2);
    ctx.arc(mess.x + 3, mess.y + 2, 6, 0, Math.PI * 2);
    ctx.arc(mess.x + 9, mess.y - 1, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,211,90,0.55)";
    ctx.beginPath();
    ctx.arc(mess.x, mess.y, 18 + Math.sin(nowSec() * 3 + mess.x) * 2, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawVillageTownfolk() {
  ctx.save();
  for (const npc of VILLAGE_TOWNSFOLK) {
    const point = villageTownfolkPoint(npc);
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    ctx.beginPath();
    ctx.ellipse(point.x + 2, point.y + 18, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    drawTownAsset("town_crate_small", point.x - 38, point.y + 14, 24, 0, 0.82);
    drawTownAsset(npc.icon || "tiny_sign", point.x - 38, point.y - 8, 22, 0, 0.9);
    if (!drawImageAsset(npc.sprite || "player_alt", point.x, point.y, 44, 44)) {
      ctx.fillStyle = "#ffd35a";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
      ctx.fill();
    }
    const nearNpc = Math.hypot(villagePlayer.x - point.x, villagePlayer.y - point.y) < 88;
    if (nearNpc) {
      ctx.strokeStyle = "rgba(255,211,90,0.42)";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 28, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "#f5f1ff";
    ctx.font = "900 10px ui-monospace, monospace";
    ctx.fillText(npc.name, point.x, point.y + 45);
    ctx.fillStyle = "rgba(245,241,255,0.70)";
    ctx.font = "900 7px ui-monospace, monospace";
    ctx.fillText(npc.title.toUpperCase(), point.x, point.y + 56);
  }
  ctx.restore();
}

function drawVillageVisitor() {
  const visitor = activeVillageVisitor();
  if (!visitor) return;
  const x = VILLAGE_VISITOR_SPOT.x;
  const y = VILLAGE_VISITOR_SPOT.y;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.34)";
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 18, 26, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  drawTownAsset("town_crate_big", x - 54, y + 14, 34, 0, 0.9);
  drawTownAsset("town_barrel_a", x - 22, y + 12, 28, 0, 0.88);
  drawTownAsset(visitor.type === "seed" ? "tiny_flower" : visitor.type === "miner" ? "tiny_tool_pickaxe" : visitor.type === "fisher" ? "tiny_key" : "tiny_coin", x - 54, y - 12, 24, 0, 0.95);
  if (!drawImageAsset(visitor.sprite || "rpg_soldier", x, y, 42, 42)) {
    ctx.fillStyle = "#ffd35a";
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  if (Math.hypot(villagePlayer.x - x, villagePlayer.y - y) < 92) {
    ctx.strokeStyle = "rgba(255,211,90,0.50)";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(visitor.name.toUpperCase(), x, y + 48);
  ctx.font = "900 8px ui-monospace, monospace";
  ctx.fillStyle = "rgba(245,241,255,0.8)";
  ctx.fillText(visitor.title.toUpperCase(), x, y + 60);
  ctx.restore();
}

function drawVillageVillagers() {
  for (const spot of VILLAGE_VILLAGER_SPOTS) {
    const villager = hubVillagerById(spot.id);
    const rank = hubVillagerRank(spot.id);
    const size = 48 + Math.min(rank, 5) * 2;
    const point = villageVillagerPoint(spot);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.beginPath();
    ctx.ellipse(point.x + 2, point.y + 18, 26, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    if (Math.hypot(villagePlayer.x - point.x, villagePlayer.y - point.y) < 90) {
      ctx.strokeStyle = hexToRgba(spot.color, 0.48 + Math.min(0.25, rank * 0.04));
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 28, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (!drawImageAsset(villager.sprite, point.x, point.y, size, size)) {
      ctx.fillStyle = spot.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 18, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#f5f1ff";
    ctx.font = "900 13px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText(villager.name, point.x, point.y + 44);
    ctx.restore();
  }
}

function drawVillagePlayer() {
  const p = villagePlayer;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.36)";
  ctx.beginPath();
  ctx.ellipse(p.x + 2, p.y + 16, 20, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  const bob = Math.sin(p.bob) * 3;
  const sprite = shapeById(save.selectedShape).sprite;
  if (!drawImageAsset(sprite, p.x, p.y + bob, 44, 44)) {
    ctx.fillStyle = colorById(save.selectedColor).value;
    ctx.beginPath();
    ctx.arc(p.x, p.y + bob, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawVillageToolSwing() {
  if (villageToolSwing.t <= 0) return;
  const p = villagePlayer;
  const t = villageToolSwing.t / 0.18;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(villageToolSwing.angle - 0.8 + (1 - t) * 1.4);
  ctx.globalAlpha = clamp(t * 1.4, 0, 1);
  drawTownAsset("tiny_axe", 28, -8, 32, 0, 1) || (() => {
    ctx.strokeStyle = "rgba(255,211,90,0.85)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(12, -12);
    ctx.lineTo(36, 6);
    ctx.stroke();
  })();
  ctx.restore();
}

function villageTaskMarkerTargets(task = activeBoardTask()) {
  if (!task || task.done) return [];
  if (task.type === "rubble") return VILLAGE_RUBBLE.filter(rubble => !villageRubbleCleared(rubble.id) && !villageObjectLocked(rubble) && (!task.dark || villagePointIsDark(rubble.x, rubble.y))).map(rubble => ({ x: rubble.x, y: rubble.y, label: task.dark ? "DARK" : "BOARD" })).slice(0, 4);
  if (task.type === "chop") return VILLAGE_STUMPS.filter(stump => !villageStumpCleared(stump.id) && !villageObjectLocked(stump) && (!task.dark || villagePointIsDark(stump.x, stump.y))).map(stump => ({ x: stump.x, y: stump.y, label: task.dark ? "DARK" : "BOARD" })).slice(0, 4);
  if (task.type === "mine") return VILLAGE_MINE_NODES.filter(mine => !villageMineClearedToday(mine.id) && (!task.dark || villagePointIsDark(mine.x, mine.y))).map(mine => ({ x: mine.x, y: mine.y, label: task.dark ? "DARK" : "BOARD" })).slice(0, 3);
  if (task.type === "fish") return VILLAGE_FISHING_SPOTS.map(spot => ({ x: spot.x, y: spot.y, label: "BOARD" }));
  if (task.type === "farm") return VILLAGE_FARM_PLOTS.map(plot => ({ x: plot.x, y: plot.y, label: "BOARD" })).slice(0, 5);
  if (task.type === "project") return VILLAGE_PROJECTS.filter(project => hubProjectRank(project.id) < project.max).map(project => ({ x: project.x, y: project.y, label: "BOARD" }));
  if (task.type === "hairball") return (villageMesses.length ? villageMesses : VILLAGE_MESS_SPOTS.slice(0, task.need || 2)).map(item => ({ x: item.x, y: item.y, label: "CLEAN" })).slice(0, 3);
  if (task.type === "villager" && task.villager) {
    const spot = VILLAGE_VILLAGER_SPOTS.find(item => item.id === task.villager);
    return spot ? [{ x: spot.x, y: spot.y, label: "BOARD" }] : [];
  }
  return [];
}

function drawVillageTaskMarkers() {
  if (villageBuildMode || villageMapOpen || villageBridgeCutscene) return;
  const targets = villageTaskMarkerTargets();
  if (!targets.length) return;
  ctx.save();
  ctx.textAlign = "center";
  for (const target of targets) {
    const bob = Math.sin(nowSec() * 5 + target.x) * 4;
    ctx.strokeStyle = "rgba(255,211,90,0.42)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(target.x, target.y - 28 + bob, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,211,90,0.70)";
    ctx.font = "900 7px ui-monospace, monospace";
    ctx.fillText(target.label, target.x, target.y - 41 + bob);
  }
  ctx.restore();
}

function drawVillageScreenUi() {
  const hub = ensureHubSave();
  const restored = villageRestoredCount();
  const maxHope = hubHopeMax();
  const pct = clamp(restored / Math.max(1, maxHope), 0, 1);
  const linesFor = (text, maxWidth) => {
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  ctx.save();
  const hudHover = mouse.screenX >= 16 && mouse.screenX <= 398 && mouse.screenY >= 16 && mouse.screenY <= 120;
  const hudA = hudHover ? 1 : 0.16;
  ctx.globalAlpha = hudA;
  ctx.fillStyle = hudHover ? "rgba(3,5,12,0.52)" : "rgba(3,5,12,0.10)";
  ctx.fillRect(16, 16, 382, 104);
  ctx.strokeStyle = hudHover ? "rgba(255,211,90,0.48)" : "rgba(255,211,90,0.08)";
  ctx.strokeRect(16, 16, 382, 104);
  ctx.globalAlpha = hudHover ? 1 : 0.36;
  ctx.fillStyle = "#f5f1ff";
  ctx.font = "900 18px ui-monospace, monospace";
  ctx.fillText("Mira's Village", 32, 42);
  ctx.fillStyle = "rgba(217,222,234,0.72)";
  ctx.font = "800 11px ui-monospace, monospace";
  ctx.fillText("WASD move  ·  Shift run  ·  E interact  ·  Enter log", 32, 62);
  ctx.globalAlpha = hudHover ? 1 : 0.30;
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(32, 74, 220, 7);
  ctx.fillStyle = "#7dffb2";
  ctx.fillRect(32, 74, 220 * pct, 7);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 13px ui-monospace, monospace";
  ctx.fillText(`RESTORED ${restored}/${maxHope}`, 260, 82);
  const energy = villageEnergy();
  const maxEnergy = villageMaxEnergy();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(32, 94, 152, 7);
  ctx.fillStyle = villageEnergyFlash > 0 ? "#ffffff" : "#52e4ff";
  ctx.fillRect(32, 94, 152 * (energy / Math.max(1, maxEnergy)), 7);
  ctx.fillStyle = "#52e4ff";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.fillText(`ENERGY ${energy}/${maxEnergy}`, 192, 101);
  ctx.fillStyle = energy <= 1 ? "#ff6b6b" : "rgba(217,222,234,0.65)";
  ctx.font = "900 8px ui-monospace, monospace";
  ctx.fillText("tower refills town day", 280, 101);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(3,5,12,0.58)";
  ctx.fillRect(W - 220, 16, 204, 84);
  ctx.strokeStyle = "rgba(255,211,90,0.55)";
  ctx.strokeRect(W - 220, 16, 204, 84);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 11px ui-monospace, monospace";
  ctx.fillText("SUPPLIES", W - 200, 36);
  ctx.fillStyle = "#f5f1ff";
  ctx.font = "900 30px ui-monospace, monospace";
  ctx.textAlign = "right";
  ctx.fillText(String(hub.supplies), W - 32, 57);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(217,222,234,0.78)";
  ctx.font = "900 9px ui-monospace, monospace";
  ctx.fillText(`Hope ${hubHope()}  Retry ${hub.retries || 0}`, W - 210, 72);
  ctx.fillText(`Seeds ${hub.seeds}  Ore ${hub.ore}  Fish ${hub.fish}  Crops ${hub.crops}`, W - 210, 86);

  const task = activeBoardTask();
  const omen = activeVillageOmen();
  const dailyEvent = activeVillageDailyEvent();
  const todayX = 430;
  const todayY = 18;
  const todayW = 260;
  ctx.globalAlpha = 0.48;
  ctx.fillStyle = "rgba(3,5,12,0.18)";
  ctx.fillRect(todayX, todayY, todayW, 34);
  ctx.strokeStyle = "rgba(125,255,178,0.18)";
  ctx.strokeRect(todayX, todayY, todayW, 34);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(125,255,178,0.78)";
  ctx.font = "900 8px ui-monospace, monospace";
  ctx.fillText("JOB", todayX + 10, todayY + 13);
  ctx.fillStyle = "rgba(245,241,255,0.78)";
  ctx.font = "900 9px ui-monospace, monospace";
  const taskText = task ? villageTaskText(task) : "Board has jobs";
  ctx.fillText((linesFor(taskText, todayW - 20)[0] || "").slice(0, 36), todayX + 10, todayY + 27);

  const returnCard = hub.lastReturnCard;
  const returnAge = returnCard?.ts ? Math.max(0, (Date.now() - returnCard.ts) / 1000) : 99;
  if (returnCard && returnCard.floor && returnAge < 8) {
    const alpha = clamp(1 - returnAge / 8, 0, 1);
    ctx.save();
    ctx.globalAlpha = 0.85 * alpha;
    ctx.fillStyle = "rgba(3,5,12,0.45)";
    ctx.fillRect(28, 132, 274, 54);
    ctx.strokeStyle = "rgba(124,199,255,0.26)";
    ctx.strokeRect(28, 132, 274, 54);
    ctx.fillStyle = "rgba(124,199,255,0.9)";
    ctx.font = "900 9px ui-monospace, monospace";
    ctx.fillText(`FLOOR ${returnCard.floor} CLEAR`, 42, 151);
    ctx.fillStyle = "rgba(245,241,255,0.86)";
    ctx.font = "900 10px ui-monospace, monospace";
    ctx.fillText(`+${returnCard.shardsFound} shards  +${returnCard.suppliesFound} supplies`, 42, 169);
    ctx.restore();
  }

  const target = villageInteractTarget;
  if (target) {
    ctx.fillStyle = "rgba(3,5,12,0.55)";
    ctx.fillRect(W / 2 - 178, H - 62, 356, 38);
    ctx.strokeStyle = "rgba(255,211,90,0.52)";
    ctx.strokeRect(W / 2 - 178, H - 62, 356, 38);
    ctx.fillStyle = "rgba(255,211,90,0.92)";
    ctx.font = "900 11px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`E / CLICK  ${target.action.toUpperCase()}`.slice(0, 44), W / 2, H - 42);
    ctx.fillStyle = "rgba(217,222,234,0.62)";
    ctx.font = "800 8px ui-monospace, monospace";
    ctx.fillText(String(target.label).slice(0, 42), W / 2, H - 28);
    ctx.textAlign = "left";
  }

  if (villageMessage.t > 0) {
    const msgAlpha = clamp(villageMessage.t / Math.max(1, villageMessage.maxT || 3.4), 0, 1);
    const msgLines = linesFor(villageMessage.text, 336).slice(0, 2);
    const boxH = 34 + msgLines.length * 14;
    const boxW = 374;
    const bottomGap = target ? 74 : 24;
    const boxY = H - (boxH + bottomGap);
    ctx.save();
    ctx.globalAlpha = 0.82 * msgAlpha;
    ctx.fillStyle = "rgba(3,5,12,0.52)";
    ctx.fillRect(24, boxY, boxW, boxH);
    ctx.strokeStyle = "rgba(124,199,255,0.28)";
    ctx.strokeRect(24, boxY, boxW, boxH);
    ctx.fillStyle = "rgba(124,199,255,0.9)";
    ctx.font = "900 9px ui-monospace, monospace";
    ctx.fillText(villageMessage.speaker.toUpperCase().slice(0, 26), 38, boxY + 18);
    ctx.fillStyle = "rgba(245,241,255,0.86)";
    ctx.font = "800 10px ui-monospace, monospace";
    msgLines.forEach((line, i) => ctx.fillText(line, 38, boxY + 34 + i * 14));
    ctx.restore();
  }
  ctx.restore();
}

function drawVillageDistrictLabel() {
  if (villageDistrictLabel.t <= 0 || villageMapOpen || villageBuildMode || villageBridgeCutscene) return;
  const a = clamp(villageDistrictLabel.t / Math.max(1, villageDistrictLabel.maxT || 4.8), 0, 1);
  const hub = ensureHubSave();
  const returnAge = hub.lastReturnCard?.ts ? Math.max(0, (Date.now() - hub.lastReturnCard.ts) / 1000) : 99;
  ctx.save();
  ctx.globalAlpha = Math.min(0.72, a * 0.78);
  const label = villageDistrictLabel.name.toUpperCase();
  ctx.font = "900 10px ui-monospace, monospace";
  const w = Math.min(190, Math.max(112, ctx.measureText(label).width + 34));
  const x = 24;
  const y = returnAge < 8 ? 194 : 126;
  ctx.fillStyle = "rgba(3,5,12,0.32)";
  ctx.fillRect(x, y, w, 22);
  ctx.strokeStyle = villageDistrictLabel.name === "Grave Road" ? "rgba(199,125,255,0.32)" : "rgba(255,211,90,0.22)";
  ctx.strokeRect(x, y, w, 22);
  ctx.fillStyle = villageDistrictLabel.name === "Grave Road" ? "#c77dff" : "#ffd35a";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 12, y + 15);
  ctx.restore();
}

function drawVillageBuildModeUi() {
  if (!villageBuildMode) return;
  ctx.save();
  const panelW = 430;
  const panelX = W / 2 - panelW / 2;
  const panelY = 112;
  ctx.fillStyle = "rgba(3,5,12,0.54)";
  ctx.fillRect(panelX, panelY, panelW, 30);
  ctx.strokeStyle = "rgba(255,211,90,0.40)";
  ctx.strokeRect(panelX, panelY, panelW, 30);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(villageMoveState?.entry ? `MOVING ${villageMoveState.entry.label.toUpperCase()} · CLICK TO PLACE` : "MOVE MODE · CLICK OBJECT · CLICK PLACE · B DONE", W / 2, panelY + 20);
  ctx.translate(-camera.x, -camera.y);
  ctx.textAlign = "center";
  for (const entry of villagePlaceableEntries()) {
    if (entry.locked) continue;
    const near = Math.hypot(mouse.x - entry.x, mouse.y - entry.y) < Math.max(34, entry.r || 34);
    ctx.strokeStyle = near || villageMoveState?.entry?.id === entry.id ? "rgba(255,211,90,0.72)" : "rgba(255,255,255,0.20)";
    ctx.lineWidth = near ? 2 : 1;
    ctx.beginPath();
    ctx.arc(entry.x, entry.y, Math.max(18, Math.min(54, entry.r || 28)), 0, Math.PI * 2);
    ctx.stroke();
    if (near || villageMoveState?.entry?.id === entry.id) {
      ctx.fillStyle = "rgba(3,5,12,0.56)";
      ctx.fillRect(entry.x - 50, entry.y - Math.max(32, entry.r || 28) - 22, 100, 16);
      ctx.fillStyle = "#f5f1ff";
      ctx.font = "900 8px ui-monospace, monospace";
      ctx.fillText(entry.label.toUpperCase().slice(0, 18), entry.x, entry.y - Math.max(32, entry.r || 28) - 10);
    }
  }
  ctx.restore();
}

function drawMapDot(mx, my, icon, label, color = "#ffd35a") {
  ctx.fillStyle = color;
  ctx.font = "900 14px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(icon, mx, my + 4);
  if (label) {
    ctx.font = "800 7px ui-monospace, monospace";
    ctx.fillStyle = "rgba(245,241,255,0.78)";
    ctx.fillText(label.toUpperCase().slice(0, 12), mx, my + 16);
  }
}

function drawVillageMapOverlay() {
  if (!villageMapOpen) return;
  const mapW = Math.min(720, W - 80);
  const mapH = Math.min(430, H - 90);
  const x0 = W / 2 - mapW / 2;
  const y0 = H / 2 - mapH / 2;
  const sx = mapW / VILLAGE_WORLD.w;
  const sy = mapH / VILLAGE_WORLD.h;
  const mx = x => x0 + x * sx;
  const my = y => y0 + y * sy;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(3,5,12,0.82)";
  ctx.fillRect(x0 - 14, y0 - 42, mapW + 28, mapH + 70);
  ctx.strokeStyle = "rgba(255,211,90,0.55)";
  ctx.strokeRect(x0 - 14, y0 - 42, mapW + 28, mapH + 70);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 18px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("Town Map", x0, y0 - 16);
  ctx.fillStyle = "rgba(245,241,255,0.66)";
  ctx.font = "800 10px ui-monospace, monospace";
  ctx.fillText("M or Esc closes · B enters move mode", x0 + 124, y0 - 17);
  ctx.fillStyle = "rgba(77,142,63,0.78)";
  ctx.fillRect(x0, y0, mapW, mapH);
  ctx.fillStyle = "rgba(7,35,58,0.72)";
  ctx.fillRect(mx(VILLAGE_RIVER.x), y0, VILLAGE_RIVER.w * sx, mapH);
  ctx.fillStyle = villageBridgeFixed() ? "rgba(53,24,63,0.48)" : "rgba(0,0,0,0.26)";
  ctx.fillRect(mx(VILLAGE_DARK_DISTRICT.x), y0, VILLAGE_DARK_DISTRICT.w * sx, mapH);
  ctx.fillStyle = villageBridgeFixed() ? "rgba(199,125,255,0.60)" : "rgba(255,92,122,0.58)";
  ctx.fillRect(mx(VILLAGE_BRIDGE.x - VILLAGE_BRIDGE.w / 2), my(VILLAGE_BRIDGE.y - VILLAGE_BRIDGE.h / 2), VILLAGE_BRIDGE.w * sx, Math.max(5, VILLAGE_BRIDGE.h * sy));
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  for (let x = x0; x <= x0 + mapW; x += mapW / 6) { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + mapH); ctx.stroke(); }
  for (let y = y0; y <= y0 + mapH; y += mapH / 4) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + mapW, y); ctx.stroke(); }
  drawMapDot(mx(VILLAGE_TOWER_GATE.x), my(VILLAGE_TOWER_GATE.y), "▲", "Tower", "#ff6b6b");
  drawMapDot(mx(VILLAGE_HOME.x), my(VILLAGE_HOME.y), "⌂", "House", "#c77dff");
  drawMapDot(mx(VILLAGE_CHEST.x), my(VILLAGE_CHEST.y), "▣", "Chest", "#ffd35a");
  drawMapDot(mx(VILLAGE_DAILY_BOARD.x), my(VILLAGE_DAILY_BOARD.y), "!", "Board", "#7dffb2");
  drawMapDot(mx(VILLAGE_SHRINE.x), my(VILLAGE_SHRINE.y), "✦", "Shrine", "#7cc7ff");
  const garden = hubProjectById("garden");
  if (garden) drawMapDot(mx(garden.x), my(garden.y), "✿", "Garden", "#7dffb2");
  const taskTargets = villageTaskMarkerTargets(activeBoardTask()).slice(0, 5);
  for (const target of taskTargets) drawMapDot(mx(target.x), my(target.y), "●", "Job", "#ffffff");
  drawMapDot(mx(villagePlayer.x), my(villagePlayer.y), "◆", "You", "#ffffff");
  ctx.fillStyle = villageBridgeFixed() ? "#c77dff" : "#ff6b6b";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText(villageBridgeFixed() ? "GRAVE ROAD OPEN" : "BROKEN BRIDGE", mx(VILLAGE_BRIDGE.x), my(VILLAGE_BRIDGE.y) - 12);
  if (!villageBridgeFixed()) {
    ctx.fillStyle = "rgba(245,241,255,0.68)";
    ctx.fillText("UNKNOWN DISTRICT", mx(VILLAGE_DARK_DISTRICT.x + VILLAGE_DARK_DISTRICT.w / 2), y0 + 30);
  } else {
    ctx.fillStyle = "rgba(199,125,255,0.84)";
    ctx.fillText("GRAVE ROAD", mx(VILLAGE_DARK_DISTRICT.x + VILLAGE_DARK_DISTRICT.w / 2), y0 + 30);
  }
  ctx.restore();
}

function drawVillageBridgeCutscene() {
  if (!villageBridgeCutscene) return;
  const age = villageBridgeCutscene.maxT - villageBridgeCutscene.t;
  const a = clamp(Math.min(age / 0.6, villageBridgeCutscene.t / 0.8), 0, 1);
  ctx.save();
  ctx.globalAlpha = 0.62 * a;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = a;
  const w = 430;
  const h = 104;
  const x = W / 2 - w / 2;
  const y = H / 2 - h / 2;
  ctx.fillStyle = "rgba(3,5,12,0.78)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(255,211,90,0.62)";
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 20px ui-monospace, monospace";
  ctx.textAlign = "center";
  ctx.fillText("The bridge holds.", W / 2, y + 38);
  ctx.fillStyle = "rgba(245,241,255,0.78)";
  ctx.font = "800 12px ui-monospace, monospace";
  ctx.fillText("Grave Road is open. New board jobs can appear.", W / 2, y + 66);
  ctx.fillStyle = "rgba(199,125,255,0.88)";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.fillText("DARK DISTRICT UNLOCKED", W / 2, y + 88);
  ctx.restore();
}

function wrapCanvasText(text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(/\s+/);
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function normAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function addLog(text) {
  logs.unshift({ text, t: nowSec() });
  logs.splice(8);
  renderLog();
}

function renderLog() {
  logEl.innerHTML = logs.map(item => `<div class="logItem">${item.text}</div>`).join("");
}

function openOverlay(html, screen = "modal") {
  overlay.style.display = "grid";
  overlay.className = `overlayScreen ${screen}`;
  titleCard.innerHTML = html;
  document.body.dataset.screen = screen;
}

function closeOverlay() {
  overlay.style.display = "none";
  overlay.className = "";
  document.body.dataset.screen = "game";
}

function syncPauseButton() {
  if (!pauseButton) return;
  pauseButton.hidden = !(mode === "running" && !gameOver);
}

function showPauseOverlay(accepted = false) {
  overlay.style.display = "grid";
  overlay.className = "overlayScreen pauseMenu";
  document.body.dataset.screen = "game";
  titleCard.innerHTML = `
    <div class="pauseCard">
      <div class="pauseTag">PAUSE REQUEST</div>
      <h2>${accepted ? "Paused" : "Asking to pause"}</h2>
      <p>${accepted ? "The fight is frozen. Resume when you are ready, or end the run from here." : "Pause request sent. The other side is accepting it now."}</p>
      <div class="pauseStatus ${accepted ? "accepted" : "pending"}">${accepted ? "ACCEPTED" : "WAITING"}</div>
      <div class="pauseActions">
        ${accepted ? `<button class="vsButton green pauseResume" data-action="resumeFight">RESUME</button>` : `<button class="vsButton blue pauseResume" data-action="noop">WAITING...</button>`}
        <button class="vsButton red pauseEnd" data-action="confirmEndRun">END RUN</button>
      </div>
      <small>Esc or P pauses. End Run is here so Escape does not throw away a run.</small>
    </div>
  `;
}

function showEndRunConfirm() {
  if (!(mode === "paused" || mode === "pauseRequest")) return;
  overlay.style.display = "grid";
  overlay.className = "overlayScreen pauseMenu";
  document.body.dataset.screen = "game";
  titleCard.innerHTML = `
    <div class="pauseCard">
      <div class="pauseTag">END RUN</div>
      <h2>Leave this run?</h2>
      <p>This sends you back to the main menu. Floors reached stay saved.</p>
      <div class="pauseActions">
        <button class="vsButton green pauseResume" data-action="resumeFight">KEEP PLAYING</button>
        <button class="vsButton red pauseEnd" data-action="abandonRun">END RUN</button>
      </div>
      <small>Esc resumes here. Main menu keeps reached floor progress.</small>
    </div>
  `;
}

function showVillagePauseOverlay() {
  mode = "villagePaused";
  overlay.style.display = "grid";
  overlay.className = "overlayScreen pauseMenu";
  document.body.dataset.screen = "game";
  titleCard.innerHTML = `
    <div class="pauseCard">
      <div class="pauseTag">VILLAGE PAUSED</div>
      <h2>Paused</h2>
      <p>The village is frozen. Resume, open the main menu, or quit from the main menu.</p>
      <div class="pauseActions">
        <button class="vsButton green pauseResume" data-action="resumeVillage">RESUME</button>
        <button class="vsButton blue" data-action="openVillageOptions">SETTINGS</button>
        <button class="vsButton blue" data-action="backMenu">MAIN MENU</button>
      </div>
      <small>Settings work live. Change sound, then Back returns here.</small>
    </div>
  `;
}

function resumeVillage() {
  if (mode !== "villagePaused") return;
  mode = "village";
  closeOverlay();
  lastTime = performance.now();
}

function pauseRunAudio() {
  if (!musicAudio) return;
  try {
    musicAudio.pause();
  } catch {}
}

function resumeRunAudio() {
  if (!musicAudio) return;
  try {
    updateMusicVolume();
    musicAudio.play().catch(() => {});
  } catch {}
}

function requestFightPause() {
  if (mode !== "running" || gameOver) return;
  mode = "pauseRequest";
  running = false;
  mouse.down = false;
  keys.clear();
  pauseRequestedAt = nowSec();
  pauseAcceptedAt = 0;
  addLog("Pause requested.");
  pauseRunAudio();
  showPauseOverlay(false);
  updateHud();
}

function acceptFightPause() {
  if (mode !== "pauseRequest") return;
  mode = "paused";
  running = false;
  pauseAcceptedAt = nowSec();
  addLog("Pause accepted.");
  showPauseOverlay(true);
  updateHud();
}

function updatePauseRequest() {
  if (mode === "pauseRequest" && nowSec() - pauseRequestedAt >= 0.9) acceptFightPause();
}

function resumeFight() {
  if (!(mode === "paused" || mode === "pauseRequest")) return;
  closeOverlay();
  mode = "running";
  running = true;
  pauseRequestedAt = 0;
  pauseAcceptedAt = 0;
  lastTime = performance.now();
  resumeRunAudio();
  addLog("Fight resumed.");
  updateHud();
}

function abandonRun() {
  if (!(mode === "paused" || mode === "pauseRequest")) return;
  running = false;
  gameOver = false;
  mouse.down = false;
  keys.clear();
  pauseRequestedAt = 0;
  pauseAcceptedAt = 0;
  stopMusic();
  saveTowerProgress("run ended");
  addLog("Run ended from pause menu. Progress saved.");
  renderMenu();
}

function renderMenu() {
  saveTowerProgress("main menu");
  mode = "menu";
  running = false;
  gameOver = false;
  towerCleared = false;
  activeStoryMode = false;
  villagePendingRouteFloor = 0;
  updateHud();
  startMusic("music_menu");

  openOverlay(`
    <div class="vsScreen mainMenuScreen">
      <div class="vsBackdrop">
        <div class="vsMoon"></div>
        <div class="vsScanlines"></div>
        <div class="vsShape vsShapeLeft"></div>
        <div class="vsShape vsShapeRight"></div>
        <div class="vsHeroCore"></div>
      </div>

      <div class="vsTopBar mainTopBar">
        <button class="vsSquareButton profileButton" data-action="openCollection"><img src="${ASSET_PATHS.images[shapeById(save.selectedShape).sprite]}" alt=""></button>
        <div class="vsPlayerName">veyr_runner</div>
        <div class="vsCurrency"><span class="coinStack"></span><b>${save.shards}</b></div>
        <button class="vsButton red small" data-action="quitApp">QUIT</button>
      </div>

      <div class="vsLogoBlock">
        <div class="vsLogoLine">VEYR</div>
        <div class="vsLogoLine">ARENA</div>
        <div class="vsSubtitle">THE ASCENT</div>
      </div>

      <div class="vsMainCluster storyMainCluster">
        <button class="vsButton green giant startButton" data-action="openHub">VILLAGE</button>
        <button class="vsButton blue giant" data-action="startTower">TOWER RUN</button>
        <button class="vsButton blue giant" data-action="openCollection">COLLECTION</button>
        <button class="vsButton blue giant" data-action="openPowerUps">POWER UP</button>
        <button class="vsButton blue giant" data-action="openUnlockList">UNLOCKS</button>
        <button class="vsButton blue giant optionsButton" data-action="openOptions">OPTIONS</button>
      </div>

    </div>
  `, "mainMenu");
}

function renderStorySelect() {
  mode = "storySelect";
  const cards = STORY_CHAPTERS.map(chapter => {
    const locked = (save.bestFloor || 0) < chapter.unlockAt;
    const done = (save.completedChapters || []).includes(chapter.id);
    const art = ASSET_PATHS.images[chapter.art];
    return `
      <button class="storyChapterCard contractCard ${locked ? "locked" : ""} ${done ? "completed" : ""}" data-action="${locked ? "noop" : "startStoryChapter"}" data-id="${chapter.id}" style="--accent:${chapter.accent}; --storyBg:url('${art}')">
        <span class="contractStatus">${done ? "CLEARED" : locked ? `REACH FLOOR ${chapter.unlockAt}` : "AVAILABLE"}</span>
        <small>CHAPTER ${chapter.contractNo} · ${chapter.subtitle}</small>
        <b>${chapter.name}</b>
        <p>${chapter.summary}</p>
        <div class="contractFacts">
          <div><em>Helper</em><strong>${chapter.handler}</strong></div>
          <div><em>Place</em><strong>${chapter.target}</strong></div>
          <div><em>Goal</em><strong>${chapter.objective}</strong></div>
          <div><em>Find</em><strong>${chapter.payout}</strong></div>
        </div>
      </button>
    `;
  }).join("");

  const archives = storyArchiveRows();

  openOverlay(`
    <div class="vsScreen framedScreen storySelectScreen campaignSelectScreen">
      ${renderTopStrip("Tower Chapters", "openHub")}
      <div class="vsPanel storyPanel campaignPanel">
        <h2>Tower Chapters</h2>
        <p class="campaignLead">Pick a climb from the village. Each clear floor brings back supplies. Each chapter moves you closer to Mira.</p>
        <div class="storyChapterGrid campaignChapterGrid">${cards}</div>
        <h3>Story Notes</h3>
        <div class="archiveGrid">${archives}</div>
      </div>
    </div>
  `, "storyMenu");
}

function storyArchiveRows() {
  const rows = [
    { req: 1, title: "Mira", text: "Mira protected the village before the tower took her." },
    { req: 2, title: "Supplies", text: "Campaign floors can bring back supplies for the village." },
    { req: 3, title: "Maren", text: "Maren can turn medicine and clean water into more health." },
    { req: 4, title: "Rowan", text: "Rowan can turn tools and steel into better weapon damage." },
    { req: 5, title: "Tavi", text: "Tavi can turn maps and radio parts into better pulse range." },
    { req: 6, title: "Map room", text: "The camera map can reveal Mira's cell." },
    { req: 7, title: "Top room", text: "Mira's cell is near the top behind blue doors." },
    { req: 8, title: "Final door", text: "One last guard stands near Mira's door." }
  ];

  return rows.map(row => {
    const locked = (save.bestFloor || 0) < row.req;
    return `
      <div class="archiveCard ${locked ? "locked" : ""}">
        <b>${locked ? "LOCKED" : row.title}</b>
        <p>${locked ? `Reach floor ${row.req}.` : row.text}</p>
      </div>
    `;
  }).join("");
}

function startStoryChapter(id) {
  stopMusic();
  playAssetSfx("music_intro", 0.55, "music");
  showStoryBriefing(id, 0);
}

function showStoryBriefing(id, index = 0) {
  const chapter = storyChapterById(id);
  const slides = chapter.briefingSlides || [];
  const slide = slides[index] || { speaker: chapter.handler, title: chapter.name, text: chapter.summary };
  const art = ASSET_PATHS.images[chapter.art];
  const last = index >= slides.length - 1;
  currentStoryBriefing = { chapterId: chapter.id, index };
  mode = "storyBriefing";
  running = false;

  openOverlay(`
    <div class="vsScreen storySceneScreen campaignSceneScreen briefingScreen" style="--accent:${chapter.accent}; --storyBg:url('${art}')">
      <div class="storySceneBackdrop"></div>
      <div class="storyFreezeFrame campaignFreezeFrame briefingFrame">
        <div class="storySceneImage campaignSceneImage briefingImage">
          <div class="campaignChapterStamp">CHAPTER ${chapter.contractNo} · ${chapter.name}</div>
        </div>
        <div class="storyDialogueBox campaignDialogueBox briefingDialogueBox">
          <div class="storySpeaker">${slide.speaker}</div>
          <div class="storyFloorTag">${slide.title} · ${index + 1} / ${Math.max(1, slides.length)}</div>
          <div class="storyBodyText">${storyTextHtml(slide.text)}</div>
          <div class="briefingTerms"><span>${chapter.objective}</span><b>${chapter.payout}</b></div>
          <button class="vsButton green storyContinue" data-action="continueStoryBriefing">${last ? "START CHAPTER" : "NEXT"}</button>
        </div>
      </div>
    </div>
  `, "storySceneMenu");
}

function continueStoryBriefing() {
  if (!currentStoryBriefing) {
    renderStorySelect();
    return;
  }
  const chapter = storyChapterById(currentStoryBriefing.chapterId);
  const nextIndex = currentStoryBriefing.index + 1;
  if (nextIndex < (chapter.briefingSlides || []).length) {
    showStoryBriefing(chapter.id, nextIndex);
    return;
  }
  const chapterId = chapter.id;
  currentStoryBriefing = null;
  startTower({ story: true, chapterId });
}

function showStoryScene(floor, scene) {
  mode = "storyScene";
  running = false;
  pendingStoryFloor = floor;
  const { chapter, line } = scene;
  const art = ASSET_PATHS.images[chapter.art];
  const nextLabel = isBossFloor(floor) ? "FACE BOSS" : "ENTER FLOOR";
  const floorLabel = `${line.title || "Floor note"} · FLOOR ${floor} / ${activeStage?.name || chapter.name}`;

  openOverlay(`
    <div class="vsScreen storySceneScreen campaignSceneScreen" style="--accent:${chapter.accent}; --storyBg:url('${art}')">
      <div class="storySceneBackdrop"></div>
      <div class="storyFreezeFrame campaignFreezeFrame">
        <div class="storySceneImage campaignSceneImage">
          <div class="campaignChapterStamp">CHAPTER ${chapter.contractNo} · ${chapter.name}</div>
        </div>
        <div class="storyDialogueBox campaignDialogueBox">
          <div class="storySpeaker">${line.speaker}</div>
          <div class="storyFloorTag">${floorLabel}</div>
          <div class="storyBodyText">${storyTextHtml(line.text)}</div>
          <button class="vsButton green storyContinue" data-action="continueStoryScene">${nextLabel}</button>
        </div>
      </div>
    </div>
  `, "storySceneMenu");
}

function continueStoryScene() {
  const floor = pendingStoryFloor;
  pendingStoryFloor = 0;
  if (isBossFloor(floor) && bots[0]) showBossIntro(bots[0]);
  else beginRoundCountdown();
}


function renderTopStrip(title, backAction) {
  return `
    <div class="vsTopBar screenTopBar">
      <div class="vsPlayerName">veyr_runner</div>
      <div class="vsCurrency"><span class="coinStack"></span><b>${save.shards}</b></div>
      <button class="vsButton red small" data-action="${backAction}">BACK</button>
    </div>
  `;
}


let collectionBackAction = "backMenu";
let powerupBackAction = "backMenu";

function resolveShopBackAction(requestedAction, currentScreenMode, lastAction) {
  if (requestedAction) return requestedAction;
  return mode === currentScreenMode ? lastAction : "backMenu";
}

function renderCollection(backAction) {
  const resolvedBackAction = resolveShopBackAction(backAction, "collection", collectionBackAction);
  collectionBackAction = resolvedBackAction;
  mode = "collection";
  const operativeCards = SHAPES.map(item => renderShopCard(item, "shape")).join("");
  const operative = shapeById(save.selectedShape);
  const tint = colorById(save.selectedColor);
  const sprite = ASSET_PATHS.images[operative.sprite] || "";
  const hub = ensureHubSave();
  const memories = Object.keys(hub.collection?.memories || {}).length;
  const visitors = Object.keys(hub.collection?.visitors || {}).length;

  openOverlay(`
    <div class="vsScreen framedScreen collectionScreen">
      ${renderTopStrip("Collection", resolvedBackAction)}
      <div class="vsPanel collectionPanel">
        <h2>Operatives</h2>
        <div class="shopGrid operativeGrid">${operativeCards}</div>
        <h2>Village Record</h2>
        <div class="villageRecordGrid">
          <div><b>${hub.collection?.fish || 0}</b><span>best fish held</span></div>
          <div><b>${hub.collection?.ore || 0}</b><span>best ore held</span></div>
          <div><b>${hub.collection?.crops || 0}</b><span>best crops held</span></div>
          <div><b>${memories}</b><span>trust memories</span></div>
          <div><b>${visitors}</b><span>visitors met</span></div>
        </div>
        <h2>Achievements</h2>
        <div class="villageRecordGrid achievementRecordGrid">
          <div><b>${Object.keys(save.achievements || {}).length}</b><span>earned</span></div>
          <div><b>${save.totalClears || 0}</b><span>floors cleared</span></div>
          <div><b>${save.bestFloor || 0}</b><span>best floor</span></div>
          <div><b>${hubHope()}</b><span>hope held</span></div>
          <div><b>${hub.retries || 0}</b><span>retry tokens</span></div>
        </div>
        <div class="vsDetailBar collectionDetailBar">
          <div class="selectedSpriteBox">${sprite ? `<img src="${sprite}" alt="">` : ""}</div>
          <div><b>${operative.name}</b><small>Trace tint removed from this page until it has a real gameplay purpose.</small></div>
          <button class="vsButton green" data-action="${resolvedBackAction}">CONFIRM</button>
        </div>
      </div>
    </div>
  `, "collectionMenu");
}

function renderUnlocks() {
  renderCollection();
}

function renderPowerUps(backAction) {
  const resolvedBackAction = resolveShopBackAction(backAction, "powerups", powerupBackAction);
  powerupBackAction = resolvedBackAction;
  mode = "powerups";
  const cards = POWERUPS.map(renderPowerCard).join("");
  openOverlay(`
    <div class="vsScreen framedScreen powerScreen">
      ${renderTopStrip("Power Up", resolvedBackAction)}
      <div class="vsPanel powerPanel">
        <h2>Power Up</h2>
        <button class="vsButton blue refundButton" data-action="refundPowerups">Refund PowerUps</button>
        <div class="powerGrid">${cards}</div>
      </div>
    </div>
  `, "powerMenu");
}

function renderUnlockList() {
  mode = "unlockList";
  const baseRows = unlockRows();
  const achievementRows = achievementUnlockRows();
  const rows = [...baseRows, ...achievementRows];
  const completed = rows.filter(row => row.done).length;
  const percent = Math.round((completed / Math.max(1, rows.length)) * 100);
  const groups = [
    { title: "Tower Access", rows: baseRows.slice(0, 12) },
    { title: "Story Notes", rows: baseRows.slice(12, 19) },
    { title: "Floor Progress", rows: baseRows.slice(19, 25) },
    { title: "Power Ranks", rows: baseRows.slice(25) },
    { title: "Achievements", rows: achievementRows }
  ];
  const html = groups.map(group => `
    <section class="unlockGroup">
      <div class="unlockGroupTitle"><b>${group.title}</b><span>${group.rows.filter(row => row.done).length} / ${group.rows.length}</span></div>
      <div class="unlockGroupRows">
        ${group.rows.map(row => `
          <div class="unlockRow ${row.done ? "done" : ""}">
            <span class="unlockCheck">${row.done ? "✓" : ""}</span>
            <div class="unlockCopy"><b>${row.text}</b><small>${row.done ? "Requirement cleared" : "Requirement open"}</small></div>
            <em class="unlockReward">${row.reward}</em>
          </div>
        `).join("")}
      </div>
    </section>
  `).join("");

  openOverlay(`
    <div class="vsScreen framedScreen unlockScreen">
      ${renderTopStrip("Unlocks", "backMenu")}
      <div class="vsPanel unlockPanel">
        <h2>Unlock Board</h2>
        <div class="unlockSummary">
          <div><b>${completed}</b><span>cleared</span></div>
          <div><b>${rows.length - completed}</b><span>open</span></div>
          <div><b>${percent}%</b><span>complete</span></div>
        </div>
        <div class="unlockProgress"><i style="width:${percent}%"></i></div>
        <div class="unlockList unlockBoard">${html}</div>
      </div>
    </div>
  `, "unlockMenu");
}


let optionsBackAction = "backMenu";
let optionsLivePauseMode = "options";

function renderOptions(backAction = "backMenu", livePauseMode = "options") {
  optionsBackAction = backAction || "backMenu";
  optionsLivePauseMode = livePauseMode || "options";
  mode = optionsLivePauseMode;
  const slider = (key, label) => {
    const value = Math.round((save.settings?.[key] ?? DEFAULT_SAVE.settings[key]) * 100);
    return `
      <label class="volumeRow">
        <span>${label}</span>
        <input type="range" min="0" max="100" value="${value}" data-volume="${key}">
        <b data-volume-value="${key}">${value}%</b>
      </label>
    `;
  };

  openOverlay(`
    <div class="vsScreen framedScreen optionsScreen">
      ${renderTopStrip("Settings", optionsBackAction)}
      <div class="vsPanel optionsPanel">
        <h2>Audio</h2>
        <div class="volumeGrid">
          ${slider("master", "Master")}
          ${slider("sfx", "Combat / UI")}
          ${slider("footsteps", "Footsteps")}
          ${slider("voice", "Voice")}
          ${slider("music", "Music")}
        </div>
        <div class="toggleRow">
          <span>Mute when unfocused</span>
          <button class="vsButton ${muteWhenUnfocusedEnabled() ? "green" : "blue"}" data-action="toggleMuteUnfocused">${muteWhenUnfocusedEnabled() ? "ON" : "OFF"}</button>
        </div>
        <h2>Tools</h2>
        <div class="optionsActions">
          <button class="vsButton blue" data-action="toggleDebugMenu">Debug: ${showDebug ? "ON" : "OFF"}</button>
          <button class="vsButton red" data-action="resetSave">Reset Save</button>
        </div>
      </div>
    </div>
  `, "optionsMenu");
}

function achievementUnlockRows() {
  checkVillageAchievements("board");
  const earned = save.achievements || {};
  const hub = ensureHubSave();
  const data = [
    ["first_floor", "First Floor Down", "Clear any arena floor."],
    ["five_floors", "One More Run", "Clear 5 total floors."],
    ["floor_four", "Halfway Hungry", "Reach floor 4."],
    ["hope_5", "People Are Watching", "Hold 5 hope at once."],
    ["first_board", "Pinned And Done", "Finish any daily board job."],
    ["board_5", "Clipboard Goblin", "Finish 5 board jobs."],
    ["first_hairball", "Not My Job", "Clean up a hairball."],
    ["bought_retry", "Pocket Miracle", "Store a boss retry token."],
    ["home_rank_1", "Mine, Not The Tower's", "Build your first house."],
    ["home_rank_3", "Indoor Person", "Reach house rank 3."],
    ["used_chest", "It Stacks", "Move an item through the chest."],
    ["builder_3", "Actual Contractor", "Upgrade town projects 3 times."],
    ["cleanup_5", "Less Embarrassing", "Clear 5 rubble piles."],
    ["wood_3", "Stump Goblin", "Chop 3 stumps."],
    ["visitors_3", "Road Gets Busy", "Meet 3 visitor types."],
    ["first_long_blocker", "That Was In The Way", "Remove a milestone locked blocker."],
    ["first_old_growth", "Old Growth, New Road", "Chop a giant gated stump."],
    ["town_unblocked", "No Excuses Left", "Remove 24 town blockers."]
  ];
  return data.map(([id, reward, text]) => ({ done: Boolean(earned[id]), text, reward }));
}

function unlockRows() {
  const powerCount = Object.values(save.powerups || {}).reduce((sum, rank) => sum + rank, 0);
  const completed = save.completedChapters || [];
  return [
    { done: save.bestFloor >= 1, text: "Clear floor 1.", reward: "+ shards" },
    { done: save.bestFloor >= 2, text: "Reach floor 2.", reward: "Vanguard suit" },
    { done: save.bestFloor >= 3, text: "Reach floor 3.", reward: "Outrider suit" },
    { done: save.bestFloor >= 4, text: "Reach floor 4.", reward: "Phantom suit" },
    { done: save.bestFloor >= 5, text: "Reach floor 5.", reward: "Field Medic suit" },
    { done: save.bestFloor >= 6, text: "Reach floor 6.", reward: "Breaker suit" },
    { done: save.bestFloor >= 7, text: "Reach floor 7.", reward: "Night Glass suit" },
    { done: save.bestFloor >= 8, text: "Clear the tower.", reward: "Null Frame suit" },
    { done: save.bestFloor >= 3, text: "Reach floor 3.", reward: "Green Hopper suit" },
    { done: save.bestFloor >= 4, text: "Reach floor 4.", reward: "Pink Lantern suit" },
    { done: save.bestFloor >= 5, text: "Reach floor 5.", reward: "Purple Jumper suit" },
    { done: save.bestFloor >= 5, text: "Open Broadcast Layer.", reward: "Bloodline trace" },
    { done: save.bestFloor >= 6, text: "Open Cold Floor.", reward: "Whiteout trace" },
    { done: save.bestFloor >= 7, text: "Open Core route.", reward: "Toxin trace" },
    { done: save.bestFloor >= 8, text: "Finish an eight floor run.", reward: "Gold trace" },
    { done: (save.storyClears || 0) >= 1, text: "Clear any campaign chapter.", reward: "Mira note" },
    { done: completed.includes("ledger"), text: "Clear The First Door.", reward: "First clue" },
    { done: completed.includes("iron"), text: "Clear The Guard Floor.", reward: "Stair key" },
    { done: completed.includes("whiteout"), text: "Clear The Snow Yard.", reward: "Torn scarf" },
    { done: completed.includes("deadwing"), text: "Clear The Broken Wing.", reward: "Old key" },
    { done: completed.includes("broadcast"), text: "Clear The Camera Floor.", reward: "Cell number" },
    { done: completed.includes("core"), text: "Clear The Top Room.", reward: "Rescue" },
    { done: save.totalClears >= 5, text: "Clear 5 floors total.", reward: "Steady pay" },
    { done: save.totalClears >= 15, text: "Clear 15 floors total.", reward: "Floor habit" },
    { done: save.totalClears >= 35, text: "Clear 35 floors total.", reward: "Arena regular" },
    { done: (save.totalWeaponFinds || 0) >= 2, text: "Extract 2 cache weapons.", reward: "Armory habit" },
    { done: (save.totalWeaponFinds || 0) >= 6, text: "Extract 6 cache weapons.", reward: "Weapon chaser" },
    { done: (save.totalWeaponFinds || 0) >= 12, text: "Extract 12 cache weapons.", reward: "Cache specialist" },
    { done: powerCount >= 1, text: "Buy any PowerUp.", reward: "First rank" },
    { done: powerCount >= 10, text: "Buy 10 PowerUp ranks.", reward: "Prepared" },
    { done: powerCount >= 25, text: "Buy 25 PowerUp ranks.", reward: "Loaded" },
    { done: powerCount >= 50, text: "Buy 50 PowerUp ranks.", reward: "Overbuilt" }
  ];
}

function renderShopCard(item, type) {
  const unlockedList = type === "shape" ? save.unlockedShapes : save.unlockedColors;
  const selected = type === "shape" ? save.selectedShape === item.id : save.selectedColor === item.id;
  const unlocked = unlockedList.includes(item.id);
  const canBuy = save.bestFloor >= item.req && save.shards >= item.cost;
  const lockedByFloor = save.bestFloor < item.req;

  let button = "";
  let status = "LOCKED";
  if (selected) {
    status = "EQUIPPED";
    button = `<button class="vsButton gray" disabled>Equipped</button>`;
  } else if (unlocked) {
    status = "OWNED";
    button = `<button class="vsButton green" data-action="equip" data-type="${type}" data-id="${item.id}">Equip</button>`;
  } else if (lockedByFloor) {
    button = `<button class="vsButton gray" disabled>Reach floor ${item.req}</button>`;
  } else {
    status = canBuy ? "AVAILABLE" : "NEED SHARDS";
    button = `<button class="vsButton blue" data-action="buy" data-type="${type}" data-id="${item.id}" ${canBuy ? "" : "disabled"}>Buy ${item.cost}</button>`;
  }

  const preview = type === "color"
    ? `<span class="swatch bigSwatch" style="background:${item.value}"></span>`
    : `<span class="operativePreview">${item.sprite ? `<img src="${ASSET_PATHS.images[item.sprite]}" alt="">` : ""}</span>`;

  return `
    <div class="shopCard ${selected ? "selectedCard" : ""} ${unlocked ? "ownedCard" : ""}">
      <div class="shopCardTop">${preview}<span class="shopStatus">${status}</span></div>
      <div class="shopTitle"><b>${item.name}</b></div>
      <div class="shopTags"><span>Cost ${item.cost}</span><span>Floor ${item.req}</span></div>
      ${button}
    </div>
  `;
}


function renderPowerCard(item) {
  const rank = powerRank(item.id);
  const maxed = rank >= item.max;
  const cost = powerupCost(item);
  const canBuy = !maxed && save.shards >= cost;
  const pips = Array.from({ length: item.max }, (_, i) => `<span class="pip ${i < rank ? "filled" : ""}"></span>`).join("");

  return `
    <button class="powerCard" data-action="buyPowerup" data-id="${item.id}" ${canBuy ? "" : "disabled"}>
      <span class="powerName">${item.name}</span>
      <span class="powerIcon">${item.icon}</span>
      <span class="pipRow">${pips}</span>
      <span class="powerCost">${maxed ? "MAX" : `${cost} shards`}</span>
      <span class="powerDesc">${item.desc}</span>
    </button>
  `;
}

function powerRank(id) {
  return save.powerups?.[id] || 0;
}

function powerupById(id) {
  return POWERUPS.find(item => item.id === id);
}

function powerupCost(item) {
  return Math.ceil(item.cost * (1 + powerRank(item.id) * 0.75));
}

function buyPowerup(id) {
  const item = powerupById(id);
  if (!item) return;
  const rank = powerRank(id);
  if (rank >= item.max) return;
  const cost = powerupCost(item);
  if (save.shards < cost) return;

  save.shards -= cost;
  save.powerups[id] = rank + 1;
  saveGame();
  renderPowerUps();
}

function refundPowerups() {
  let refunded = 0;
  for (const item of POWERUPS) {
    const rank = powerRank(item.id);
    for (let i = 0; i < rank; i++) {
      refunded += Math.ceil(item.cost * (1 + i * 0.75));
    }
    save.powerups[item.id] = 0;
  }
  save.shards += refunded;
  saveGame();
  renderPowerUps();
}

function buyUnlock(type, id) {
  const catalog = type === "shape" ? SHAPES : COLORS;
  const listName = type === "shape" ? "unlockedShapes" : "unlockedColors";
  const selectedName = type === "shape" ? "selectedShape" : "selectedColor";
  const item = catalog.find(x => x.id === id);
  if (!item) return;
  if (save[listName].includes(id)) {
    save[selectedName] = id;
    saveGame();
    renderUnlocks();
    return;
  }
  if (save.bestFloor < item.req || save.shards < item.cost) return;

  save.shards -= item.cost;
  save[listName].push(id);
  save[selectedName] = id;
  saveGame();
  renderUnlocks();
}

function equipUnlock(type, id) {
  if (type === "shape" && save.unlockedShapes.includes(id)) save.selectedShape = id;
  if (type === "color" && save.unlockedColors.includes(id)) save.selectedColor = id;
  saveGame();
  renderUnlocks();
}

function shapeById(id) {
  return SHAPES.find(x => x.id === id) || SHAPES[0];
}

function colorById(id) {
  return COLORS.find(x => x.id === id) || COLORS[0];
}


function currentWeapon() {
  return WEAPON_BY_ID[player.weaponId] || WEAPONS[0];
}

function playerMaxAmmo() {
  return currentWeapon().ammo + runStats.ammoBonus;
}

function setWeapon(id) {
  if (!WEAPON_BY_ID[id] || mode !== "running") return;
  if (runStats?.weapons && !runStats.weapons.includes(id)) {
    addLog(`${WEAPON_BY_ID[id].name} not found this run yet.`);
    return;
  }
  if (player.weaponId === id) return;

  player.weaponId = id;
  player.maxAmmo = playerMaxAmmo();
  player.ammo = player.maxAmmo;
  player.weaponHeat = 0;
  player.recoil = 0;
  player.reload = 0;
  player.shotCd = 0.12;
  player.weaponHeat = 0;
  playAssetSfx("fps_weapon_change", 0.34);
  addLog(`Weapon switched: ${currentWeapon().name}.`);
  updateHud();
}

function addScreenFlash(amount = 0.05) {
  screenFlash = Math.max(screenFlash, amount);
}

function addShake(amount = 1) {
  cameraShake = Math.max(cameraShake, amount);
}

function addHitStop(seconds) {
  hitStop = Math.max(hitStop, seconds);
}

function ensureAudio() {
  if (audioCtx) return audioCtx;
  const AudioClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioClass) return null;
  audioCtx = new AudioClass();
  return audioCtx;
}

function resumeAudio() {
  const ac = ensureAudio();
  if (ac && ac.state === "suspended") {
    ac.resume().catch(() => {});
  }
  return ac;
}

function playTone(freq, duration, type = "square", gain = 0.035, slide = 0) {
  const ac = ensureAudio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ac.currentTime + duration);
  g.gain.setValueAtTime(gain * volumeFor("sfx"), ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);
}

function playGunCrack(intensity = 1, variant = "") {
  const ac = ensureAudio();
  if (!ac) return;

  const duration = variant.includes("shotgun") || variant.includes("breacher") ? 0.16 : variant.includes("dmr") || variant.includes("revolver") ? 0.12 : 0.07;
  const bufferSize = Math.max(1, Math.floor(ac.sampleRate * duration));
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const snap = Math.pow(1 - t, variant.includes("smg") || variant.includes("lmg") ? 9 : 5);
    const tail = Math.pow(1 - t, 2.4) * 0.45;
    data[i] = (Math.random() * 2 - 1) * (snap + tail) * 0.42;
  }

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const highpass = ac.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = variant.includes("shotgun") || variant.includes("breacher") ? 240 : 520;

  const lowpass = ac.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = variant.includes("needler") ? 1800 : variant.includes("smg") || variant.includes("lmg") ? 2600 : 4200;

  const gain = ac.createGain();
  gain.gain.setValueAtTime((0.018 + Math.min(0.055, intensity * 0.012)) * volumeFor("sfx"), ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);

  src.connect(highpass).connect(lowpass).connect(gain).connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + duration);

  const thump = ac.createOscillator();
  const thumpGain = ac.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(variant.includes("shotgun") || variant.includes("breacher") ? 74 : 120, ac.currentTime);
  thump.frequency.exponentialRampToValueAtTime(42, ac.currentTime + 0.06);
  thumpGain.gain.setValueAtTime((0.018 + Math.min(0.035, intensity * 0.006)) * volumeFor("sfx"), ac.currentTime);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.08);
  thump.connect(thumpGain).connect(ac.destination);
  thump.start();
  thump.stop(ac.currentTime + 0.09);
}

function playFootstepTransient(material = "concrete", sneaking = false, scale = 1) {
  const ac = resumeAudio();
  if (!ac) return;

  const materialTone = {
    concrete: { hp: 900, lp: 4200, thump: 96, dur: 0.055 },
    wood: { hp: 520, lp: 2600, thump: 135, dur: 0.07 },
    snow: { hp: 260, lp: 1700, thump: 72, dur: 0.12 },
    nature: { hp: 360, lp: 2100, thump: 86, dur: 0.095 },
    gravel: { hp: 700, lp: 5200, thump: 110, dur: 0.085 },
    laminate: { hp: 650, lp: 3200, thump: 118, dur: 0.065 }
  }[material] || { hp: 700, lp: 3600, thump: 105, dur: 0.06 };

  const duration = materialTone.dur * (sneaking ? 0.85 : 1);
  const bufferSize = Math.max(1, Math.floor(ac.sampleRate * duration));
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const attack = Math.min(1, t / 0.08);
    const decay = Math.pow(1 - t, material === "snow" || material === "nature" ? 1.2 : 2.6);
    const grit = material === "gravel" || material === "snow" ? 1.25 : material === "wood" ? 0.75 : 1;
    data[i] = (Math.random() * 2 - 1) * attack * decay * grit;
  }

  const src = ac.createBufferSource();
  src.buffer = buffer;

  const highpass = ac.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = materialTone.hp;

  const lowpass = ac.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = materialTone.lp;

  const gain = ac.createGain();
  const volume = (sneaking ? 0.035 : 0.105) * scale * volumeFor("footsteps");
  gain.gain.setValueAtTime(volume, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);

  src.connect(highpass).connect(lowpass).connect(gain).connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + duration);

  const thump = ac.createOscillator();
  const thumpGain = ac.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(materialTone.thump, ac.currentTime);
  thump.frequency.exponentialRampToValueAtTime(Math.max(40, materialTone.thump * 0.55), ac.currentTime + duration);
  thumpGain.gain.setValueAtTime((sneaking ? 0.012 : 0.035) * scale * volumeFor("footsteps"), ac.currentTime);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  thump.connect(thumpGain).connect(ac.destination);
  thump.start();
  thump.stop(ac.currentTime + duration);
}

function playFootstepSound(material, sneaking = false, scale = 1, forcePlatformer = false) {
  const keys = footstepKeysForMaterial(material);
  footstepVariantCursor = (footstepVariantCursor + 1) % keys.length;
  const key = forcePlatformer
    ? "footstep_platformer"
    : keys[(footstepVariantCursor + Math.floor(rand(0, keys.length))) % keys.length];

  const assetVolume = (sneaking ? 0.28 : 0.82) * scale;
  const playedAsset = playAssetSfx(key, assetVolume, "footsteps");

  if (!playedAsset || scale > 0.22) {
    playFootstepTransient(material, sneaking, scale);
  }
}

function playSfx(kind, intensity = 1, variant = "") {
  if (kind === "shot") {
    const layer = variant.includes("smg") || variant.includes("lmg") || variant.includes("needler") ? "fps_repeater" : "fps_blaster";
    playAssetSfx(layer, 0.18 + Math.min(0.18, intensity * 0.04));
    const played = playAssetSfx(variant || "shot_light", 0.28 + Math.min(0.24, intensity * 0.05));
    playGunCrack(intensity, variant);
    if (played) return;
    playTone(140 + intensity * 55, 0.045, "sawtooth", 0.032, -70);
  }
  if (kind === "hit") {
    if (playAssetSfx("fps_enemy_hurt", 0.36) || playAssetSfx("impact", 0.18)) return;
    playTone(280 + intensity * 40, 0.035, "square", 0.028, -120);
  }
  if (kind === "wall") {
    if (playAssetSfx("wall", 0.25)) return;
    playTone(95, 0.025, "triangle", 0.018, -25);
  }
  if (kind === "explosion") {
    if (playAssetSfx("fps_enemy_destroy", 0.42) || playAssetSfx("explosion", 0.55)) return;
    playTone(80, 0.16, "sawtooth", 0.05, -120);
  }
  if (kind === "reward") {
    if (playAssetSfx("level_up_chime", 0.5)) {
      setTimeout(() => playAssetSfx("bonus_chime", 0.38), 120);
      setTimeout(() => playAssetSfx("platformer_coin", 0.28), 230);
      return;
    }
    playTone(420, 0.08, "square", 0.03, 160);
    setTimeout(() => playTone(620, 0.08, "square", 0.03, 220), 90);
    setTimeout(() => playTone(880, 0.11, "square", 0.035, 180), 180);
  }
  if (kind === "count") {
    if (lastCountdownCue === "3") playAssetSfx("voice_ready", 0.45);
    if (playAssetSfx("count", 0.42)) return;
    playTone(520, 0.05, "square", 0.026, -80);
  }
  if (kind === "fight") {
    playAssetSfx("voice_fight", 0.52);
    if (playAssetSfx("fight", 0.48)) return;
    playTone(180, 0.12, "sawtooth", 0.04, -90);
  }
  if (kind === "smoke") {
    if (playAssetSfx("smoke", 0.36)) return;
    playTone(70, 0.12, "triangle", 0.025, 20);
  }
}

function pointFromAngle(origin, angle, distance) {
  return {
    x: origin.x + Math.cos(angle) * distance,
    y: origin.y + Math.sin(angle) * distance
  };
}

function playerBarrelPoint(angle = player.angle) {
  return pointFromAngle(player, angle, player.r + 11 + player.recoil * 0.18);
}

function aimAssistAngle(baseAngle, weapon) {
  const strength = weapon.aimAssist || 0;
  if (strength <= 0 || mode !== "running") return baseAngle;

  let best = null;
  let bestScore = Infinity;
  const maxDiff = weapon.id === "shotgun" ? 0.09 : weapon.id === "smg" || weapon.id === "lmg" ? 0.055 : 0.075;
  const maxRange = weapon.id === "shotgun" ? 390 : 720;

  for (const bot of bots) {
    if (!bot.alive || !botVisibleToPlayer(bot)) continue;
    const d = dist(player, bot);
    if (d > maxRange || !hasVisualLineOfSight(player, bot)) continue;

    const targetAngle = angleTo(player, bot);
    const diff = normAngle(targetAngle - baseAngle);
    const abs = Math.abs(diff);
    if (abs > maxDiff) continue;

    const score = abs * 1000 + d * 0.002;
    if (score < bestScore) {
      bestScore = score;
      best = { diff, d };
    }
  }

  if (!best) return baseAngle;
  const distanceFalloff = clamp(1 - best.d / maxRange, 0.25, 1);
  return baseAngle + best.diff * strength * 0.45 * distanceFalloff;
}

function playerDodgeRadius() {
  const moving = player.moveIntent > 0;
  const sneaking = keys.has("shift");
  const base = player.r * 0.58;
  if (player.dashInvuln > 0) return player.r * 0.28;
  if (sneaking) return base * 0.92;
  return moving ? base : player.r * 0.72;
}

function bossAbilityActive(id = "") {
  const ability = runStats?.bossAbility;
  if (!ability || ability.pending) return false;
  return !id || ability.id === id;
}

function bossAbilityDashMult() {
  if (bossAbilityActive("vanta_smoke_step") || bossAbilityActive("null_flicker") || bossAbilityActive("mirror_step")) return 0.68;
  return 1;
}

function grantBossAbility(id, name) {
  if (!runStats) return;
  runStats.bossAbility = {
    id,
    name,
    pending: true,
    activeFloor: 0,
    hitsLeft: 3,
    hitsMax: 3
  };
  addLog(`${name} ready for the next floor.`);
}

function expireBossAbility(text = "Boss ability faded.") {
  if (!runStats?.bossAbility) return;
  addLog(text);
  runStats.bossAbility = null;
}

function activatePendingBossAbilityForFloor(floor) {
  const ability = runStats?.bossAbility;
  if (!ability) return;
  if (ability.pending) {
    ability.pending = false;
    ability.activeFloor = floor;
    ability.hitsLeft = ability.hitsMax || 3;
    addLog(`${ability.name} active this floor.`);
    return;
  }
  if (ability.activeFloor && ability.activeFloor !== floor) {
    expireBossAbility(`${ability.name} faded.`);
  }
}

function bossAbilityRewardForFloor(floor) {
  const profile = bossProfileForFloor(floor);
  const kit = profile?.bossKit || "mirror";
  return BOSS_ABILITY_REWARDS[kit] || BOSS_ABILITY_REWARDS.mirror;
}

function chipBossAbilityFromHit() {
  const ability = runStats?.bossAbility;
  if (!ability || ability.pending) return;
  ability.hitsLeft -= 1;
  if (ability.hitsLeft <= 0) {
    expireBossAbility(`${ability.name} broke after taking too many hits.`);
  }
}

function dashCooldownTime() {
  return 1.05 * (runStats?.dashCdMult || 1) * bossAbilityDashMult();
}

function playerDashSpeed() {
  return bossAbilityActive("null_flicker") ? 650 : 530;
}

function maybeNearMiss(point, shooterName) {
  if (player.nearMissCd > 0) return;
  player.nearMissCd = 0.22;
  addScreenFlash(0.018);
  addShake(0.45);
  floatText.push({ x: player.x + rand(-18, 18), y: player.y - 28, text: "near miss", t: 0.38 });
}

function suppressBotsAlongLine(a, b, weapon, ignored = null) {
  const amount = weapon.suppression || 0;
  if (amount <= 0) return;

  for (const bot of bots) {
    if (!bot.alive || bot === ignored) continue;
    const p = closestPointOnLine(bot, a, b);
    const along = dist(a, p);
    if (along > dist(a, b)) continue;
    const d = Math.hypot(bot.x - p.x, bot.y - p.y);
    if (d > 42 + amount * 20 || !hasLineOfSight(a, bot)) continue;

    bot.suppressed = Math.max(bot.suppressed, 0.45 + amount * 0.45);
    bot.panic = Math.max(bot.panic, 0.22 + amount * 0.28);
    bot.suspicion = Math.max(bot.suspicion, 34 + amount * 24);

    const cover = chooseCoverPoint(bot);
    if (cover && Math.random() < 0.55 + amount * 0.25) {
      bot.target = cover;
      bot.state = "search";
      bot.maskDelay = Math.max(bot.maskDelay, rand(0.08, 0.22));
    }
  }
}

function wallNormalAt(point) {
  let best = null;
  let bestDistance = Infinity;

  for (const wall of walls) {
    const distances = [
      { d: Math.abs(point.x - wall.x), nx: -1, ny: 0 },
      { d: Math.abs(point.x - (wall.x + wall.w)), nx: 1, ny: 0 },
      { d: Math.abs(point.y - wall.y), nx: 0, ny: -1 },
      { d: Math.abs(point.y - (wall.y + wall.h)), nx: 0, ny: 1 }
    ];

    const nearWall =
      point.x >= wall.x - 8 && point.x <= wall.x + wall.w + 8 &&
      point.y >= wall.y - 8 && point.y <= wall.y + wall.h + 8;

    if (!nearWall) continue;

    for (const item of distances) {
      if (item.d < bestDistance) {
        bestDistance = item.d;
        best = item;
      }
    }
  }

  return best;
}

function tryRicochet(origin, hitPoint, incomingAngle, weapon) {
  if (!weapon.ricochet) return false;

  const normal = wallNormalAt(hitPoint);
  if (!normal) return false;

  const vx = Math.cos(incomingAngle);
  const vy = Math.sin(incomingAngle);
  const dot = vx * normal.nx + vy * normal.ny;
  const rx = vx - 2 * dot * normal.nx;
  const ry = vy - 2 * dot * normal.ny;
  const reflected = Math.atan2(ry, rx);
  const start = { x: hitPoint.x + Math.cos(reflected) * 8, y: hitPoint.y + Math.sin(reflected) * 8 };
  const end = rayBlocked(start, reflected + rand(-0.025, 0.025), 460);

  let hitTarget = null;
  let hitDist = Infinity;
  for (const bot of bots) {
    if (!bot.alive) continue;
    const along = lineCircleHit(bot, start, end, 3);
    if (along !== null && along < hitDist && hasVisualLineOfSight(start, bot)) {
      hitTarget = bot;
      hitDist = along;
    }
  }

  const finalPoint = hitTarget ? closestPointOnLine(hitTarget, start, end) : end;
  bullets.push({
    x1: start.x,
    y1: start.y,
    x2: finalPoint.x,
    y2: finalPoint.y,
    t: weapon.tracerTime * 0.8,
    maxT: weapon.tracerTime * 0.8,
    owner: "player",
    color: weapon.color,
    width: 1.35
  });

  addParticles("spark", hitPoint.x, hitPoint.y, reflected, 9);
  playAssetSfx("impact", 0.08);

  if (hitTarget) {
    damageBot(hitTarget, rand(weapon.damage[0], weapon.damage[1]) * 0.55 * runStats.damageMult, reflected, weapon, finalPoint);
    return true;
  }

  return false;
}

function tryPierceBot(firstTarget, hitPoint, angle, weapon) {
  if (!weapon.pierce) return false;

  const start = { x: hitPoint.x + Math.cos(angle) * 12, y: hitPoint.y + Math.sin(angle) * 12 };
  const end = rayBlocked(start, angle, 520);

  let hitTarget = null;
  let hitDist = Infinity;
  for (const bot of bots) {
    if (!bot.alive || bot === firstTarget) continue;
    const along = lineCircleHit(bot, start, end, 2);
    if (along !== null && along < hitDist && hasVisualLineOfSight(start, bot)) {
      hitTarget = bot;
      hitDist = along;
    }
  }

  const finalPoint = hitTarget ? closestPointOnLine(hitTarget, start, end) : end;
  bullets.push({
    x1: start.x,
    y1: start.y,
    x2: finalPoint.x,
    y2: finalPoint.y,
    t: weapon.tracerTime * 0.72,
    maxT: weapon.tracerTime * 0.72,
    owner: "player",
    color: weapon.color,
    width: 1.2
  });

  if (hitTarget) {
    damageBot(hitTarget, rand(weapon.damage[0], weapon.damage[1]) * 0.45 * runStats.damageMult, angle, weapon, finalPoint);
    return true;
  }

  return false;
}

function addMuzzleFlash(x, y, angle, weapon) {
  muzzleFlashes.push({
    x,
    y,
    angle,
    t: 0.055,
    maxT: 0.055,
    size: 11 + weapon.recoil * 1.2,
    color: weapon.color
  });
}

function addShellCasing(angle, weapon) {
  const side = angle + Math.PI * 0.55 + rand(-0.28, 0.28);
  const speed = weapon.casingSpeed * rand(0.7, 1.25);
  const p = pointFromAngle(player, angle - Math.PI * 0.5, 4);

  shellCasings.push({
    x: p.x,
    y: p.y,
    vx: Math.cos(side) * speed,
    vy: Math.sin(side) * speed,
    rot: rand(0, Math.PI * 2),
    spin: rand(-10, 10),
    t: 2.5,
    maxT: 2.5
  });

  if (shellCasings.length > 90) shellCasings.shift();
}

function addParticles(kind, x, y, angle, count = 5) {
  const configs = {
    spark: { color: "#ffd166", speed: [70, 210], life: [0.14, 0.34], size: [1, 3] },
    dust: { color: "#aab2c9", speed: [24, 90], life: [0.28, 0.65], size: [2, 5] },
    blood: { color: "#b8122f", speed: [25, 120], life: [0.26, 0.7], size: [2, 5] },
    wood: { color: "#d2a15d", speed: [45, 150], life: [0.2, 0.5], size: [1, 4] },
    fire: { color: "#ff8a3d", speed: [80, 260], life: [0.18, 0.48], size: [2, 6] },
    reward: { color: "#ffd35a", speed: [70, 220], life: [0.28, 0.8], size: [2, 5] }
  };
  const cfg = configs[kind] || configs.spark;

  for (let i = 0; i < count; i++) {
    const spread = kind === "blood" ? 1.25 : 0.85;
    const a = angle + Math.PI + rand(-spread, spread);
    const speed = rand(cfg.speed[0], cfg.speed[1]);
    particles.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      t: rand(cfg.life[0], cfg.life[1]),
      maxT: cfg.life[1],
      size: rand(cfg.size[0], cfg.size[1]),
      color: cfg.color,
      kind
    });
  }

  if (particles.length > 220) particles.splice(0, particles.length - 220);
}

function addDecal(kind, x, y, angle, size = 8) {
  decals.push({
    kind,
    x,
    y,
    angle,
    size,
    t: kind === "blood" ? 28 : 18,
    maxT: kind === "blood" ? 28 : 18,
    ox: rand(-2, 2),
    oy: rand(-2, 2)
  });

  if (decals.length > 150) decals.shift();
}

function addImpact(kind, x, y, angle, weapon) {
  if (kind === "bot") {
    if (imageAsset("fx_hit")) {
      floatText.push({ x, y, text: "✦", t: 0.28, sprite: "fx_hit" });
    }
    addParticles("blood", x, y, angle, weapon.id === "shotgun" ? 10 : 5);
    addParticles("spark", x, y, angle, 2);
    addDecal("blood", x + rand(-4, 4), y + rand(-4, 4), angle, weapon.id === "shotgun" ? rand(10, 17) : rand(5, 10));
    addHitStop(weapon.hitStop);
    addShake(weapon.shake * 0.5);
    addScreenFlash(0.035);
    return;
  }

  if (kind === "breakable") {
    addParticles("wood", x, y, angle, 7);
    addParticles("dust", x, y, angle, 5);
    addDecal("chip", x, y, angle, rand(5, 9));
    addShake(weapon.shake * 0.28);
    return;
  }

  addParticles("spark", x, y, angle, 7);
  addParticles("dust", x, y, angle, 3);
  addDecal("bullet", x, y, angle, rand(3, 6));
  playSfx("wall");
}

function applyKnockback(entity, angle, amount) {
  if (!amount) return;
  moveEntity(entity, Math.cos(angle) * amount, Math.sin(angle) * amount);
}


function acquireWeapon(id) {
  const weapon = WEAPON_BY_ID[id];
  if (!weapon || !runStats) return;

  const alreadyHeld = runStats.weapons.includes(id);
  if (!alreadyHeld) {
    runStats.weapons.push(id);
    runStats.weaponFinds += 1;
    save.totalWeaponFinds = (save.totalWeaponFinds || 0) + 1;
    saveGame();
  }

  player.weaponId = id;
  player.maxAmmo = playerMaxAmmo();
  player.ammo = player.maxAmmo;
  player.reload = 0;
  player.shotCd = 0.14;
  player.weaponHeat = 0;
  player.recoil = 0;
  addLog(`${alreadyHeld ? "Refreshed" : "Acquired"}: ${weapon.name}.`);
}

function weaponRewardCard(weapon, index) {
  const statLine = `${weapon.ammo} mag · ${Math.round((weapon.damage[0] + weapon.damage[1]) / 2)} dmg · ${weapon.pellets > 1 ? `${weapon.pellets} pellets` : `${Math.round(1 / weapon.fireDelay)} rps`}`;
  const icon = weapon.asset ? `<img class="weaponRewardIcon" src="${ASSET_PATHS.images[weapon.asset]}" alt="">` : "";
  return `
    <button class="upgradeCard weaponRewardCard" data-action="chooseReward" data-index="${index}">
      <span>Weapon Cache</span>
      ${icon}
      <b>${weapon.name}</b>
      <p>${weapon.note}<br><em>${statLine}</em></p>
    </button>
  `;
}

function upgradeRewardCard(upgrade, index) {
  const cardClass = upgrade.bossAbility ? "upgradeCard bossAbilityRewardCard" : "upgradeCard";
  return `
    <button class="${cardClass}" data-action="chooseReward" data-index="${index}">
      <span>${upgrade.tag}</span>
      <b>${upgrade.name}</b>
      <p>${upgrade.desc}</p>
    </button>
  `;
}

function startTower(options = {}) {
  activeStoryMode = Boolean(options.story);
  activeStoryChapterId = options.chapterId || "ledger";
  activeRouteType = "standard";
  nextRouteType = "standard";
  lastRouteChoice = null;
  villagePendingRouteFloor = 0;

  runStats = {
    maxHpBonus: powerRank("maxHealth") * 10 + hubBonusMaxHp() + hubProjectMaxHpBonus(),
    ammoBonus: 0,
    pulseCdMult: Math.max(0.55, 1 - powerRank("cooldown") * 0.08),
    pulseRange: 420 + powerRank("area") * 30 + hubBonusPulseRange() + hubProjectPulseRangeBonus(),
    echoDuration: 2.6 + powerRank("traceMemory") * 0.35,
    reloadMult: Math.max(0.55, 1 - powerRank("reload") * 0.07),
    damageMult: (1 + powerRank("might") * 0.05) * hubBonusDamageMult(),
    moveMult: 1 + powerRank("speed") * 0.04,
    sneakNoiseMult: Math.max(0.55, 1 - powerRank("noiseDiscipline") * 0.07),
    suspicionBleed: 0,
    reflexBuffer: 0,
    threatRead: 0,
    smokeBonus: powerRank("smokeKit") + hubProjectSmokeBonus(),
    heatMult: 1,
    dashCdMult: 1,
    healMult: 1,
    villagePrepReverts: [],
    bossAbility: null,
    upgrades: [],
    weapons: ["pistol"],
    weaponFinds: 0,
    clearStreak: 0,
    retries: Number(ensureHubSave().retries) || 0
  };

  player.weaponId = "pistol";
  player.maxHp = 100 + powerRank("maxHealth") * 10;
  player.hp = player.maxHp;
  player.kills = 0;
  player.shots = 0;
  player.hits = 0;
  killReplay = null;
  logs.length = 0;
  applyVillagePrepToRunStats("run start");
  if (activeStoryMode) addLog(`${storyChapterById(activeStoryChapterId).name} ascent started.`);
  else addLog("Tower run started.");
  if (hubProjectRank("garden")) addLog(`Garden ready: +${hubProjectMaxHpBonus()} max HP.`);
  if (hubProjectRank("kitchen")) addLog(`Kitchen meal: +${hubProjectSmokeBonus()} smoke per floor.`);
  if (hubProjectRank("watchpost")) addLog(`Watch Post: +${hubProjectPulseRangeBonus()} Pulse range.`);
  startFloor(1);
}

function defaultRouteForFloor(floor) {
  if (BOSS_FLOORS.has(floor)) return "boss";
  if (floor === 1) return "cache";
  return "standard";
}

function stageForFloor(floor, routeType) {
  if (activeStoryMode) {
    const chapter = storyChapterById(activeStoryChapterId);
    const ids = chapter.stageIds || [];
    const picked = stageById(ids[(floor - 1) % Math.max(1, ids.length)]);
    if (picked) return picked;
  }
  if (routeType === "boss" || routeType === "rival") return STAGES[(floor + 2) % STAGES.length];
  if (routeType === "cache") return STAGES[(floor + 1) % STAGES.length];
  return STAGES[(floor - 1) % STAGES.length];
}

function botIntroName(bot) {
  if (!bot) return "unknown";
  const profile = bot.profile || {};
  const title = profile.title || profile.callSign || bot.role;
  return `${bot.name} // ${title}`;
}


function bossProfileForFloor(floor) {
  if (activeRouteType === "rival") return BOSS_PROFILES[(floor + 1) % BOSS_PROFILES.length];
  if (floor >= 8) return BOSS_PROFILES[3];
  if (floor >= 7) return BOSS_PROFILES[1];
  if (floor >= 5) return BOSS_PROFILES[2];
  return BOSS_PROFILES[0];
}

function expandStageForFloor(stage, floor, routeType) {
  const scale = clamp(1.35 + floor * 0.045 + (routeType === "boss" || routeType === "rival" ? 0.08 : 0), 1.42, 1.72);
  const scaled = {
    ...stage,
    baseId: stage.id,
    worldW: Math.round(W * scale),
    worldH: Math.round(H * scale),
    spawn: scalePoint(stage.spawn, scale),
    botSpawns: (stage.botSpawns || []).map(spawn => ({ ...spawn, ...scalePoint(spawn, scale) })),
    walls: (stage.walls || []).map(wall => scaleRect(wall, scale))
  };

  scaled.botSpawns = scaled.botSpawns.map((spawn, i) => ({
    ...spawn,
    x: clamp(spawn.x, 52, scaled.worldW - 52),
    y: clamp(spawn.y, 52, scaled.worldH - 52)
  }));
  scaled.spawn = {
    x: clamp(scaled.spawn.x, 52, scaled.worldW - 52),
    y: clamp(scaled.spawn.y, 52, scaled.worldH - 52)
  };

  addWorldRoomDetails(scaled, floor, routeType);
  return scaled;
}

function scalePoint(point, scale) {
  return {
    x: Math.round(point.x * scale),
    y: Math.round(point.y * scale)
  };
}

function scaleRect(rect, scale) {
  return {
    ...rect,
    x: Math.round(rect.x * scale),
    y: Math.round(rect.y * scale),
    w: Math.max(24, Math.round(rect.w * scale)),
    h: Math.max(24, Math.round(rect.h * scale))
  };
}

function worldRect(rect) {
  return {
    ...rect,
    x: Math.round(rect.x * (worldW / W)),
    y: Math.round(rect.y * (worldH / H)),
    w: Math.max(20, Math.round(rect.w * (worldW / W))),
    h: Math.max(20, Math.round(rect.h * (worldH / H)))
  };
}

function addWorldRoomDetails(stage, floor, routeType) {
  const w = stage.worldW;
  const h = stage.worldH;
  const theme = stage.id;

  const extra = [
    { x: w * 0.13, y: h * 0.22, w: w * 0.18, h: 30, cover: true, softGlow: true },
    { x: w * 0.68, y: h * 0.22, w: w * 0.18, h: 30, cover: true, softGlow: true },
    { x: w * 0.13, y: h * 0.72, w: w * 0.18, h: 30, cover: true, softGlow: true },
    { x: w * 0.68, y: h * 0.72, w: w * 0.18, h: 30, cover: true, softGlow: true },
    { x: w * 0.45, y: h * 0.22, w: 34, h: h * 0.17, cover: true, softGlow: true },
    { x: w * 0.52, y: h * 0.62, w: 34, h: h * 0.17, cover: true, softGlow: true }
  ];

  if (routeType === "cache") {
    extra.push({ x: w * 0.42, y: h * 0.47, w: w * 0.16, h: 28, cover: true, softGlow: true });
  }

  if (theme === "forest_wire" || theme === "whiteout") {
    extra.push({ x: w * 0.32, y: h * 0.41, w: 32, h: h * 0.22, cover: true, softGlow: true });
    extra.push({ x: w * 0.62, y: h * 0.37, w: 32, h: h * 0.22, cover: true, softGlow: true });
  }

  for (const rect of extra) {
    stage.walls.push({
      ...rect,
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      w: Math.round(rect.w),
      h: Math.round(rect.h)
    });
  }
}

function updateCamera() {
  camera.x = clamp(player.x - W / 2, 0, Math.max(0, worldW - W));
  camera.y = clamp(player.y - H / 2, 0, Math.max(0, worldH - H));
}

function screenMouseX() {
  return mouse.screenX ?? mouse.x - camera.x;
}

function screenMouseY() {
  return mouse.screenY ?? mouse.y - camera.y;
}

function worldToScreen(p) {
  return { x: p.x - camera.x, y: p.y - camera.y };
}

function viewportVisible(p, pad = 80) {
  return p.x >= camera.x - pad && p.x <= camera.x + W + pad && p.y >= camera.y - pad && p.y <= camera.y + H + pad;
}

function startFloor(floor) {
  currentFloor = floor;
  activeRouteType = nextRouteType || defaultRouteForFloor(floor);
  nextRouteType = null;

  activeStage = expandStageForFloor(stageForFloor(floor, activeRouteType), floor, activeRouteType);
  worldW = activeStage.worldW || W;
  worldH = activeStage.worldH || H;
  NAV_COLS = Math.ceil(worldW / NAV_CELL);
  NAV_ROWS = Math.ceil(worldH / NAV_CELL);
  walls = activeStage.walls.map(w => ({ ...w }));
  addTacticalCover(floor);
  teamPing = null;
  pendingIntel.length = 0;
  bullets.length = 0;
  enemyShots.length = 0;
  floatText.length = 0;
  echoes.length = 0;
  breakables.length = 0;
  pickups.length = 0;
  smokes.length = 0;
  poisonPuddles.length = 0;
  movementTraces.length = 0;
  message = "";

  player.x = activeStage.spawn.x;
  player.y = activeStage.spawn.y;
  camera.x = 0;
  camera.y = 0;
  resolveWallOverlap(player, 12);
  player.maxHp = 100 + runStats.maxHpBonus;
  player.hp = player.maxHp;
  player.r = 10;
  player.baseSpeed = 176;
  player.maxAmmo = playerMaxAmmo();
  player.ammo = player.maxAmmo;
  player.weaponHeat = 0;
  player.recoil = 0;
  player.reload = 0;
  player.shotCd = 0;
  player.pulseCd = floor === 1 ? 0 : Math.min(player.pulseCd, 2.5);
  player.pulseActive = 0;
  player.noise = 0;
  player.spotted = 0;
  player.dashTime = 0;
  player.dashInvuln = 0;
  player.dashCd = Math.min(player.dashCd || 0, 0.35);
  activatePendingBossAbilityForFloor(floor);
  player.reflexReady = runStats.reflexBuffer;
  player.smokeCharges = (isBossFloor(floor) ? 2 : activeRouteType === "cache" ? 1 : 1) + (runStats.smokeBonus || 0);

  bots = makeFloorBots(floor);
  for (const bot of bots) resolveWallOverlap(bot, 18);
  spawnBreakables(floor);
  spawnSmokeCanisters(floor);

  floorStartTime = nowSec();
  running = false;
  gameOver = false;
  startMusic(isBossFloor(floor) ? "music_boss" : "music_run");

  roundOpponentLabel = bots.length === 1
    ? botIntroName(bots[0])
    : `${bots.length} contacts`;
  roundMatchLabel = isBossFloor(floor)
    ? "BOSS FIGHT"
    : activeRouteType === "cache"
      ? "SUPPLY ROOM"
      : bots.length === 1
        ? "SOLO FIGHT"
        : "GROUP FIGHT";
  lastCountdownCue = "";

  addLog(`Floor ${floor}: ${activeStage.name}.`);
  addLog(`${roundMatchLabel}: ${roundOpponentLabel}.`);
  if (floor >= 2 && !isBossFloor(floor)) addLog("Next door locked.");
  if (isBossFloor(floor)) addLog("Boss floor.");
  if (activeRouteType === "cache") addLog("Weapon cache route.");
  updateHud();

  const scene = storySceneForFloor(floor);
  if (scene) showStoryScene(floor, scene);
  else if (isBossFloor(floor) && bots[0]) showBossIntro(bots[0]);
  else beginRoundCountdown();
}

function isBossFloor(floor = currentFloor) {
  return BOSS_FLOORS.has(floor) || activeRouteType === "boss" || activeRouteType === "rival";
}

function beginRoundCountdown() {
  closeOverlay();
  mode = "countdown";
  running = false;
  mouse.down = false;
  player.fireBuffer = 0;
  roundStartAt = nowSec() + 4.2;
  lastCountdownCue = "";
}

function bossTauntAudioKeys(bot) {
  const name = bot?.profile?.name || bot?.name || "";
  if (name.includes("Flicker")) return ["voice_boss_breath", "voice_boss_mwah"];
  if (name.includes("Venom")) return ["voice_boss_cry", "voice_boss_mwah"];
  if (name.includes("Graves")) return ["voice_boss_laugh", "voice_boss_cry"];
  return ["voice_boss_cry", "voice_boss_laugh", "voice_boss_mwah"];
}

function maybePlayBossTauntAudio(bot, intro = false) {
  if (!bot || bot.role !== "boss") return;
  const t = nowSec();
  if (!intro && bot.audioTauntCd && t < bot.audioTauntCd) return;
  const keys = bossTauntAudioKeys(bot);
  const pool = intro ? keys : keys.filter(item => item !== "voice_boss_breath");
  const key = choice(pool.length ? pool : keys);
  if (playAssetSfx(key, intro ? 0.46 : 0.28, "voice")) {
    bot.audioTauntCd = t + (intro ? 7.5 : 10.0);
  }
}

function bossIntroLine(bot) {
  const name = bot?.profile?.name || bot?.name || "";
  if (name.includes("Flicker")) return "Mira is above us. She asked if you were still alive. I was told to answer that question after this fight.";
  if (name.includes("Venom")) return "They paid me to keep you here. Every minute you spend with me is another minute she spends locked upstairs.";
  if (name.includes("Graves")) return "I kept things from the people who came before you. A ring. A badge. A strip of cloth. You can add something small before you leave.";
  if (name.includes("Null")) return "She passed through the yard shaking from the cold. She still looked back toward the stairs like she expected you.";
  if (name.includes("Vanta")) return "Mira came through this room asking for you. I told her the next person through that door would probably be tired, angry, and easy to kill.";
  return "The tower sent me because you are close. Your rescue ends at these stairs.";
}

function showBossIntro(bot) {
  mode = "bossIntro";
  running = false;
  const profile = bot.profile || {};
  const spriteKey = profile.sprite || bot.sprite || "enemy_vanta";
  const spritePath = ASSET_PATHS.images[spriteKey] || ASSET_PATHS.images.enemy_vanta;
  const title = profile.title || bot.callSign || "Boss";
  const line = bossIntroLine(bot);
  const stageName = activeStage?.name || "Arena";

  maybePlayBossTauntAudio(bot, true);
  openOverlay(`
    <div class="vsScreen bossIntroScreen">
      <div class="bossIntroBackdrop"></div>
      <div class="bossIntroFrame">
        <div class="bossScene">
          <div class="bossStageTag">${stageName}</div>
          <div class="bossPortrait">
            <img src="${spritePath}" alt="">
          </div>
        </div>
        <div class="bossTextBox">
          <div class="bossNamePlate">${bot.name}</div>
          <div class="bossRole">${title}</div>
          <p>${line}</p>
          <button class="vsButton green bossContinue" data-action="beginBossIntro">FIGHT</button>
        </div>
      </div>
    </div>
  `, "bossIntroMenu");
}

function makeFloorBots(floor) {
  const created = [];

  if (isBossFloor(floor)) {
    const profile = bossProfileForFloor(floor);
    const spawn = activeStage.botSpawns[0] || { x: worldW - 90, y: worldH - 90, role: "boss" };
    created.push(makeBot(profile.name, spawn.x, spawn.y, "boss", profile.color, floor, profile));
    return created;
  }

  const count = activeRouteType === "standard" && floor >= 6 ? 2 : 1;
  const rolesByFloor = [
    ["duelist"],
    ["baiter"],
    ["hunter"],
    ["boss"],
    ["anchor"],
    ["hunter", "flanker"],
    ["baiter"],
    ["boss"]
  ];

  const roles = activeRouteType === "cache" ? ["duelist"] : rolesByFloor[(floor - 1) % rolesByFloor.length] || ["duelist"];
  for (let i = 0; i < count; i++) {
    const template = activeStage.botSpawns[i % activeStage.botSpawns.length];
    const profile = BOT_PROFILES[(floor + i - 1) % BOT_PROFILES.length];
    const role = roles[i % roles.length] || template.role || "duelist";
    created.push(makeBot(profile.name, template.x, template.y, role, profile.color, floor, profile));
  }

  return created;
}


function botName(i) {
  return ["Vanta", "Mire", "Sable", "Rook", "Null", "Ash", "Vex"][i] || "Unit";
}

function makeBot(name, x, y, role, color, floor, profile = null) {
  const p = nearestFreePoint(x, y, 28);
  const difficulty = floor - 1;
  const isBoss = role === "boss";
  const persona = profile || BOT_PROFILES[0];
  const weapon = WEAPON_BY_ID[persona.weaponId || "pistol"] || WEAPON_BY_ID.pistol;
  const aimSkill = clamp(persona.aim ?? 0.62, 0.35, 0.95);

  const roleSpeed = role === "duelist" ? 18 : role === "flanker" ? 12 : role === "coward" ? -8 : role === "anchor" ? -6 : isBoss ? 14 : 0;
  const roleReaction = role === "duelist" ? -0.22 : role === "hunter" ? -0.08 : role === "coward" ? 0.12 : role === "support" ? 0.05 : isBoss ? -0.26 : 0;
  const roleAim = role === "duelist" ? -0.08 : role === "hunter" ? -0.03 : role === "coward" ? 0.05 : role === "flanker" ? 0.02 : isBoss ? -0.09 : 0;
  const maxHp = isBoss
    ? 220 + difficulty * 16
    : role === "duelist"
      ? 138 + difficulty * 12
      : 84 + difficulty * 7 + (role === "anchor" ? 18 : 0);

  return {
    name,
    x: p.x,
    y: p.y,
    r: isBoss ? 14 : 11,
    hp: maxHp,
    maxHp,
    color,
    role,
    profile: persona,
    callSign: persona.callSign || persona.title || role,
    model: persona.model || "blade",
    trait: persona.trait || "searches like a player",
    weaponId: weapon.id,
    weapon,
    speed: 112 + difficulty * 3.3 + roleSpeed,
    aimSpread: clamp((0.26 - aimSkill * 0.18) - difficulty * 0.008 + roleAim, isBoss || role === "duelist" ? 0.045 : 0.085, 0.31),
    reaction: clamp((0.78 - aimSkill * 0.34) - difficulty * 0.018 + roleReaction - (persona.reactionBoost || 0), isBoss || role === "duelist" ? 0.16 : 0.3, 0.75),
    shotCd: rand(0.55, 1.4),
    burstShots: 0,
    strafeTimer: rand(0.2, 0.7),
    smokeCharges: isBoss ? 2 : persona.smokeBias > 0.5 ? 1 : 0,
    stealth: persona.bossKit === "flicker",
    stealthReveal: persona.bossKit === "flicker" ? 1.2 : 0,
    lastTraceAt: 0,
    traceSide: 1,
    lastFakeTraceAt: 0,
    state: "patrol",
    angle: rand(-Math.PI, Math.PI),
    suspicion: 0,
    suspicionBase: 7 + difficulty * 1.35 + (isBoss ? 18 : role === "duelist" ? 14 : 0),
    lastSeen: null,
    lastHeard: null,
    target: null,
    wrongCheck: null,
    pressureHint: null,
    pressureTimer: rand(1.2, 2.7),
    maskDelay: 0,
    panic: 0,
    flinch: 0,
    flash: 0,
    stagger: 0,
    thinkPause: 0,
    suppressed: 0,
    speedBurst: 0,
    dodgeCd: rand(0.15, isBoss ? 0.65 : 1.25),
    dodgeInvuln: 0,
    bossAbilityTimer: isBoss ? rand(1.1, 2.2) : 99,
    tauntTimer: isBoss ? rand(1.8, 3.4) : 99,
    audioTauntCd: isBoss ? 0 : 99,
    flankSide: Math.random() < 0.5 ? -1 : 1,
    memory: {
      playerLastRoute: [],
      shotsHeard: 0,
      timesFlanked: 0,
      lostSightAt: 0
    },
    pathPause: rand(0.1, 1.2),
    moveJitter: rand(-1, 1),
    path: [],
    pathIndex: 0,
    pathGoalKey: "",
    pathRefresh: 0,
    stuckTime: 0,
    lastX: p.x,
    lastY: p.y,
    coverPoint: null,
    coverTimer: 0,
    decisionTimer: rand(0.14, 0.55),
    alive: true,
    recentlyHit: 0,
    floor
  };
}


function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function canPlaceCover(rect) {
  const keepouts = [activeStage.spawn, ...(activeStage.botSpawns || [])];
  for (const p of keepouts) {
    if (circleRectOverlap({ x: p.x, y: p.y, r: 58 }, rect)) return false;
  }
  return !walls.some(wall => rectsOverlap(wall, rect));
}

function addTacticalCover(floor) {
  const patterns = [
    [
      { x: 305, y: 155, w: 88, h: 26 }, { x: 565, y: 155, w: 88, h: 26 },
      { x: 305, y: 470, w: 88, h: 26 }, { x: 565, y: 470, w: 88, h: 26 },
      { x: 80, y: 300, w: 72, h: 24 }, { x: 808, y: 300, w: 72, h: 24 }
    ],
    [
      { x: 270, y: 105, w: 30, h: 92 }, { x: 660, y: 445, w: 30, h: 92 },
      { x: 410, y: 285, w: 132, h: 24 }, { x: 125, y: 290, w: 90, h: 24 }, { x: 745, y: 290, w: 90, h: 24 }
    ],
    [
      { x: 220, y: 250, w: 90, h: 24 }, { x: 650, y: 250, w: 90, h: 24 },
      { x: 220, y: 365, w: 90, h: 24 }, { x: 650, y: 365, w: 90, h: 24 },
      { x: 462, y: 292, w: 36, h: 60 }
    ]
  ];

  const candidates = patterns[(floor - 1) % patterns.length];
  const routeBonus = activeRouteType === "cache" || isBossFloor(floor) ? 2 : 0;
  const count = isBossFloor(floor) ? candidates.length : Math.min(candidates.length, 4 + routeBonus + Math.floor(floor / 4));
  for (const rect of candidates.slice(0, count)) {
    const cover = { ...worldRect(rect), cover: true, softGlow: true };
    if (canPlaceCover(cover)) walls.push(cover);
  }

  if (isBossFloor(floor)) {
    const duelCover = [
      { x: 160, y: 275, w: 86, h: 26 },
      { x: 714, y: 340, w: 86, h: 26 },
      { x: 428, y: 150, w: 104, h: 24 },
      { x: 428, y: 468, w: 104, h: 24 }
    ];
    for (const rect of duelCover) {
      const cover = { ...worldRect(rect), cover: true, softGlow: true };
      if (canPlaceCover(cover)) walls.push(cover);
    }
  }
}

function isCircleBlocked(x, y, r) {
  const c = { x, y, r };
  return walls.some(wall => circleRectOverlap(c, wall));
}

function nearestFreePoint(x, y, r) {
  const base = { x: clamp(x, r, worldW - r), y: clamp(y, r, worldH - r) };
  if (!isCircleBlocked(base.x, base.y, r)) return base;

  for (let radius = 8; radius <= 260; radius += 8) {
    for (let i = 0; i < 36; i++) {
      const a = (Math.PI * 2 * i) / 36;
      const p = {
        x: clamp(base.x + Math.cos(a) * radius, r, worldW - r),
        y: clamp(base.y + Math.sin(a) * radius, r, worldH - r)
      };
      if (!isCircleBlocked(p.x, p.y, r)) return p;
    }
  }

  let best = null;
  let bestDistance = Infinity;
  for (let py = r; py <= worldH - r; py += 16) {
    for (let px = r; px <= worldW - r; px += 16) {
      if (isCircleBlocked(px, py, r)) continue;
      const d = Math.hypot(px - base.x, py - base.y);
      if (d < bestDistance) {
        best = { x: px, y: py };
        bestDistance = d;
      }
    }
  }

  return best || base;
}

function resolveWallOverlap(entity, clearance = 0) {
  const checkRadius = entity.r + clearance;
  if (!isCircleBlocked(entity.x, entity.y, checkRadius)) return;
  const p = nearestFreePoint(entity.x, entity.y, checkRadius);
  entity.x = p.x;
  entity.y = p.y;
}

function circleRectOverlap(c, r) {
  const nx = clamp(c.x, r.x, r.x + r.w);
  const ny = clamp(c.y, r.y, r.y + r.h);
  return Math.hypot(c.x - nx, c.y - ny) < c.r;
}

function moveEntity(e, dx, dy) {
  const startX = e.x;
  const startY = e.y;
  const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 5));
  const stepX = dx / steps;
  const stepY = dy / steps;

  for (let i = 0; i < steps; i++) {
    tryMoveAxis(e, "x", stepX);
    tryMoveAxis(e, "y", stepY);
  }

  return Math.hypot(e.x - startX, e.y - startY);
}

function tryMoveAxis(e, axis, amount) {
  if (!amount) return false;

  const old = e[axis];
  e[axis] = clamp(old + amount, e.r, axis === "x" ? worldW - e.r : worldH - e.r);

  if (isCircleBlocked(e.x, e.y, e.r)) {
    e[axis] = old;
    return false;
  }

  return true;
}

function lineIntersectsRect(a, b, r) {
  const steps = Math.ceil(dist(a, b) / 6);
  for (let i = 0; i <= steps; i++) {
    const t = i / Math.max(steps, 1);
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return true;
  }
  return false;
}

function hasLineOfSight(a, b) {
  for (const wall of walls) {
    if (lineIntersectsRect(a, b, wall)) return false;
  }
  return true;
}

function smokeBlocksLine(a, b) {
  for (const smoke of smokes) {
    if (smoke.t <= 0) continue;
    const p = closestPointOnLine(smoke, a, b);
    if (Math.hypot(smoke.x - p.x, smoke.y - p.y) < smoke.r) return true;
  }
  return false;
}

function linePassesSmoke(a, b) {
  return smokeBlocksLine(a, b);
}

function recentPoint(point, seconds = 4.5) {
  return point && (point.t === undefined || nowSec() - point.t <= seconds);
}

function nearestBotHealthPickup(bot) {
  if (!pickups.length || bot.hp > bot.maxHp * 0.58) return null;

  let best = null;
  let bestScore = Infinity;

  for (const pickup of pickups) {
    if (pickup.heal <= 0) continue;
    const d = dist(bot, pickup);
    if (d > 420 && !hasLineOfSight(bot, pickup)) continue;
    const pathPenalty = hasClearMovementPath(bot, pickup, bot.r + 4) ? 0 : 90;
    const exposedPenalty = hasLineOfSight(player, pickup) ? 90 : 0;
    const score = d + pathPenalty + exposedPenalty;

    if (score < bestScore) {
      best = pickup;
      bestScore = score;
    }
  }

  return best;
}

function botSmokeFirePoint(bot) {
  if (!hasLineOfSight(bot, player) || !linePassesSmoke(bot, player)) return null;

  const profile = bot.profile || BOT_PROFILES[0];
  const canBlindFire =
    bot.role === "boss" ||
    bot.suppressed > 0 ||
    bot.suspicion > 72 ||
    profile.smokeBias > 0.45;

  if (!canBlindFire) return null;

  if (recentPoint(bot.lastSeen, bot.role === "boss" ? 7.0 : 4.2)) {
    return safePointNear(bot.lastSeen.x, bot.lastSeen.y, bot.role === "boss" ? 28 : 48);
  }

  if (recentPoint(bot.pressureHint, 5.2)) {
    return safePointNear(bot.pressureHint.x, bot.pressureHint.y, bot.role === "boss" ? 36 : 58);
  }

  if (recentPoint(bot.lastHeard, 3.8)) {
    return safePointNear(bot.lastHeard.x, bot.lastHeard.y, 64);
  }

  return null;
}

function hasVisualLineOfSight(a, b) {
  return hasLineOfSight(a, b) && !smokeBlocksLine(a, b);
}

function withinVisionCone(bot, target) {
  const d = dist(bot, target);
  const visionRange = 245 + Math.min(currentFloor, 7) * 13;
  if (d > visionRange) return false;
  const to = angleTo(bot, target);
  const diff = Math.abs(normAngle(to - bot.angle));
  return diff < Math.PI * 0.46 && hasVisualLineOfSight(bot, target);
}

function rayBlocked(a, angle, maxDist) {
  const b = { x: a.x + Math.cos(angle) * maxDist, y: a.y + Math.sin(angle) * maxDist };
  for (let d = 0; d <= maxDist; d += 5) {
    const p = { x: a.x + Math.cos(angle) * d, y: a.y + Math.sin(angle) * d };
    for (const wall of walls) {
      if (p.x >= wall.x && p.x <= wall.x + wall.w && p.y >= wall.y && p.y <= wall.y + wall.h) {
        return p;
      }
    }
  }
  return b;
}

function safePointNear(x, y, spread = 90) {
  for (let i = 0; i < 24; i++) {
    const p = {
      x: clamp(x + rand(-spread, spread), 28, worldW - 28),
      y: clamp(y + rand(-spread, spread), 28, worldH - 28)
    };
    if (!isCircleBlocked(p.x, p.y, 16)) return p;
  }
  return nearestFreePoint(x, y, 18);
}

function hasClearMovementPath(a, b, r) {
  const steps = Math.max(1, Math.ceil(dist(a, b) / 8));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    if (isCircleBlocked(x, y, r)) return false;
  }
  return true;
}

function cellKey(c, r) {
  return `${c},${r}`;
}

function pointToCell(p) {
  return {
    c: clamp(Math.floor(p.x / NAV_CELL), 0, NAV_COLS - 1),
    r: clamp(Math.floor(p.y / NAV_CELL), 0, NAV_ROWS - 1)
  };
}

function cellCenter(c, r) {
  return {
    x: clamp(c * NAV_CELL + NAV_CELL / 2, 18, worldW - 18),
    y: clamp(r * NAV_CELL + NAV_CELL / 2, 18, worldH - 18)
  };
}

function cellWalkable(c, r, radius) {
  if (c < 0 || r < 0 || c >= NAV_COLS || r >= NAV_ROWS) return false;
  const p = cellCenter(c, r);
  return !isCircleBlocked(p.x, p.y, radius);
}

function findPath(start, goal, radius) {
  const safeStart = nearestFreePoint(start.x, start.y, radius);
  const safeGoal = nearestFreePoint(goal.x, goal.y, radius);
  const s = pointToCell(safeStart);
  const g = pointToCell(safeGoal);
  const startKey = cellKey(s.c, s.r);
  const goalKey = cellKey(g.c, g.r);

  if (startKey === goalKey) return [safeGoal];

  const open = [{ c: s.c, r: s.r, g: 0, f: Math.hypot(g.c - s.c, g.r - s.r), parent: null }];
  const best = new Map([[startKey, 0]]);
  const closed = new Set();
  const dirs = [
    [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, 1.42], [1, -1, 1.42], [-1, 1, 1.42], [-1, -1, 1.42]
  ];

  let winner = null;
  let guard = 0;

  while (open.length && guard < 2600) {
    guard += 1;
    open.sort((a, b) => a.f - b.f);
    const node = open.shift();
    const key = cellKey(node.c, node.r);
    if (closed.has(key)) continue;
    closed.add(key);

    if (key === goalKey) {
      winner = node;
      break;
    }

    for (const [dc, dr, cost] of dirs) {
      const nc = node.c + dc;
      const nr = node.r + dr;
      if (!cellWalkable(nc, nr, radius)) continue;

      if (dc && dr) {
        if (!cellWalkable(node.c + dc, node.r, radius) || !cellWalkable(node.c, node.r + dr, radius)) {
          continue;
        }
      }

      const nKey = cellKey(nc, nr);
      if (closed.has(nKey)) continue;

      const gScore = node.g + cost;
      if (best.has(nKey) && best.get(nKey) <= gScore) continue;

      best.set(nKey, gScore);
      const h = Math.hypot(g.c - nc, g.r - nr);
      open.push({ c: nc, r: nr, g: gScore, f: gScore + h, parent: node });
    }
  }

  if (!winner) return [safeGoal];

  const points = [];
  let n = winner;
  while (n) {
    points.push(cellCenter(n.c, n.r));
    n = n.parent;
  }
  points.reverse();
  points.shift();
  points.push(safeGoal);
  return smoothPath(points, radius);
}

function smoothPath(points, radius) {
  if (points.length <= 2) return points;
  const smoothed = [];
  let i = 0;

  while (i < points.length) {
    smoothed.push(points[i]);
    if (i >= points.length - 1) break;

    let next = points.length - 1;
    for (; next > i + 1; next--) {
      if (hasClearMovementPath(points[i], points[next], radius)) break;
    }

    i = Math.max(i + 1, next);
  }

  return smoothed;
}

function getBotMovePoint(bot, target) {
  const radius = bot.r + 4;
  const goal = nearestFreePoint(target.x, target.y, radius);

  if (hasClearMovementPath(bot, goal, radius)) {
    bot.path = [];
    bot.pathIndex = 0;
    bot.pathGoalKey = "";
    return goal;
  }

  const goalKey = `${Math.round(goal.x / 16)},${Math.round(goal.y / 16)}`;
  bot.pathRefresh -= 1;

  if (!bot.path.length || bot.pathGoalKey !== goalKey || bot.pathRefresh <= 0) {
    bot.path = findPath(bot, goal, radius);
    bot.pathIndex = 0;
    bot.pathGoalKey = goalKey;
    bot.pathRefresh = 18;
  }

  while (bot.pathIndex < bot.path.length - 1 && dist(bot, bot.path[bot.pathIndex]) < 18) {
    bot.pathIndex += 1;
  }

  return bot.path[bot.pathIndex] || goal;
}

function nearestWallDistance(p) {
  let best = Infinity;
  for (const wall of walls) {
    const nx = clamp(p.x, wall.x, wall.x + wall.w);
    const ny = clamp(p.y, wall.y, wall.y + wall.h);
    best = Math.min(best, Math.hypot(p.x - nx, p.y - ny));
  }
  return best;
}

function chooseCoverPoint(bot) {
  if (bot.coverPoint && bot.coverTimer > nowSec() && !isCircleBlocked(bot.coverPoint.x, bot.coverPoint.y, bot.r + 4)) {
    return bot.coverPoint;
  }

  const wantsToBreakSight = bot.hp < bot.maxHp * 0.52 || bot.role === "coward";
  let best = null;
  let bestScore = -Infinity;

  for (let i = 0; i < 34; i++) {
    const a = (Math.PI * 2 * i) / 34 + rand(-0.08, 0.08);
    const range = rand(70, 165);
    const p = nearestFreePoint(bot.x + Math.cos(a) * range, bot.y + Math.sin(a) * range, bot.r + 4);
    if (dist(p, player) < 70 || dist(p, player) > 360) continue;

    const wallDistance = nearestWallDistance(p);
    const nearCover = clamp(70 - wallDistance, 0, 70);
    const lineToPlayer = hasVisualLineOfSight(p, player);
    const route = hasClearMovementPath(bot, p, bot.r + 4) ? 26 : 0;
    const distanceScore = 90 - Math.abs(dist(p, player) - 150);
    const sightScore = wantsToBreakSight ? (lineToPlayer ? -45 : 55) : (lineToPlayer ? 35 : -10);
    const score = nearCover * 1.1 + distanceScore * 0.25 + sightScore + route;

    if (score > bestScore) {
      best = p;
      bestScore = score;
    }
  }

  bot.coverPoint = best;
  bot.coverTimer = nowSec() + rand(1.2, 2.4);
  return best;
}

function randomFreePoint(minPlayerDistance = 100) {
  for (let i = 0; i < 80; i++) {
    const p = {
      x: rand(36, worldW - 36),
      y: rand(36, worldH - 36)
    };
    if (dist(p, player) < minPlayerDistance) continue;
    if (isCircleBlocked(p.x, p.y, 22)) continue;
    if (breakables.some(item => item.alive && dist(item, p) < 42)) continue;
    return p;
  }
  return nearestFreePoint(worldW * 0.5, worldH * 0.5, 22);
}

function spawnBreakables(floor) {
  const count = Math.min(7, 3 + Math.ceil(floor * 0.55));
  for (let i = 0; i < count; i++) {
    const p = randomFreePoint(130);
    const type = i % 3 === 2 ? "smoke" : "med";
    breakables.push({
      x: p.x,
      y: p.y,
      r: rand(11, 16),
      hp: 32 + floor * 3,
      maxHp: 32 + floor * 3,
      type,
      alive: true,
      wobble: rand(0, Math.PI * 2)
    });
  }
}

function spawnSmokeCanisters(floor) {
  const count = floor >= 2 ? (isBossFloor(floor) ? 2 : 1) : 0;
  for (let i = 0; i < count; i++) {
    const p = randomFreePoint(160);
    breakables.push({
      x: p.x,
      y: p.y,
      r: 13,
      hp: 24 + floor * 2,
      maxHp: 24 + floor * 2,
      type: "smoke",
      alive: true,
      wobble: rand(0, Math.PI * 2)
    });
  }
}


function addPoisonPuddle(x, y, radius = 72, duration = 6.8, color = "#7dff72") {
  const p = nearestFreePoint(x, y, 24);
  poisonPuddles.push({
    x: p.x,
    y: p.y,
    r: radius,
    t: duration,
    maxT: duration,
    color,
    wobble: rand(0, Math.PI * 2),
    pulse: rand(0, Math.PI * 2)
  });
  if (poisonPuddles.length > 7) poisonPuddles.shift();
  addParticles("spark", p.x, p.y, rand(-Math.PI, Math.PI), 22, color);
  addScreenFlash(0.015);
}

function updatePoisonPuddles(dt) {
  for (const puddle of poisonPuddles) {
    puddle.t -= dt;
    if (mode === "running" && dist(player, puddle) < player.r + puddle.r * 0.78) {
      damagePlayer((puddle.r > 80 ? 13 : 9) * dt, "poison");
      player.spotted = Math.max(player.spotted, 0.12);
      if (Math.random() < 0.18) {
        addParticles("spark", player.x + rand(-6, 6), player.y + rand(-6, 6), rand(-Math.PI, Math.PI), 2, puddle.color);
      }
    }
  }

  for (let i = poisonPuddles.length - 1; i >= 0; i--) {
    if (poisonPuddles[i].t <= 0) poisonPuddles.splice(i, 1);
  }
}

function drawPoisonPuddles() {
  const t = nowSec();
  for (const puddle of poisonPuddles) {
    if (!viewportVisible(puddle, puddle.r + 40)) continue;
    const pct = clamp(puddle.t / puddle.maxT, 0, 1);
    const r = puddle.r + Math.sin(t * 2.8 + puddle.pulse) * 5;
    const g = ctx.createRadialGradient(puddle.x, puddle.y, 5, puddle.x, puddle.y, r);
    g.addColorStop(0, hexToRgba(puddle.color, 0.36 * pct));
    g.addColorStop(0.62, hexToRgba(puddle.color, 0.18 * pct));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(puddle.x, puddle.y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.16 * pct;
    ctx.strokeStyle = puddle.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(puddle.x, puddle.y, r * 0.72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function addSmoke(x, y, radius = 74, duration = 7.0, color = "#7cc7ff") {
  const p = nearestFreePoint(x, y, 24);
  smokes.push({
    x: p.x,
    y: p.y,
    r: radius,
    t: duration,
    maxT: duration,
    wobble: rand(0, Math.PI * 2),
    color
  });
  if (smokes.length > 8) smokes.shift();
  addParticles("dust", p.x, p.y, rand(-Math.PI, Math.PI), 18);
  playSfx("smoke");
}

function throwSmoke() {
  if (mode !== "running" || player.smokeCharges <= 0) return;
  const target = { x: mouse.x, y: mouse.y };
  if (dist(player, target) > 230) return;
  if (!hasLineOfSight(player, target)) return;
  player.smokeCharges -= 1;
  addSmoke(target.x, target.y, 78, 6.5);
  addLog("Smoke deployed. It blocks sight. Bullets still pass through.");
  updateHud();
}

function updatePickups() {
  for (let i = pickups.length - 1; i >= 0; i--) {
    const pickup = pickups[i];
    pickup.t -= 1;
    if (pickup.t <= 0) {
      pickups.splice(i, 1);
      continue;
    }

    if (dist(player, pickup) <= player.r + pickup.r + 7) {
      const before = player.hp;
      player.hp = clamp(player.hp + pickup.heal * (1 + powerRank("medSense") * 0.12) * (runStats.healMult || 1), 0, player.maxHp);
      floatText.push({ x: player.x, y: player.y - 24, text: `+${Math.round(player.hp - before)}`, t: 0.8 });
      pickups.splice(i, 1);
      continue;
    }

    const woundedBot = bots.find(bot => bot.alive && bot.hp < bot.maxHp * 0.62 && dist(bot, pickup) <= bot.r + pickup.r + 8);
    if (woundedBot) {
      const before = woundedBot.hp;
      woundedBot.hp = clamp(woundedBot.hp + pickup.heal * 0.78, 0, woundedBot.maxHp);
      woundedBot.panic = Math.max(0, woundedBot.panic - 0.35);
      floatText.push({ x: woundedBot.x, y: woundedBot.y - 26, text: `+${Math.round(woundedBot.hp - before)}`, t: 0.8 });
      pickups.splice(i, 1);
    }
  }
}

function damageBreakable(item, dmg, hitPoint = item, angle = 0, weapon = currentWeapon()) {
  item.hp -= dmg;
  item.wobble += rand(-0.4, 0.4);
  floatText.push({ x: item.x, y: item.y - 18, text: "crack", t: 0.45 });
  addImpact("breakable", hitPoint.x, hitPoint.y, angle, weapon);

  if (item.hp > 0) return;

  item.alive = false;

  if (item.type === "smoke") {
    addSmoke(item.x, item.y, 82, 7.0);
    floatText.push({ x: item.x, y: item.y - 26, text: "smoke", t: 0.8 });
  } else {
    pickups.push({
      x: item.x,
      y: item.y,
      r: 9,
      heal: 24 + Math.min(16, currentFloor * 2),
      t: 900
    });
    floatText.push({ x: item.x, y: item.y - 26, text: "med", t: 0.8 });
  }

  addParticles("wood", item.x, item.y, angle, 12);
  addParticles("spark", item.x, item.y, angle, 5);
}

function lineCircleHit(entity, a, b, padding = 4) {
  const p = closestPointOnLine(entity, a, b);
  const d = Math.hypot(entity.x - p.x, entity.y - p.y);
  if (d > entity.r + padding) return null;
  return dist(a, p);
}

function isStealthBoss(bot) {
  return bot?.profile?.bossKit === "flicker";
}

function revealStealth(bot, seconds = 1.0) {
  if (!isStealthBoss(bot)) return;
  bot.stealthReveal = Math.max(bot.stealthReveal || 0, seconds);
}

function stealthVisibilityAlpha(bot) {
  if (!isStealthBoss(bot)) return 1;
  if (showDebug) return 1;

  const pulseReveal = player.pulseActive > 0 && dist(player, bot) < runStats.pulseRange;
  if (pulseReveal) return 0.95;

  if ((bot.stealthReveal || 0) > 0) {
    return clamp(0.32 + bot.stealthReveal * 0.46, 0.32, 0.9);
  }

  const visual = hasVisualLineOfSight(player, bot);
  if (visual) return 0.16;

  return 0;
}

function botFullyRevealed(bot) {
  if (!isStealthBoss(bot)) return true;
  if (showDebug) return true;
  if (player.pulseActive > 0 && dist(player, bot) < runStats.pulseRange) return true;
  return (bot.stealthReveal || 0) > 0.18;
}

function addMovementTrace(x, y, angle, opts = {}) {
  movementTraces.push({
    x,
    y,
    angle,
    t: opts.t || 3.0,
    maxT: opts.t || 3.0,
    color: opts.color || "#d8f6ff",
    fake: !!opts.fake,
    boss: !!opts.boss,
    owner: opts.owner || "bot",
    kind: opts.kind || "footprint",
    size: opts.size || 1,
    side: opts.side || 1,
    seenBy: new Set()
  });
  if (movementTraces.length > 180) movementTraces.splice(0, movementTraces.length - 180);
}

function maybeLeavePlayerFootprint(movedDistance, sneaking) {
  if (mode !== "running" || movedDistance < 0.9) return;

  const now = nowSec();
  const spacing = sneaking ? 0.68 : 0.34;
  if (now - lastPlayerTraceAt < spacing) return;

  lastPlayerTraceAt = now;
  playerTraceSide *= -1;
  const sideOffset = playerTraceSide * 4.2;
  const back = 8;
  const px = player.x - Math.cos(player.angle) * back + Math.cos(player.angle + Math.PI / 2) * sideOffset;
  const py = player.y - Math.sin(player.angle) * back + Math.sin(player.angle + Math.PI / 2) * sideOffset;

  addMovementTrace(px, py, player.angle + rand(-0.08, 0.08), {
    t: sneaking ? 2.1 : 4.4,
    color: sneaking ? "#aab2c9" : "#d8f6ff",
    owner: "player",
    size: sneaking ? 0.56 : 0.82,
    side: playerTraceSide
  });
}

function maybeLeaveMovementTrace(bot, movedDistance) {
  if (!bot.alive || mode !== "running") return;

  const loudMove = bot.state === "attack" || bot.speedBurst > 0 || movedDistance > 2.4;
  const stealthBoss = isStealthBoss(bot);
  if (!stealthBoss && !loudMove) return;

  const now = nowSec();
  const spacing = stealthBoss ? 0.2 : 0.44;
  if (bot.lastTraceAt && now - bot.lastTraceAt < spacing) return;
  bot.lastTraceAt = now;
  bot.traceSide = (bot.traceSide || 1) * -1;

  const sideOffset = bot.traceSide * 4.4;
  addMovementTrace(
    bot.x - Math.cos(bot.angle) * 7 + Math.cos(bot.angle + Math.PI / 2) * sideOffset + rand(-1.5, 1.5),
    bot.y - Math.sin(bot.angle) * 7 + Math.sin(bot.angle + Math.PI / 2) * sideOffset + rand(-1.5, 1.5),
    bot.angle + rand(-0.12, 0.12),
    {
      t: stealthBoss ? 3.6 : 2.6,
      color: stealthBoss ? "#8cf4ff" : "#d8f6ff",
      owner: "bot",
      boss: stealthBoss,
      size: stealthBoss ? 1.05 : 0.76,
      side: bot.traceSide
    }
  );

  if (stealthBoss && bot.hp < bot.maxHp * 0.38 && now - (bot.lastFakeTraceAt || 0) > 3.2 && Math.random() < 0.08) {
    bot.lastFakeTraceAt = now;
    const fakeAngle = bot.angle + (Math.random() < 0.5 ? 1 : -1) * rand(0.9, 1.5);
    const fakePoint = safePointNear(bot.x + Math.cos(fakeAngle) * rand(45, 90), bot.y + Math.sin(fakeAngle) * rand(45, 90), 38);
    addMovementTrace(fakePoint.x, fakePoint.y, fakeAngle, {
      t: 2.4,
      color: "#ff5c7a",
      owner: "bot",
      boss: true,
      fake: true,
      size: 0.9
    });
  }
}

function traceVisibleToPlayer(trace) {
  if (showDebug) return true;
  if (!viewportVisible(trace, 72)) return false;
  if (trace.owner === "player") return hasLineOfSight(player, trace);
  return hasLineOfSight(player, trace);
}

function botCanReadTrace(bot, trace) {
  if (!bot.alive || trace.owner !== "player") return false;
  if (trace.t <= 0 || trace.t / trace.maxT < 0.18) return false;
  if (dist(bot, trace) > (bot.role === "boss" ? 460 : 330)) return false;
  return hasVisualLineOfSight(bot, trace);
}

function consumeVisibleFootprints(bot) {
  if (bot.lastSeen && nowSec() - bot.lastSeen.t < 0.7) return;

  let best = null;
  let bestScore = -Infinity;

  for (const trace of movementTraces) {
    if (!botCanReadTrace(bot, trace)) continue;
    const age = 1 - trace.t / trace.maxT;
    const score = trace.t * 12 - dist(bot, trace) * 0.025 - age * 8;
    if (score > bestScore) {
      best = trace;
      bestScore = score;
    }
  }

  if (!best) return;

  bot.suspicion = Math.max(bot.suspicion, bot.role === "boss" ? 46 : 32);
  bot.lastHeard = {
    x: best.x + Math.cos(best.angle) * rand(18, 46),
    y: best.y + Math.sin(best.angle) * rand(18, 46),
    t: nowSec()
  };
  bot.state = bot.state === "patrol" ? "search" : bot.state;
  bot.thinkPause = Math.max(bot.thinkPause || 0, bot.role === "boss" ? 0.04 : 0.1);
}

function drawMovementTraces() {
  for (const trace of movementTraces) {
    if (!traceVisibleToPlayer(trace)) continue;

    const pct = clamp(trace.t / trace.maxT, 0, 1);
    const fade = Math.sin(pct * Math.PI);
    const alpha = clamp(pct * 0.55 + fade * 0.12, 0, 1) * (trace.fake ? 0.18 : trace.boss ? 0.36 : trace.owner === "player" ? 0.16 : 0.24);

    ctx.save();
    ctx.translate(trace.x, trace.y);
    ctx.rotate(trace.angle);

    ctx.globalAlpha = alpha;
    ctx.fillStyle = trace.fake ? "rgba(255,92,122,0.78)" : hexToRgba(trace.color, 0.9);

    const side = trace.side || 1;
    ctx.beginPath();
    ctx.ellipse(-4.5 * trace.size, side * 2.8 * trace.size, 4.2 * trace.size, 8.5 * trace.size, 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = alpha * 0.55;
    ctx.beginPath();
    ctx.ellipse(5.5 * trace.size, -side * 2.2 * trace.size, 3.3 * trace.size, 6.4 * trace.size, -0.08, 0, Math.PI * 2);
    ctx.fill();

    if (trace.boss || trace.fake) {
      ctx.globalAlpha = alpha * 0.42;
      ctx.strokeStyle = trace.fake ? "rgba(255,92,122,0.9)" : hexToRgba(trace.color, 0.95);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-16 * trace.size, 0);
      ctx.lineTo(12 * trace.size, 0);
      ctx.stroke();
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

function botVisibleToPlayer(bot) {
  if (showDebug) return true;
  if (isStealthBoss(bot)) return stealthVisibilityAlpha(bot) > 0.05;
  const pulseReveal = player.pulseActive > 0 && dist(player, bot) < runStats.pulseRange;
  return hasVisualLineOfSight(player, bot) || pulseReveal;
}

function botVisionVisibleToPlayer(bot) {
  if (showDebug) return true;
  if (isStealthBoss(bot) && !botFullyRevealed(bot)) return false;
  return hasVisualLineOfSight(player, bot);
}

function stageFootstepMaterial() {
  return activeStage?.material || "concrete";
}

function footstepKeysForMaterial(material) {
  const map = {
    concrete: ["footstep_concrete_1", "footstep_concrete_2", "footstep_concrete_3", "footstep_concrete_4"],
    wood: ["footstep_wood_1", "footstep_wood_2", "footstep_wood_3", "footstep_wood_4"],
    snow: ["footstep_snow_1", "footstep_snow_2", "footstep_snow_3", "footstep_snow_4"],
    nature: ["footstep_nature_1", "footstep_nature_2", "footstep_nature_3", "footstep_nature_4"],
    gravel: ["footstep_gravel_1", "footstep_gravel_2", "footstep_gravel_3", "footstep_gravel_4"],
    laminate: ["footstep_laminate_1", "footstep_laminate_2", "footstep_laminate_3", "footstep_laminate_4"]
  };
  return map[material] || map.concrete;
}

function maybePlayPlayerFootstep(sneaking, movedDistance) {
  if (mode !== "running" || movedDistance < 0.75) return;
  const t = nowSec();
  const interval = sneaking ? 0.58 : 0.31;
  if (t - lastPlayerFootstepAt < interval) return;
  lastPlayerFootstepAt = t;
  playFootstepSound(stageFootstepMaterial(), sneaking, 1);
}

function maybePlayBotFootstep(bot, movedDistance) {
  if (mode !== "running" || !bot.alive || movedDistance < 0.65) return;

  const t = nowSec();
  const interval = bot.role === "boss" || bot.role === "duelist" ? 0.34 : 0.39;
  if (bot.lastFootstepAt && t - bot.lastFootstepAt < interval) return;

  const d = dist(player, bot);
  if (d > 390) return;

  bot.lastFootstepAt = t;
  const sneaking = bot.state === "search" && bot.suspicion < 44;
  const distanceScale = clamp(1 - d / 420, 0.12, 0.72);
  const stateBoost = bot.state === "attack" ? 1.18 : sneaking ? 0.55 : 0.85;
  playFootstepSound(stageFootstepMaterial(), sneaking, distanceScale * stateBoost, Math.random() < 0.16);
}

function updatePlayer(dt) {
  let x = 0;
  let y = 0;
  if (keys.has("w")) y -= 1;
  if (keys.has("s")) y += 1;
  if (keys.has("a")) x -= 1;
  if (keys.has("d")) x += 1;

  const moving = x || y;
  player.moveIntent = moving ? 1 : 0;
  const sneaking = keys.has("shift");
  player.dashCd = Math.max(0, (player.dashCd || 0) - dt);
  player.dashInvuln = Math.max(0, (player.dashInvuln || 0) - dt);

  if (player.dashTime > 0) {
    resumeAudio();
    const movedDistance = moveEntity(player, Math.cos(player.dashAngle) * playerDashSpeed() * dt, Math.sin(player.dashAngle) * playerDashSpeed() * dt);
    player.dashTime = Math.max(0, player.dashTime - dt);
    player.noise = 170;
    if (movedDistance > 1.2 && Math.random() < 0.85) addMovementTrace(player.x, player.y, player.dashAngle, { t: 0.7, color: "#7cc7ff", owner: "player", kind: "dash", size: 1.15 });
  } else if (moving) {
    resumeAudio();
    const speed = player.baseSpeed * runStats.moveMult * (sneaking ? 0.55 : 1);
    const l = len(x, y);
    const movedDistance = moveEntity(player, (x / l) * speed * dt, (y / l) * speed * dt);
    player.noise = sneaking ? 44 * runStats.sneakNoiseMult : 112;
    maybePlayPlayerFootstep(sneaking, movedDistance);
    maybeLeavePlayerFootprint(movedDistance, sneaking);
  } else {
    player.noise = 10;
  }

  updatePickups();

  mouse.x = screenMouseX() + camera.x;
  mouse.y = screenMouseY() + camera.y;
  player.angle = angleTo(player, mouse);
  player.shotCd = Math.max(0, player.shotCd - dt);
  player.fireBuffer = Math.max(0, player.fireBuffer - dt);
  player.nearMissCd = Math.max(0, player.nearMissCd - dt);
  player.pulseCd = Math.max(0, player.pulseCd - dt);
  player.pulseActive = Math.max(0, player.pulseActive - dt);
  player.spotted = Math.max(0, player.spotted - dt);

  if (player.reload > 0) {
    player.reload -= dt;
    if (player.reload <= 0) {
      player.ammo = player.maxAmmo;
      addLog("Reload complete.");
    }
  }

  echoes.push({ x: player.x, y: player.y, t: nowSec(), kind: "player" });
  while (echoes.length > 180) echoes.shift();

  if (mouse.down || player.fireBuffer > 0) shootPlayer();
}

function doPlayerDash() {
  if (mode !== "running" || gameOver || player.dashCd > 0 || player.dashTime > 0) return;

  let x = 0;
  let y = 0;
  if (keys.has("w")) y -= 1;
  if (keys.has("s")) y += 1;
  if (keys.has("a")) x -= 1;
  if (keys.has("d")) x += 1;

  player.dashAngle = x || y ? Math.atan2(y, x) : player.angle;
  player.dashTime = bossAbilityActive("null_flicker") ? 0.18 : 0.15;
  player.dashInvuln = 0.24;
  player.dashCd = dashCooldownTime();
  player.noise = 170;
  addMovementTrace(player.x, player.y, player.dashAngle, { t: 1.0, color: "#7cc7ff", owner: "player", kind: "dash", size: 1.35 });
  addParticles("dust", player.x, player.y, player.dashAngle, 16);
  addScreenFlash(0.022);
  playAssetSfx("fps_weapon_change", 0.28);
  if (bossAbilityActive("vanta_smoke_step")) addSmoke(player.x, player.y, 72, 2.2, "#7cc7ff");
}


function shootPlayer() {
  if (player.shotCd > 0 || player.reload > 0 || gameOver || mode !== "running") return;

  if (player.ammo <= 0) {
    playAssetSfx("gun_empty", 0.32);
    startReload();
    return;
  }

  const weapon = currentWeapon();
  const firingAngle = aimAssistAngle(player.angle, weapon);
  player.fireBuffer = 0;
  player.ammo -= 1;
  player.shotCd = weapon.fireDelay;
  player.noise = weapon.noise;
  player.shots += 1;
  player.recoil = Math.max(player.recoil, weapon.recoil);
  player.weaponHeat = Math.min(1, player.weaponHeat + (weapon.id === "smg" ? 0.09 : weapon.id === "lmg" ? 0.07 : 0.035) * (runStats.heatMult || 1));
  addShake(weapon.shake);
  addScreenFlash(0.025);
  playSfx("shot", weapon.shake, weapon.shotSfx);

  const muzzle = playerBarrelPoint(firingAngle);
  addMuzzleFlash(muzzle.x, muzzle.y, firingAngle, weapon);
  addShellCasing(firingAngle, weapon);

  let hitBot = false;
  for (let i = 0; i < weapon.pellets; i++) {
    const spreadRadius = Math.max(0.006, weapon.spread + player.weaponHeat * weapon.heatSpread);
    const pelletSpread = rand(-spreadRadius, spreadRadius);
    const pelletAngle = firingAngle + pelletSpread;
    const didHitBot = firePlayerBullet(pelletAngle, weapon, muzzle);
    hitBot = hitBot || didHitBot;
  }

  for (const bot of bots) {
    if (!bot.alive) continue;
    bot.memory.shotsHeard += 1;
    if (dist(bot, player) < 365) {
      bot.lastHeard = safePointNear(player.x, player.y, 48);
      bot.suspicion = Math.max(bot.suspicion, weapon.id === "smg" ? 56 : 42);
      if (bot.state === "patrol") {
        bot.state = "search";
        bot.thinkPause = Math.max(bot.thinkPause || 0, rand(0.05, 0.18));
      }
      if (weapon.id === "smg" && bot.state === "attack" && Math.random() < 0.35) {
        bot.flinch = Math.max(bot.flinch, 0.05);
      }
      if (currentFloor >= 2) queueIntel(bot, player.x, player.y, 0.45, "shot sound", rand(0.18, 0.65));
    }
  }

  if (hitBot && currentFloor >= 2) {
    queueIntel(null, player.x, player.y, 0.7, "hit confirmed", rand(0.12, 0.5));
  }

  if (player.ammo <= 0) startReload();
}

function tryBotDodge(bot, shotAngle, weapon) {
  if (!bot.alive || bot.dodgeCd > 0 || bot.stagger > 0 || bot.flinch > 0.08) return false;
  const baseChance = bot.role === "boss" ? 0.34 : bot.role === "duelist" ? 0.24 : currentFloor >= 4 ? 0.09 : 0.035;
  const weaponPenalty = weapon.id === "shotgun" || weapon.id === "breacher" ? 0.55 : 1;
  if (Math.random() > baseChance * weaponPenalty) return false;

  const side = Math.random() < 0.5 ? -1 : 1;
  const angle = shotAngle + side * Math.PI * 0.5 + rand(-0.25, 0.25);
  const sx = bot.x;
  const sy = bot.y;
  const moved = moveEntity(bot, Math.cos(angle) * rand(38, bot.role === "boss" ? 74 : 58), Math.sin(angle) * rand(38, bot.role === "boss" ? 74 : 58));
  if (moved < 8) return false;

  bot.dodgeCd = bot.role === "boss" ? rand(0.72, 1.08) : rand(1.1, 1.75);
  bot.dodgeInvuln = 0.2;
  bot.speedBurst = Math.max(bot.speedBurst || 0, 0.18);
  bot.panic = Math.max(bot.panic || 0, 0.28);
  bot.target = safePointNear(bot.x + Math.cos(angle) * 70, bot.y + Math.sin(angle) * 70, 46);
  addMovementTrace(sx, sy, angle, { t: 1.0, color: bot.color || "#ff5c7a", owner: "bot", kind: "dash", boss: bot.role === "boss", size: bot.role === "boss" ? 1.25 : 1 });
  addParticles("dust", bot.x, bot.y, angle, bot.role === "boss" ? 12 : 7);
  floatText.push({ x: bot.x, y: bot.y - 24, text: "dodge", t: 0.55 });
  return true;
}

function firePlayerBullet(ang, weapon, muzzle) {
  const range = weapon.id === "shotgun" ? 510 : 900;
  const end = rayBlocked(player, ang, range);
  const wallHit = dist(player, end) < range - 4;

  let hitTarget = null;
  let hitKind = "";
  let hitDist = wallHit ? dist(player, end) : Infinity;

  for (const item of breakables) {
    if (!item.alive) continue;
    const along = lineCircleHit(item, player, end, 5);
    if (along !== null && along < hitDist && hasLineOfSight(player, item)) {
      hitTarget = item;
      hitKind = "breakable";
      hitDist = along;
    }
  }

  for (const bot of bots) {
    if (!bot.alive) continue;
    const along = lineCircleHit(bot, player, end, 4);
    if (along !== null && along < hitDist && hasLineOfSight(player, bot)) {
      hitTarget = bot;
      hitKind = "bot";
      hitDist = along;
    }
  }

  const hitPoint = hitKind
    ? closestPointOnLine(hitTarget, player, end)
    : end;

  bullets.push({
    x1: muzzle.x,
    y1: muzzle.y,
    x2: hitPoint.x,
    y2: hitPoint.y,
    t: weapon.tracerTime,
    maxT: weapon.tracerTime,
    owner: "player",
    color: weapon.color,
    width: weapon.id === "shotgun" ? 1.4 : weapon.id === "smg" ? 1.2 : 1.8
  });

  suppressBotsAlongLine(player, hitPoint, weapon, hitKind === "bot" ? hitTarget : null);

  if (hitKind === "bot") {
    if (hitTarget.dodgeInvuln > 0 || tryBotDodge(hitTarget, ang, weapon)) return false;
    const dmg = rand(weapon.damage[0], weapon.damage[1]) * runStats.damageMult;
    damageBot(hitTarget, dmg, ang, weapon, hitPoint);
    tryPierceBot(hitTarget, hitPoint, ang, weapon);
    player.hits += 1;
    shareIntel(hitTarget, player.x, player.y, 0.85, "shot contact");
    return true;
  }

  if (hitKind === "breakable") {
    damageBreakable(hitTarget, rand(weapon.damage[0], weapon.damage[1]) * runStats.damageMult, hitPoint, ang, weapon);
    return false;
  }

  if (wallHit) {
    addImpact("wall", hitPoint.x, hitPoint.y, ang, weapon);
    tryRicochet(player, hitPoint, ang, weapon);
  }

  return false;
}

function closestPointOnLine(p, a, b) {
  const ax = p.x - a.x;
  const ay = p.y - a.y;
  const bx = b.x - a.x;
  const by = b.y - a.y;
  const denom = bx * bx + by * by || 1;
  const t = clamp((ax * bx + ay * by) / denom, 0, 1);
  return { x: a.x + bx * t, y: a.y + by * t };
}

function startReload() {
  if (player.reload > 0 || player.ammo === player.maxAmmo || mode !== "running") return;
  player.reload = currentWeapon().reloadTime * runStats.reloadMult;
  player.noise = Math.max(player.noise, 85);
  playAssetSfx("reload", 0.48);
  addLog("Reloading.");
  if (currentFloor >= 3) {
    for (const bot of bots) {
      if (!bot.alive) continue;
      if (dist(bot, player) < 470) queueIntel(bot, player.x, player.y, 0.5, "reload heard", rand(0.25, 0.9));
    }
  }
}

function pulse() {
  if (player.pulseCd > 0 || gameOver || mode !== "running") return;
  player.pulseCd = 6.5 * runStats.pulseCdMult;
  player.pulseActive = 1.45 + Math.min(1.1, runStats.echoDuration - 2.6);
  addLog("Pulse used. Echoes revealed.");
  for (const bot of bots) {
    if (!bot.alive) continue;
    if (dist(player, bot) < runStats.pulseRange) {
      revealStealth(bot, 1.65);
      floatText.push({ x: bot.x, y: bot.y - 18, text: "echo", t: 2.0 });
    }
  }
}

function damageBot(bot, dmg, angle = angleTo(player, bot), weapon = currentWeapon(), hitPoint = bot) {
  bot.hp -= dmg;
  bot.panic = Math.max(bot.panic, bot.role === "boss" ? 0.62 : 1.0);
  bot.recentlyHit = 0.45;
  bot.flash = 0.12;
  revealStealth(bot, weapon.id === "shotgun" || weapon.id === "dmr" ? 1.75 : 1.35);
  bot.flinch = Math.max(bot.flinch, weapon.id === "shotgun" ? 0.2 : 0.11);
  bot.stagger = Math.max(bot.stagger, dmg > 40 || weapon.id === "shotgun" ? 0.16 : 0);
  bot.thinkPause = Math.max(bot.thinkPause || 0, bot.role === "boss" ? 0.05 : rand(0.06, 0.16));
  bot.suppressed = Math.max(bot.suppressed || 0, weapon.suppression ? 0.28 : 0);
  bot.suspicion = 100;
  bot.lastSeen = { x: player.x, y: player.y, t: nowSec() };
  bot.lastHeard = safePointNear(player.x, player.y, 42);
  bot.state = bot.hp < bot.maxHp * 0.45 ? "search" : "attack";
  bot.coverTimer = 0;
  applyKnockback(bot, angle, weapon.knockback);
  addImpact("bot", hitPoint.x, hitPoint.y, angle, weapon);
  addParticles("blood", hitPoint.x, hitPoint.y, angle, weapon.id === "shotgun" || weapon.id === "breacher" ? 10 : 5);
  if (dmg > 45 || weapon.id === "shotgun" || weapon.id === "dmr") addDecal("blood", hitPoint.x, hitPoint.y, angle, 10);
  playSfx("hit", Math.min(2, dmg / 35));
  if (weapon.dot) applyDamageOverTime(bot, weapon.dot);
  if (bossAbilityActive("venom_rounds")) applyDamageOverTime(bot, { damage: 4, ticks: 2, interval: 0.45 });
  floatText.push({ x: bot.x, y: bot.y - 20, text: Math.round(dmg).toString(), t: 0.65 });

  if (bot.hp <= 0) {
    bot.alive = false;
    bot.flash = 0;
    player.kills += 1;
    addParticles("blood", bot.x, bot.y, angle, weapon.id === "shotgun" || weapon.id === "breacher" ? 34 : 20);
    addParticles("spark", bot.x, bot.y, angle, weapon.id === "dmr" || weapon.id === "revolver" ? 14 : 6);
    addDecal("blood", bot.x, bot.y, angle, weapon.id === "shotgun" || weapon.id === "breacher" ? 30 : 18);
    addDecal("blood", bot.x + rand(-10, 10), bot.y + rand(-10, 10), angle, weapon.id === "dmr" ? 22 : 14);
    addLog(`${bot.name} down.`);
    if (bots.every(b => !b.alive)) startFinalKillReplay(bot, angle, weapon, hitPoint);
  }
}

function applyDamageOverTime(bot, dot) {
  if (!bot.alive) return;
  for (let i = 1; i <= dot.ticks; i++) {
    setTimeout(() => {
      if (!bot.alive || mode !== "running") return;
      bot.hp -= dot.damage;
      bot.flash = Math.max(bot.flash, 0.06);
      addParticles("spark", bot.x, bot.y, rand(-Math.PI, Math.PI), 2);
      floatText.push({ x: bot.x, y: bot.y - 20, text: Math.round(dot.damage).toString(), t: 0.45 });
      if (bot.hp <= 0) {
        bot.alive = false;
        player.kills += 1;
        addLog(`${bot.name} down.`);
        if (bots.every(b => !b.alive)) startFinalKillReplay(bot, rand(-Math.PI, Math.PI), currentWeapon(), bot);
      }
    }, dot.interval * i * 1000);
  }
}

function damagePlayer(dmg, botName) {
  if (player.dashInvuln > 0) {
    maybeNearMiss(player, botName);
    floatText.push({ x: player.x + rand(-14, 14), y: player.y - 30, text: "dodged", t: 0.45 });
    return;
  }

  const attacker = bots.find(bot => bot.name === botName);
  const bossReadMult = attacker?.role === "boss" ? Math.max(0.78, 1 - powerRank("bossRead") * 0.055) : 1;
  const guardMult = bossAbilityActive("graves_guard") ? 0.72 : 1;
  dmg *= Math.max(0.7, 1 - powerRank("armor") * 0.06) * bossReadMult * guardMult;

  if (player.reflexReady > 0) {
    player.reflexReady -= 1;
    dmg *= 0.3;
    addLog("Reflex Buffer softened the hit.");
  }

  player.hp = Math.max(0, player.hp - dmg);
  chipBossAbilityFromHit();
  player.spotted = 0.65;
  addShake(2.2);
  addScreenFlash(0.08);
  addParticles("spark", player.x, player.y, rand(-Math.PI, Math.PI), 4);
  floatText.push({ x: player.x, y: player.y - 22, text: `-${Math.round(dmg)}`, t: 0.7 });

  if (player.hp <= 0) {
    const attacker = bots.find(bot => bot.name === botName);
    if (attacker?.role === "boss" && runStats?.retries > 0) {
      runStats.retries -= 1;
      const hub = ensureHubSave();
      hub.retries = Math.max(0, (Number(hub.retries) || 0) - 1);
      saveGame();
      player.hp = Math.max(28, Math.round(player.maxHp * 0.6));
      player.dashCd = 0;
      player.pulseCd = Math.min(player.pulseCd, 1.2);
      addSmoke(player.x, player.y, 80, "player");
      addParticles("reward", player.x, player.y - 6, -Math.PI / 2, 16);
      floatText.push({ x: player.x - 24, y: player.y - 36, text: "RETRY", t: 1.2 });
      addLog("Mira's Ward pulled you back into the fight.");
      return;
    }
    endTower(false, botName);
  }
}

function startFinalKillReplay(bot, angle, weapon, hitPoint = bot) {
  if (mode === "killReplay" || mode === "floorClear") return;

  running = false;
  mode = "killReplay";
  killReplayClearQueued = false;
  killReplay = {
    start: nowSec(),
    duration: 1.9,
    x: bot.x,
    y: bot.y,
    hitX: hitPoint.x,
    hitY: hitPoint.y,
    fromX: player.x,
    fromY: player.y,
    angle,
    weaponName: weapon.name,
    weaponColor: weapon.color,
    botName: bot.name,
    botColor: bot.color,
    sprite: bot.profile?.sprite || (bot.role === "boss" ? "boss_vanta" : "enemy_vanta"),
    boss: bot.role === "boss"
  };

  addShake(5.2 + weapon.shake * 0.7);
  addScreenFlash(0.16);
  addHitStop(0.06);
  playSfx("explosion");
  addParticles("fire", bot.x, bot.y, angle, bot.role === "boss" ? 34 : 22);
  addParticles("spark", bot.x, bot.y, angle, bot.role === "boss" ? 26 : 16);
  addParticles("blood", bot.x, bot.y, angle, bot.role === "boss" ? 20 : 12);
  addDecal("blood", bot.x, bot.y, angle, bot.role === "boss" ? 22 : 16);
}

function updateKillReplay(rawDt) {
  if (!killReplay) return;

  const elapsed = nowSec() - killReplay.start;
  const p = clamp(elapsed / killReplay.duration, 0, 1);

  cameraShake = Math.max(cameraShake, (1 - p) * 3.4);
  screenFlash = Math.max(screenFlash, Math.max(0, 0.12 - p * 0.16));

  if (Math.random() < 0.8) {
    addParticles(Math.random() < 0.5 ? "fire" : "spark", killReplay.x + rand(-10, 10), killReplay.y + rand(-10, 10), rand(-Math.PI, Math.PI), 1);
  }

  if (elapsed >= killReplay.duration && !killReplayClearQueued) {
    killReplayClearQueued = true;
    const replayName = killReplay.botName;
    killReplay = null;
    addLog(`Final hit replay: ${replayName}.`);
    clearFloor();
  }
}

function drawKillReplayOverlay() {
  if (!killReplay) return;

  const elapsed = nowSec() - killReplay.start;
  const p = clamp(elapsed / killReplay.duration, 0, 1);
  const ring = 18 + p * 96;
  const alpha = 1 - p;
  const from = worldToScreen({ x: killReplay.fromX, y: killReplay.fromY });
  const hit = worldToScreen({ x: killReplay.hitX, y: killReplay.hitY });
  const center = worldToScreen({ x: killReplay.x, y: killReplay.y });

  ctx.save();

  ctx.strokeStyle = hexToRgba(killReplay.weaponColor, 0.75 * alpha);
  ctx.lineWidth = 3;
  ctx.shadowColor = killReplay.weaponColor;
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(hit.x, hit.y);
  ctx.stroke();

  ctx.shadowBlur = 22;
  ctx.strokeStyle = `rgba(255, 211, 90, ${0.85 * alpha})`;
  ctx.lineWidth = 3 + p * 4;
  ctx.beginPath();
  ctx.arc(center.x, center.y, ring, 0, Math.PI * 2);
  ctx.stroke();

  const sprite = imageAsset(killReplay.sprite);
  if (sprite && p < 0.72) {
    const size = (killReplay.boss ? 42 : 34) * (1 + p * 0.55);
    ctx.globalAlpha = 0.75 * (1 - p * 0.7);
    ctx.translate(center.x, center.y);
    ctx.rotate(killReplay.angle + p * 1.2);
    ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fillRect(0, 0, W, 54);
  ctx.fillRect(0, H - 54, W, 54);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 26px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.shadowColor = "rgba(255, 92, 122, 0.75)";
  ctx.shadowBlur = 10;
  ctx.fillText("FINAL HIT", W / 2, 37);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(240,242,255,0.86)";
  ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText(`${killReplay.weaponName} eliminated ${killReplay.botName}`, W / 2, H - 23);

  ctx.restore();
}

function clearFloor() {
  killReplay = null;
  running = false;
  mode = "floorClear";
  const routeBonus = activeRouteType === "cache" ? 1 : isBossFloor(currentFloor) ? 3 : 0;
  const omen = activeVillageOmen();
  const omenShardBonus = (omen?.rivalShardBonus && activeRouteType === "rival" ? omen.rivalShardBonus : 0) + (omen?.bossShardBonus && isBossFloor(currentFloor) ? omen.bossShardBonus : 0);
  const reward = currentFloor + routeBonus + omenShardBonus + Math.max(0, Math.floor((player.hp / player.maxHp) * 2)) + powerRank("luck") + powerRank("contractPay");
  runStats.clearStreak += 1;
  if (runStats.bossAbility && !runStats.bossAbility.pending) expireBossAbility(`${runStats.bossAbility.name} faded after the floor.`);
  const suppliesFound = storySupplyRewardForFloor(currentFloor) + (activeStoryMode && omen?.supplyBonus ? omen.supplyBonus : 0);
  save.shards += reward;
  save.bestFloor = Math.max(save.bestFloor, currentFloor);
  save.totalClears += 1;
  if (suppliesFound) addVillageSupplies(suppliesFound, "found on this floor");
  const hub = ensureHubSave();
  hub.hope = (Number(hub.hope) || 0) + 1;
  hub.lastHelp = `+1 hope for clearing floor ${currentFloor}.`;
  saveGame();
  checkVillageAchievements("floor");

  pendingFloorReward = {
    floor: currentFloor,
    reward,
    suppliesFound,
    hpBonus: Math.max(0, Math.floor((player.hp / player.maxHp) * 2)),
    omenShardBonus,
    cacheFloor: isWeaponCacheFloor(currentFloor),
    towerClear: currentFloor >= 8
  };

  addLog(`Floor ${currentFloor} clear. +${reward} shards.`);
  playSfx("reward");
  showFloorClearCelebration(pendingFloorReward);
  expireVillagePrepEffects();
}

function isWeaponCacheFloor(floor = currentFloor) {
  return activeRouteType === "cache" || floor === 1;
}

function makeConfettiLayer(count = 54) {
  return Array.from({ length: count }, () => {
    const left = Math.round(rand(3, 97));
    const delay = rand(0, 1.2).toFixed(2);
    const duration = rand(1.6, 3.0).toFixed(2);
    const hue = choice(["#ffd35a", "#7cc7ff", "#7dffb2", "#ff5c7a", "#c77dff", "#ffffff"]);
    return `<i style="--x:${left}vw; --d:${delay}s; --t:${duration}s; --c:${hue}; --r:${Math.round(rand(-360,360))}deg"></i>`;
  }).join("");
}

function makeTreasureSparkles(count = 72) {
  return Array.from({ length: count }, () => {
    const angle = rand(-Math.PI * 0.92, -Math.PI * 0.08);
    const distance = rand(70, 250);
    const x = Math.round(Math.cos(angle) * distance);
    const y = Math.round(Math.sin(angle) * distance);
    const delay = rand(0, 1.1).toFixed(2);
    const duration = rand(0.95, 1.8).toFixed(2);
    const size = Math.round(rand(3, 9));
    const color = choice(["#fff8cc", "#ffd35a", "#ff8adb", "#8cf4ff", "#7dffb2", "#ffffff"]);
    return `<i style="--tx:${x}px; --ty:${y}px; --d:${delay}s; --t:${duration}s; --s:${size}px; --c:${color}"></i>`;
  }).join("");
}

function showFloorClearCelebration(info) {
  const confetti = makeConfettiLayer(54);

  const jackpotText = info.cacheFloor ? "WEAPON CACHE FOUND" : isBossFloor(info.floor) ? "BOSS DEFEATED" : "FLOOR CLEAR";
  const subText = info.towerClear ? "Tower route complete." : `Route choice unlocked for floor ${info.floor + 1}.`;

  openOverlay(`
    <div class="vsScreen framedScreen celebrationScreen">
      <div class="confettiLayer">${confetti}</div>
      ${renderTopStrip(`Floor ${info.floor} Clear`, "backMenu")}
      <div class="vsPanel celebrationPanel">
        <div class="slotHeader">${jackpotText}</div>
        <div class="slotReels">
          <div class="slotReel"><span>+${info.reward}</span><small>SHARDS</small></div>
          <div class="slotReel"><span>${player.kills}</span><small>KILLS</small></div>
          <div class="slotReel"><span>${Math.round(player.hp)}</span><small>HP LEFT</small></div>
        </div>
        <h2>${info.towerClear ? "TOWER CLEAR" : "NICE CLEANUP"}</h2>
        <p class="panelLead">${subText} ${info.cacheFloor ? "Cache floors can change the whole run." : "Pick one reward and keep climbing."}</p>
        <div class="celebrationPayout">
          <b>+${info.reward} shards banked</b>
          <span>+1 hope earned. ${info.suppliesFound ? `+${info.suppliesFound} village supplies found` : info.hpBonus > 0 ? `Survival bonus: +${info.hpBonus}` : "No village supplies this floor"}</span>
        </div>
        <div class="menuActions">
          <button class="vsButton green jackpotButton" data-action="claimFloorReward">${info.towerClear ? "CLAIM TOWER" : activeStoryMode ? "CLAIM REWARD" : "CLAIM AND CHOOSE ROUTE"}</button>
        </div>
      </div>
    </div>
  `, "celebrationMenu");
}

function claimFloorReward() {
  if (!pendingFloorReward) return;
  if (pendingFloorReward.towerClear) {
    endTower(true);
    return;
  }
  showRewardChoices();
}

function showRewardChoices() {
  offeredRewards = pickRewardChoices();
  offeredUpgrades = offeredRewards.filter(reward => reward.type === "upgrade").map(reward => reward.data);

  const cards = offeredRewards.map((reward, index) => {
    if (reward.type === "weapon") return weaponRewardCard(reward.data, index);
    return upgradeRewardCard(reward.data, index);
  }).join("");

  const cacheFloor = isWeaponCacheFloor(currentFloor);
  const title = cacheFloor ? "Weapon Cache" : isBossFloor(currentFloor) ? "Boss Reward" : "Run Reward";
  const lead = cacheFloor
    ? `Pick one prize before floor ${currentFloor + 1}. Weapons are rare, so this room matters.`
    : isBossFloor(currentFloor)
      ? `Pick one reward. Boss abilities last for the next floor or until you take three hits.`
      : `Choose one temporary tool before climbing to floor ${currentFloor + 1}.`;
  const confetti = cacheFloor ? `<div class="confettiLayer cacheConfetti">${makeConfettiLayer(64)}</div>` : "";
  const slotStrip = cacheFloor ? `
    <div class="cacheTreasureBox">
      <div class="cacheTreasureTitle">Treasure Found!</div>
      <div class="cacheTreasureGlow"></div>
      <div class="cacheTreasureSparkles">${makeTreasureSparkles(90)}</div>
      <div class="cacheTreasureChest"><i></i><b></b><em></em></div>
      <div class="cachePrizeRibbon">Pick one prize before floor ${currentFloor + 1}</div>
    </div>
  ` : "";

  openOverlay(`
    <div class="vsScreen framedScreen levelUpScreen rewardChoiceScreen ${cacheFloor ? "cacheChoiceScreen" : ""}">
      ${confetti}
      ${renderTopStrip(`Floor ${currentFloor} Reward`, "backMenu")}
      <div class="vsPanel levelPanel">
        <h2>${title}</h2>
        ${slotStrip}
        <p class="panelLead">${lead}</p>
        <div class="upgradeGrid">${cards}</div>
        <div class="vsDetailBar">
          <div class="powerIcon big">${cacheFloor ? "W" : isBossFloor(currentFloor) ? "B" : "+"}</div>
          <div>
            <b>${cacheFloor ? "Pick a prize" : isBossFloor(currentFloor) ? "Boss power" : "Post floor choice"}</b>
            <p>${cacheFloor ? "Choose the strongest card for this run. A weapon pick can change every fight after this." : "Most rewards improve your tools for the current climb."}</p>
          </div>
        </div>
      </div>
    </div>
  `, "levelUpMenu");
}


function pickRewardChoices() {
  const cacheFloor = isWeaponCacheFloor(currentFloor);
  const rewards = [];
  const weaponPool = weightedWeaponPool(cacheFloor);
  const upgradePool = [...RUN_UPGRADES];

  if (isBossFloor(currentFloor)) {
    const bossReward = bossAbilityRewardForFloor(currentFloor);
    if (bossReward) rewards.push({ type: "upgrade", data: bossReward });
  }

  const rareWeapon = !cacheFloor && weaponPool.length && Math.random() < Math.min(0.22, 0.08 + currentFloor * 0.018);
  const weaponCount = cacheFloor ? Math.min(2, weaponPool.length) : rareWeapon ? 1 : 0;

  while (rewards.length < weaponCount && weaponPool.length) {
    const index = Math.floor(Math.random() * weaponPool.length);
    rewards.push({ type: "weapon", data: weaponPool.splice(index, 1)[0] });
  }

  while (rewards.length < 3 && upgradePool.length) {
    const index = Math.floor(Math.random() * upgradePool.length);
    rewards.push({ type: "upgrade", data: upgradePool.splice(index, 1)[0] });
  }

  return rewards.sort(() => Math.random() - 0.5);
}


function weightedWeaponPool(cacheFloor) {
  const held = new Set(runStats.weapons || []);
  const floor = currentFloor;
  const pool = [];

  for (const weapon of WEAPONS) {
    if (held.has(weapon.id)) continue;

    const unlockFloor = {
      smg: 2,
      shotgun: 2,
      carbine: 3,
      revolver: 3,
      needler: 4,
      dmr: 5,
      breacher: 6,
      lmg: 6
    }[weapon.id] || 1;

    if (floor < unlockFloor) continue;

    const weight = cacheFloor ? 2.4 : 0.45;
    for (let i = 0; i < Math.ceil(weight * 2); i++) pool.push(weapon);
  }

  return [...new Map(pool.map(weapon => [weapon.id, weapon])).values()];
}

function chooseReward(index) {
  const reward = offeredRewards[index];
  if (!reward || mode !== "floorClear") return;

  playAssetSfx(isWeaponCacheFloor(currentFloor) ? "cache_upgrade" : "bonus_chime", isWeaponCacheFloor(currentFloor) ? 0.58 : 0.28);

  if (reward.type === "weapon") {
    acquireWeapon(reward.data.id);
  } else {
    reward.data.apply();
    runStats.upgrades.push(reward.data.name);
    addLog(`${reward.data.bossAbility ? "Boss ability" : "Upgrade"} acquired: ${reward.data.name}.`);
  }

  const floorInfo = pendingFloorReward || {};
  pendingFloorReward = null;
  if (activeStoryMode && currentFloor < 8) {
    villagePendingRouteFloor = currentFloor + 1;
    if (floorInfo.suppliesFound || floorInfo.reward) {
      const hub = ensureHubSave();
      hub.lastReturnCard = {
        floor: currentFloor,
        suppliesFound: floorInfo.suppliesFound || 0,
        shardsFound: floorInfo.reward || 0,
        request: activeBoardTask()?.title || "Board work",
        status: activeVillageDailyEvent()?.name || "quiet",
        omen: activeVillageOmen()?.name || "none",
        ts: Date.now()
      };
      saveGame();
    }
  }
  showRouteChoices(currentFloor + 1);
}

function showUpgradeChoices() {
  showRewardChoices();
}

function pickUpgradeChoices() {
  const pool = [...RUN_UPGRADES];
  const picks = [];
  while (picks.length < 3 && pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(i, 1)[0]);
  }
  return picks;
}

function chooseUpgrade(index) {
  const upgrade = offeredUpgrades[index];
  if (!upgrade || mode !== "floorClear") return;
  upgrade.apply();
  runStats.upgrades.push(upgrade.name);
  addLog(`Upgrade acquired: ${upgrade.name}.`);
  showRouteChoices(currentFloor + 1);
}

function showRouteChoices(nextFloor) {
  if (activeStoryMode) villagePendingRouteFloor = nextFloor;
  if (nextFloor > 8) {
    endTower(true);
    return;
  }

  mode = "routeChoice";
  const routes = buildRouteChoices(nextFloor);
  const townChoice = activeStoryMode ? `<button class="vsButton blue" data-action="backVillage">TOWN</button>` : "";
  const cards = routes.map(route => `
    <button class="routeCard ${route.kind}" data-action="chooseRoute" data-route="${route.kind}">
      <span class="routeTag">${route.tag}</span>
      <b>${route.name}</b>
      <p>${route.desc}</p>
      <small>${route.read}</small>
    </button>
  `).join("");

  openOverlay(`
    <div class="vsScreen framedScreen routeChoiceScreen">
      ${renderTopStrip(`Floor ${nextFloor} Route`, activeStoryMode && villagePendingRouteFloor === nextFloor ? "backVillage" : "backMenu")}
      <div class="vsPanel levelPanel routePanel">
        <h2>Choose Next Floor</h2>
        <p class="panelLead">${activeStoryMode ? "Choose the next floor. Some paths are safer, some have supplies, and some lead to a boss." : "Choose the next floor. Safe fight, supply room, or hard fight."} ${activeVillageOmen()?.text || ""}</p>
        <div class="routeGrid">${cards}</div>
        <div class="vsDetailBar">
          <div class="powerIcon big">?</div>
          <div>
            <b>Continue or restock</b>
            <p>Pick a route to keep climbing, or go to town and come back to this floor.</p>
          </div>
        </div>
        <div class="menuActions">${townChoice}</div>
      </div>
    </div>
  `, "routeMenu");
}

function buildRouteChoices(nextFloor) {
  if (BOSS_FLOORS.has(nextFloor)) {
    return [
      {
        kind: "boss",
        tag: "BOSS",
        name: "Boss Door",
        desc: "One boss blocks the stairs to the next part of the tower.",
        read: "Reward: stairs open. Danger: stronger weapon and better aim."
      }
    ];
  }

  return [
    {
      kind: "standard",
      tag: "SAFE",
      name: "Normal Floor",
      desc: "A regular fight with normal cover and a steady shard reward.",
      read: "Reward: regular shards. Danger: basic guards."
    },
    {
      kind: "cache",
      tag: "SUPPLY",
      name: "Supply Room",
      desc: "A guarded room with a better chance to find a weapon.",
      read: "Reward: weapon pick and shards. Danger: tighter room."
    },
    {
      kind: "rival",
      tag: "HARD",
      name: "Hard Fight",
      desc: "A stronger enemy stands between you and the next floor.",
      read: "Reward: more shards. Danger: sharper aim, smoke, and better cover use."
    }
  ];
}

function chooseRoute(kind) {
  const valid = new Set(["standard", "cache", "rival", "boss"]);
  nextRouteType = valid.has(kind) ? kind : "standard";
  villagePendingRouteFloor = 0;
  lastRouteChoice = nextRouteType;
  addLog(`Path selected: ${nextRouteType}.`);
  applyVillagePrepToRunStats("gate");
  startFloor(currentFloor + 1);
}


function endTower(won, killer = "") {
  running = false;
  gameOver = true;
  towerCleared = won;
  mode = "gameOver";
  message = won ? "Tower clear." : `Killed by ${killer}.`;

  stopMusic();

  if (activeStoryMode) refillVillageEnergy(won ? "chapter clear" : "run failed");

  if (won) {
    save.bestFloor = Math.max(save.bestFloor, currentFloor);
    save.shards += 8 + (activeStoryMode ? 4 : 0);
    if (activeStoryMode) {
      save.storyClears = (save.storyClears || 0) + 1;
      if (!save.completedChapters.includes(activeStoryChapterId)) save.completedChapters.push(activeStoryChapterId);
      addVillageSupplies(3, "brought home from the chapter");
    }
    saveGame();
    playAssetSfx("voice_you_win", 0.36);
    playAssetSfx("bonus_chime", 0.36);
  } else {
    save.bestFloor = Math.max(Number(save.bestFloor) || 0, Number(currentFloor) || 1);
    saveGame();
    playAssetSfx("defeat_outro", 0.42);
    playAssetSfx("game_over_balanced", 0.24);
    playAssetSfx("voice_game_over", 0.18);
  }

  const nextChapter = activeStoryMode
    ? STORY_CHAPTERS.find(chapter => !save.completedChapters.includes(chapter.id))
    : null;
  const storyClearText = nextChapter
    ? `Chapter cleared. The village has proof Mira is alive. Next clue: ${nextChapter.name}.`
    : "Chapter cleared. Mira's door is open, and the village is waiting.";
  const topBackAction = activeStoryMode ? "backVillage" : "backMenu";
  const primaryAction = won && activeStoryMode ? "backVillage" : "retryTower";
  const primaryText = won && activeStoryMode ? "RETURN TO VILLAGE" : "RETRY TOWER";
  const secondaryAction = activeStoryMode ? "backVillage" : "backMenu";
  const secondaryText = activeStoryMode ? "VILLAGE" : "MAIN MENU";
  const jackpot = won && activeStoryMode ? `<div class="slotHeader">CHAPTER COMPLETE</div><div class="chapterCliffhanger">${nextChapter ? `Someone in the village says ${nextChapter.handler} found the next lead.` : "Mira is close enough to hear footsteps outside her door."}</div>` : "";

  openOverlay(`
    <div class="vsScreen framedScreen resultScreen ${won && activeStoryMode ? "storyCompleteScreen" : ""}">
      ${won && activeStoryMode ? `<div class="confettiLayer">${makeConfettiLayer(96)}</div>` : ""}
      ${renderTopStrip(won ? "Tower Clear" : "Run Failed", topBackAction)}
      <div class="vsPanel resultPanel">
        ${jackpot}
        <h2>${won ? "Tower clear" : "Run failed"}</h2>
        <p class="panelLead">${won && activeStoryMode ? storyClearText : won ? "You cleared the current tower. Next step is tighter arenas and better bosses." : "You died. Floors already cleared stayed saved. Try another route when you are ready."}</p>
        <div class="menuStats">
          <div><span>Reached</span><b>Floor ${currentFloor}</b></div>
          <div><span>Best</span><b>${save.bestFloor}</b></div>
          <div><span>Shards</span><b>${save.shards}</b></div>
          <div><span>Upgrades</span><b>${runStats.upgrades.length}</b></div>
        </div>
        <div class="menuActions">
          <button class="vsButton green" data-action="${primaryAction}">${primaryText}</button>
          <button class="vsButton blue" data-action="${secondaryAction}">${secondaryText}</button>
        </div>
      </div>
    </div>
  `, "resultMenu");

  addLog(message);
}

function updateBots(dt) {
  processPendingIntel();

  for (const bot of bots) {
    if (!bot.alive) continue;

    bot.shotCd = Math.max(0, bot.shotCd - dt);
    bot.maskDelay = Math.max(0, bot.maskDelay - dt);
    bot.pathPause = Math.max(0, bot.pathPause - dt);
    bot.panic = Math.max(0, bot.panic - dt * 0.7);
    bot.recentlyHit = Math.max(0, bot.recentlyHit - dt);
    bot.flinch = Math.max(0, bot.flinch - dt);
    bot.flash = Math.max(0, bot.flash - dt);
    bot.stagger = Math.max(0, bot.stagger - dt);
    bot.thinkPause = Math.max(0, (bot.thinkPause || 0) - dt);
    bot.suppressed = Math.max(0, (bot.suppressed || 0) - dt);
    bot.speedBurst = Math.max(0, (bot.speedBurst || 0) - dt);
    bot.dodgeCd = Math.max(0, (bot.dodgeCd || 0) - dt);
    bot.dodgeInvuln = Math.max(0, (bot.dodgeInvuln || 0) - dt);
    bot.bossAbilityTimer = Math.max(0, (bot.bossAbilityTimer || 0) - dt);
    bot.tauntTimer = Math.max(0, (bot.tauntTimer || 0) - dt);
    bot.stealthReveal = Math.max(0, (bot.stealthReveal || 0) - dt);

    const seesPlayer = withinVisionCone(bot, player);
    const distanceToPlayer = dist(bot, player);
    const hearsPlayer = player.noise > 25 && distanceToPlayer < player.noise;

    if (seesPlayer) {
      bot.lastSeen = { x: player.x, y: player.y, t: nowSec() };
      bot.suspicion = clamp(bot.suspicion + dt * (70 + currentFloor * 3 + (bot.role === "boss" ? 12 : 0)), 0, 100);
      if (bot.suspicion > bot.reaction * 100) bot.state = "attack";
      if (currentFloor >= 3 && !isBossFloor(currentFloor)) queueIntel(bot, player.x, player.y, 0.72, "visual", bot.reaction * 0.55);
    } else {
      const decay = bot.state === "patrol" ? 9 : 4;
      bot.suspicion = clamp(bot.suspicion - dt * (decay + runStats.suspicionBleed), 0, 100);
    }

    if (hearsPlayer) {
      bot.lastHeard = safePointNear(player.x, player.y, keys.has("shift") ? 94 : 44);
      bot.suspicion = clamp(bot.suspicion + dt * 36, 0, 100);
      if (bot.state === "patrol") bot.state = "search";
      if (currentFloor >= 3 && !isBossFloor(currentFloor)) queueIntel(bot, player.x, player.y, 0.42, "sound", rand(0.35, 1.0));
    }

    maybeUseBotSmoke(bot, seesPlayer);
    pressureTick(bot, dt);
    consumeTeamIntel(bot);
    updateBossBehavior(bot, seesPlayer);

    if (bot.suspicion > 72) player.spotted = Math.max(player.spotted, 0.2);

    if (bot.thinkPause <= 0) {
      chooseBotTarget(bot);
      moveBot(bot, dt);
      botAimAndShoot(bot, seesPlayer);
    } else if (bot.lastSeen) {
      bot.angle = smoothAngle(bot.angle, angleTo(bot, bot.lastSeen), dt * 2.2);
    }
    echoes.push({ x: bot.x, y: bot.y, t: nowSec(), kind: "bot", bot });
  }
}


function bossSummonCount() {
  return bots.filter(bot => bot.alive && bot.role === "summon").length;
}

function summonWeakFlanker(boss) {
  if (bossSummonCount() >= 2) return false;

  const side = Math.random() < 0.5 ? -1 : 1;
  const a = angleTo(player, boss) + side * rand(1.0, 1.8);
  const p = nearestFreePoint(player.x + Math.cos(a) * rand(145, 220), player.y + Math.sin(a) * rand(145, 220), 18);
  if (dist(p, player) < 110 || hasVisualLineOfSight(player, p)) return false;

  const base = BOT_PROFILES[4] || BOT_PROFILES[0];
  const profile = {
    ...base,
    name: "Husk",
    callSign: "Weak Flanker",
    color: "#b6ff9c",
    sprite: "enemy_null",
    weaponId: "pistol",
    aim: 0.46,
    aggression: 0.82,
    coverBias: 0.4,
    smokeBias: 0
  };
  const summon = makeBot("Husk", p.x, p.y, "summon", "#b6ff9c", currentFloor, profile);
  summon.maxHp = 48 + currentFloor * 3;
  summon.hp = summon.maxHp;
  summon.speed *= 1.08;
  summon.suspicion = 64;
  summon.lastSeen = { x: player.x, y: player.y, t: nowSec() };
  summon.target = flankPointAround(player, side);
  summon.bossSummon = true;
  bots.push(summon);
  addParticles("spark", p.x, p.y, rand(-Math.PI, Math.PI), 24, "#b6ff9c");
  floatText.push({ x: boss.x - 26, y: boss.y - 38, text: "behind you", t: 2.0 });
  return true;
}

function updateBossBehavior(bot, seesPlayer) {
  if (bot.role !== "boss" || mode !== "running") return;

  const profile = bot.profile || {};
  const kit = profile.bossKit || "mirror";

  if (bot.tauntTimer <= 0 && (seesPlayer || bot.hp < bot.maxHp * 0.55)) {
    bot.tauntTimer = rand(4.2, 7.2);
    const bark = choice(profile.barks || ["move", "again?", "peek"]);
    floatText.push({ x: bot.x - 24, y: bot.y - 34, text: bark, t: 1.1 });
    maybePlayBossTauntAudio(bot);
    addScreenFlash(0.018);
  }

  if (bot.bossAbilityTimer > 0) return;

  if (kit === "poison") {
    bot.bossAbilityTimer = rand(3.0, 4.7);
    const lead = player.moveIntent ? pointFromAngle(player, player.angle, rand(42, 86)) : player;
    const p = safePointNear(lead.x + rand(-40, 40), lead.y + rand(-40, 40), 42);
    addPoisonPuddle(p.x, p.y, bot.hp < bot.maxHp * 0.5 ? 92 : 72, 6.2, bot.color);
    bot.target = chooseCoverPoint(bot) || safePointNear(bot.x + rand(-160, 160), bot.y + rand(-160, 160), 110);
    bot.state = "attack";
    bot.maskDelay = Math.max(bot.maskDelay, 0.16);
    return;
  }

  if (kit === "necro") {
    bot.bossAbilityTimer = rand(4.2, 6.2);
    if (summonWeakFlanker(bot)) {
      bot.target = chooseCoverPoint(bot) || safePointNear(bot.x + rand(-120, 120), bot.y + rand(-120, 120), 110);
      bot.state = "search";
      bot.maskDelay = Math.max(bot.maskDelay, 0.18);
      return;
    }
  }

  bot.bossAbilityTimer = kit === "smoke" || kit === "flicker" ? rand(3.4, 5.4) : rand(2.7, 4.3);

  if (kit === "flicker") {
    if (bot.smokeCharges > 0 && (seesPlayer || bot.hp < bot.maxHp * 0.7)) {
      bot.smokeCharges -= 1;
      const p = safePointNear(bot.x + rand(-50, 50), bot.y + rand(-50, 50), 50);
      addSmoke(p.x, p.y, 118, 6.8, bot.color);
    }

    const side = Math.random() < 0.5 ? -1 : 1;
    const a = angleTo(player, bot) + side * Math.PI * 0.58 + rand(-0.38, 0.38);
    const fake = safePointNear(bot.x + Math.cos(a + side * 0.7) * rand(60, 110), bot.y + Math.sin(a + side * 0.7) * rand(60, 110), 42);
    addMovementTrace(fake.x, fake.y, a + side * 0.7, { t: 2.2, color: "#ff5c7a", owner: "bot", boss: true, fake: true, size: 1.0 });

    bot.target = chooseCoverPoint(bot) || nearestFreePoint(bot.x + Math.cos(a) * rand(100, 170), bot.y + Math.sin(a) * rand(100, 170), bot.r + 8);
    bot.speedBurst = Math.max(bot.speedBurst, 0.52);
    bot.maskDelay = Math.max(bot.maskDelay, 0.18);
    bot.state = seesPlayer ? "attack" : "search";
    return;
  }

  if (kit === "smoke") {
    const shouldSmoke = bot.smokeCharges > 0 && (seesPlayer || bot.hp < bot.maxHp * 0.72);
    if (shouldSmoke) {
      bot.smokeCharges -= 1;
      const a = angleTo(bot, player) + rand(-0.35, 0.35);
      const p = pointFromAngle(bot, a, rand(70, 115));
      addSmoke(p.x, p.y, 108, 7.2, bot.color);
      bot.target = chooseCoverPoint(bot) || safePointNear(bot.x + rand(-150, 150), bot.y + rand(-150, 150), 90);
      bot.state = "search";
      bot.maskDelay = Math.max(bot.maskDelay, 0.34);
      bot.thinkPause = Math.max(bot.thinkPause, 0.1);
      return;
    }
  }

  const side = Math.random() < 0.5 ? -1 : 1;
  const a = angleTo(player, bot) + side * Math.PI * 0.5 + rand(-0.25, 0.25);
  bot.target = nearestFreePoint(bot.x + Math.cos(a) * rand(90, 150), bot.y + Math.sin(a) * rand(90, 150), bot.r + 8);
  bot.speedBurst = Math.max(bot.speedBurst, 0.42);
  bot.maskDelay = Math.max(bot.maskDelay, 0.1);
  bot.state = "attack";
}

function queueIntel(bot, x, y, confidence, reason, delay) {
  if (currentFloor < 2) return;
  pendingIntel.push({
    x,
    y,
    confidence,
    reason,
    source: bot?.name || "player",
    at: nowSec() + delay
  });
}

function processPendingIntel() {
  const t = nowSec();
  for (let i = pendingIntel.length - 1; i >= 0; i--) {
    const intel = pendingIntel[i];
    if (intel.at > t) continue;
    shareIntel(null, intel.x, intel.y, intel.confidence, intel.reason, intel.source);
    pendingIntel.splice(i, 1);
  }
}

function shareIntel(bot, x, y, confidence, reason, sourceName = "") {
  if (currentFloor < 2) return;
  const roughness = 130 - confidence * 70;
  teamPing = {
    x: x + rand(-roughness, roughness),
    y: y + rand(-roughness, roughness),
    confidence,
    reason,
    source: sourceName || bot?.name || "team",
    t: nowSec()
  };

  if (showDebug && Math.random() < 0.35) {
    addLog(`Team ping: ${reason}.`);
  }
}

function consumeTeamIntel(bot) {
  if (!teamPing || nowSec() - teamPing.t > 4.5) return;
  if (bot.lastSeen && nowSec() - bot.lastSeen.t < 0.9) return;

  const age = nowSec() - teamPing.t;
  const value = teamPing.confidence * (1 - age / 4.5);
  if (value <= 0.12) return;

  bot.suspicion = Math.max(bot.suspicion, 22 + value * 45);
  if (bot.role === "flanker" && currentFloor >= 3) {
    bot.pressureHint = flankPointAround(teamPing, bot.flankSide);
    bot.maskDelay = Math.max(bot.maskDelay, rand(0.2, 0.55));
    bot.state = "search";
    return;
  }

  if (bot.role === "support" && currentFloor >= 4) {
    bot.pressureHint = safePointNear(teamPing.x, teamPing.y, 160);
    bot.state = "search";
    return;
  }

  if (!bot.pressureHint || Math.random() < 0.25) {
    bot.pressureHint = safePointNear(teamPing.x, teamPing.y, 90);
    bot.state = bot.state === "patrol" ? "search" : bot.state;
  }
}

function flankPointAround(point, side) {
  const fromPlayer = angleTo(player, point);
  const a = fromPlayer + side * Math.PI * 0.5;
  return safePointNear(point.x + Math.cos(a) * 130, point.y + Math.sin(a) * 130, 70);
}

function maybeUseBotSmoke(bot, seesPlayer) {
  if (bot.smokeCharges <= 0 || mode !== "running") return;
  const profile = bot.profile || BOT_PROFILES[0];
  const hurt = bot.hp < bot.maxHp * 0.55;
  const lostSight = !seesPlayer && bot.lastSeen && nowSec() - bot.lastSeen.t < 2.2;
  const wantsSmoke = hurt || lostSight || (bot.role === "boss" && player.reload <= 0 && Math.random() < profile.smokeBias * 0.01);
  if (!wantsSmoke) return;

  const between = {
    x: bot.x + (player.x - bot.x) * rand(0.32, 0.58),
    y: bot.y + (player.y - bot.y) * rand(0.32, 0.58)
  };

  if (!hasLineOfSight(bot, between)) return;
  bot.smokeCharges -= 1;
  addSmoke(between.x, between.y, bot.role === "boss" ? 94 : 82, bot.role === "boss" ? 7.4 : 6.4, bot.color);
  bot.target = chooseCoverPoint(bot) || safePointNear(bot.x + rand(-110, 110), bot.y + rand(-110, 110), 75);
  bot.state = "search";
  bot.maskDelay = Math.max(bot.maskDelay, 0.28);
  addLog(`${bot.name} broke vision with smoke.`);
}


function pressureTick(bot, dt) {
  bot.pressureTimer -= dt;
  if (bot.pressureTimer > 0) return;

  const floorPressure = Math.max(0, currentFloor - 1);
  const base = bot.role === "hunter" ? 1.45 : bot.role === "baiter" ? 2.05 : 2.5;
  bot.pressureTimer = rand(Math.max(0.8, base - floorPressure * 0.1), base + 1.4);

  const closeEnough = dist(bot, player) < 500 + currentFloor * 18;
  const pressureMoment = player.reload > 0 || player.hp < 45 || bot.memory.shotsHeard >= 2 || teamPing;
  const recentlyLost = bot.lastSeen && nowSec() - bot.lastSeen.t < 5.5;
  const chance = 0.38 + currentFloor * 0.035;

  if (!closeEnough || (!pressureMoment && !recentlyLost && Math.random() > chance)) return;

  const roughness = Math.max(48, 120 - currentFloor * 8);
  const hint = safePointNear(player.x, player.y, roughness);
  const wrong = safePointNear(player.x + rand(-170, 170), player.y + rand(-170, 170), 65);

  bot.pressureHint = { x: hint.x, y: hint.y, t: nowSec() };
  bot.wrongCheck = wrong;
  bot.maskDelay = rand(0.28, Math.max(0.42, 1.0 - currentFloor * 0.06));
  bot.suspicion = Math.max(bot.suspicion, bot.suspicionBase + rand(12, 34));

  if (player.reload > 0 && Math.random() < 0.7) {
    bot.suspicion = Math.max(bot.suspicion, 66);
  }

  if (currentFloor >= 4 && !isBossFloor(currentFloor) && Math.random() < 0.22) {
    queueIntel(bot, player.x, player.y, 0.48, "pressure", rand(0.35, 0.85));
  }

  if (showDebug) {
    addLog(`${bot.name} changed pressure.`);
  }
}

function chooseBotTarget(bot) {
  bot.decisionTimer = Math.max(0, bot.decisionTimer - 0.016);

  const medPickup = nearestBotHealthPickup(bot);
  if (medPickup) {
    bot.state = "search";
    bot.target = medPickup;
    bot.maskDelay = Math.max(bot.maskDelay, bot.role === "boss" ? 0.06 : 0.16);
    bot.panic = Math.max(bot.panic, 0.35);
    return;
  }

  if (bot.state === "attack" && bot.lastSeen) {
    const cover = currentFloor >= 2 ? chooseCoverPoint(bot) : null;
    const profile = bot.profile || BOT_PROFILES[0];
    const hurt = bot.hp < bot.maxHp * 0.62;
    const playerReloading = player.reload > 0;
    const alone = bots.filter(b => b.alive).length === 1;
    const shouldUseCover = cover && (
      bot.role === "boss" ||
      bot.role === "duelist" ||
      bot.role === "anchor" ||
      bot.role === "support" ||
      bot.role === "coward" ||
      hurt ||
      bot.suppressed > 0 ||
      (!playerReloading && Math.random() < profile.coverBias * 0.16)
    );

    if (shouldUseCover) {
      bot.target = cover;
      return;
    }

    if (playerReloading && profile.aggression > 0.6 && hasClearMovementPath(bot, player, bot.r + 4)) {
      bot.target = safePointNear(player.x, player.y, bot.role === "duelist" ? 52 : 42);
      bot.maskDelay = bot.role === "duelist" ? Math.max(bot.maskDelay, 0.12) : bot.maskDelay;
      return;
    }

    if ((bot.role === "duelist" || bot.role === "boss") && hasVisualLineOfSight(bot, player) && bot.decisionTimer <= 0) {
      bot.decisionTimer = rand(0.18, 0.45) * (1.15 - (profile.peekBias || 0.5) * 0.35);
      const side = bot.flankSide * (Math.random() < 0.48 ? -1 : 1);
      const ring = bot.role === "boss" ? rand(85, 145) : rand(58, 125);
      bot.target = nearestFreePoint(bot.x + Math.cos(angleTo(player, bot) + side * Math.PI * 0.5) * ring, bot.y + Math.sin(angleTo(player, bot) + side * Math.PI * 0.5) * ring, bot.r + 6);
      bot.flankSide = side;
      return;
    }

    if (bot.role === "flanker" && currentFloor >= 3) {
      bot.target = flankPointAround(bot.lastSeen, bot.flankSide);
      return;
    }

    if (alone && !isBossFloor(currentFloor) && hurt) {
      bot.target = cover || safePointNear(bot.x + rand(-120, 120), bot.y + rand(-120, 120), 90);
      bot.panic = Math.max(bot.panic, 0.6);
      return;
    }

    bot.target = { x: bot.lastSeen.x, y: bot.lastSeen.y };
    return;
  }

  if (bot.maskDelay > 0 && bot.wrongCheck) {
    bot.state = bot.state === "patrol" ? "search" : bot.state;
    bot.target = bot.wrongCheck;
    return;
  }

  if (bot.pressureHint && nowSec() - bot.pressureHint.t < 5.5) {
    bot.state = "search";
    bot.target = bot.pressureHint;
    return;
  }

  if (bot.lastHeard && bot.suspicion > 16) {
    bot.state = "search";
    bot.target = bot.lastHeard;
    return;
  }

  if (bot.lastSeen && nowSec() - bot.lastSeen.t < 5) {
    bot.state = "search";
    bot.target = safePointNear(bot.lastSeen.x, bot.lastSeen.y, 58);
    return;
  }

  if (!bot.target || dist(bot, bot.target) < 28 || bot.pathPause <= 0) {
    bot.pathPause = rand(1.0, 2.8) * (bot.profile?.patience || 1);
    bot.target = patrolPointFor(bot);
  }

  bot.state = "patrol";
}

function patrolPointFor(bot) {
  if (bot.role === "hunter") return safePointNear(worldW * 0.72, worldH * 0.22, 260);
  if (bot.role === "coward") return safePointNear(worldW * 0.75, worldH * 0.75, 240);
  if (bot.role === "flanker") return safePointNear(worldW * (bot.flankSide > 0 ? 0.78 : 0.22), worldH * 0.5, 260);
  if (bot.role === "support") return safePointNear(worldW * 0.35, worldH * 0.35, 260);
  return safePointNear(worldW * 0.52, worldH * 0.52, 260);
}

function moveBot(bot, dt) {
  if (!bot.target) return;

  const tooClose = dist(bot, player) < (bot.role === "boss" ? 96 : bot.role === "duelist" ? 84 : 72) && bot.state === "attack";
  let target = bot.target;

  if (tooClose && bot.role !== "hunter") {
    const away = angleTo(player, bot);
    target = nearestFreePoint(bot.x + Math.cos(away) * 105, bot.y + Math.sin(away) * 105, bot.r + 4);
    bot.panic = Math.max(bot.panic, 0.5);
  }

  const movePoint = getBotMovePoint(bot, target);
  const moveAngle = angleTo(bot, movePoint);
  const facePoint = bot.state === "attack" && hasVisualLineOfSight(bot, player) ? player : movePoint;
  const faceAngle = angleTo(bot, facePoint);
  const jitter = Math.sin(nowSec() * 2.7 + bot.moveJitter) * 0.08;
  bot.angle = smoothAngle(bot.angle, faceAngle + jitter, dt * (bot.state === "attack" ? 5.2 : 2.8));

  let speed = bot.speed;
  if (bot.maskDelay > 0) speed *= 0.62;
  if (bot.state === "attack") speed *= bot.role === "coward" ? 0.82 : 1.08;
  if (bot.role === "anchor" && bot.state !== "attack") speed *= 0.78;
  if (bot.panic > 0.25) speed *= 1.08;
  if (bot.suppressed > 0) speed *= bot.role === "boss" ? 0.86 : 0.72;
  if (bot.speedBurst > 0) speed *= 1.45;
  if (bot.flinch > 0) speed *= 0.35;
  if (bot.stagger > 0) return;

  if (dist(bot, movePoint) > 12) {
    const moved = moveEntity(bot, Math.cos(moveAngle) * speed * dt, Math.sin(moveAngle) * speed * dt);
    maybePlayBotFootstep(bot, moved);
    maybeLeaveMovementTrace(bot, moved);
    const progress = Math.hypot(bot.x - bot.lastX, bot.y - bot.lastY);
    bot.stuckTime = moved < 0.45 && progress < 0.45 ? bot.stuckTime + dt : 0;
    bot.lastX = bot.x;
    bot.lastY = bot.y;

    if (bot.stuckTime > 0.35) {
      bot.path = [];
      bot.pathRefresh = 0;
      bot.target = safePointNear(bot.x + rand(-120, 120), bot.y + rand(-120, 120), 70);
      bot.stuckTime = 0;
    }
  }
}

function smoothAngle(current, target, amount) {
  const diff = normAngle(target - current);
  return current + diff * clamp(amount, 0, 1);
}

function botAimAndShoot(bot, seesPlayer) {
  const smokeFirePoint = botSmokeFirePoint(bot);
  const canShootByPressure = bot.pressureHint && nowSec() - bot.pressureHint.t < 1.1 && hasLineOfSight(bot, player);
  const canEngage = seesPlayer || smokeFirePoint || (bot.suspicion > 84 && canShootByPressure);
  if (!canEngage || bot.shotCd > 0 || bot.flinch > 0 || bot.stagger > 0) return;

  const profile = bot.profile || BOT_PROFILES[0];
  const botWeapon = bot.weapon || WEAPON_BY_ID[bot.weaponId] || WEAPON_BY_ID.pistol;
  const reactionRoll = bot.suspicion / 100 + (profile.reactionBoost || 0) + (bot.role === "hunter" ? 0.12 : 0);
  if (reactionRoll < bot.reaction) return;

  const playerReloading = player.reload > 0;
  const lowHealthPush = player.hp < 45 ? -0.08 : 0;
  const duelBias = bot.role === "duelist" || bot.role === "boss" ? 0.14 : 0;
  const floorFireRate = Math.min(0.16, currentFloor * 0.014) + duelBias;
  const cadence = Math.max(0.2, botWeapon.fireDelay * (bot.role === "boss" ? 0.82 : bot.role === "duelist" ? 0.92 : 1.08));
  bot.shotCd = Math.max(cadence, rand(0.52, 1.05) - floorFireRate + (playerReloading ? -0.12 : 0) + lowHealthPush);

  const aimTarget = smokeFirePoint || player;
  const targetAngle = angleTo(bot, aimTarget);
  if (smokeFirePoint) {
    bot.angle = smoothAngle(bot.angle, targetAngle, 0.35);
    bot.suspicion = Math.max(bot.suspicion, bot.role === "boss" ? 76 : 64);
  }
  const panicMiss = bot.panic > 0 ? rand(-0.08, 0.08) : 0;
  const skillSpread = bot.aimSpread + (playerReloading ? -0.018 : 0) + (botWeapon.spread || 0.02) * 0.35;
  const muzzle = pointFromAngle(bot, bot.angle, bot.r + 10);
  revealStealth(bot, botWeapon.id === "shotgun" || botWeapon.id === "dmr" ? 1.15 : 0.9);
  playSfx("shot", botWeapon.shake * 0.55, botWeapon.shotSfx);
  addMuzzleFlash(muzzle.x, muzzle.y, targetAngle, { ...botWeapon, recoil: botWeapon.recoil * 0.7 });
  addShake(botWeapon.shake * (bot.role === "boss" ? 0.45 : 0.25));

  let landed = false;
  const pellets = botWeapon.pellets || 1;
  for (let i = 0; i < pellets; i++) {
    const miss = rand(-skillSpread, skillSpread) + panicMiss;
    const ang = targetAngle + miss;
    const end = rayBlocked(bot, ang, 900);

    enemyShots.push({
      x1: muzzle.x,
      y1: muzzle.y,
      x2: end.x,
      y2: end.y,
      t: botWeapon.tracerTime || 0.08,
      maxT: botWeapon.tracerTime || 0.08,
      owner: bot.name,
      color: bot.color || "#ff5c7a",
      width: bot.role === "boss" ? 2.1 : 1.4
    });

    const p = closestPointOnLine(player, bot, end);
    const d = Math.hypot(player.x - p.x, player.y - p.y);
    const dodgeRadius = playerDodgeRadius();
    if (d < dodgeRadius && hasVisualLineOfSight(bot, player)) {
      const dmg = rand(botWeapon.damage[0], botWeapon.damage[1]) * (bot.role === "boss" ? 0.58 : bot.role === "duelist" ? 0.48 : 0.42) + currentFloor * 0.55;
      addImpact("bot", p.x, p.y, ang, { ...botWeapon, id: "enemy", hitStop: 0.012, shake: 1, color: bot.color || "#ff5c7a" });
      damagePlayer(dmg, bot.name);
      landed = true;
    } else if (d < player.r + 9 && hasVisualLineOfSight(bot, player)) {
      maybeNearMiss(p, bot.name);
    } else if (dist(bot, end) < 895) {
      addImpact("wall", end.x, end.y, ang, { ...botWeapon, id: "enemy", shake: 0.5, color: bot.color || "#ff5c7a" });
    }
  }

  if (!landed && (bot.role === "duelist" || bot.role === "boss")) {
    bot.maskDelay = Math.max(bot.maskDelay, rand(0.08, 0.18));
  }
}


function updateEffects(dt) {
  player.recoil = Math.max(0, player.recoil - dt * 28);
  const heatDecay = currentWeapon().id === "smg" ? 0.45 : currentWeapon().id === "lmg" ? 0.22 : 0.85;
  player.weaponHeat = Math.max(0, player.weaponHeat - dt * heatDecay);
  cameraShake = Math.max(0, cameraShake - dt * 11);
  screenFlash = Math.max(0, screenFlash - dt * 3.6);

  for (const shot of bullets) shot.t -= dt;
  for (const shot of enemyShots) shot.t -= dt;
  for (const text of floatText) text.t -= dt;
  for (const flash of muzzleFlashes) flash.t -= dt;
  updateAchievementToasts(dt);

  for (const shell of shellCasings) {
    shell.t -= dt;
    shell.x += shell.vx * dt;
    shell.y += shell.vy * dt;
    shell.vx *= Math.pow(0.2, dt);
    shell.vy *= Math.pow(0.2, dt);
    shell.rot += shell.spin * dt;
  }

  for (const p of particles) {
    p.t -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= Math.pow(0.08, dt);
    p.vy *= Math.pow(0.08, dt);
  }

  for (const decal of decals) decal.t -= dt;
  for (const smoke of smokes) smoke.t -= dt;
  updatePoisonPuddles(dt);
  for (const trace of movementTraces) trace.t -= dt;

  for (let i = bullets.length - 1; i >= 0; i--) if (bullets[i].t <= 0) bullets.splice(i, 1);
  for (let i = enemyShots.length - 1; i >= 0; i--) if (enemyShots[i].t <= 0) enemyShots.splice(i, 1);
  for (let i = floatText.length - 1; i >= 0; i--) if (floatText[i].t <= 0) floatText.splice(i, 1);
  for (let i = muzzleFlashes.length - 1; i >= 0; i--) if (muzzleFlashes[i].t <= 0) muzzleFlashes.splice(i, 1);
  for (let i = shellCasings.length - 1; i >= 0; i--) if (shellCasings[i].t <= 0) shellCasings.splice(i, 1);
  for (let i = particles.length - 1; i >= 0; i--) if (particles[i].t <= 0) particles.splice(i, 1);
  for (let i = decals.length - 1; i >= 0; i--) if (decals[i].t <= 0) decals.splice(i, 1);
  for (let i = smokes.length - 1; i >= 0; i--) if (smokes[i].t <= 0) smokes.splice(i, 1);
  for (let i = movementTraces.length - 1; i >= 0; i--) if (movementTraces[i].t <= 0) movementTraces.splice(i, 1);

  const cutoff = nowSec() - Math.max(3.0, runStats?.echoDuration || 2.6);
  while (echoes.length && echoes[0].t < cutoff) echoes.shift();
}

function threatSenseText() {
  const aliveBots = bots.filter(b => b.alive);
  const threat = Math.max(0, ...aliveBots.map(b => b.suspicion));
  const activeTeamPing = teamPing && nowSec() - teamPing.t < 4.5;

  if (runStats?.threatRead && activeTeamPing && threat > 45) return "team converging";
  if (threat > 82) return "contact has timing";
  if (threat > 55) return "watched";
  if (threat > 25) return "noise noticed";
  return "quiet";
}

function updateHud() {
  const pulse = player.pulseCd > 0 ? `${player.pulseCd.toFixed(1)}s` : "ready";
  const reload = player.reload > 0 ? `${player.reload.toFixed(1)}s` : "none";
  const hitRate = player.shots ? Math.round((player.hits / player.shots) * 100) + "%" : "n/a";
  const alive = bots.filter(b => b.alive).length;
  const floorLabel = mode === "menu" ? "menu" : mode === "village" ? "village" : mode === "villagePaused" ? "village paused" : mode === "countdown" ? `${currentFloor} / 8 matchmaking` : mode === "pauseRequest" ? `${currentFloor} / 8 pause request` : mode === "paused" ? `${currentFloor} / 8 paused` : `${currentFloor} / 8`;
  const stageLabel = activeStage ? activeStage.name : "none";
  const upgrades = runStats?.upgrades?.length ? runStats.upgrades.join(", ") : "none";

  hudEl.innerHTML = `
    <div class="hudRow"><span>Floor</span><span>${floorLabel}</span></div>
    <div class="hudRow"><span>Stage</span><span>${stageLabel}</span></div>
    <div class="hudRow"><span>Route</span><span>${activeRouteType || "standard"}</span></div>
    <div class="hudRow"><span>Shards</span><span>${save.shards}</span></div>
    <div class="hudRow"><span>HP</span><span>${Math.round(player.hp)} / ${player.maxHp}</span></div>
    <div class="bar"><div class="barFill" style="width:${clamp((player.hp / player.maxHp) * 100, 0, 100)}%; background: ${player.hp < 35 ? "var(--bad)" : "var(--good)"}"></div></div>
    <div class="hudRow"><span>Weapon</span><span>${currentWeapon().name}</span></div>
    <div class="hudRow"><span>Ammo</span><span>${player.ammo} / ${player.maxAmmo}</span></div>
    <div class="hudRow"><span>Smoke</span><span>${player.smokeCharges || 0}</span></div>
    <div class="hudRow"><span>Reload</span><span>${reload}</span></div>
    <div class="hudRow"><span>Pulse</span><span>${pulse}</span></div>
    <div class="hudRow"><span>Bots alive</span><span>${alive}</span></div>
    <div class="hudRow"><span>Threat Sense</span><span>${threatSenseText()}</span></div>
    <div class="hudRow"><span>Hits</span><span>${player.hits} / ${player.shots} (${hitRate})</span></div>
    <div class="hudRow"><span>Debug</span><span>${showDebug ? "on" : "off"}</span></div>
    <div class="hudRow longHud"><span>Run upgrades</span><span>${upgrades}</span></div>
  `;
}

function draw() {
  if (mode === "village" || mode === "villagePaused") {
    drawVillage();
    return;
  }

  const palette = activeStage?.palette || STAGES[0].palette;
  ctx.clearRect(0, 0, W, H);
  updateCamera();

  const shake = (mode === "running" || mode === "killReplay") && cameraShake > 0 ? cameraShake : 0;
  ctx.save();
  if (shake > 0) ctx.translate(rand(-shake, shake), rand(-shake, shake));
  ctx.translate(-camera.x, -camera.y);

  drawFloorBase(palette);
  drawStageGlow(palette);
  drawDecals("floor");
  drawGrid(palette);
  drawStageThemeProps(palette);
  drawPulse(palette);
  drawEchoes();
  drawMovementTraces();
  drawWalls(palette);
  drawDecals("wall");
  drawPoisonPuddles();
  drawSmokes();
  drawBreakables(palette);
  drawPickups();
  drawShellCasings();
  drawBotVision();
  drawShots();
  drawPlayer();
  drawBots();
  drawMuzzleFlashes();
  drawParticles();
  drawLightingOverlay();
  drawFloatText();

  if (message) {
    ctx.fillStyle = "rgba(217,222,234,0.9)";
    ctx.font = "18px ui-sans-serif, system-ui";
    ctx.fillText(message, camera.x + 22, camera.y + 34);
  }

  ctx.restore();

  drawKillReplayOverlay();
  drawCrosshair();
  drawAmmoHud();
  drawUtilityHud();
  drawStoryProgressHud();
  drawCountdownOverlay();
  drawScreenFlash();
  drawAchievementToasts();
}

function updateCountdown() {
  if (mode !== "countdown") return;
  const remaining = roundStartAt - nowSec();
  const cue = remaining > 3.1 ? "match" : remaining > 2.5 ? "found" : remaining > 1.8 ? "3" : remaining > 1.2 ? "2" : remaining > 0.6 ? "1" : remaining > 0 ? "fight" : "go";
  if (cue !== lastCountdownCue) {
    lastCountdownCue = cue;
    if (["3", "2", "1"].includes(cue)) playSfx("count");
    if (cue === "fight") playSfx("fight");
  }
  if (remaining <= 0) {
    mouse.down = false;
    player.fireBuffer = 0;
    mode = "running";
    running = true;
    addLog("Fight.");
    updateHud();
  }
}

function drawCountdownOverlay() {
  if (mode !== "countdown") return;
  const remaining = roundStartAt - nowSec();
  let main = "MATCHMAKING";
  let sub = "searching...";

  if (remaining <= 3.1 && remaining > 2.5) {
    main = roundMatchLabel;
    sub = roundOpponentLabel;
  } else if (remaining <= 2.5 && remaining > 0.6) {
    main = String(Math.max(1, Math.ceil((remaining - 0.6) / 0.6)));
    sub = `${roundMatchLabel} · ${roundOpponentLabel}`;
  } else if (remaining <= 0.6) {
    main = "FIGHT";
    sub = "check your corners";
  }

  ctx.save();
  ctx.fillStyle = "rgba(3, 5, 10, 0.42)";
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(124,199,255,0.85)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = main === "FIGHT" ? "#ff5c7a" : "#d8f6ff";
  ctx.font = main.length <= 2 ? "900 96px ui-sans-serif, system-ui" : "900 44px ui-sans-serif, system-ui";
  ctx.fillText(main, W / 2, H / 2 - 18);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(217,222,234,0.82)";
  ctx.font = "700 16px ui-sans-serif, system-ui";
  ctx.fillText(sub, W / 2, H / 2 + 24);
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.font = "12px ui-sans-serif, system-ui";
  ctx.fillText("E smoke · Q pulse · hold angles", W / 2, H / 2 + 52);
  ctx.restore();
}

function drawFloorBase(palette) {
  const img = imageAsset(stageAssetKey("floor"));
  if (img) {
    const pattern = ctx.createPattern(img, "repeat");
    ctx.fillStyle = pattern || palette.floor;
    ctx.fillRect(0, 0, worldW, worldH);
    ctx.fillStyle = hexToRgba(palette.floor, 0.52);
    ctx.fillRect(0, 0, worldW, worldH);
    return;
  }

  ctx.fillStyle = palette.floor;
  ctx.fillRect(0, 0, worldW, worldH);
}

function fillWallRectWithTexture(wall, palette) {
  const img = imageAsset(stageAssetKey("wall"));
  if (!img) {
    ctx.fillStyle = palette.wall;
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(wall.x, wall.y, wall.w, wall.h);
  ctx.clip();
  const pattern = ctx.createPattern(img, "repeat");
  ctx.fillStyle = pattern || palette.wall;
  ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  ctx.fillStyle = wall.cover ? "rgba(0,0,0,0.1)" : hexToRgba(palette.wall, 0.32);
  ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  ctx.restore();
}

function drawStageGlow(palette) {
  ctx.fillStyle = hexToRgba(palette.pulse, 0.035);
  ctx.fillRect(0, 0, worldW, worldH);

  ctx.fillStyle = "rgba(255,255,255,0.018)";
  for (let y = 0; y < worldH; y += 96) {
    ctx.fillRect(0, y, worldW, 1);
  }
}

function drawGrid(palette) {
  ctx.strokeStyle = palette.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x <= worldW; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, worldH);
    ctx.stroke();
  }
  for (let y = 0; y <= worldH; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(worldW, y);
    ctx.stroke();
  }
}

function drawWalls(palette) {
  for (const wall of walls) {
    fillWallRectWithTexture(wall, palette);
    ctx.strokeStyle = palette.wallLine;
    ctx.lineWidth = wall.cover ? 1.5 : 1;
    ctx.strokeRect(wall.x + 0.5, wall.y + 0.5, wall.w - 1, wall.h - 1);
    if (wall.cover) {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(wall.x + 2, wall.y + 2, Math.max(0, wall.w - 4), 2);
      ctx.strokeStyle = "rgba(255, 211, 90, 0.24)";
      ctx.setLineDash([5, 6]);
      ctx.strokeRect(wall.x - 3.5, wall.y - 3.5, wall.w + 7, wall.h + 7);
      ctx.setLineDash([]);
    }
  }
}

function drawBreakables(palette) {
  for (const item of breakables) {
    if (!item.alive) continue;

    const hpPct = clamp(item.hp / item.maxHp, 0, 1);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(Math.sin(nowSec() * 1.3 + item.wobble) * 0.04);
    const smoke = item.type === "smoke";
    ctx.fillStyle = smoke ? "rgba(160,172,190,0.16)" : "rgba(255, 211, 90, 0.14)";
    ctx.beginPath();
    ctx.arc(0, 0, item.r + 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = smoke ? "#394253" : "#253047";
    ctx.strokeStyle = smoke ? "#9aa6bb" : palette.wallLine;
    ctx.lineWidth = 2;
    ctx.fillRect(-item.r, -item.r, item.r * 2, item.r * 2);
    ctx.strokeRect(-item.r + 0.5, -item.r + 0.5, item.r * 2 - 1, item.r * 2 - 1);

    if (smoke) {
      ctx.fillStyle = "rgba(230,235,245,0.7)";
      ctx.beginPath();
      ctx.arc(0, -3, 3, 0, Math.PI * 2);
      ctx.arc(-5, 4, 2, 0, Math.PI * 2);
      ctx.arc(5, 5, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = hpPct < 0.45 ? "#ff5c7a" : smoke ? "#aab2c9" : "#ffd166";
    ctx.fillRect(-item.r, item.r + 4, item.r * 2 * hpPct, 4);
    ctx.restore();
  }
}

function drawPickups() {
  for (const pickup of pickups) {
    const pulse = 1 + Math.sin(nowSec() * 6) * 0.12;
    ctx.save();
    ctx.translate(pickup.x, pickup.y);
    ctx.scale(pulse, pulse);

    ctx.fillStyle = "rgba(125,255,178,0.15)";
    ctx.beginPath();
    ctx.arc(0, 0, pickup.r + 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#7dffb2";
    ctx.fillRect(-pickup.r, -3, pickup.r * 2, 6);
    ctx.fillRect(-3, -pickup.r, 6, pickup.r * 2);

    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.strokeRect(-pickup.r - 2, -pickup.r - 2, pickup.r * 2 + 4, pickup.r * 2 + 4);
    ctx.restore();
  }
}

function drawSmokes() {
  const t = nowSec();
  for (const smoke of smokes) {
    const pct = clamp(smoke.t / smoke.maxT, 0, 1);
    const breathe = Math.sin(t * 2.2 + smoke.wobble) * 5;
    const r = smoke.r + breathe;
    const smokeColor = smoke.color || "#7cc7ff";
    const g = ctx.createRadialGradient(smoke.x, smoke.y, r * 0.08, smoke.x, smoke.y, r);
    g.addColorStop(0, hexToRgba(smokeColor, 0.22 * pct));
    g.addColorStop(0.44, `rgba(210, 222, 245, ${0.22 * pct})`);
    g.addColorStop(0.84, `rgba(58, 66, 82, ${0.16 * pct})`);
    g.addColorStop(1, "rgba(80, 90, 110, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(smoke.x, smoke.y, r, 0, Math.PI * 2);
    ctx.fill();

    const whiteFrames = SMOKE_WHITE_FRAMES || [];
    const blackFrames = SMOKE_BLACK_FRAMES || [];
    const framePhase = Math.floor((1 - pct) * whiteFrames.length * 1.6 + t * 2) % Math.max(1, whiteFrames.length);
    for (let i = 0; i < 11; i++) {
      const a = smoke.wobble + i * 0.74 + t * (0.08 + i * 0.008);
      const drift = (1 - pct) * 20;
      const px = smoke.x + Math.cos(a) * r * (0.12 + (i % 4) * 0.14) + Math.sin(t + i) * 4;
      const py = smoke.y + Math.sin(a * 1.23) * r * (0.10 + (i % 3) * 0.12) - drift;
      const size = r * (0.58 + (i % 5) * 0.09) * (0.72 + (1 - pct) * 0.38);
      const frames = i % 4 === 0 ? blackFrames : whiteFrames;
      const key = frames[(framePhase + i) % Math.max(1, frames.length)];
      if (key && drawImageAsset(key, px, py, size, size * 0.9, a * 0.18, (i % 4 === 0 ? 0.18 : 0.26) * pct)) continue;
      ctx.fillStyle = `rgba(230,235,245,${0.1 * pct})`;
      ctx.beginPath();
      ctx.ellipse(px, py, size * 0.28, size * 0.22, a, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = hexToRgba(smokeColor, 0.28 * pct);
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(smoke.x, smoke.y, r * 0.92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function drawStageThemeProps(palette) {
  if (!activeStage) return;
  const id = activeStage.baseId || activeStage.id;
  const pts = [
    { x: worldW * 0.18, y: worldH * 0.20 },
    { x: worldW * 0.78, y: worldH * 0.22 },
    { x: worldW * 0.22, y: worldH * 0.76 },
    { x: worldW * 0.74, y: worldH * 0.76 },
    { x: worldW * 0.50, y: worldH * 0.50 }
  ];
  ctx.save();
  ctx.globalAlpha = 0.45;
  if (["forest_wire", "whiteout"].includes(id)) {
    drawTownAsset("platformer_bush", pts[0].x, pts[0].y, 72, 0, 0.7) || drawTownAsset("town_bush", pts[0].x, pts[0].y, 72, 0, 0.7);
    drawTownAsset("town_tree_blue", pts[1].x, pts[1].y, 76, 0, 0.55);
    drawTownAsset("platformer_cactus", pts[2].x, pts[2].y, 64, 0, 0.55) || drawTownAsset("town_tree_small", pts[2].x, pts[2].y, 64, 0, 0.55);
  } else if (["undercrypt", "red_lock", "violet_split"].includes(id)) {
    drawTownAsset("platformer_brick_grey", pts[0].x, pts[0].y, 80, 0.1, 0.62) || drawTownAsset("town_stone_dark", pts[0].x, pts[0].y, 74, 0, 0.62);
    drawTownAsset("platformer_block_warning", pts[1].x, pts[1].y, 54, 0, 0.66) || drawTownAsset("town_stone_a", pts[1].x, pts[1].y, 54, 0, 0.66);
    drawTownAsset("tiny_fence_h", pts[2].x, pts[2].y, 66, 0, 0.38);
  } else if (["amber_cross", "graybox"].includes(id)) {
    drawTownAsset("platformer_brick_brown", pts[0].x, pts[0].y, 72, 0, 0.60) || drawTownAsset("town_crate_big", pts[0].x, pts[0].y, 52, 0, 0.55);
    drawTownAsset("town_barrel_a", pts[1].x, pts[1].y, 42, 0, 0.55);
    drawTownAsset("town_crate_small", pts[2].x, pts[2].y, 44, 0, 0.55);
  } else {
    drawTownAsset("platformer_bridge", pts[0].x, pts[0].y, 64, 0, 0.42) || drawTownAsset("town_bridge", pts[0].x, pts[0].y, 54, 0, 0.42);
    drawTownAsset("platformer_block_warning", pts[1].x, pts[1].y, 52, 0, 0.52) || drawTownAsset("town_stone_b", pts[1].x, pts[1].y, 52, 0, 0.52);
  }
  ctx.restore();
}

function drawPulse(palette) {
  if (player.pulseActive <= 0) return;
  const p = 1 - player.pulseActive / (1.45 + Math.min(1.1, runStats.echoDuration - 2.6));
  ctx.strokeStyle = hexToRgba(palette.pulse, 0.5 * (1 - p));
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 60 + p * runStats.pulseRange, 0, Math.PI * 2);
  ctx.stroke();
}

function drawEchoes() {
  const t = nowSec();
  for (const e of echoes) {
    const age = t - e.t;
    if (e.kind === "player" && age < 0.8) {
      ctx.fillStyle = `rgba(216,246,255,${0.12 * (1 - age / 0.8)})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (e.kind === "bot" && player.pulseActive > 0 && age < runStats.echoDuration) {
      ctx.strokeStyle = `rgba(124,199,255,${0.38 * (1 - age / runStats.echoDuration)})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 14 + age * 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function drawBotVision() {
  for (const bot of bots) {
    if (!bot.alive || !botVisionVisibleToPlayer(bot)) continue;
    const left = bot.angle - Math.PI * 0.46;
    const right = bot.angle + Math.PI * 0.46;
    const range = 245 + Math.min(currentFloor, 7) * 13;
    const a = rayBlocked(bot, left, range);
    const b = rayBlocked(bot, right, range);

    ctx.fillStyle = bot.suspicion > 70 ? "rgba(255,92,122,0.10)" : "rgba(255,255,255,0.035)";
    ctx.beginPath();
    ctx.moveTo(bot.x, bot.y);
    ctx.lineTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.closePath();
    ctx.fill();

    if (showDebug && bot.target) {
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(bot.x, bot.y);
      ctx.lineTo(bot.target.x, bot.target.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  drawPlayerModel();
  ctx.restore();

  drawPlayerHealthBar();

  if (player.spotted > 0) {
    ctx.strokeStyle = "rgba(255,92,122,0.6)";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r + 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(216,246,255,${keys.has("shift") ? 0.08 : 0.18})`;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.noise, 0, Math.PI * 2);
  ctx.stroke();
}

function drawPlayerHealthBar() {
  if (!activeStage || mode === "menu") return;

  const width = 36;
  const height = 5;
  const x = Math.round(player.x - width / 2);
  const y = Math.round(player.y + player.r + 8);
  const hpPct = clamp(player.hp / player.maxHp, 0, 1);

  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(x - 1, y - 1, width + 2, height + 2);

  ctx.fillStyle = "#6f0b19";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = hpPct < 0.3 ? "#ff3b57" : "#d8142f";
  ctx.fillRect(x, y, Math.round(width * hpPct), height);

  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 0.5, y - 0.5, width + 1, height + 1);
  ctx.restore();
}

function drawPlayerModel() {
  const color = colorById(save.selectedColor).value;
  const kick = player.recoil;
  const spriteKey = shapeById(save.selectedShape).sprite || "player_marine";
  const sprite = imageAsset(spriteKey);

  if (sprite) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.drawImage(sprite, -15, -15, 30, 30);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = hexToRgba(color, 0.75);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, player.r + 4, 0, Math.PI * 2);
    ctx.stroke();

    const weapon = currentWeapon();
    const weaponImg = imageAsset(weapon.asset);
    if (weaponImg) {
      ctx.translate(15 - kick, 0);
      ctx.rotate(0.02 * Math.sin(nowSec() * 18));
      ctx.drawImage(weaponImg, -5, -7, 22, 14);
    } else {
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-kick * 0.55, 0);
      ctx.lineTo(20 - kick, 0);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  ctx.fillStyle = color;
  drawShape(save.selectedShape, 0, 0, player.r);

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.arc(-4, -6, 4, 0, Math.PI * 2);
  ctx.arc(-4, 6, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-kick * 0.55, 0);
  ctx.lineTo(20 - kick, 0);
  ctx.stroke();

  ctx.fillStyle = "rgba(216,246,255,0.74)";
  ctx.fillRect(4 - kick, -2, 10, 4);
}

function drawShape(shape, x, y, r) {
  ctx.beginPath();
  if (shape === "diamond") {
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
  } else if (shape === "triangle") {
    ctx.moveTo(x + r + 2, y);
    ctx.lineTo(x - r, y - r * 0.85);
    ctx.lineTo(x - r, y + r * 0.85);
    ctx.closePath();
  } else if (shape === "hex") {
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + i * Math.PI / 3;
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else {
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  ctx.fill();
}

function drawBots() {
  for (const bot of bots) {
    if (!botVisibleToPlayer(bot)) continue;

    if (!bot.alive) {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.arc(bot.x, bot.y, bot.r, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }

    const visibilityAlpha = stealthVisibilityAlpha(bot);
    ctx.save();
    ctx.translate(bot.x, bot.y);
    ctx.rotate(bot.angle);

    const flinchScale = bot.flinch > 0 ? 1.12 : 1;
    ctx.scale(flinchScale, flinchScale);
    ctx.globalAlpha = visibilityAlpha * (bot.recentlyHit > 0 ? 0.82 : 1);
    drawBotModel(bot);
    ctx.globalAlpha = 1;
    ctx.restore();

    if (botFullyRevealed(bot)) {
      drawBotHealth(bot);
      if (bot.role === "boss" || bot.role === "duelist") drawBotNameplate(bot);
    }

    if (showDebug) {
      ctx.fillStyle = "rgba(217,222,234,0.85)";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText(`${bot.name} ${bot.role} ${bot.state} ${Math.round(bot.suspicion)}`, bot.x - 48, bot.y - 24);
      if (bot.pressureHint && nowSec() - bot.pressureHint.t < 5.5) {
        ctx.strokeStyle = "rgba(255,209,102,0.5)";
        ctx.beginPath();
        ctx.arc(bot.pressureHint.x, bot.pressureHint.y, 18, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (bot.wrongCheck && bot.maskDelay > 0) {
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(bot.wrongCheck.x, bot.wrongCheck.y, 13, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  if (showDebug && teamPing && nowSec() - teamPing.t < 4.5) {
    ctx.strokeStyle = "rgba(255,209,102,0.65)";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(teamPing.x, teamPing.y, 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

function drawBotModel(bot) {
  const color = bot.flash > 0 ? "#ffffff" : bot.color;
  const r = bot.r;
  const stealthy = isStealthBoss(bot) && !botFullyRevealed(bot);
  ctx.lineWidth = 2;

  if (stealthy) {
    ctx.save();
    ctx.globalAlpha *= 0.55;
    ctx.strokeStyle = hexToRgba(bot.color, 0.75);
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(0, 0, r + 7, r + 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  const spriteKey = bot.profile?.sprite || (bot.role === "boss" ? "boss_vanta" : "enemy_vanta");
  const sprite = imageAsset(spriteKey);
  if (sprite) {
    const size = bot.role === "boss" ? 38 : 30;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = bot.role === "boss" ? 14 : 8;
    ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    ctx.shadowBlur = 0;

    if (bot.flash > 0) {
      ctx.globalAlpha = 0.52;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, r + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.strokeStyle = bot.role === "boss" ? "rgba(255,255,255,0.9)" : hexToRgba(color, 0.82);
    ctx.lineWidth = bot.role === "boss" ? 2.5 : 1.8;
    ctx.beginPath();
    ctx.arc(0, 0, r + (bot.role === "boss" ? 7 : 4), 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r + 8, 0);
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (bot.model === "shield") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(r + 4, 0);
    ctx.lineTo(2, r + 5);
    ctx.lineTo(-r, r * 0.65);
    ctx.lineTo(-r, -r * 0.65);
    ctx.lineTo(2, -r - 5);
    ctx.closePath();
    ctx.fill();
  } else if (bot.model === "split") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-4, -4, r * 0.68, 0, Math.PI * 2);
    ctx.arc(-4, 4, r * 0.68, 0, Math.PI * 2);
    ctx.fill();
  } else if (bot.model === "anchor") {
    ctx.fillStyle = color;
    ctx.fillRect(-r, -r, r * 1.55, r * 2);
    ctx.fillRect(0, -5, r + 7, 10);
  } else if (bot.model === "needle") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(r + 7, 0);
    ctx.lineTo(-r, -r * 0.55);
    ctx.lineTo(-r * 0.5, 0);
    ctx.lineTo(-r, r * 0.55);
    ctx.closePath();
    ctx.fill();
  } else if (bot.model === "boss_blade") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(r + 9, 0);
    ctx.lineTo(0, r + 7);
    ctx.lineTo(-r - 4, 0);
    ctx.lineTo(0, -r - 7);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.62)";
    ctx.stroke();
  } else if (bot.model === "boss_eye") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, r + 7, r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.arc(5, 0, 4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(r + 8, 0);
  ctx.stroke();
}

function drawBotNameplate(bot) {
  const label = bot.role === "boss" ? (bot.profile?.title || bot.callSign || "Boss") : (bot.callSign || bot.role);
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "700 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = bot.role === "boss" ? "rgba(255, 211, 90, 0.92)" : "rgba(235,241,255,0.68)";
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = 4;
  ctx.fillText(label.toUpperCase(), bot.x, bot.y - 28);
  ctx.restore();
}

function drawBotHealth(bot) {
  const w = 32;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(bot.x - w / 2, bot.y + 18, w, 4);
  ctx.fillStyle = bot.hp < 35 ? "#ff5c7a" : "#ffd166";
  ctx.fillRect(bot.x - w / 2, bot.y + 18, w * clamp(bot.hp / bot.maxHp, 0, 1), 4);
}

function drawShots() {
  for (const shot of [...bullets, ...enemyShots]) {
    const alpha = clamp(shot.t / (shot.maxT || 0.09), 0, 1);
    const color = shot.color || (shot.owner === "player" ? "#d8f6ff" : "#ff5c7a");

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = (shot.width || 1.5) + 1.2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 9;
    ctx.beginPath();
    ctx.moveTo(shot.x1, shot.y1);
    ctx.lineTo(shot.x2, shot.y2);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = alpha * 0.65;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1, shot.width || 1.2);
    ctx.beginPath();
    ctx.moveTo(shot.x1, shot.y1);
    ctx.lineTo(shot.x2, shot.y2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawDecals(layer) {
  for (const decal of decals) {
    const isWall = decal.kind === "bullet" || decal.kind === "chip";
    if ((layer === "wall") !== isWall) continue;

    const alpha = clamp(decal.t / decal.maxT, 0, 1);
    ctx.save();
    ctx.translate(decal.x, decal.y);
    ctx.rotate(decal.angle);

    if (decal.kind === "blood") {
      ctx.fillStyle = `rgba(120, 7, 25, ${0.42 * alpha})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, decal.size * 1.2, decal.size * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(190, 18, 47, ${0.24 * alpha})`;
      ctx.beginPath();
      ctx.arc(decal.ox, decal.oy, decal.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
    } else if (decal.kind === "chip") {
      ctx.strokeStyle = `rgba(210,161,93,${0.6 * alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-decal.size, 0);
      ctx.lineTo(decal.size, 0);
      ctx.moveTo(0, -decal.size * 0.5);
      ctx.lineTo(0, decal.size * 0.5);
      ctx.stroke();
    } else {
      ctx.fillStyle = `rgba(0,0,0,${0.7 * alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, decal.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,209,102,${0.22 * alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, decal.size + 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function drawShellCasings() {
  for (const shell of shellCasings) {
    const alpha = clamp(shell.t / shell.maxT, 0, 1);
    ctx.save();
    ctx.translate(shell.x, shell.y);
    ctx.rotate(shell.rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#d6a64a";
    ctx.fillRect(-2, -1, 4, 2);
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(1, -1, 1, 2);
    ctx.restore();
  }
}

function drawMuzzleFlashes() {
  for (const flash of muzzleFlashes) {
    const alpha = clamp(flash.t / flash.maxT, 0, 1);
    ctx.save();
    ctx.translate(flash.x, flash.y);
    ctx.rotate(flash.angle);
    ctx.globalAlpha = alpha;

    ctx.fillStyle = flash.color;
    ctx.shadowColor = flash.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(flash.size, -flash.size * 0.42);
    ctx.lineTo(flash.size * 1.8, 0);
    ctx.lineTo(flash.size, flash.size * 0.42);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = alpha * 0.75;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(flash.size * 0.9, -flash.size * 0.22);
    ctx.lineTo(flash.size * 1.25, 0);
    ctx.lineTo(flash.size * 0.9, flash.size * 0.22);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function drawParticles() {
  for (const p of particles) {
    const alpha = clamp(p.t / p.maxT, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawScreenFlash() {
  if (screenFlash <= 0 || mode !== "running") return;
  ctx.save();
  ctx.fillStyle = `rgba(255,255,255,${Math.min(0.12, screenFlash)})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function drawFloatText() {
  for (const text of floatText) {
    ctx.globalAlpha = clamp(text.t, 0, 1);
    if (text.sprite && imageAsset(text.sprite)) {
      const size = 24 + (1 - text.t) * 12;
      ctx.drawImage(imageAsset(text.sprite), text.x - size / 2, text.y - size / 2, size, size);
    } else {
      ctx.fillStyle = "#d9deea";
      ctx.font = "13px ui-sans-serif, system-ui";
      ctx.fillText(text.text, text.x, text.y - (1 - text.t) * 16);
    }
    ctx.globalAlpha = 1;
  }
}


function drawLightingOverlay() {
  if (!(mode === "running" || mode === "countdown" || mode === "killReplay")) return;

  const bossAlive = bots.some(bot => bot.alive && bot.role === "boss");

  ctx.save();

  for (const wall of walls) {
    ctx.fillStyle = wall.cover ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.12)";
    ctx.fillRect(wall.x + 10, wall.y + 12, wall.w, wall.h);
  }

  for (const smoke of smokes) {
    const r = smoke.r * 0.9;
    const g = ctx.createRadialGradient(smoke.x, smoke.y, 8, smoke.x, smoke.y, r);
    g.addColorStop(0, "rgba(210,230,255,0.07)");
    g.addColorStop(1, "rgba(0,0,0,0.10)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(smoke.x, smoke.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const flash of muzzleFlashes) {
    const r = 70 * clamp(flash.t / flash.maxT, 0, 1);
    const g = ctx.createRadialGradient(flash.x, flash.y, 4, flash.x, flash.y, r);
    g.addColorStop(0, hexToRgba(flash.color, 0.18));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(flash.x, flash.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (bossAlive) {
    ctx.fillStyle = "rgba(255,30,80,0.045)";
    ctx.fillRect(camera.x, camera.y, W, H);
  }

  ctx.restore();
}


function drawCrosshair() {
  const sx = screenMouseX();
  const sy = screenMouseY();
  const img = imageAsset("fx_crosshair");
  if (img) {
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.drawImage(img, sx - 12, sy - 12, 24, 24);
    ctx.restore();
    return;
  }

  ctx.strokeStyle = "rgba(217,222,234,0.55)";
  ctx.beginPath();
  ctx.moveTo(sx - 6, sy);
  ctx.lineTo(sx + 6, sy);
  ctx.moveTo(sx, sy - 6);
  ctx.lineTo(sx, sy + 6);
  ctx.stroke();
}


function drawStoryProgressHud() {
  if (!activeStoryMode || !activeStage) return;
  if (!(mode === "running" || mode === "countdown" || mode === "pauseRequest" || mode === "paused" || mode === "killReplay")) return;

  const totalFloors = 8;
  const floor = clamp(currentFloor || 1, 1, totalFloors);
  const left = Math.max(0, totalFloors - floor);
  const x = W - 188;
  const y = 58;
  const w = 156;
  const h = 34;
  const pipGap = 13;
  const startX = x + 14;
  const lineY = y + 23;

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.65)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.globalAlpha = 0.48;
  ctx.fillStyle = "rgba(0,0,0,0.50)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(240,242,255,0.16)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.globalAlpha = 0.82;

  ctx.textAlign = "left";
  ctx.font = "800 9px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.58)";
  ctx.fillText("STORY", x + 10, y + 10);

  ctx.textAlign = "right";
  ctx.font = "900 14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.86)";
  ctx.fillText(`${floor}/${totalFloors}`, x + w - 10, y + 10);

  ctx.font = "800 8px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.45)";
  ctx.fillText(left === 0 ? "FINAL" : `${left} LEFT`, x + w - 10, y + 24);

  ctx.strokeStyle = "rgba(124,199,255,0.13)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX, lineY);
  ctx.lineTo(startX + pipGap * (totalFloors - 1), lineY);
  ctx.stroke();

  for (let i = 1; i <= totalFloors; i++) {
    const px = startX + (i - 1) * pipGap;
    const done = i < floor;
    const active = i === floor;
    const boss = BOSS_FLOORS.has(i);
    const cache = i === 1;
    const radius = boss ? 2.7 : 2.3;
    const fill = active
      ? "rgba(255,211,90,0.92)"
      : done
        ? "rgba(125,255,178,0.50)"
        : boss
          ? "rgba(255,92,122,0.32)"
          : cache
            ? "rgba(124,199,255,0.28)"
            : "rgba(235,241,255,0.18)";

    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(px, lineY, active ? radius + 1.7 : radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = active
      ? "rgba(255,211,90,0.82)"
      : boss
        ? "rgba(255,92,122,0.38)"
        : "rgba(235,241,255,0.16)";
    ctx.lineWidth = active ? 1.5 : 1;
    ctx.beginPath();
    ctx.arc(px, lineY, active ? radius + 4 : radius + 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawAmmoHud() {
  if (!activeStage || mode !== "running") return;

  const x = W - 34;
  const y = H - 30;
  const isReloading = player.reload > 0;
  const isEmpty = player.ammo <= 0;
  const weapon = currentWeapon();

  ctx.save();
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.64)";
  ctx.fillText(weapon.name.toUpperCase(), x, y - 48);

  const heatWidth = 84;
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(x - heatWidth, y - 43, heatWidth, 4);
  ctx.fillStyle = weapon.color;
  ctx.fillRect(x - heatWidth, y - 43, heatWidth * clamp(player.weaponHeat, 0, 1), 4);
  ctx.globalAlpha = 1;

  ctx.font = "700 34px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = isEmpty || isReloading ? "#ffd166" : "rgba(235,241,255,0.92)";
  ctx.fillText(String(player.ammo), x - 48, y);

  ctx.font = "700 22px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.52)";
  ctx.fillText("/", x - 32, y - 2);

  ctx.font = "700 26px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.72)";
  ctx.fillText(String(player.maxAmmo), x, y);

  if (isReloading) {
    ctx.font = "700 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "rgba(255,209,102,0.86)";
    ctx.fillText("RELOAD", x, y - 32);
  }

  ctx.restore();
}

function drawUtilityHud() {
  if (!activeStage || !(mode === "running" || mode === "countdown")) return;

  const baseX = 28;
  const baseY = H - 28;
  const pulseReady = player.pulseCd <= 0;
  const pulseCount = pulseReady ? 1 : 0;
  const pulseLabel = pulseReady ? "READY" : `${player.pulseCd.toFixed(1)}s`;
  const dodgeReady = player.dashCd <= 0;
  const dodgeLabel = dodgeReady ? "READY" : `${player.dashCd.toFixed(1)}s`;

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  drawUtilityBox(baseX, baseY - 88, "SPC", "DODGE", dodgeReady ? "1" : "0", dodgeReady ? "#7dffb2" : "#ffd166", dodgeLabel);
  drawUtilityBox(baseX, baseY - 44, "E", "SMOKE", String(player.smokeCharges || 0), "#d8dbe8");
  drawUtilityBox(baseX, baseY, "Q", "PULSE", String(pulseCount), pulseReady ? "#7cc7ff" : "#ffd166", pulseLabel);
  drawBossAbilityHud(baseX, baseY - 132);
  drawRunRetryHud(W - 120, H - 72);

  ctx.restore();
}

function drawRunRetryHud(x, y) {
  const retries = runStats?.retries || 0;
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "rgba(20,6,28,0.72)";
  ctx.fillRect(x, y, 92, 28);
  ctx.strokeStyle = "rgba(255, 211, 90, 0.72)";
  ctx.strokeRect(x + 0.5, y + 0.5, 91, 27);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 10px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("RETRY", x + 10, y + 17);
  ctx.textAlign = "right";
  ctx.fillStyle = retries > 0 ? "#f5f1ff" : "rgba(217,222,234,0.5)";
  ctx.fillText(String(retries), x + 80, y + 17);
  ctx.restore();
}

function drawBossAbilityHud(x, y) {
  const ability = runStats?.bossAbility;
  if (!ability || ability.pending) return;
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "rgba(20,6,28,0.72)";
  ctx.fillRect(x, y - 22, 190, 34);
  ctx.strokeStyle = "rgba(255, 211, 90, 0.72)";
  ctx.strokeRect(x + 0.5, y - 21.5, 189, 33);
  ctx.fillStyle = "#ffd35a";
  ctx.font = "900 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textAlign = "left";
  ctx.fillText("BOSS", x + 8, y - 7);
  ctx.fillStyle = "rgba(246,248,255,0.9)";
  ctx.font = "700 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillText(`${ability.name}  ${ability.hitsLeft}`, x + 52, y - 7);
  ctx.restore();
}


function drawUtilityBox(x, y, key, label, count, color, sub = "") {
  ctx.save();
  ctx.globalAlpha = 0.84;
  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(x, y - 24, 142, 36);
  ctx.strokeStyle = "rgba(240,242,255,0.22)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y - 23.5, 141, 35);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(12,17,30,0.95)";
  ctx.fillRect(x + 7, y - 17, 26, 24);
  ctx.strokeStyle = color;
  ctx.strokeRect(x + 7.5, y - 16.5, 25, 23);

  ctx.font = `700 ${key.length > 1 ? 10 : 13}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  ctx.fillStyle = "rgba(246,248,255,0.92)";
  ctx.textAlign = "center";
  ctx.fillText(key, x + 20, y - 4);

  ctx.textAlign = "left";
  ctx.font = "700 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(235,241,255,0.74)";
  ctx.fillText(label, x + 42, y - 9);

  ctx.font = "700 24px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillStyle = color;
  ctx.textAlign = "right";
  ctx.fillText(count, x + 132, y - 5);

  if (sub) {
    ctx.font = "700 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx.fillStyle = "rgba(235,241,255,0.62)";
    ctx.textAlign = "left";
    ctx.fillText(sub, x + 42, y + 6);
  }

  ctx.restore();
}


function hexToRgba(hex, a) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

function loop(t) {
  const rawDt = Math.min(0.035, (t - lastTime) / 1000);
  lastTime = t;

  updatePauseRequest();
  syncPauseButton();
  updateCursorMode();

  if (mode === "village") {
    updateVillage(rawDt);
    updateEffects(rawDt);
    updateHud();
    draw();
    requestAnimationFrame(loop);
    return;
  }

  if (mode === "villagePaused") {
    updateHud();
    draw();
    requestAnimationFrame(loop);
    return;
  }

  if (hitStop > 0) {
    hitStop = Math.max(0, hitStop - rawDt);
  }

  const dt = hitStop > 0 ? 0 : rawDt;

  if (mode === "countdown") {
    updateCountdown();
    if (dt > 0) updateEffects(dt);
    updateHud();
  }

  if (mode === "killReplay") {
    updateKillReplay(rawDt);
    updateEffects(rawDt * 0.32);
    updateHud();
  }

  if (running && !gameOver && mode === "running") {
    if (dt > 0) {
      updatePlayer(dt);
      updateBots(dt);
      updateEffects(dt);
    }
    updateHud();
  }

  draw();
  requestAnimationFrame(loop);
}

function canvasPos(event) {
  const rect = canvas.getBoundingClientRect();
  const sx = (event.clientX - rect.left) * (canvas.width / rect.width);
  const sy = (event.clientY - rect.top) * (canvas.height / rect.height);
  return {
    x: sx + camera.x,
    y: sy + camera.y,
    screenX: sx,
    screenY: sy
  };
}

window.addEventListener("keydown", e => {
  resumeAudio();
  const key = e.key.toLowerCase();
  if (key === "escape" && handleOverlayEscape()) {
    e.preventDefault();
    return;
  }
  if (mode === "village") {
    if (key === "escape") {
      e.preventDefault();
      if (villageMapOpen) { villageMapOpen = false; return; }
      if (villageBuildMode) { villageBuildMode = false; villageMoveState = null; setVillageMessage("Move Mode", "Town layout saved.", 2.0); return; }
      showVillagePauseOverlay();
      return;
    }
    if (key === "p") {
      e.preventDefault();
      showVillagePauseOverlay();
      return;
    }
    if (key === "m") {
      e.preventDefault();
      if (!e.repeat) toggleVillageMap();
      return;
    }
    if (key === "b") {
      e.preventDefault();
      if (!e.repeat) toggleVillageBuildMode();
      return;
    }
    if (handleVillageFishingInput(key)) {
      e.preventDefault();
      return;
    }
    if (!villageMapOpen && !villageBridgeCutscene && ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"].includes(key)) keys.add(key);
    if (key === "enter") {
      e.preventDefault();
      if (!e.repeat) toggleVillageHistory();
      return;
    }
    if (key === "e") {
      e.preventDefault();
      if (!e.repeat) interactVillage();
    }
    return;
  }
  if (key === "p" || key === "escape") {
    e.preventDefault();
    if (mode === "villagePaused") resumeVillage();
    else if (mode === "running") requestFightPause();
    else if (mode === "paused") resumeFight();
    else if (mode === "pauseRequest") showPauseOverlay(false);
    return;
  }
  if (key === " " || key === "spacebar") {
    e.preventDefault();
    doPlayerDash();
    return;
  }
  keys.add(key);

  if (key === "1") setWeapon("pistol");
  if (key === "2") setWeapon("smg");
  if (key === "3") setWeapon("shotgun");
  if (key === "4") setWeapon("carbine");
  if (key === "5") setWeapon("revolver");
  if (key === "6") setWeapon("dmr");
  if (key === "7") setWeapon("lmg");
  if (key === "8") setWeapon("needler");
  if (key === "9") setWeapon("breacher");
  if (key === "e") throwSmoke();
  if (key === "r") startReload();
  if (key === "q") pulse();
  if (key === "h") {
    showDebug = !showDebug;
    addLog(`Debug ${showDebug ? "enabled" : "disabled"}.`);
    updateHud();
  }
  if (key === "enter") {
    if (mode === "menu") startTower();
    else if (mode === "gameOver") startTower();
    else if (mode === "bossIntro") beginRoundCountdown();
    else if (mode === "storyBriefing") continueStoryBriefing();
    else if (mode === "storyScene") continueStoryScene();
  }
});

window.addEventListener("keyup", e => keys.delete(e.key.toLowerCase()));

if (pauseButton) {
  pauseButton.addEventListener("click", () => {
    resumeAudio();
    requestFightPause();
  });
}

canvas.addEventListener("mousemove", e => {
  const p = canvasPos(e);
  mouse.x = p.x;
  mouse.y = p.y;
  mouse.screenX = p.screenX;
  mouse.screenY = p.screenY;
});

canvas.addEventListener("mousedown", e => {
  resumeAudio();
  if (e.button === 0 && mode === "village") {
    mouse.down = false;
    const p = canvasPos(e);
    mouse.x = p.x;
    mouse.y = p.y;
    mouse.screenX = p.screenX;
    mouse.screenY = p.screenY;
    if (villageMapOpen) return;
    if (handleVillageBuildMouseDown(p.x, p.y)) return;
    if (!villageBridgeCutscene) clickVillageActionAt(p.x, p.y);
    return;
  }
  if (e.button === 0 && mode === "running" && !gameOver) {
    mouse.down = true;
    player.fireBuffer = Math.max(player.fireBuffer, 0.16);
  }
});

window.addEventListener("mouseup", e => {
  if (e.button === 0) mouse.down = false;
});

overlay.addEventListener("click", e => {
  const button = e.target.closest("button[data-action]");
  if (!button) return;

  resumeAudio();
  playAssetSfx("ui_button_click", 0.36);
  const action = button.dataset.action;
  if (action === "noop") return;

  const actions = {
    startTower: () => startTower(),
    openHub: () => renderVillageHub(),
    backVillage: () => {
      villageHistoryOpen = false;
      returnToVillageFromOverlay();
    },
    backVillageHistory: () => closeVillageHistory(),
    openVillageBoard: () => renderVillageDailyBoard(),
    selectVillageTask: () => selectVillageTask(button.dataset.taskId),
    continueTowerGate: () => continueTowerGate(),
    buyShrineOffer: () => buyShrineOffer(button.dataset.offerId || ""),
    upgradeHouse: () => upgradeVillageHouse(),
    sleepHouse: () => sleepVillageHouse(),
    storeChest: () => moveChestResource(button.dataset.resource || "", "store", e.shiftKey),
    takeChest: () => moveChestResource(button.dataset.resource || "", "take", e.shiftKey),
    useVillageSink: () => useVillageSink(button.dataset.sinkId || ""),
    openStory: () => renderStorySelect(),
    helpVillager: () => helpVillager(button.dataset.id),
    startStoryChapter: () => startStoryChapter(button.dataset.id),
    continueStoryBriefing: () => continueStoryBriefing(),
    continueStoryScene: () => continueStoryScene(),
    beginBossIntro: () => beginRoundCountdown(),
    backMenu: () => renderMenu(),
    openUnlocks: () => renderUnlockList(),
    openCollection: () => renderCollection(),
    openPowerUps: () => renderPowerUps(),
    openUnlockList: () => renderUnlockList(),
    openOptions: () => renderOptions(),
    openVillageOptions: () => renderOptions("backVillagePause", "villagePaused"),
    backVillagePause: () => showVillagePauseOverlay(),
    toggleDebugMenu: () => {
      showDebug = !showDebug;
      renderOptions(optionsBackAction, optionsLivePauseMode);
    },
    toggleMuteUnfocused: () => {
      setMuteUnfocused(!muteWhenUnfocusedEnabled());
      renderOptions(optionsBackAction, optionsLivePauseMode);
    },
    quitApp: () => {
      if (window.veyrDesktop?.quitApp) {
        window.veyrDesktop.quitApp();
        return;
      }
      window.close();
    },
    resetSave: () => resetSave(),
    refundPowerups: () => refundPowerups(),
    buyPowerup: () => buyPowerup(button.dataset.id),
    claimFloorReward: () => claimFloorReward(),
    chooseReward: () => chooseReward(Number(button.dataset.index)),
    chooseUpgrade: () => chooseUpgrade(Number(button.dataset.index)),
    chooseRoute: () => chooseRoute(button.dataset.route),
    buy: () => buyUnlock(button.dataset.type, button.dataset.id),
    equip: () => equipUnlock(button.dataset.type, button.dataset.id),
    resumeFight: () => resumeFight(),
    resumeVillage: () => resumeVillage(),
    confirmEndRun: () => showEndRunConfirm(),
    abandonRun: () => abandonRun(),
    retryTower: () => startTower(activeStoryMode ? { story: true, chapterId: activeStoryChapterId } : {})
  };

  if (actions[action]) actions[action]();
});

overlay.addEventListener("input", e => {
  const input = e.target.closest("input[data-volume]");
  if (!input) return;
  const name = input.dataset.volume;
  const value = Number(input.value) / 100;
  setVolumeSetting(name, value);
  const label = overlay.querySelector(`[data-volume-value="${name}"]`);
  if (label) label.textContent = `${Math.round(value * 100)}%`;
});

function updateFocusAudioMute() {
  updateMusicVolume();
  updateOneShotAudioVolumes();
}

window.addEventListener("blur", updateFocusAudioMute);
window.addEventListener("focus", updateFocusAudioMute);
document.addEventListener("visibilitychange", updateFocusAudioMute);

renderLog();
renderMenu();
requestAnimationFrame(loop);
