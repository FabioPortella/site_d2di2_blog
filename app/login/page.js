'use client'

import { Button, Label, TextInput } from "flowbite-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NovoUsuario from "./novo";

export default function Login() {

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} className="text-sm" theme="colored" />
            <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
                <div>
                    <span className="text-black dark:text-white">Bem-vindo ao sistema!</span>
                    <div className="mt-4">
                        <form>
                            <div>
                                <div className="mb-2">
                                    <Label htmlFor="email" className="text-sm">E-mail</Label>
                                    <TextInput id="email" placeholder="usuario@usuario.com" />
                                </div>
                                <div className="mb-2">
                                    <Label htmlFor="senha" className="text-sm">Senha</Label>
                                    <TextInput id="senha" type="password" placeholder="******" />
                                </div>
                                <div className="flex justify-center">
                                    <Button type="submit">Entrar</Button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-4">
                            <NovoUsuario />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}