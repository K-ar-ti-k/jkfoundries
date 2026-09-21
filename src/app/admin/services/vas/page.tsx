"use client";

import { useEffect, useState } from "react";
import { getVASContent, updateVASContent, VASContent } from "@/lib/firebase/firestore";

const services = [
  { slug: "machinery-services", name: "Machinery Services" },
  { slug: "pattern-mould-die-making", name: "Pattern & Mould Making" },
];

export default function AdminServicesVASPage() {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<VASContent>({
    slug: services[0].slug,
    title: "",
    description: "",
    imageSrc: "",
    features: [],
  });

  useEffect(() => {
    loadContent(selectedSlug);
  }, [selectedSlug]);

  const loadContent = async (slug: string) => {
    setLoading(true);
    const data = await getVASContent(slug);
    if (data) {
      setContent(data);
    } else {
      // Default content if not found
      setContent({
        slug,
        title: services.find(s => s.slug === slug)?.name || "",
        description: "",
        imageSrc: "",
        features: [],
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateVASContent(selectedSlug, content);
      alert("Content saved successfully");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => setContent({ ...content, features: [...content.features, ""] });
  const removeFeature = (i: number) => setContent({ ...content, features: content.features.filter((_, idx) => idx !== i) });
  const updateFeature = (i: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[i] = value;
    setContent({ ...content, features: newFeatures });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product & Services: Value Added Services</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        {services.map((service) => (
          <button
            key={service.slug}
            onClick={() => setSelectedSlug(service.slug)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              selectedSlug === service.slug
                ? "bg-white border border-b-0 text-primary"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow rounded-tl-none">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={content.imageSrc || ""}
              onChange={(e) => setContent({ ...content, imageSrc: e.target.value })}
              placeholder="/images/service.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Features / Key Points</label>
              <button type="button" onClick={addFeature} className="text-primary text-sm hover:underline">+ Add Feature</button>
            </div>
            <div className="space-y-2">
              {content.features.map((feature, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button type="button" onClick={() => removeFeature(i)} className="px-2 py-1 text-red-500 text-sm border border-red-200 rounded hover:bg-red-50">×</button>
                </div>
              ))}
              {content.features.length === 0 && (
                <p className="text-sm text-gray-500 italic">No features added yet.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t mt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 font-medium"
            >
              {saving ? "Saving..." : "Save Content"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
