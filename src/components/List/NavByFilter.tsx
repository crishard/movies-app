import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"

interface INavByFilterProps{
    searchTerm: string, 
    searchChange: any,
}

export const NavByFilter = ({searchTerm, searchChange}:INavByFilterProps) => {
    return (
        <div className="absolute0 top-0 left-0 right-0 py-6 sm:flex items-center justify-between text-white sm:px-[8%] px-[4%]">
            <div className='pb-8 text-center sm:pb-0'>
                <Link className="text-4xl font-bold hover:text-gray-300 transition-colors" to="/">
                    Filmes
                </Link>
            </div>


            <nav className="flex items-center justify-evenly sm:gap-4 gap-1">
                <div className="text-gray-900">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={searchChange}
                        className="sm:px-2 px-1 py-1.5 rounded-lg focus:outline-none sm:w-full w-[180px]"
                        placeholder="Buscar filme..."
                    />
                </div>
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
    )
}
