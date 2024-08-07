import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <div className="flex py-6 items-center justify-between">
            <Link className="text-2xl font-semibold" to="/">
                <span className="">Movies</span>
            </Link>
            <nav className="md:ml-auto flex items-center gap-3 text-base  text-center justify-center ">
                <Link className="bg-blue-500 px-2 py-2 rounded-xl" to="/watch-later">Minha lista</Link>
                <Link className="bg-blue-500 px-2 py-2 rounded-xl" to="/favorites">Favoritos</Link>
            </nav>
        </div>
    );
}

export default NavBar;
