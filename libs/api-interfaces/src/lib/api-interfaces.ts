
import {PageData} from './_page'
export class TemplateApi{
    id!:number
    template_name!:string
    published?:boolean
    template_url?:string
    template_element?:string
    content!:Pages
    create_at?:Date
    update_at?:Date
}

interface Pages{
    pages:PageData[]
}

export class publish{
    public published = false
}