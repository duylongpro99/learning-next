import Footer from "../footer";
import NavBar from "../navbar";

export default function Layout({ children }: {children: any}) { 
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