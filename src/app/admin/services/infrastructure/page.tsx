"use client";

import { useEffect, useState } from "react";
import { getInfrastructureContent, updateInfrastructureContent, InfrastructureUnit } from "@/lib/firebase/firestore";

const defaultUnits: InfrastructureUnit[] = [
  {
    title: "Unit-1: Casting Unit",
    description: "Our primary casting unit is where the magic begins. This facility houses our core casting operations, featuring advanced equipment for producing high-quality steel castings with precision and efficiency.",
    equipment: [
      "Sand mixers for optimal mold preparation",
      "Hand moulding stations for detailed work",
      "Induction furnace with capacity of 500 kg per heat",
      "Overhead cranes for material handling",
      "Quality control testing equipment",
    ],
    imageSrc: "/unit1.webp",
  },
  {
    title: "Unit-2: Fettling Unit",
    description: "Our dedicated fettling unit is where raw castings are refined and finished to meet exact specifications. This unit ensures that every product meets our stringent quality standards before delivery.",
    equipment: [
      "Shot blast machines for surface cleaning",
      "Hand grinders for precision finishing",
      "Welding machines for repairs and modifications",
      "Inspection stations with advanced measuring tools",
      "Packaging and shipping preparation area",
    ],
    imageSrc: "/unit2.webp",
  },
  {
    title: "Unit-3: Casting Unit",
    description: "Unit 3 extends JK Foundry's casting capacity with a dedicated production area for repeatable, high-quality steel castings. The unit supports flexible production planning for custom components while maintaining controlled melting, moulding, handling, and inspection practices.",
    equipment: [
      "Additional induction melting and pouring equipment",
      "Mould preparation and casting workstations",
      "Overhead cranes for safe material handling",
      "Fettling and surface finishing support",
      "Inspection area for dimensional and visual checks",
    ],
    imageSrc: "/unit3.webp",
  },
];

export default function AdminServicesInfrastructurePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [units, setUnits] = useState<InfrastructureUnit[]>(defaultUnits);

  useEffect(() => {
    (async () => {
      const data = await getInfrastructureContent();
      if (data) {
        setHeroTitle(data.heroTitle || "Our Infrastructure");
        setHeroDescription(data.heroDescription || "State-of-the-art facilities and equipment for high-quality steel castings");
        if (data.units && data.units.length > 0) setUnits(data.units);
      }
      setLoading(false);
    })();
  }, []);

  const addUnit = () => setUnits([...units, { title: "", description: "", equipment: [], imageSrc: "" }]);
  const removeUnit = (i: number) => setUnits(units.filter((_, idx) => idx !== i));
  const updateUnit = (i: number, key: keyof InfrastructureUnit, value: string) => {
    const next = [...units];
    next[i] = { ...next[i], [key]: value };
    setUnits(next);
  };
  const addEquipment = (i: number) => {
    const next = [...units];
    next[i] = { ...next[i], equipment: [...next[i].equipment, ""] };
    setUnits(next);
  };
  const updateEquipment = (i: number, j: number, value: string) => {
    const next = [...units];
    const equipment = [...next[i].equipment];
    equipment[j] = value;
    next[i] = { ...next[i], equipment };
    setUnits(next);
  };
  const removeEquipment = (i: number, j: number) => {
    const next = [...units];
    const equipment = next[i].equipment.filter((_, idx) => idx !== j);
    next[i] = { ...next[i], equipment };
    setUnits(next);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateInfrastructureContent({
        heroTitle,
        heroDescription,
        units,
      });
      alert("Infrastructure content saved");
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
      <h1 className="text-2xl font-bold mb-6">Product & Services: Infrastructure</h1>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
          <textarea
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Units</h2>
          <button type="button" onClick={addUnit} className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">+ Add Unit</button>
        </div>

        {units.map((unit, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Title</label>
                <input
                  value={unit.title}
                  onChange={(e) => updateUnit(i, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  value={unit.imageSrc}
                  onChange={(e) => updateUnit(i, "imageSrc", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={unit.description}
                  onChange={(e) => updateUnit(i, "description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Equipment List</label>
                <button type="button" className="text-primary text-sm" onClick={() => addEquipment(i)}>+ Add Equipment</button>
              </div>
              <div className="space-y-2">
                {unit.equipment.map((eq, j) => (
                  <div key={j} className="flex gap-2">
                    <input
                      value={eq}
                      onChange={(e) => updateEquipment(i, j, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                    <button type="button" onClick={() => removeEquipment(i, j)} className="px-2 py-1 text-red-500 text-sm border border-red-200 rounded hover:bg-red-50">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right pt-2 border-t mt-4">
              <button type="button" onClick={() => removeUnit(i)} className="text-red-600 text-sm hover:underline">Remove Unit</button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 font-medium"
          >
            {saving ? "Saving..." : "Save Infrastructure Content"}
          </button>
        </div>
      </div>
    </div>
  );
}
