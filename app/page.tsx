// app/page.tsx
'use client'

import Header from '@/app/components/Header/Header'
import Hero from '@/app/components/Hero/Hero'
import Logos from '@/app/components/Logos/Logos'
import Capabilities from '@/app/components/Capabilities/Capabilities'
import Industries from '@/app/components/Industries/Industries'
import Government from '@/app/components/Government/Government'
import TechnicalCapabilities from '@/app/components/TechnicalCapabilities/TechnicalCapabilities'
import WorkProcess from '@/app/components/WorkProcess/WorkProcess'
import TechStack from '@/app/components/TechStack/TechStack'
import CTA from '@/app/components/CTA/CTA'
import Footer from '@/app/components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Logos />
        <Capabilities />
        <Industries />
        <Government />
        <TechnicalCapabilities />
        <WorkProcess />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  )
}