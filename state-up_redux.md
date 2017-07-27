# react state提升和redux
今天主要说下 React中的Redux，它和vue中的vuex一样，简单理解就是统一管理和维护组件中的可变化状态

- state提升就是当多个子组件需要共享一个state，就需要把state提取到最近的父组件力，然后通过props再传递给子组件
- 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。

理解一下几点是理解React和Redux的前提：

- React有props和state: 
	- props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态

~~~
	class Father extends React.Component{
		constructor(props){
			this.state ={
				name:'hello father'
			};
		}		
		render(){
			return(
				<Child name ={this.state.name}/>
			);
		}
	}
ReactDOm.render(<Father />,document.getElementById('example'));

	Father组件的内部状态state中通过props传递给子组件child
~~~

- 整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。

# state 提升　　
![img](img/stateUp.PNG)

- 让两个组件互相交流，使用对方的数据，解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。
- 子组件改变父组件state的办法只能是通过事件触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。

- 这样就出现了一个模式：数据总是单向从顶层向下分发的，但是只有子组件回调在概念上可以回到state顶层影响数据。这样state一定程度上是响应式的。
- 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
- 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。让我们回来看看重现上面结构的需求：

	~~~
		a. 需要回调通知state (等同于回调参数) -> action
　　　　	b. 需要根据回调处理 (等同于父级方法) -> reducer
　　　　	c. 需要state (等同于总状态) -> store
　　	对Redux来说只有这三个要素：
　　　　	a. action是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
　　　　	b. reducer是一个匹配函数，action的发送是全局
	~~~　
