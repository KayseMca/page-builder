const fs = require('fs-extra');
    const concat = require('concat');
    
    build = async () =>{
        const files = [
            './dist/apps/product/runtime.js',
            './dist/apps/product/polyfills.js',
            // './dist/apps/product/es2015-polyfills.js',
            // './dist/apps/product/scripts.js',
            './dist/apps/product/main.js'
            
          ];
        
        //   await fs.ensureDir('widget');
          await concat(files, './dist/apps/product/product.js');
    }
    build();