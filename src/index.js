// import React from 'react';
import React, { Component } from './kreact';
import ReactDOM from './kreact-dom';

function Comp(props) {
    return <h2>
        {props.name}
    </h2>
}

class Comp2 extends Component{
    render() {
        return <div>
            <h2>
                { this.props.name }
            </h2>
        </div>
    }
}

const users = [
    { name: 'zks', age: 18 },
    { name: 'jack', age: 20 },
]

const jsx = (
    <div id="demo" onClick={() => alert('click')}>
        <Comp name="函数组件"></Comp>
        <span style={{color:'red', border: '1px solid purple'}}>这是一个demo</span>
        <Comp2 name="class组件"></Comp2>
        <ul>
            {
                users.map(x => <li>{ x.name }</li>)
            }
        </ul>
    </div>
);

console.log(jsx);

ReactDOM.render(jsx, document.querySelector('#root'));