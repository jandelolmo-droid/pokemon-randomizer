"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Pokemon Randomizer
      </h1>

      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      {file && (
        <p>
          Archivo seleccionado: {file.name}
        </p>
      )}
    </main>
  );
}