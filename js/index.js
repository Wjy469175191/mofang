var firstPaper = document.getElementsByClassName('firstPaper')[0],
    surface = firstPaper.getElementsByClassName('surface'),
    faceBall = firstPaper.getElementsByClassName('faceBall')[0],
    textUl = firstPaper.getElementsByClassName('synopsis')[0],
    textLis = textUl.getElementsByTagName('li');



firstPaper.ontouchstart = function () {
    FtouchS();
};
firstPaper.ontouchend = function () {
    FtouchE();
};
firstPaper.ontouchmove = function () {
    firstPaper.ontouchend = function () {
        firstPaper.ontouchstart = null;
        firstPaper.ontouchmove = null;
        firstPaper.ontouchend = null;
        FtouchM();
    };
};

function FtouchS() {
    [...surface].forEach((item, index) => {
        if (index % 2) {
            utils.css(item, {'transform': 'rotateY(-20deg)', 'transform-origin': 'center'})
        } else {
            utils.css(item, {'transform': 'rotateY(20deg)', 'transform-origin': 'center'})
        }
    })
}

function FtouchE() {
    [...surface].forEach((item) => {
        utils.css(item, {'transform': 'rotateY(0)', 'transform-origin': 'center'})
    })
}

function baseMove(item) {
    utils.css(item, {
        'width': '2rem',
        'height': '2rem',
        'top': '50%',
        'left': '50%',
        'margin-top': '-1rem',
        'margin-left': '-1rem'
    });
}

function FtouchM() {
    let Mflag = 0;
    [...surface].forEach((item, index) => {
        if (index === 1) utils.css(item, 'z-index', 5);
        if (index === 4) utils.css(item, 'z-index', -1);
        if (index % 2) {
            utils.css(item, {'transform': 'rotateY(-75deg) translateX(50%)', 'transform-origin': 'right'})
        } else {
            utils.css(item, {'transform': 'rotateY(75deg) translateX(-50%)', 'transform-origin': 'left'})
        }
        setTimeout(function () {
            utils.css(item, {'transition': 'all 2s'});
            if (index === 0) {
                utils.css(item, {
                    'transition': 'all 2s ',
                    'transform': 'translateY(2rem) rotateX(-90deg) translateZ(-2rem)',
                    'transform-origin': 'top'
                });
                baseMove(item);
            }
            if (index === 1) {
                utils.css(item, {'transition': 'all 2s 0.1s', 'transform': 'translateX(0) translateZ(0)'});
                baseMove(item);
            }
            if (index === 2) {
                utils.css(item, {
                    'transition': 'all 2s 0.2s',
                    'transform': 'translateX(2rem) rotateY(90deg) translateZ(-2rem)',
                    'transform-origin': 'left'
                });
                baseMove(item);
            }
            if (index === 3) {
                utils.css(item, {
                    'transition': 'all 2s 0.3s',
                    'transform': 'translateX(-2rem) rotateY(-90deg) translateZ(-2rem)',
                    'transform-origin': 'right'
                });
                baseMove(item);
            }
            if (index === 4) {
                utils.css(item, {
                    'transition': 'all 2s 0.4s',
                    'transform': 'translateZ(-2rem) rotateX(180deg)'
                });
                baseMove(item);
            }
            if (index === 5) {
                utils.css(item, {
                    'transition': 'all 2s 0.5s',
                    'transform': 'translateY(-2rem) rotateX(90deg) translateZ(-2rem)',
                    'transform-origin': 'bottom'
                });
                baseMove(item);
            }
            setTimeout(function () {
                baseMove(faceBall);
                if(Mflag)return;
                Mflag = 1;
                faceBallMove();
                utils.addClass(faceBall,'ballMove')
            }, 2500)
        }, 500);
    })
}

function faceBallMove() {
    var startX = 0, startY = 0, startZ = 0;
    var mx = 0, my = 0;
    var flag = 0;
    var EventFlag = 0;
    faceBall.style.transform = `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;


    document.ontouchstart = function (e) {
        utils.removeClass(faceBall,'ballMove');
        flag = 1;
        utils.css(faceBall, {'transition': ''});
        this.mx = e.touches[0].pageX;
        this.my = e.touches[0].pageY;
        let reg = /-?\d+(\.\d)?/g;
        let moveXAry = reg.exec(faceBall.style.transform);
        let moveYAry = reg.exec(faceBall.style.transform);
        let moveX = Math.abs(moveXAry[0]);
        let moveY = Math.abs(moveYAry[0]);
        this.mXLeave = moveX % 360;
        this.mYLeave = moveY % 360;
    };
    document.ontouchmove = function (e) {
        flag = 0;
        [...textLis].forEach((item)=>{
            utils.removeClass(item,'current');
        });
        /*if((mXLeave >= 0 && mXLeave<= 45) || (mXLeave >= 315 && mXLeave <= 360)) {
            this.changeX = e.touches[0].pageX - this.mx;
            this.changeY = e.touches[0].pageY - this.my;
            this.chdX = startX - this.changeY;
            this.chdY = startY - this.changeX;
            faceBall.style.transform = `rotateX(${startX - this.changeY}deg) rotateY(${startY - this.changeX}deg)`;
        }*/
        this.changeX = e.touches[0].pageX - this.mx;
        this.changeY = e.touches[0].pageY - this.my;
        this.mx = e.touches[0].pageX;
        this.my = e.touches[0].pageY;
        if(this.mXLeave > 45 && this.mXLeave < 135){
            if((this.mYLeave > 45 && this.mYLeave < 135) || (this.mYLeave > 225 && this.mYLeave < 315)){
                faceBall.style.transform = `rotateX(${startX}deg) rotateY(${startY -= this.changeX}deg) rotateZ(${startZ -= this.changeY}deg)`;
            }else {
                faceBall.style.transform = `rotateX(${startX -= this.changeY}deg) rotateY(${startY }deg) rotateZ(${startZ += this.changeX}deg)`;
            }
        }else if((this.mXLeave >= 0 && this.mXLeave<= 45) || (this.mXLeave >= 315 && this.mXLeave <= 360)){
            faceBall.style.transform = `rotateX(${startX -= this.changeY}deg) rotateY(${startY += this.changeX}deg) rotateZ(${startZ}deg)`;
        }else if(this.mXLeave >= 135 && this.mXLeave <= 225){
            faceBall.style.transform = `rotateX(${startX -= this.changeY}deg) rotateY(${startY -= this.changeX}deg) rotateZ(${startZ}deg)`;
        }else {
            if((this.mYLeave > 45 && this.mYLeave < 135) || (this.mYLeave > 225 && this.mYLeave < 315)){
                faceBall.style.transform = `rotateX(${startX}deg) rotateY(${startY  -= this.changeX}deg) rotateZ(${startZ += this.changeY}deg)`;
            }else {
                faceBall.style.transform = `rotateX(${startX -= this.changeY}deg) rotateY(${startY }deg) rotateZ(${startZ -= this.changeX}deg)`;
            }
        } //好像还有反转  注意设置 reStartZ   判断startX 的变化；
    };
    document.ontouchend = function (e) {
        if(flag)return;
        utils.css(faceBall, {'transition': 'transform 0.5s'});
        reStarX(startX);
        reStarY(startY);
        reStarZ(startZ);
        faceBall.style.transform = `rotateX(${startX}deg) rotateY(${startY}deg) rotateZ(${startZ}deg)`;
        utils.addClass(faceBall,'ballMove');
    };
    giveEvent();

    function reStarX(n) {
        if (n > 0 && n % 90 >= 45) {
            n = (parseInt(n / 90) + 1) * 90;
        }else if(n > 0 && n % 90 < 45){
            n = parseInt(n / 90) * 90;
        }
        if (n < 0 && n % 90 > -45) {
            n = parseInt(n / 90) * 90;
        }else if(n < 0 && n % 90 <= -45){
            n = (parseInt(n / 90) - 1) * 90;
        }
        startX = n;
    }
    function reStarY(n) {
        if (n > 0 && n % 90 >= 45) {
            n = (parseInt(n / 90) + 1) * 90;
        }else if(n > 0 && n % 90 < 45){
            n = parseInt(n / 90) * 90;
        }
        if (n < 0 && n % 90 > -45) {
            n = parseInt(n / 90) * 90;
        }else if(n < 0 && n % 90 <= -45){
            n = (parseInt(n / 90) - 1) * 90;
        }
        startY = n;
    }
    function reStarZ(n) {
        if (n > 0 && n % 90 >= 45) {
            n = (parseInt(n / 90) + 1) * 90;
        }else if(n > 0 && n % 90 < 45){
            n = parseInt(n / 90) * 90;
        }
        if (n < 0 && n % 90 > -45) {
            n = parseInt(n / 90) * 90;
        }else if(n < 0 && n % 90 <= -45){
            n = (parseInt(n / 90) - 1) * 90;
        }
        startZ = n;
    }
    function giveEvent() {
        if(EventFlag)return;
        EventFlag = 1;
        [...surface].forEach((item,index)=>{
            item.addEventListener('touchstart',function (e) {
                // e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                console.log(index + 1);
                [...surface].forEach((item)=>{
                    utils.removeClass(item,'current')
                });
                utils.addClass(item,'current');
                [...textLis].forEach((item)=>{
                    utils.removeClass(item,'current');
                });
                utils.addClass(textLis[index],'current');
            }, false)
        })
    }
}

