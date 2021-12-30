export let data = [
    {
        "id" :1,
        "name": "Home",
        "home_page":true,
        "settings":[
            'Settings',
            'SEO Basics',
            'Social Share',
            'Rename',
            'Dublicate',
            'Edit Page',
            'Delete'
        ],
        "page_settings": {
            "page_info": {
                "page_name": "Homepage",
            },
    
            "permissions": {
                "type": "everyone",
                "password": "",
                "members_type": "all_members",
                "selected_members": ["cigognini.matteo@gmail.com","andre.scaglia@hotmail.it"]
            },
            "seo_basics": {
                "page_title":"string",
                "meta_description":"string"
            },
            "social_share": {
                "data":"Social Share"
            }
        }
    },
    {
        "id":15,
        "name": "Page 2",
        "home_page":false,
        "settings":[
            'Settings',
            'SEO Basics',
            'Social Share',
            'Rename',
            'Dublicate',
            'Edit Page',
            'Delete'
        ],
        "page_settings": {
            "page_info": {
                "page_name": "Page 2",
            },
    
            "permissions": {
                "type": "everyone",
                "password": "",
                "members_type": "all_members",
                "selected_members": ["cigognini.matteo@gmail.com","andre.scaglia@hotmail.it"]
            },
            "seo_basics": {
                "page_title":"string",
                "meta_description":"string"
            },
            "social_share": {
                "data":"Social Share"
            }
        }
    }

]