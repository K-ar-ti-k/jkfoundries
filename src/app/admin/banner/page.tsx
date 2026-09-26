"use client";

import { useEffect, useState } from "react";
import { getBannerConfig, updateBannerConfig, BannerConfig } from "@/lib/firebase/firestore";

const defaultBanner: BannerConfig = {
  isEnabled: false,
  leadIn: "New Launch",
  productName: "Non-Cylindrical Pouches",
  benefit: "Low MOQ",
  ctaText: "Order Now",
  ctaLink: "/products",
  subText: "Custom sizes, colors, and finishes available",
  backgroundColor: "#f97316", // Orange-500 default
  textColor: "#ffffff",
  targetAudience: "all",
};

export default function BannerAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BannerConfig>(defaultBanner);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getBannerConfig();
        if (config) {
          // Ensure dates are formatted for datetime-local
          const formattedConfig = { ...config };
          formattedConfig.isEnabled = config.isEnabled && config.activationConfirmed === true;
          if (formattedConfig.startDate) formattedConfig.startDate = formattedConfig.startDate.slice(0, 16);
          if (formattedConfig.endDate) formattedConfig.endDate = formattedConfig.endDate.slice(0, 16);
          
          setFormData(formattedConfig);
        }
      } catch (error) {
        console.error("Error fetching banner config", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox
    const val = (type === "checkbox" && e.target instanceof HTMLInputElement) 
        ? e.target.checked 
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateBannerConfig({ ...formData, activationConfirmed: formData.isEnabled });
      alert("Banner updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Failed to update banner.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-montserrat">Banner Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        
        {/* Enable Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isEnabled"
            name="isEnabled"
            checked={formData.isEnabled}
            onChange={handleChange}
            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <label htmlFor="isEnabled" className="font-medium text-gray-900">Enable Banner</label>
        </div>
        
        {/* Exclude Admins Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="excludeAdmins"
            name="excludeAdmins"
            checked={formData.excludeAdmins || false}
            onChange={handleChange}
            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <label htmlFor="excludeAdmins" className="font-medium text-gray-900">Exclude Logged-in Admins</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lead-in Text</label>
                <input
                    type="text"
                    name="leadIn"
                    value={formData.leadIn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. New Launch"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Non-Cylindrical Pouches"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefit</label>
                <input
                    type="text"
                    name="benefit"
                    value={formData.benefit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Low MOQ"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtext (Optional)</label>
                <input
                    type="text"
                    name="subText"
                    value={formData.subText || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Custom sizes..."
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <input
                    type="text"
                    name="ctaText"
                    value={formData.ctaText}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Order Now"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                <input
                    type="text"
                    name="ctaLink"
                    value={formData.ctaLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. /products"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <div className="flex space-x-2">
                    <input
                        type="color"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleChange}
                        className="h-10 w-10 p-0 border-0 rounded"
                    />
                    <input
                        type="text"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <div className="flex space-x-2">
                    <input
                        type="color"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleChange}
                        className="h-10 w-10 p-0 border-0 rounded"
                    />
                    <input
                        type="text"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date (Optional)</label>
                <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <select
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
                <option value="all">All Visitors</option>
                <option value="homepage_only">Homepage Only</option>
            </select>
        </div>

        <div className="pt-4">
            <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save Banner Settings"}
            </button>
        </div>

      </form>
    </div>
  );
}
