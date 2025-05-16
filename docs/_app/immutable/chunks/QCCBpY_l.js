import{aJ as L}from"./awlFoezV.js";import{g as U,b as le,r as se}from"./CAe7mk4b.js";function D(e){return e.replaceAll("**","")}function Q(e,t=1){let r=e.split(" ");for(;r.length>t;)r.shift();return r.join(" ")}function P(e){return e.replaceAll(/^\s+(\/\/.*)?/gm,"").replaceAll(`
`,"")}function y(e,t,r=!1){if(typeof e=="string")return e;if(e*=10**t,e=Math.round(e),e/=10**t,r){if(x(e,1/2))return"1/2";if(x(e,1/3))return"1/3";if(x(e,1/4))return"1/4";if(x(e,1/8))return"1/8";if(x(e,2/3))return"2/3";if(x(e,3/4))return"3/4"}return e}function N(e){return!isNaN(Number(e))&&!isNaN(parseFloat(e))}function x(e,t){return Math.abs(e-t)<.01}function A(e,t){return e.split(/(\*\*[^\*]+\*\*)/).map(r=>r.startsWith("**")&&r.endsWith("**")?r:t(r)).join("")}function oe(e,t){t=t.toLowerCase();let r=Q(t);return e[r]?r:t.replaceAll(/\s/g,"_")}function M(e,t){return t.length-e.length}function ue(e){let t=["www.simplyrecipes.com","www.allrecipes.com"];const r=new URL(e);return t.includes(r.hostname)}function H(e){if(!e||!e.length||e.length>500)return!1;try{let t=new URL(e);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function Oe(e){return new URL(document.location).searchParams.get(e)}function We(e,t){const r=new URL(window.location.href);r.searchParams.set(e,t),se(r.toString(),{})}function De(){let e=new URL(document.location),t=e.searchParams.get("link")||e.searchParams.get("description")||e.searchParams.get("url");return t?decodeURIComponent(t):null}async function He(){const e=await navigator.clipboard.read();e:for(const t of e)try{let i=await(await t.getType("text/plain")).text();if(H(i)||(i=decodeURIComponent(i),H(i)))return i;break e}catch(r){console.error(r)}v("Didn't find a recipe url in your clipboard. Sorry bud :/")}async function qe(e,t){await U(z(e,t),{state:{is_going_back:!0}})}async function Ue(e,t){await U(z(e,t),{})}async function Me(e,t){await U(z(e,t==null?void 0:t.query_params),{state:{...t==null?void 0:t.page_data}})}function z(e,t){e.startsWith("/")||(e=`/${e}`);let r=`${le}${e}`;if(t){let i=new URLSearchParams;for(let n of Object.keys(t))i.append(n,t[n]);r+=`?${i.toString()}`}return r}function ze(e,t,r="",i=!1,n=!1){var u,f;if(n&&!e.starred||i&&((u=e.tags)!=null&&u.length)||r&&!((f=e.tags)!=null&&f.some(a=>a==r)))return!1;let l=t.toLowerCase().split(" ").map(a=>a.trim()).filter(a=>a.length),s=e.title.toLowerCase(),o=e.url.toLowerCase();for(let a of l)if(s.indexOf(a)===-1&&o.indexOf(a)===-1)return!1;return!0}let K=0;const R=e=>`${e}_${++K}`,Y=()=>{K=0};function Be(e){return new Promise(t=>setTimeout(t,e))}const O="recipease_";var $=(e=>(e.PREFERENCES=`${O}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${O}shopping_lists`,e.LAST_LIST_ID=`${O}last_list_id`,e))($||{}),ae=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(ae||{}),w=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(w||{});const S="### ",E="#### ",k="   - ",Ge="- [ ]",ce=new Set(["or"]),fe=new RegExp(P(String.raw`[0-9a-zA-Z ]+`),"i"),ge=P(String.raw`
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

		(?:\btbsp[s]?[\.]?\b)?\s*

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
	)`),C=["medium carrots","carrots","cloves garlic","clove garlic","garlic","egg white","egg whites","medium yellow onions","medium yellow onion","yellow onion","yellow onions","red onion","red onions","onion","onions","egg","large eggs","eggs","milk","ripe tomatoes","water","vegetable oil","bone-in skin-on chicken thighs","chicken thighs","chicken","unbaked pie crust","sweetened condensed milk","bell pepper","red bell pepper","green bell pepper","yellow bell pepper","orange bell pepper","jalapeño pepper","avocado","butter","nonstick spray","salsa","pico de gallo","olive oil","basil","salt","pepper"];C.sort(M);const b={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?[\.]?$/i,singular:"lb",plural:"lbs",unit:"imperial",converters:{kg:e=>y(e/2.205,2)}},kg:{regex:/^kg[s]?[\.]?$/i,singular:"kg",unit:"metric",converters:{lb:e=>y(e*2.205,2)}},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?[\.]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787,tsp:e=>e*3}},tsp:{regex:/^tsp[s]?[\.]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929,tbsp:e=>e/3}},oz:{regex:/^oz[s]?[\.]?$/i,singular:"oz",unit:"imperial",converters:{ml:e=>y(e*29.5735,1)}},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>y(e/236.6,1)}},litre:{regex:/^litre[s]?$/i,alias:"liter"},liter:{regex:/^liter[s]?$/i,singular:"liter",plural:"liters",unit:"metric"},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},grams_v2:{regex:/^gram[s]?$/i,alias:"grams"},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^[-]?cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^[-]?quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^[-]?ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"imperial"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",ignore_scale:!0,converters:{inch:e=>e/2.54}},inch:{regex:/^"$/i,singular:" inch",join:!0,unit:"imperial",ignore_scale:!0,converters:{cm:e=>e*2.54}},inch_v2:{regex:/^[-]?inch(?:es)?$/i,alias:"inch"},inch_v3:{regex:/^[-]?in(?:\.)?$/i,alias:"inch"},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},second:{regex:/second[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0},can:{regex:/^can[s]?$/i,singular:"can",plural:"cans",unit:"any"},box:{regex:/^box[s]?$/i,singular:"box",plural:"boxes",unit:"any"},bottle:{regex:/^(bottle[s]?)$/i,singular:"bottle",plural:"bottles",unit:"any"},tub:{regex:/^(tub[s]?)$/i,singular:"tub",plural:"tubs",unit:"any"},rack:{regex:/^(rack[s]?)$/i,singular:"rack",plural:"racks",unit:"any"},slice:{regex:/^(slice[s]?)$/i,singular:"slice",plural:"slices",unit:"any"}};function pe(e,t,r,i){var l;e.alias&&(e=b[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit&&e.unit!=="any")if(e.converters){let s=!1;for(let o of Object.keys(e.converters))if(((l=b[o])==null?void 0:l.unit)===r){s=!0,n=e.converters[o](n),e=b[o];break}if(!s)return null}else return null;return n=y(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function me(e,t,r,i){e.alias&&(e=b[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),r!==e.unit)if(e.converters){let l=Object.keys(e.converters)[0];n=e.converters[l](n),e=b[l]}else return null;return{value:Number(n),def:e}}function he(e,t){let r=y(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function Z(e,t,r,i){if(N(e))return x(t,1)&&(r==="original"||r==="any")?e:i?(Number(e)*t).toString():null;for(let s of Object.values(b))if(s.regex.exec(e)!=null&&s.skip)return e;e=e.replace(/ and /," ");let n=e.match(new RegExp(P(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return x(t,1)&&r==="original"?e:null;let l=e;for(let s=0;s<n.length;s++){let o=n[s],u=F(o);if(N(u))n[s]=u;else if(u)return null;e=e.replace(o,"").trim()}{let s=n.reduce((o,u)=>o+u,0);if(s<0||isNaN(s))return x(t,1)&&r==="original"?l:null;for(let o of Object.values(b))if(o.regex.exec(e)!=null){let u=pe(o,s,r,t);if(u)return u}}return null}function F(e){if(e=e.trim(),N(e))return Number(e);{let t=e.match(/^([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])/Number(t[2])}{let t=e.match(/^([0-9]+)\s([0-9]+)\/([0-9]+)$/);if(t)return Number(t[1])+Number(t[2])/Number(t[3])}return NaN}function be(e){for(let i of Object.values(b))if(i.regex.exec(e)!=null&&i.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(P(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let i=0;i<t.length;i++){let n=t[i],l=F(n);if(N(l))t[i]=l;else if(l)return null;e=e.replace(n,"").trim()}let r=t.reduce((i,n)=>i+n,0);if(r<0||isNaN(r))return null;for(let i of Object.values(b))if(i.regex.exec(e)!=null)return{value:r,def:i};return null}function Je(e){if(C.find(n=>n===e.name)){let n=0;for(let l of e.quantities){if(!N(l.ingredient_quantity))return"ERROR";n+=Number(l.ingredient_quantity)*l.recipe_count}return n}let t=[];for(let n of e.quantities){let l=be(n.ingredient_quantity);if(l){let s=me(l.def,l.value,"imperial",n.recipe_count);if(s)t.push(s);else return"ERROR"}else return"ERROR"}let r=0,i=null;for(let n of t)if(i&&n.def!==i){let l=de(i);if(l&&n.def.converters&&n.def.converters[l])r+=Number(n.def.converters[l](n.value));else return"ERROR"}else i=n.def,r+=n.value;return i&&!isNaN(r)?he(r,i):"ERROR"}function de(e){for(let t of Object.keys(b))if(b[t]===e)return t;return console.error("Shouldn't get here :/"),null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Percentage=6]="Percentage",e[e.Amount=7]="Amount",e))(p||{}),_e=(e=>(e[e.Markdown=0]="Markdown",e[e.PlainText=1]="PlainText",e[e.Naked=2]="Naked",e))(_e||{});function Xe(e){return!!e.quantities}function Te(e){return!!e.recipe_url}function ee(e){let t={};for(let n of C)t[n]=p.Ingredient;for(let n of[e.ingredients,e.instructions])we(n,t,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Percentage,regex:/(\b[0-9]+\s*\%)/gi},{kw_type:p.Amount,regex:new RegExp(ge,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let l=e.ingredients[n];if(l.startsWith(k)){l=l.replace(k,"");let s=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^\)^,^\(^\*]+)/i;const o=l.match(s);if(!o)continue;let u=o[o.length-1].replaceAll(/ - .*/g,"").trim();if(!u.match(fe))continue;l=l.replace(u,`**${u}**`),u=u.toLowerCase(),t[u]=p.Ingredient;let f=u.split(" ");for(let a=1;f.length-a>0;a++){let g=Q(u,f.length-a);ce.has(g)||(t[g]=p.Ingredient)}}e.ingredients[n]=l}for(let n=0;n<e.ingredients.length;n++){let l=e.ingredients[n];for(let s of C)l=A(l,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${s}\b`,"gi"),`**${s}**`)}catch(u){console.error(u)}return o});e.ingredients[n]=l}let r=Object.keys(t);r.sort(M);for(let n=0;n<e.instructions.length;n++){let l=e.instructions[n];for(let s of r)l=A(l,o=>{try{o=o.replaceAll(new RegExp(String.raw`\b${s}\b`,"gi"),`**${s}**`)}catch(u){console.error(u)}return o});e.instructions[n]=l}let i=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let l=0;l<n.length;l++){let s=n[l];s=s.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let u=o.match(i);if(u){o=o.replaceAll(i,"**$1**");for(let f of u)t[f]=p.Amount}return o}).join(""),n[l]=s}return t}function we(e,t,r){for(let i=0;i<e.length;i++)for(let n of r){let l=n.regex,s=n.kw_type;e[i]=A(e[i],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const u=[...new Set(o.match(l)||[])];u.sort(M);for(let f of u){let a=f.trim();!a.length||N(a)||(o=A(o,g=>g.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),t[a]=s)}return o})}}function V(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let i of e.children)i.nodeName=="DIV"&&(e.removeChild(i),r=!0)}}return te(e).replaceAll(/:$/g,"").replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/\s+/g," ").replaceAll(/\\n+/g," ").replaceAll(/([a-zA-Z])\/([a-zA-Z])/g,"$1 / $2").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function xe(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),l=w.None,s=null,o={},u=[],f=[],a=[];r=r||$e(n);let g=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],d=Math.max(0,g.map(c=>V(c)).findLastIndex(c=>c.toLowerCase()==="ingredients"||c.toLowerCase()==="gather your ingredients")),h=new Set;for(let c=d;c<g.length;c++){let _=g[c];if(!_.parentNode||(_.nodeName.startsWith("H")&&_.nodeName==s&&(l=w.None),ke(h,_)))continue;let m=V(_);if(!m.length)continue;switch(m.toLowerCase()){case"ingredients":l=w.Ingredients,s=_.nodeName;continue;case"instructions":case"directions":l=w.Instructions,s=_.nodeName;continue;case"notes":l=w.Notes,s=_.nodeName;continue}switch(_.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":m=m.replace(/:$/,""),m=`${S}${m}`;break;default:m=`${k}${m}`;break}switch(l){case w.Ingredients:u.push(m);break;case w.Instructions:if(m.startsWith(k)){let j=m.replace(k,"").match(/^([^\.\:]+):(.+)/);j?(f.push(`${E}${j[1]}`),f.push(`${k}${j[2]}`)):f.push(m)}break;case w.Notes:a.push(m);break}}return{title:r,ingredients:u,instructions:f,notes:a,keywords:o,url:e}}function ke(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function $e(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function te(e){return[...e.childNodes].map(t=>t.childNodes.length?te(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function Ze(e,t){let r={},i=[];for(let l of e.items){let s=q(l.recipe_url,t),o=structuredClone(q(l.recipe_url,t));if(s&&o){let u=ee(o);for(let f=0;f<o.ingredients.length;f++){let a=o.ingredients[f];if(a.startsWith("#"))continue;let g=null,d=null,h=!1;e:for(let c of a.split(/(\*\*[^\*]+\*\*)/))if(c.startsWith("**")&&c.endsWith("**")&&(c=c.replace(/^\*\*/,"").replace(/\*\*.*/,"").replace(/\*\*.*/,"").toLowerCase().trim(),c))switch(u[c]){case p.Ingredient:if(g){h=!0;break e}g=c;break;case p.Amount:if(d){h=!0;break e}d=c;break}if(h||!g||!d)i.push({text:a,recipe_url:o.url,line_number:f,recipe_count:l.quantity});else{let c=g;r[c]||(r[c]=[]),r[c].push({recipe_count:l.quantity,ingredient_quantity:d,recipe_url:o.url,original_line:a})}}}else{let u=`Missing recipe: ${l.recipe_url}`;console.error(u)}}let n=[];for(let l of Object.keys(r))n.push({name:l,quantities:r[l]});return n.sort((l,s)=>l.name.localeCompare(s.name)),{ingredients:n,errors:i}}function W(e,t,r){let i="";if(e.length){i+=`

## ${r}
`;for(let n of e)n.startsWith(S)||n.startsWith(E)?n=`

${n}
`:i+=`
${n}`}return i}function Ve(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=W(e.ingredients,e.keywords,"Ingredients"),t+=W(e.instructions,e.keywords,"Instructions"),t+=W(e.notes,e.keywords,"Notes"),t.trim()}function ye(e,t,r){if(!r)return[{type:p.Plain,text:D(e)}];let i=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),i.push({text:n,type:t[n.toLowerCase()]||p.Unknown});else{let l=n;for(let s of l.split(/(\*[^\*]+\*)/))s&&(s.startsWith("*")&&s.endsWith("*")?(s=s.replace(/^\*/,"").replace(/\*$/,""),i.push({type:p.Italic,text:s})):i.push({type:p.Plain,text:s}))}return i}function Qe(e,t){let r=re(t,e);return r>=0&&r+1<t.length?t[r+1]:null}function Ke(e,t){let r=re(t,e);return r>0?t[r-1]:null}function re(e,t){for(let r=0;r<e.length;r++)if(e[r].url===t)return r;return-1}function B(){try{let e=localStorage.getItem($.RECIPES);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function G(e){localStorage.setItem($.RECIPES,JSON.stringify(e))}function q(e,t=null){t||(t=B());for(let r of t)if(r.url===e)return r;return null}function Ie(e,t=!0){let r=B();return r=Ne(r,e.url,!1),r.push(e),t&&G(r),r}function Ye(e,t=!0){let r=B();for(let i=0;i<r.length;i++)r[i].url===e.url&&(r[i]=e);return t&&G(r),r}function Ne(e,t,r=!0){return e=e.filter(i=>i.url!==t),r&&G(e),e}async function Fe(e,t="",r=!1){if(!e||!H(e))return v("Invalid url","error"),null;if(!r){let l=q(e);if(l)return l}if(ue(e))return v("Sorry, that URL is blocked","error"),null;let i=await ve(e);if(!i)return v("Error fetching that url","error"),null;let n=xe(e,i,t);return Ie(n),v("Done!","success"),n}async function ve(e){let t=[`http://localhost:8080/get-html/${encodeURIComponent(e)}`,`https://recipease.fly.dev/get-html/${encodeURIComponent(e)}`,`https://corsproxy.io/?url=${encodeURIComponent(e)}`];for(let r of t)try{let i=await fetch(r,{signal:AbortSignal.timeout(3e3)});if(i.status===200)return await i.text()}catch(i){console.log(i)}return null}function et(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=ee(r):r.keywords={},r}function tt(e,t,r,i){return e?(Y(),{ingredients:I("Ingredients",e.ingredients,e.keywords,t,r,i),instructions:I("Instructions",e.instructions,e.keywords,t,r,i),notes:I("Notes",e.notes,e.keywords,t,r,i)}):{ingredients:[],instructions:[],notes:[]}}function rt(e,t,r,i){return e?(Y(),[I("Ingredients",e.ingredients,e.keywords,t,r,i),I("Instructions",e.instructions,e.keywords,t,r,i),I("Notes",e.notes,e.keywords,t,r,i)]):[]}function I(e,t,r,i,n,l){let s=[],o={text:e,level:2,rows:[],id:R("section")};if(t.length){s.push(o);for(let u of t){let f=u;if(u.startsWith(k))u=u.substr(k.length);else if(u.startsWith(S)){u=u.substr(S.length),s.push(o={level:3,text:D(u),rows:[],id:R("section")});continue}else if(u.startsWith(E)){u=u.substr(E.length),s.push(o={level:4,text:D(u),rows:[],id:R("section")});continue}o.rows.push({original:f,fragments:ye(u,r,i),id:R("row")})}for(let u of s)for(let f of u.rows)for(let a=0;a<f.fragments.length;a++){let g=f.fragments[a],d=f.fragments[a+2];switch(g.type){case p.Ingredient:g.id=oe(r,g.text);break;case p.Amount:{let h=g.text,c=Z(h,l,n,(d==null?void 0:d.type)===p.Ingredient);c===null?g.failed=!0:c!==h&&(g.text=c,g.converted=!0)}break;case p.Temperature:{let h=g.text,c=Z(h,l,n,!1);c===null?g.failed=!0:c!==h&&(g.text=c,g.converted=!0)}break}}}return s}function Re(e){let t=J();for(let r of t)if(r.id===e)return r;return null}function J(){try{let e=localStorage.getItem($.SHOPPING_LISTS);if(e){let t=JSON.parse(e);for(let r of t)r.checked_items||(r.checked_items={});return t}}catch(e){console.error(e)}return[]}function nt(e){let t=Ae(e.id);t.push(e),T(e.id),X(t)}function it(e){let t=J(),r=0;for(let n of t)n.id>r&&(r=n.id);let i=r+1;return e.id=i,t.push(e),X(t),i}function X(e){localStorage.setItem($.SHOPPING_LISTS,JSON.stringify(e))}function Ae(e,t,r=!0){return t||(t=J()),ie.update(i=>i===e?(T(null),null):i),t=t.filter(i=>i.id!==e),r&&X(t),t}function T(e){localStorage.setItem($.LAST_LIST_ID,JSON.stringify(e)),ie.set(e)}function Se(){try{let e=localStorage.getItem($.LAST_LIST_ID);if(e){let t=JSON.parse(e);if(Re(t))return t;T(null)}}catch{}return null}let Ee=0;const ne=L([]);function v(e,t=""){ne.update(r=>[...r,{text:e,extra_class:t,id:++Ee}])}function lt(e){ne.update(t=>{let r=[...t];for(let i=0;i<r.length;i++)r[i]&&r[i]===e&&(r.splice(i,1),i-=1);return r})}const ie=L(Se()),Ce=L(null);window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Ce.set(e)});const st=L(null);export{ze as A,Xe as B,Te as C,Ge as D,Be as E,p as F,qe as G,Ce as H,Fe as I,De as J,$ as K,k as L,Ve as M,R as N,_e as O,tt as P,x as Q,Ke as R,Qe as S,X as T,ae as U,lt as V,ne as W,z as a,J as b,Ue as c,Ne as d,Ae as e,He as f,B as g,Me as h,ue as i,st as j,nt as k,ie as l,Oe as m,v as n,N as o,Re as p,Ze as q,q as r,T as s,Je as t,Ye as u,H as v,rt as w,et as x,it as y,We as z};
