import icon from "/icon-512.png";

interface NavbarProps {
    showItems?: boolean;
}

export default function Navbar({ showItems }: NavbarProps) {
    return (
        <nav className="sticky w-full z-20 top-0 inset-s-0 bg-floral-white z-150">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/itinerarey" className="flex items-center space-x-3">
                    <img src={icon} className="h-10" alt="Logo" />
                    <span className="self-center text-xl font-bold text-cerulean whitespace-nowrap">Itinerarey</span>
                </a>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {showItems && (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                            <li>
                                <a href="#home" className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#search" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Search</a>
                            </li>
                            <li>
                                <a href="#about" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</a>
                            </li>
                            <li>
                                <a href="#go" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Go!</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}