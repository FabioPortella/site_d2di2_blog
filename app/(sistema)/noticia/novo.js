'use client'

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Label, Modal, Checkbox, TextInput, Textarea } from "flowbite-react"
import { HiPlus } from "react-icons/hi";
import { noticiaSchema } from "./schema";
import { NoticiaContext } from "./context";
import { toast } from "react-toastify";
import { Inserir } from "./api";

export default function NovoCurso() {
    const [modalOpen, setModalOpen] = useState(false);
    const [busy, setBusy] = useState(false);

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

    useEffect(() => {
        if (modalOpen) {}
    }, [modalOpen])

    const onSubmit = async (data) => {
        setBusy(busy => true);

        const resultado = await Inserir(data);
        console.log(data)

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
            titulo: '',
            sub_titulo: '',
            texto: '',
            publicado: false,
        })
        setModalOpen(false);
    }

    return (
        <>
            <Button gradientMonochrome="cyan" onClick={() => { setModalOpen(true) }}>
                <HiPlus className="mr-1 h-5 w-5" />
                <span>Novo</span>
            </Button>

            <Modal show={modalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>Nova Notícia</Modal.Header>
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
                        <Button gradientMonochrome="cyan" size="sm" type="submit" isProcessing={busy} disabled={busy}>
                            Salvar
                        </Button>
                        <Button size="sm" outline gradientMonochrome="lime" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}