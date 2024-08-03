
const NavBar = () => {
    return (
        <div className="flex py-6 items-center justify-between">
            <a className="text-2xl font-semibold" href="/">
                <span className="">Movies</span>
            </a>
            <nav className="md:ml-auto flex items-center text-base justify-center">
                <a className="">First Link</a>
            </nav>
        </div>
    )
}

export default NavBar