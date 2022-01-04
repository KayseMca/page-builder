
export class Permisions{
    type?:string
    password?:string
    members_type?:string
    selected_members?:Array<string>
}

export interface Settings{
    settings?:string,
    seo_basics?:string,
    social_share?:string,
    dublicate?:string,
    edit_page?:string,
    delete?:string,
    rename?:string
}
export class SEO{
    page_title?:string
    meta_description?:string
    url?:string
}
export class AdditionalSEO{
    data?:string
}

export class SocialShare{
    og_title?:string
    og_description?:string
    url?:string
}


interface PageInfo{
    page_name?: string
}

export class PageSettings{
    page_info?:PageInfo
    seo_basics?:SEO
    permissions?:Permisions
    social_share?:SocialShare
    additional_seo?:AdditionalSEO
}

export class PageData{
    id!:number
    name!:string 
    home_page?:Boolean
    hide!:Boolean
    base_url?:string
    settings!:Array<string>
    page_settings!:PageSettings
}

