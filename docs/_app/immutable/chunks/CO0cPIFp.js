import{d as re,J as ne,j as ie,H as se,aw as le,h as C,k as oe,aJ as ae,a6 as ue,aK as ce,aL as fe,aM as pe}from"./CH411up-.js";import{b as ge}from"./DyvKGGjr.js";import{w as O}from"./DVf9oKNj.js";import{g as W,b as _e,r as he}from"./D-P90Wxg.js";function Te(e,t,...r){var i=e,n=se,s;re(()=>{n!==(n=t())&&(s&&(le(s),s=null),s=ie(()=>n(i,...r)))},ne),C&&(i=oe)}const me=Symbol("is custom element"),de=Symbol("is html");function Je(e){if(C){var t=!1,r=()=>{if(!t){if(t=!0,e.hasAttribute("value")){var i=e.value;z(e,"value",null),e.value=i}if(e.hasAttribute("checked")){var n=e.checked;z(e,"checked",null),e.checked=n}}};e.__on_r=r,fe(r),ge()}}function ze(e,t){var r=X(e);r.checked!==(r.checked=t??void 0)&&(e.checked=t)}function z(e,t,r,i){var n=X(e);C&&(n[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||n[t]!==(n[t]=r)&&(t==="loading"&&(e[pe]=r),r==null?e.removeAttribute(t):typeof r!="string"&&be(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function X(e){return e.__attributes??(e.__attributes={[me]:e.nodeName.includes("-"),[de]:e.namespaceURI===ae})}var B=new Map;function be(e){var t=B.get(e.nodeName);if(t)return t;B.set(e.nodeName,t=[]);for(var r,i=e,n=Element.prototype;n!==i;){r=ce(i);for(var s in r)r[s].set&&t.push(s);i=ue(i)}return t}function R(e){return e.replaceAll("**","")}function V(e,t=1){let r=e.split(" ");for(;r.length>t;)r.shift();return r.join(" ")}function D(e){return e.replaceAll(/^\s+(\/\/.*)?/gm,"").replaceAll(`
`,"")}function H(e,t,r=!1){if(typeof e=="string")return e;if(e*=10**t,e=Math.round(e),e/=10**t,r){if(b(e,1/2))return"1/2";if(b(e,1/3))return"1/3";if(b(e,1/4))return"1/4";if(b(e,1/8))return"1/8";if(b(e,2/3))return"2/3";if(b(e,3/4))return"3/4"}return e}function M(e){return!isNaN(Number(e))&&!isNaN(parseFloat(e))}function b(e,t){return Math.abs(e-t)<.01}function P(e,t){return e.split(/(\*\*[^\*]+\*\*)/).map(r=>r.startsWith("**")&&r.endsWith("**")?r:t(r)).join("")}function we(e,t){t=t.toLowerCase();let r=V(t);return e[r]?r:t.replaceAll(/\s/g,"_")}let $e=0;const ke=e=>`${e}_${++$e}`;function Z(e,t){return t.length-e.length}function K(e){if(!e||!e.length||e.length>500)return!1;try{let t=new URL(e);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function Be(e){return new URL(document.location).searchParams.get(e)}function Ge(e,t){const r=new URL(window.location.href);r.searchParams.set(e,t),he(r.toString(),{})}function Xe(){let e=new URL(document.location),t=e.searchParams.get("link")||e.searchParams.get("description")||e.searchParams.get("url");return t?decodeURI(t):null}async function Ve(){const e=await navigator.clipboard.read();e:for(const t of e)for(const r of t.types){const n=await(await t.getType(r)).text();if(K(n))return y("Loading..."),n;break e}y("Didn't find a recipe url in your clipboard. Sorry bud :/")}async function Ze(e,t){await W(U(e,t),{state:{is_going_back:!0}})}async function Ke(e,t){await W(U(e,t),{})}async function Qe(e,t){await W(U(e,t==null?void 0:t.query_params),{state:{...t==null?void 0:t.page_data}})}function U(e,t){e.startsWith("/")||(e=`/${e}`);let r=`${_e}${e}`;if(t){let i=new URLSearchParams;for(let n of Object.keys(t))i.append(n,t[n]);r+=`?${i.toString()}`}return r}const S="recipease_";var k=(e=>(e.PREFERENCES=`${S}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${S}shopping_lists`,e.LAST_LIST_ID=`${S}last_list_id`,e))(k||{}),ye=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(ye||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const N="### ",I="#### ",w="   - ",xe=D(String.raw`
	(?:
		// Number and space prefix
		(?:[0-9]+ )?

		// Decimal prefix
		(?:\.)?

		// Some number
		[0-9]+

		// Decimal infix
		(?:\.[0-9]+)*

		// number-[other number]
		(?:\s*[\/-]\s*[0-9]+)*

		// number and [other number]
		(?: and [0-9]+)?

		(?:\/[0-9]+)*

		// Decimal suffix
		(?:\.[0-9]+)*

		\s*

		(?:-)?

		(?:\bteaspoon[s]?\b)?

		(?:\bquart[s]?\b)?

		(?:\bstick[s]?\b)?

		(?:\blb[s]?\b)?\s*

		(?:\btsp[s]?\b)?\s*

		(?:\btbsp[s]?\b)?\s*

		(?:\bpint[s]?\b)?

		(?:\btablespoon[s]?\b)?

		(?:lb[s]?\b)?

		(?:\bounce[s]?\b)?

		(?:oz[s]?\b)?

		(?:ml[s]?\b)?

		(?:g[s]?\b)?

		(?:cm[s]?\b)?

		(?:cup[s]?\b)?

		(?:day[s]?\b)?

		(?:minute[s]?\b)?

		(?:"\b)?

		(?:\-?inch(?:es)?\b)?

		(?:hour[s]?\b)*

		(?:\")*
	)`),$={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:"imperial"},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:"metric"},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>H(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"metric"},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:"imperial",converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function Ne(e,t,r,i){e.alias&&(e=$[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];n=e.converters[s](n),e=$[s]}else return null;return n=H(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function Fe(e,t,r,i){e.alias&&(e=$[e.alias]);let n=t*i;if(e.ignore_scale&&(n=t),!(r==="any"||r==="original")&&r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];n=e.converters[s](n),e=$[s]}else return null;return{value:Number(n),def:e}}function Ye(e,t){let r=H(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function Ie(e,t,r){if(M(e))return b(t,1)&&r==="original"?e:null;for(let l of Object.values($))if(l.regex.exec(e)!=null&&l.skip)return e;e=e.replace(/ and /," ");let i=e.match(new RegExp(D(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(i==null)return b(t,1)&&r==="original"?e:null;let n=e;for(let l=0;l<i.length;l++){let o=i[l];i[l]=Q(o),e=e.replace(o,"").trim()}let s=i.reduce((l,o)=>l+o,0);if(s<0||isNaN(s))return b(t,1)&&r==="original"?n:null;for(let l of Object.values($))if(l.regex.exec(e)!=null){let o=Ne(l,s,r,t);if(o)return o}return null}function Q(e){if(e=e.trim(),M(e))return Number(e);let t=e.match(/^([0-9]+)\/([0-9]+)$/);return t?Number(t[1])/Number(t[2]):(t=e.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),t?Number(t[1])+Number(t[2])/Number(t[3]):NaN)}function et(e){for(let i of Object.values($))if(i.regex.exec(e)!=null&&i.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(D(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let i=0;i<t.length;i++){let n=t[i];t[i]=Q(n),e=e.replace(n,"").trim()}let r=t.reduce((i,n)=>i+n,0);if(r<0||isNaN(r))return null;for(let i of Object.values($))if(i.regex.exec(e)!=null)return{value:r,def:i};return null}var g=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(g||{});function F(e){let t={};for(let n of[e.ingredients,e.instructions])ve(n,t,[{kw_type:g.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:g.Amount,regex:new RegExp(xe,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let s=e.ingredients[n];if(s.startsWith(w)){s=s.replace(w,"");{let l=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const o=s.match(l);if(o){let a=o[o.length-1].trim();s=s.replace(a,`**${a}**`),a=a.toLowerCase(),t[a]=g.Ingredient;let f=a.split(" ");for(let u=1;f.length-u>0;u++){let p=V(a,f.length-u);t[p]=g.Ingredient}}}}e.ingredients[n]=s}let r=Object.keys(t);r.sort(Z);for(let n=0;n<e.instructions.length;n++){let s=e.instructions[n];for(let l of r)s=P(s,o=>(o=o.replaceAll(new RegExp(String.raw`\b${l}\b`,"gi"),`**${l}**`),o));e.instructions[n]=s}let i=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let s=0;s<n.length;s++){let l=n[s];l=l.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let a=o.match(i);if(a){o=o.replaceAll(i,"**$1**");for(let f of a)t[f]=g.Amount}return o}).join(""),n[s]=l}return t}function ve(e,t,r){for(let i=0;i<e.length;i++)for(let n of r){let s=n.regex,l=n.kw_type;e[i]=P(e[i],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const a=[...new Set(o.match(s)||[])];a.sort(Z);for(let f of a){let u=f.trim();!u.length||M(u)||(o=P(o,p=>p.replaceAll(u,`**${u}**`)),u=u.toLowerCase(),t[u]=l)}return o})}}function G(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let i of e.children)i.nodeName=="DIV"&&(e.removeChild(i),r=!0)}}return ee(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function Ae(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),s=d.None,l=null,o={},a=[],f=[],u=[];r=r||Ee(n);let p=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],h=Math.max(0,p.filter(c=>Y(c)>2).map(c=>G(c)).findLastIndex(c=>c.toLowerCase()==="ingredients"||c.toLowerCase()==="gather your ingredients")),x=new Set;for(let c=h;c<p.length;c++){let m=p[c];if(!m.parentNode||(m.nodeName.startsWith("H")&&m.nodeName==l&&(s=d.None),Se(x,m)))continue;let _=G(m);if(!_.length)continue;switch(_.toLowerCase()){case"ingredients":s=d.Ingredients,l=m.nodeName;continue;case"instructions":s=d.Instructions,l=m.nodeName;continue;case"notes":s=d.Notes,l=m.nodeName;continue}switch(m.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":_=_.replace(/:$/,""),_=`${N}${_}`;break;default:_=`${w}${_}`;break}switch(s){case d.Ingredients:a.push(_);break;case d.Instructions:if(_.startsWith(w)){let A=_.replace(w,"").match(/^([^\.\:]+):(.+)/);A?(f.push(`${I}${A[1]}`),f.push(`${w}${A[2]}`)):f.push(_)}break;case d.Notes:u.push(_);break}}return{title:r,ingredients:a,instructions:f,notes:u,keywords:o,url:e}}function Y(e,t=0){const r=t+1;let i=r;for(let n of e.children)i=Math.max(i,Y(n,r));return i}function Se(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function Ee(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function ee(e){return[...e.childNodes].map(t=>t.childNodes.length?ee(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function tt(e,t){let r={},i=[];for(let s of e.items){let l=j(s.recipe_url,t),o=structuredClone(j(s.recipe_url,t));if(l&&o){let a=F(o);for(let f=0;f<o.ingredients.length;f++){let u=o.ingredients[f];if(u.startsWith("#"))continue;let p=null,h=null,x=!1;e:for(let c of u.split(/(\*\*[^\*]+\*\*)/))if(c.startsWith("**")&&c.endsWith("**")&&(c=c.replace(/^\*\*/,"").replace(/\*\*.*/,"").trim(),c))switch(a[c]){case g.Ingredient:if(p){x=!0;break e}p=c;break;case g.Amount:if(h){x=!0;break e}h=c;break}if(x||!p||!h)i.push({text:u,line_number:f,recipe_url:o.url});else{let c=p;r[c]||(r[c]=[]),r[c].push({recipe_count:s.quantity,ingredient_quantity:h,original_line:l.ingredients[f].replace(/^\s*-/,"")})}}}else{let a=`Missing recipe: ${s.recipe_url}`;console.error(a),y(a,"red")}}let n=[];for(let s of Object.keys(r))n.push({name:s,quantities:r[s]});return n.sort((s,l)=>s.name.localeCompare(l.name)),{ingredients:n,errors:i}}function E(e,t,r){let i="";if(e.length){i+=`

## ${r}
`;for(let n of e)n.startsWith(N)||n.startsWith(I)?n=`

${n}
`:i+=`
${n}`}return i}function rt(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=E(e.ingredients,e.keywords,"Ingredients"),t+=E(e.instructions,e.keywords,"Instructions"),t+=E(e.notes,e.keywords,"Notes"),t.trim()}function Le(e,t,r){if(!r)return[{type:g.Plain,text:R(e)}];let i=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),i.push({text:n,type:t[n.toLowerCase()]||g.Unknown});else{let s=n;for(let l of s.split(/(\*[^\*]+\*)/))l&&(l.startsWith("*")&&l.endsWith("*")?(l=l.replace(/^\*/,"").replace(/\*$/,""),i.push({type:g.Italic,text:l})):i.push({type:g.Plain,text:l}))}return i}function q(){try{let e=localStorage.getItem(k.RECIPES);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function T(e){localStorage.setItem(k.RECIPES,JSON.stringify(e))}function j(e,t=null){t||(t=q());for(let r of t)if(r.url===e)return r;return null}function Re(e,t=!0){let r=q();return r=Pe(r,e.url,!1),r.push(e),t&&T(r),r}function nt(e,t=!0){let r=q();for(let i=0;i<r.length;i++)r[i].url===e.url&&(r[i]=e);return t&&T(r),r}function Pe(e,t,r=!0){return e=e.filter(i=>i.url!==t),r&&T(e),e}async function it(e,t="",r=!1){if(!e||!K(e))return y("ERROR","error"),null;if(!r){let n=j(e);if(n)return n}let i=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(i.status!==200)y("ERROR","error");else{let n=await i.text(),s=Ae(e,n,t);return Re(s),y("Done!","success"),s}return null}function st(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=F(r):r.keywords={},r}function lt(e,t,r,i){return e?[L("Ingredients",e.ingredients,e.keywords,t,r,i),L("Instructions",e.instructions,e.keywords,t,r,i),L("Notes",e.notes,e.keywords,t,r,i)]:[]}function L(e,t,r,i,n,s){let l=[],o={text:e,level:2,rows:[]};if(t.length){l.push(o);for(let a of t){let f=a;if(a.startsWith(w))a=a.substr(w.length);else if(a.startsWith(N)){a=a.substr(N.length),l.push(o={level:3,text:R(a),rows:[]}),l.push(o);continue}else if(a.startsWith(I)){a=a.substr(I.length),l.push(o={level:4,text:R(a),rows:[]});continue}o.rows.push({original:f,fragments:Le(a,r,i),id:ke("row")})}for(let a of l)for(let f of a.rows)for(let u of f.fragments)switch(u.type){case g.Ingredient:u.id=we(r,u.text);break;case g.Amount:let p=u.text,h=Ie(p,s,n);h===null?u.failed=!0:h!==p&&(u.text=h,u.converted=!0);break}}return l}function ot(e){let t=v();for(let r of t)if(r.id===e)return r;return null}function v(){try{let e=localStorage.getItem(k.SHOPPING_LISTS);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function at(e){let t=v();for(let r=0;r<t.length;r++)if(t[r].id===e.id){t[r]=e;break}J(t)}function ut(e){let t=v(),r=0;for(let n of t)n.id>r&&(r=n.id);let i=r+1;return e.id=i,t.push(e),J(t),i}function J(e){localStorage.setItem(k.SHOPPING_LISTS,JSON.stringify(e))}function ct(e,t,r=!0){return t||(t=v()),t=t.filter(i=>i.id!==e),r&&J(t),t}function ft(e){localStorage.setItem(k.LAST_LIST_ID,JSON.stringify(e)),Oe.set(e)}function je(){try{let e=localStorage.getItem(k.LAST_LIST_ID);if(e)return JSON.parse(e)}catch{}return null}let Ce=0;const te=O([]);function y(e,t=""){te.update(r=>[...r,{text:e,extra_class:t,id:++Ce}])}function pt(e){te.update(t=>{let r=[...t];for(let i=0;i<r.length;i++)r[i]&&r[i]===e&&(r.splice(i,1),i-=1);return r})}const Oe=O(je()),We=O(null);window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),We.set(e)});export{et as A,Fe as B,Ye as C,pt as D,te as E,g as F,y as G,it as H,nt as I,Xe as J,k as K,b as L,rt as M,J as N,ye as U,U as a,v as b,Ke as c,Pe as d,ct as e,Ze as f,q as g,Be as h,M as i,ft as j,Te as k,Oe as l,Qe as m,Ve as n,ze as o,ot as p,ut as q,Je as r,z as s,Ge as t,at as u,We as v,lt as w,st as x,tt as y,j as z};
