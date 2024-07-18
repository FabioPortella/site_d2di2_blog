'use client'

import { useEffect, useState } from "react"
import { Pesquisar } from "../../tipocurso/api";
import { BuscarPorTipoCurso } from "../../curso/api";
import { Spinner, Table } from "flowbite-react";

export default function ListarClient({ nome }) {

    const [busy, setBusy] = useState(false);
    const [dado, setDado] = useState(null);
    const [lista, setLista] = useState([]);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const obterDados = async () => {
        setBusy(true);
        const resultado = await Pesquisar({ Nome: nome });
        if (resultado.success && resultado.data.length == 1) {
            setDado(resultado.data[0].nome);

            const lista = await BuscarPorTipoCurso(resultado.data[0].id);

            if (lista.success) {
                setLista(lista.data);
            }
        }
        else {
            setDado("Tipo de curso não encontrado");
        }
        setBusy(p => false);
    }

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);

        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            obterDados();
        }
    }, [primeiroAcesso]);

    return (
        <>
            {busy && <Spinner />}
            {busy || 
            <div className="overflow-x-auto mt-5">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colSpan={3} className="text-center text-base bg-gray-200">{dado}</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {lista.map((item) => (
                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {item.nome}
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
            </div>
            }
        </>
    )
}