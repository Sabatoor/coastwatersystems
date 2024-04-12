import { cn } from '@/lib/utils'
import { LayoutDocumentDataNavigationItem } from '../../../../prismicio-types'
import { MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import { ImageField, isFilled, KeyTextField } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'

type MobileMenuProps = {
  className?: string
  site_title: KeyTextField
  navigation: Array<LayoutDocumentDataNavigationItem>
  logo: ImageField
}

const MobileMenu = ({
  navigation,
  className,
  site_title,
  logo,
}: MobileMenuProps) => {
  return (
    <div className={cn('md:hidden text-primary-foreground', className)}>
      <Sheet>
        <SheetTrigger className={cn(buttonVariants({ variant: 'link' }))}>
          <MenuIcon />
          <span className="sr-only">Open Menu</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {isFilled.keyText(site_title) && (
              <SheetTitle className="font-bold font-heading text-primary text-3xl flex flex-col items-center">
                {isFilled.image(logo) && (
                  <PrismicNextImage field={logo} className="" height={50} />
                )}
                {site_title}
              </SheetTitle>
            )}
          </SheetHeader>
          <ul className="mt-8 grid gap-y-4">
            {navigation.map((item, i) => {
              return (
                <li key={item.label ? item.label + i : i}>
                  <SheetClose asChild>
                    <Button asChild variant={'outline'} className="flex">
                      <PrismicNextLink field={item.link}>
                        {item.label}
                      </PrismicNextLink>
                    </Button>
                  </SheetClose>
                </li>
              )
            })}
            <li>
              <SheetClose asChild>
                <Button asChild variant={'default'} className="flex">
                  <Link href="/">Get In Touch</Link>
                </Button>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
