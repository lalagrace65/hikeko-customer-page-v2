import Link from "next/link";



export default function Footer() {
  return (
    
    <section className="bg-zinc-100 dark:bg-zinc-800 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-12">
      <div className="space-y-2 md:space-y-0">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Stay Updated</h3>
        Subscribe to our newsletter and stay up-to-date with our latest news and updates.
      </div>
      <div className="flex space-x-4">
        <Link href={'/about'}>About</Link>
        <Link href={'/contact'}>Contact</Link>
      </div>
    </div>
  </section>
  ) 
}
