import { Inter } from 'next/font/google'
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chess Buddy',
  description: 'Chess trainer app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
