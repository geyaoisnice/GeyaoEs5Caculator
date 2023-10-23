import Compute from "./Compute"
import ResultComponent from "./Header";
import InputGroupComponent from "./Middle";
import BtnGroupComponent from "./Footer";
import {
    trimSpace,
    digitalize
} from "./tools"
@Compute
export default class Calculator {
    constructor(el) {
        this.name = "Calculator";
        this.el = el
        this.resultComponent = new ResultComponent()
        this.inputGroupComponent = new InputGroupComponent()
        this.btnGroupComponent = new BtnGroupComponent()
        this.data = this.defineData()
        console.log(this.data, "data is")
        this.selectedIndex = 0
    }
    init() {
        this.render()
        this.bindEvent()
    }
    render() {
        const oFrag = document.createDocumentFragment()
        oFrag.append(this.resultComponent.tpl())
        oFrag.append(this.inputGroupComponent.tpl())
        oFrag.append(this.btnGroupComponent.tpl())
        this.el.appendChild(oFrag)
    }
    bindEvent() {
        const el = this.el
        this.oResult = el.getElementsByClassName("result")[0];
        this.oBtnGroup = el.getElementsByClassName("btn-group")[0];
        this.oInputs = el.getElementsByClassName("num-input");
        this.oBtns = this.oBtnGroup.getElementsByClassName('btn')
        this.oBtnGroup.addEventListener("click", this.onBtnClick.bind(this), false)
        this.oInputs[0].addEventListener('input', this.onInput.bind(this), false)
        this.oInputs[1].addEventListener('input', this.onInput.bind(this), false)
    }
    onBtnClick(ev) {
        const e = ev || window.event,
            tar = e.target || e.srcElement,
            tagName = tar.tagName.toLowerCase();
        console.log(tagName)
        if (tagName === 'button') {
            const method = tar.getAttribute("data-method");
            console.log(method, "method is")
            this.data.method = method
            this.setBtnDelected(tar)
            // var fval = digitalize(trimSpace(this.oInputs[0].value));
            // var sval = digitalize(trimSpace(this.oInputs[1].value));
            // this.setResult(method, fval, sval)
        }
    }
    onInput(e) {
        var tar = e.target || e.srcElement;
        var tagName = tar.tagName.toLowerCase();
        var id = tar.getAttribute("data-id")
        var val = digitalize(trimSpace(tar.value)) || 0
        switch (id) {
            case 'fVal':
                this.data.fVal = val
                break
            case 'sVal':
                this.data.sVal = val
                break
        }

    }
    defineData() {
        let _obj = {
        }
        const _self = this;
        var method = 'plus'
        var fVal = 0
        var sVal = 0
        Object.defineProperties(_obj, {
            method: {
                get() {
                    return method;
                },
                set(newVal) {
                    method = newVal
                    _self.setResult(_self.data.method, _self.data.fVal, _self.data.sVal)
                }
            },
            fVal: {
                get() {
                    return fVal;
                },
                set(newVal) {
                    fVal = newVal
                    _self.setResult(_self.data.method, _self.data.fVal, _self.data.sVal)
                }
            },
            sVal: {
                get() {
                    return sVal;
                },
                set(newVal) {
                    sVal = newVal
                    _self.setResult(_self.data.method, _self.data.fVal, _self.data.sVal)
                }
            }
        })
        return _obj
    }

    setBtnDelected(target) {
        this.oBtns[this.selectedIndex].className = 'btn'
        this.selectedIndex = [].indexOf.call(this.oBtns, target)
        this.oBtns[this.selectedIndex].className += ' selected'
    }
    setResult(method, fval, sval) {
        console.log(method, fval, sval)
        this.oResult.innerText = this[method](fval, sval)
    }
}