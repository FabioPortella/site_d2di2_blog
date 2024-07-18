import ListarClient from "./client";

export default function Page({ params }) {
    return (
        <>
            <p className="text-2xl mb-5">Cursos por tipo de curso</p>
            <p className="text-sm mb-5">Aqui serão listados todos os cursos do tipo de curso selecionado</p>

            <ListarClient nome={params?.nome} />
        </>
    )
}