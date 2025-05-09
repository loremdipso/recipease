import{f as O,i as y,e as N,r as S,d as G,l as j,h as C,j as L,v as U,n as R,k as q,m as z}from"./DCAaRRLG.js";var I=(e=>(e.PREFERENCES="preferences",e.RECIPES="recipes",e.TABS="tabs",e))(I||{}),c=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(c||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const w="### ",$="#### ",x="   - ",X=O(String.raw`
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
	)`),k={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:c.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:c.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:c.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:c.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:c.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:c.METRIC,converters:{cup:e=>S(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:c.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:c.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:c.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:c.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:c.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:c.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:c.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:c.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function J(e,n,t,l){e.alias&&(e=k[e.alias]);let r=n*l;if(e.ignore_scale&&(r=n),!(t===c.ANY||t===c.ORIGINAL)&&t!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];r=e.converters[o](r),e=k[o]}else return null;return r=S(r,2,!0),!e.plural||typeof r=="string"||r<=1.1?e.join?`${r}${e.singular}`:`${r} ${e.singular}`:e.join?`${r}${e.plural}`:`${r} ${e.plural}`}function V(e,n,t){if(y(e))return N(n,1)&&t===c.ORIGINAL?e:null;for(let s of Object.values(k))if(s.regex.exec(e)!=null&&s.skip)return e;let l=s=>{if(s=s.trim(),y(s))return Number(s);let i=s.match(/^([0-9]+)\/([0-9]+)$/);return i?Number(i[1])/Number(i[2]):(i=s.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),i?Number(i[1])+Number(i[2])/Number(i[3]):NaN)};e=e.replace(/ and /," ");let r=e.match(new RegExp(O(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(r==null)return N(n,1)&&t===c.ORIGINAL?e:null;let o=e;for(let s=0;s<r.length;s++){let i=r[s];r[s]=l(i),e=e.replace(i,"").trim()}let u=r.reduce((s,i)=>s+i,0);if(u<0||isNaN(u))return N(n,1)&&t===c.ORIGINAL?o:null;for(let s of Object.values(k))if(s.regex.exec(e)!=null){let i=J(s,u,t,n);if(i)return i}return null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(p||{});function Y(e){let n={};for(let r of[e.ingredients,e.instructions])Z(r,n,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Amount,regex:new RegExp(X,"gi")}]);for(let r=0;r<e.ingredients.length;r++){let o=e.ingredients[r];if(o.startsWith(x)){o=o.replace(x,"");{let u=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const s=o.match(u);if(s){let i=s[s.length-1].trim();o=o.replace(i,`**${i}**`),i=i.toLowerCase(),n[i]=p.Ingredient;let f=i.split(" ");for(let a=1;f.length-a>0;a++){let h=G(i,f.length-a);n[h]=p.Ingredient}}}}e.ingredients[r]=o}let t=Object.keys(n);t.sort(j);for(let r=0;r<e.instructions.length;r++){let o=e.instructions[r];for(let u of t)o=C(o,s=>(s=s.replaceAll(new RegExp(String.raw`\b${u}\b`,"gi"),`**${u}**`),s));e.instructions[r]=o}let l=/(\b[0-9]+)\b/gi;for(let r of[e.ingredients,e.instructions])for(let o=0;o<r.length;o++){let u=r[o];u=u.split(/(\*\*[^\*]+\*\*)/).map(s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;let i=s.match(l);if(i){s=s.replaceAll(l,"**$1**");for(let f of i)n[f]=p.Amount}return s}).join(""),r[o]=u}return n}function Z(e,n,t){for(let l=0;l<e.length;l++)for(let r of t){let o=r.regex,u=r.kw_type;e[l]=C(e[l],s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;const i=[...new Set(s.match(o)||[])];i.sort(j);for(let f of i){let a=f.trim();!a.length||y(a)||(s=C(s,h=>h.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),n[a]=u)}return s})}}function W(e){if(e.nodeName.startsWith("H")){let t=!0;for(;t;){t=!1;for(let l of e.children)l.nodeName=="DIV"&&(e.removeChild(l),t=!0)}}return D(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function Q(e,n,t){let r=new DOMParser().parseFromString(n,"text/html"),o=d.None,u=null,s={},i=[],f=[],a=[];t=t||T(r);let h=[...r.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],_=Math.max(0,h.filter(m=>H(m)>2).map(m=>W(m)).findLastIndex(m=>m.toLowerCase()==="ingredients"||m.toLowerCase()==="gather your ingredients")),B=new Set;for(let m=_;m<h.length;m++){let b=h[m];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==u&&(o=d.None),K(B,b)))continue;let g=W(b);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":o=d.Ingredients,u=b.nodeName;continue;case"instructions":o=d.Instructions,u=b.nodeName;continue;case"notes":o=d.Notes,u=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${w}${g}`;break;default:g=`${x}${g}`;break}switch(o){case d.Ingredients:i.push(g);break;case d.Instructions:if(g.startsWith(x)){let A=g.replace(x,"").match(/^([^\.\:]+):(.+)/);A?(f.push(`${$}${A[1]}`),f.push(`${x}${A[2]}`)):f.push(g)}break;case d.Notes:a.push(g);break}}return{title:t,ingredients:i,instructions:f,notes:a,keywords:s,url:e}}function H(e,n=0){const t=n+1;let l=t;for(let r of e.children)l=Math.max(l,H(r,t));return l}function K(e,n){for(let t of[n,...n.querySelectorAll("*")]){if(e.has(t))return!0;e.add(t)}return!1}function T(e){for(let n of e.querySelectorAll("meta"))if(n.getAttribute("property")==="og:title")return n.getAttribute("content")||"";return""}function D(e){return[...e.childNodes].map(n=>n.childNodes.length?D(n):n.textContent).join(" ").replaceAll(/  +/g," ")}function E(e,n,t){let l="";if(e.length){l+=`

## ${t}
`;for(let r of e)r.startsWith(w)||r.startsWith($)?r=`

${r}
`:l+=`
${r}`}return l}function ie(e){let n="";return e.title&&(n+=`# ${e.title}
`),n+=E(e.ingredients,e.keywords,"Ingredients"),n+=E(e.instructions,e.keywords,"Instructions"),n+=E(e.notes,e.keywords,"Notes"),n.trim()}function F(e,n,t){if(!t)return[{type:p.Plain,text:L(e)}];let l=[];for(let r of e.split(/(\*\*[^\*]+\*\*)/))if(r)if(r.startsWith("**")&&r.endsWith("**"))r=r.replace(/^\*\*/,"").replace(/\*\*$/,""),l.push({text:r,type:n[r.toLowerCase()]||p.Unknown});else{let o=r;for(let u of o.split(/(\*[^\*]+\*)/))u&&(u.startsWith("*")&&u.endsWith("*")?(u=u.replace(/^\*/,"").replace(/\*$/,""),l.push({type:p.Italic,text:u})):l.push({type:p.Plain,text:u}))}return l}function P(){try{let e=JSON.parse(localStorage.getItem(I.RECIPES)||"[]");return e.length===0&&(e=JSON.parse(localStorage.getItem(I.TABS)||"[]").map(n=>({...n.data,url:n.url}))),e}catch(e){return console.error(e),[]}}function M(e){localStorage.setItem(I.RECIPES,JSON.stringify(e))}function ee(e){let n=P();for(let t of n)if(t.url===e)return t;return null}function te(e,n=!0){let t=P();return t=re(t,e.url,!1),t.push(e),n&&M(t),t}function le(e,n=!0){let t=P();for(let l=0;l<t.length;l++)t[l].url===e.url&&(t[l]=e);return n&&M(t),t}function re(e,n,t=!0){return e=e.filter(l=>l.url!==n),t&&M(e),e}async function oe(e,n="",t=!1){if(!e||!U(e))return R("ERROR","error"),null;if(!t){let r=ee(e);if(r)return r}let l=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(l.status!==200)R("ERROR","error");else{let r=await l.text(),o=Q(e,r,n);return te(o),R("Done!","success"),o}return null}function ue(e,n){if(!e)return null;let t=structuredClone(e);return n?t.keywords=Y(t):t.keywords={},t}function ae(e,n,t,l){return e?[v("Ingredients",e.ingredients,e.keywords,n,t,l),v("Instructions",e.instructions,e.keywords,n,t,l),v("Notes",e.notes,e.keywords,n,t,l)]:[]}function v(e,n,t,l,r,o){let u=[],s={text:e,level:2,rows:[]};if(n.length){u.push(s);for(let i of n){if(i.startsWith(x))i=i.substr(x.length);else if(i.startsWith(w)){i=i.substr(w.length),u.push(s={level:3,text:L(i),rows:[]}),u.push(s);continue}else if(i.startsWith($)){i=i.substr($.length),u.push(s={level:4,text:L(i),rows:[]});continue}s.rows.push({fragments:F(i,t,l),id:q("row")})}for(let i of u)for(let f of i.rows)for(let a of f.fragments)switch(a.type){case p.Ingredient:a.id=z(t,a.text);break;case p.Amount:let h=a.text,_=V(h,o,r);_===null?a.failed=!0:_!==h&&(a.text=_,a.converted=!0);break}}return u}export{p as F,I as K,c as U,ae as a,ie as b,re as d,ue as f,P as g,oe as t,le as u};
