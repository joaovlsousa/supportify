import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const links = [
  {
    icon: Github,
    href: 'https://github.com/joaovlsousa',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/joaovsousadev/',
  },
]

export function Footer() {
  return (
    <footer className="w-full h-14 px-8 absolute bottom-0 border-t flex items-center justify-evenly">
      <p className="text-sm text-muted-foreground">
        &copy; Todos os direitos reservados
      </p>
      <div className="flex items-center gap-x-4">
        <p className="text-sm text-muted-foreground">
          Fale com o desenvolvedor:{' '}
        </p>
        {links.map((link) => (
          <Link key={link.href} href={link.href} target="_blank">
            <link.icon className="w-5 h-5 hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </footer>
  )
}
