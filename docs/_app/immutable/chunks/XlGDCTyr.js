import{f as M,i as y,e as R,r as W,a as G,l as O,b as C,c as L,v as U,d as q,h as z}from"./Ie-pm94N.js";import{n as I}from"./LLouynbo.js";var w=(e=>(e.PREFERENCES="preferences",e.RECIPES="recipes",e.TABS="tabs",e))(w||{}),c=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(c||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const $="### ",k="#### ",_="   - ",X=M(String.raw`
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
	)`),A={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:c.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:c.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:c.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:c.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:c.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:c.METRIC,converters:{cup:e=>W(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:c.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:c.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:c.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:c.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:c.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:c.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:c.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:c.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function J(e,r,n,l){e.alias&&(e=A[e.alias]);let t=r*l;if(e.ignore_scale&&(t=r),!(n===c.ANY||n===c.ORIGINAL)&&n!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];t=e.converters[o](t),e=A[o]}else return null;return t=W(t,2,!0),!e.plural||typeof t=="string"||t<=1.1?e.join?`${t}${e.singular}`:`${t} ${e.singular}`:e.join?`${t}${e.plural}`:`${t} ${e.plural}`}function V(e,r,n){if(y(e))return R(r,1)&&n===c.ORIGINAL?e:null;for(let s of Object.values(A))if(s.regex.exec(e)!=null&&s.skip)return e;let l=s=>{if(s=s.trim(),y(s))return Number(s);let i=s.match(/^([0-9]+)\/([0-9]+)$/);return i?Number(i[1])/Number(i[2]):(i=s.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),i?Number(i[1])+Number(i[2])/Number(i[3]):NaN)};e=e.replace(/ and /," ");let t=e.match(new RegExp(M(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return R(r,1)&&n===c.ORIGINAL?e:null;let o=e;for(let s=0;s<t.length;s++){let i=t[s];t[s]=l(i),e=e.replace(i,"").trim()}let u=t.reduce((s,i)=>s+i,0);if(u<0||isNaN(u))return R(r,1)&&n===c.ORIGINAL?o:null;for(let s of Object.values(A))if(s.regex.exec(e)!=null){let i=J(s,u,n,r);if(i)return i}return null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(p||{});function Y(e){let r={};for(let t of[e.ingredients,e.instructions])Z(t,r,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Amount,regex:new RegExp(X,"gi")}]);for(let t=0;t<e.ingredients.length;t++){let o=e.ingredients[t];if(o.startsWith(_)){o=o.replace(_,"");{let u=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const s=o.match(u);if(s){let i=s[s.length-1].trim();o=o.replace(i,`**${i}**`),i=i.toLowerCase(),r[i]=p.Ingredient;let f=i.split(" ");for(let a=1;f.length-a>0;a++){let h=G(i,f.length-a);r[h]=p.Ingredient}}}}e.ingredients[t]=o}let n=Object.keys(r);n.sort(O);for(let t=0;t<e.instructions.length;t++){let o=e.instructions[t];for(let u of n)o=C(o,s=>(s=s.replaceAll(new RegExp(String.raw`\b${u}\b`,"gi"),`**${u}**`),s));e.instructions[t]=o}let l=/(\b[0-9]+)\b/gi;for(let t of[e.ingredients,e.instructions])for(let o=0;o<t.length;o++){let u=t[o];u=u.split(/(\*\*[^\*]+\*\*)/).map(s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;let i=s.match(l);if(i){s=s.replaceAll(l,"**$1**");for(let f of i)r[f]=p.Amount}return s}).join(""),t[o]=u}return r}function Z(e,r,n){for(let l=0;l<e.length;l++)for(let t of n){let o=t.regex,u=t.kw_type;e[l]=C(e[l],s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;const i=[...new Set(s.match(o)||[])];i.sort(O);for(let f of i){let a=f.trim();!a.length||y(a)||(s=C(s,h=>h.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),r[a]=u)}return s})}}function P(e){if(e.nodeName.startsWith("H")){let n=!0;for(;n;){n=!1;for(let l of e.children)l.nodeName=="DIV"&&(e.removeChild(l),n=!0)}}return H(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function Q(e,r,n){let t=new DOMParser().parseFromString(r,"text/html"),o=d.None,u=null,s={},i=[],f=[],a=[];n=n||T(t);let h=[...t.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],x=Math.max(0,h.filter(m=>S(m)>2).map(m=>P(m)).findLastIndex(m=>m.toLowerCase()==="ingredients"||m.toLowerCase()==="gather your ingredients")),B=new Set;for(let m=x;m<h.length;m++){let b=h[m];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==u&&(o=d.None),K(B,b)))continue;let g=P(b);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":o=d.Ingredients,u=b.nodeName;continue;case"instructions":o=d.Instructions,u=b.nodeName;continue;case"notes":o=d.Notes,u=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${$}${g}`;break;default:g=`${_}${g}`;break}switch(o){case d.Ingredients:i.push(g);break;case d.Instructions:if(g.startsWith(_)){let N=g.replace(_,"").match(/^([^\.\:]+):(.+)/);N?(f.push(`${k}${N[1]}`),f.push(`${_}${N[2]}`)):f.push(g)}break;case d.Notes:a.push(g);break}}return{title:n,ingredients:i,instructions:f,notes:a,keywords:s,url:e}}function S(e,r=0){const n=r+1;let l=n;for(let t of e.children)l=Math.max(l,S(t,n));return l}function K(e,r){for(let n of[r,...r.querySelectorAll("*")]){if(e.has(n))return!0;e.add(n)}return!1}function T(e){for(let r of e.querySelectorAll("meta"))if(r.getAttribute("property")==="og:title")return r.getAttribute("content")||"";return""}function H(e){return[...e.childNodes].map(r=>r.childNodes.length?H(r):r.textContent).join(" ").replaceAll(/  +/g," ")}function E(e,r,n){let l="";if(e.length){l+=`

## ${n}
`;for(let t of e)t.startsWith($)||t.startsWith(k)?t=`

${t}
`:l+=`
${t}`}return l}function le(e){let r="";return e.title&&(r+=`# ${e.title}
`),r+=E(e.ingredients,e.keywords,"Ingredients"),r+=E(e.instructions,e.keywords,"Instructions"),r+=E(e.notes,e.keywords,"Notes"),r.trim()}function F(e,r,n){if(!n)return[{type:p.Plain,text:L(e)}];let l=[];for(let t of e.split(/(\*\*[^\*]+\*\*)/))if(t)if(t.startsWith("**")&&t.endsWith("**"))t=t.replace(/^\*\*/,"").replace(/\*\*$/,""),l.push({text:t,type:r[t.toLowerCase()]||p.Unknown});else{let o=t;for(let u of o.split(/(\*[^\*]+\*)/))u&&(u.startsWith("*")&&u.endsWith("*")?(u=u.replace(/^\*/,"").replace(/\*$/,""),l.push({type:p.Italic,text:u})):l.push({type:p.Plain,text:u}))}return l}function j(){try{let e=JSON.parse(localStorage.getItem(w.RECIPES)||"[]");return e.length===0&&(e=JSON.parse(localStorage.getItem(w.TABS)||"[]").map(r=>({...r.data,url:r.url}))),e}catch(e){return console.error(e),[]}}function D(e){localStorage.setItem(w.RECIPES,JSON.stringify(e))}function ee(e){let r=j();for(let n of r)if(n.url===e)return n;return null}function te(e,r=!0){let n=j();return n=re(n,e.url,!1),n.push(e),r&&D(n),n}function re(e,r,n=!0){return e=e.filter(l=>l.url!==r),n&&D(e),e}async function oe(e,r="",n=!1){if(!e||!U(e))return I("ERROR","error"),null;if(!n){let t=ee(e);if(t)return I("Done!","success"),t}let l=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(l.status!==200)I("ERROR","error");else{let t=await l.text(),o=Q(e,t,r);return te(o),I("Done!","success"),o}return null}function ue(e,r){if(!e)return null;let n=structuredClone(e);return r?n.keywords=Y(n):n.keywords={},n}function ae(e,r,n,l){return e?[v("Ingredients",e.ingredients,e.keywords,r,n,l),v("Instructions",e.instructions,e.keywords,r,n,l),v("Notes",e.notes,e.keywords,r,n,l)]:[]}function v(e,r,n,l,t,o){let u=[],s={text:e,level:2,rows:[]};if(r.length){u.push(s);for(let i of r){if(i.startsWith(_))i=i.substr(_.length);else if(i.startsWith($)){i=i.substr($.length),u.push(s={level:3,text:L(i),rows:[]}),u.push(s);continue}else if(i.startsWith(k)){i=i.substr(k.length),u.push(s={level:4,text:L(i),rows:[]});continue}s.rows.push({fragments:F(i,n,l),id:q("row")})}for(let i of u)for(let f of i.rows)for(let a of f.fragments)switch(a.type){case p.Ingredient:a.id=z(n,a.text);break;case p.Amount:let h=a.text,x=V(h,o,t);x===null?a.failed=!0:x!==h&&(a.text=x,a.converted=!0);break}}return u}export{p as F,w as K,c as U,le as a,ae as b,re as d,ue as f,j as g,oe as t};
