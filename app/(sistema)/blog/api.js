'use server'

export async function Listar() {
    const args = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.API_KEY
        },
        cache: 'no-store'
    };

    const url = process.env.API_URL + "/noticias/";

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

export async function Obter(id) {
    const args = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.API_KEY
        },
        cache: 'no-store'
    };

    const url = process.env.API_URL + "/noticias/" + id;

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
