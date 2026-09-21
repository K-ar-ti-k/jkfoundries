import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  limit as fbLimit,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import { buildBlogSeo } from "@/lib/seo";
import { db, isFirebaseConfigured } from "./config";

const CACHE_TTL = 2 * 60 * 1000;
const cache: Record<string, { t: number; v: unknown }> = {};
const now = () => Date.now();
const getCached = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  const c = cache[key];
  if (c && now() - c.t < CACHE_TTL) return c.v as T;
  const v = await fetcher();
  cache[key] = { t: now(), v };
  return v;
};

const invalidateProductsCache = () => {
  Object.keys(cache).forEach((k) => {
    if (k.startsWith("products:list") || k.startsWith("products:recent")) {
      delete cache[k];
    }
  });
};

// Blog Post Types
export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content: string;
  slug: string;
  primaryKeyword?: string;
  secondaryKeywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Product Types
export interface Product {
  id?: string;
  name: string;
  material: string;
  weight: string;
  image: string;
  category: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Contact Submission Types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: Timestamp;
  read?: boolean;
}

// Banner Types
export interface BannerConfig {
  id?: string;
  isEnabled: boolean;
  leadIn: string;
  productName: string;
  benefit: string;
  ctaText: string;
  ctaLink: string;
  subText?: string;
  backgroundColor: string;
  textColor: string;
  startDate?: string;
  endDate?: string;
  targetAudience: 'all' | 'homepage_only';
  excludeAdmins?: boolean;
  updatedAt?: Timestamp;
}

// User Roles
export type UserRole = 'admin' | 'blogger';

export interface UserProfile {
  email: string;
  role: UserRole;
  updatedAt: Timestamp;
}

export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return (userDoc.data() as UserProfile).role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

// Blog Posts Collection
export const blogPostsCollection = collection(db, "blogPosts");
export const bannersCollection = collection(db, "banners");

export const getBannerConfig = async (): Promise<BannerConfig | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached("banners:main", async () => {
      const docRef = doc(db, "banners", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BannerConfig;
      }
      return null;
    });
  } catch (error) {
    console.error("Error getting banner config:", error);
    return null;
  }
};

export const updateBannerConfig = async (data: Partial<BannerConfig>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const docRef = doc(db, "banners", "main");
    
    // Clean undefined values
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, unknown>);

    const updateData = {
      ...cleanData,
      updatedAt: Timestamp.now()
    };

    // setDoc with merge: true will create if not exists, or update if exists
    await setDoc(docRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error updating banner config:", error);
    throw error;
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!isFirebaseConfigured) return [];

  try {
    return await getCached("blogPosts:list", async () => {
      try {
        const q = query(blogPostsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || doc.id;
          return {
            id: doc.id,
            ...data,
            slug: slug,
            date: data.date || data.createdAt?.toDate().toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
          } as BlogPost;
        });
      } catch (error) {
        console.warn("Error ordering by createdAt, trying without order:", error);
        const querySnapshot = await getDocs(blogPostsCollection);
        const posts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const slug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || doc.id;
          return {
            id: doc.id,
            ...data,
            slug: slug,
            date: data.date || data.createdAt?.toDate().toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
          } as BlogPost;
        });
        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    });
  } catch {
    return [];
  }
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    if (!slug) {
      console.error("Slug is required");
      return null;
    }
    return await getCached(`blogPosts:slug:${slug}`, async () => {
      const q = query(blogPostsCollection);
      const querySnapshot = await getDocs(q);
      const post = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        const docSlug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || doc.id;
        return docSlug && docSlug.toString().toLowerCase().trim() === slug.toLowerCase().trim();
      });
      if (!post) {
        console.warn(`Blog post with slug "${slug}" not found`);
        return null;
      }
      const postData = post.data();
      const postSlug = postData.slug || postData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || post.id;
      return {
        id: post.id,
        ...postData,
        slug: postSlug,
        date: postData.date || postData.createdAt?.toDate().toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      } as BlogPost;
    });
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  if (!isFirebaseConfigured) return null;

  const docRef = doc(db, "blogPosts", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
    date: docSnap.data().date || docSnap.data().createdAt?.toDate().toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
  } as BlogPost;
};

export const createBlogPost = async (post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const seo = buildBlogSeo(post.title || "", post.excerpt || "", post.content || "");
  const docRef = await addDoc(blogPostsCollection, {
    ...post,
    primaryKeyword: post.primaryKeyword || seo.primaryKeyword,
    secondaryKeywords: post.secondaryKeywords || seo.secondaryKeywords.join(", "),
    metaTitle: post.metaTitle || seo.metaTitle,
    metaDescription: post.metaDescription || seo.metaDescription,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "blogPosts", id);
  const existingSnap = await getDoc(docRef);
  const currentData = existingSnap.exists() ? existingSnap.data() : {};
  const merged = { ...currentData, ...post } as Partial<BlogPost>;
  const seo = buildBlogSeo(merged.title || "", merged.excerpt || "", merged.content || "");

  await updateDoc(docRef, {
    ...merged,
    primaryKeyword: merged.primaryKeyword || seo.primaryKeyword,
    secondaryKeywords: merged.secondaryKeywords || seo.secondaryKeywords.join(", "),
    metaTitle: merged.metaTitle || seo.metaTitle,
    metaDescription: merged.metaDescription || seo.metaDescription,
    updatedAt: Timestamp.now(),
  });
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "blogPosts", id);
  await deleteDoc(docRef);
};

// Products Collection
export const productsCollection = collection(db, "products");

export const getProducts = async (category?: string): Promise<Product[]> => {
  if (!isFirebaseConfigured) return [];

  return await getCached(`products:list:${category || "all"}`, async () => {
    let q = query(productsCollection, orderBy("name", "asc"));
    if (category) {
      q = query(productsCollection, orderBy("name", "asc"));
    }
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    if (category) {
      return products.filter((p) => p.category === category);
    }
    return products;
  });
};

export const getRecentProducts = async (count: number = 4): Promise<Product[]> => {
  if (!isFirebaseConfigured) return [];

  return await getCached(`products:recent:${count}`, async () => {
    try {
      const q = query(productsCollection, orderBy("createdAt", "desc"), fbLimit(count) as unknown as QueryConstraint);
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
    } catch {
      const all = await getProducts();
      return all.slice(0, count);
    }
  });
};

export const getProduct = async (id: string): Promise<Product | null> => {
  if (!isFirebaseConfigured) return null;

  return await getCached(`products:id:${id}`, async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product;
  });
};

export const createProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = await addDoc(productsCollection, {
    ...product,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  invalidateProductsCache();
  return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "products", id);
  await updateDoc(docRef, {
    ...product,
    updatedAt: Timestamp.now(),
  });
  invalidateProductsCache();
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
  invalidateProductsCache();
};

// Contact Submissions Collection
export const contactSubmissionsCollection = collection(db, "contactSubmissions");

export const createContactSubmission = async (submission: Omit<ContactSubmission, "id" | "createdAt" | "read">): Promise<string> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = await addDoc(contactSubmissionsCollection, {
    ...submission,
    createdAt: Timestamp.now(),
    read: false,
  });
  return docRef.id;
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  if (!isFirebaseConfigured) return [];

  return await getCached("contacts:list", async () => {
    const q = query(contactSubmissionsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactSubmission[];
  });
};

export const markContactSubmissionAsRead = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "contactSubmissions", id);
  await updateDoc(docRef, { read: true });
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  const docRef = doc(db, "contactSubmissions", id);
  await deleteDoc(docRef);
};

// Editable Pages (Product & Services)
export interface PageStat {
  label: string;
  value: string;
}

export interface PageContent {
  slug: string;
  heroTitle?: string;
  heroDescription?: string;
  stats?: PageStat[];
  certifications?: string[];
  updatedAt?: Timestamp;
}

export interface InfrastructureUnit {
  title: string;
  description: string;
  equipment: string[];
  imageSrc: string;
}

export interface InfrastructureContent {
  slug: string; // "infrastructure"
  heroTitle: string;
  heroDescription: string;
  units: InfrastructureUnit[];
  updatedAt?: Timestamp;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface QAContent {
  slug: string; // "qa"
  title: string;
  description: string;
  items: QAItem[];
  updatedAt?: Timestamp;
}

export interface VASContent {
  slug: string; // "machinery-services" or "pattern-mould-die-making"
  title: string;
  description: string;
  imageSrc?: string;
  features: string[];
  updatedAt?: Timestamp;
}

export interface ProcessItem {
  name: string;
  emoji?: string;
  weightRange: string;
  description: string;
  bullets: string[];
  color?: "green" | "yellow" | "blue";
}

export interface ProcessContent {
  slug: string;
  items: ProcessItem[];
  updatedAt?: Timestamp;
}

export const sitePagesCollection = collection(db, "sitePages");
export const siteProcessesCollection = collection(db, "siteProcesses");
export const infrastructureCollection = collection(db, "infrastructure");
export const qaCollection = collection(db, "qa");
export const vasCollection = collection(db, "vas");

export const getPageContent = async (slug: string): Promise<PageContent | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached(`sitePages:slug:${slug}`, async () => {
      const ref = doc(db, "sitePages", slug);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { ...(snap.data() as PageContent), slug };
    });
  } catch (e) {
    console.error("getPageContent error", e);
    return null;
  }
};

export const updatePageContent = async (slug: string, data: Partial<PageContent>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const ref = doc(db, "sitePages", slug);
    const clean = Object.entries(data).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {} as Record<string, unknown>);
    await setDoc(ref, { ...clean, updatedAt: Timestamp.now() }, { merge: true });
  } catch (e) {
    console.error("updatePageContent error", e);
    throw e;
  }
};

export const getInfrastructureContent = async (): Promise<InfrastructureContent | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached("infrastructure:main", async () => {
      const ref = doc(db, "infrastructure", "main");
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { ...(snap.data() as InfrastructureContent), slug: "infrastructure" };
    });
  } catch (e) {
    console.error("getInfrastructureContent error", e);
    return null;
  }
};

export const updateInfrastructureContent = async (data: Partial<InfrastructureContent>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const ref = doc(db, "infrastructure", "main");
    const clean = Object.entries(data).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {} as Record<string, unknown>);
    await setDoc(ref, { ...clean, updatedAt: Timestamp.now() }, { merge: true });
  } catch (e) {
    console.error("updateInfrastructureContent error", e);
    throw e;
  }
};

export const getQAContent = async (): Promise<QAContent | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached("qa:main", async () => {
      const ref = doc(db, "qa", "main");
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { ...(snap.data() as QAContent), slug: "qa" };
    });
  } catch (e) {
    console.error("getQAContent error", e);
    return null;
  }
};

export const updateQAContent = async (data: Partial<QAContent>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const ref = doc(db, "qa", "main");
    const clean = Object.entries(data).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {} as Record<string, unknown>);
    await setDoc(ref, { ...clean, updatedAt: Timestamp.now() }, { merge: true });
  } catch (e) {
    console.error("updateQAContent error", e);
    throw e;
  }
};

export const getVASContent = async (slug: string): Promise<VASContent | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached(`vas:slug:${slug}`, async () => {
      const ref = doc(db, "vas", slug);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { ...(snap.data() as VASContent), slug };
    });
  } catch (e) {
    console.error("getVASContent error", e);
    return null;
  }
};

export const updateVASContent = async (slug: string, data: Partial<VASContent>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const ref = doc(db, "vas", slug);
    const clean = Object.entries(data).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {} as Record<string, unknown>);
    await setDoc(ref, { ...clean, updatedAt: Timestamp.now() }, { merge: true });
  } catch (e) {
    console.error("updateVASContent error", e);
    throw e;
  }
};

export const getProcessContent = async (slug: string): Promise<ProcessContent | null> => {
  if (!isFirebaseConfigured) return null;

  try {
    return await getCached(`siteProcesses:slug:${slug}`, async () => {
      const ref = doc(db, "siteProcesses", slug);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      return { ...(snap.data() as ProcessContent), slug };
    });
  } catch (e) {
    console.error("getProcessContent error", e);
    return null;
  }
};

export const updateProcessContent = async (slug: string, data: Partial<ProcessContent>): Promise<void> => {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");

  try {
    const ref = doc(db, "siteProcesses", slug);
    const clean = Object.entries(data).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = v;
      return acc;
    }, {} as Record<string, unknown>);
    await setDoc(ref, { ...clean, updatedAt: Timestamp.now() }, { merge: true });
  } catch (e) {
    console.error("updateProcessContent error", e);
    throw e;
  }
};
