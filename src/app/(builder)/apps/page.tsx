'use client'

import axios from 'axios';
import { useEffect, useState } from 'react'

export default function Apps() {
    const [apps, setApps] = useState([])
    useEffect(()=>{
        const fetchApps = async() => {
            try{
                const res = await axios.get("/app/get-apps")
                setApps(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchApps()
    },[])
    return (
        <div>
            {
                apps.map((app : any) => (
                    <div key={app.id}>
                        <h1>{app.name}</h1>
                        <p>{app.createdAt.toLocaleDateString()}</p>
                    </div>
                ))
            }
        </div>
    )
}