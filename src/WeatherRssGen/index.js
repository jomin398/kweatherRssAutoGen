function init(cbf,trialN) {
    let domparser = null;
    domparser = new DOMParser();
    let fns = [];
    fns = [
        {
            u: 'https://www.weather.go.kr/w/pop/rss-guide.do',
            fn: function (_xhr) {
                console.log('parsing.....');
                trialN = trialN?trialN:1;
                doc = domparser.parseFromString(_xhr.response, 'text/html').querySelector('#dfs-form > div > div:nth-child('+trialN+')');
                fns[1].fn(doc);
            }
        }, {
            fn: function (data) {
                console.log('data filtering.....');
                db= {};
                db.title =data.querySelector('label').innerText;
                _key = data.querySelector('div select').name;
                db[_key] = [];
                listItems = data.querySelector('div select').children;
                const listArray = [...listItems];
                listArray.forEach((item) => {
                    // console.log(item);
                    db[_key].push([item.value,item.innerText])
                });
                db.cbf = (num)=>{
                    return num?fns[0].u + "?sido=" +db[_key][num][0]:undefined;
                }
                cbf(db)
                // data.querySelector('label').innerText
            }
        }]
    doRequest({
        method: 'GET',
        url: fns[0].u
    }, xhr => fns[0].fn(xhr));

}


