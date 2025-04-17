export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

export async function generateMetadata() {
  return {
    title: "设置 | lorem314.io-v19",
  }
}
