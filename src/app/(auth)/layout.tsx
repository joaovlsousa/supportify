export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full flex">
      <div className="hidden md:h-full md:w-2/5 md:p-3 md:flex md:flex-col md:items-center md:justify-center md:gap-y-4 md:border-r">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r via-rose-700 from-sky-700 to-indigo-700">
          Bem-vindo!
        </h1>
        <p className="text-muted-foreground text-center">
          Entre para conferir todas as funcionalidades <br /> e recursos do
          nosso app
        </p>
      </div>
      <div className="h-full w-full md:w-3/5">{children}</div>
    </main>
  )
}
