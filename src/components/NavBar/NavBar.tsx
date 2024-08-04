import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <div className="flex py-6 items-center justify-between">
            <Link className="text-2xl font-semibold" to="/">
                <span className="">Movies</span>
            </Link>
            <nav className="md:ml-auto flex items-center text-base bg-blue-500 px-2 py-2 text-center justify-center rounded-xl">
                <Link className="" to="/watch-later">Minha lista</Link>
            </nav>
        </div>
    );
}

export default NavBar;
