import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { getProduct, getProducts } from "@/lib/firebase/firestore";
import { pageSocialMetadata } from "@/lib/site";

type ProductPageProps = { params: Promise<{ id: string }> };

function productDescription(product: Awaited<ReturnType<typeof getProduct>>) {
  if (!product) return "";
  return `${product.name} steel cast component manufactured by JK Foundry for truck, trolley, industrial equipment, and general engineering applications.`;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.filter((product) => product.id).map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };

  const description = productDescription(product);
  return {
    title: `${product.name} | Steel Cast Component`,
    description,
    alternates: { canonical: `/products/${id}` },
    ...pageSocialMetadata(`${product.name} | Steel Cast Component | JK Foundry`, description, `/products/${id}`),
    openGraph: {
      type: "website",
      title: `${product.name} | JK Foundry`,
      description,
      url: `/products/${id}`,
      images: [{ url: product.image || "/placeholder.jpg", alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const image = product.image || "/placeholder.jpg";
  const description = productDescription(product);

  return (
    <main className="container mx-auto max-w-6xl px-5 py-12">
      <JsonLd data={productJsonLd(
        `/products/${product.id}`,
        product.name,
        description,
        image,
        product.material,
        product.weight,
      )} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: product.name, path: `/products/${product.id}` },
      ])} />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <section className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={image}
            alt={`${product.name} steel cast component`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </p>
          <h1 className="mb-6 text-4xl font-bold font-montserrat text-gray-900">{product.name}</h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">{description}</p>
          <dl className="mb-8 divide-y border-y">
            <div className="flex justify-between gap-6 py-4">
              <dt className="font-semibold text-gray-900">Material</dt>
              <dd className="text-right text-gray-600">{product.material}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="font-semibold text-gray-900">Weight</dt>
              <dd className="text-right text-gray-600">{product.weight}</dd>
            </div>
          </dl>
          <Link
            href={`/contact?sample=1&product=${encodeURIComponent(product.name)}`}
            className="inline-flex rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
          >
            Request a Sample
          </Link>
        </div>
      </section>

      <section className="mt-16 border-t pt-8">
        <h2 className="mb-4 text-2xl font-bold font-montserrat text-gray-900">Manufacturing Information</h2>
        <p className="leading-relaxed text-gray-600">
          JK Foundry manufactures custom steel cast components to drawings and specifications. Learn about our
          <Link href="/foundry/process" className="mx-1 text-primary underline">casting processes</Link>
          or <Link href="/contact" className="text-primary underline">contact our manufacturing team</Link> for application-specific requirements.
        </p>
      </section>
    </main>
  );
}