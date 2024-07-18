import * as yup from "yup"

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