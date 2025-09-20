import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando =`
    INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
    VALUES (?,?,?)
    `;
    await connection.query(comando,[salaId, usuarioId, aprovado])
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
    UPDATE sala_permissao
    SET aprovado = true
    WHERE sala_id = ?
    `;

    await connection.query(comando, [salaId, usuarioId]);
}

export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando = `
    SELECT id
    FROM salaPermissao
    WHERE sala_id = ?
    AND usuario_id = ?
    AND aprovado = true;
    `;
    
    const [registros] = await connection.query(comando[salaId,usuarioId]);
    return registros.length > 0;            
}