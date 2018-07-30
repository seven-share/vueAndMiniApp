<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="icon-arrow_lift" @click="hide"></div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="new">￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food" @add="addFood"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @select="selectRating" @toggle="toggleContent" :selectType='selectType' :onlyContent='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
                </div>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings&&food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                            <div class="user">
                                <div class="name">{{rating.username}}</div>
                                <img :src="rating.avatar" class="avatar">
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import split from "@/components/split/split";
import ratingselect from "@/components/ratingselect/ratingselect";
import Vue from "vue";
import {fd} from "@/common/js/date.js"
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            }
        };
    },
    props: {
        food: {
            type: Object
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    },

    methods: {
        show: function() {
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.desc = {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            };
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        hide: function() {
            this.showFlag = false;
        },
        addFirst: function(event) {
            Vue.set(this.food, "count", 1);
            this.$emit("add", event.target);
        },
        addFood(target) {
            this.$emit("add", target);
        },
        selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleContent:function(){
            this.onlyContent=!this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow:function(type,text){
            if(this.onlyContent && !text){
                return false
            }
            if(this.selectType===ALL){
                return true
            }else{
                return type===this.selectType
            }
        }
    },
    filters:{
        formatDate:function(time){
            let date=new Date(time);
            return fd(date,'yyyy-MM-dd hh:mm')
        }
    }
};
</script>
<style scoped>
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 15;
    width: 100%;
    background-color: #fff;
}
.move-enter-active,
.move-leave-active {
    transition: all 0.5s;
}
.move-enter,
.move-leave-to {
    transform: translate3d(100%, 0, 0);
}
.food .food-content .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
}
.food .food-content .image-header img {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
.food .food-content .image-header .icon-arrow_lift {
    position: absolute;
    font-size: 20px;
    padding: 10px;
    top: 10px;
    left: 0px;
    color: #fff;
}
.food .food-content .content {
    padding: 18px;
    position: relative;
}
.food .food-content .content .title {
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
}
.food .food-content .content .detail {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 10px;
    margin-bottom: 18px;
}
.food .food-content .content .detail .sell-count {
    margin-right: 5px;
}
.food .food-content .content .price .new {
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
}
.food .food-content .content .price .old {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    font-weight: normal;
    text-decoration: line-through;
}
.food .food-content .content .cartcontrol-wrapper {
    font-size: 24px;
    position: absolute;
    bottom: 12px;
    right: 12px;
}
.food .food-content .content .buy {
    position: absolute;
    bottom: 18px;
    right: 18px;
    z-index: 10;
    box-sizing: border-box;
    width: 74px;
    height: 24px;
    padding: 6px 12px;
    background-color: rgb(0, 160, 220);
    border-radius: 12px;
    color: #fff;
    font-size: 10px;
    line-height: 12px;
}
.food .food-content .content .buy.fade-enter-active,
.food .food-content .content .buy.fade-leave-active {
    transition: all 0.5s;
}
.food .food-content .content .buy.fade-enter,
.food .food-content .content .buy.fade-leave-to {
    transform: translate3d(100%, 0, 0);
}

.food .info {
    padding: 18px;
}
.food .info .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    margin-bottom: 6px;
    color: rgb(7, 17, 27);
}
.food .info .text {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(77, 85, 93);
}
.food .rating {
    padding-top: 18px;
}
.food .rating .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    margin-left: 18px;
    color: rgb(7, 17, 27);
}
.food .rating-wrapper .rating-item{
    padding: 16px 18px;
    position: relative;
    border-bottom: 1px solid rgba(7, 17, 27,0.1)
}
.food .rating-wrapper .rating-item .user{
    display: flex;
    position: absolute;
    top: 16px;
    right: 18px;
}
.food .rating-wrapper .rating-item .user .name{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 12px;
    margin-right: 6px;
}
.food .rating-wrapper .rating-item .user img{
    width: 12px;
    height: 12px;
}
.food .rating-wrapper .rating-item .time{
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 6px;
}
.food .rating-wrapper .rating-item .text{
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 16px;
}
.food .rating-wrapper .rating-item .text span{
    line-height: 16px;
    color: rgb(147, 153, 159);
    margin-right: 4px;
}
.food .rating-wrapper .rating-item .text span.icon-thumb_down{
    color: rgb(0, 160, 220)
}
.food .rating-wrapper .no-rating{
    padding: 16px 18px;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
</style>