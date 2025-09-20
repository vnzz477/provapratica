import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";

import * as salaPermissaoRepo from "../repository/salaPermissaoRepository.js";
import * as salaRepo from "../repository/salaRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post("/sala/:sala/entrar", autenticador, async (req, resp, next) => {
  const usuarioLogadoId = req.user.id;
  const salaId = req.params.sala;

  
  const permissaoId = await salaPermissaoRepo.inserirPermissao(
    salaId,
    usuarioLogadoId,
    false
  );

  resp.status(201).send({ id: permissaoId });
});


endpoints.post(
  "/sala/:sala/aprovar/:usuario",
  autenticador,
  async (req, resp, usuarioId) => {
    const usuarioLogadoId = req.user.id;
    const salaId = req.params.sala;
    const UsuarioId = req.params.usuario;


    const sala = await salaRepo.buscarSalaPorId(salaId);
    if (!sala || sala.usuario_id !== usuarioLogadoId) {
      return resp
        .status(403)
        .send({ erro: "Apenas o criador da sala pode aprovar usuários" });
    }


    const aprovado = await salaPermissaoRepo.aprovarPermissao(
      salaId,
      usuarioId
    );
    if (!aprovado) {
      return resp.status(404).send({ erro: "Permissão não encontrada" });
    }

    resp.send({ mensagem: "Usuário aprovado com Sucesso!" });
  }
);

export default endpoints;