"use client";

import { useEffect, useState } from "react";
import {
  getContactSubmissions,
  markContactSubmissionAsRead,
  deleteContactSubmission,
  ContactSubmission,
} from "@/lib/firebase/firestore";

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const contacts = await getContactSubmissions();
      setSubmissions(contacts);
    } catch (error) {
      console.error("Error loading contact submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markContactSubmissionAsRead(id);
      setSubmissions(
        submissions.map((sub) => (sub.id === id ? { ...sub, read: true } : sub))
      );
    } catch (error) {
      console.error("Error marking submission as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    setDeleteLoading(id);
    try {
      await deleteContactSubmission(id);
      setSubmissions(submissions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const unreadCount = submissions.filter((sub) => !sub.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900">
            Contact Submissions
          </h1>
          {unreadCount > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {unreadCount} unread submission{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600">No contact submissions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !submission.read ? "border-l-4 border-primary" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold font-montserrat text-gray-900">
                      {submission.name}
                    </h3>
                    {!submission.read && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-primary hover:underline"
                      >
                        {submission.email}
                      </a>
                    </p>
                    {submission.phone && (
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a
                          href={`tel:${submission.phone}`}
                          className="text-primary hover:underline"
                        >
                          {submission.phone}
                        </a>
                      </p>
                    )}
                    {submission.company && (
                      <p>
                        <strong>Company:</strong> {submission.company}
                      </p>
                    )}
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {submission.createdAt.toDate().toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!submission.read && (
                    <button
                      onClick={() => handleMarkAsRead(submission.id!)}
                      className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(submission.id!)}
                    disabled={deleteLoading === submission.id}
                    className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {deleteLoading === submission.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

