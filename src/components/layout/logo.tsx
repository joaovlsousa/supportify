import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-x-4">
      <Image src="logo.svg" alt="logo" height={20} width={20} />
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r via-rose-700 from-sky-700 to-indigo-700">
        Supportify
      </h1>
    </div>
  )
}
