//给ccBox添加xy坐标class
function addXYClass(){

    //遍历ccBox添加class
    $('.cBox').each(function(index){

        var indC = index;
        $(this).children().each(function(index){
            var indCc = index;

            //要添加的xclass 
            //indC/3  <1 x:1,2,3 <2 x:4,5,6 <3 x:7,8,9
            var xClassStrAdd = getX(indC,indCc);

            //添加x轴 class
            $(this).addClass(xClassStrAdd);

            //要添加的y轴class
            //indC%3 0 y:1,2,3 1 y:4,5,6 2 y:7,8,9
            var yClassStrAdd = getY(indC,indCc);

            //添加y轴class
            $(this).addClass(yClassStrAdd).html();
        });
    });
};

//获取x轴坐标
function getX(cBoxInd,ccBoxInd){
    var xClassStr = 'x-';

    return xClassStr + (parseInt(cBoxInd/3)*3 + parseInt(ccBoxInd/3) + 1);
}

//获取y轴坐标
function getY(cBoxInd,ccBoxInd){
    var yClassStr = 'y-';

    return yClassStr + (cBoxInd%3*3 + ccBoxInd%3 + 1);
}

//生成数独
function createSudoku(){
    var sudokuArr = [1,2,3,4,5,6,7,8,9];

    for(var i=0;i<sudokuArr.length;i++){
        //记录当前数字在每个cBox里的坐标
        var xyOfI = [
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0},
            {x:0,y:0}
        ];

        $('.cBox').each(function(idnex,element){
            fillCCBOx(sudokuArr[i],element);
        });
    };
};

//给ccBox填入数字  创建函数方便重复调用
function fillCCBOx(i,ele){
    var randomCcBoxInd = parseInt(Math.random()*9);

    if ($(ele).children().eq(randomCcBoxInd).hasClass('hasNum')) {
        console.log('没找到'+i+'该存放的位置');
        fillCCBOx(i,ele);
    } else {
        var classStrArr = $(ele).children().eq(randomCcBoxInd).attr('class').split(' ');

        if (isSole(i,classStrArr[1],classStrArr[2])) {
            fillCCBOx(i,ele);
        } else {
            $(ele).children().eq(randomCcBoxInd).html(i).addClass('hasNum');
            return console.log('找到'+i+'该存放的位置');
        }
    }
}

//验证填入的数字在x，y轴是唯一的
/**
 * @param {number} num    要填入的数字
 * @param {string} strX   填入数字所在的x轴坐标
 * @param {string} strY   填入数字所在的y轴坐标
 * 
 * @returns {boolean}
 */
function isSole(num,strX,strY){
    //传入的strX，strY设置成 .strX
    strXX = '.' + strX;
    strYY = '.' + strY;

    //设置两个空数组
    var arrX = [];
    var arrY = [];
    $(strXX).each(function(){
        arrX.push(parseInt($(this).html()));
    });

    $(strYY).each(function(){
        arrY.push(parseInt($(this).html()));
    });

    if (findNum(num,arrX) || findNum(num,arrY)) {
        return true;
    } else {
        return false;
    }
}

//查找数组中指定元素
/**
 * @param {number} num   要查找的元素
 * @param {number[]}  arr   目标数组
 * 
 * @returns {boolean}
 */
function findNum(num,arr){
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            return true;
        } else {
            return false;
        }
    }
}

$(function(){
    addXYClass();
    // createSudoku();
});