<template>
    <div>
        <div class="shopcart">
            <div class="content-left" @click="toggleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon-shopping_cart"></span>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click="pay()">
                <div class="pay" :class="{highlight:payClass}">
                    {{payDesc}}
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <div class="empty" @click="empty">清空</div>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <div class="name">{{food.name}}</div>
                                <div class="food-right">
                                    <div class="price">
                                        <span>￥{{food.price*food.count}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol @add="addFood" :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import BScroll from "better-scroll";
export default {
    data() {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],
            dropBalls: [],
            fold: true
        };
    },
    props: {
        selectFoods: {
            type: Array,
            default: function() {
                return [];
            }
        },
        deliveryPrice: {
            type: Number
        },
        minPrice: {
            type: Number,
            default: 20
        }
    },
    components: {
        cartcontrol
    },

    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    // console.log(this.dropBalls);
                    return;
                }
            }
        },
        beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = "block";
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName("inner-hook")[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = "translate3d(0,0,0)";
                el.style.transform = "translate3d(0,0,0)";
                let inner = el.getElementsByClassName("inner-hook")[0];
                inner.style.webkitTransform = "translate3d(0,0,0)";
                inner.style.transform = "translate3d(0,0,0)";
                el.addEventListener("transitionend", done);
            });
        },
        afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = "none";
            }
        },
        toggleList: function() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        addFood(target) {
            this.drop(target);
        },
        empty: function() {
            this.selectFoods.forEach(food => {
                food.count = 0;
            });
        },
        hideList:function(){
            this.fold=true;
        },
        pay:function(){
            if(this.totalPrice<this.minPrice){
                return
            }
            alert(`需要支付${this.totalPrice}元`)
        }
    },
    computed: {
        totalPrice: function() {
            let total = 0;
            // console.log(this.selectFoods)
            this.selectFoods.forEach(food => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount: function() {
            let count = 0;
            this.selectFoods.forEach(food => {
                count += food.count;
            });
            return count;
        },
        payDesc: function() {
            if (this.totalPrice === 0) {
                return "￥" + this.minPrice + "元起送";
            } else if (this.totalPrice < this.minPrice) {
                return "还差" + "￥" + (this.minPrice - this.totalPrice) + "元";
            } else {
                return "去结算";
            }
        },
        payClass: function() {
            if (this.totalPrice > this.minPrice) {
                return true;
            } else {
                return false;
            }
        },
        listShow: function() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    }
};
</script>
<style scoped>
.shopcart {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    display: flex;
}
.shopcart .content-left {
    flex: 1;
    display: flex;
    z-index: 2;
    background-color: #141d27;
}
.shopcart .content-left .logo-wrapper {
    position: relative;
    top: -20px;
    padding: 6px;
    margin: 12px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #141d27;
}
.shopcart .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(61, 59, 59, 0.5);
    color: rgb(133, 127, 127);
    font-size: 24px;
    line-height: 44px;
}
.shopcart .content-left .logo-wrapper .logo.highlight {
    background-color: rgb(0, 160, 220);
    color: #fff;
}
.shopcart .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: white;
    background-color: red;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.shopcart .content-left .price {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    line-height: 24px;
    margin-top: 12px;
    height: 24px;
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.shopcart .content-left .price.highlight {
    color: #fff;
}
.shopcart .content-left .desc {
    margin-left: 12px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 48px;
}
.shopcart .content-right {
    width: 105px;
    background-color: #141d27;
}
.shopcart .content-right .pay {
    font-size: 12px;
    line-height: 48px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    background-color: rgba(61, 59, 59, 0.5);
}
.shopcart .content-right .pay.highlight {
    background-color: #00b43c;
    color: #fff;
}
.shopcart .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.shopcart .ball-container .ball .inner {
    width: 16px;
    height: 16px;
    order-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear;
}
.shopcart .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
}
.shopcart .fold-enter-active,
.shopcart .fold-leave-active {
    transition: all 0.5s linear;
}
.shopcart .fold-enter,
.shopcart .fold-leave-to {
    transform: translate3d(0, 0, 0);
}
.shopcart .shopcart-list .list-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.shopcart .shopcart-list .list-header .title {
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.shopcart .shopcart-list .list-header .empty {
    font-size: 12px;
    color: rgb(0, 160, 220);
}
.shopcart .shopcart-list .list-content {
    background-color: #fff;
    max-height: 197px;
    padding: 0 18px;
    overflow: hidden;
}
.shopcart .shopcart-list .list-content .food {
    display: flex;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.shopcart .shopcart-list .list-content .food .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.shopcart .shopcart-list .list-content .food .food-right {
    display: flex;
    align-items: center;
}
.shopcart .shopcart-list .list-content .food .food-right .price {
    color: red;
    font-size: 14px;
    margin-right: 5px;
}
.shopcart .shopcart-list .list-content .food .food-right .cartcontrol-wrapper {
    font-size: 24px;
}
.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 1;
    background: rgba(7, 17, 27, 0.6)
}
.fade-enter-active, .fade-leave-active{
    transition: all 0.5s
}
.fade-enter, .fade-leave-to{
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
      
</style>