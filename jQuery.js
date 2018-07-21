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

window.$ = jQuery
var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi

