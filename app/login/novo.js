'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { novoUsuarioSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, Modal, Select, TextInput} from "flowbite-react"
import { toast } from "react-toastify";
import { Inserir } from "./api";

const crypto = require('crypto');

function createSHA256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

export default function NovoUsuario() {

    const [modalOpen, setModalOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            username: '',
            first_name: '',
            last_name: '',
            data_nascimento: '',
            tipo: '',
        },
        resolver: yupResolver(novoUsuarioSchema),
    });

    const onSubmit = async (data) => {
        setBusy(busy => true);

        // data.password = createSHA256Hash(data.senha + 'khadfhyf388');
        data.data_nascimento = data.data_nascimento.toISOString().split('T')[0];
        
        const resultado = await Inserir(data);

        if (resultado.success) {
            closeModal();

            if (resultado.message !== '')
                toast.success(resultado.message);
        }
        else {
            if (resultado.message !== '')
                toast.error(resultado.message);
        }

        setBusy(busy => false);
    }

    const closeModal = () => {
        reset({
            email: '',
            password: '',
            username: '',
            first_name: '',
            last_name: '',
            data_nascimento: '',
            tipo: '',
        })
        setModalOpen(false);
    }

    return (
        <>
            <span className="text-gray-800 dark:text-gray-400 text-sm cursor-pointer" onClick={() => { setModalOpen(true) }}>Clique aqui para registrar um novo usuário</span>

            <Modal show={modalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>Novo Usuário</Modal.Header>
                    <Modal.Body>
                        <div className="mb-2">
                            <Label htmlFor="email">E-mail</Label>
                            <TextInput id="email" placeholder="Informe seu email" {...register("email")} />
                            <span className="text-sm text-red-600">{errors?.email?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="password">Senha</Label>
                            <TextInput id="password" type="password" placeholder="Informe a senha do usuário" {...register("password")} />
                            <span className="text-sm text-red-600">{errors?.password?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="username">Username</Label>
                            <TextInput id="username" placeholder="Informe UserName do usuário" {...register("username")} />
                            <span className="text-sm text-red-600">{errors?.username?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="first_name">Nome (primeiro nome)</Label>
                            <TextInput id="first_name" placeholder="Informe o nome do usuário" {...register("first_name")} />
                            <span className="text-sm text-red-600">{errors?.first_name?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="last_name">Sobrenome</Label>
                            <TextInput id="last_name" placeholder="Informe o sobrenome do usuário" {...register("last_name")} />
                            <span className="text-sm text-red-600">{errors?.last_name?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                            <TextInput id="data_nascimento" type="date" placeholder="Informe a data de nascimento" {...register("data_nascimento")} />
                            <span className="text-sm text-red-600">{errors?.data_nascimento?.message}</span>
                        </div>
                        <div className="mb-2">
                            <Label htmlFor="tipo">Tipo de usuário</Label>
                            <Select id="tipo" {...register("tipo")}>
                                <option value='' key={0} disabled label="<Escolha>" />
                                <option value='leitor' key={1} label="Leitor" />
                                <option value='autor' key={2} label="Autor" />
                            </Select>
                            <span className="text-sm text-red-600">{errors?.tipo?.message}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-end">
                        <Button size="sm" type="submit" isProcessing={busy} disabled={busy}>
                            Salvar
                        </Button>
                        <Button size="sm" color="gray" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
} 