import{t as A,u as W,x as te,h as S,y as E,z as H,A as ve,B as P,C as K,l as re,D as b,a as D,e as R,v as $e,n as L,i as Ee,E as fe,F as C,G as Ne}from"./BXxlaY2r.js";class O{constructor(t){this.path=t}static async load(t){const r=await A("plugin:sql|load",{db:t});return new O(r)}static get(t){return new O(t)}async execute(t,r){const[i,n]=await A("plugin:sql|execute",{db:this.path,query:t,values:r??[]});return{lastInsertId:n,rowsAffected:i}}async select(t,r){return await A("plugin:sql|select",{db:this.path,query:t,values:r??[]})}async close(t){return await A("plugin:sql|close",{db:t})}}const F=(e,t)=>t.some(r=>e instanceof r);let ie,se;function Se(){return ie||(ie=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ae(){return se||(se=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Z=new WeakMap,V=new WeakMap,M=new WeakMap;function De(e){const t=new Promise((r,i)=>{const n=()=>{e.removeEventListener("success",s),e.removeEventListener("error",l)},s=()=>{r($(e.result)),n()},l=()=>{i(e.error),n()};e.addEventListener("success",s),e.addEventListener("error",l)});return M.set(t,e),t}function Re(e){if(Z.has(e))return;const t=new Promise((r,i)=>{const n=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",l),e.removeEventListener("abort",l)},s=()=>{r(),n()},l=()=>{i(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",s),e.addEventListener("error",l),e.addEventListener("abort",l)});Z.set(e,t)}let Q={get(e,t,r){if(e instanceof IDBTransaction){if(t==="done")return Z.get(e);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return $(e[t])},set(e,t,r){return e[t]=r,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function de(e){Q=e(Q)}function Le(e){return Ae().includes(e)?function(...t){return e.apply(Y(this),t),$(this.request)}:function(...t){return $(e.apply(Y(this),t))}}function Ce(e){return typeof e=="function"?Le(e):(e instanceof IDBTransaction&&Re(e),F(e,Se())?new Proxy(e,Q):e)}function $(e){if(e instanceof IDBRequest)return De(e);if(V.has(e))return V.get(e);const t=Ce(e);return t!==e&&(V.set(e,t),M.set(t,e)),t}const Y=e=>M.get(e);function Pe(e,t,{blocked:r,upgrade:i,blocking:n,terminated:s}={}){const l=indexedDB.open(e,t),o=$(l);return i&&l.addEventListener("upgradeneeded",a=>{i($(l.result),a.oldVersion,a.newVersion,$(l.transaction),a)}),r&&l.addEventListener("blocked",a=>r(a.oldVersion,a.newVersion,a)),o.then(a=>{s&&a.addEventListener("close",()=>s()),n&&a.addEventListener("versionchange",u=>n(u.oldVersion,u.newVersion,u))}).catch(()=>{}),o}const Oe=["get","getKey","getAll","getAllKeys","count"],Be=["put","add","delete","clear"],J=new Map;function le(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(J.get(t))return J.get(t);const r=t.replace(/FromIndex$/,""),i=t!==r,n=Be.includes(r);if(!(r in(i?IDBIndex:IDBObjectStore).prototype)||!(n||Oe.includes(r)))return;const s=async function(l,...o){const a=this.transaction(l,n?"readwrite":"readonly");let u=a.store;return i&&(u=u.index(o.shift())),(await Promise.all([u[r](...o),n&&a.done]))[0]};return J.set(t,s),s}de(e=>({...e,get:(t,r,i)=>le(t,r)||e.get(t,r,i),has:(t,r)=>!!le(t,r)||e.has(t,r)}));const je=["continue","continuePrimaryKey","advance"],ae={},ee=new WeakMap,ge=new WeakMap,Te={get(e,t){if(!je.includes(t))return e[t];let r=ae[t];return r||(r=ae[t]=function(...i){ee.set(this,ge.get(this)[t](...i))}),r}};async function*We(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const r=new Proxy(t,Te);for(ge.set(r,t),M.set(r,Y(t));t;)yield r,t=await(ee.get(r)||t.continue()),ee.delete(r)}function oe(e,t){return t===Symbol.asyncIterator&&F(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&F(e,[IDBIndex,IDBObjectStore])}de(e=>({...e,get(t,r,i){return oe(t,r)?We:e.get(t,r,i)},has(t,r){return oe(t,r)||e.has(t,r)}}));const z="recipease_";var v=(e=>(e.PREFERENCES=`${z}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${z}shopping_lists`,e.LAST_LIST_ID=`${z}last_list_id`,e))(v||{}),Me=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(Me||{}),k=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(k||{});const B="### ",j="#### ",I="   - ",dt="- [ ]",qe=new Set(["or"]),He=new RegExp(W(String.raw`[0-9a-zA-Z ]+`),"i"),Ve=W(String.raw`
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
	)`),T=["medium carrots","medium carrot","carrots","carrot","cloves garlic","clove garlic","garlic","egg white","egg whites","medium yellow onions","medium yellow onion","yellow onion","yellow onions","red onion","red onions","onion","onions","egg","large eggs","eggs","milk","ripe tomatoes","water","vegetable oil","bone-in skin-on chicken thighs","chicken thighs","chicken","unbaked pie crust","sweetened condensed milk","bell pepper","red bell pepper","green bell pepper","yellow bell pepper","orange bell pepper","jalapeño pepper","avocado","butter","nonstick spray","salsa","pico de gallo","olive oil","basil","salt","pepper"];T.sort(te);const _={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?[\.]?$/i,singular:"lb",plural:"lbs",unit:"imperial",converters:{kg:e=>E(e/2.205,2)}},kg:{regex:/^kg[s]?[\.]?$/i,singular:"kg",unit:"metric",converters:{lb:e=>E(e*2.205,2)}},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?[\.]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787,tsp:e=>e*3}},tsp:{regex:/^tsp[s]?[\.]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929,tbsp:e=>e/3}},oz:{regex:/^oz[s]?[\.]?$/i,singular:"oz",unit:"imperial",converters:{ml:e=>E(e*29.5735,1)}},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>E(e/236.6,1)}},litre:{regex:/^litre[s]?$/i,alias:"liter"},liter:{regex:/^liter[s]?$/i,singular:"liter",plural:"liters",unit:"metric"},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},grams_v2:{regex:/^gram[s]?$/i,alias:"grams"},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^[-]?cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^[-]?quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^[-]?ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"imperial"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",ignore_scale:!0,converters:{inch:e=>e/2.54}},inch:{regex:/^"$/i,singular:" inch",join:!0,unit:"imperial",ignore_scale:!0,converters:{cm:e=>e*2.54}},inch_v2:{regex:/^[-]?inch(?:es)?$/i,alias:"inch"},inch_v3:{regex:/^[-]?in(?:\.)?$/i,alias:"inch"},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},second:{regex:/second[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0},can:{regex:/^can[s]?$/i,singular:"can",plural:"cans",unit:"any"},box:{regex:/^box[s]?$/i,singular:"box",plural:"boxes",unit:"any"},bottle:{regex:/^(bottle[s]?)$/i,singular:"bottle",plural:"bottles",unit:"any"},tub:{regex:/^(tub[s]?)$/i,singular:"tub",plural:"tubs",unit:"any"},rack:{regex:/^(rack[s]?)$/i,singular:"rack",plural:"racks",unit:"any"},slice:{regex:/^(slice[s]?)$/i,singular:"slice",plural:"slices",unit:"any"}};function Je(e,t,r,i){var s;e.alias&&(e=_[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit&&e.unit!=="any")if(e.converters){let l=!1;for(let o of Object.keys(e.converters))if(((s=_[o])==null?void 0:s.unit)===r){l=!0,n=e.converters[o](n),e=_[o];break}if(!l)return null}else return null;return n=E(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function ze(e,t,r,i){e.alias&&(e=_[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];n=e.converters[s](n),e=_[s]}else return null;return{value:Number(n),def:e}}function Ue(e,t){let r=E(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function ue(e,t,r,i){if(S(e))return H(t,1)&&(r==="original"||r==="any")?e:i?(Number(e)*t).toString():null;for(let l of Object.values(_))if(l.regex.exec(e)!=null&&l.skip)return e;e=e.replace(/ and /," ");let n=e.match(new RegExp(W(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return H(t,1)&&r==="original"?e:null;let s=e;for(let l=0;l<n.length;l++){let o=n[l],a=me(o);if(S(a))n[l]=a;else if(a)return null;e=e.replace(o,"").trim()}{let l=n.reduce((o,a)=>o+a,0);if(l<0||isNaN(l))return H(t,1)&&r==="original"?s:null;for(let o of Object.values(_))if(o.regex.exec(e)!=null){let a=Je(o,l,r,t);if(a)return a}}return null}function me(e){if(e=e.trim(),S(e))return Number(e);{let t=e.match(/^([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])/Number(t[2])}{let t=e.match(/^([0-9]+)\s([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])+Number(t[2])/Number(t[3])}return NaN}function Ge(e){for(let i of Object.values(_))if(i.regex.exec(e)!=null&&i.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(W(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let i=0;i<t.length;i++){let n=t[i],s=me(n);if(S(s))t[i]=s;else if(s)return null;e=e.replace(n,"").trim()}let r=t.reduce((i,n)=>i+n,0);if(r<0||isNaN(r))return null;for(let i of Object.values(_))if(i.regex.exec(e)!=null)return{value:r,def:i};return null}function gt(e){if(T.find(n=>n===e.name)){let n=0;for(let s of e.quantities){if(!S(s.ingredient_quantity))return"ERROR";n+=Number(s.ingredient_quantity)*s.recipe_count}return n}let t=[];for(let n of e.quantities){let s=Ge(n.ingredient_quantity);if(s){let l=ze(s.def,s.value,"imperial",n.recipe_count);if(l)t.push(l);else return"ERROR"}else return"ERROR"}let r=0,i=null;for(let n of t)if(i&&n.def!==i){let s=Xe(i);if(s&&n.def.converters&&n.def.converters[s])r+=Number(n.def.converters[s](n.value));else return"ERROR"}else i=n.def,r+=n.value;return i&&!isNaN(r)?Ue(r,i):"ERROR"}function Xe(e){for(let t of Object.keys(_))if(_[t]===e)return t;return console.error("Shouldn't get here :/"),null}var g=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Percentage=6]="Percentage",e[e.Amount=7]="Amount",e))(g||{}),Ke=(e=>(e[e.Markdown=0]="Markdown",e[e.PlainText=1]="PlainText",e[e.Naked=2]="Naked",e))(Ke||{});function mt(e){return!!e.quantities}function bt(e){return!!e.recipe_url}function be(e){let t={};for(let n of T)t[n]=g.Ingredient;for(let n of[e.ingredients,e.instructions])Fe(n,t,[{kw_type:g.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:g.Percentage,regex:/(\b[0-9]+\s*\%)/gi},{kw_type:g.Amount,regex:new RegExp(Ve,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let s=e.ingredients[n];if(s.startsWith(I)){s=s.replace(I,"");let l=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^\)^,^\(^\*]+)/i;const o=s.match(l);if(!o)continue;let a=o[o.length-1].replaceAll(/ - .*/g,"").trim();if(!a.match(He))continue;s=s.replace(a,`**${a}**`),a=a.toLowerCase().trim(),t[a]=g.Ingredient;let u=a.split(" ");for(let d=1;u.length-d>0;d++){let f=ve(a,u.length-d);if(!qe.has(f)){t[f]=g.Ingredient;break}}}e.ingredients[n]=s}for(let n=0;n<e.ingredients.length;n++){let s=e.ingredients[n];for(let l of T)s=P(s,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${l}\b`,"gi"),`**${l}**`)}catch(a){console.error(a)}return o});e.ingredients[n]=s}let r=Object.keys(t);r.sort(te);for(let n=0;n<e.instructions.length;n++){let s=e.instructions[n];for(let l of r)s=P(s,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${l}\b`,"gi"),`**${l}**`)}catch(a){console.error(a)}return o});e.instructions[n]=s}let i=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let s=0;s<n.length;s++){let l=n[s];l=l.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let a=o.match(i);if(a){o=o.replaceAll(i,"**$1**");for(let u of a)t[u]=g.Amount}return o}).join(""),n[s]=l}return t}function Fe(e,t,r){for(let i=0;i<e.length;i++)for(let n of r){let s=n.regex,l=n.kw_type;e[i]=P(e[i],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const a=[...new Set(o.match(s)||[])];a.sort(te);for(let u of a){let d=u.trim();!d.length||S(d)||(o=P(o,f=>f.replaceAll(d,`**${d}**`)),d=d.toLowerCase(),t[d]=l)}return o})}}function ce(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let i of e.children)i.nodeName=="DIV"&&(e.removeChild(i),r=!0)}}return pe(e).replaceAll(/:$/g,"").replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/\s+/g," ").replaceAll(/\\n+/g," ").replaceAll(/([a-zA-Z])\/([a-zA-Z])/g,"$1 / $2").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function Ze(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),s=k.None,l=null,o={},a=[],u=[],d=[];r=r||Ye(n);let f=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],x=Math.max(0,f.map(c=>ce(c)).findLastIndex(c=>c.toLowerCase()==="ingredients"||c.toLowerCase()==="gather your ingredients")),w=new Set;for(let c=x;c<f.length;c++){let y=f[c];if(!y.parentNode||(y.nodeName.startsWith("H")&&y.nodeName==l&&(s=k.None),y.querySelectorAll("li").length>0)||Qe(w,y))continue;let m=ce(y);if(!m.length)continue;switch(m.toLowerCase()){case"ingredients":s=k.Ingredients,l=y.nodeName;continue;case"instructions":case"directions":s=k.Instructions,l=y.nodeName;continue;case"notes":s=k.Notes,l=y.nodeName;continue}switch(y.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":m=m.replace(/:$/,""),m=`${B}${m}`;break;default:m=`${I}${m}`;break}switch(s){case k.Ingredients:a.push(m);break;case k.Instructions:if(m.startsWith(I)){let q=m.replace(I,"").match(/^([^\.\:]+):(.+)/);q?(u.push(`${j}${q[1]}`),u.push(`${I}${q[2]}`)):u.push(m)}break;case k.Notes:d.push(m);break}}return{title:r,ingredients:a,instructions:u,notes:d,keywords:o,url:e}}function Qe(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function Ye(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function pe(e){return[...e.childNodes].map(t=>t.childNodes.length?pe(t):t.textContent).join(" ").replaceAll(/  +/g," ").trim().replace(/^Step\s+[0-9]+[\.]?\s*/,"")}function pt(e,t){let r={},i=[];for(let s of e.items){let l=s.recipe;if(!l)continue;let o=structuredClone(l);if(l&&o){let a=be(o);for(let u=0;u<o.ingredients.length;u++){let d=o.ingredients[u];if(d.startsWith("#"))continue;let f=null,x=null,w=!1;e:for(let c of d.split(/(\*\*[^\*]+\*\*)/))if(c.startsWith("**")&&c.endsWith("**")&&(c=c.replace(/^\*\*/,"").replace(/\*\*.*/,"").replace(/\*\*.*/,"").toLowerCase().trim(),c))switch(a[c]){case g.Ingredient:if(f){w=!0;break e}f=c;break;case g.Amount:if(x){w=!0;break e}x=c;break}if(w||!f||!x)i.push({text:d,recipe_url:o.url,line_number:u,recipe_count:s.quantity});else{let c=f;r[c]||(r[c]=[]),r[c].push({recipe_count:s.quantity,ingredient_quantity:x,recipe_url:o.url,original_line:d})}}}else{let a=`Missing recipe: ${s.recipe_url}`;console.error(a)}}let n=[];for(let s of Object.keys(r))n.push({name:s,quantities:r[s]});return n.sort((s,l)=>s.name.localeCompare(l.name)),{ingredients:n,errors:i}}function U(e,t,r){let i="";if(e.length){i+=`

## ${r}
`;for(let n of e)n.startsWith(B)||n.startsWith(j)?n=`

${n}
`:i+=`
${n}`}return i}function ht(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=U(e.ingredients,e.keywords,"Ingredients"),t+=U(e.instructions,e.keywords,"Instructions"),t+=U(e.notes,e.keywords,"Notes"),t.trim()}function et(e,t,r){if(!r)return[{type:g.Plain,text:K(e)}];let i=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),i.push({text:n,type:t[n.toLowerCase()]||g.Unknown});else{let s=n;for(let l of s.split(/(\*[^\*]+\*)/))l&&(l.startsWith("*")&&l.endsWith("*")?(l=l.replace(/^\*/,"").replace(/\*$/,""),i.push({type:g.Italic,text:l})):i.push({type:g.Plain,text:l}))}return i}function wt(e,t){let r=he(t,e);return r>=0&&r+1<t.length?t[r+1]:null}function _t(e,t){let r=he(t,e);return r>0?t[r-1]:null}function he(e,t){for(let r=0;r<e.length;r++)if(e[r].url===t)return r;return-1}function we(e){return{...e,items:JSON.parse(e.items),checked_items:e.checked_items?JSON.parse(e.checked_items):{},custom_items:e.custom_items?JSON.parse(e.custom_items):void 0}}function _e(e){return{...e,ingredients:JSON.parse(e.ingredients),instructions:JSON.parse(e.ingredients),notes:JSON.parse(e.ingredients),keywords:JSON.parse(e.ingredients),tags:e.tags?JSON.parse(e.tags):void 0,starred:e.starred?!!JSON.parse(e.starred):!1}}async function tt(){const e=await ot();e&&re.set(e),rt(),lt()}tt();async function rt(){if(b()){let e=await p();try{let t=(await e.select("SELECT * from recipes")).map(_e);D.set(t)}catch(t){console.error(t)}}else{let t=await(await h()).getAll("recipes");if(!t.length)try{let r=localStorage.getItem(v.RECIPES);if(r){t=JSON.parse(r);for(let i of t)await ye(i,!0)}}catch(r){console.error(r)}D.set(t)}}async function xe(e){if(b()){let r=await(await p()).select("SELECT * FROM recipes where url = ?",[e]);if(r.length)return _e(r[0])}else{let t=await h(),r=await t.getKeyFromIndex("recipes","by-url",e);if(r)return await t.get("recipes",r)||null}return null}async function nt(e){D.update(t=>(ye(e),t.filter(r=>r.url!==e.url),t.push(e),t))}async function ye(e,t=!1){if(t||await ke(e.url),b())(await p()).execute(`INSERT into recipes
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
			`,[e.title,e.url,e.ingredients,e.instructions,e.notes,e.keywords,e.tags,e.starred]);else{let r=await h();try{r.add("recipes",e)}catch(i){console.error(i)}}}function xt(e){D.update(t=>{for(let r=0;r<t.length;r++)if(t[r].url===e.url){t[r]=e,it(e);break}return t})}async function it(e){if(console.info("updating recipe"),b())await(await p()).execute(`UPDATE recipes SET
				title = ?,
				url = ?,
				ingredients = ?,
				instructions = ?,
				notes = ?,
				keywords = ?,
				tags = ?,
				starred = ?
			WHERE id = ?
			`,[e.title,e.url,e.ingredients,e.instructions,e.notes,e.keywords,e.tags,e.starred,e.id]);else{let t=await h();try{t.put("recipes",e)}catch(r){console.error(r)}}}function yt(e){D.update(t=>(ke(e),t.filter(r=>r.url!==e)))}async function ke(e){if(b())await(await p()).execute("DELETE from recipes where url = ?",[e]);else{let t=await h(),r=await t.getKeyFromIndex("recipes","by-url",e);r&&await t.delete("recipes",r)}}async function kt(e,t="",r=!1){if(!e||!$e(e))return L("Invalid url","error"),null;if(!r){let s=await xe(e);if(s)return s}if(Ee(e))return L("Sorry, that URL is blocked","error"),null;let i=null;if(b())try{i=await A("get_html",{url:e})}catch(s){console.error(s)}else i=await st(e);if(!i)return L("Error fetching that url","error"),null;let n=Ze(e,i,t);return nt(n),L("Done!","success"),n}async function st(e){let t=[`https://recipease.fly.dev/get-html/${encodeURIComponent(e)}`];for(let r of t)try{let i=await fetch(r,{});if(i.status===200)return await i.text()}catch(i){console.error(i)}return null}function It(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=be(r):r.keywords={},r}function vt(e,t,r,i){return e?(fe(),{ingredients:N("Ingredients",e.ingredients,e.keywords,t,r,i),instructions:N("Instructions",e.instructions,e.keywords,t,r,i),notes:N("Notes",e.notes,e.keywords,t,r,i)}):{ingredients:[],instructions:[],notes:[]}}function $t(e,t,r,i){return e?(fe(),[N("Ingredients",e.ingredients,e.keywords,t,r,i),N("Instructions",e.instructions,e.keywords,t,r,i),N("Notes",e.notes,e.keywords,t,r,i)]):[]}function N(e,t,r,i,n,s){let l=[],o={text:e,level:2,rows:[],id:C("section")};if(t.length){l.push(o);for(let a of t){let u=a;if(a.startsWith(I))a=a.substr(I.length);else if(a.startsWith(B)){a=a.substr(B.length),l.push(o={level:3,text:K(a),rows:[],id:C("section")});continue}else if(a.startsWith(j)){a=a.substr(j.length),l.push(o={level:4,text:K(a),rows:[],id:C("section")});continue}o.rows.push({original:u,fragments:et(a,r,i),id:C("row")})}for(let a of l)for(let u of a.rows)for(let d=0;d<u.fragments.length;d++){let f=u.fragments[d],x=u.fragments[d+2];switch(f.type){case g.Ingredient:f.id=Ne(r,f.text);break;case g.Amount:{let w=f.text,c=ue(w,s,n,(x==null?void 0:x.type)===g.Ingredient);c===null?f.failed=!0:c!==w&&(f.text=c,f.converted=!0)}break;case g.Temperature:{let w=f.text,c=ue(w,s,n,!1);c===null?f.failed=!0:c!==w&&(f.text=c,f.converted=!0)}break}}}return l}async function lt(){if(b()){let e=await p();try{let t=(await e.select("SELECT * from lists")).map(we);R.set(t)}catch(t){console.error(t)}}else{let t=await(await h()).getAll("lists");if(!t.length)try{let r=localStorage.getItem(v.SHOPPING_LISTS);if(r){t=JSON.parse(r);for(let i of t)i.checked_items||(i.checked_items={}),await Ie(i)}}catch(r){console.error(r)}R.set(t)}}function Et(e){console.info("updating list",e),ne(e.id),R.update(t=>{for(let r=0;r<t.length;r++)if(t[r].id===e.id){t[r]=e,at(e);break}return t})}async function at(e){if(b())await(await p()).execute(`UPDATE lists SET
				name = ?,
				items = ?,
				checked_items = ?,
				custom_items = ?
			WHERE id = ?
			`,[e.name,e.items,e.checked_items,e.custom_items,e.id]);else{let t=await h();try{t.put("lists",e)}catch(r){console.error(r)}}}async function Nt(e){let t=await Ie(e);return e.id=t,R.update(r=>(r.push(e),r)),t}async function Ie(e){if(console.info("adding list",e),b())return(await(await p()).execute(`INSERT into lists
		(name, items, checked_items, custom_items) values (?,?,?,?)`,[e.name,e.items,e.checked_items,e.custom_items])).lastInsertId;{let t=await h();try{delete e.id;let r=Number(await t.add("lists",e));return e.id=r,r}catch(r){console.error(r)}}}async function St(e){e&&(b()?await(await p()).execute("DELETE from lists where id = ?",[e]):await(await h()).delete("lists",e.toString()),re.update(t=>{if(t===e){ne(void 0);return}return t}),R.update(t=>t.filter(r=>r.id!==e)))}async function ne(e){if(console.info("setting list id",e),re.set(e),b())await(await p()).execute("INSERT OR REPLACE INTO settings (key, value) values (?, ?)",[v.LAST_LIST_ID,e]);else{let t=await h();e!=null?await t.put("settings",e.toString(),v.LAST_LIST_ID):await t.delete("settings",v.LAST_LIST_ID)}}async function ot(){let e;if(b()){let r=await(await p()).select("SELECT value from settings where key = ?",[v.LAST_LIST_ID]);r.length&&(e=Number(r[0].value))}else{let r=await(await h()).get("settings",v.LAST_LIST_ID);r!=null&&(e=Number(r))}if(e!=null&&await ut(e))return e;await ne(void 0)}async function ut(e,t){console.info("getting shopping list",e);let r;if(b()){let i=await p();try{r=(await i.select("SELECT * from lists where id = ?",[e])).map(we)[0]}catch(n){console.error(n)}}else r=await(await h()).get("lists",Number(e));if(r){if(t!=null&&t.include_recipes)for(let i of r.items)i.recipe=await xe(i.recipe_url)||void 0;return r}}var G;async function p(){return G||(G=O.load("sqlite:recipleasy.db")),await G}var X;async function h(){return X||(X=Pe("recipleasy",6,{upgrade(e,t,r,i,n){console.info("upgrading database"),e.createObjectStore("recipes",{keyPath:"id",autoIncrement:!0}).createIndex("by-url","url",{unique:!0}),e.createObjectStore("lists",{keyPath:"id",autoIncrement:!0}),e.createObjectStore("settings")},blocked(e,t,r){console.error("blocked")},blocking(e,t,r){console.error("blocking")},terminated(){console.error("terminated")}})),await X}export{dt as C,g as F,v as K,I as L,Ke as O,Me as U,St as a,Et as b,pt as c,yt as d,gt as e,xe as f,ut as g,$t as h,It as i,Nt as j,mt as k,bt as l,nt as m,ht as n,vt as o,_t as p,wt as q,ne as s,kt as t,xt as u};
