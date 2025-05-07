import{n as w}from"./Uo9V0nwd.js";function C(e){return e.replaceAll("**","")}function M(e,t=1){let r=e.split(" ");for(;r.length>t;)r.shift();return r.join(" ")}function W(e){return e.replaceAll(/^\s+(\/\/.*)?/gm,"").replaceAll(`
`,"")}function O(e,t,r=!1){if(typeof e=="string")return e;if(e*=10**t,e=Math.round(e),e/=10**t,r){if(_(e,1/2))return"1/2";if(_(e,1/3))return"1/3";if(_(e,1/4))return"1/4";if(_(e,1/8))return"1/8";if(_(e,2/3))return"2/3";if(_(e,3/4))return"3/4"}return e}function L(e){return!isNaN(Number(e))&&!isNaN(parseFloat(e))}function _(e,t){return Math.abs(e-t)<.01}function P(e,t){return e.split(/(\*\*[^\*]+\*\*)/).map(r=>r.startsWith("**")&&r.endsWith("**")?r:t(r)).join("")}function G(e,t){t=t.toLowerCase();let r=M(t);return e[r]?r:t.replaceAll(/\s/g,"_")}let z=0;const X=e=>`${e}_${++z}`;function S(e,t){return t.length-e.length}function j(e){if(!e||!e.length||e.length>500)return!1;try{let t=new URL(e);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function le(){let e=new URL(document.location),t=e.searchParams.get("link")||e.searchParams.get("description")||e.searchParams.get("url");return t?decodeURI(t):null}async function oe(){const e=await navigator.clipboard.read();e:for(const t of e)for(const r of t.types){const n=await(await t.getType(r)).text();if(j(n))return w("Loading..."),n;break e}w("Didn't find a recipe url in your clipboard"),w("Sorry bud :/")}var $=(e=>(e.PREFERENCES="preferences",e.RECIPES="recipes",e.TABS="tabs",e))($||{}),a=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(a||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const A="### ",k="#### ",x="   - ",J=W(String.raw`
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
	)`),N={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:a.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:a.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:a.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:a.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:a.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:a.METRIC,converters:{cup:e=>O(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:a.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:a.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:a.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:a.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:a.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:a.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:a.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:a.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function V(e,t,r,l){e.alias&&(e=N[e.alias]);let n=t*l;if(e.ignore_scale&&(n=t),!(r===a.ANY||r===a.ORIGINAL)&&r!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];n=e.converters[o](n),e=N[o]}else return null;return n=O(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function Y(e,t,r){if(L(e))return _(t,1)&&r===a.ORIGINAL?e:null;for(let i of Object.values(N))if(i.regex.exec(e)!=null&&i.skip)return e;let l=i=>{if(i=i.trim(),L(i))return Number(i);let s=i.match(/^([0-9]+)\/([0-9]+)$/);return s?Number(s[1])/Number(s[2]):(s=i.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),s?Number(s[1])+Number(s[2])/Number(s[3]):NaN)};e=e.replace(/ and /," ");let n=e.match(new RegExp(W(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return _(t,1)&&r===a.ORIGINAL?e:null;let o=e;for(let i=0;i<n.length;i++){let s=n[i];n[i]=l(s),e=e.replace(s,"").trim()}let u=n.reduce((i,s)=>i+s,0);if(u<0||isNaN(u))return _(t,1)&&r===a.ORIGINAL?o:null;for(let i of Object.values(N))if(i.regex.exec(e)!=null){let s=V(i,u,r,t);if(s)return s}return null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(p||{});function Z(e){let t={};for(let n of[e.ingredients,e.instructions])Q(n,t,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Amount,regex:new RegExp(J,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let o=e.ingredients[n];if(o.startsWith(x)){o=o.replace(x,"");{let u=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const i=o.match(u);if(i){let s=i[i.length-1].trim();o=o.replace(s,`**${s}**`),s=s.toLowerCase(),t[s]=p.Ingredient;let f=s.split(" ");for(let c=1;f.length-c>0;c++){let h=M(s,f.length-c);t[h]=p.Ingredient}}}}e.ingredients[n]=o}let r=Object.keys(t);r.sort(S);for(let n=0;n<e.instructions.length;n++){let o=e.instructions[n];for(let u of r)o=P(o,i=>(i=i.replaceAll(new RegExp(String.raw`\b${u}\b`,"gi"),`**${u}**`),i));e.instructions[n]=o}let l=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let o=0;o<n.length;o++){let u=n[o];u=u.split(/(\*\*[^\*]+\*\*)/).map(i=>{if(i.startsWith("**")&&i.endsWith("**"))return i;let s=i.match(l);if(s){i=i.replaceAll(l,"**$1**");for(let f of s)t[f]=p.Amount}return i}).join(""),n[o]=u}return t}function Q(e,t,r){for(let l=0;l<e.length;l++)for(let n of r){let o=n.regex,u=n.kw_type;e[l]=P(e[l],i=>{if(i.startsWith("**")&&i.endsWith("**"))return i;const s=[...new Set(i.match(o)||[])];s.sort(S);for(let f of s){let c=f.trim();!c.length||L(c)||(i=P(i,h=>h.replaceAll(c,`**${c}**`)),c=c.toLowerCase(),t[c]=u)}return i})}}function v(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let l of e.children)l.nodeName=="DIV"&&(e.removeChild(l),r=!0)}}return H(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function T(e,t,r){let n=new DOMParser().parseFromString(t,"text/html"),o=d.None,u=null,i={},s=[],f=[],c=[];r=r||F(n);let h=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],I=Math.max(0,h.filter(m=>D(m)>2).map(m=>v(m)).findLastIndex(m=>m.toLowerCase()==="ingredients"||m.toLowerCase()==="gather your ingredients")),q=new Set;for(let m=I;m<h.length;m++){let b=h[m];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==u&&(o=d.None),K(q,b)))continue;let g=v(b);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":o=d.Ingredients,u=b.nodeName;continue;case"instructions":o=d.Instructions,u=b.nodeName;continue;case"notes":o=d.Notes,u=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${A}${g}`;break;default:g=`${x}${g}`;break}switch(o){case d.Ingredients:s.push(g);break;case d.Instructions:if(g.startsWith(x)){let R=g.replace(x,"").match(/^([^\.\:]+):(.+)/);R?(f.push(`${k}${R[1]}`),f.push(`${x}${R[2]}`)):f.push(g)}break;case d.Notes:c.push(g);break}}return{title:r,ingredients:s,instructions:f,notes:c,keywords:i,url:e}}function D(e,t=0){const r=t+1;let l=r;for(let n of e.children)l=Math.max(l,D(n,r));return l}function K(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function F(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function H(e){return[...e.childNodes].map(t=>t.childNodes.length?H(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function y(e,t,r){let l="";if(e.length){l+=`

## ${r}
`;for(let n of e)n.startsWith(A)||n.startsWith(k)?n=`

${n}
`:l+=`
${n}`}return l}function ue(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=y(e.ingredients,e.keywords,"Ingredients"),t+=y(e.instructions,e.keywords,"Instructions"),t+=y(e.notes,e.keywords,"Notes"),t.trim()}function ee(e,t,r){if(!r)return[{type:p.Plain,text:C(e)}];let l=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),l.push({text:n,type:t[n.toLowerCase()]||p.Unknown});else{let o=n;for(let u of o.split(/(\*[^\*]+\*)/))u&&(u.startsWith("*")&&u.endsWith("*")?(u=u.replace(/^\*/,"").replace(/\*$/,""),l.push({type:p.Italic,text:u})):l.push({type:p.Plain,text:u}))}return l}function U(){try{let e=JSON.parse(localStorage.getItem($.RECIPES)||"[]");return e.length===0&&(e=JSON.parse(localStorage.getItem($.TABS)||"[]").map(t=>({...t.data,url:t.url}))),e}catch(e){return console.error(e),[]}}function B(e){localStorage.setItem($.RECIPES,JSON.stringify(e))}function te(e){let t=U();for(let r of t)if(r.url===e)return r;return null}function re(e,t=!0){let r=U();return r=ne(r,e.url,!1),r.push(e),t&&B(r),r}function ne(e,t,r=!0){return e=e.filter(l=>l.url!==t),r&&B(e),e}async function ce(e,t="",r=!1){if(!e||!j(e))return w("ERROR","error"),null;if(!r){let n=te(e);if(n)return w("Done!","success"),n}let l=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(l.status!==200)w("ERROR","error");else{let n=await l.text(),o=T(e,n,t);return re(o),w("Done!","success"),o}return null}function ae(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=Z(r):r.keywords={},r}function fe(e,t,r,l){return e?[E("Ingredients",e.ingredients,e.keywords,t,r,l),E("Instructions",e.instructions,e.keywords,t,r,l),E("Notes",e.notes,e.keywords,t,r,l)]:[]}function E(e,t,r,l,n,o){let u=[],i={text:e,level:2,rows:[]};if(t.length){u.push(i);for(let s of t){if(s.startsWith(x))s=s.substr(x.length);else if(s.startsWith(A)){s=s.substr(A.length),u.push(i={level:3,text:C(s),rows:[]}),u.push(i);continue}else if(s.startsWith(k)){s=s.substr(k.length),u.push(i={level:4,text:C(s),rows:[]});continue}i.rows.push({fragments:ee(s,r,l),id:X("row")})}for(let s of u)for(let f of s.rows)for(let c of f.fragments)switch(c.type){case p.Ingredient:c.id=G(r,c.text);break;case p.Amount:let h=c.text,I=Y(h,o,n);I===null?c.failed=!0:I!==h&&(c.text=I,c.converted=!0);break}}return u}export{p as F,$ as K,a as U,oe as a,le as b,ue as c,ne as d,_ as e,ae as f,U as g,fe as h,ce as t};
