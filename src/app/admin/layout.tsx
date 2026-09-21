"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      <meta name="robots" content="noindex, nofollow, noarchive" />
      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute>
          <AdminLayout>{children}</AdminLayout>
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}

