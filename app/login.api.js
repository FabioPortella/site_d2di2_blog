export async function Autenticar(data) {

    data.nome = 'autenticação';

    const args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        },
        body: JSON.stringify(data)
    };

    const url = process.env.API_URL + "/users/autenticar";

    let retorno = {
        success: false,
        message: ''
    };

    await fetch(url, args).then(async (result) => {
        console.log(args)
        await result.json().then((resultData) => {
            if (result.status == 200) {
                //ações em caso de sucesso
                retorno.success = true;
                retorno.message = '';
                resultData.name = resultData.nome; //pra armazenar no cookie
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