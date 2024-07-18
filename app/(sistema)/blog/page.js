'use client'

import { useEffect, useState } from "react";
import { NoticiaContext } from "./context";
import { Spinner, Button, Card } from "flowbite-react";
import { Listar } from "./api";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
};

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

                    <Card 
                        key={p.id} 
                        className="max-w-sm mb-5 ml-8" 
                        imgSrc="https://flowbite-react.com/images/blog/image-1.jpg" 
                        horizontal
                    >
                        <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {p.titulo}
                        </h3>
                        <h5 className="text-xl font-normal text-gray-700 dark:text-gray-400">
                        {p.sub_titulo}
                        </h5>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="block">Publicado: {formatDate(p.data_publicacao)}</span>
                        <span className="block">Modificado: {formatDate(p.data_modificacao)}</span>
                    </div>
                        <div div className="flex">
                        <Button>
                            Read more
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </Button></div>
                    </Card>
                
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


    return (
        <>
            <p className="text-2xl mb-5">Notícias</p>
            <p className="text-sm mb-5">Aqui serão listadas as notícias do sistema</p>

            <NoticiaContext.Provider value={{ atualizar: setAtualizar, fechar: fecharModals }}>
                  {modal}
            </NoticiaContext.Provider>

            {busy && 
                <div class="flex justify-center items-center h-screen">
                    <Spinner/>
                </div>}
            {busy || 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center mt-5">  
                    {dados}
                </div>
            }
        </>
    )
}