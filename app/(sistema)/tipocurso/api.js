'use server'

export async function Inserir(data) {

    const args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        },
        body: JSON.stringify(data)
    };

    const url = process.env.API_URL + "/tipocurso";

    let retorno = {
        success: undefined,
        message: ''
    };

    await fetch(url, args).then((result) => {
        result.json().then((resultData) => {
            if (result.status == 201) {
                //ações em caso de sucesso
                retorno.success = true;
                // retorno.message = resultData;
                retorno.message = "Tipo de curso salvo com sucesso";
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na conversão para Json
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}

export async function Listar() {
    const args = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.API_KEY
        },
        cache: 'no-store'
    };

    const url = process.env.API_URL + "/tipocurso";

    let retorno = {
        success: undefined,
        message: '',
        data: null
    };

    await fetch(url, args).then((result) => {
        result.json().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.data = resultData;
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na conversão para Json
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}

export async function Remover(id) {

    const args = {
        method: 'DELETE',
        headers: {
            'x-api-key': process.env.API_KEY
        }
    };

    const url = process.env.API_URL + "/tipocurso/" + id;

    let retorno = {
        success: undefined,
        message: ''
    };

    await fetch(url, args).then((result) => {
        result.text().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.message = "Tipo de curso removido com sucesso";
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na obtenção do texto
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}

export async function Obter(id) {
    const args = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.API_KEY
        },
        cache: 'no-store'
    };

    const url = process.env.API_URL + "/tipocurso/" + id;

    let retorno = {
        success: undefined,
        message: '',
        data: null,
    };

    await fetch(url, args).then((result) => {
        result.json().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.data = resultData;
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na conversão para Json
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}

export async function Atualizar(data) {

    const args = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        },
        body: JSON.stringify(data)
    };

    const url = process.env.API_URL + "/tipocurso/" + data.id;

    let retorno = {
        success: undefined,
        message: ''
    };

    await fetch(url, args).then((result) => {
        result.json().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.message = "Tipo de curso atualizado com sucesso";
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na conversão para Json
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}

export async function Pesquisar(data) {
    const args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        },
        cache: 'no-store',
        body: JSON.stringify(data)
    };

    const url = process.env.API_URL + "/tipocurso/pesquisa/" ;

    let retorno = {
        success: undefined,
        message: '',
        data: null,
    };

    await fetch(url, args).then((result) => {
        result.json().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.data = resultData;
            }
            else {
                //ações em caso de erro
                let errorMessage = '';
                if (resultData.errors != null) {
                    const totalErros = Object.keys(resultData.errors).length;

                    for (let i = 0; i < totalErros; i++) {
                        errorMessage = errorMessage + Object.values(resultData.errors)[i];
                    }
                }
                else
                    errorMessage = resultData;

                retorno.status = false;
                retorno.message = errorMessage;
            }
        }).catch(() => {
            //erro na conversão para Json
            retorno.status = false;
            retorno.message = 'Dados inválidos';
        })
    }).catch((ex) => {
        //erro geral
        retorno.status = false;
        retorno.message = ex.message;
    });

    return retorno;
}