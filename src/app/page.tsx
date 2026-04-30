'use client'

import BuildProcess from '@/components/builder/sections/Build-process'
import HeroSection from '@/components/builder/sections/HeroSection'
import GlobalNavbar from '@/components/builder/GlobalNavbar'
import React, { useEffect } from 'react'
import Footer from '@/components/builder/Footer'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function page() {
  const {user} = useUser();
  const router = useRouter();
  useEffect(()=>{
    if(user){
      router.push('/dashboard')
    }
  },[user])
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