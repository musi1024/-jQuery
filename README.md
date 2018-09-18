# -jQuery
写JS的时候就会发现DOM提供的API真的太难用了，但很幸运有jQuery，它封装了一些更好用的属性和方法，让我们写JS代码的时候，可以轻松一点。那么，我们也可以自己来封装一些类似jQuery的api，下面举例两个比较简单的api实现。

一般我们使用jQuery的时候就会像下面这样，用 jQuery()或者 $() 接受一个node或者一个选择器，赋值给一个变量，然后就可以用这个变量来使用api。
~~~
var $div = $('div')
$div.addClass('red') // 可将所有 div 的 class 添加一个 red
$div.setText('hi') // 可将所有 div 的 textContent 变为 hi
~~~
那么首先，我们就应该在window下重新定义一个构造函数，它可以接受一个node或者选择器，然后它会返回一个对象，在对象里有着各种的方法。

~~~
window.jQuery = function(nodeOrSelector) {     
    let nodes ={}   // 定义一个对象            
    nodes.addClass = function() {}  // 给对象添加方法
    nodes.setText = function() {}
    return nodes    // 返回这个对象
}
~~~
然后应该为了判断jQuery接受的参数到底是node还是selector，应该在函数开始做一个判断，并且最后返回的对象会是一个伪数组。

~~~
window.jQuery = function(nodeOrSelector) {
    let nodes ={}
    if(typeof nodeOrSelector=== 'string') {       // 参数是字符串说明是选择器
        let temp = document.querySelectorAll(nodeOrSelector)  // 获取元素，这是个伪数组
        for (let i = 0; i < temp.length; i++) {   // 循环把元素放进定义的对象里
            nodes[i] = temp[i]           
        }
        nodes.length = temp.length                // 因为这个对象是伪数组，也给它加个length                   
    } else if(nodeOrSelector instanceof Node) {   // 判断是否节点
        nodes = {                                 // 为了配合上面 ,这里也做一个伪数组    
            0: nodeOrSelector,
            length: 1
        }
    }
    nodes.addClass = function() {}
    nodes.setText = function() {}
    return nodes
}
~~~

现在，当接受到参数，对象里，接下来就应该给这个对象添加些方法。

~~~
window.jQuery = function(nodeOrSelector) {
    let nodes ={}
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
    nodes.addClass = function(classes) {                 // 接受一个或者多个 class
        classes.forEach(value => {                       // 遍历 classes 的 value，并作为参数进行下面的 for 循环
            for (let i = 0; i < nodes.length; i++) {     // 遍历 nodes
                nodes[i].classList.add(value)            // 给nodes里的每一元素都加上 class   
            }
        })
    }
    nodes.setText = function(text) {                    // 接受一个 text
        for (let i = 0; i < nodes.length; i++) {        // 遍历 nodes
            nodes[i].textContent = text                 // 每一个的文本都赋值为 text
        }
    }
    return nodes
}
~~~
那么这样就能实现类似jQuery的api，下面是全部的代码。

~~~
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
~~~