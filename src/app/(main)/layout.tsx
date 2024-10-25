import { Header } from '@/components/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className='p-5 grow'>
        {children}
      </div>
    </>
  )
}
