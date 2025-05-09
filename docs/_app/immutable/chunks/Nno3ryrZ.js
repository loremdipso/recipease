import{o as Ne,a5 as pe,C as xe,a4 as A,U as Ie,l as E,z as Ae,aD as Se,am as Ee,aE as Re,aF as Le,aG as Oe,J as re,aH as Ce,aI as Pe,a9 as je,j as We,aJ as De,aK as Te,aL as He,aM as Me,G as Ue,as as ne,at as ie,au as qe}from"./BTTZyrIm.js";import{a as ze,b as Ge,w as Be}from"./DwbyuCu5.js";import{w as G}from"./Nz4L-11l.js";import{g as B,b as Je,r as Fe}from"./D21rpVqy.js";function At(e,t,...r){var n=e,i=A,s;Ne(()=>{i!==(i=t())&&(s&&(Ie(s),s=null),s=xe(()=>i(n,...r)))},pe),E&&(n=Ae)}function ge(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=ge(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function Xe(){for(var e,t,r=0,n="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=ge(e))&&(n&&(n+=" "),n+=t);return n}function St(e){return typeof e=="object"?Xe(e):e??""}const se=[...` 	
\r\f \v\uFEFF`];function Ke(e,t,r){var n=e==null?"":""+e;if(t&&(n=n?n+" "+t:t),r){for(var i in r)if(r[i])n=n?n+" "+i:i;else if(n.length)for(var s=i.length,a=0;(a=n.indexOf(i,a))>=0;){var o=a+s;(a===0||se.includes(n[a-1]))&&(o===n.length||se.includes(n[o]))?n=(a===0?"":n.substring(0,a))+n.substring(o+1):a=o}}return n===""?null:n}function ae(e,t=!1){var r=t?" !important;":";",n="";for(var i in e){var s=e[i];s!=null&&s!==""&&(n+=" "+i+": "+s+r)}return n}function Et(e,t){if(t){var r="",n,i;return Array.isArray(t)?(n=t[0],i=t[1]):n=t,n&&(r+=ae(n)),i&&(r+=ae(i,!0)),r=r.trim(),r===""?null:r}return String(e)}function Rt(e,t,r,n,i,s){var a=e.__className;if(E||a!==r||a===void 0){var o=Ke(r,n,s);(!E||o!==e.getAttribute("class"))&&(o==null?e.removeAttribute("class"):e.className=o),e.__className=r}else if(s&&i!==s)for(var l in s){var c=!!s[l];(i==null||c!==!!i[l])&&e.classList.toggle(l,c)}return s}const Qe=Symbol("is custom element"),Ve=Symbol("is html");function Lt(e){if(E){var t=!1,r=()=>{if(!t){if(t=!0,e.hasAttribute("value")){var n=e.value;oe(e,"value",null),e.value=n}if(e.hasAttribute("checked")){var i=e.checked;oe(e,"checked",null),e.checked=i}}};e.__on_r=r,Le(r),ze()}}function Ot(e,t){var r=_e(e);r.checked!==(r.checked=t??void 0)&&(e.checked=t)}function oe(e,t,r,n){var i=_e(e);E&&(i[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||i[t]!==(i[t]=r)&&(t==="loading"&&(e[Oe]=r),r==null?e.removeAttribute(t):typeof r!="string"&&Ze(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function _e(e){return e.__attributes??(e.__attributes={[Qe]:e.nodeName.includes("-"),[Ve]:e.namespaceURI===Se})}var le=new Map;function Ze(e){var t=le.get(e.nodeName);if(t)return t;le.set(e.nodeName,t=[]);for(var r,n=e,i=Element.prototype;i!==n;){r=Re(n);for(var s in r)r[s].set&&t.push(s);n=Ee(n)}return t}const Ye=()=>performance.now(),y={tick:e=>requestAnimationFrame(e),now:()=>Ye(),tasks:new Set};function he(){const e=y.now();y.tasks.forEach(t=>{t.c(e)||(y.tasks.delete(t),t.f())}),y.tasks.size!==0&&y.tick(he)}function et(e){let t;return y.tasks.size===0&&y.tick(he),{promise:new Promise(r=>{y.tasks.add(t={c:e,f:r})}),abort(){y.tasks.delete(t)}}}function O(e,t){Be(()=>{e.dispatchEvent(new CustomEvent(t))})}function tt(e){if(e==="float")return"cssFloat";if(e==="offset")return"cssOffset";if(e.startsWith("--"))return e;const t=e.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function ue(e){const t={},r=e.split(";");for(const n of r){const[i,s]=n.split(":");if(!i||s===void 0)break;const a=tt(i.trim());t[a]=s.trim()}return t}const rt=e=>e;function Ct(e,t,r,n){var i=(e&Te)!==0,s=(e&He)!==0,a=i&&s,o=(e&De)!==0,l=a?"both":i?"in":"out",c,u=t.inert,d=t.style.overflow,p,h;function f(){var b=qe,R=re;ne(null),ie(null);try{return c??(c=r()(t,(n==null?void 0:n())??{},{direction:l}))}finally{ne(b),ie(R)}}var _={is_global:o,in(){var b;if(t.inert=u,!i){h==null||h.abort(),(b=h==null?void 0:h.reset)==null||b.call(h);return}s||p==null||p.abort(),O(t,"introstart"),p=M(t,f(),h,1,()=>{O(t,"introend"),p==null||p.abort(),p=c=void 0,t.style.overflow=d})},out(b){if(!s){b==null||b(),c=void 0;return}t.inert=!0,O(t,"outrostart"),h=M(t,f(),p,0,()=>{O(t,"outroend"),b==null||b()})},stop:()=>{p==null||p.abort(),h==null||h.abort()}},g=re;if((g.transitions??(g.transitions=[])).push(_),i&&Ge){var k=o;if(!k){for(var m=g.parent;m&&(m.f&pe)!==0;)for(;(m=m.parent)&&(m.f&Ce)===0;);k=!m||(m.f&Pe)!==0}k&&je(()=>{We(()=>_.in())})}}function M(e,t,r,n,i){var s=n===1;if(Me(t)){var a,o=!1;return Ue(()=>{if(!o){var g=t({direction:s?"in":"out"});a=M(e,g,r,n,i)}}),{abort:()=>{o=!0,a==null||a.abort()},deactivate:()=>a.deactivate(),reset:()=>a.reset(),t:()=>a.t()}}if(r==null||r.deactivate(),!(t!=null&&t.duration))return i(),{abort:A,deactivate:A,reset:A,t:()=>n};const{delay:l=0,css:c,tick:u,easing:d=rt}=t;var p=[];if(s&&r===void 0&&(u&&u(0,1),c)){var h=ue(c(0,1));p.push(h,h)}var f=()=>1-n,_=e.animate(p,{duration:l});return _.onfinish=()=>{var g=(r==null?void 0:r.t())??1-n;r==null||r.abort();var k=n-g,m=t.duration*Math.abs(k),b=[];if(m>0){var R=!1;if(c)for(var Y=Math.ceil(m/16.666666666666668),W=0;W<=Y;W+=1){var ee=g+k*d(W/Y),te=ue(c(ee,1-ee));b.push(te),R||(R=te.overflow==="hidden")}R&&(e.style.overflow="hidden"),f=()=>{var L=_.currentTime;return g+k*d(L/m)},u&&et(()=>{if(_.playState!=="running")return!1;var L=f();return u(L,1-L),!0})}_=e.animate(b,{duration:m,fill:"forwards"}),_.onfinish=()=>{f=()=>n,u==null||u(n,1-n),i()}},{abort:()=>{_&&(_.cancel(),_.effect=null,_.onfinish=A)},deactivate:()=>{i=A},reset:()=>{n===0&&(u==null||u(1,0))},t:()=>f()}}const nt=e=>e;function it(e){const t=e-1;return t*t*t+1}function ce(e){const t=typeof e=="string"&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[e,"px"]}function Pt(e,{delay:t=0,duration:r=400,easing:n=nt}={}){const i=+getComputedStyle(e).opacity;return{delay:t,duration:r,easing:n,css:s=>`opacity: ${s*i}`}}function jt(e,{delay:t=0,duration:r=400,easing:n=it,x:i=0,y:s=0,opacity:a=0}={}){const o=getComputedStyle(e),l=+o.opacity,c=o.transform==="none"?"":o.transform,u=l*(1-a),[d,p]=ce(i),[h,f]=ce(s);return{delay:t,duration:r,easing:n,css:(_,g)=>`
			transform: ${c} translate(${(1-_)*d}${p}, ${(1-_)*h}${f});
			opacity: ${l-u*g}`}}function U(e){return e.replaceAll("**","")}function de(e,t=1){let r=e.split(" ");for(;r.length>t;)r.shift();return r.join(" ")}function J(e){return e.replaceAll(/^\s+(\/\/.*)?/gm,"").replaceAll(`
`,"")}function F(e,t,r=!1){if(typeof e=="string")return e;if(e*=10**t,e=Math.round(e),e/=10**t,r){if($(e,1/2))return"1/2";if($(e,1/3))return"1/3";if($(e,1/4))return"1/4";if($(e,1/8))return"1/8";if($(e,2/3))return"2/3";if($(e,3/4))return"3/4"}return e}function X(e){return!isNaN(Number(e))&&!isNaN(parseFloat(e))}function $(e,t){return Math.abs(e-t)<.01}function q(e,t){return e.split(/(\*\*[^\*]+\*\*)/).map(r=>r.startsWith("**")&&r.endsWith("**")?r:t(r)).join("")}function st(e,t){t=t.toLowerCase();let r=de(t);return e[r]?r:t.replaceAll(/\s/g,"_")}let at=0;const ot=e=>`${e}_${++at}`;function me(e,t){return t.length-e.length}function be(e){if(!e||!e.length||e.length>500)return!1;try{let t=new URL(e);return t.protocol==="http:"||t.protocol==="https:"}catch{return!1}}function Wt(e){return new URL(document.location).searchParams.get(e)}function Dt(e,t){const r=new URL(window.location.href);r.searchParams.set(e,t),Fe(r.toString(),{})}function Tt(){let e=new URL(document.location),t=e.searchParams.get("link")||e.searchParams.get("description")||e.searchParams.get("url");return t?decodeURI(t):null}async function Ht(){const e=await navigator.clipboard.read();e:for(const t of e)for(const r of t.types){const i=await(await t.getType(r)).text();if(be(i))return S("Loading..."),i;break e}S("Didn't find a recipe url in your clipboard. Sorry bud :/")}async function Mt(e,t){await B(K(e,t),{state:{is_going_back:!0}})}async function Ut(e,t){await B(K(e,t),{})}async function qt(e,t){await B(K(e,t==null?void 0:t.query_params),{state:{...t==null?void 0:t.page_data}})}function K(e,t){e.startsWith("/")||(e=`/${e}`);let r=`${Je}${e}`;if(t){let n=new URLSearchParams;for(let i of Object.keys(t))n.append(i,t[i]);r+=`?${n.toString()}`}return r}const D="recipease_";var I=(e=>(e.PREFERENCES=`${D}preferences`,e.RECIPES="recipes",e.SHOPPING_LISTS=`${D}shopping_lists`,e.LAST_LIST_ID=`${D}last_list_id`,e))(I||{}),lt=(e=>(e.IMPERIAL="imperial",e.ORIGINAL="original",e.METRIC="metric",e.ANY="any",e))(lt||{}),w=(e=>(e[e.None=0]="None",e[e.Ingredients=1]="Ingredients",e[e.Instructions=2]="Instructions",e[e.Notes=3]="Notes",e))(w||{});const C="### ",P="#### ",N="   - ",ut=J(String.raw`
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
	)`),x={teaspoon:{regex:/^teaspoon[s]?$/i,alias:"tsp"},pint:{regex:/^pint[s]?$/i,singular:"pint",plural:"pints"},stick:{regex:/^stick[s]?$/i,singular:"stick",plural:"sticks",unit:"any"},lb:{regex:/^lb[s]?$/i,singular:"lb",plural:"lbs",unit:"imperial"},tablespoon:{regex:/^tablespoon[s]?$/i,alias:"tbsp"},tbsp:{regex:/^tbsp[s]?$/i,singular:"tbsp",unit:"imperial",converters:{ml:e=>e*14.787}},tsp:{regex:/^tsp[s]?$/i,singular:"tsp",unit:"imperial",converters:{ml:e=>e*4.929}},oz:{regex:/^oz[s]?$/i,singular:"oz",unit:"metric"},ml:{regex:/^ml[s]?$/i,singular:"ml",unit:"metric",converters:{cup:e=>F(e/236.6,1)}},grams:{regex:/^g[s]?$/i,singular:"g",plural:"g",join:!0,unit:"metric"},cm:{regex:/^cm[s]?$/i,singular:"cm",unit:"metric",converters:{inch:e=>e/2.54}},celsius:{regex:/°C?$/i,singular:"°C",unit:"metric",join:!0,ignore_scale:!0,converters:{fahrenheit:e=>e*9/5+32}},fahrenheit:{regex:/°F?$/i,singular:"°F",unit:"imperial",join:!0,ignore_scale:!0,converters:{celsius:e=>(e-32)*5/9}},cup:{regex:/^cup[s]?$/i,singular:"cup",plural:"cups",unit:"imperial",converters:{ml:e=>e*236.5882365}},quart:{regex:/^quart[s]?$/i,singular:"quart",plural:"quarts",unit:"imperial"},ounce:{regex:/^ounce[s]?$/i,singular:"ounce",plural:"ounces",unit:"metric"},inch_alt:{regex:/^inch(?:es)?$/i,alias:"inch"},inch:{regex:/^"$/i,singular:" inch",plural:" inche",join:!0,unit:"imperial",converters:{cm:e=>e*2.54}},hour:{regex:/hour[s]?$/i,skip:!0},minute:{regex:/minute[s]?$/i,skip:!0},day:{regex:/day[s]?$/i,skip:!0}};function ct(e,t,r,n){e.alias&&(e=x[e.alias]);let i=t*n;if(e.ignore_scale&&(i=t),!(r==="any"||r==="original")&&r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];i=e.converters[s](i),e=x[s]}else return null;return i=F(i,2,!0),!e.plural||typeof i=="string"||i<=1.1?e.join?`${i}${e.singular}`:`${i} ${e.singular}`:e.join?`${i}${e.plural}`:`${i} ${e.plural}`}function zt(e,t,r,n){e.alias&&(e=x[e.alias]);let i=t*n;if(e.ignore_scale&&(i=t),!(r==="any"||r==="original")&&r!==e.unit)if(e.converters){let s=Object.keys(e.converters)[0];i=e.converters[s](i),e=x[s]}else return null;return{value:Number(i),def:e}}function Gt(e,t){let r=F(e,2,!0);return!t.plural||typeof r=="string"||r<=1.1?t.join?`${r}${t.singular}`:`${r} ${t.singular}`:t.join?`${r}${t.plural}`:`${r} ${t.plural}`}function ft(e,t,r){if(X(e))return $(t,1)&&r==="original"?e:null;for(let a of Object.values(x))if(a.regex.exec(e)!=null&&a.skip)return e;e=e.replace(/ and /," ");let n=e.match(new RegExp(J(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(n==null)return $(t,1)&&r==="original"?e:null;let i=e;for(let a=0;a<n.length;a++){let o=n[a];n[a]=ve(o),e=e.replace(o,"").trim()}let s=n.reduce((a,o)=>a+o,0);if(s<0||isNaN(s))return $(t,1)&&r==="original"?i:null;for(let a of Object.values(x))if(a.regex.exec(e)!=null){let o=ct(a,s,r,t);if(o)return o}return null}function ve(e){if(e=e.trim(),X(e))return Number(e);let t=e.match(/^([0-9]+)\/([0-9]+)$/);return t?Number(t[1])/Number(t[2]):(t=e.match(/^([0-9])\s([0-9]+)\/([0-9]+)$/),t?Number(t[1])+Number(t[2])/Number(t[3]):NaN)}function Bt(e){for(let n of Object.values(x))if(n.regex.exec(e)!=null&&n.skip)return null;e=e.replace(/ and /," ");let t=e.match(new RegExp(J(String.raw`
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
					(?:\.[0-9]+)*`),"gi"));if(t==null)return null;for(let n=0;n<t.length;n++){let i=t[n];t[n]=ve(i),e=e.replace(i,"").trim()}let r=t.reduce((n,i)=>n+i,0);if(r<0||isNaN(r))return null;for(let n of Object.values(x))if(n.regex.exec(e)!=null)return{value:r,def:n};return null}var v=(e=>(e[e.Unknown=0]="Unknown",e[e.Plain=1]="Plain",e[e.Bold=2]="Bold",e[e.Italic=3]="Italic",e[e.Ingredient=4]="Ingredient",e[e.Temperature=5]="Temperature",e[e.Amount=6]="Amount",e))(v||{});function we(e){let t={};for(let i of[e.ingredients,e.instructions])pt(i,t,[{kw_type:v.Temperature,regex:/(\b[0-9]+°\s*[CF]?\b)/gi},{kw_type:v.Amount,regex:new RegExp(ut,"gi")}]);for(let i=0;i<e.ingredients.length;i++){let s=e.ingredients[i];if(s.startsWith(N)){s=s.replace(N,"");{let a=/^(?:(?:\*\*[^\*\*]+\*\*)+[\s\(\),]*)+([^,^\(^\*]+)/i;const o=s.match(a);if(o){let l=o[o.length-1].trim();s=s.replace(l,`**${l}**`),l=l.toLowerCase(),t[l]=v.Ingredient;let c=l.split(" ");for(let u=1;c.length-u>0;u++){let d=de(l,c.length-u);t[d]=v.Ingredient}}}}e.ingredients[i]=s}let r=Object.keys(t);r.sort(me);for(let i=0;i<e.instructions.length;i++){let s=e.instructions[i];for(let a of r)s=q(s,o=>(o=o.replaceAll(new RegExp(String.raw`\b${a}\b`,"gi"),`**${a}**`),o));e.instructions[i]=s}let n=/(\b[0-9]+)\b/gi;for(let i of[e.ingredients,e.instructions])for(let s=0;s<i.length;s++){let a=i[s];a=a.split(/(\*\*[^\*]+\*\*)/).map(o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;let l=o.match(n);if(l){o=o.replaceAll(n,"**$1**");for(let c of l)t[c]=v.Amount}return o}).join(""),i[s]=a}return t}function pt(e,t,r){for(let n=0;n<e.length;n++)for(let i of r){let s=i.regex,a=i.kw_type;e[n]=q(e[n],o=>{if(o.startsWith("**")&&o.endsWith("**"))return o;const l=[...new Set(o.match(s)||[])];l.sort(me);for(let c of l){let u=c.trim();!u.length||X(u)||(o=q(o,d=>d.replaceAll(u,`**${u}**`)),u=u.toLowerCase(),t[u]=a)}return o})}}function fe(e){if(e.nodeName.startsWith("H")){let r=!0;for(;r;){r=!1;for(let n of e.children)n.nodeName=="DIV"&&(e.removeChild(n),r=!0)}}return ye(e).replace(/▢/,"").replaceAll(/(\.)([A-Z])/g,"$1 $2").replace(/^(?:Step\s*)?[0-9]+\.\s+/,"").replaceAll(" , ",", ").replaceAll("–","-").replaceAll("”",'"').replaceAll("½","1/2").replaceAll("¾","3/4").replaceAll("⅓","1/3").replaceAll("⅔","2/3").replaceAll("¼","1/4").replaceAll(/([0-9]+)\s+-\s+([0-9]+)/g,"$1-$2").trim()}function gt(e,t,r){let i=new DOMParser().parseFromString(t,"text/html"),s=w.None,a=null,o={},l=[],c=[],u=[];r=r||ht(i);let d=[...i.querySelectorAll("li,p,h1,h2,h3,h4,h5,h6")],p=Math.max(0,d.filter(f=>$e(f)>2).map(f=>fe(f)).findLastIndex(f=>f.toLowerCase()==="ingredients"||f.toLowerCase()==="gather your ingredients")),h=new Set;for(let f=p;f<d.length;f++){let _=d[f];if(!_.parentNode||(_.nodeName.startsWith("H")&&_.nodeName==a&&(s=w.None),_t(h,_)))continue;let g=fe(_);if(!g.length)continue;switch(g.toLowerCase()){case"ingredients":s=w.Ingredients,a=_.nodeName;continue;case"instructions":s=w.Instructions,a=_.nodeName;continue;case"notes":s=w.Notes,a=_.nodeName;continue}switch(_.nodeName){case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"H7":case"H8":case"H9":g=g.replace(/:$/,""),g=`${C}${g}`;break;default:g=`${N}${g}`;break}switch(s){case w.Ingredients:l.push(g);break;case w.Instructions:if(g.startsWith(N)){let m=g.replace(N,"").match(/^([^\.\:]+):(.+)/);m?(c.push(`${P}${m[1]}`),c.push(`${N}${m[2]}`)):c.push(g)}break;case w.Notes:u.push(g);break}}return{title:r,ingredients:l,instructions:c,notes:u,keywords:o,url:e}}function $e(e,t=0){const r=t+1;let n=r;for(let i of e.children)n=Math.max(n,$e(i,r));return n}function _t(e,t){for(let r of[t,...t.querySelectorAll("*")]){if(e.has(r))return!0;e.add(r)}return!1}function ht(e){for(let t of e.querySelectorAll("meta"))if(t.getAttribute("property")==="og:title")return t.getAttribute("content")||"";return""}function ye(e){return[...e.childNodes].map(t=>t.childNodes.length?ye(t):t.textContent).join(" ").replaceAll(/  +/g," ")}function Jt(e,t){let r={},n=[];for(let s of e.items){let a=z(s.recipe_url,t),o=structuredClone(z(s.recipe_url,t));if(a&&o){let l=we(o);for(let c=0;c<o.ingredients.length;c++){let u=o.ingredients[c];if(u.startsWith("#"))continue;let d=null,p=null,h=!1;e:for(let f of u.split(/(\*\*[^\*]+\*\*)/))if(f.startsWith("**")&&f.endsWith("**")&&(f=f.replace(/^\*\*/,"").replace(/\*\*.*/,"").trim(),f))switch(l[f]){case v.Ingredient:if(d){h=!0;break e}d=f;break;case v.Amount:if(p){h=!0;break e}p=f;break}if(h||!d||!p)n.push({text:u,line_number:c,recipe_url:o.url});else{let f=d;r[f]||(r[f]=[]),r[f].push({recipe_count:s.quantity,ingredient_quantity:p,original_line:a.ingredients[c].replace(/^\s*-/,"")})}}}else{let l=`Missing recipe: ${s.recipe_url}`;console.error(l),S(l,"red")}}let i=[];for(let s of Object.keys(r))i.push({name:s,quantities:r[s]});return i.sort((s,a)=>s.name.localeCompare(a.name)),{ingredients:i,errors:n}}function T(e,t,r){let n="";if(e.length){n+=`

## ${r}
`;for(let i of e)i.startsWith(C)||i.startsWith(P)?i=`

${i}
`:n+=`
${i}`}return n}function Ft(e){let t="";return e.title&&(t+=`# ${e.title}
`),t+=T(e.ingredients,e.keywords,"Ingredients"),t+=T(e.instructions,e.keywords,"Instructions"),t+=T(e.notes,e.keywords,"Notes"),t.trim()}function dt(e,t,r){if(!r)return[{type:v.Plain,text:U(e)}];let n=[];for(let i of e.split(/(\*\*[^\*]+\*\*)/))if(i)if(i.startsWith("**")&&i.endsWith("**"))i=i.replace(/^\*\*/,"").replace(/\*\*$/,""),n.push({text:i,type:t[i.toLowerCase()]||v.Unknown});else{let s=i;for(let a of s.split(/(\*[^\*]+\*)/))a&&(a.startsWith("*")&&a.endsWith("*")?(a=a.replace(/^\*/,"").replace(/\*$/,""),n.push({type:v.Italic,text:a})):n.push({type:v.Plain,text:a}))}return n}function Q(){try{let e=localStorage.getItem(I.RECIPES);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function V(e){localStorage.setItem(I.RECIPES,JSON.stringify(e))}function z(e,t=null){t||(t=Q());for(let r of t)if(r.url===e)return r;return null}function mt(e,t=!0){let r=Q();return r=bt(r,e.url,!1),r.push(e),t&&V(r),r}function Xt(e,t=!0){let r=Q();for(let n=0;n<r.length;n++)r[n].url===e.url&&(r[n]=e);return t&&V(r),r}function bt(e,t,r=!0){return e=e.filter(n=>n.url!==t),r&&V(e),e}async function Kt(e,t="",r=!1){if(!e||!be(e))return S("ERROR","error"),null;if(!r){let i=z(e);if(i)return i}let n=await fetch(`https://corsproxy.io/?url=${encodeURI(e)}`);if(n.status!==200)S("ERROR","error");else{let i=await n.text(),s=gt(e,i,t);return mt(s),S("Done!","success"),s}return null}function Qt(e,t){if(!e)return null;let r=structuredClone(e);return t?r.keywords=we(r):r.keywords={},r}function Vt(e,t,r,n){return e?[H("Ingredients",e.ingredients,e.keywords,t,r,n),H("Instructions",e.instructions,e.keywords,t,r,n),H("Notes",e.notes,e.keywords,t,r,n)]:[]}function H(e,t,r,n,i,s){let a=[],o={text:e,level:2,rows:[]};if(t.length){a.push(o);for(let l of t){let c=l;if(l.startsWith(N))l=l.substr(N.length);else if(l.startsWith(C)){l=l.substr(C.length),a.push(o={level:3,text:U(l),rows:[]}),a.push(o);continue}else if(l.startsWith(P)){l=l.substr(P.length),a.push(o={level:4,text:U(l),rows:[]});continue}o.rows.push({original:c,fragments:dt(l,r,n),id:ot("row")})}for(let l of a)for(let c of l.rows)for(let u of c.fragments)switch(u.type){case v.Ingredient:u.id=st(r,u.text);break;case v.Amount:let d=u.text,p=ft(d,s,i);p===null?u.failed=!0:p!==d&&(u.text=p,u.converted=!0);break}}return a}function Zt(e){let t=j();for(let r of t)if(r.id===e)return r;return null}function j(){try{let e=localStorage.getItem(I.SHOPPING_LISTS);if(e)return JSON.parse(e)}catch(e){console.error(e)}return[]}function Yt(e){let t=j();for(let r=0;r<t.length;r++)if(t[r].id===e.id){t[r]=e;break}Z(t)}function er(e){let t=j(),r=0;for(let i of t)i.id>r&&(r=i.id);let n=r+1;return e.id=n,t.push(e),Z(t),n}function Z(e){localStorage.setItem(I.SHOPPING_LISTS,JSON.stringify(e))}function tr(e,t,r=!0){return t||(t=j()),t=t.filter(n=>n.id!==e),r&&Z(t),t}function rr(e){localStorage.setItem(I.LAST_LIST_ID,JSON.stringify(e)),$t.set(e)}function vt(){try{let e=localStorage.getItem(I.LAST_LIST_ID);if(e)return JSON.parse(e)}catch{}return null}let wt=0;const ke=G([]);function S(e,t=""){ke.update(r=>[...r,{text:e,extra_class:t,id:++wt}])}function nr(e){ke.update(t=>{let r=[...t];for(let n=0;n<r.length;n++)r[n]&&r[n]===e&&(r.splice(n,1),n-=1);return r})}const $t=G(vt()),yt=G(null);window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),yt.set(e)});export{Qt as A,yt as B,Jt as C,z as D,Bt as E,v as F,zt as G,Gt as H,nr as I,ke as J,jt as K,Et as L,I as M,S as N,Kt as O,Xt as P,Tt as Q,$ as R,Ft as S,Z as T,lt as U,Q as a,Rt as b,Mt as c,bt as d,Ut as e,Ht as f,K as g,qt as h,j as i,tr as j,At as k,$t as l,Wt as m,X as n,rr as o,Ot as p,Zt as q,Lt as r,oe as s,er as t,Dt as u,Yt as v,Ct as w,Pt as x,St as y,Vt as z};
