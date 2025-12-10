import{t as R,u as W,x as te,h as S,y as E,z as H,A as Ee,B as O,C as F,l as re,D as p,a as D,c as L,v as Ne,n as A,i as Se,E as ie,F as de,G as C,H as Ae}from"./Cf_TVUnr.js";class P{constructor(t){this.path=t}static async load(t){const r=await R("plugin:sql|load",{db:t});return new P(r)}static get(t){return new P(t)}async execute(t,r){const[i,n]=await R("plugin:sql|execute",{db:this.path,query:t,values:r??[]});return{lastInsertId:n,rowsAffected:i}}async select(t,r){return await R("plugin:sql|select",{db:this.path,query:t,values:r??[]})}async close(t){return await R("plugin:sql|close",{db:t})}}const K=(e,t)=>t.some(r=>e instanceof r);let se,le;function Re(){return se||(se=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function De(){return le||(le=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Z=new WeakMap,V=new WeakMap,M=new WeakMap;function Le(e){const t=new Promise((r,i)=>{const n=()=>{e.removeEventListener("success",s),e.removeEventListener("error",l)},s=()=>{r($(e.result)),n()},l=()=>{i(e.error),n()};e.addEventListener("success",s),e.addEventListener("error",l)});return M.set(t,e),t}function Ce(e){if(Z.has(e))return;const t=new Promise((r,i)=>{const n=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",l),e.removeEventListener("abort",l)},s=()=>{r(),n()},l=()=>{i(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",s),e.addEventListener("error",l),e.addEventListener("abort",l)});Z.set(e,t)}let Q={get(e,t,r){if(e instanceof IDBTransaction){if(t==="done")return Z.get(e);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return $(e[t])},set(e,t,r){return e[t]=r,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function ge(e){Q=e(Q)}function Oe(e){return De().includes(e)?function(...t){return e.apply(Y(this),t),$(this.request)}:function(...t){return $(e.apply(Y(this),t))}}function Pe(e){return typeof e=="function"?Oe(e):(e instanceof IDBTransaction&&Ce(e),K(e,Re())?new Proxy(e,Q):e)}function $(e){if(e instanceof IDBRequest)return Le(e);if(V.has(e))return V.get(e);const t=Pe(e);return t!==e&&(V.set(e,t),M.set(t,e)),t}const Y=e=>M.get(e);function Be(e,t,{blocked:r,upgrade:i,blocking:n,terminated:s}={}){const l=indexedDB.open(e,t),o=$(l);return i&&l.addEventListener("upgradeneeded",a=>{i($(l.result),a.oldVersion,a.newVersion,$(l.transaction),a)}),r&&l.addEventListener("blocked",a=>r(a.oldVersion,a.newVersion,a)),o.then(a=>{s&&a.addEventListener("close",()=>s()),n&&a.addEventListener("versionchange",c=>n(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const je=["get","getKey","getAll","getAllKeys","count"],Te=["put","add","delete","clear"],J=new Map;function ae(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(J.get(t))return J.get(t);const r=t.replace(/FromIndex$/,""),i=t!==r,n=Te.includes(r);if(!(r in(i?IDBIndex:IDBObjectStore).prototype)||!(n||je.includes(r)))return;const s=async function(l,...o){const a=this.transaction(l,n?"readwrite":"readonly");let c=a.store;return i&&(c=c.index(o.shift())),(await Promise.all([c[r](...o),n&&a.done]))[0]};return J.set(t,s),s}ge(e=>({...e,get:(t,r,i)=>ae(t,r)||e.get(t,r,i),has:(t,r)=>!!ae(t,r)||e.has(t,r)}));const We=["continue","continuePrimaryKey","advance"],oe={},ee=new WeakMap,me=new WeakMap,Me={get(e,t){if(!We.includes(t))return e[t];let r=oe[t];return r||(r=oe[t]=function(...i){ee.set(this,me.get(this)[t](...i))}),r}};async function*qe(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const r=new Proxy(t,Me);for(me.set(r,t),M.set(r,Y(t));t;)yield r,t=await(ee.get(r)||t.continue()),ee.delete(r)}function ce(e,t){return t===Symbol.asyncIterator&&K(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&K(e,[IDBIndex,IDBObjectStore])}ge(e=>({...e,get(t,r,i){return ce(t,r)?qe:e.get(t,r,i)},has(t,r){return ce(t,r)||e.has(t,r)}}));const U="recipease_";var v=(e=>(e.PREFERENCES=`${U}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${U}shopping_lists`,e.LAST_LIST_ID=`${U}last_list_id`,e))(v||{}),He=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(He||{}),k=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(k||{});const B="### ",j="#### ",I="   - ",pt="- [ ]",Ve=new Set(["or"]),Je=new RegExp(W(String.raw`[0-9a-zA-Z ]+`),"i"),Ue=W(String.raw`
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
	)`),T=["medium carrots","medium carrot","carrots","carrot","cloves garlic","clove garlic","garlic","egg white","egg whites","medium yellow onions","medium yellow onion","yellow onion","yellow onions","red onion","red onions","onion","onions","egg","large eggs","eggs","milk","ripe tomatoes","water","vegetable oil","bone-in skin-on chicken thighs","chicken thighs","chicken","unbaked pie crust","sweetened condensed milk","bell pepper","red bell pepper","green bell pepper","yellow bell pepper","orange bell pepper","jalapeño pepper","avocado","butter","nonstick spray","salsa","pico de gallo","olive oil","basil","salt","pepper"];T.sort(te);const _={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?[\.]?$/i,singular:"lb",plural:"lbs",unit:"imperial",converters:{kg:e=>E(e/2.205,2)}},kg:{regex:/^kg[s]?[\.]?$/i,singular:"kg",unit:"metric",converters:{lb:e=>E(e*2.205,2)}},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?[\.]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787,tsp:e=>e*3}},tsp:{regex:/^tsp[s]?[\.]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929,tbsp:e=>e/3}},oz:{regex:/^oz[s]?[\.]?$/i,singular:"oz",unit:"imperial",converters:{ml:e=>E(e*29.5735,1)}},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>E(e/236.6,1)}},litre:{regex:/^litre[s]?$/i,alias:"liter"},liter:{regex:/^liter[s]?$/i,singular:"liter",plural:"liters",unit:"metric"},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},grams_v2:{regex:/^gram[s]?$/i,alias:"grams"},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^[-]?cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^[-]?quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^[-]?ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"imperial"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",ignore_scale:!0,converters:{inch:e=>e/2.54}},inch:{regex:/^"$/i,singular:" inch",join:!0,unit:"imperial",ignore_scale:!0,converters:{cm:e=>e*2.54}},inch_v2:{regex:/^[-]?inch(?:es)?$/i,alias:"inch"},inch_v3:{regex:/^[-]?in(?:\.)?$/i,alias:"inch"},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},second:{regex:/second[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0},can:{regex:/^can[s]?$/i,singular:"can",plural:"cans",unit:"any"},box:{regex:/^box[s]?$/i,singular:"box",plural:"boxes",unit:"any"},bottle:{regex:/^(bottle[s]?)$/i,singular:"bottle",plural:"bottles",unit:"any"},tub:{regex:/^(tub[s]?)$/i,singular:"tub",plural:"tubs",unit:"any"},rack:{regex:/^(rack[s]?)$/i,singular:"rack",plural:"racks",unit:"any"},slice:{regex:/^(slice[s]?)$/i,singular:"slice",plural:"slices",unit:"any"}};function ze(e,t,r,i){var s;e.alias&&(e=_[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit&&e.unit!=="any")if(e.converters){let l=!1;for(let o of Object.keys(e.converters))if(((s=_[o])==null?void 0:s.unit)===r){l=!0,n=e.converters[o](n),e=_[o];break}if(!l)return null}else return null;return n=E(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function Ge(e,t,r,i){e.alias&&(e=_[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];n=e.converters[s](n),e=_[s]}else return null;return{value:Number(n),def:e}}function Xe(e,t){let r=E(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function ue(e,t,r,i){if(S(e))return H(t,1)&&(r==="original"||r==="any")?e:i?(Number(e)*t).toString():null;for(let l of Object.values(_))if(l.regex.exec(e)!=null&&l.skip)return e;e=e.replace(/ and /," ");let n=e.match(new RegExp(W(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return H(t,1)&&r==="original"?e:null;let s=e;for(let l=0;l<n.length;l++){let o=n[l],a=pe(o);if(S(a))n[l]=a;else if(a)return null;e=e.replace(o,"").trim()}{let l=n.reduce((o,a)=>o+a,0);if(l<0||isNaN(l))return H(t,1)&&r==="original"?s:null;for(let o of Object.values(_))if(o.regex.exec(e)!=null){let a=ze(o,l,r,t);if(a)return a}}return null}function pe(e){if(e=e.trim(),S(e))return Number(e);{let t=e.match(/^([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])/Number(t[2])}{let t=e.match(/^([0-9]+)\s([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])+Number(t[2])/Number(t[3])}return NaN}function Fe(e){for(let i of Object.values(_))if(i.regex.exec(e)!=null&&i.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(W(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let i=0;i<t.length;i++){let n=t[i],s=pe(n);if(S(s))t[i]=s;else if(s)return null;e=e.replace(n,"").trim()}let r=t.reduce((i,n)=>i+n,0);if(r<0||isNaN(r))return null;for(let i of Object.values(_))if(i.regex.exec(e)!=null)return{value:r,def:i};return null}function bt(e){if(T.find(n=>n===e.name)){let n=0;for(let s of e.quantities){if(!S(s.ingredient_quantity))return"ERROR";n+=Number(s.ingredient_quantity)*s.recipe_count}return n}let t=[];for(let n of e.quantities){let s=Fe(n.ingredient_quantity);if(s){let l=Ge(s.def,s.value,"imperial",n.recipe_count);if(l)t.push(l);else return"ERROR"}else return"ERROR"}let r=0,i=null;for(let n of t)if(i&&n.def!==i){let s=Ke(i);if(s&&n.def.converters&&n.def.converters[s])r+=Number(n.def.converters[s](n.value));else return"ERROR"}else i=n.def,r+=n.value;return i&&!isNaN(r)?Xe(r,i):"ERROR"}function Ke(e){for(let t of Object.keys(_))if(_[t]===e)return t;return console.error("Shouldn't get here :/"),null}var g=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Percentage=6]="Percentage",e[e.Amount=7]="Amount",e))(g||{}),Ze=(e=>(e[e.Markdown=0]="Markdown",e[e.PlainText=1]="PlainText",e[e.Naked=2]="Naked",e))(Ze||{});function ht(e){return!!e.quantities}function wt(e){return!!e.recipe_url}function be(e){let t={};for(let n of T)t[n]=g.Ingredient;for(let n of[e.ingredients,e.instructions])Qe(n,t,[{kw_type:g.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:g.Percentage,regex:/(\b[0-9]+\s*\%)/gi},{kw_type:g.Amount,regex:new RegExp(Ue,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let s=e.ingredients[n];if(s.startsWith(I)){s=s.replace(I,"");let l=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^\)^,^\(^\*]+)/i;const o=s.match(l);if(!o)continue;let a=o[o.length-1].replaceAll(/ - .*/g,"").trim();if(!a.match(Je))continue;s=s.replace(a,`**${a}**`),a=a.toLowerCase().trim(),t[a]=g.Ingredient;let c=a.split(" ");for(let d=1;c.length-d>0;d++){let f=Ee(a,c.length-d);if(!Ve.has(f)){t[f]=g.Ingredient;break}}}e.ingredients[n]=s}for(let n=0;n<e.ingredients.length;n++){let s=e.ingredients[n];for(let l of T)s=O(s,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${l}\b`,"gi"),`**${l}**`)}catch(a){console.error(a)}return o});e.ingredients[n]=s}let r=Object.keys(t);r.sort(te);for(let n=0;n<e.instructions.length;n++){let s=e.instructions[n];for(let l of r)s=O(s,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${l}\b`,"gi"),`**${l}**`)}catch(a){console.error(a)}return o});e.instructions[n]=s}let i=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let s=0;s<n.length;s++){let l=n[s];l=l.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let a=o.match(i);if(a){o=o.replaceAll(i,"**$1**");for(let c of a)t[c]=g.Amount}return o}).join(""),n[s]=l}return t}function Qe(e,t,r){for(let i=0;i<e.length;i++)for(let n of r){let s=n.regex,l=n.kw_type;e[i]=O(e[i],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const a=[...new Set(o.match(s)||[])];a.sort(te);for(let c of a){let d=c.trim();!d.length||S(d)||(o=O(o,f=>f.replaceAll(d,`**${d}**`)),d=d.toLowerCase(),t[d]=l)}return o})}}function fe(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let i of e.children)i.nodeName=="DIV"&&(e.removeChild(i),r=!0)}}return he(e).replaceAll(/:$/g,"").replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/\s+/g," ").replaceAll(/\\n+/g," ").replaceAll(/([a-zA-Z])\/([a-zA-Z])/g,"$1 / $2").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function Ye(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),s=k.None,l=null,o={},a=[],c=[],d=[];r=r||tt(n);let f=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],y=Math.max(0,f.map(u=>fe(u)).findLastIndex(u=>u.toLowerCase()==="ingredients"||u.toLowerCase()==="gather your ingredients")),w=new Set;for(let u=y;u<f.length;u++){let x=f[u];if(!x.parentNode||(x.nodeName.startsWith("H")&&x.nodeName==l&&(s=k.None),x.querySelectorAll("li").length>0)||et(w,x))continue;let m=fe(x);if(!m.length)continue;switch(m.toLowerCase()){case"ingredients":s=k.Ingredients,l=x.nodeName;continue;case"instructions":case"directions":s=k.Instructions,l=x.nodeName;continue;case"notes":s=k.Notes,l=x.nodeName;continue}switch(x.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":m=m.replace(/:$/,""),m=`${B}${m}`;break;default:m=`${I}${m}`;break}switch(s){case k.Ingredients:a.push(m);break;case k.Instructions:if(m.startsWith(I)){let q=m.replace(I,"").match(/^([^\.\:]+):(.+)/);q?(c.push(`${j}${q[1]}`),c.push(`${I}${q[2]}`)):c.push(m)}break;case k.Notes:d.push(m);break}}return{title:r,ingredients:a,instructions:c,notes:d,keywords:o,url:e}}function et(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function tt(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function he(e){return[...e.childNodes].map(t=>t.childNodes.length?he(t):t.textContent).join(" ").replaceAll(/  +/g," ").trim().replace(/^Step\s+[0-9]+[\.]?\s*/,"")}function _t(e,t){let r={},i=[];for(let s of e.items){let l=s.recipe;if(!l)continue;let o=structuredClone(l);if(l&&o){let a=be(o);for(let c=0;c<o.ingredients.length;c++){let d=o.ingredients[c];if(d.startsWith("#"))continue;let f=null,y=null,w=!1;e:for(let u of d.split(/(\*\*[^\*]+\*\*)/))if(u.startsWith("**")&&u.endsWith("**")&&(u=u.replace(/^\*\*/,"").replace(/\*\*.*/,"").replace(/\*\*.*/,"").toLowerCase().trim(),u))switch(a[u]){case g.Ingredient:if(f){w=!0;break e}f=u;break;case g.Amount:if(y){w=!0;break e}y=u;break}if(w||!f||!y)i.push({text:d,recipe_url:o.url,line_number:c,recipe_count:s.quantity});else{let u=f;r[u]||(r[u]=[]),r[u].push({recipe_count:s.quantity,ingredient_quantity:y,recipe_url:o.url,original_line:d})}}}else{let a=`Missing recipe: ${s.recipe_url}`;console.error(a)}}let n=[];for(let s of Object.keys(r))n.push({name:s,quantities:r[s]});return n.sort((s,l)=>s.name.localeCompare(l.name)),{ingredients:n,errors:i}}function z(e,t,r){let i="";if(e.length){i+=`

## ${r}
`;for(let n of e)n.startsWith(B)||n.startsWith(j)?n=`

${n}
`:i+=`
${n}`}return i}function yt(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=z(e.ingredients,e.keywords,"Ingredients"),t+=z(e.instructions,e.keywords,"Instructions"),t+=z(e.notes,e.keywords,"Notes"),t.trim()}function rt(e,t,r){if(!r)return[{type:g.Plain,text:F(e)}];let i=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),i.push({text:n,type:t[n.toLowerCase()]||g.Unknown});else{let s=n;for(let l of s.split(/(\*[^\*]+\*)/))l&&(l.startsWith("*")&&l.endsWith("*")?(l=l.replace(/^\*/,"").replace(/\*$/,""),i.push({type:g.Italic,text:l})):i.push({type:g.Plain,text:l}))}return i}function xt(e,t){let r=we(t,e);return r>=0&&r+1<t.length?t[r+1]:null}function kt(e,t){let r=we(t,e);return r>0?t[r-1]:null}function we(e,t){for(let r=0;r<e.length;r++)if(e[r].url===t)return r;return-1}function _e(e){return{...e,items:JSON.parse(e.items),checked_items:e.checked_items?JSON.parse(e.checked_items):{},custom_items:e.custom_items?JSON.parse(e.custom_items):void 0}}function ye(e){return{...e,ingredients:JSON.parse(e.ingredients),instructions:JSON.parse(e.ingredients),notes:JSON.parse(e.ingredients),keywords:JSON.parse(e.ingredients),tags:e.tags?JSON.parse(e.tags):void 0,starred:e.starred?!!JSON.parse(e.starred):!1}}async function nt(){const e=await ft();e&&re.set(e),it(),ct()}nt();async function it(){if(p()){let e=await b();try{let t=(await e.select("SELECT * from recipes")).map(ye);t.reverse(),D.set(t)}catch(t){console.error(t)}}else{let t=await(await h()).getAll("recipes");if(!t.length)try{let r=localStorage.getItem(v.RECIPES);if(r){t=JSON.parse(r);for(let i of t)await ke(i,!0)}}catch(r){console.error(r)}t.reverse(),D.set(t)}}async function xe(e){if(p()){let r=await(await b()).select("SELECT * FROM recipes where url = ?",[e]);if(r.length)return ye(r[0])}else{let t=await h(),r=await t.getKeyFromIndex("recipes","by-url",e);if(r)return await t.get("recipes",r)||null}return null}async function st(e){D.update(t=>(ke(e),t.filter(r=>r.url!==e.url),t.splice(0,0,e),t))}async function ke(e,t=!1){if(t||await Ie(e.url),p())(await b()).execute(`INSERT into recipes
				(title,
				url,
				ingredients,
				instructions,
				notes,
				keywords,
				tags,
				starred)
			values
				(?,?,?,?,?,?,?,?)
			`,[e.title,e.url,e.ingredients,e.instructions,e.notes,e.keywords,e.tags,e.starred]);else{let r=await h();try{r.add("recipes",e)}catch(i){console.error(i)}}}function It(e){D.update(t=>{for(let r=0;r<t.length;r++)if(t[r].url===e.url){t[r]=e,lt(e);break}return t})}async function lt(e){if(console.info("updating recipe"),p())await(await b()).execute(`UPDATE recipes SET
				title = ?,
				url = ?,
				ingredients = ?,
				instructions = ?,
				notes = ?,
				keywords = ?,
				tags = ?,
				starred = ?
			WHERE id = ?
			`,[e.title,e.url,e.ingredients,e.instructions,e.notes,e.keywords,e.tags,e.starred,e.id]);else{let t=await h();try{t.put("recipes",e)}catch(r){console.error(r)}}}function vt(e){D.update(t=>(Ie(e),t.filter(r=>r.url!==e)))}async function Ie(e){if(p())await(await b()).execute("DELETE from recipes where url = ?",[e]);else{let t=await h(),r=await t.getKeyFromIndex("recipes","by-url",e);r&&await t.delete("recipes",r)}}async function $t(e,t="",r=!1){if(!e||!Ne(e))return A(`Invalid url: ${e}`,"error"),null;if(!r){let s=await xe(e);if(s)return s}if(Se(e))return A("Sorry, that URL is blocked","error"),null;let i=null;if(!ie(e))if(p())try{i=await R("get_html",{url:e})}catch(s){console.error(s)}else i=await ot(e);let n=null;if(ie(e))n=await at(e),console.log(n);else{if(!i)return A("Error fetching that url","error"),null;n=Ye(e,i,t)}return n?(st(n),A("Done!","success"),n):(A("Error fetching that recipe","error"),null)}async function at(e){let t=e.split("-"),r=t[t.length-1],i=[`https://recipease.fly.dev/recipe/${encodeURIComponent(r)}`];for(let n of i)try{let s=await fetch(n,{});if(s.status===200){let l=await s.json();return $e(l)}}catch(s){console.error(s)}return null}async function Et(e){let t=[`https://recipease.fly.dev/get-recipes/${encodeURIComponent(e)}`];for(let r of t)try{let i=await fetch(r,{});if(i.status===200)return(await i.json()).map(s=>$e(s))}catch(i){console.error(i)}return[]}async function ot(e){let t=[`https://recipease.fly.dev/get-html/${encodeURIComponent(e)}`];for(let r of t)try{let i=await fetch(r,{});if(i.status===200)return await i.text()}catch(i){console.error(i)}return null}function Nt(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=be(r):r.keywords={},r}function St(e,t,r,i){return e?(de(),{ingredients:N("Ingredients",e.ingredients,e.keywords,t,r,i),instructions:N("Instructions",e.instructions,e.keywords,t,r,i),notes:N("Notes",e.notes,e.keywords,t,r,i)}):{ingredients:[],instructions:[],notes:[]}}function At(e,t,r,i){return e?(de(),[N("Ingredients",e.ingredients,e.keywords,t,r,i),N("Instructions",e.instructions,e.keywords,t,r,i),N("Notes",e.notes,e.keywords,t,r,i)]):[]}function N(e,t,r,i,n,s){let l=[],o={text:e,level:2,rows:[],id:C("section")};if(t.length){l.push(o);for(let a of t){let c=a;if(a.startsWith(I))a=a.substr(I.length);else if(a.startsWith(B)){a=a.substr(B.length),l.push(o={level:3,text:F(a),rows:[],id:C("section")});continue}else if(a.startsWith(j)){a=a.substr(j.length),l.push(o={level:4,text:F(a),rows:[],id:C("section")});continue}o.rows.push({original:c,fragments:rt(a,r,i),id:C("row")})}for(let a of l)for(let c of a.rows)for(let d=0;d<c.fragments.length;d++){let f=c.fragments[d],y=c.fragments[d+2];switch(f.type){case g.Ingredient:f.id=Ae(r,f.text);break;case g.Amount:{let w=f.text,u=ue(w,s,n,(y==null?void 0:y.type)===g.Ingredient);u===null?f.failed=!0:u!==w&&(f.text=u,f.converted=!0)}break;case g.Temperature:{let w=f.text,u=ue(w,s,n,!1);u===null?f.failed=!0:u!==w&&(f.text=u,f.converted=!0)}break}}}return l}async function ct(){if(p()){let e=await b();try{let t=(await e.select("SELECT * from lists")).map(_e);t.reverse(),L.set(t)}catch(t){console.error(t)}}else{let t=await(await h()).getAll("lists");if(!t.length)try{let r=localStorage.getItem(v.SHOPPING_LISTS);if(r){t=JSON.parse(r),t.reverse();for(let i of t)i.checked_items||(i.checked_items={}),await ve(i)}}catch(r){console.error(r)}L.set(t)}}function Rt(e){console.info("updating list",e),ne(e.id),L.update(t=>{for(let r=0;r<t.length;r++)if(t[r].id===e.id){t[r]=e,ut(e);break}return t})}async function ut(e){if(p())await(await b()).execute(`UPDATE lists SET
				name = ?,
				items = ?,
				checked_items = ?,
				custom_items = ?
			WHERE id = ?
			`,[e.name,e.items,e.checked_items,e.custom_items,e.id]);else{let t=await h();try{t.put("lists",e)}catch(r){console.error(r)}}}async function Dt(e){let t=await ve(e);return e.id=t,L.update(r=>(r.splice(0,0,e),r)),t}async function ve(e){if(console.info("adding list",e),p())return(await(await b()).execute(`INSERT into lists
		(name, items, checked_items, custom_items) values (?,?,?,?)`,[e.name,e.items,e.checked_items,e.custom_items])).lastInsertId;{let t=await h();try{delete e.id;let r=Number(await t.add("lists",e));return e.id=r,r}catch(r){console.error(r)}}}async function Lt(e){e&&(p()?await(await b()).execute("DELETE from lists where id = ?",[e]):await(await h()).delete("lists",e.toString()),re.update(t=>{if(t===e){ne(void 0);return}return t}),L.update(t=>t.filter(r=>r.id!==e)))}async function ne(e){if(console.info("setting list id",e),re.set(e),p())await(await b()).execute("INSERT OR REPLACE INTO settings (key, value) values (?, ?)",[v.LAST_LIST_ID,e]);else{let t=await h();e!=null?await t.put("settings",e.toString(),v.LAST_LIST_ID):await t.delete("settings",v.LAST_LIST_ID)}}async function ft(){let e;if(p()){let r=await(await b()).select("SELECT value from settings where key = ?",[v.LAST_LIST_ID]);r.length&&(e=Number(r[0].value))}else{let r=await(await h()).get("settings",v.LAST_LIST_ID);r!=null&&(e=Number(r))}if(e!=null&&await dt(e))return e;await ne(void 0)}async function dt(e,t){console.info("getting shopping list",e);let r;if(p()){let i=await b();try{r=(await i.select("SELECT * from lists where id = ?",[e])).map(_e)[0]}catch(n){console.error(n)}}else r=await(await h()).get("lists",Number(e));if(r){if(t!=null&&t.include_recipes)for(let i of r.items)i.recipe=await xe(i.recipe_url)||void 0;return r}}var G;async function b(){return G||(G=P.load("sqlite:recipleasy.db")),await G}var X;async function h(){return X||(X=Be("recipleasy",6,{upgrade(e,t,r,i,n){console.info("upgrading database"),e.createObjectStore("recipes",{keyPath:"id",autoIncrement:!0}).createIndex("by-url","url",{unique:!0}),e.createObjectStore("lists",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("settings")},blocked(e,t,r){console.error("blocked")},blocking(e,t,r){console.error("blocking")},terminated(){console.error("terminated")}})),await X}function $e(e){let t=e.ingredients;try{t=JSON.parse(t.replaceAll('"',"LMFAO").replaceAll("'",'"').replaceAll("LMFAO","'"))}catch{console.log("Bad ingredients",e.ingredients)}return{id:`custom-recipe-${e.id}`,url:`custom-recipe-${e.id}`,title:e.name,ingredients:t,instructions:e.instructions.split(`
`),notes:[],keywords:{}}}export{pt as C,g as F,v as K,I as L,Ze as O,He as U,Lt as a,dt as b,Rt as c,vt as d,_t as e,xe as f,Et as g,bt as h,At as i,Nt as j,Dt as k,ht as l,wt as m,st as n,yt as o,St as p,kt as q,xt as r,ne as s,$t as t,It as u};
