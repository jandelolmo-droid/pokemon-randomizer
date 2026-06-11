export type RandomizerModule =
  | "encounters"
  | "trainers"
  | "stats";

export function createRNG(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSeed(inputSeed?: string) {
  return inputSeed
    ? parseInt(inputSeed)
    : Math.floor(Math.random() * 100000);
}

/**
 * Motor modular base (SIMULADO, preparado para Pokémon real después)
 */
export function randomizeModule(
  bytes: Uint8Array,
  rng: () => number,
  module: RandomizerModule,
  intensity: number
) {
  const result = new Uint8Array(bytes);

  let start = 0;
  let size = 0;

  switch (module) {
    case "encounters":
      start = 0x1A000;
      size = 8000;
      break;

    case "trainers":
      start = 0x2C000;
      size = 12000;
      break;

    case "stats":
      start = 0x3D000;
      size = 6000;
      break;
  }

  const end = Math.min(start + size, result.length);

  for (let i = 0; i < intensity; i++) {
    const index = start + Math.floor(rng() * (end - start));

    if (index >= 0 && index < result.length) {
      result[index] = Math.floor(rng() * 256);
    }
  }

  return result;
}