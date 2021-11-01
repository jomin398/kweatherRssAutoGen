function doRequest(options, printResult) {
    let x = new XMLHttpRequest();

    x.open(options.method, options.url);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.onload = x.onerror = function () {
        printResult(
            {
                method: options.method === 'post' ? 'POST' : 'GET',
                url: options.url,
                status: x.status,
                statusText: x.statusText,
                responseText: x.responseText || '',
                response: x.response
            }
        );
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    }
    if (options.progress) {
        function onXhrLoadLog(xhr) {
            if (xhr.lengthComputable) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                const precent = Math.round(percentComplete, 2);
                const reqName = xhr.target.responseURL;
                console.log(reqName + " -> " + precent + '% downloaded');
            }
        };
        x.onprogress = (evt) => onXhrLoadLog(evt);
    }
    x.send(options.data);
}

window.onload = () => {
    init(d => {
        arr = Array.from(d.sido, item => item[1]);
        label = document.createElement('label');
        label.innerText =d.title+"? : ";
        sel = document.createElement('select');
        sel.name = 'test';
        arr.forEach((item, i) => {
            opt = document.createElement('option');
            opt.innerText = item;
            opt.value = i;
            if(item.indexOf('인천')!=-1){
                opt.selected= true;
            }
            sel.appendChild(opt)
        });
        btn = document.createElement('button');
        btn.innerText = 'Enter';
        btn.onclick = ()=>console.log(d.cbf(sel.options[sel.selectedIndex].value));
        document.body.append(label, sel,document.createElement('br'),btn);
        // console.log(d.cbf(15))
    });
}