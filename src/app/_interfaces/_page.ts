import { Typograph } from "./_typograph"

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
    robots_meta_tags?:Array<Object>
    additional_tags?:Array<Object>

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
    advanced_seo?:AdditionalSEO
}

// export interface FontStyle{
//     name?:string
//     font?:string
//     size?:number
//     style?:string
//     color?:string
// }
export interface Style{

    typography?:Array<Typograph>
    background_color?:string



}

export class PageData{
    id!:number
    name!:string 
    home_page?:Boolean
    hide!:Boolean
    page_styles?:Style
    page_url?:string
    base_url?:string
    settings!:Array<string>
    page_settings?:PageSettings
}

