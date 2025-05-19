import{aS as P}from"./CaVnAIw_.js";import{g as H,b as oe,r as ue}from"./B5Z8z8F4.js";async function z(e,t={},r){return window.__TAURI_INTERNALS__.invoke(e,t,r)}async function ae(e,t){await z("plugin:clipboard-manager|write_text",{label:t==null?void 0:t.label,text:e})}async function ce(){return await z("plugin:clipboard-manager|read_text")}function U(e){return e.replaceAll("**","")}function Y(e,t=1){let r=e.split(" ");for(;r.length>t;)r.shift();return r.join(" ").trim()}function fe(e){return e.replace(/s$/,"")}function j(e){return e.replaceAll(/^\s+(\/\/.*)?/gm,"").replaceAll(`
`,"")}function $(e,t,r=!1){if(typeof e=="string")return e;if(e*=10**t,e=Math.round(e),e/=10**t,r){if(x(e,1/2))return"1/2";if(x(e,1/3))return"1/3";if(x(e,1/4))return"1/4";if(x(e,1/8))return"1/8";if(x(e,2/3))return"2/3";if(x(e,3/4))return"3/4"}return e}function v(e){return!isNaN(Number(e))&&!isNaN(parseFloat(e))}function x(e,t){return Math.abs(e-t)<.01}function A(e,t){return e.split(/(\*\*[^\*]+\*\*)/).map(r=>r.startsWith("**")&&r.endsWith("**")?r:t(r)).join("")}function ge(e,t){t=t.toLowerCase().trim();let r=fe(Y(t));return e[r]?r:t.replaceAll(/\s/g,"_")}function B(e,t){return t.length-e.length}function pe(e){let t=["www.simplyrecipes.com","www.allrecipes.com"];const r=new URL(e);return t.includes(r.hostname)}function S(e){if(!e||!e.length||e.length>500)return!1;try{let t=new URL(e);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function He(e){return new URL(document.location).searchParams.get(e)}function ze(e,t){const r=new URL(window.location.href);r.searchParams.set(e,t),ue(r.toString(),{})}function Be(){let e=new URL(document.location),t=e.searchParams.get("link")||e.searchParams.get("description")||e.searchParams.get("url");return t?decodeURIComponent(t):null}async function Me(){if(T())try{let e=await ce();if(S(e))return e}catch(e){console.error(e)}else{const e=await navigator.clipboard.read();e:for(const t of e)try{let i=await(await t.getType("text/plain")).text();if(S(i)||(i=decodeURIComponent(i),S(i)))return i;break e}catch(r){console.error(r)}}N("Didn't find a recipe url in your clipboard. Sorry bud :/")}async function Te(e,t){await H(M(e,t),{state:{is_going_back:!0}})}async function Ge(e,t){await H(M(e,t),{})}async function Xe(e,t){await H(M(e,t==null?void 0:t.query_params),{state:{...t==null?void 0:t.page_data}})}function M(e,t){e.startsWith("/")||(e=`/${e}`);let r=`${oe}${e}`;if(t){let i=new URLSearchParams;for(let n of Object.keys(t))i.append(n,t[n]);r+=`?${i.toString()}`}return r}function Je(e,t,r="",i=!1,n=!1){var u,f;if(n&&!e.starred||i&&((u=e.tags)!=null&&u.length)||r&&!((f=e.tags)!=null&&f.some(a=>a==r)))return!1;let l=t.toLowerCase().split(" ").map(a=>a.trim()).filter(a=>a.length),s=e.title.toLowerCase(),o=e.url.toLowerCase();for(let a of l)if(s.indexOf(a)===-1&&o.indexOf(a)===-1)return!1;return!0}let F=0;const R=e=>`${e}_${++F}`,ee=()=>{F=0};function Ze(e){return new Promise(t=>setTimeout(t,e))}async function Ve(e){T()?await ae(e):await navigator.clipboard.writeText(e)}function T(){return!!window.__TAURI__}const W="recipease_";var y=(e=>(e.PREFERENCES=`${W}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${W}shopping_lists`,e.LAST_LIST_ID=`${W}last_list_id`,e))(y||{}),me=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(me||{}),w=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(w||{});const E="### ",C="#### ",k="   - ",Qe="- [ ]",de=new Set(["or"]),he=new RegExp(j(String.raw`[0-9a-zA-Z ]+`),"i"),_e=j(String.raw`
	(?:
		// Number and space prefix
		(?:[0-9]+ )?

		// Decimal prefix
		(?:\.)?

		// Some number
		[0-9]+

		// Decimal infix
		(?:\.[0-9]+)*

		// number / [other number]
		(?:/[0-9]+)?

		// number-[other number]
		(?:\s*[\/-]\s*[0-9]+)*

		// number and [other number]
		(?: and [0-9]+)?

		// number to [other number]
		(?:\s*\bto [0-9]+)?

		// number x [other number]
		(?:\s*x\s*[0-9]+)?

		(?:\/[0-9]+)*

		// Decimal suffix
		(?:\.[0-9]+)*

		\s*

		(?:-)?

		(?:\bteaspoon[s]?\b)?

		(?:\bquart[s]?\b)?

		(?:\bstick[s]?\b)?

		(?:\blb[s]?\b[\.]?)?\s*

		(?:\btsp[s]?\b[\.]?)?\s*

		(?:\btbsp[s]?[\.]?)?\s*

		(?:\bpint[s]?\b)?

		(?:\btablespoon[s]?\b)?

		(?:lb[s]?\b)?
		(?:kg[s]?\b)?

		// Random "units"
		(?:can[s]?\b)?
		(?:box[es]?\b)?
		(?:rack[s]?\b)?
		(?:tub[s]?\b)?
		(?:slice[s]?\b)?
		(?:bottle[s]?\b)?

		(?:\b[-]?ounce[s]?\b)?

		(?:oz[s]?[\.]?\s)?

		(?:ml[s]?\b)?

		(?:g[s]?\b)?
		(?:gram[s]?\b)?

		(?:cm[s]?\b)?

		(?:cup[s]?\b)?

		(?:day[s]?\b)?

		(?:minute[s]?\b)?

		(?:"\b)?

		(?:\-?liter(?:s)?\b)?
		(?:\-?litre(?:s)?\b)?

		(?:\-?inch(?:es)?\b)?
		(?:\-?in\b[\.]?)?

		(?:hour[s]?\b)*

		(?:second[s]?\b)*

		(?:\")*

		(?:\/)*
	)`),L=["medium carrots","medium carrot","carrots","carrot","cloves garlic","clove garlic","garlic","egg white","egg whites","medium yellow onions","medium yellow onion","yellow onion","yellow onions","red onion","red onions","onion","onions","egg","large eggs","eggs","milk","ripe tomatoes","water","vegetable oil","bone-in skin-on chicken thighs","chicken thighs","chicken","unbaked pie crust","sweetened condensed milk","bell pepper","red bell pepper","green bell pepper","yellow bell pepper","orange bell pepper","jalapeño pepper","avocado","butter","nonstick spray","salsa","pico de gallo","olive oil","basil","salt","pepper"];L.sort(B);const h={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?[\.]?$/i,singular:"lb",plural:"lbs",unit:"imperial",converters:{kg:e=>$(e/2.205,2)}},kg:{regex:/^kg[s]?[\.]?$/i,singular:"kg",unit:"metric",converters:{lb:e=>$(e*2.205,2)}},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?[\.]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787,tsp:e=>e*3}},tsp:{regex:/^tsp[s]?[\.]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929,tbsp:e=>e/3}},oz:{regex:/^oz[s]?[\.]?$/i,singular:"oz",unit:"imperial",converters:{ml:e=>$(e*29.5735,1)}},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>$(e/236.6,1)}},litre:{regex:/^litre[s]?$/i,alias:"liter"},liter:{regex:/^liter[s]?$/i,singular:"liter",plural:"liters",unit:"metric"},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},grams_v2:{regex:/^gram[s]?$/i,alias:"grams"},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^[-]?cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^[-]?quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^[-]?ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"imperial"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",ignore_scale:!0,converters:{inch:e=>e/2.54}},inch:{regex:/^"$/i,singular:" inch",join:!0,unit:"imperial",ignore_scale:!0,converters:{cm:e=>e*2.54}},inch_v2:{regex:/^[-]?inch(?:es)?$/i,alias:"inch"},inch_v3:{regex:/^[-]?in(?:\.)?$/i,alias:"inch"},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},second:{regex:/second[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0},can:{regex:/^can[s]?$/i,singular:"can",plural:"cans",unit:"any"},box:{regex:/^box[s]?$/i,singular:"box",plural:"boxes",unit:"any"},bottle:{regex:/^(bottle[s]?)$/i,singular:"bottle",plural:"bottles",unit:"any"},tub:{regex:/^(tub[s]?)$/i,singular:"tub",plural:"tubs",unit:"any"},rack:{regex:/^(rack[s]?)$/i,singular:"rack",plural:"racks",unit:"any"},slice:{regex:/^(slice[s]?)$/i,singular:"slice",plural:"slices",unit:"any"}};function be(e,t,r,i){var l;e.alias&&(e=h[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit&&e.unit!=="any")if(e.converters){let s=!1;for(let o of Object.keys(e.converters))if(((l=h[o])==null?void 0:l.unit)===r){s=!0,n=e.converters[o](n),e=h[o];break}if(!s)return null}else return null;return n=$(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function we(e,t,r,i){e.alias&&(e=h[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),r!==e.unit)if(e.converters){let l=Object.keys(e.converters)[0];n=e.converters[l](n),e=h[l]}else return null;return{value:Number(n),def:e}}function xe(e,t){let r=$(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function Q(e,t,r,i){if(v(e))return x(t,1)&&(r==="original"||r==="any")?e:i?(Number(e)*t).toString():null;for(let s of Object.values(h))if(s.regex.exec(e)!=null&&s.skip)return e;e=e.replace(/ and /," ");let n=e.match(new RegExp(j(String.raw`
					// Number and space prefix
					(?:[0-9]+ )?

					// Decimal prefix
					(?:\.[0-9]+)*

					// Some number
					[0-9]+

					// number-[other number]
					(?:\s*[\/-]\s*[0-9]+)*

					// number and [other number]
					(?: and [0-9]+)?

					// number to [other number]
					(?: to [0-9]+)?

					// number to [other number]
					(?:\s*x\s*[0-9]+)?
	
					(?:\/[0-9]+)*

					// Decimal suffix
					(?:\.[0-9]+)*`),"gi"));if(n==null)return x(t,1)&&r==="original"?e:null;let l=e;for(let s=0;s<n.length;s++){let o=n[s],u=te(o);if(v(u))n[s]=u;else if(u)return null;e=e.replace(o,"").trim()}{let s=n.reduce((o,u)=>o+u,0);if(s<0||isNaN(s))return x(t,1)&&r==="original"?l:null;for(let o of Object.values(h))if(o.regex.exec(e)!=null){let u=be(o,s,r,t);if(u)return u}}return null}function te(e){if(e=e.trim(),v(e))return Number(e);{let t=e.match(/^([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])/Number(t[2])}{let t=e.match(/^([0-9]+)\s([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])+Number(t[2])/Number(t[3])}return NaN}function ke(e){for(let i of Object.values(h))if(i.regex.exec(e)!=null&&i.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(j(String.raw`
					// Number and space prefix
					(?:[0-9]+ )?

					// Decimal prefix
					(?:\.[0-9]+)*

					// Some number
					[0-9]+

					// number-[other number]
					(?:\s*[\/-]\s*[0-9]+)*

					// number and [other number]
					(?: and [0-9]+)?

					(?:\/[0-9]+)*

					// Decimal suffix
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let i=0;i<t.length;i++){let n=t[i],l=te(n);if(v(l))t[i]=l;else if(l)return null;e=e.replace(n,"").trim()}let r=t.reduce((i,n)=>i+n,0);if(r<0||isNaN(r))return null;for(let i of Object.values(h))if(i.regex.exec(e)!=null)return{value:r,def:i};return null}function Ke(e){if(L.find(n=>n===e.name)){let n=0;for(let l of e.quantities){if(!v(l.ingredient_quantity))return"ERROR";n+=Number(l.ingredient_quantity)*l.recipe_count}return n}let t=[];for(let n of e.quantities){let l=ke(n.ingredient_quantity);if(l){let s=we(l.def,l.value,"imperial",n.recipe_count);if(s)t.push(s);else return"ERROR"}else return"ERROR"}let r=0,i=null;for(let n of t)if(i&&n.def!==i){let l=ye(i);if(l&&n.def.converters&&n.def.converters[l])r+=Number(n.def.converters[l](n.value));else return"ERROR"}else i=n.def,r+=n.value;return i&&!isNaN(r)?xe(r,i):"ERROR"}function ye(e){for(let t of Object.keys(h))if(h[t]===e)return t;return console.error("Shouldn't get here :/"),null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Percentage=6]="Percentage",e[e.Amount=7]="Amount",e))(p||{}),$e=(e=>(e[e.Markdown=0]="Markdown",e[e.PlainText=1]="PlainText",e[e.Naked=2]="Naked",e))($e||{});function Ye(e){return!!e.quantities}function Fe(e){return!!e.recipe_url}function re(e){let t={};for(let n of L)t[n]=p.Ingredient;for(let n of[e.ingredients,e.instructions])Ie(n,t,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Percentage,regex:/(\b[0-9]+\s*\%)/gi},{kw_type:p.Amount,regex:new RegExp(_e,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let l=e.ingredients[n];if(l.startsWith(k)){l=l.replace(k,"");let s=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^\)^,^\(^\*]+)/i;const o=l.match(s);if(!o)continue;let u=o[o.length-1].replaceAll(/ - .*/g,"").trim();if(!u.match(he))continue;l=l.replace(u,`**${u}**`),u=u.toLowerCase().trim(),t[u]=p.Ingredient;let f=u.split(" ");for(let a=1;f.length-a>0;a++){let g=Y(u,f.length-a);if(!de.has(g)){t[g]=p.Ingredient;break}}}e.ingredients[n]=l}for(let n=0;n<e.ingredients.length;n++){let l=e.ingredients[n];for(let s of L)l=A(l,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${s}\b`,"gi"),`**${s}**`)}catch(u){console.error(u)}return o});e.ingredients[n]=l}let r=Object.keys(t);r.sort(B);for(let n=0;n<e.instructions.length;n++){let l=e.instructions[n];for(let s of r)l=A(l,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${s}\b`,"gi"),`**${s}**`)}catch(u){console.error(u)}return o});e.instructions[n]=l}let i=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let l=0;l<n.length;l++){let s=n[l];s=s.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let u=o.match(i);if(u){o=o.replaceAll(i,"**$1**");for(let f of u)t[f]=p.Amount}return o}).join(""),n[l]=s}return t}function Ie(e,t,r){for(let i=0;i<e.length;i++)for(let n of r){let l=n.regex,s=n.kw_type;e[i]=A(e[i],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const u=[...new Set(o.match(l)||[])];u.sort(B);for(let f of u){let a=f.trim();!a.length||v(a)||(o=A(o,g=>g.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),t[a]=s)}return o})}}function K(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let i of e.children)i.nodeName=="DIV"&&(e.removeChild(i),r=!0)}}return ne(e).replaceAll(/:$/g,"").replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/\s+/g," ").replaceAll(/\\n+/g," ").replaceAll(/([a-zA-Z])\/([a-zA-Z])/g,"$1 / $2").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function ve(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),l=w.None,s=null,o={},u=[],f=[],a=[];r=r||Re(n);let g=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],_=Math.max(0,g.map(c=>K(c)).findLastIndex(c=>c.toLowerCase()==="ingredients"||c.toLowerCase()==="gather your ingredients")),d=new Set;for(let c=_;c<g.length;c++){let b=g[c];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==s&&(l=w.None),b.querySelectorAll("li").length>0)||Ne(d,b))continue;let m=K(b);if(!m.length)continue;switch(m.toLowerCase()){case"ingredients":l=w.Ingredients,s=b.nodeName;continue;case"instructions":case"directions":l=w.Instructions,s=b.nodeName;continue;case"notes":l=w.Notes,s=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":m=m.replace(/:$/,""),m=`${E}${m}`;break;default:m=`${k}${m}`;break}switch(l){case w.Ingredients:u.push(m);break;case w.Instructions:if(m.startsWith(k)){let O=m.replace(k,"").match(/^([^\.\:]+):(.+)/);O?(f.push(`${C}${O[1]}`),f.push(`${k}${O[2]}`)):f.push(m)}break;case w.Notes:a.push(m);break}}return{title:r,ingredients:u,instructions:f,notes:a,keywords:o,url:e}}function Ne(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function Re(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function ne(e){return[...e.childNodes].map(t=>t.childNodes.length?ne(t):t.textContent).join(" ").replaceAll(/  +/g," ").trim().replace(/^Step\s+[0-9]+[\.]?\s*/,"")}function et(e,t){let r={},i=[];for(let l of e.items){let s=q(l.recipe_url,t),o=structuredClone(q(l.recipe_url,t));if(s&&o){let u=re(o);for(let f=0;f<o.ingredients.length;f++){let a=o.ingredients[f];if(a.startsWith("#"))continue;let g=null,_=null,d=!1;e:for(let c of a.split(/(\*\*[^\*]+\*\*)/))if(c.startsWith("**")&&c.endsWith("**")&&(c=c.replace(/^\*\*/,"").replace(/\*\*.*/,"").replace(/\*\*.*/,"").toLowerCase().trim(),c))switch(u[c]){case p.Ingredient:if(g){d=!0;break e}g=c;break;case p.Amount:if(_){d=!0;break e}_=c;break}if(d||!g||!_)i.push({text:a,recipe_url:o.url,line_number:f,recipe_count:l.quantity});else{let c=g;r[c]||(r[c]=[]),r[c].push({recipe_count:l.quantity,ingredient_quantity:_,recipe_url:o.url,original_line:a})}}}else{let u=`Missing recipe: ${l.recipe_url}`;console.error(u)}}let n=[];for(let l of Object.keys(r))n.push({name:l,quantities:r[l]});return n.sort((l,s)=>l.name.localeCompare(s.name)),{ingredients:n,errors:i}}function D(e,t,r){let i="";if(e.length){i+=`

## ${r}
`;for(let n of e)n.startsWith(E)||n.startsWith(C)?n=`

${n}
`:i+=`
${n}`}return i}function tt(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=D(e.ingredients,e.keywords,"Ingredients"),t+=D(e.instructions,e.keywords,"Instructions"),t+=D(e.notes,e.keywords,"Notes"),t.trim()}function Se(e,t,r){if(!r)return[{type:p.Plain,text:U(e)}];let i=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),i.push({text:n,type:t[n.toLowerCase()]||p.Unknown});else{let l=n;for(let s of l.split(/(\*[^\*]+\*)/))s&&(s.startsWith("*")&&s.endsWith("*")?(s=s.replace(/^\*/,"").replace(/\*$/,""),i.push({type:p.Italic,text:s})):i.push({type:p.Plain,text:s}))}return i}function rt(e,t){let r=ie(t,e);return r>=0&&r+1<t.length?t[r+1]:null}function nt(e,t){let r=ie(t,e);return r>0?t[r-1]:null}function ie(e,t){for(let r=0;r<e.length;r++)if(e[r].url===t)return r;return-1}function G(){try{let e=localStorage.getItem(y.RECIPES);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function X(e){localStorage.setItem(y.RECIPES,JSON.stringify(e))}function q(e,t=null){t||(t=G());for(let r of t)if(r.url===e)return r;return null}function Ae(e,t=!0){let r=G();return r=Ee(r,e.url,!1),r.push(e),t&&X(r),r}function it(e,t=!0){let r=G();for(let i=0;i<r.length;i++)r[i].url===e.url&&(r[i]=e);return t&&X(r),r}function Ee(e,t,r=!0){return e=e.filter(i=>i.url!==t),r&&X(e),e}async function lt(e,t="",r=!1){if(!e||!S(e))return N("Invalid url","error"),null;if(!r){let l=q(e);if(l)return l}if(pe(e))return N("Sorry, that URL is blocked","error"),null;let i=null;if(T())try{i=await z("get_html",{url:e})}catch(l){console.error(l)}else i=await Ce(e);if(!i)return N("Error fetching that url","error"),null;let n=ve(e,i,t);return Ae(n),N("Done!","success"),n}async function Ce(e){let t=[`http://localhost:8080/get-html/${encodeURIComponent(e)}`,`https://recipease.fly.dev/get-html/${encodeURIComponent(e)}`,`https://corsproxy.io/?url=${encodeURIComponent(e)}`];for(let r of t)try{let i=await fetch(r,{});if(i.status===200)return await i.text()}catch(i){console.log(i)}return null}function st(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=re(r):r.keywords={},r}function ot(e,t,r,i){return e?(ee(),{ingredients:I("Ingredients",e.ingredients,e.keywords,t,r,i),instructions:I("Instructions",e.instructions,e.keywords,t,r,i),notes:I("Notes",e.notes,e.keywords,t,r,i)}):{ingredients:[],instructions:[],notes:[]}}function ut(e,t,r,i){return e?(ee(),[I("Ingredients",e.ingredients,e.keywords,t,r,i),I("Instructions",e.instructions,e.keywords,t,r,i),I("Notes",e.notes,e.keywords,t,r,i)]):[]}function I(e,t,r,i,n,l){let s=[],o={text:e,level:2,rows:[],id:R("section")};if(t.length){s.push(o);for(let u of t){let f=u;if(u.startsWith(k))u=u.substr(k.length);else if(u.startsWith(E)){u=u.substr(E.length),s.push(o={level:3,text:U(u),rows:[],id:R("section")});continue}else if(u.startsWith(C)){u=u.substr(C.length),s.push(o={level:4,text:U(u),rows:[],id:R("section")});continue}o.rows.push({original:f,fragments:Se(u,r,i),id:R("row")})}for(let u of s)for(let f of u.rows)for(let a=0;a<f.fragments.length;a++){let g=f.fragments[a],_=f.fragments[a+2];switch(g.type){case p.Ingredient:g.id=ge(r,g.text);break;case p.Amount:{let d=g.text,c=Q(d,l,n,(_==null?void 0:_.type)===p.Ingredient);c===null?g.failed=!0:c!==d&&(g.text=c,g.converted=!0)}break;case p.Temperature:{let d=g.text,c=Q(d,l,n,!1);c===null?g.failed=!0:c!==d&&(g.text=c,g.converted=!0)}break}}}return s}function Le(e){let t=J();for(let r of t)if(r.id===e)return r;return null}function J(){try{let e=localStorage.getItem(y.SHOPPING_LISTS);if(e){let t=JSON.parse(e);for(let r of t)r.checked_items||(r.checked_items={});return t}}catch(e){console.error(e)}return[]}function at(e){let t=Pe(e.id);t.push(e),V(e.id),Z(t)}function ct(e){let t=J(),r=0;for(let n of t)n.id>r&&(r=n.id);let i=r+1;return e.id=i,t.push(e),Z(t),i}function Z(e){localStorage.setItem(y.SHOPPING_LISTS,JSON.stringify(e))}function Pe(e,t,r=!0){return t||(t=J()),se.update(i=>i===e?(V(null),null):i),t=t.filter(i=>i.id!==e),r&&Z(t),t}function V(e){localStorage.setItem(y.LAST_LIST_ID,JSON.stringify(e)),se.set(e)}function je(){try{let e=localStorage.getItem(y.LAST_LIST_ID);if(e){let t=JSON.parse(e);if(Le(t))return t;V(null)}}catch{}return null}let Oe=0;const le=P([]);function N(e,t=""){le.update(r=>[...r,{text:e,extra_class:t,id:++Oe}])}function ft(e){le.update(t=>{let r=[...t];for(let i=0;i<r.length;i++)r[i]&&r[i]===e&&(r.splice(i,1),i-=1);return r})}const se=P(je()),We=P(null);window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),We.set(e)});const gt=P(null);export{Je as A,Ve as B,Ye as C,Fe as D,Qe as E,p as F,Ze as G,Te as H,We as I,lt as J,y as K,k as L,Be as M,tt as N,$e as O,R as P,ot as Q,x as R,nt as S,rt as T,me as U,Z as V,ft as W,le as X,M as a,J as b,Ge as c,Ee as d,Pe as e,Me as f,G as g,Xe as h,pe as i,gt as j,at as k,se as l,He as m,N as n,v as o,Le as p,et as q,q as r,V as s,Ke as t,it as u,S as v,ut as w,st as x,ct as y,ze as z};
