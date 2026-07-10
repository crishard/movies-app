import { BiCameraMovie } from "react-icons/bi";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socialLinks = [
    { href: "https://www.instagram.com/ue_crislan/", label: "Instagram", icon: <FaInstagram /> },
    { href: "https://www.linkedin.com/in/crislan-torres", label: "LinkedIn", icon: <FaLinkedin /> },
    { href: "https://x.com/Crislan01", label: "X (Twitter)", icon: <FaXTwitter /> },
];

const Footer = () => {
    return (
        <footer className="border-t border-slate-800/80">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-8">
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-bold text-slate-200 transition-colors hover:text-indigo-400"
                    >
                        <BiCameraMovie className="text-xl text-indigo-500" aria-hidden />
                        Filmes
                    </Link>
                    <span className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Crislân Torres
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-xl text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-indigo-400"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
