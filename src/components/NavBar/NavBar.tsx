import React from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
            ? 'bg-slate-800 text-white'
            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
    }`;

const NavBar: React.FC = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-8">
            <Link
                to="/"
                className="inline-flex min-h-[44px] items-center gap-2 text-lg font-extrabold tracking-tight transition-colors hover:text-indigo-400 sm:text-xl"
            >
                <BiCameraMovie className="text-2xl text-indigo-500 sm:text-3xl" aria-hidden />
                Filmes
            </Link>
            <nav aria-label="Navegação principal" className="flex items-center gap-1 sm:gap-2">
                <NavLink to="/watch-later" className={navLinkClass}>
                    <FaRegBookmark aria-hidden />
                    <span className="hidden sm:inline">Minha Lista</span>
                    <span className="sr-only sm:hidden">Minha Lista</span>
                </NavLink>
                <NavLink to="/favorites" className={navLinkClass}>
                    <FaRegHeart aria-hidden />
                    <span className="hidden sm:inline">Favoritos</span>
                    <span className="sr-only sm:hidden">Favoritos</span>
                </NavLink>
            </nav>
        </div>
    );
}

export default NavBar;
