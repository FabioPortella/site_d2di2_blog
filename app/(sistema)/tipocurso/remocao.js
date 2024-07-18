'use client'

import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react"
import { TipoCursoContext } from "./context";
import { toast } from 'react-toastify';
import { Remover } from "./api";

export default function RemocaoTipoCurso({ id }) {

    const [modalOpen, setModalOpen] = useState(true);
    const [busy, setBusy] = useState(false);

    const tipoCursoContext = useContext(TipoCursoContext);

    const handleClose = () => {
        setModalOpen(false);
        tipoCursoContext.fechar();
    }

    const handleDelete = async () => {
        setBusy(true);
    
        const resultado = await Remover(id);
    
        if (resultado.success) {
            handleClose();
            tipoCursoContext.atualizar(true);
            if (resultado.message !== '')
                toast.success(resultado.message);
        }
        else {
            if (resultado.message !== '')
                toast.error(resultado.message);
        }
    
        setBusy(p => false);
    }

    return (
        <Modal show={modalOpen} onClose={handleClose}>
            <Modal.Header>Remover tipo de curso</Modal.Header>
            <Modal.Body>
                Deseja realmente remover este tipo de curso?
            </Modal.Body>
            <Modal.Footer className="justify-end">
                <Button size="sm" type="button" isProcessing={busy} disabled={busy} onClick={handleDelete}>
                    Remover
                </Button>
                <Button size="sm" color="gray" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}