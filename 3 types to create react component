# react定义组件的三种方式：
1.函数式定义的无状态组件
2.es5原生方式React.createClass定义的组件
3.es6形式的extends React.Component定义的组件

## 定义组件的基本原则：
1.只要有可能，尽量使用无状态组件创建形式。
2.否则（如需要state、生命周期方法等），使用`React.Component`这种es6形式创建组件

## 无状态的展示类组件
    - 它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作 
    - 无状态函数式组件形式上表现为一个只带有一个render方法的组件类，通过函数形式或者ES6 arrow function的形式在创建，并且该组件是无state状态的
    
    ```
        function Com (props){
            return (<div>{props.name}</div>);
        }
        ReactDOM.render(<Com name='test' />,Dom);
    ```
    - 无状态组件内部其实是可以使用ref功能的，虽然不能通过this.refs访问到，但是可以通过将ref内容保存到无状态组件内部的一个本地变量中获取到。
    
    ~~~
        function TestComp(props){
             let ref; // 定义了局部变量ref
            return (<div>
                <div ref={(node) => ref = node}> // ref内容保存到无状态组件内部的一个本地变量中获取
                    ...
                </div>
            </div>)
        }
    ~~~
    
    - 优点：
    无状态组件的创建形式使代码的可读性更好，并且减少了大量冗余的代码，精简至只有一个render方法，大大的增强了编写一个组件的便利，除此之外无状态组件还有以下几个显著的特点：
    1.组件不会被实例化，整体渲染性能得到提升
    因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
    2.组件不能访问this对象
    无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件
    3.组件无法访问生命周期的方法
    因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。
    4.无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用

## 有状态的组件
    - 相同点：1.都是用来创建有状态的组件2.都要被实例化，然后可以调用生命周期函数
    - 区别： 
        - react.createClass()
            1.es5的写法
            2.函数this自绑定：React.createClass创建的组件，其每一个成员函数的this都有React自动绑定，任何时候使用，直接使用this.method即可，函数中的this会被正确设置。
            
            ~~~
                const Contacts = React.createClass({  
                    handleClick() {
                        console.log(this); // React Component instance
                    },
                render() {
                    return (
                      <div onClick={this.handleClick}></div>
                    );
                  }
                });
            ~~~
            
            3.React.createClass在创建组件时，有关组件props的属性类型及组件默认的属性会作为**组件实例的属性**来配置:
                1)其中defaultProps是使用getDefaultProps的方法来获取默认组件属性的
                2)然后initialState是通过getInitialState的方法来获取默认组件状态的
                
                ~~~
                const Com = react.createClass(
                {
                propTypes: {
                        name:react.React.PropTypes.string
                },
                getDefaultProps:function(){
                    return{
                        name:''
                    }
                },
                getInitialState(){ 
                    return {
                        isEditing: false
                    }
                }
                render:function(){
                    return(
                        <div>{this.props.name}</div>
                    );
                }
                });
                ~~~
            
            4.Mixins(混入)是面向对象编程OOP的一种实现，其作用是为了复用共有的代码，将共有的代码通过抽取为一个对象，然后通过Mixins进该对象来达到代码复用.
            React.createClass在创建组件时可以使用mixins属性，**以数组的形式**来混合类的集合。
            
            ~~~
                 var SomeMixin = {  
                  doSomething() {
                
                  }
                };
                
                const Contacts = React.createClass({  
                  mixins: [SomeMixin], // 数组的形式来混合SomeMixin类的doSomething方法到Contacts类
                  handleClick() {
                    this.doSomething(); // use mixin  直接使用this.method就可以拿到SomeMixin类里面的方法
                  },
                  render() {
                    return (
                      <div onClick={this.handleClick}></div>
                    );
                  }
                });
            ~~~
        - React.Component
            1.React.Component创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。
                目前有三种绑定的方法：
                1.在构造函数内绑定：
                
                ~~~
                       constructor(props) {
                        super(props);
                        this.handleClick = this.handleClick.bind(this); //构造函数中绑定
                       }
                ~~~
                
                2.也可以在调用时使用method.bind(this)来完成绑定
                
                ~~~
                    <button onClick = {this.hanldClick.bind(this)}>
                ~~~
                
                3.还可以使用arrow function来绑定
                
                ~~~
                    <button onClick = {()=>this.handleClick()}>
                ~~~
            2.React.Component在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的。React.Component创建的组件，其状态state是在constructor中像初始化组件属性一样声明的。
            
            ~~~
                class Com extends React.Component{
                    constructor（props）{
                        super(props);
                        this.state = {
                            name:''
                        };
                    }
                    static propTypes = {
                        name:React.PropTypes.string
                    };
                    static defaultProps ={
                        name:''
                    };
                }
            ~~~
            3.React.Component这种形式并不支持Mixins，eact开发者社区提供一个全新的方式来取代Mixins,那就是Higher-Order Components高阶组件。
