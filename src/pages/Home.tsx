import { Header } from "../components/Header"
import NavBarAndFilters from "../components/List/NavBarAndFilters"

const Home = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <NavBarAndFilters />
            </main>
        </>
    )
}
export default Home
