import db from '../../config/db'

export default {
    async perfis(usuario:any) {
        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfis.id',
                'usuarios_perfis.perfil_id'
            ).where({ usuario_id: usuario.id})
    }
}