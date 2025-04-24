import localFont from "next/font/local"

export const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const firaCode = localFont({
  src: "./FiraCode-Regular.woff",
  variable: "--font-fira-code",
  weight: "100 900",
})
