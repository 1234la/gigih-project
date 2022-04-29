import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeAccessToken } from "../../reducer/accessTokenSlice";
import { Transition } from "@headlessui/react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector((state:any) => state.user.data);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div>
        <nav className="bg-teal-400 rounded-b-3xl shadow-lg shadow-cyan-500/50">
            <div className="max-w-7.3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                            alt="logo-spotify"
                            className="logo-spotify h-10"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <NavLink exact activeClassName="active" to='/' ></NavLink>

                                <NavLink activeClassName="active" className=" hover:bg-black hover:text-aqua-400 text-black active:bg-black active:text-aqua-400 px-3 py-2 rounded-md text-sm font-medium" to='/create-playlist' > Create Playlist </NavLink>

                                <NavLink activeClassName="active" className=" hover:bg-black hover:text-aqua-400 text-black active:bg-black active:text-aqua-400 px-3 py-2 rounded-md text-sm font-medium" to='/playlist'> My Playlist </NavLink>

                                <button className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => { dispatch(removeAccessToken());}}>Log Out</button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex justify-end items-center">
                            <p>Hello,</p>
                            <img 
                                className="h-10 rounded-full ml-2"
                                src={user.images[0]?.url}
                                alt="avatar user"
                            />
                            <p className="ml-1 font-semibold text-black">{user.display_name}</p>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            </svg>
                        ) : (
                            <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        )}
                        </button>
                    </div>
                </div>
            </div>

                <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink activeClassName="active" className="hover:bg-black hover:text-aqua-300 text-black block px-3 py-2 rounded-md text-base font-medium" to='/create-playlist'> Create Playlist </NavLink>
                            <NavLink activeClassName="active" className="hover:bg-black hover:text-aqua-300 text-black block px-3 py-2 rounded-md text-base font-medium" to='/playlist'>My Playlist</NavLink>
                            <button className="text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => { dispatch(removeAccessToken());}}>Log Out</button>
                        </div>
                    </div>
                )}
                </Transition>
        </nav>
    </div>
    );
}

export default Navbar;