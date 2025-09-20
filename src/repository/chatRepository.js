import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `INSERT INTO chatMensagem (usuarioId, salaId, mensagem)
     VALUES (?,?,?)
    `
    await connection.query(comando,[salaId, usuarioId, mensagem])
}


export async function listarMensagensPorSala(salaId) {
    const comando = `SELECT * FROM
    chatMensagem
    WHERE salaId = ?;
    `
    const [registros] = await connection.query(comando,[salaId]);
    return registros;
}