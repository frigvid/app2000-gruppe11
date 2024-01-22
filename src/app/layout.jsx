import { Inter } from 'next/font/google'
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import "@/app/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chess Buddy',
  description: 'Chess trainer app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} grid h-screen grid-cols-1 grid-rows-[auto,1fr,auto]`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
