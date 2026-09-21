"use client";

import { useEffect, useState } from "react";
import { getPageContent, updatePageContent, PageStat } from "@/lib/firebase/firestore";

export default function AdminServicesOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [stats, setStats] = useState<PageStat[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPageContent("foundry_overview");
      if (data) {
        setHeroTitle(data.heroTitle || "");
        setHeroDescription(data.heroDescription || "");
        setStats(data.stats || []);
        setCertifications(data.certifications || []);
      } else {
        setStats([
          { label: "Operational track record", value: "2007+" },
          { label: "Applications focus", value: "Industrial" },
          { label: "Certifications", value: "ISO 9001 / 14001 / 45001" },
          { label: "Supply", value: "Reliable high-volume supply" },
        ]);
        setCertifications([
          "ISO 9001:2015 — Quality Management",
          "ISO 14001:2015 — Environmental Management",
          "ISO 45001:2018 — Occupational Health & Safety",
          "ZED Certification — Zero Defect Zero Effect",
        ]);
      }
      setLoading(false);
    })();
  }, []);

  const addStat = () => setStats([...stats, { label: "", value: "" }]);
  const updateStat = (i: number, key: keyof PageStat, value: string) => {
    const next = [...stats];
    next[i] = { ...next[i], [key]: value };
    setStats(next);
  };
  const removeStat = (i: number) => setStats(stats.filter((_, idx) => idx !== i));

  const addCertification = () => setCertifications([...certifications, ""]);
  const updateCertification = (i: number, value: string) => {
    const next = [...certifications];
    next[i] = value;
    setCertifications(next);
  };
  const removeCertification = (i: number) => setCertifications(certifications.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePageContent("foundry_overview", {
        heroTitle,
        heroDescription,
        stats,
        certifications,
      });
      alert("Overview content saved");
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
      <h1 className="text-2xl font-bold mb-6">Product & Services: Foundry Overview</h1>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
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
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Stats</label>
            <button type="button" className="text-primary" onClick={addStat}>+ Add Stat</button>
          </div>
          <div className="space-y-3">
            {stats.map((s, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <input
                  placeholder="Value (e.g., 2007+)"
                  value={s.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Label (e.g., Operational track record)"
                    value={s.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button type="button" onClick={() => removeStat(i)} className="px-3 py-2 border rounded-md">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Certifications (Text-only)</label>
            <button type="button" className="text-primary" onClick={addCertification}>+ Add Certification</button>
          </div>
          <div className="space-y-3">
            {certifications.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input
                  placeholder="Certification name"
                  value={c}
                  onChange={(e) => updateCertification(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button type="button" onClick={() => removeCertification(i)} className="px-3 py-2 border rounded-md">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Overview Content"}
          </button>
        </div>
      </div>
    </div>
  );
}
