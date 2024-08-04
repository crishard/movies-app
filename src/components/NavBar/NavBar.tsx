import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <div className="flex py-6 items-center justify-between">
            <Link className="text-2xl font-semibold" to="/">
                <span className="">Movies</span>
            </Link>
            <nav className="md:ml-auto flex items-center text-base justify-center">
                <Link className="mr-5" to="/watch-later">Assistir Mais Tarde</Link>
            </nav>
        </div>
    );
}

export default NavBar;
