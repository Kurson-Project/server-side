import { prisma } from "../utils/prisma"
import { Product , Category } from "./class/mentor.class.service"


export const createNewProduct = async (product : Product) => {
    return await prisma.product.create({data : {
        name : product.name,
        description : product.description,
        price : product.price,
        instructor_id : product.instructor_id,
        duration : product.duration,
        requerement : product.requerement,
        categories : {
            create : {
                category : {
                    connect : {
                        id : product.category_id
                    }
                }
            }
        }
    }})
}


export const createNewCategorie = async (category : Category) => {
    return await prisma.category.create({data : {
        name : category.name,
        description : category.description,
        slug : category.slug
    }})
}

export const getProductMentor = async (mentor_id : string) => { 
    return await prisma.product.findMany({
        include : { categories : { include : { category : true } } },
        where : {instructor_id : mentor_id}
    })
}