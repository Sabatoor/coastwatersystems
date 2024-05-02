import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ContactInfo`.
 */
export type ContactInfoProps = SliceComponentProps<Content.ContactInfoSlice>

/**
 * Component for "ContactInfo" Slices.
 */
const ContactInfo = ({ slice }: ContactInfoProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="grid lg:grid-cols-2 my-4 lg:my-8">
        <div>
          <PrismicRichText field={slice.primary.text} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-md h-[300px] lg:h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5212.454942456903!2d-122.66634700000002!3d49.215213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d46e7ae5f86f%3A0xe7605e23e7479ca8!2s20030%20Stewart%20Crescent%20%234%2C%20Maple%20Ridge%2C%20BC%20V2X%200T4!5e0!3m2!1sen!2sca!4v1714683179693!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  )
}

export default ContactInfo
