
export class Permisions{
    type!:string
    password!:string
    members_type!:string
    selected_members!:Array<string>
}

interface Settings{
    settings?:string,
    seo_basics?:string,
    social_share?:string,
    dublicate?:string,
    edit_page?:string,
    delete?:string,
    rename?:string
}
interface SEO{
    page_title?:string
    meta_description?:string
}

interface socialShare{
    data?:string
}


interface PageInfo{
    page_name?: string
}
export class PageSettings{
    page_info?:PageInfo
    seo_basics?:SEO
    permissions?:Permisions
    social_share?:socialShare
}

export class PageData{
    id!:number
    name!:string 
    home_page?:Boolean
    settings!:Array<string>
    page_settings!:PageSettings
}

