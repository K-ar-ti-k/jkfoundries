"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { name: "Banner", href: "/admin/banner", icon: "📢", roles: ["admin"] },
    { name: "Blog Posts", href: "/admin/blog", icon: "📝", roles: ["admin", "blogger"] },
    { name: "Products", href: "/admin/products", icon: "📦", roles: ["admin"] },
    { name: "Foundry Overview", href: "/admin/services/overview", icon: "🏭", roles: ["admin"] },
    { name: "Foundry Process", href: "/admin/services/process", icon: "⚙️", roles: ["admin"] },
    { name: "Infrastructure", href: "/admin/services/infrastructure", icon: "🏗️", roles: ["admin"] },
    { name: "Q / A", href: "/admin/services/qa", icon: "❓", roles: ["admin"] },
    { name: "Value Added Services", href: "/admin/services/vas", icon: "🔧", roles: ["admin"] },
    { name: "Contact Submissions", href: "/admin/contacts", icon: "✉️", roles: ["admin"] },
  ];

  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return role && item.roles.includes(role);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold font-montserrat text-primary">JK Foundry Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="mb-3 px-4 py-2 text-sm text-gray-600">
              <div className="font-medium">{user?.email}</div>
              {role && (
                <div className="text-xs text-primary font-semibold uppercase mt-1">
                  {role}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <div className="flex-1" />
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

