import * as yup from "yup"

export const cursoSchema = yup.object({
    nome: yup.string()
        .min(3, 'O nome deve possuir, no mínimo, 3 caracteres')
        .max(100, 'O nome deve possuir, no máximo, 100 caracteres')
        .required('O nome do curso é obrigatório'),
    //tipoCursoId: yup.number() //api aula
    tipoDoCurso: yup.number() //minha api Django Ninja
        .typeError('O tipo de curso é obrigatório')
        .required('O tipo de curso é obrigatório')
}).required();


export const noticiaSchema = yup.object({
    titulo: yup.string()
        .required('O Título da notícia é obrigatório'),
    sub_titulo: yup.string()
        .required('O Sub Titulo da notícia é obrigatório'),
    texto: yup.string()
        .required('Informe o conteudo de sua notícia'),
    autor: yup.number(),
    data_publicacao: yup.date(),
    data_modificacao: yup.date(),
    publicado: yup.boolean()
        .default(false)
        .required(),
}).required();