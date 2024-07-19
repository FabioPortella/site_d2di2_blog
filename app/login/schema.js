import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string()
        .email('Informe um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: yup.string()
        .required('A senha é obrigatória')
}).required();

export const novoUsuarioSchema = yup.object({
    email: yup.string()
        .email('Informe um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: yup.string()
        .required('A senha é obrigatória'),
    username: yup.string()
        .required('O Username é obrigatório'),
    first_name: yup.string(),
    last_name: yup.string(),
    data_nascimento: yup.date(),
    tipo: yup.string()
        .typeError('O tipo de usuário é obrigatório')
        .required('O tipo de usuário é obrigatório')
}).required();