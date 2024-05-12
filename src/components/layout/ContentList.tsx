import Pagination from '@/components/layout/Pagination'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { createClient } from '@/prismicio'
import { ImageField, SelectField, asText } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import Heading from '../typography/Heading'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

type ContentListProps = {
  contentType: SelectField
  page: number | undefined
  display: number | undefined
  ctaText?: string
  fallbackItemImage: ImageField
  index: number
}

const ContentList = async ({
  contentType,
  ctaText = 'Read More',
  display = 5,
  fallbackItemImage,
  page = 1,
  index,
}: ContentListProps): Promise<JSX.Element> => {
  const client = createClient()
  let prismicData

  if (contentType === 'post') {
    prismicData = await client.getByType('post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page,
      pageSize: display,
    })
  } else {
    prismicData = await client.getByType('gallery', {
      orderings: {
        field: 'my.gallery.title',
        direction: 'asc',
      },
      page: page,
      pageSize: display,
    })
  }

  const { results } = prismicData

  if (contentType === 'post') {
    return (
      <>
        <ul>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <li
                  key={item.id}
                  className="grid lg:grid-cols-5 border-t border-t-secondary py-10 group"
                >
                  {'featured_image' in item.data && (
                    <div className="flex justify-center items-center lg:-mr-4 lg:col-span-2 group-hover:lg:translate-x-2 transition duration-300 ease-in-out">
                      <Link href={item.url || '#'}>
                        <PrismicNextImage
                          field={
                            item.data.featured_image.url
                              ? item.data.featured_image
                              : fallbackItemImage
                          }
                          className="rounded-lg"
                          priority={index < 3}
                        />
                      </Link>
                    </div>
                  )}
                  <Card className="lg:col-span-3 lg:-ml-4 bg-background/80 backdrop-blur group-hover:lg:-translate-x-2 transition duration-300 ease-in-out">
                    <CardHeader>
                      <PrismicRichText
                        field={item.data.title}
                        components={{
                          heading1: ({ children }) => (
                            <Heading as="h2" size="3xl">
                              {children}
                            </Heading>
                          ),
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      {'excerpt' in item.data && (
                        <PrismicRichText field={item.data.excerpt} />
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link
                          href={item.url || '#'}
                          aria-label={
                            asText(item.data.title) || 'View the content'
                          }
                        >
                          {ctaText}{' '}
                          <span className="sr-only">
                            about {asText(item.data.title)}
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              )
            })}
        </ul>
        {prismicData.total_pages > 1 && (
          <Pagination
            hasNextPage={prismicData?.next_page !== null}
            hasPrevPage={prismicData?.prev_page !== null}
            totalPages={prismicData?.total_pages}
          />
        )}
      </>
    )
  } else {
    return (
      <>
        {results.length > 0 && (
          <ul className="space-y-8">
            {results.map((gallery) => {
              return (
                <li key={gallery.id} className="max-w-md mx-auto">
                  <Link href={gallery.url || '#'}>
                    <Card className="text-primary lg:hover:bg-primary lg:hover:text-background transition-colors duration-100 ease-in">
                      <CardHeader className="text-center">
                        <CardTitle>{asText(gallery.data.title)}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </>
    )
  }
}

export default ContentList
