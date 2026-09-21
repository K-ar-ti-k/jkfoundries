"use client";

import { useEffect, useState } from "react";
import { getProcessContent, updateProcessContent, ProcessItem } from "@/lib/firebase/firestore";

const defaultItems: ProcessItem[] = [
  {
    name: "Green Sand Moulding",
    emoji: "🟢",
    weightRange: "0.5 – 60 kg",
    description: "Cost-effective and flexible moulding process for medium-sized castings with consistent quality.",
    bullets: ["Good surface finish", "Fast pattern changes", "Suitable for medium batch production"],
    color: "green",
  },
  {
    name: "Shell Moulding",
    emoji: "🟡",
    weightRange: "0.2 – 25 kg",
    description: "High-precision moulding process for small and intricate components.",
    bullets: ["Excellent dimensional accuracy", "Minimal machining allowance", "Ideal for complex geometries"],
    color: "yellow",
  },
  {
    name: "CO₂ Moulding",
    emoji: "🔵",
    weightRange: "50 – 250 kg",
    description: "Robust moulding solution for large and heavy-duty steel castings.",
    bullets: ["Strong mould stability", "Consistent dimensional control", "Suitable for structural applications"],
    color: "blue",
  },
];

export default function AdminServicesProcessPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<ProcessItem[]>(defaultItems);

  useEffect(() => {
    (async () => {
      const data = await getProcessContent("foundry_process");
      if (data?.items) setItems(data.items);
      setLoading(false);
    })();
  }, []);

  const addItem = () => setItems([...items, { name: "", emoji: "", weightRange: "", description: "", bullets: [], color: "green" }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = <K extends keyof ProcessItem>(i: number, key: K, value: ProcessItem[K]) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    setItems(next);
  };
  const addBullet = (i: number) => {
    const next = [...items];
    next[i] = { ...next[i], bullets: [...(next[i].bullets || []), ""] };
    setItems(next);
  };
  const updateBullet = (i: number, j: number, value: string) => {
    const next = [...items];
    const bullets = [...(next[i].bullets || [])];
    bullets[j] = value;
    next[i] = { ...next[i], bullets };
    setItems(next);
  };
  const removeBullet = (i: number, j: number) => {
    const next = [...items];
    const bullets = (next[i].bullets || []).filter((_, idx) => idx !== j);
    next[i] = { ...next[i], bullets };
    setItems(next);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProcessContent("foundry_process", { items });
      alert("Process content saved");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product & Services: Foundry Process</h1>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        {items.map((item, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                placeholder="Emoji (e.g., 🟢)"
                value={item.emoji || ""}
                onChange={(e) => updateItem(i, "emoji", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <select
                value={item.color || "green"}
                onChange={(e) => updateItem(i, "color", e.target.value as ProcessItem["color"])}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
              </select>
              <input
                placeholder="Process Name"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                placeholder="Weight Range"
                value={item.weightRange}
                onChange={(e) => updateItem(i, "weightRange", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Bullets</label>
                <button type="button" className="text-primary" onClick={() => addBullet(i)}>+ Add Bullet</button>
              </div>
              <div className="space-y-2">
                {(item.bullets || []).map((b, j) => (
                  <div key={j} className="flex gap-2">
                    <input
                      placeholder="Bullet text"
                      value={b}
                      onChange={(e) => updateBullet(i, j, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button type="button" onClick={() => removeBullet(i, j)} className="px-3 py-2 border rounded-md">Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <button type="button" onClick={() => removeItem(i)} className="px-3 py-2 border rounded-md">Remove Process</button>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button type="button" onClick={addItem} className="px-4 py-2 border rounded-md">+ Add Process</button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Process Content"}
          </button>
        </div>
      </div>
    </div>
  );
}
