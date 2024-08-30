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
import Script from 'next/script'
import Image from 'next/image'

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
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1417317772277401');
          fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=1417317772277401&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
