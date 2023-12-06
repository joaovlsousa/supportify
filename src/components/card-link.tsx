import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface CardLinkProps {
  title: string
  description: string
  href: string
  buttonLabel: string
  icon: LucideIcon
}

export function CardLink({
  buttonLabel,
  description,
  href,
  title,
  icon: Icon,
}: CardLinkProps) {
  return (
    <Card className="p-2 shadow-2xl transition-all border-transparent bg-gray-800/90 hover:shadow-violet-700/75 hover:border-violet-700/75">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3">
          <Icon className="h-6" />
          {title}
        </CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href} className="w-full flex items-center">
            {buttonLabel}
            <ArrowRight className="h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
