import React from "react";
import Footer from "../footer";
import NavBar from "../navbar";

export default function Layout({ children }: {children: React.ReactNode}) { 
    return  (
        <>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}