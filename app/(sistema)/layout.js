import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Navbar fluid className="bg-yellow-300 mb-8">
                    <NavbarBrand href="http://localhost:3000">
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Site de Exemplo D2DI2</span>
                    </NavbarBrand>
                    <div className="flex md:order-2">
                        <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
                            <DropdownHeader>
                                <span className="block text-sm">Usuário</span>
                                <span className="block truncate text-sm font-medium">usuario@email.com</span>
                            </DropdownHeader>
                            <DropdownItem>Sair</DropdownItem>
                        </Dropdown>
                        <NavbarToggle />
                    </div>
                    <NavbarCollapse>                        
                        <NavbarLink className="text-white" as={Link} href="/">Início</NavbarLink>
                        <NavbarLink className="text-white" as={Link} href="/tipocurso">Tipo de Curso</NavbarLink>
                        <NavbarLink className="text-white" as={Link} href="/curso">Curso</NavbarLink>
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