import db from '../../config/db'

export default {
    async perfis() {
        const perfis = await db('perfis').select('*')

        return perfis
    },
    async perfil(_: any, { filtro }: any) {
        const {id,nome} = filtro

        let where: any = { }
        
        if(id){
            where.id = id
        }
        if(nome?.length){
            where.nome = nome
        }

        const perfil = await db('perfis').where(where).first()
        return perfil
    }
}