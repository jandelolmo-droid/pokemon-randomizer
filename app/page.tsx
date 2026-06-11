"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleDownloadCopy = async () => {
    if (!file) return;

    const buffer = await file.arrayBuffer();

    const blob = new Blob([buffer]);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `copy-${file.name}`;
    a.click();

    URL.revokeObjectURL(url);
  };

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
        <>
          <p>
            Archivo seleccionado: {file.name}
          </p>

          <button
            onClick={handleDownloadCopy}
            className="px-4 py-2 border rounded"
          >
            Descargar copia
          </button>
        </>
      )}
    </main>
  );
}