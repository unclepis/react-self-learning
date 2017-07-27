# React/JSX Style Guide
## 基本规则：
- 每个文件只能包含一个React的组件
	- 除非是无状态的或者纯函数
- 最好使用JSX的格式
- 不要使用React.createElement除非当你在从一个不是JSX的文件初始化应用

## class vs React.createClass vs stateless
- 如果存在内部的state或者refs
	- 倾向于使用 
	~~~
		class MyComponent Extends React.Component	
	~~~
	- 不推荐使用
	~~~	
		const MyComponent = React.createClass({});
	~~~
- 如果没有state或者refs
	- 倾向于用一般的函数(非箭头函数)
	~~~
		function MyComponent({name}){
			return <div>{name}</div>
		}		
	~~~
	- 而不是class
	~~~
		class MyComponent extends React.Component{
			render(){
				return <div>{this.props.name}</div>
			}
		}
 	~~~

## 命名
- 扩展名：使用.jsx后缀给React的组件
- 文件名: 使用大驼峰给React组件的文件名
- 参考命名：给react的组件使用大驼峰，给组件的实例使用小驼峰
	~~~
		// 大驼峰给组件名字
		import MyComponent from 'react'
		// 小驼峰给实例
		const comp = <MyComponent />
	~~~
- 组件命名:使用文件名当做组件名称
- 属性命名：避免使用dom组件的属性名。style等

##JSX
- jsx用来生成react元素，react元素是react应用最小的构架结构
- 与dom元素不同，react元素是纯对象

## 组件化和属性
组件允许您将ui拆分成独立的可充用的部分，并单独地考虑每个部分
### 功能性组件 functional component
~~~
	function Welcome(props){
		return <p>{props.name}</p>
	}
~~~
- 定义组件最简单的方式就是定义js函数，上面的函数是一个有限的react组件，并接受一个带有数据props的参数，并返回一个react元素，我们把这样的组件叫做：功能性组件，因为他是一个js函数

### 类组件 class component
~~~
  class Welcome extends React.Component{
		render(){
			return(
				<p>{this.props.name}</p>
			);
		}
	}
~~~
- ES6类来定义组件，以上两个写法其实是等效的
### 将功能性组件改成类组件：
- 创建一个和React.Component相同名称的ES6类
~~~
	import React from 'react';
	class Xxx extends from React.Component{
		// todo
	}
	export Xxx;
~~~
- 为类组件添加一个render方法
- 将功能组件的主题放到render中，并将参数中的props换成this.props

## 组件的渲染ReactDOM.render
- 渲染dom元素
~~~
	const element = <div>hello</div>;
	ReactDOM.render(element,document.getElementById('test'));
~~~
- 渲染自定义元素
~~~
	ReactDOM.render(<Welcome name='hello' />,document.getElementById('test'));
						or
	const element = <Welcome name='hello' />;
	ReactDOM.render(element,document.getElementById('test'));
~~~
- 组件的名称始终使用首大写祖母的大驼峰体<Welecome /> 而不是<welecome />
- 组件需要在开始标签自关闭 <Welcome />，而不是<Welcome></Welcome>
- 组件必须和ReactDOM在相同的作用域内
- 每个组件都必须有一个render方法，并且必须包裹在一个根元素的中返回

## props是只读的
- 无论将组件声明为功能组件还是类组件，它都不能修改自己的props，一般props表示一旦定义不在变化的属性。

## state 
- 类似于props，但是它是私有的，完全由组件控制
- 定义为类组件具有一些附加的功能：
	- 内部的state就是一个只有类组件可用的功能；
	- 生命周期函数也是一个只有类组件可用的功能；

# 使用类组件的state和生命周期函数
- state的初始赋值只能在constructor构造函数中进行，其他的要通过this.setState({stateName:stateValue})返回对象或者this.setState((para)=>function)回调函数的方式，不能对他进行赋值操作
~~~
	constructor(){
		this.state = {stateName:stateValue};
	}
~~~
- 在构造函数中，将props传递给基类的构造函数，类组件应该总是使用props调用基类构造函数
~~~
	constructor(props){
		super(props); // 把props传给基类的构造函数，获取组件的props值
	}
~~~
## state使用需要注意的三点：
- 除了在constructor中初始化，不要直接对state进行赋值操作 this.state.name = 'hello'; // 不会触发渲染
- state的更新可能是异步的，所以不要依赖上一个state的值来计算下一个state
~~~
	this.setState({
		counter: this.state.counter+ this.props.increment; //  错误的写法
	});
~~~
要解决类似的问题，应该使用回调函数而不是对象来调用setState，在回调函数中接收previous的state作为第一个参数，并将应用更新时的props作为第二个参数
~~~
	this.setState((previousState,props)=>({
		counter:previousState.counter+props.increment
	}));
~~~
也可以将上面的箭头函数改成普通函数的写法
~~~
	this.SetState(function(previousState,props){
		return {
			counter:previousState.counter+props.increment;
		};
	});
~~~
- state的更细是经过合并的，也就是说当调用setState()函数的时候，React会将您提供的对象合并到当前的state中。

## 声明周期函数
~~~
import React from 'react';
export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toLocaleString()
        };
    };

    render() {
        return (
            <div>
                <h1>This is react liftCycle demos</h1>
                <div style={{ border: 1 + 'px solid red', width: 300 + 'px' }}>
                    The current time is {this.state.date}
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(), 1000
        );
    }

    compinentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({ date: new Date().toLocaleString() });
    }
}
~~~

## 数据是向下单向流动的
- 父组件和子组件都不知道某个组件是否是有state的还是没有state的
- state通常就被设置成局部变量或者直接封装在组件的内部，除了拥有这个state的组件之外的任何组件都不能访问他
- 组件是类组件还是功能性组件对数据的传递也没有影响
- 组件可以选择将其state作为props传递给子组件
~~~
	<Welcome name ={this.state.name} />  //把当前父组件的state中的name传递给了子组件Welcome的name的props


- 这通常被称为自顶向下或者单项数据流，任何的state总是由一些特定组件拥有，并且从改state派生的任何数据或者UI只能影响树种下面的组件

## 事件处理
- React事件使用小驼峰命名而不是全部都是小写字母
	~~~
		<button onclick = 'toggle()'></button> //HTML中
		<button onClick = {this.toggle}></button>
	~~~
- 使用jsx传递一个函数作为事件处理程序，而不是一个字符串

	~~~
import React from 'react';
export default class Widge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(preState=>({
            status: !preState.status
        }));
    }
    // 写法是错误的，虽然也能运行实现功能，因为state可能是异步的
     /*handleClick() {
        this.setState({
            status:!this.state.status
        });
    }*/


    render() {
        const currStatus = this.state.status ? 'Active' : 'Close'
        return (
            <button onClick={this.handleClick}>{currStatus}</button>
        );
    }
}
	~~~
- this.handler.bind(this)需要在constructor中对this的指向进行绑定
- 由于state可能会异步的变化，所以不建议使用上一个state的值计算下一个state，如示例代码中的错误写法，推荐使用回调函数的方式；

## 根据条件进行选择性的渲染元素
- react的分条件渲染与js中的分条件工作方式相同，例如使用if或者条件运算符来创建一个表示当前状态的元素，让react匹配他们后更新UI

		import React from 'react';
		export default class OptionalRender extends React.Component {
    	constructor(props) {
        	super(props);
        	this.state= {
            	isClick:false
        };
        this.handleClick = this.handleClick.bind(this);
    	}
    	handleClick() {
        	this.setState({
            	isClick:!this.state.isClick
        	});
   	 	}
   		 render() {
       		 const currentStatus = this.state.isClick;
        		if (currentStatus) {
           			 return (
                		<div>
                   			 <UserGreeting />
                    		<button onClick={this.handleClick}>Change Status</button>
               			 </div>
           		 	);
       			 }
        			return (
            			<div>
               				 <GuestGreeting />
                			<button onClick={this.handleClick}>Change Status</button>
            			</div>
        			);
   				 }
		}

		function UserGreeting(props) {
    		return <h1>Welcome back!</h1>
		}
		function GuestGreeting(props) {
    		return <h1>Please sign in</h1>
		}
~~~

## 阻止组件的渲染
- 只要返回null即可

	~~~	
	function Warning(props){
		if(!props.warn){
			return null; // 如果传入的props.warn是false，阻止组件Warning渲染	
		}
		return (
			<h1>warning!</h1>
		);
	}	
	~~~

	例如在父组件调用Warning组件的时候根据state控制它的渲染与否：

	~~~
		return（
			<Warning warn = {this.state.status}>
		）；
	~~~
	然后在父组件中通过this.setState控制state.status的值
