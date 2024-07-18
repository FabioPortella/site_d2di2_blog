'use client'

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react"
import { tipoCursoSchema } from "./schema";
import { TipoCursoContext } from "./context";
import { toast } from "react-toastify";
import { Atualizar, Obter } from "./api";

export default function EdicaoTipoCurso({ id }) {
    const [modalOpen, setModalOpen] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            descricao: ''
        },
        resolver: yupResolver(tipoCursoSchema),
    });

    const fallbackContext = useContext(TipoCursoContext);

    const onSubmit = async (data) => {
        setBusy(busy => true);
    
        data.id = id;
        const resultado = await Atualizar(data);
    
        if (resultado.success) {
            closeModal();
            fallbackContext.atualizar(true);
    
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
            nome: '',
            descricao: ''
        })
        fallbackContext.fechar()
        setModalOpen(false);
    }

    const ObterDados = async () => {
        setBusy(true);

        const resultado = await Obter(id);

        if (resultado.success) {
            if (resultado.message !== '')
                toast.success(resultado.message);

            reset({ nome: resultado.data.nome, descricao: resultado.data.descricao });
        }
        else {
            if (resultado.message !== '')
                toast.error(resultado.message);
            closeModal();
        }

        setBusy(p => false);
    }

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);
    
        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            ObterDados();
        }
    }, [primeiroAcesso]);

    return (
        <Modal show={modalOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>Edição de Tipo de Curso</Modal.Header>
                <Modal.Body>
                    <div className="mb-2">
                        <Label htmlFor="nome">Nome</Label>
                        <TextInput id="nome" placeholder="Informe o nome do tipo de curso" {...register("nome")} />
                        <span className="text-sm text-red-600">{errors?.nome?.message}</span>
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea id="descricao" placeholder="Informe uma descrição para o tipo de curso" {...register("descricao")} rows={6} className="py-2 px-2" />
                        <span className="text-sm text-red-600">{errors?.descricao?.message}</span>
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
    )
}