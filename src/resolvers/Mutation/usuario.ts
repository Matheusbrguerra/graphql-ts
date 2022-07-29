import db from '../../config/db'


export interface Filtro {
    id?: Number
    email?: String
}

async function emailUsuarioExists (email: string):Promise<boolean> {
    const userFound = await db('usuarios').select().where({email}).first()
    return !!userFound
}

async function findUser (filtro:Filtro):Promise<any> {
    let userFound = await db('usuarios').select().where(filtro).first()
    userFound.perfis = await db('perfis')
    .join(
        'usuarios_perfis',
        'perfis.id',
        'usuarios_perfis.perfil_id'
    ).where({ usuario_id: filtro.id})
    return userFound
}


export default {
    async novoUsuario(_: any, { dados }: any) {
        const { nome, email, senha, perfis } = dados
        if (await emailUsuarioExists(email)) {
            throw new Error('Email já cadastrado !!')
        }
        const novoUsuario = {
            nome,
            email,
            senha
        }
        const usuario = await db('usuarios').insert(novoUsuario)
        for (let perfil of perfis) {
            const { id, nome } = perfil
            let where: any = { }
            if(id){
                where.id = id
            }
            if(email?.length){
                where.nome = nome
            }
            const perfilEncontrado = await db('perfis').select().where(where).first()
            if(perfilEncontrado){
                const linha = {
                    usuario_id:usuario[0],
                    perfil_id: id
                }
                await db('usuarios_perfis').insert(linha)
            }
        }
        const usuarioCadastrado = await findUser({id:usuario[0]})
        return usuarioCadastrado
    },
    async excluirUsuario(_: any, { filtro }: any) {
        try {
            const usuario = await findUser(filtro)
            if(usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete()
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        } catch(e) {
            throw new Error('Erro ao excluir usuario')
        }
    },
    async alterarUsuario(_: any, { filtro, dados }: any) {
        const usuario = await findUser(filtro)
            if(usuario) {
                const { id } = usuario
                if(dados.perfis) {
                    await db('usuarios_perfis')
                        .where({ usuario_id: id }).delete()

                    for(let filtro of dados.perfis) {
                        const perfil = await db('perfis').select().where(filtro).first()
                        
                        if(perfil) {
                            await db('usuarios_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    usuario_id: id
                                })
                        }
                    }
                }

                delete dados.perfis
                await db('usuarios')
                    .where({ id })
                    .update(dados)
            }
            return !usuario ? null : { ...usuario, ...dados }
    }
}
