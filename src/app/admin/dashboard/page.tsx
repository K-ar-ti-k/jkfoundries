"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getContactSubmissions } from "@/lib/firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { role } = useAuth();
  const [blogPostsCount, setBlogPostsCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);
  const [unreadContacts, setUnreadContacts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [postsResponse, contacts] = await Promise.all([
          fetch("/api/admin/blogs", { cache: "no-store" }),
          role === 'admin' ? getContactSubmissions() : Promise.resolve([]),
        ]);
        if (!postsResponse.ok) {
          throw new Error("Unable to load blog post count");
        }
        const posts = (await postsResponse.json()) as unknown[];
        setBlogPostsCount(posts.length);
        if (role === 'admin') {
          setContactsCount(contacts.length);
          setUnreadContacts(contacts.filter((c) => !c.read).length);
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    if (role) loadStats();
  }, [role]);

  const stats = [
    {
      name: "Blog Posts",
      value: blogPostsCount,
      icon: "📝",
      href: "/admin/blog",
      color: "bg-blue-500",
      roles: ["admin", "blogger"],
    },
    {
      name: "Contact Submissions",
      value: contactsCount,
      icon: "✉️",
      href: "/admin/contacts",
      color: "bg-green-500",
      badge: unreadContacts > 0 ? unreadContacts : undefined,
      roles: ["admin"],
    },
  ].filter(s => !s.roles || s.roles.includes(role || ''));

  if (loading || !role) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} rounded-full p-4 text-3xl`}>
                {stat.icon}
              </div>
            </div>
            {stat.badge && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {stat.badge} unread
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold font-montserrat text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center justify-center px-6 py-3 border border-primary bg-white text-primary rounded-lg font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm hover:shadow-md"
          >
            <span className="mr-2">➕</span>
            Create New Blog Post
          </Link>
          {role === 'admin' && (
            <Link
              href="/admin/products/new"
              className="flex items-center justify-center px-6 py-3 border border-primary bg-white text-primary rounded-lg font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm hover:shadow-md"
            >
              <span className="mr-2">➕</span>
              Add New Product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

