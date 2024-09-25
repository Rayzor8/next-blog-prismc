import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName,createClient } from "@/prismicio";


const urbanist = Urbanist({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased bg-slate-900`}>
        <Header />
        {children}
        <Footer/>
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
