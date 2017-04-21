---
layout: single
comments: true
title: 'How to pass State between Child and Parent Elements in React.js'
Category: Tutorial
tags: [React, JavaScript]
lang: en-EN
---

The below example shows how to pass State both ways between Child and Parent Elements in React.js. 
Message from Parent Component is passed downward to Child. Count from Child Component is passed upward to Parent.
```jsx
class Child extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countChild: 0
        }
    }
    render() {
        return( <div>
            <h2>Child Component</h2>
            <p>Message is from Parent: {this.props.currentInput}</p>
            <button onClick={this.props.add}>Child Button</button>
                </div>
        );
    }
}

class Parent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countParent: 0,
            input: ''
        }
    }
    add() {
        this.setState({
            countParent: this.state.countParent + 1
        })
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return( <div>
                    <h2>Parent Component</h2>
                    <p>Count is from Child: {this.state.countParent}</p>
                    <input placeholder="Parent Input" value={this.state.input} onChange={this.handleChange.bind(this)} />
                    <Child add={this.add.bind(this)} currentInput={this.state.input} />
                </div> 
        );
    }
}

ReactDOM.render(
    <Parent />,
    document.getElementById('app')
);    
```

That's the easiest way to show in one example how to pass State in React.js between Parent and Child both ways. Enjoy!
