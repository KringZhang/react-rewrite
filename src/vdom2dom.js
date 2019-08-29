// vdom 转换为 dom
// vtype: 1是html元素，2是class组件，3是function组件
export function createVNode(vtype, type, props) {
    const vnode = { vtype, type, props };
    return vnode;
}

export function initVNode(vnode) {
    const { vtype } = vnode;
    if(!vtype) { // 文本节点
        return document.createTextNode(vnode);
    }
    if(vtype === 1) { // 原生
        return createOriginalElement(vnode);
    } else if(vtype === 2) { // class
        return createClassElement(vnode);
    } else if(vtype === 3) { // function
        return createFuncElement(vnode);
    }
}

function createOriginalElement(vnode) {
    const { type, props } = vnode;
    const node = document.createElement(type);
    // 处理特殊属性: className,htmlFor
    const { children, key, ...rest } = props;
    console.log(rest);
    Object.keys(rest).forEach(k => {
        if(k === 'className') {
            node.setAttribute('class', rest[k]);
        } else if(k === 'htmlFor') {
            node.setAttribute('for', rest[k]);
        } else if(k === 'style' && typeof(rest[k]) === 'object') {
            const strStyle = Object.keys(rest[k]).map(p => p + ':' + rest[k][p]).join(';');
            node.setAttribute('style', strStyle);
        } else if(k.startsWith('on')) {
            const fn = k.toLocaleLowerCase();
            // 不能用node.setAttribute(fn, rest[k]);
            node[fn] = rest[k];
        } else {
            node.setAttribute(k, rest[k]);
        }
    });
    children.forEach(x => {
        if(Array.isArray(x)) {
            x.forEach(y => node.appendChild(initVNode(y)));
        } else {
            node.appendChild(initVNode(x));
        }
    });
    return node;
}

function createClassElement(vnode) {
    const { type, props } = vnode;
    const component = new type(props);
    const vdom = component.render();
    return initVNode(vdom);
}

function createFuncElement(vnode) {
    const { type, props } = vnode;
    const vdom = type(props);
    return initVNode(vdom);
}