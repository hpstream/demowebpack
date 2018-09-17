const hljs = require('highlight.js');
const merge = require('webpack-merge');
const cheerio = require('cheerio');
const hash = require('hash-sum')
const LRU = require('lru-cache')
var fs = require('fs');
// const $ = cheerio.load('<h2 class="title">Hello world</h2>');
const md = require('markdown-it')({
    html: true,
    // 代码高亮
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
            var ssrrww = '<pre class="hljs"><code>'  + 
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
          return  `    <wb-cc> 
                        <div slot="footer">${ssrrww}</div>
                    </wb-cc>`
        } catch (__) {}
      }
  
      return '<pre v-pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  })

md.use(require('markdown-it-container'), 'spoiler', {

    validate: function(params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
            var str = tokens[idx+1].content;
            const $ = cheerio.load(str);
            var ww = $('template').html();
        return `<div>${ww}</div>`+'<details><summary>' + m[1] + '</summary>\n';
        } else {
        return '</details>\n';
        }
    }
});
const cache = LRU({ max: 1000 })
var my = function(source){
    const file = this.resourcePath;
    const key = hash(file + source);
    const cached = cache.get(key);
    // 重新模式下构建时使用缓存以提高性能
    if (cached) {
        return cached;
    }
    source = source.replace(/[\n]/g, "");
   var result = md.render(source);
   const $ = cheerio.load(source);
  var obj = {};
   for(var i=0; i<$('script').length;i++){
        var s = $($('script')[i]).html().replace(/[\n |' ']/g, "");
        var ss = s.match(/({(.)*})/g)
        if(ss){
            var ssss = new Function(`return ${ss[0]}`)()
             obj = merge(obj,ssss);
        }  
   }
   var methodsstr ='';
   var methodflg =true;
   function objToString(obj){
        for(var key in obj){
            var s = obj[key];
            if(key == 'data'){
                obj[key] = `data(){ return ${JSON.stringify(obj[key])} }`;
            }
            if(typeof s  == 'function'){
                if(methodflg){
                    methodflg =false;
                    methodsstr += `${key} : ${s}`;
                }else{
                    methodsstr += `,${key} : ${s}`;
                }
               
            }
            if(typeof s  == 'object'){
                objToString(s);
            }
        }
   }
   objToString(obj);
   
   var mt = `
      <template>
        <div>
            ${result}
        </div>
      </template>

      <script>
      export default {${obj.data},methods:{${methodsstr}}}
      </script>
   `;
   fs.writeFile('./message.vue',mt,function(err){
        if(err) {
            console.log('写文件操作失败');
        }else{
            console.log('写文件操作成功');
    }
    
    });
   cache.set(key, mt);
    return `
        module.exports =   ${mt}
    `
} 
module.exports =  my;

