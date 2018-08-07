window.jQuery = function(nodeOrSelector) {
    let nodes = {}
    if(typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i]           
        }
        nodes.length = temp.length
    } else if(nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }
    nodes.addClass = function(classes) {
        classes.forEach(value => {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add(value)              
            }
        })
    }
    nodes.setText = function(text) {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].textContent = text          
        }
    }

    return nodes
}

window.jQuery.ajax = function({url, method, body, hearders}) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest()
        request.open(method, url)
        for (let key in hearders) {
            let value = hearders[key]
            request.setRequestHeader(key, value)    
        }
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                } else if (request.status >= 400) {
                    reject.call(request)
                }
            }
        }
        request.send(body)
    })
    
}

window.$ = window.jQuery
var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi

jQuery.ajax({
    url: '/xxx',
    method: 'get'
}).then(success, fail)
// 封装ajax