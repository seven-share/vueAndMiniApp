<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <div class="text tmid">({{seller.ratingCount}})</div>
                    <div class="text">月售{{seller.sellCount}}单</div>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favourite" @click="toggleFavourite">
                    <div class="icon-favorite" :class="{active:favourite}"></div>
                    <div class="text">{{favouriteText}}</div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <div class="title">公告与活动</div>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
            </div>
            <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="item in seller.supports">
                    <div class="icon" :class="classMap[item.type]"></div>
                    <div class="text">{{item.description}}</div>
                </li>
            </ul>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import star from "@/components/star/star";
import split from "@/components/split/split";
export default {
    data: function() {
        return {
            classMap: [
                "decrease",
                "discount",
                "guarantee",
                "invoice",
                "special"
            ],
            favourite:false
        };
    },
    computed:{
        favouriteText:function(){
            return this.favourite? '已收藏':'未收藏'
        }
    },
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star,
        split
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted: function() {
        this.$nextTick(() => {
            this._initScroll();
            this._initPics();
        });
    },
    methods: {
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavourite:function(){
          this.favourite=!this.favourite;
      }
    }
};
</script>
<style scoped>
.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.seller .overview {
    padding: 18px;
    position: relative;
}
.seller .overview .title {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
}
.seller .overview .desc {
    padding-bottom: 18px;
    display: flex;
    align-items: center;
    line-height: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .overview .desc .text {
    font-size: 10px;
    color: rgb(77, 85, 93);
}
.seller .overview .desc .tmid {
    margin: 0 12px 0 8px;
}
.seller .overview .remark {
    margin-top: 18px;
    display: flex;
}
.seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .overview .remark .block:last-child {
    border: none;
}
.seller .overview .remark .block h2 {
    font-size: 10px;
    line-height: 10px;
    margin-bottom: 4px;
    color: rgb(147, 153, 159);
}
.seller .overview .remark .block .content {
    font-size: 10px;
}
.seller .overview .remark .block .content .stress {
    font-size: 24px;
    color: rgb(7, 17, 27);
    font-weight: 200;
}
.seller .overview .favourite{
    position: absolute;
    top: 18px;
    right: 18px;
    text-align: center;
}
.seller .overview .favourite .icon-favorite{
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 4px;
    color: #d4d6d9
}
.seller .overview .favourite .icon-favorite.active{
    color: rgb(240, 20, 20)
}
.seller .overview .favourite .text{
    font-size: 10px;
    color: rgb(77, 85, 93);
}
.seller .bulletin {
    margin: 18px 18px 16px;
}
.seller .bulletin .title {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
}
.seller .bulletin .content-wrapper {
    padding: 0 12px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(240, 20, 20);
    line-height: 24px;
}
.seller .supports {
    margin: 0 18px;
}
.seller .supports .support-item {
    display: flex;
    align-content: center;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    padding: 16px 12px;
}
.seller .support-item .icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
}
.decrease {
    background-image: url("./decrease_4@2x.png");
}
.discount {
    background-image: url("./discount_4@2x.png");
}
.guarantee {
    background-image: url("./guarantee_4@2x.png");
}
.invoice {
    background-image: url("./invoice_4@2x.png");
}
.special {
    background-image: url("./special_4@2x.png");
}
.seller .supports .support-item .text {
    font-size: 12px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    line-height: 16px;
}
.seller .pics{
    padding: 18px 0 18px 18px;
}
.seller .pics .title{
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
}
.seller .pics .pic-wrapper{
    width: 100%;
    overflow: hidden;
}
.seller .pics .pic-wrapper .pic-list{
    display: flex;
}
.seller .pics .pic-wrapper .pic-list .pic-item{
    margin-right: 6px;
}
.seller .pics .pic-wrapper .pic-list .pic-item img{
    width: 120px;
    height: 90px;
}
.seller .info{
    margin: 18px;
}
.seller .info .title{
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 12px;
}
.seller .info .info-item{
    padding: 16px 12px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 12px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    line-height: 16px;
}
</style>
