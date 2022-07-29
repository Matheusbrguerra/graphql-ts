import db from '../../config/db'

export default {
    async usuarios() {
        const usuarios = await db('usuarios').select('*')

        return usuarios
    },
    async usuario(_: any, { filtro }: any) {
        const {id,email} = filtro

        let where: any = { }
        
        if(id){
            where.id = id
        }
        if(email?.length){
            where.email = email
        }

        const usuario = await db('usuarios').where(where).first()
        return usuario
    },
}