import{k as D,l as P,j as R,m as B,o as T,p as q,q as L,t as M,v as F,f as E,u as ee,w as te,c as re}from"./CqYdvAM_.js";import{d as G,t as U,f as ne,a as O,c as se,s as ie}from"./C5dGu9yi.js";import{p as z,c as I,r as v,t as X,a as J,f as le,s as W}from"./BSUmbuiv.js";import{i as oe}from"./woAu7JmU.js";import{s as ae,t as j,f as S}from"./DO6pnziH.js";var w=(e=>(e.PREFERENCES="preferences",e.RECIPES="recipes",e.TABS="tabs",e))(w||{}),c=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(c||{}),d=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(d||{});const k="### ",A="#### ",_="   - ",ue=D(String.raw`
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
	)`),N={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:c.ANY},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:c.IMPERIAL},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:c.IMPERIAL,converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:c.IMPERIAL,converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:c.METRIC},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:c.METRIC,converters:{cup:e=>B(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:c.METRIC},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:c.METRIC,converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:c.METRIC,join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:c.IMPERIAL,join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:c.IMPERIAL,converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:c.IMPERIAL},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:c.METRIC},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:c.IMPERIAL,converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function ce(e,t,n,l){e.alias&&(e=N[e.alias]);let r=t*l;if(e.ignore_scale&&(r=t),!(n===c.ANY||n===c.ORIGINAL)&&n!==e.unit)if(e.converters){let o=Object.keys(e.converters)[0];r=e.converters[o](r),e=N[o]}else return null;return r=B(r,2,!0),!e.plural||typeof r=="string"||r<=1.1?e.join?`${r}${e.singular}`:`${r} ${e.singular}`:e.join?`${r}${e.plural}`:`${r} ${e.plural}`}function fe(e,t,n){if(P(e))return R(t,1)&&n===c.ORIGINAL?e:null;for(let s of Object.values(N))if(s.regex.exec(e)!=null&&s.skip)return e;let l=s=>{if(s=s.trim(),P(s))return Number(s);let i=s.match(/^([0-9]+)\/([0-9]+)$/);return i?Number(i[1])/Number(i[2]):(i=s.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),i?Number(i[1])+Number(i[2])/Number(i[3]):NaN)};e=e.replace(/ and /," ");let r=e.match(new RegExp(D(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(r==null)return R(t,1)&&n===c.ORIGINAL?e:null;let o=e;for(let s=0;s<r.length;s++){let i=r[s];r[s]=l(i),e=e.replace(i,"").trim()}let a=r.reduce((s,i)=>s+i,0);if(a<0||isNaN(a))return R(t,1)&&n===c.ORIGINAL?o:null;for(let s of Object.values(N))if(s.regex.exec(e)!=null){let i=ce(s,a,n,t);if(i)return i}return null}var p=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(p||{});function ge(e){let t={};for(let r of[e.ingredients,e.instructions])pe(r,t,[{kw_type:p.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:p.Amount,regex:new RegExp(ue,"gi")}]);for(let r=0;r<e.ingredients.length;r++){let o=e.ingredients[r];if(o.startsWith(_)){o=o.replace(_,"");{let a=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const s=o.match(a);if(s){let i=s[s.length-1].trim();o=o.replace(i,`**${i}**`),i=i.toLowerCase(),t[i]=p.Ingredient;let f=i.split(" ");for(let u=1;f.length-u>0;u++){let m=T(i,f.length-u);t[m]=p.Ingredient}}}}e.ingredients[r]=o}let n=Object.keys(t);n.sort(q);for(let r=0;r<e.instructions.length;r++){let o=e.instructions[r];for(let a of n)o=L(o,s=>(s=s.replaceAll(new RegExp(String.raw`\b${a}\b`,"gi"),`**${a}**`),s));e.instructions[r]=o}let l=/(\b[0-9]+)\b/gi;for(let r of[e.ingredients,e.instructions])for(let o=0;o<r.length;o++){let a=r[o];a=a.split(/(\*\*[^\*]+\*\*)/).map(s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;let i=s.match(l);if(i){s=s.replaceAll(l,"**$1**");for(let f of i)t[f]=p.Amount}return s}).join(""),r[o]=a}return t}function pe(e,t,n){for(let l=0;l<e.length;l++)for(let r of n){let o=r.regex,a=r.kw_type;e[l]=L(e[l],s=>{if(s.startsWith("**")&&s.endsWith("**"))return s;const i=[...new Set(s.match(o)||[])];i.sort(q);for(let f of i){let u=f.trim();!u.length||P(u)||(s=L(s,m=>m.replaceAll(u,`**${u}**`)),u=u.toLowerCase(),t[u]=a)}return s})}}function H(e){if(e.nodeName.startsWith("H")){let n=!0;for(;n;){n=!1;for(let l of e.children)l.nodeName=="DIV"&&(e.removeChild(l),n=!0)}}return Y(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function me(e,t,n){let r=new DOMParser().parseFromString(t,"text/html"),o=d.None,a=null,s={},i=[],f=[],u=[];n=n||be(r);let m=[...r.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],x=Math.max(0,m.filter(h=>V(h)>2).map(h=>H(h)).findLastIndex(h=>h.toLowerCase()==="ingredients"||h.toLowerCase()==="gather your ingredients")),K=new Set;for(let h=x;h<m.length;h++){let b=m[h];if(!b.parentNode||(b.nodeName.startsWith("H")&&b.nodeName==a&&(o=d.None),he(K,b)))continue;let g=H(b);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":o=d.Ingredients,a=b.nodeName;continue;case"instructions":o=d.Instructions,a=b.nodeName;continue;case"notes":o=d.Notes,a=b.nodeName;continue}switch(b.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${k}${g}`;break;default:g=`${_}${g}`;break}switch(o){case d.Ingredients:i.push(g);break;case d.Instructions:if(g.startsWith(_)){let $=g.replace(_,"").match(/^([^\.\:]+):(.+)/);$?(f.push(`${A}${$[1]}`),f.push(`${_}${$[2]}`)):f.push(g)}break;case d.Notes:u.push(g);break}}return{title:n,ingredients:i,instructions:f,notes:u,keywords:s,url:e}}function V(e,t=0){const n=t+1;let l=n;for(let r of e.children)l=Math.max(l,V(r,n));return l}function he(e,t){for(let n of[t,...t.querySelectorAll("*")]){if(e.has(n))return!0;e.add(n)}return!1}function be(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function Y(e){return[...e.childNodes].map(t=>t.childNodes.length?Y(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function y(e,t,n){let l="";if(e.length){l+=`

## ${n}
`;for(let r of e)r.startsWith(k)||r.startsWith(A)?r=`

${r}
`:l+=`
${r}`}return l}function Me(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=y(e.ingredients,e.keywords,"Ingredients"),t+=y(e.instructions,e.keywords,"Instructions"),t+=y(e.notes,e.keywords,"Notes"),t.trim()}function de(e,t,n){if(!n)return[{type:p.Plain,text:M(e)}];let l=[];for(let r of e.split(/(\*\*[^\*]+\*\*)/))if(r)if(r.startsWith("**")&&r.endsWith("**"))r=r.replace(/^\*\*/,"").replace(/\*\*$/,""),l.push({text:r,type:t[r.toLowerCase()]||p.Unknown});else{let o=r;for(let a of o.split(/(\*[^\*]+\*)/))a&&(a.startsWith("*")&&a.endsWith("*")?(a=a.replace(/^\*/,"").replace(/\*$/,""),l.push({type:p.Italic,text:a})):l.push({type:p.Plain,text:a}))}return l}function Z(){try{let e=JSON.parse(localStorage.getItem(w.RECIPES)||"[]");return e.length===0&&(e=JSON.parse(localStorage.getItem(w.TABS)||"[]").map(t=>({...t.data,url:t.url}))),e}catch(e){return console.error(e),[]}}function Q(e){localStorage.setItem(w.RECIPES,JSON.stringify(e))}function _e(e){let t=Z();for(let n of t)if(n.url===e)return n;return null}function xe(e,t=!0){let n=Z();return n=Ie(n,e.url,!1),n.push(e),t&&Q(n),n}function Ie(e,t,n=!0){return e=e.filter(l=>l.url!==t),n&&Q(e),e}async function Oe(e,t="",n=!1){if(!e||!F(e))return E("ERROR","error"),null;if(!n){let r=_e(e);if(r)return r}let l=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(l.status!==200)E("ERROR","error");else{let r=await l.text(),o=me(e,r,t);return xe(o),E("Done!","success"),o}return null}function We(e,t){if(!e)return null;let n=structuredClone(e);return t?n.keywords=ge(n):n.keywords={},n}function je(e,t,n,l){return e?[C("Ingredients",e.ingredients,e.keywords,t,n,l),C("Instructions",e.instructions,e.keywords,t,n,l),C("Notes",e.notes,e.keywords,t,n,l)]:[]}function C(e,t,n,l,r,o){let a=[],s={text:e,level:2,rows:[]};if(t.length){a.push(s);for(let i of t){if(i.startsWith(_))i=i.substr(_.length);else if(i.startsWith(k)){i=i.substr(k.length),a.push(s={level:3,text:M(i),rows:[]}),a.push(s);continue}else if(i.startsWith(A)){i=i.substr(A.length),a.push(s={level:4,text:M(i),rows:[]});continue}s.rows.push({fragments:de(i,n,l),id:ee("row")})}for(let i of a)for(let f of i.rows)for(let u of f.fragments)switch(u.type){case p.Ingredient:u.id=te(n,u.text);break;case p.Amount:let m=u.text,x=fe(m,o,r);x===null?u.failed=!0:x!==m&&(u.text=x,u.converted=!0);break}}return a}var ve=(e,t)=>{e.stopPropagation(),t.click()},we=U('<div tabindex="0" role="button"><!></div>');function ke(e,t){z(t,!0);const n=200;var l=we();let r;l.__click=[ve,t];var o=I(l);{var a=s=>{var i=se(),f=le(i);re(f,()=>t.content),O(s,i)};oe(o,s=>{t.content&&s(a)})}v(l),X(s=>r=ae(l,1,"overlay svelte-12wfb56",null,r,s),[()=>({transparent:t.transparent})]),ne("keypress",l,()=>{}),j(1,l,()=>S,()=>({duration:n})),j(2,l,()=>S,()=>({duration:n})),O(e,l),J()}G(["click"]);var Ae=(e,t)=>{e.stopPropagation(),t.cancel()},Ne=(e,t)=>{e.stopPropagation(),t.accept()},$e=U('<div class="popup flex-col svelte-j6dfj6"><h1> </h1> <div class="mla"><button>Cancel</button> <button>Accept</button></div></div>');function Se(e,t){z(t,!0),ke(e,{get click(){return t.cancel},content:l=>{var r=$e(),o=I(r),a=I(o,!0);v(o);var s=W(o,2),i=I(s);i.__click=[Ae,t];var f=W(i,2);f.__click=[Ne,t],v(s),v(r),X(()=>ie(a,t.text)),O(l,r)},$$slots:{content:!0}}),J()}G(["click"]);export{p as F,w as K,ke as O,Se as P,c as U,je as a,Me as b,Ie as d,We as f,Z as g,Oe as t};
