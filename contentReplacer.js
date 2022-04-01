<script>
// titles and selectors
var content = {
    coctail: [
    	{
    	selector: '#manager > div > div.title > div',
    	content: 'Alex is happy with you!'
    	},
    	{
    	selector: '#manager > div > div.entry',
    	content: '<img width="420" alt="cocktails" src="/upload/medialibrary/f47/f47abc04c6893dbb6044bd7921ff75ac.jpg" height="67" title="cocktails">'
    	}
    ],
    newyork: [
        {
        selector: '#towns > div',
        content: 'New York number'
        },
        {
        selector: '#manager > div > div.title > div',
        content: 'New York version of the site'
        }
    ],
    headline: [
        {
        selector: '#manager > div > div.title > div',
        content: 'Only the header is replaced'
        }
    ]
};

// Content replacement
function replacer(content, utm) {
    if (utm in content) {
        for (i in content[utm]) {
        	if(document.querySelector(content[utm][i]['selector'])!=null) {document.querySelector(content[utm][i]['selector']).innerHTML=content[utm][i]['content'];};
        };
    } else {
        console.log("The resource directory does not have such utm tags");
    };
};


// returns a cookie named «name», if there is, if not then «undefined»
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// saves utm to cookie for 30 days 
function setCookie(utm) {
	var date = new Date(new Date().getTime() + (30*24*60*60*1000));
	document.cookie = 'utm_replace=' + utm + '; path=/; expires=' + date.toUTCString();
};

// combines all functions into one algorithm
function replacerMain(content) {
	// check is there utm in url
	if (/utm_replace=([^&]*)/g.exec(document.URL)) {
		var utm = /utm_replace=([^&]*)/g.exec(document.URL)[1];
		} else {
		var utm = null
	};

	if (utm != null) {
		replacer(content, utm);
		setCookie(utm);
	} else if (getCookie('utm_replace') != undefined) {
		replacer(content, getCookie('utm_replace'));
	} else {
		console.log('UTM replacer did not find the tag in either the URL or the cookie')
	};
};
replacerMain(content);
</script>
