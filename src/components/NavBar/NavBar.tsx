import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <div className="flex py-6 max-w-[400px]:px-8 px-4 items-center justify-between text-white">
            <Link className="sm:text-3xl text-2xl font-bold hover:text-gray-300 transition-colors" to="/">
                Filmes
            </Link>
            <nav className="flex items-center sm:gap-6 gap-2">
                <Link
                    className="bg-[#11009E] hover:bg-[#280274] text-white px-4 py-2 rounded-lg transition-colors"
                    to="/watch-later"
                >
                    Lista
                </Link>
                <Link
              className="text-2xl text-white hover:text-red-600 transition-colors"
              to="/favorites"
            >
              <FaHeart />
            </Link>
            </nav>
        </div>
    );
}

export default NavBar;
