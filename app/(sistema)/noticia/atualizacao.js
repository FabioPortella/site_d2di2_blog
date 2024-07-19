'use client'

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Label, Modal, Checkbox, TextInput, Textarea } from "flowbite-react"
import { noticiaSchema } from "./schema";
import { NoticiaContext } from "./context";
import { toast } from "react-toastify";
import { Atualizar, Obter } from "./api";

export default function EdicaoCurso({ id }) {
    const [modalOpen, setModalOpen] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            titulo: '',
            sub_titulo: '',
            texto: '',
            publicado: false,
        },
        resolver: yupResolver(noticiaSchema),
    });

    const fallbackContext = useContext(NoticiaContext);

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

    const ObterDados = async () => {
        setBusy(true);

        const resultado = await Obter(id);

        if (resultado.success) {
            if (resultado.message !== '')
                toast.success(resultado.message);

            reset({ titulo: resultado.data.titulo, 
                sub_titulo: resultado.data.sub_titulo,
                texto: resultado.data.texto,
                publicado: resultado.data.publicado,
             });
        }
        else {
            if (resultado.message !== '')
                toast.error(resultado.message);
            closeModal();
        }

        setBusy(p => false);
    }

    useEffect(() => {
        if (modalOpen) {
        }
    }, [modalOpen]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);

        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            ObterDados();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primeiroAcesso]);

    const closeModal = () => {
        reset({
            titulo: '',
            sub_titulo: '',
            texto: '',
            publicado: false,
        })
        setModalOpen(false);
        fallbackContext.fechar();
    }

    return (
        <Modal show={modalOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>Edição de Notícia</Modal.Header>
                <Modal.Body>
                    <div className="mb-2">
                        <Label htmlFor="titulo">Título</Label>
                        <TextInput id="titulo" placeholder="Informe título da notícia" {...register("titulo")} />
                        <span className="text-sm text-red-600">{errors?.titulo?.message}</span>
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="sub_titulo">Sub Título</Label>
                        <TextInput id="sub_titulo" placeholder="Informe o sub título da Notícia" {...register("sub_titulo")} />
                        <span className="text-sm text-red-600">{errors?.sub_titulo?.message}</span>
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="texto">Texto</Label>
                        <Textarea id="texto" placeholder="Informe o texto da notícia" {...register("texto")} />
                        <span className="text-sm text-red-600">{errors?.texto?.message}</span>
                    </div>
                    <div className="mb-2">
                        <Checkbox id="publicado" {...register("publicado")} name="publicado" />
                        <Label className="ml-3" htmlFor="publicado" value="Publicado" />
                        <span className="text-sm text-red-600">{errors?.publicado?.message}</span>
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