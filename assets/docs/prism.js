/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+jade+stylus&plugins=line-highlight+line-numbers+show-invisibles+autolinker+wpd+file-highlight+show-language+highlight-keywords */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=_self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var s={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var l in a)a.hasOwnProperty(l)&&(s[l]=a[l]);s[o]=i[o]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=s)}),r[e]=s},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,s,o=a;o&&!e.test(o.className);)o=o.parentNode;if(o&&(l=(o.className.match(e)||[,""])[1],s=t.languages[l]),a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=a.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l),s){var u=a.textContent;if(u){u=u.replace(/^(?:\r?\n|\r)/,"");var g={element:a,language:l,grammar:s,code:u};if(t.hooks.run("before-highlight",g),r&&_self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){g.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(g.element),t.hooks.run("after-highlight",g)},c.postMessage(JSON.stringify({language:g.language,code:g.code}))}else g.highlightedCode=t.highlight(g.code,g.grammar,g.language),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",g)}}},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var s=n[l];s="Array"===t.util.type(s)?s:[s];for(var o=0;o<s.length;++o){var u=s[o],g=u.inside,c=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){u.lastIndex=0;var m=u.exec(d);if(m){c&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),N=[p,1];b&&N.push(b);var O=new a(l,g?t.tokenize(m,g):m,h);N.push(O),w&&N.push(w),Array.prototype.splice.apply(r,N)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var s="";for(var o in i.attributes)s+=o+'="'+(i.attributes[o]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+s+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;_self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),_self.close()},!1),_self.Prism):_self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;
!function(e){e.languages.jade={"multiline-comment":{pattern:/((?:^|\n)([\t ]*))\/\/.*(\n\2[\t ]+.+)*/,lookbehind:!0,alias:"comment"},"multiline-script":{pattern:/((?:^|\n)([\t ]*)script\b.*\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0,inside:{rest:e.languages.javascript}},filter:{pattern:/((?:^|\n)([\t ]*)):.+(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"}}},"multiline-plain-text":{pattern:/((?:^|\n)([\t ]*)[\w\-#.]+\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,lookbehind:!0},markup:{pattern:/((?:^|\n)[\t ]*)<.+/,lookbehind:!0,inside:{rest:e.languages.markup}},comment:{pattern:/((?:^|\n)[\t ]*)\/\/.+/,lookbehind:!0},doctype:{pattern:/((?:^|\n)[\t ]*)doctype(?: .+)?/,lookbehind:!0},"flow-control":{pattern:/((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|each|while)(?: .+)?/,lookbehind:!0,inside:{each:{pattern:/((?:^|\n)[\t ]*)each .+? in\b/,lookbehind:!0,inside:{keyword:/\b(?:each|in)\b/,punctuation:/,/}},branch:{pattern:/((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|while)/,lookbehind:!0,alias:"keyword"},rest:e.languages.javascript}},keyword:{pattern:/((?:^|\n)[\t ]*)(?:block|extends|include|append|prepend)\b.+/,lookbehind:!0},mixin:[{pattern:/((?:^|\n)[\t ]*)mixin .+/,lookbehind:!0,inside:{keyword:/^mixin/,"function":/\w+(?=\s*\(|\s*$)/,punctuation:/[(),.]/}},{pattern:/((?:^|\n)[\t ]*)\+.+/,lookbehind:!0,inside:{name:{pattern:/^\+\w+/,alias:"function"},rest:e.languages.javascript}}],script:{pattern:/((?:^|\n)[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*) .+/,lookbehind:!0,inside:{rest:e.languages.javascript}},"plain-text":{pattern:/((?:^|\n)[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/,lookbehind:!0},tag:{pattern:/((?:^|\n)[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/,lookbehind:!0,inside:{attributes:[{pattern:/&[^(]+\([^)]+\)/,inside:{rest:e.languages.javascript}},{pattern:/\([^)]+\)/,inside:{"attr-value":{pattern:/(=\s*)(?:\{[^}]*\}|[^,)\n]+)/,lookbehind:!0,inside:{rest:e.languages.javascript}},"attr-name":/[\w-]+(?=\s*!?=|\s*[,)])/,punctuation:/[!=(),]/}}],punctuation:/[:]/}},code:[{pattern:/((?:^|\n)[\t ]*(?:-|!?=)).+/,lookbehind:!0,inside:{rest:e.languages.javascript}}],punctuation:/[.\-!=|]/};for(var t="((?:^|\\n)([\\t ]*)):{{filter_name}}(\\n(?:\\2[\\t ]+.+|\\s*?(?=\\n)))+",n=[{filter:"atpl",language:"twig"},{filter:"coffee",language:"coffeescript"},"ejs","handlebars","hogan","less","livescript","markdown","mustache","plates",{filter:"sass",language:"scss"},"stylus","swig"],a={},i=0,s=n.length;s>i;i++){var l=n[i];l="string"==typeof l?{filter:l,language:l}:l,e.languages[l.language]&&(a["filter-"+l.filter]={pattern:RegExp(t.replace("{{filter_name}}",l.filter)),lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"},rest:e.languages[l.language]}})}e.languages.insertBefore("jade","filter",a)}(Prism);;
Prism.languages.stylus={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},keyword:/(px|r?em|ex|ch|vw|vh|vmin|vmax|deg|grad|rad|turn|m?s|k?Hz|dpi|dppx|dpcm)\b|\b(is|defined|not|isnt|and|or|unless|for|in)\b/g,atrule:/@[\w-]+(?=\s+\S+)/gi,url:/url\((["']?).*?\1\)/gi,variable:/^\s*([\w-]+)(?=\s*[+-\\]?=)/gm,string:/("|')(\\\n|\\?.)*?\1/g,important:/\B!important\b/gi,hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/\d+\.?\d*%?/g,selector:[{pattern:/::?(after|before|first-letter|first-line|selection)/g,alias:"pseudo-element"},{pattern:/:(?:active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|in-range|invalid|lang|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-of-type|only-child|optional|out-of-range|read-only|read-write|required|root|target|valid|visited)(?:\(.*\))?/g,alias:"pseudo-class"},{pattern:/\[[\w-]+?\s*[*~$^|=]?(?:=\s*\S+)?\]/g,inside:{"attr-name":{pattern:/(\[)([\w-]+)(?=\s*[*~$^|=]{0,2})/g,lookbehind:!0},punctuation:/\[|\]/g,operator:/[*~$^|=]/g,"attr-value":{pattern:/\S+/}},alias:"attr"},{pattern:/\.[a-z-]+/i,alias:"class"},{pattern:/#[a-z-]+/i,alias:"id"},{pattern:/\b(html|head|title|base|link|meta|style|script|noscript|template|body|section|nav|article|aside|h[1-6]|header|footer|address|main|p|hr|pre|blockquote|ol|ul|li|dl|dt|dd|figure|figcaption|div|a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|dbo|span|br|wbr|ins|del|image|iframe|embed|object|param|video|audio|source|track|canvas|map|area|sv|math|table|caption|colgroup|col|tbody|thead|tfoot|tr|td|th|form|fieldset|legeng|label|input|button|select|datalist|optgroup|option|textarea|keygen|output|progress|meter|details|summary|menuitem|menu)\b/g,alias:"tag"}],property:[/^\s*([a-z-]+)(?=\s+[\w\W]+|\s*:)(?!\s*\{|\r?\n)/gim,{pattern:/(\(\s*)([a-z-]+)(?=\s*:)/gi,lookbehind:!0}],"function":/[-a-z0-9]+(?=\()/gi,punctuation:/[\{\};:]/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g};;
!function(){function e(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e))}function t(e,t){return t=" "+t+" ",(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(t)>-1}function n(e,n,i){for(var r,a=n.replace(/\s+/g,"").split(","),l=+e.getAttribute("data-line-offset")||0,o=parseFloat(getComputedStyle(e).lineHeight),d=0;r=a[d++];){r=r.split("-");var c=+r[0],h=+r[1]||c,s=document.createElement("div");s.textContent=Array(h-c+2).join(" \n"),s.className=(i||"")+" line-highlight",t(e,"line-numbers")||(s.setAttribute("data-start",c),h>c&&s.setAttribute("data-end",h)),s.style.top=(c-l-1)*o+"px",t(e,"line-numbers")?e.appendChild(s):(e.querySelector("code")||e).appendChild(s)}}function i(){var t=location.hash.slice(1);e(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)});var i=(t.match(/\.([\d,-]+)$/)||[,""])[1];if(i&&!document.getElementById(t)){var r=t.slice(0,t.lastIndexOf(".")),a=document.getElementById(r);a&&(a.hasAttribute("data-line")||a.setAttribute("data-line",""),n(a,i,"temporary "),document.querySelector(".temporary.line-highlight").scrollIntoView())}}if(window.Prism){var r=(crlf=/\r?\n|\r/g,0);Prism.hooks.add("after-highlight",function(t){var a=t.element.parentNode,l=a&&a.getAttribute("data-line");a&&l&&/pre/i.test(a.nodeName)&&(clearTimeout(r),e(".line-highlight",a).forEach(function(e){e.parentNode.removeChild(e)}),n(a,l),r=setTimeout(i,1))}),addEventListener("hashchange",i)}}();;
Prism.hooks.add("after-highlight",function(e){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var a,n=1+e.code.split("\n").length,l=new Array(n);l=l.join("<span></span>"),a=document.createElement("span"),a.className="line-numbers-rows",a.innerHTML=l,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(a)}});;
!function(){if(window.Prism)for(var r in Prism.languages){var g=Prism.languages[r];g.tab=/\t/g,g.crlf=/\r\n/g,g.lf=/\n/g,g.cr=/\r/g}}();;
!function(){if(self.Prism){var i=/\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:#=?&amp;]+/,n=/\b\S+@[\w.]+[a-z]{2}/,t=/\[([^\]]+)]\(([^)]+)\)/,e=["comment","url","attr-value","string"];for(var a in Prism.languages){var r=Prism.languages[a];Prism.languages.DFS(r,function(a,r,l){e.indexOf(l)>-1&&"Array"!==Prism.util.type(r)&&(r.pattern||(r=this[a]={pattern:r}),r.inside=r.inside||{},"comment"==l&&(r.inside["md-link"]=t),"attr-value"==l?Prism.languages.insertBefore("inside","punctuation",{"url-link":i},r):r.inside["url-link"]=i,r.inside["email-link"]=n)}),r["url-link"]=i,r["email-link"]=n}Prism.hooks.add("wrap",function(i){if(/-link$/.test(i.type)){i.tag="a";var n=i.content;if("email-link"==i.type&&0!=n.indexOf("mailto:"))n="mailto:"+n;else if("md-link"==i.type){var e=i.content.match(t);n=e[2],i.content=e[1]}i.attributes.href=n}})}}();;
!function(){function e(e){var a=e.toLowerCase();if(t.HTML[a])return"html";if(t.SVG[e])return"svg";if(t.MathML[e])return"mathml";if(0!==t.HTML[a]){var n=(document.createElement(e).toString().match(/\[object HTML(.+)Element\]/)||[])[1];if(n&&"Unknown"!=n)return t.HTML[a]=1,"html"}if(t.HTML[a]=0,0!==t.SVG[e]){var r=(document.createElementNS("http://www.w3.org/2000/svg",e).toString().match(/\[object SVG(.+)Element\]/)||[])[1];if(r&&"Unknown"!=r)return t.SVG[e]=1,"svg"}return t.SVG[e]=0,0!==t.MathML[e]&&0===e.indexOf("m")?(t.MathML[e]=1,"mathml"):(t.MathML[e]=0,null)}if(self.Prism){if(Prism.languages.css&&(Prism.languages.css.atrule.inside["atrule-id"]=/^@[\w-]+/,Prism.languages.css.selector.pattern?(Prism.languages.css.selector.inside["pseudo-class"]=/:[\w-]+/,Prism.languages.css.selector.inside["pseudo-element"]=/::[\w-]+/):Prism.languages.css.selector={pattern:Prism.languages.css.selector,inside:{"pseudo-class":/:[\w-]+/,"pseudo-element":/::[\w-]+/}}),Prism.languages.markup){Prism.languages.markup.tag.inside.tag.inside["tag-id"]=/[\w-]+/;var t={HTML:{a:1,abbr:1,acronym:1,b:1,basefont:1,bdo:1,big:1,blink:1,cite:1,code:1,dfn:1,em:1,kbd:1,i:1,rp:1,rt:1,ruby:1,s:1,samp:1,small:1,spacer:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,"var":1,wbr:1,noframes:1,summary:1,command:1,dt:1,dd:1,figure:1,figcaption:1,center:1,section:1,nav:1,article:1,aside:1,hgroup:1,header:1,footer:1,address:1,noscript:1,isIndex:1,main:1,mark:1,marquee:1,meter:1,menu:1},SVG:{animateColor:1,animateMotion:1,animateTransform:1,glyph:1,feBlend:1,feColorMatrix:1,feComponentTransfer:1,feFuncR:1,feFuncG:1,feFuncB:1,feFuncA:1,feComposite:1,feConvolveMatrix:1,feDiffuseLighting:1,feDisplacementMap:1,feFlood:1,feGaussianBlur:1,feImage:1,feMerge:1,feMergeNode:1,feMorphology:1,feOffset:1,feSpecularLighting:1,feTile:1,feTurbulence:1,feDistantLight:1,fePointLight:1,feSpotLight:1,linearGradient:1,radialGradient:1,altGlyph:1,textPath:1,tref:1,altglyph:1,textpath:1,tref:1,altglyphdef:1,altglyphitem:1,clipPath:1,"color-profile":1,cursor:1,"font-face":1,"font-face-format":1,"font-face-name":1,"font-face-src":1,"font-face-uri":1,foreignObject:1,glyph:1,glyphRef:1,hkern:1,vkern:1},MathML:{}}}var a;Prism.hooks.add("wrap",function(t){if((["tag-id"].indexOf(t.type)>-1||"property"==t.type&&0!=t.content.indexOf("-")||"atrule-id"==t.type&&0!=t.content.indexOf("@-")||"pseudo-class"==t.type&&0!=t.content.indexOf(":-")||"pseudo-element"==t.type&&0!=t.content.indexOf("::-")||"attr-name"==t.type&&0!=t.content.indexOf("data-"))&&-1===t.content.indexOf("<")){var n="w/index.php?fulltext&search=";t.tag="a";var r="http://docs.webplatform.org/";"css"==t.language?(r+="wiki/css/","property"==t.type?r+="properties/":"atrule-id"==t.type?r+="atrules/":"pseudo-class"==t.type?r+="selectors/pseudo-classes/":"pseudo-element"==t.type&&(r+="selectors/pseudo-elements/")):"markup"==t.language&&("tag-id"==t.type?(a=e(t.content)||a,r+=a?"wiki/"+a+"/elements/":n):"attr-name"==t.type&&(r+=a?"wiki/"+a+"/attributes/":n)),r+=t.content,t.attributes.href=r,t.attributes.target="_blank"}})}}();;
!function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var r,a=t.getAttribute("data-src"),s=t,n=/\blang(?:uage)?-(?!\*)(\w+)\b/i;s&&!n.test(s.className);)s=s.parentNode;if(s&&(r=(t.className.match(n)||[,""])[1]),!r){var o=(a.match(/\.(\w+)$/)||[,""])[1];r=e[o]||o}var l=document.createElement("code");l.className="language-"+r,t.textContent="",l.textContent="Loading…",t.appendChild(l);var i=new XMLHttpRequest;i.open("GET",a,!0),i.onreadystatechange=function(){4==i.readyState&&(i.status<400&&i.responseText?(l.textContent=i.responseText,Prism.highlightElement(l)):l.textContent=i.status>=400?"✖ Error "+i.status+" while fetching file: "+i.statusText:"✖ Error: File does not exist or is empty")},i.send(null)})},self.Prism.fileHighlight())}();;
!function(){if(self.Prism){var e={csharp:"C#",cpp:"C++"};Prism.hooks.add("before-highlight",function(a){var t=a.element.parentNode;if(t&&/pre/i.test(t.nodeName)){var i=e[a.language]||a.language;t.setAttribute("data-language",i)}})}}();;
!function(){self.Prism&&Prism.hooks.add("wrap",function(s){"keyword"===s.type&&s.classes.push("keyword-"+s.content)})}();;
