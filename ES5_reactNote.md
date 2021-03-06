# React lifeCycle map:
![img](img/react-lifeCycle.PNG)
# react-self-learning
self-learning not for react
# JSX
- 因为react使用的是JSX语法，它有以下的特点：
	- 在script标签中加载的type为text/babel，这样就可以把JSX转码成js
	- 允许把html的代码放到js中使用，一般的准则就是遇到< 当做html解析，遇到{}按照js解析

# ReactDOM.render()

```
	ReactDOM.render(
		<div>{this.props.name}</div>,
		getElementById('test')
	);
```
- render函数接收两个参数，一个是需要渲染的dom节点，另一个是渲染的位置

# ReactDOM.createClass()

```
	var ComponentName = ReactDOM.createClass({
		getDefaultProps:function(){
			return{
				title:'hello world'
			};
		},
		propType:{
			title:React.PropTypes.string.isRequired
		}，
		render:function(){
			return <div>{this.props.title}</div>
		// 由于js会自动给return加上；所以return后面不要空行，否则会报错
		}
	});

	ReactDOM.render(
		<ComponentName title = 'react'/>,
		getElementById('test');
	);
```
- createClass方法就是用于生成一个组件类
- 在模板插入组件类之后，就会实例化一个该组件类。
- 所有的组件类都必须有自己的render方法，用于输出组件
- render方法的return不能接空行，要不然直接接jsx，要不然使用()抱起来
	
	```
		render:function(){
			return
				<div>报错</div>

			return <div>方法1</div>

			return <div>
				方法二
				</div>

			return (
				<div>
					方法三
				</div>
			)
				return '
				<div>
					方法四
				</div>
			'
		}
	```
- 需要注意的是react默认把小写字母当做html的标签解析。自定义的组件需要使用大写字母开头。例如:Name,而不能使用name
- 组件类只能包含一个顶层标签，否则也会报错。也就是说在createClass的组件类里面，render函数返回只能有一个顶层的html标签。

# 组件类的属性this.props.attr
- 组件的属性可以在组件类的this.props对象上获取。
- 需要注意的坑，坑，坑是：
	- 由于class和for都是js保留的关键字
	- class需要写成className
	<Component className = 'r-position'>
	- for属性需要写成htmlFor
- this.props.children
	- 表示组件的所有子节点
	- 如果当前的组件没有子节点的话，他是undefined
	- 如果只有一个子节点，为object
	- 多个子节点，为array
	- react提供了一个工具方法，React.Children来处理this.props.children
- propTypes:
	- 组件类的这个属性就是来验证组件实例的属性是否符合要求。
        - React.PropTypes.string
        - React.PropTypes.array
        - React.PropTypes.bool
        - React.PropTypes.func
        - React.PropTypes.number
        - React.PropTypes.object
        - React.PropTypes.oneOf(['Name','age']) 枚举类型enum
        - React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]) 可以是对个对象类型中的一个
        - React.PropTypes.arrayOf(React.PropTypes.number) 可以指定数组的成员
        - React.PropTypes.objectOf(React.PropTypes.number) 可以指定对象的成员
        - React.PropTypes.shape({color:React.PropTypes.string,fontSize:React.PropTypes.number}) 可以指定特定shape的对象，比如key为color和fontsize的对象
        - React.PropTypes.number.isRequired 任意类型加上isRequired是属性不能为空
        - React.PropTypes.any.isRequired ES6的any表示任意类型，isRequired不能为空
- getDefaultProps:设置组件属性的默认值

# virtual Dom 虚拟dom
- react的设计，所有的dom变动，都现在虚拟的dom上发生，然后在讲实际发生的变动部分，反应到真是的dom上，这种算法叫做dom diff，它可以提高网页的性能表现。
- 有时候需要从组件获取真是的dom节点，需要ref属性

```
var TestDom = React.createClass({
	handleClick:function(){
		this.refs.inputs.focus();
	},
	render:function(){
		return(
			<div>
			<input type='text' ref ='inputs'/>
			<input type='button' value = {this.props.name} onclick = {this.handleClick}/>
			</div>
		);
	}
});

ReactDOM.render(
	<TestDom name = 'foucs'/>,
	document.body
);

```
- 注意在dom中写的是ref，在jsx中写的是this.refs.[refName]
- 通过this.refs.[refName] 获取真是的dom
- 必须在虚拟dom插入到文档之后，才可以使用这个属性

# this.state
- 组件免不了要与用户互动，react的组件就是一个状态机，开始的时候有一个初始状态，然后用户互动，状态发生变化，从而触发重新渲染UI。
- getInitialState 方法用于定义初始化状态，也就是一个对象，可以通过this.state属性读取
- this.setState方法修改状态值，每次调用自动调用React.render()方法再次渲染。

# this.props 和 this.state的区别
- this.props表示那些一旦定义，就不在改变的特性；
- this.state表示会随着用户互动而产生变化的特性；

# react组件类生命周期
## 初始化状态下：
- getDefaultProps:获取实例的默认属性，即使没有生成实例，组件的第一个实例被初始化createClass的时候被调用，只调用一次；
- getInitialState:获取每个实例的初始化状态
- componentWillMount：在render直线最后一次修改状态的机会，组件即将被装载渲染到页面上
	- 可以在这里部署事件监听，this.setState在这里不起作用
- render：
	- 组件在这里生成虚拟dom节点，此时只能访问到this.state和this.props；
	- 组件的render函数只能有一个顶层组件
- componentDidMount:可以修改dom，组件真正被装载之后，可以使用this.getDOMNode()抓取dom

## 运行状态下：
- componentWillReceiveProps(object nextProps):组件将要接收到属性的时候被调用
- shouldComponentUpdata:组件接收到新属性或者新状态的时候，可以返回false，接收到的数据不更新，组织调用render函数，后面的函数也不会继续执行了。
- componentWillUpdate(object nextProps, object nextState)：不能修改属性和状态了,可以使用this.getDOMNode()
- render: 将虚拟dom更新到真是dom上
- componentDidUpdate: 可以修改dom,在虚拟dom更新后立刻触发，这个不是为了初始化render，是为了在提供在dom更新后操作dom的机会。

## 销毁阶段：
- componentWillUnmount:销毁监听和计时器等

# React API
- setState 设置状态
- replaceState 替换状态
- setProps 设置属性
- replaceProps 替换属性
- forceUpdate 强制更新
- findDOMNode 获取DOM节点 
- isMounted 判断组件挂载状态
