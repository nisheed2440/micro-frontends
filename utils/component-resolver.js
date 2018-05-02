const jsdom  = require("jsdom");
const { JSDOM } = jsdom;
const _ = require('lodash');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const commonScripts = require('./common-scripts');
const minify = require('html-minifier').minify;
/**
 * Function to require uncached module/file 
 * @param {string} module The name of the module that needs to be freshly required.
 * https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
 */
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

function createScript(document, src, id, defer){
    const scriptTag = document.createElement('script');
    if(typeof src === 'string'){
        scriptTag.src = src;
    } else {
        scriptTag.textContent = `var ${id} = ${JSON.stringify(src)};`;
    }
    if(id) {
        scriptTag.id = id;
    }
    scriptTag.setAttribute('defer', !!defer);
    return scriptTag;
}

module.exports = async function (req, body) {
    const dom = new JSDOM(body, {
        runScripts: 'dangerously'
    });
    
    let promiseArray = [];
    let scriptsObj = {};
    let scriptsDataObj = {};

    dom.window.document.body.querySelectorAll('[data-component]').forEach((el) => {
        const componentType = el.getAttribute('data-component');
        const componentInstanceId = el.getAttribute('data-instance-id');
        const componentReact = require(`../public/javascripts/${componentType}Component`);
        
        if(!scriptsObj[componentType]){
            scriptsObj[componentType] = `${req.secure || 'http'}://${req.get('host')}/javascripts/${componentType}Component.js`;
        }
        scriptsDataObj[componentInstanceId] = dom.window[componentInstanceId];
        if(componentReact.getInitialProps){
            promiseArray.push(componentReact.getInitialProps().then((state) => {
                scriptsDataObj[componentInstanceId] = state;
                el.innerHTML = ReactDOMServer.renderToString(React.createElement(componentReact,{data:  scriptsDataObj[componentInstanceId]}, null));
            }));
        } else {
            el.innerHTML = ReactDOMServer.renderToString(React.createElement(componentReact,{data:  scriptsDataObj[componentInstanceId]}, null));
        }
    });
    
    const common = commonScripts(req);
    

    await Promise.all(promiseArray).then(() => {
        
        _.forEach(common, function(value) {
            dom.window.document.body.appendChild(createScript(dom.window.document, value, null));
        });
    
        
        dom.window.document.body.appendChild(createScript(dom.window.document, scriptsDataObj, 'ReactData', false));
        
        _.forEach(scriptsObj, function(value, key) {
            dom.window.document.body.appendChild(createScript(dom.window.document, value, key));
        });
        
    });
    
    return minify(dom.serialize(), {
        collapseWhitespace: true,
        minifyJS: true
    });
}