"use client"
import React, { useContext } from 'react'
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from '../magicui/border-beam'
import { BioContext } from '@/context/BioContext'
import { Skeleton } from '../ui/skeleton'
import CopyLabel from './CopyLabel'


const UserOutput = () => {
  const {output,loading} = useContext(BioContext)
  return (
    <div className='relative flex rounded-xl flex-col bg-muted/50 mt-2 min-h-[50vh] border border-primary/5 backdrop-blur-sm overflow-hidden'>
      {loading && <BorderBeam size={1000} borderWidth={1.65} duration={4} className='z-10'/>}
      
      <Badge variant="outline" className='absolute top-3 right-3 z-30'>output</Badge>

      {loading?
      <Skeleton className="w-full h-full"/> 
      :
      <ul className="flex flex-col p-8 pt-12 xs:p-12 lg:p-16 items-start justify-start space-y-8 sm:space-y-12">
        {output?.data.map((data,index)=>{
          return (
            <li key={index} className="w-full text-sm xs:text-base border border-primary/20 rounded-md p-4 relative bg-background rounded-br-none">
              {data.bio}
              <span className="absolute top-[99%] right-0">

              <CopyLabel text={data.bio}/>
              </span>
            </li>
          )
        })}
      </ul> 
    }
    </div>
  )
}

export default UserOutput
