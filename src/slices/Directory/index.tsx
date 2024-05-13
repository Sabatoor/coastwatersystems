import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

/**
 * Props for `Directory`.
 */
export type DirectoryProps = SliceComponentProps<Content.DirectorySlice>

/**
 * Component for "Directory" Slices.
 */
const Directory = ({ slice }: DirectoryProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <PrismicRichText field={slice.primary.heading} />
      <div className="h-0.5 rounded-full bg-gradient-to-r from-secondary via-primary to-secondary my-3" />
      {slice.items.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-8 py-4 lg:py-8">
          {slice.items.map((employee, index) => {
            return (
              <li key={slice.id + index} className="w-[300px]">
                <Card className="p-4 min-h-[270px] flex flex-col justify-center hover:bg-secondary transition-colors duration-150 ease-in-out">
                  <div className="grid place-items-center">
                    {slice.variation === 'withAvatar' &&
                      'portrait' in employee && (
                        <Avatar className="w-24 h-24 shadow-lg shadow-slate-600">
                          {isFilled.image(employee.portrait) && (
                            <AvatarImage
                              src={employee.portrait.url}
                              alt={
                                employee.portrait.alt ||
                                `${employee.first_name} ${employee.last_name}`
                              }
                            />
                          )}
                          <AvatarFallback className="font-bold text-primary text-xl">{`${employee.first_name?.charAt(0)} ${employee.last_name?.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                      )}

                    <CardHeader className="text-center">
                      <CardTitle>
                        {employee.first_name} {employee.last_name}
                      </CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                    </CardHeader>

                    <CardFooter className="p-0">
                      {isFilled.richText(employee.contact_info) && (
                        <PrismicRichText
                          field={employee.contact_info}
                          components={{
                            hyperlink: ({ children, node }) => (
                              <Link
                                href={node.data.url || '#'}
                                className={cn(
                                  buttonVariants({ variant: 'link' })
                                )}
                              >
                                {children}
                              </Link>
                            ),
                            paragraph: ({ children }) => <p>{children}</p>,
                          }}
                        />
                      )}
                    </CardFooter>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}

export default Directory
