import{n as j,i as C,o as y,p as q,q as X,u as D,v as P,w,x as L,y as V,z as Y,A as Z}from"./B6Bb_tVa.js";const W="recipease_";var I=(e=>(e.PREFERENCES=`${W}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${W}shopping_lists`,e))(I||{}),c=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(c||{}),_=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(_||{});const $="### ",k="#### ",x="   - ",Q=j(String.raw`
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
	)`),N={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:c.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:c.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:c.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:c.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:c.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:c.METRIC,converters:{cup:e=>q(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:c.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:c.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:c.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:c.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:c.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:c.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:c.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:c.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function T(e,r,t,s){e.alias&&(e=N[e.alias]);let n=r*s;if(e.ignore_scale&&(n=r),!(t===c.ANY||t===c.ORIGINAL)&&t!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];n=e.converters[o](n),e=N[o]}else return null;return n=q(n,2,!0),!e.plural||typeof n=="string"||n<=1.1?e.join?`${n}${e.singular}`:`${n} ${e.singular}`:e.join?`${n}${e.plural}`:`${n} ${e.plural}`}function K(e,r,t){if(C(e))return y(r,1)&&t===c.ORIGINAL?e:null;for(let i of Object.values(N))if(i.regex.exec(e)!=null&&i.skip)return e;let s=i=>{if(i=i.trim(),C(i))return Number(i);let l=i.match(/^([0-9]+)\/([0-9]+)$/);return l?Number(l[1])/Number(l[2]):(l=i.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),l?Number(l[1])+Number(l[2])/Number(l[3]):NaN)};e=e.replace(/ and /," ");let n=e.match(new RegExp(j(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return y(r,1)&&t===c.ORIGINAL?e:null;let o=e;for(let i=0;i<n.length;i++){let l=n[i];n[i]=s(l),e=e.replace(l,"").trim()}let u=n.reduce((i,l)=>i+l,0);if(u<0||isNaN(u))return y(r,1)&&t===c.ORIGINAL?o:null;for(let i of Object.values(N))if(i.regex.exec(e)!=null){let l=T(i,u,t,r);if(l)return l}return null}var h=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(h||{});function G(e){let r={};for(let n of[e.ingredients,e.instructions])F(n,r,[{kw_type:h.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:h.Amount,regex:new RegExp(Q,"gi")}]);for(let n=0;n<e.ingredients.length;n++){let o=e.ingredients[n];if(o.startsWith(x)){o=o.replace(x,"");{let u=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const i=o.match(u);if(i){let l=i[i.length-1].trim();o=o.replace(l,`**${l}**`),l=l.toLowerCase(),r[l]=h.Ingredient;let f=l.split(" ");for(let a=1;f.length-a>0;a++){let p=X(l,f.length-a);r[p]=h.Ingredient}}}}e.ingredients[n]=o}let t=Object.keys(r);t.sort(D);for(let n=0;n<e.instructions.length;n++){let o=e.instructions[n];for(let u of t)o=P(o,i=>(i=i.replaceAll(new RegExp(String.raw`\b${u}\b`,"gi"),`**${u}**`),i));e.instructions[n]=o}let s=/(\b[0-9]+)\b/gi;for(let n of[e.ingredients,e.instructions])for(let o=0;o<n.length;o++){let u=n[o];u=u.split(/(\*\*[^\*]+\*\*)/).map(i=>{if(i.startsWith("**")&&i.endsWith("**"))return i;let l=i.match(s);if(l){i=i.replaceAll(s,"**$1**");for(let f of l)r[f]=h.Amount}return i}).join(""),n[o]=u}return r}function F(e,r,t){for(let s=0;s<e.length;s++)for(let n of t){let o=n.regex,u=n.kw_type;e[s]=P(e[s],i=>{if(i.startsWith("**")&&i.endsWith("**"))return i;const l=[...new Set(i.match(o)||[])];l.sort(D);for(let f of l){let a=f.trim();!a.length||C(a)||(i=P(i,p=>p.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),r[a]=u)}return i})}}function H(e){if(e.nodeName.startsWith("H")){let t=!0;for(;t;){t=!1;for(let s of e.children)s.nodeName=="DIV"&&(e.removeChild(s),t=!0)}}return U(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function ee(e,r,t){let n=new DOMParser().parseFromString(r,"text/html"),o=_.None,u=null,i={},l=[],f=[],a=[];t=t||re(n);let p=[...n.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],g=Math.max(0,p.filter(d=>z(d)>2).map(d=>H(d)).findLastIndex(d=>d.toLowerCase()==="ingredients"||d.toLowerCase()==="gather your ingredients")),J=new Set;for(let d=g;d<p.length;d++){let b=p[d];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==u&&(o=_.None),te(J,b)))continue;let m=H(b);if(!m.length)continue;switch(m.toLowerCase()){case"ingredients":o=_.Ingredients,u=b.nodeName;continue;case"instructions":o=_.Instructions,u=b.nodeName;continue;case"notes":o=_.Notes,u=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":m=m.replace(/:$/,""),m=`${$}${m}`;break;default:m=`${x}${m}`;break}switch(o){case _.Ingredients:l.push(m);break;case _.Instructions:if(m.startsWith(x)){let R=m.replace(x,"").match(/^([^\.\:]+):(.+)/);R?(f.push(`${k}${R[1]}`),f.push(`${x}${R[2]}`)):f.push(m)}break;case _.Notes:a.push(m);break}}return{title:t,ingredients:l,instructions:f,notes:a,keywords:i,url:e}}function z(e,r=0){const t=r+1;let s=t;for(let n of e.children)s=Math.max(s,z(n,t));return s}function te(e,r){for(let t of[r,...r.querySelectorAll("*")]){if(e.has(t))return!0;e.add(t)}return!1}function re(e){for(let r of e.querySelectorAll("meta"))if(r.getAttribute("property")==="og:title")return r.getAttribute("content")||"";return""}function U(e){return[...e.childNodes].map(r=>r.childNodes.length?U(r):r.textContent).join(" ").replaceAll(/  +/g," ")}function ue(e,r){let t={},s=[];for(let o of e.items){let u=structuredClone(B(o.recipe_url,r));if(u){let i=G(u);for(let l of u.ingredients){let f=null,a=null,p=!1;e:for(let g of l.split(/(\*\*[^\*]+\*\*)/))if(g.startsWith("**")&&g.endsWith("**")&&(g=g.replace(/^\*\*/,"").replace(/\*\*.*/,"").trim(),g))switch(i[g]){case h.Ingredient:if(f){p=!0;break e}f=g;break;case h.Amount:if(a){p=!0;break e}a=g;break}if(p||!f||!a)s.push(l);else{let g=f;t[g]||(t[g]=[]),t[g].push({recipe_count:o.quantity,ingredient_quantity:a})}}}else{let i=`Missing recipe: ${o.recipe_url}`;console.error(i),w(i,"red")}}let n=[];for(let o of Object.keys(t))n.push({name:o,quantities:t[o]});return{ingredients:n,errors:s}}function E(e,r,t){let s="";if(e.length){s+=`

## ${t}
`;for(let n of e)n.startsWith($)||n.startsWith(k)?n=`

${n}
`:s+=`
${n}`}return s}function ae(e){let r="";return e.title&&(r+=`# ${e.title}
`),r+=E(e.ingredients,e.keywords,"Ingredients"),r+=E(e.instructions,e.keywords,"Instructions"),r+=E(e.notes,e.keywords,"Notes"),r.trim()}function ne(e,r,t){if(!t)return[{type:h.Plain,text:L(e)}];let s=[];for(let n of e.split(/(\*\*[^\*]+\*\*)/))if(n)if(n.startsWith("**")&&n.endsWith("**"))n=n.replace(/^\*\*/,"").replace(/\*\*$/,""),s.push({text:n,type:r[n.toLowerCase()]||h.Unknown});else{let o=n;for(let u of o.split(/(\*[^\*]+\*)/))u&&(u.startsWith("*")&&u.endsWith("*")?(u=u.replace(/^\*/,"").replace(/\*$/,""),s.push({type:h.Italic,text:u})):s.push({type:h.Plain,text:u}))}return s}function S(){try{let e=localStorage.getItem(I.RECIPES);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function O(e){localStorage.setItem(I.RECIPES,JSON.stringify(e))}function B(e,r=null){r||(r=S());for(let t of r)if(t.url===e)return t;return null}function ie(e,r=!0){let t=S();return t=se(t,e.url,!1),t.push(e),r&&O(t),t}function ce(e,r=!0){let t=S();for(let s=0;s<t.length;s++)t[s].url===e.url&&(t[s]=e);return r&&O(t),t}function se(e,r,t=!0){return e=e.filter(s=>s.url!==r),t&&O(e),e}async function fe(e,r="",t=!1){if(!e||!V(e))return w("ERROR","error"),null;if(!t){let n=B(e);if(n)return n}let s=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(s.status!==200)w("ERROR","error");else{let n=await s.text(),o=ee(e,n,r);return ie(o),w("Done!","success"),o}return null}function ge(e,r){if(!e)return null;let t=structuredClone(e);return r?t.keywords=G(t):t.keywords={},t}function pe(e,r,t,s){return e?[v("Ingredients",e.ingredients,e.keywords,r,t,s),v("Instructions",e.instructions,e.keywords,r,t,s),v("Notes",e.notes,e.keywords,r,t,s)]:[]}function v(e,r,t,s,n,o){let u=[],i={text:e,level:2,rows:[]};if(r.length){u.push(i);for(let l of r){if(l.startsWith(x))l=l.substr(x.length);else if(l.startsWith($)){l=l.substr($.length),u.push(i={level:3,text:L(l),rows:[]}),u.push(i);continue}else if(l.startsWith(k)){l=l.substr(k.length),u.push(i={level:4,text:L(l),rows:[]});continue}i.rows.push({fragments:ne(l,t,s),id:Y("row")})}for(let l of u)for(let f of l.rows)for(let a of f.fragments)switch(a.type){case h.Ingredient:a.id=Z(t,a.text);break;case h.Amount:let p=a.text,g=K(p,o,n);g===null?a.failed=!0:g!==p&&(a.text=g,a.converted=!0);break}}return u}function he(e){let r=A();for(let t of r)if(t.id===e)return t;return null}function A(){try{let e=localStorage.getItem(I.SHOPPING_LISTS);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function me(e){let r=A();for(let t=0;t<r.length;t++)if(r[t].id===e.id){r[t]=e;break}M(r)}function de(e){let r=A(),t=0;for(let n of r)n.id>t&&(t=n.id);let s=t+1;return e.id=s,r.push(e),M(r),s}function M(e){localStorage.setItem(I.SHOPPING_LISTS,JSON.stringify(e))}function be(e,r,t=!0){return r||(r=A()),r=r.filter(s=>s.id!==e),t&&M(r),r}export{h as F,I as K,c as U,A as a,be as b,he as c,se as d,de as e,ue as f,S as g,B as h,pe as i,ge as j,ce as k,ae as l,fe as t,me as u};
