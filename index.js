import Calculator from "./Calculator";
;((doc)=>{
    var oCalculator = document.getElementsByClassName("J_calculater")[0]
    const init=()=>{
        new Calculator(oCalculator).init()
    }
    init()
})(document)