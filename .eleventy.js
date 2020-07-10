const sass = require('node-sass');
const terser = require('terser');
const fs = require('fs');
const fetch = require('node-fetch');
const htmlmin = require('html-minifier');

const cache = {};
module.exports = (eleventyConfig) => {

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addShortcode('includeScss', (filePath) => {
        return sass.renderSync({ file: `src/_includes/${filePath}.scss` }).css;
    });

    eleventyConfig.addShortcode('includeJs', (filePath) => {
        const minified = terser.minify(fs.readFileSync(`src/_includes/${filePath}.js`, 'utf8'));
        if( minified.error ) {
            console.log("Terser error: ", minified.error);
            return code;
        }
        return minified.code;
    });

    eleventyConfig.addShortcode('inline', async (url) => {
        url = url.trim();
        if (cache[url] && cache[url] != "") {
            if (process.env.LOG_LEVEL == "DEBUG") console.log(`Cache:${url}`);
            return cache[url];
        } else {
            if (process.env.LOG_LEVEL == "DEBUG") console.log(`Fetch:${url}`);
            cache[url] = await fetch(url).then(res => res.text());
            return cache[url];
        }
    });

    eleventyConfig.addShortcode('imageTag', (filePath, className) => {
        return `<img src="${filePath}" class="${className}" />`;
    });

    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if (!outputPath.endsWith(".html")) {
            return content;
        }

        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeRedundantAttributes: true,
            sortAttributes: true,
            sortClassName: true,
        });
    });

    eleventyConfig.setQuietMode(true);
    
    return {
        dir: {
            output: 'dist/',
            input: 'src',
        }
    };
};
