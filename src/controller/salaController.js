import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
    const nomeSala = req.body.nome;
    const   usuarioLogadoID = req.user.id;

    const salaID = await salaRepo.inserirSala(nomeSala, usuarioLogadoID);
    await salaPermissaoRepo.inserirPermissao(salaID,usuarioLogadoID, true);

    resp.send({ 
    id: salaID,
        MENSAGEM: "Sala criada com Sucesso!!"
    })
});


export default endpoints;