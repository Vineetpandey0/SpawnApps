'use client'

import BuildProcess from '@/components/builder/sections/Build-process'
import HeroSection from '@/components/builder/sections/HeroSection'
import GlobalNavbar from '@/components/builder/GlobalNavbar'
import React from 'react'
import Footer from '@/components/builder/Footer'

function page() {
  return (
    <div>
      <GlobalNavbar />
      <HeroSection />
      <BuildProcess />
      <Footer />
    </div>
  )
}

export default page