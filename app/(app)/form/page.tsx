"use client";

import { useState } from "react";

export default function ProtesisFormPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      user_id: "test-user",
      dog_name: form.get("dog_name"),
      dog_weight_kg: Number(form.get("dog_weight_kg")),
      dog_breed: form.get("dog_breed"),
      dog_size: form.get("dog_size"),
      limb_position: form.get("limb_position"),
      limb_side: form.get("limb_side"),
      stump_length_cm: Number(form.get("stump_length_cm")),
      proximal_circumference_cm: Number(form.get("proximal_circumference_cm")),
      distal_circumference_cm: Number(form.get("distal_circumference_cm")),
    };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("API URL:", apiUrl);
    console.log("FULL URL:", `${apiUrl}/prosthesis/generate`);
    
 
    try {
        const res = await fetch("/api/prosthesis/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          

      const data = await res.json();
      console.log("Respuesta FastAPI:", data);
      alert("Solicitud enviada correctamente");
    } catch (error) {
      console.error(error);
      alert("Error enviando solicitud");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold mb-2">
          Generar prótesis
        </h1>
  
        <p className="text-zinc-400 mb-8">
          Cargá los datos del perro para generar el STL
        </p>
  
        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
        >
          <input
            name="dog_name"
            placeholder="Nombre del perro"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
  
          <input
            name="dog_weight_kg"
            type="number"
            placeholder="Peso en kg"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
  
          <input
            name="dog_breed"
            placeholder="Raza"
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
  
          <select
            name="dog_size"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
          >
            <option value="">Tamaño</option>
            <option value="chico">Chico</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
  
          <div className="grid grid-cols-2 gap-4">
            <select
              name="limb_position"
              required
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              <option value="">Pata</option>
              <option value="delantera">Delantera</option>
              <option value="trasera">Trasera</option>
            </select>
  
            <select
              name="limb_side"
              required
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              <option value="">Lado</option>
              <option value="izquierda">Izquierda</option>
              <option value="derecha">Derecha</option>
            </select>
          </div>
  
          <input
            name="stump_length_cm"
            type="number"
            placeholder="Largo muñón (cm)"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
          />
  
          <input
            name="proximal_circumference_cm"
            type="number"
            placeholder="Circunferencia proximal (cm)"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
          />
  
          <input
            name="distal_circumference_cm"
            type="number"
            placeholder="Circunferencia distal (cm)"
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
          />
  
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-cyan-500 hover:bg-cyan-400 transition-all text-black font-semibold rounded-xl py-3"
          >
            {loading ? "Generando..." : "Generar STL"}
          </button>
        </form>
      </div>
    </main>
  );
}