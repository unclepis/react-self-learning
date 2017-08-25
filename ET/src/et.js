import React from 'react';
let inputValue = {
    sharpFormula: function (pre, next) {
        return 2 * parseInt(pre) + 3 * parseInt(next) + 4
    },
    dollarFormula: function (pre, next) {
        return 3 * parseInt(pre) + parseInt(next) + 2
    },
    subValue: 0,
    supValue: Math.pow(2, 32),
    format: /^([1-9][0-9]*[#|$])+[1-9][0-9]*$/,
    errorMessage: {
        invalidMessage: 'invalid format of input value',
        outOfRange: 'number in input is out of range'
    }
};
export default class ET extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };

        this.translate = this.translate.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    /**
     * 点击按钮进行火星文计算
     */
    translate() {
        let message = this.refs.sourceData.value; // 获取表单dom的输入数据
        this.validateInput(message);
    }

    /**
     * 校验输入的火星文是否是非法输入
     * @param {*} message 
     */
    validateInput(message) {
        if (!inputValue.format.test(message)) {
            this.outputResult(inputValue.errorMessage.invalidMessage);
            return;
        }
        let numbers = message.match(/\d+/g).map(item => parseInt(item)); // 如果输入的火星文正确，将数字取出来校验是否是十六进制无符号整形
        let outRangeNumbers = numbers.filter(this.validateNumberRange);
        if (outRangeNumbers.length > 0) {
            this.outputResult(inputValue.errorMessage.outOfRange);
            return;
        }
        this.calculateResult(message);
    }

    /**
     * 计算火星文数字中是否为16位无符号整形
     * @param {*} numbers 
     */
    validateNumberRange(numbers) {
        return (numbers > inputValue.supValue || numbers < inputValue.subValue);
    }

    /**
     * 按照$比#优先，相同操作符从左到右的顺序翻译火星报文
     * @param {*} message 
     */
    calculateResult(message) {
        let sharpSplit = message.split('#').map(item => {
            if (item.indexOf('$') !== -1) {
                let calcValue = item.split('$').reduce(inputValue.dollarFormula);
                if (this.validateNumberRange(calcValue)) {
                    return;
                }
                return calcValue;
            }
            return item;
        });
        if (sharpSplit.filter(item => item === undefined).length || this.validateNumberRange(sharpSplit.reduce(inputValue.sharpFormula))) {
            this.outputResult(inputValue.errorMessage.outOfRange);
        } else {
            this.outputResult(sharpSplit.reduce(inputValue.sharpFormula));
        }
    }

    /**
     * 将计算结果更新到组件的state里面，通过render函数刷新视图
     * @param {*} result 
     */
    outputResult(result) {
        this.setState({
            result: result
        });
    }

    /**
     * 当输入信息有变化，清除提示信息
     */
    clearMessage() {
        this.setState({
            result: ''
        });
    }

    /**
     * render函数渲染视图
     */
    render() {
        return (
            <div>
                <div className='title'>
                    <h1>ET Telegraph Translation</h1 >
                </div>
                <div className='content'>
                    <div className='left'>
                        <input type="text" ref='sourceData' onChange={this.clearMessage} />
                    </div>
                    <div>
                        <button onClick={this.translate}>Translate</button>
                    </div>
                    <div className='right'>
                        {this.state.result}
                    </div>
                </div>
            </div>
        );
    }
}


