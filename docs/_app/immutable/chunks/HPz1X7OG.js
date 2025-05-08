import{e as S,h as P,j as A,r as j,k as z,l as H,m as L,n as M,v as X,o as N,p as J,q as V}from"./Cg9tSLaE.js";import{d as Y,t as Z,s as Q,a as K}from"./FLHIeY8y.js";import{p as T,a as F,c as R,r as E,s as O,t as ee}from"./BiJ5kvzy.js";import{O as te}from"./hJHgpi8N.js";var I=(e=>(e.PREFERENCES="preferences",e.RECIPES="recipes",e.TABS="tabs",e))(I||{}),c=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(c||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const w="### ",k="#### ",_="   - ",re=S(String.raw`
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
	)`),$={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:c.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:c.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:c.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:c.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:c.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:c.METRIC,converters:{cup:e=>j(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:c.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:c.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:c.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:c.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:c.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:c.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:c.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:c.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function ne(e,t,n,l){e.alias&&(e=$[e.alias]);let r=t*l;if(e.ignore_scale&&(r=t),!(n===c.ANY||n===c.ORIGINAL)&&n!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];r=e.converters[o](r),e=$[o]}else return null;return r=j(r,2,!0),!e.plural||typeof r=="string"||r<=1.1?e.join?`${r}${e.singular}`:`${r} ${e.singular}`:e.join?`${r}${e.plural}`:`${r} ${e.plural}`}function se(e,t,n){if(P(e))return A(t,1)&&n===c.ORIGINAL?e:null;for(let s of Object.values($))if(s.regex.exec(e)!=null&&s.skip)return e;let l=s=>{if(s=s.trim(),P(s))return Number(s);let i=s.match(/^([0-9]+)\/([0-9]+)$/);return i?Number(i[1])/Number(i[2]):(i=s.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),i?Number(i[1])+Number(i[2])/Number(i[3]):NaN)};e=e.replace(/ and /," ");let r=e.match(new RegExp(S(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(r==null)return A(t,1)&&n===c.ORIGINAL?e:null;let o=e;for(let s=0;s<r.length;s++){let i=r[s];r[s]=l(i),e=e.replace(i,"").trim()}let u=r.reduce((s,i)=>s+i,0);if(u<0||isNaN(u))return A(t,1)&&n===c.ORIGINAL?o:null;for(let s of Object.values($))if(s.regex.exec(e)!=null){let i=ne(s,u,n,t);if(i)return i}return null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(p||{});function ie(e){let t={};for(let r of[e.ingredients,e.instructions])le(r,t,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Amount,regex:new RegExp(re,"gi")}]);for(let r=0;r<e.ingredients.length;r++){let o=e.ingredients[r];if(o.startsWith(_)){o=o.replace(_,"");{let u=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const s=o.match(u);if(s){let i=s[s.length-1].trim();o=o.replace(i,`**${i}**`),i=i.toLowerCase(),t[i]=p.Ingredient;let f=i.split(" ");for(let a=1;f.length-a>0;a++){let h=z(i,f.length-a);t[h]=p.Ingredient}}}}e.ingredients[r]=o}let n=Object.keys(t);n.sort(H);for(let r=0;r<e.instructions.length;r++){let o=e.instructions[r];for(let u of n)o=L(o,s=>(s=s.replaceAll(new RegExp(String.raw`\b${u}\b`,"gi"),`**${u}**`),s));e.instructions[r]=o}let l=/(\b[0-9]+)\b/gi;for(let r of[e.ingredients,e.instructions])for(let o=0;o<r.length;o++){let u=r[o];u=u.split(/(\*\*[^\*]+\*\*)/).map(s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;let i=s.match(l);if(i){s=s.replaceAll(l,"**$1**");for(let f of i)t[f]=p.Amount}return s}).join(""),r[o]=u}return t}function le(e,t,n){for(let l=0;l<e.length;l++)for(let r of n){let o=r.regex,u=r.kw_type;e[l]=L(e[l],s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;const i=[...new Set(s.match(o)||[])];i.sort(H);for(let f of i){let a=f.trim();!a.length||P(a)||(s=L(s,h=>h.replaceAll(a,`**${a}**`)),a=a.toLowerCase(),t[a]=u)}return s})}}function W(e){if(e.nodeName.startsWith("H")){let n=!0;for(;n;){n=!1;for(let l of e.children)l.nodeName=="DIV"&&(e.removeChild(l),n=!0)}}return B(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function oe(e,t,n){let r=new DOMParser().parseFromString(t,"text/html"),o=d.None,u=null,s={},i=[],f=[],a=[];n=n||ae(r);let h=[...r.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],x=Math.max(0,h.filter(m=>D(m)>2).map(m=>W(m)).findLastIndex(m=>m.toLowerCase()==="ingredients"||m.toLowerCase()==="gather your ingredients")),U=new Set;for(let m=x;m<h.length;m++){let b=h[m];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==u&&(o=d.None),ue(U,b)))continue;let g=W(b);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":o=d.Ingredients,u=b.nodeName;continue;case"instructions":o=d.Instructions,u=b.nodeName;continue;case"notes":o=d.Notes,u=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${w}${g}`;break;default:g=`${_}${g}`;break}switch(o){case d.Ingredients:i.push(g);break;case d.Instructions:if(g.startsWith(_)){let v=g.replace(_,"").match(/^([^\.\:]+):(.+)/);v?(f.push(`${k}${v[1]}`),f.push(`${_}${v[2]}`)):f.push(g)}break;case d.Notes:a.push(g);break}}return{title:n,ingredients:i,instructions:f,notes:a,keywords:s,url:e}}function D(e,t=0){const n=t+1;let l=n;for(let r of e.children)l=Math.max(l,D(r,n));return l}function ue(e,t){for(let n of[t,...t.querySelectorAll("*")]){if(e.has(n))return!0;e.add(n)}return!1}function ae(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function B(e){return[...e.childNodes].map(t=>t.childNodes.length?B(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function y(e,t,n){let l="";if(e.length){l+=`

## ${n}
`;for(let r of e)r.startsWith(w)||r.startsWith(k)?r=`

${r}
`:l+=`
${r}`}return l}function ke(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=y(e.ingredients,e.keywords,"Ingredients"),t+=y(e.instructions,e.keywords,"Instructions"),t+=y(e.notes,e.keywords,"Notes"),t.trim()}function ce(e,t,n){if(!n)return[{type:p.Plain,text:M(e)}];let l=[];for(let r of e.split(/(\*\*[^\*]+\*\*)/))if(r)if(r.startsWith("**")&&r.endsWith("**"))r=r.replace(/^\*\*/,"").replace(/\*\*$/,""),l.push({text:r,type:t[r.toLowerCase()]||p.Unknown});else{let o=r;for(let u of o.split(/(\*[^\*]+\*)/))u&&(u.startsWith("*")&&u.endsWith("*")?(u=u.replace(/^\*/,"").replace(/\*$/,""),l.push({type:p.Italic,text:u})):l.push({type:p.Plain,text:u}))}return l}function q(){try{let e=JSON.parse(localStorage.getItem(I.RECIPES)||"[]");return e.length===0&&(e=JSON.parse(localStorage.getItem(I.TABS)||"[]").map(t=>({...t.data,url:t.url}))),e}catch(e){return console.error(e),[]}}function G(e){localStorage.setItem(I.RECIPES,JSON.stringify(e))}function fe(e){let t=q();for(let n of t)if(n.url===e)return n;return null}function ge(e,t=!0){let n=q();return n=pe(n,e.url,!1),n.push(e),t&&G(n),n}function pe(e,t,n=!0){return e=e.filter(l=>l.url!==t),n&&G(e),e}async function $e(e,t="",n=!1){if(!e||!X(e))return N("ERROR","error"),null;if(!n){let r=fe(e);if(r)return r}let l=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(l.status!==200)N("ERROR","error");else{let r=await l.text(),o=oe(e,r,t);return ge(o),N("Done!","success"),o}return null}function ve(e,t){if(!e)return null;let n=structuredClone(e);return t?n.keywords=ie(n):n.keywords={},n}function Ae(e,t,n,l){return e?[C("Ingredients",e.ingredients,e.keywords,t,n,l),C("Instructions",e.instructions,e.keywords,t,n,l),C("Notes",e.notes,e.keywords,t,n,l)]:[]}function C(e,t,n,l,r,o){let u=[],s={text:e,level:2,rows:[]};if(t.length){u.push(s);for(let i of t){if(i.startsWith(_))i=i.substr(_.length);else if(i.startsWith(w)){i=i.substr(w.length),u.push(s={level:3,text:M(i),rows:[]}),u.push(s);continue}else if(i.startsWith(k)){i=i.substr(k.length),u.push(s={level:4,text:M(i),rows:[]});continue}s.rows.push({fragments:ce(i,n,l),id:J("row")})}for(let i of u)for(let f of i.rows)for(let a of f.fragments)switch(a.type){case p.Ingredient:a.id=V(n,a.text);break;case p.Amount:let h=a.text,x=se(h,o,r);x===null?a.failed=!0:x!==h&&(a.text=x,a.converted=!0);break}}return u}var he=(e,t)=>{e.stopPropagation(),t.cancel()},me=(e,t)=>{e.stopPropagation(),t.accept()},be=Z('<div class="flex-col"><h1> </h1> <div class="mla"><button>Cancel</button> <button>Accept</button></div></div>');function Ne(e,t){T(t,!0),te(e,{get click(){return t.cancel},content:l=>{var r=be(),o=R(r),u=R(o,!0);E(o);var s=O(o,2),i=R(s);i.__click=[he,t];var f=O(i,2);f.__click=[me,t],E(s),E(r),ee(()=>Q(u,t.text)),K(l,r)},$$slots:{content:!0}}),F()}Y(["click"]);export{p as F,I as K,Ne as P,c as U,Ae as a,ke as b,pe as d,ve as f,q as g,$e as t};
