import { initVNode } from './vdom2dom';
// vnode -> node
function render(vnode, container) {
    // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`;
    const realNode = initVNode(vnode);
    container.appendChild(realNode);
}

export default { render };