export let data = [
    {
        "id": 1,
        "name": "Home",
        "hide": false,
        "home_page": true,
        "base_url": "https://ciaone-1.editorx.io/mysite/",
        "settings": [
            'Settings',
            'SEO Basics',
            'Social Share',
            'Rename',
            'Dublicate',
            'Edit Page',
            'Hide',
            'Delete',
        ],
        "page_settings": {
            "page_info": {
                "page_name": "Homepage",
            },

            "permissions": {
                "type": "everyone",
                "password": "",
                "members_type": "all_members",
                "selected_members": ["cigognini.matteo@gmail.com", "andre.scaglia@hotmail.it"]
            },
            "seo_basics": {
                "page_title": "string",
                "meta_description": "string",
                "url": ''
            },
            "social_share": {
                "og_title": "Home",
                "og_description": "string",
                "url": "home"
            },
            "advanced_seo": {
                "robots_meta_tags": [
                    { type: "noindex", value: true },
                    { type: "nofollow", value: true },
                    { type: "nosnippet", value: true },
                    { type: "norarchive", value: true },
                    { type: "noimageindex", value: true },
                    { type: "max-image-preview", value: true },
                ],
                "additional_tags": [
                    { type: "url", value: "https://www.mywebsite.com" },
                    { type: "og:site_name", value: "mywebsite" },
                    { type: "og:type", value: "website" },
                    { type: "og:url", value: "https://www.mywebsite.com" },

                ],
            }
        }
    },
    {
        "id": 15,
        "name": "Page 2",
        "hide": true,
        "home_page": false,
        "base_url": "https://ciaone-1.editorx.io/mysite/",
        "settings": [
            'Settings',
            'SEO Basics',
            'Social Share',
            'Rename',
            'Dublicate',
            'Edit Page',
            'Hide',
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
                "selected_members": ["cigognini.matteo@gmail.com", "andre.scaglia@hotmail.it"]
            },
            "seo_basics": {
                "page_title": "string",
                "meta_description": "string",
                "url": 'page2'
            },
            "social_share": {
                "og_title": "Page 2",
                "og_description": "string",
                "url": "page2"
            },
            "advanced_seo": {
                "robots_meta_tags": [
                    { type: "noindex", value: true },
                    { type: "nofollow", value: true },
                    { type: "nosnippet", value: true },
                    { type: "norarchive", value: true },
                    { type: "noimageindex", value: true },
                    { type: "max-image-preview", value: true },
                ],
                "additional_tags": [
                    { type: "url", value: "https://www.mywebsite.com" },
                    { type: "og:site_name", value: "mywebsite" },
                    { type: "og:type", value: "website" },
                    { type: "og:url", value: "https://www.mywebsite.com" },

                ],
            }
        }
    }

]

