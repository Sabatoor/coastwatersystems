import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FooterRichText`.
 */
export type FooterRichTextProps =
  SliceComponentProps<Content.FooterRichTextSlice>

/**
 * Component for "FooterRichText" Slices.
 */
const FooterRichText = ({ slice }: FooterRichTextProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="md"
      className={cn('py-6 md:py-8 lg:py-12')}
    >
      <PrismicRichText
        field={slice.primary.rich_text}
        components={{
          paragraph: ({ children }) => (
            <p className="text-xl font-light flex justify-center my-4">
              {children}
            </p>
          ),
        }}
      />
    </Section>
  )
}

export default FooterRichText
