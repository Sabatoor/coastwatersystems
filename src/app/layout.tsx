import type { Metadata } from 'next'
import './globals.css'
import { PrismicPreview } from '@prismicio/next'
import { createClient, repositoryName } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/layout/Footer/Footer'
import { Suspense } from 'react'
import Analytics from '@/components/Analytics'
import Consent from '@/components/layout/Consent'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: settings.data.site_title || "Nick's Towing",
    description:
      settings.data.site_meta_description || `Eco-friendly auto towing.`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const nonce = headers().get('x-nonce') || undefined
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col justify-between bg-background antialiased'
        )}
      >
        <Suspense>
          <Analytics nonce={nonce} />
        </Suspense>
        <Header />
        {children}
        <Footer />
        <Consent nonce={nonce} />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
