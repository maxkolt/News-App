function customHttp() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                xhr.send();
            } catch (error) {
                cb(error);
            }
        },
        post(url, body, headers, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                if (headers) {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }

                xhr.send(JSON.stringify(body));
            } catch (error) {
                cb(error);
            }
        },
    };
}

// Init http module
const http = customHttp();

const newsService = (function () {
    apiKey = '8dd71c05c0724b9cb72c982ff64d9925';
    apiUrl = 'https://news-api-v2.herokuapp.com';

    return {
        topHeadlines(country = 'ua', cb) {
            http.get(`${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`)
        },
        everything(query, cb) {
            http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
        }
    }
})();

//  init selects
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    loadNews();
});

function loadNews() {
    newsService.topHeadlines('ua', onGetResponse)
}


function onGetResponse(err, res) {
    renderNews(res.articles);
}


function renderNews(news) {
    const newsContainer = document.querySelector('.news-container .row');

    news.forEach(newsItem => {
        const el = newsTomplate(newsItem)
    })
}


function newsTomplate({urlToImage, title, url, description}) {
console.log(news);
return`
<div class = "col s12">
<div class="card">
<div class="card-image">
    <img src="${urlToImage}">
    <span class="card-title">${title || ''}</span>
</div>
<div class="card-content"></div>
</div>

</div>
`;
}
