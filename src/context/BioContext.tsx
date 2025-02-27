"use client"

import { createContext, ReactNode, useState } from 'react';
import * as React from 'react';

interface BioContextProps{
    output:{data:{bio:string}[]},
    loading:boolean,
    setOutput: React.Dispatch<React.SetStateAction<{data:{bio:string}[]}>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const BioContext = createContext<BioContextProps>({
    output:{data:[]},
    loading:false,
    setOutput:() =>{},
    setLoading:() =>{},
})

export const BioProvider = ({children}:{children:React.ReactNode})=>{
    const [output, setOutput] = useState<{data:{bio:string}[]}>({data:[]})
    const [loading, setLoading] = useState(false)
    console.log("Output Values: ",output)
    return (
        <BioContext.Provider value={{output,setOutput,setLoading,loading}}>
            {children}
        </BioContext.Provider>
    )
}