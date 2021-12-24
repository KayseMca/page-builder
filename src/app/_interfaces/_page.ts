
interface Permisions{
    type:string,
    password:string,
    members_type?:string,
    selected_members?:Array<string>
}

interface SEO{
    data:string
}


interface PageInfo{
    page_name: string
}
interface PageSettings{
    page_info:PageInfo,
    seo_basics:SEO,
    permissions:Permisions
}

export class PageData{
    name!:string 
    page_settings!:PageSettings
}