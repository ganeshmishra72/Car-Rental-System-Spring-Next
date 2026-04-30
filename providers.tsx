'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers=({children}:any)=>{
    const queryclient=new QueryClient();
    return(
        <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    )
}

export default Providers