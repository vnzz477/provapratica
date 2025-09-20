import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    const salaId = req.params.sala;
    const usuarioLogadoId = req.user.id;
    const mensagem = req.body.mensagem;

    const temPermissao = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioLogadoId);                                                                                                                                                           
    if (!temPermissao){
        return resp.status(403).send({
            erro: 'Você não tem permissão para entrar na sala.'
        }); 
        
    }

    await chatRepo.inserirMensagem(usuarioLogadoId,salaId, mensagem )
    resp.send()
});


endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    const salaId = req.params.sala;
    const usuarioLogadoId = req.user.id;

    const temPermissao = salaPermissaoRepo.verificarPermissaoSala(salaId,usuarioLogadoId);
    if(!temPermissao){
        return resp.status()
        
    }
    
});


export default endpoints;