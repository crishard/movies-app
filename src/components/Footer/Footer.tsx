import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="px-5 py-8 mx-auto flex items-center justify-between">
                <div className="flex">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-200">
                        <span className="text-xl">Movies</span>
                    </a>
                    <p className="text-sm text-gray-200 ml-4 pl-4 border-l-2 border-gray-200 py-2 mt-0 max-[400px]:hidden">© 2024 Crislân
                    </p>
                </div>


                <span className="flex text-gray-200 gap-3 text-xl">
                    <a href="https://www.instagram.com/ue_crislan/"> <FaInstagram className="hover:text-gray-400 cursor-pointer" /></a>
                    <a href="www.linkedin.com/in/crislan-torres">
                        <FaLinkedin className="hover:text-gray-400 cursor-pointer" />
                    </a>
                    <a href="https://x.com/Crislan01">
                        <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
                    </a>

                </span>
            </div>
        </footer>
    )
}

export default Footer