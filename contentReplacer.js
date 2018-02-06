<script>
// калалог заголовков
var content = {
    coctail: [
    	{
    	selector: '#manager > div > div.title > div',
    	content: 'Сашка доволен доволен тобой!'
    	},
    	{
    	selector: '#manager > div > div.entry',
    	content: '<img width="420" alt="Коктели" src="/upload/medialibrary/f47/f47abc04c6893dbb6044bd7921ff75ac.jpg" height="67" title="Коктели">'
    	}
    ],
    moscow: [
        {
        selector: '#towns > div',
        content: 'Московский номер'
        },
        {
        selector: '#manager > div > div.title > div',
        content: 'Московская версия сайта'
        }
    ],
    headline: [
        {
        selector: '#manager > div > div.title > div',
        content: 'Заменяется только заголовок'
        }
    ]
};

// заменяет контент
function replacer(content, utm) {
    if (utm in content) {
        for (i in content[utm]) {
        	document.querySelector(content[utm][i]['selector']).innerHTML=content[utm][i]['content'];
        };
    } else {
        console.log("Каталог контента не имеет такой utm метки");
    };
};


// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// записывает utm в cookie на 30 дней
function setCookie(utm) {
	var date = new Date(new Date().getTime() + (30*24*60*60*1000));
	document.cookie = 'utm_replace=' + utm + '; path=/; expires=' + date.toUTCString();
};

// объединяет все функции в один алгоритм
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
		console.log('UTM replacer не нашел метку ни в URL, ни в cookie')
	};
};
replacerMain(content);
</script>
