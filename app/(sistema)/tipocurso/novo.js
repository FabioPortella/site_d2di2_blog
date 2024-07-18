'use client'

import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react"
import { HiPlus } from "react-icons/hi";
import { tipoCursoSchema } from "./schema";
import { TipoCursoContext } from "./context";
import { Inserir } from "./api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NovoTipoCurso() {
    const [modalOpen, setModalOpen] = useState(false);
    const [busy, setBusy] = useState(false);

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
    
        const resultado = await Inserir(data);
    
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
                    <Modal.Header>Novo Tipo de Curso</Modal.Header>
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
                        <Button gradientMonochrome="cyan" size="sm" type="submit" isProcessing={busy}>
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