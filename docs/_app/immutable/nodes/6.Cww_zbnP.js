import{t as o,a}from"../chunks/DfJHpaG0.js";import"../chunks/6r4C-eSS.js";import{f as i,n}from"../chunks/lFWVB5Ug.js";import{T as r}from"../chunks/Bm0JD8Di.js";var h=o(`<!> <main><div class="card flex-col gap1 mt1"><p>Short version: I don't collect any of your data. Not even Google
			Analytics. And that's not just because I think your data is boring
			and I don't want to, but also you can't make me.</p> <p>Slightly longer version, because "we value your privacy" means
			nothing without the details:</p> <h3>No account, no tracking</h3> <p>There's no sign-up, no login, no cookies, no analytics, no ad
			network, and no third-party scripts watching you scroll. I don't
			know who you are and I'd like to keep it that way.</p> <h3>Your recipes stay on your device</h3> <p>Saved recipes, shopping lists, and settings live in your browser's
			local storage, on your device. They never get uploaded anywhere, and
			that also means they don't sync between devices and they disappear
			if you clear your browser data or uninstall the app. Back up
			anything you care about by exporting it to Markdown.</p> <h3>The one thing that leaves your device</h3> <p>When you paste or share a recipe URL, the page can't fetch it
			directly (browsers say no), so the URL goes to a small proxy I run
			at <b>recipease.fly.dev</b>. The proxy fetches that page, pulls out
			the recipe bits, and hands them back. Which means:</p> <ul class="p1" style="list-style: inside"><li>The proxy sees the recipe URL you submitted.</li> <li>Its server logs record that URL, plus the usual connection
				details like your IP address, which is also what the rate
				limiting uses so one person can't hammer it.</li> <li>Nothing there is tied to an identity, sold, shared, or fed to an
				ad network. Logs are just operational noise and get rotated
				away.</li> <li>Recipe search runs against a list that ships with the app, so
				searching doesn't send your query anywhere interesting either.</li></ul> <h3>Other people's websites</h3> <p>The recipe sites you point this at have their own privacy policies,
			and they're almost certainly less charming than this one. The proxy
			fetches those pages on your behalf, so those sites see my server
			rather than you, but their content and their rules are still theirs.</p> <h3>So, about sensitive URLs</h3> <p>Just... try not to pass any sensitive urls through this site, okay?
			Generally sites are pretty good about security nowadays, so even if
			you passed in a random URL from your bank you'd be fine, but if
			you're trying to access some antique that still does <b>www.bad-website.com?username=(username)&password=(password)</b>,
			then:</p> <ul class="p1" style="list-style: inside"><li>Stop using that site</li> <li>Don't give that url to this site</li> <li>Reconsider some of your life's choices</li></ul> <h3>Deleting your stuff</h3> <p>There's nothing of yours on my end to delete. Everything you've
			saved goes away when you clear this site's data in your browser, or
			uninstall the app.</p> <h3>Changes</h3> <p>If this ever changes, this page changes with it. If a future version
			of me ever adds analytics, feel free to be disappointed.</p></div></main>`,1);function d(t){var e=h(),s=i(e);r(s,{title:"Privacy Policy"}),n(2),a(t,e)}export{d as component};
