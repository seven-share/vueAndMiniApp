<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <div class="title">服务态度</div>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <div class="score">{{seller.serviceScore}}</div>
                    </div>
                    <div class="score-wrapper">
                        <div class="title">商品评价</div>
                        <star :size="36" :score="seller.foodScore"></star>
                        <div class="score">{{seller.foodScore}}</div>
                    </div>
                    <div class="score-wrapper">
                        <div class="title">送达时间</div>
                        <div class="delivery">{{seller.deliveryTime}}分钟"</div>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @select="selectRating" @toggle="toggleContent" :selectType='selectType' :onlyContent='onlyContent' :ratings='ratings'></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar">
                        </div>
                        <div class="content">
                            <div class="name">{{rating.username}}</div>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <div class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <div class="icon-thumb_up"></div>
                                <div class="item" v-for="item in rating.recommend">{{item}}</div>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import star from "@/components/star/star";
import split from "@/components/split/split";
import ratingselect from "@/components/ratingselect/ratingselect";
import { fd } from "@/common/js/date.js";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
const ERR_OK = 0;
export default {
    data: function() {
        return {
            selectType: ALL,
            onlyContent: true,
            ratings: []
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star,
        split,
        ratingselect
    },
    created: function() {
        this.$http.get("/api/ratings").then(response => {
            response = response.data;
            if (response.errno == ERR_OK) {
                this.ratings = response.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                });
            }
        });
    },
    methods: {
        selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleContent: function() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow: function(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    },
    filters: {
        formatDate: function(time) {
            let date = new Date(time);
            return fd(date, "yyyy-MM-dd hh:mm");
        }
    }
};
</script>
<style>
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.ratings .overview {
    display: flex;
    padding: 18px 0;
}
.ratings .overview .overview-left {
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;
    padding: 6px 0;
}
.ratings .overview .overview-left .score {
    font-size: 24px;
    line-height: 28px;
    color: rgb(255, 153, 0);
    margin-bottom: 6px;
}
.ratings .overview .overview-left .title {
    font-size: 12px;
    line-height: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
}
.ratings .overview .overview-left .rank {
    font-size: 10px;
    line-height: 10px;
    color: rgb(7, 17, 27, 0.1);
}
.ratings .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
}
.ratings .overview .overview-right .score-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.ratings .overview .overview-right .score-wrapper:last-child {
    margin-bottom: 0px;
}
.ratings .overview .overview-right .score-wrapper .title {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
    margin-right: 12px;
}
.ratings .overview .overview-right .score-wrapper .score {
    font-size: 12px;
    color: rgb(255, 153, 0);
    line-height: 18px;
    margin-left: 12px;
}
.ratings .overview .overview-right .score-wrapper .delivery {
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 18px;
}
.ratings .rating-wrapper {
    margin: 0 18px;
}
.ratings .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    position: relative;
}
.ratings .rating-wrapper .avatar {
    margin-right: 12px;
}
.ratings .rating-wrapper .avatar img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}
.ratings .rating-wrapper .content .name {
    font-size: 10px;
    color: rgb(7, 17, 27);
    line-height: 12px;
    margin-bottom: 4px;
}
.ratings .rating-wrapper .content .star-wrapper {
    display: flex;
    margin-bottom: 6px;
}
.ratings .rating-wrapper .content .star-wrapper .delivery {
    font-size: 10px;
    font-weight: 200;
    color: rgb(147, 153, 159);
    line-height: 12px;
    margin-right: 6px;
}
.ratings .rating-wrapper .content .text {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 18px;
    margin-bottom: 8px;
}
.ratings .rating-wrapper .content .recommend {
    display: flex;
    flex-wrap: wrap;
}
.ratings .rating-wrapper .content .recommend .icon-thumb_up {
    color: rgb(0, 160, 220);
    font-size: 12px;
    line-height: 16px;
}
.ratings .rating-wrapper .content .recommend .item {
    font-size: 9px;
    color: rgb(147, 153, 159);
    line-height: 16px;
    margin-left: 8px;
    margin-bottom: 4px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 2px;
    padding: 0 6px;
}
.ratings .rating-wrapper .content .time {
    position: absolute;
    top: 18px;
    right: 0;
    font-size: 10px;
    font-weight: 200;
    color: rgb(147, 153, 159);
    line-height: 12px;
}
</style>
