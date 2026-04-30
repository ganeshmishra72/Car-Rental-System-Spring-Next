import Layout from "@/components/Home/Layout";
import React from "react";

export default function UserLayout({children}:{children:React.ReactNode}){

    return(
        <Layout>
            {children}
        </Layout>
    )

}