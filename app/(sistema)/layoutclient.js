'use client'; 

import { Avatar, Dropdown, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../login/actions";


export default function Layout({ children, usuario }) {

    const handleSair = async () => {
        await logout();
    }

    return (
        <>
            <header>
                <Navbar fluid className="bg-yellow-300 mb-8">
                    <NavbarBrand href="/blog">
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Blog de Notícias</span>
                    </NavbarBrand>
                    <div className="flex md:order-2">
                        <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
                            <DropdownHeader>
                                <span className="block text-sm">Usuário:</span>
                                <span className="block truncate text-sm font-medium">{usuario.email}</span>
                            </DropdownHeader>
                            <DropdownItem onClick={handleSair}>Sair</DropdownItem>
                        </Dropdown>
                        <NavbarToggle />
                    </div>
                    <NavbarCollapse>                        
                        <NavbarLink className="text-white" as={Link} href="/noticia">Noticias não publicadas</NavbarLink>
                    </NavbarCollapse>
                </Navbar>
            </header>
            <main>
                <ToastContainer position="top-right" autoClose={3000} className="text-sm" theme="colored" />
                <div className="mx-4 my-2">
                    {children}
                </div>
            </main>
        </>
    )
}