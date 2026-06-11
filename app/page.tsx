"use client";

import { useState } from "react";
import {
  createRNG,
  getSeed,
  randomizeModule,
  RandomizerModule,
} from "@/lib/randomizer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const [seed, setSeed] = useState("");

  const [module, setModule] =
    useState<RandomizerModule>("encounters");

  const [intensity, setIntensity] = useState(200);

  const handleRandomize = async () => {
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const finalSeed = getSeed(seed);
    const rng = createRNG(finalSeed);

    const result = randomizeModule(
      bytes,
      rng,
      module,
      intensity
    );

    const blob = new Blob([result]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `pokemon-random-${file.name}`;
    a.click();

    URL.revokeObjectURL(url);

    console.log("Seed:", finalSeed);
    console.log("Module:", module);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">

      <h1 className="text-3xl font-bold">
        Pokémon Randomizer
      </h1>

      {/* FILE */}
      <input
        type="file"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
        }}
      />

      {file && (
        <p className="text-green-600">
          Archivo: {file.name}
        </p>
      )}

      {/* MODULE SELECTOR */}
      <select
        value={module}
        onChange={(e) =>
          setModule(e.target.value as RandomizerModule)
        }
        className="border p-2 rounded w-72"
      >
        <option value="encounters">Encounters</option>
        <option value="trainers">Trainers</option>
        <option value="stats">Base Stats</option>
      </select>

      {/* INTENSITY */}
      <input
        type="number"
        value={intensity}
        onChange={(e) =>
          setIntensity(parseInt(e.target.value))
        }
        className="border p-2 rounded w-72"
        placeholder="Intensity"
      />

      {/* SEED */}
      <input
        type="number"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        className="border p-2 rounded w-72"
        placeholder="Seed (opcional)"
      />

      {/* BUTTON */}
      <button
        onClick={handleRandomize}
        disabled={!file}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Randomizar Pokémon
      </button>
    </main>
  );
}