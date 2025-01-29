export interface Product {
    name : string,
    instructor_id : string,
    description : string,
    category_id : number,
    requerement : string,
    price : number,
    duration : number,
}

export interface Category {
    name : string,
    description : string,
    slug : string
}