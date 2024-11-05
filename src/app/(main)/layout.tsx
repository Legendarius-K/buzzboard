import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      <Header />
      <div className=' grow flex justify-center pt-[92px] pl-0'>
        <Sidebar />
        {children}
      </div>
    </>
  )
}
