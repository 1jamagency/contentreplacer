<script>
// header and selector dictionary
var content = {
   
    headline: [
        {
        selector: '#manager > div > div.title > div',
        content: 'Headline replaced - Good job!!!'
        }
    ],
    washington: [
        {
        selector: '#towns > div.phone',
        content: 'washington phone number'
        },
    	{
        selector: '#manager > div > div.title > div',
        content: 'Washington website version'
        }
    ],
  	coctail: [
        {
        selector: '#manager > div > div.entry > ul > li:nth-child(1)',
        content: '<img width="420" alt="Cocktails" src="/upload/medialibrary/f47/f47abc04c6893dbb6044bd7921ff75ac.jpg" height="67" title="Cocktails">'
        },
    	{
        selector: '#manager > div > div.title > div',
        content: 'Alexander is proud of you!'
        }
    ]
};

// content replacement
function replacer(content, utm) {
    if (utm in content) {
        for (i in content[utm]) {
        	if(document.querySelector(content[utm][i]['selector'])!=null) {document.querySelector(content[utm][i]['selector']).innerHTML=content[utm][i]['content'];};
        };
    } else {
        console.log("Content catalog does not contain such UTM-tag");
    };
};


// returns cookie called "name" if exists, or "undefined" - if doesn't
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// writes utm in cookie for 30 days
function setCookie(utm) {
	var date = new Date(new Date().getTime() + (30*24*60*60*1000));
	document.cookie = 'utm_replace=' + utm + '; path=/; expires=' + date.toUTCString();
};

// combines all functions to algorithm
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
		console.log('UTM replacer have not found tag in URL or cookie')
	};
};
replacerMain(content);
</script>
