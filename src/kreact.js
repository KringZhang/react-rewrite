import { createVNode } from './vdom2dom';
function createElement(type, props, ...children) {
    console.log(type, props, children);
    delete props.__source;
    delete props.__self;
    props.children = children;
    let vtype;
    if(typeof type === 'string') { // 原生html标签
        vtype = 1;
    } else if(typeof type === 'function') {
        if(type.isClassComponent) { // class组件
            vtype = 2;
        } else { // 函数组件
            vtype = 3;
        }
    }
    return createVNode(vtype, type, props);
}

export default { createElement };

export class Component {
    static isClassComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
    }
    setState() {

    }
}