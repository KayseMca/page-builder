#!/bin/sh

ng build product -c=production  --output-hashing=none && cat dist/apps/product/main.js  dist/apps/product/runtime.js > widget/product.js

# mv  dist/angular-elements/polyfills.js demo
# mv  dist/angular-elements/styles.css demo