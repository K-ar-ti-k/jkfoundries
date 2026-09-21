"use client";

import { useEffect, useState } from "react";
import { getQAContent, updateQAContent, QAItem } from "@/lib/firebase/firestore";

const defaultItems: QAItem[] = [
  {
    question: "What industries do you serve?",
    answer: "We manufacture and supply components for trucks, trolleys, industrial equipment, and general engineering applications.",
  },
  {
    question: "What is your production capacity?",
    answer: "Our current production capacity allows us to handle large-scale orders efficiently, with continuous expansion plans to meet growing demand.",
  },
  {
    question: "Do you offer custom casting solutions?",
    answer: "Yes, we specialize in custom casting solutions tailored to specific client requirements and technical specifications.",
  },
];

export default function AdminServicesQAPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<QAItem[]>(defaultItems);

  useEffect(() => {
    (async () => {
      const data = await getQAContent();
      if (data) {
        setTitle(data.title || "Frequently Asked Questions");
        setDescription(data.description || "Find answers to common questions about our services and capabilities.");
        if (data.items && data.items.length > 0) setItems(data.items);
      }
      setLoading(false);
    })();
  }, []);

  const addItem = () => setItems([...items, { question: "", answer: "" }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: keyof QAItem, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    setItems(next);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateQAContent({
        title,
        description,
        items,
      });
      alert("Q/A content saved");
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
      <h1 className="text-2xl font-bold mb-6">Product & Services: Q / A</h1>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Header Section</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Questions & Answers</h2>
          <button type="button" onClick={addItem} className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">+ Add Item</button>
        </div>

        {items.map((item, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input
                value={item.question}
                onChange={(e) => updateItem(i, "question", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(i, "answer", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="text-right pt-2">
              <button type="button" onClick={() => removeItem(i)} className="text-red-600 text-sm hover:underline">Remove</button>
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
            {saving ? "Saving..." : "Save Q/A Content"}
          </button>
        </div>
      </div>
    </div>
  );
}
