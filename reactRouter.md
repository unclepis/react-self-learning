# React Router	
![router](./img/router.PNG)

- Router
- Route
- hashHistory
## Router
- history属性	
## Route
- Route可以嵌套
	- path
	- component
- 路由组件Routes根据url的hash值的变化，然后匹配path，先加载跟目录/组件Home，然后在加载About或者Repos
- Router可以理解成react.router的一个特殊组件，他只是一个容器，具体加载的内容要根据Route组件加载
- 这种组件嵌套的方式的实际结构如下，所以，可以把About组件和Repos组件公共的内容放到Home里面，不同的部分放到各自组件内部

	![nestRoute](./img/nest.PNG)
- 可以看到，在Home组件定义的时候，Route发生了嵌套，About和Repos都在Home组件里面
- 所以在本例子中，React Router Tutorial的h1标签是公共部分，不管加载那个路由组件，这个h1的内容都需要在单页应用上呈现，所以在Home组件中有h1标签包裹React Router Tutorial，然后this.prop.children就是Home组件实际加载的子组件
~~~ 
	<Home>
		<About></About>
				or
		<Repos></Repos>
	</Home>
~~~

## Link组件
- 实际上Link组件就是a标签，当点击时会发生路由组件的跳转
- 可以给Link组件添加**激活**样式activeStyle或添加类activeClassName
		
		// 给两个路由组件添加激活时的style 字体变红色
		<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
		<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
		
		// 给两个路由组件添加激活时的class，当about被激活加载nav；repos加载active
		<li><Link to="/about" activeClassName='nav'>About</Link></li>
		<li><Link to="/repos" activeStyle='active'>Repos</Link></li>

- 为了不重复的定义相同的激活style或者class在Link标签中，使得代码中每一个Link标签都有相同的样式，可以封装一个组件，使用...扩展运算符来统一定义
![navLink](./img/navLink.PNG)

- 使用...this.props读取组件内部的所有属性，然后在NavLink组件封装的时候，定义一次activeClassName，后面使用NavLink替换Link就不会每次都在Link里面定义activeClassName

		  <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>

## URL参数
- /repos/:userName/:repoName 就可以匹配 /repos/facebook/react 或者/repos/reactjs/react-router
- 以冒号:开始的变量就是url变量，他的值就会被路由组件解析，你也可以通过this.props.params[name]获取他的值，例如获取this.props.params[userName]就会拿到上面的facebook或者reactjs
- ![url](./img/url.PNG)
- 当你通过封装的NavLink函数定义了url的跳转路径
- ![url](./img/params.PNG)
- 然后在Route路由组件中定了url的匹配规则，使用了url变量:userName/:repoName
- ![url](./img/props.PNG)
- 最后在实际加载的repo组件中调用了this.props.params.repoName抓取满足url匹配规则的变量的值

## IndexRoute
![indexRouter](./img/index.PNG)

- 在根路由下可以添加IndexRoute，当组件加载App组件会路由待IndexRoute，而不是空白页
![indexRouter](./img/home.PNG)

- 当Router容器里面的Route路由组件没有加载的时候或者只匹配了跟路由，可以通过配置让他跳转到IndexRoute页面

##indexLink
![indexLink](./img/indexLink.PNG)
- 由于子组件被激活的时候，父组件一定被激活的事实，所以当通过Link组件或者封装的NavLink组件给/根路径的Home添加激活style或者class的时候，你会发现Home处于一直被激活的状态，这就是因为满足/about路径的组件一定满足/
![indexLink](./img/active.PNG)
上图你会发现，当url的hash值后面加载/repos，路由也正常跳转了Repos组件，在页面上打印出来了This is Repos single Page！，但是Home 组件也被激活

- 解决办法就是使用indexLink，只有当跟路径被激活才会加载，子组件加载的时候不会触发
![indexLink](./img/indexlinks.PNG)
![indexLink](./img/unactive.PNG)

- 也可以使用onlyActiveOnIndex属性在Link组件的属性里。其实IndexLink就是使用这个属性进行封装的

~~~
	<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
~~~

## history属性
- Router的history属性用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供React Router匹配
- history属性可以设置三种类型的值：
	1. hashHistory：路由通过将url的hash部分切换，url类似example.com/#/some/path
	2. browserHistory:浏览器的路由不通过Hash完成，而是显示正常的路径example.com/some/path,背后调用的是History API
	![browserHistory](./img/browserHistory.PNG)
		1)需要对服务器改造，否则用户直接向服务器请求某个子路由，会现实404
		2）如果开发服务器使用的是webpack-dev-server，加上--history-api-fallback参数就可以了
	3. createMemoryHistory:主要用于服务器渲染。它创建一个内存中的hsitory对象，不与浏览器url互动
	
~~~
	const history = createMemoryHistory(location);
~~~

## 表单处理
- Link组件用于正常的用户点击跳转，但是有时候还需要表单跳转，点击跳转等操作
- 方法1：使用browserHistory.push('some/path')，当用户点击按钮触发浏览器的路由跳转;
![click to route](./img/clickRoute.PNG)
- 方法2：使用context对象
![click to route](./img/context.PNG)

## 路由的钩子
- 每个路由都有Enter和Leave钩子，用户进入或者离开该路由时触发
	
