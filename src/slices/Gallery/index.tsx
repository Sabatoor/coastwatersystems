import Section from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className="min-h-screen lg:min-h-0"
    >
      <Suspense
        fallback={
          <div className="grid min-h-[calc(100vh-64px)] place-content-center">
            <LoaderCircle
              className="animate-spin text-primary"
              height={120}
              width={120}
            />
          </div>
        }
      >
        {slice.items.length > 0 && (
          <ul className="flex flex-wrap gap-4 lg:gap-8 justify-center">
            {slice.items.map((item, index) => {
              return (
                <li key={slice.id + index} className="relative">
                  <Dialog>
                    <DialogTrigger>
                      <PrismicNextImage
                        field={item.image}
                        width={250}
                        className="rounded lg:opacity-80 hover:opacity-100 transition-opacity duration-500 ease-in-out shadow-sm shadow-slate-700"
                        imgixParams={{ ar: '3:2', fit: 'crop' }}
                        priority={index < 4}
                        quality={80}
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] lg:max-w-[768px]">
                      <PrismicNextImage
                        field={item.image}
                        className="lg:w-[768px]"
                        // imgixParams={{ ar: '3:2', fit: 'crop' }}
                      />
                    </DialogContent>
                  </Dialog>
                </li>
              )
            })}
          </ul>
        )}
      </Suspense>
    </Section>
  )
}

export default Gallery
