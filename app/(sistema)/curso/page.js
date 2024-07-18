'use client'

import { useEffect, useState } from "react";
import { NoticiaContext } from "./context";
import NovoCurso from "./novo";
import { Button, Spinner, Table } from "flowbite-react";
import { Listar } from "./api";
import { toast } from 'react-toastify';
import RemocaoCurso from "./remocao";
import EdicaoCurso from "./atualizacao";
import { HiPencil, HiTrash } from 'react-icons/hi';

export default function Curso() {

    const [atualizar, setAtualizar] = useState(null);
    const [dados, setDados] = useState(null);
    const [busy, setBusy] = useState(false);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    const atualizarLista = async () => {

        setBusy(p => true);

        const resultado = await Listar();

        if (resultado.success && resultado.data !== null) {
            let grid = resultado.data.map((p) =>
                <Table.Row key={p.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {p.titulo}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {p.sub_titulo}
                    </Table.Cell>
                    <Table.Cell colSpan="2" className="text-right">
                        <div className="flex justify-end space-x-2">
                            <Button outline gradientMonochrome="lime" size="sm" onClick={() => { setOperacao({ id: p.id, action: 'edit' }) }}>
                                <HiPencil className="h-5 w-5" />
                            </Button>
                            <Button size="sm" outline gradientMonochrome="failure" onClick={() => { setOperacao({ id: p.id, action: 'delete' }) }}>
                                <HiTrash className="h-5 w-5" />
                            </Button>
                        </div>
                    </Table.Cell>
                </Table.Row>
            );
            setDados(grid);

            if (resultado.message !== '')
                toast.success(resultado.message);
        }
        else {
            setDados(null);
            if (resultado.message !== '')
                toast.error(resultado.message);
        }

        setBusy(p => false);
    }

    useEffect(() => {
        if (atualizar === null)
            setAtualizar(true);

        if (atualizar) {
            atualizarLista();
            setAtualizar(p => false);
        }
    }, [atualizar]);

    const fecharModals = () => {
        setOperacao({ id: null, action: null });
    }

    let modal = null;

    if (operacao.action === "edit") {
        modal = <EdicaoCurso id={operacao.id}/>
    }
    else if (operacao.action === "delete") {
        modal = <RemocaoCurso id={operacao.id}/>
    }

    return (
        <>
            <p className="text-2xl mb-5">Notícias</p>
            <p className="text-sm mb-5">Aqui serão listadas as notícias do sistema</p>

            <NoticiaContext.Provider value={{ atualizar: setAtualizar, fechar: fecharModals }}>
                <NovoCurso />
                {modal}
            </NoticiaContext.Provider>

            {busy && 
                <div class="flex justify-center items-center h-screen">
                    <Spinner/>
                </div>}
            {busy || 
                <div className="overflow-x-auto mt-5">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="text-base bg-gray-200">Título</Table.HeadCell>
                            <Table.HeadCell className="text-base bg-gray-200">Sub Título</Table.HeadCell>
                            <Table.HeadCell className="text-base bg-gray-200">
                                <span>&nbsp;</span>
                            </Table.HeadCell>
                            <Table.HeadCell className="text-base bg-gray-200">
                                <span>&nbsp;</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {dados}
                        </Table.Body>
                    </Table>
                </div>
            }
        </>
    )
}