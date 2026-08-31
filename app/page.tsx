import { redirect } from 'next/navigation';

export interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  // Mengambil parameter query (jika ada) lalu dialihkan ke /homepage
  const params = await searchParams;
  const queryString = params?.tab ? `?tab=${params.tab}` : '';

  redirect(`/homepage${queryString}`);
}