<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img v-bind:src="seller.avatar" alt="店铺头像">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <div class="icon" v-bind:class="classMap[seller.supports[0].type]"></div>
          <div class="text">{{seller.supports[0].description}}</div>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
        <div class="count">{{seller.supports.length}}个</div>
        <div class="icon-keyboard_arrow_right"></div>
      </div>
    </div>
    <div class="bulletin-wrapper" v-on:click="showDetail">
      <div class="bulletin-title"></div>
      <div class="bulletin-text">{{seller.bulletin}}</div>
      <div class="icon-keyboard_arrow_right"></div>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="背景">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size='48' :score='seller.score'></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <div class="icon" :class="classMap[item.type]"></div>
                <div class="text">{{item.description}}</div>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
          <div class="detail-close">
            <div class="icon-close" v-on:click="hideDetail"></div>
          </div>
        </div>
        
      </div>
    </transition>
  </div>
</template>

<script>
import star from "@/components/star/star";
export default {
  name: "Header",
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star
  },
  data: function() {
    return {
      classMap: ["decrease", "discount", "guarantee", "invoice", "special"],
      detailShow: false
    };
  },
  methods: {
    showDetail: function() {
      this.detailShow = true;
    },
    hideDetail:function(){
      this.detailShow=false;
    }
  }
};
</script>

<style scoped>
.header {
  background-color: rgba(7, 17, 27, 0.5);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.header .content-wrapper {
  padding: 24px 12px 18px 24px;
  display: flex;
  position: relative;
}
.avatar img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}
.header .content-wrapper .content {
  margin-left: 16px;
}
.header .content-wrapper .content .title {
  margin: 2px 0px 8px 0px;
  display: flex;
}
.header .content-wrapper .content .title .brand {
  width: 30px;
  height: 18px;
  background: url("./brand@2x.png") no-repeat;
  background-size: 30px 18px;
}
.header .content-wrapper .content .title .name {
  display: inline-block;
  margin-left: 6px;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
}
.header .content-wrapper .content .description {
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 10px;
}
.header .content-wrapper .content .support {
  display: flex;
}
.header .content-wrapper .content .support .icon {
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.decrease {
  background-image: url("./decrease_1@2x.png");
}
.discount {
  background-image: url("./discount_1@2x.png");
}
.guarantee {
  background-image: url("./guarantee_1@2x.png");
}
.invoice {
  background-image: url("./invoice_1@2x.png");
}
.special {
  background-image: url("./special_1@2x.png");
}
.header .content-wrapper .content .support .text {
  line-height: 12px;
  font-size: 10px;
}
.header .content-wrapper .support-count {
  position: absolute;
  display: flex;
  right: 12px;
  bottom: 14px;
  height: 10px;
  line-height: 10px;
  padding: 7px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 10px;
  border-radius: 14px;
}
.header .content-wrapper .support-count .icon-keyboard_arrow_right {
  margin-left: 2px;
  font-size: 10px;
}
.header .bulletin-wrapper {
  display: flex;
  height: 28px;
  padding: 0 22px 0 24px;
  background-color: rgba(7, 17, 27, 0.2);
  align-items: center;
}
.header .bulletin-wrapper .bulletin-text {
  font-size: 10px;
  font-weight: 200;
  flex: 1;
  height: 28px;
  line-height: 28px;
  margin-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header .bulletin-wrapper .bulletin-title {
  width: 22px;
  height: 12px;
  background: url("./bulletin@2x.png") no-repeat;
  background-size: 22px 12px;
}
.header .bulletin-wrapper .icon-keyboard_arrow_right {
  font-size: 10px;
}
.header .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
}
.header .background img {
  width: 100%;
  height: 100%;
}
.header .detail {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  /* bottom: 0; */
  top: 0;
  background: rgba(17, 17, 27, 0.8);
  overflow: auto;
}
.header .detail .detail-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  -webkit-overflow-scrolling: touch;
}
.header .detail .detail-wrapper .detail-main {
  flex: 1;
  padding-top: 64px;
}
.header .detail .detail-wrapper .detail-main .name {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
}
.header .detail .detail-wrapper .detail-main .star-wrapper {
  margin-top: 16px;
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
}
.header .detail .detail-wrapper .detail-main .title {
  display: flex;
  align-items: center;
  margin: 0 10%;
}
.header .detail .detail-wrapper .detail-main .title .text {
  margin: 0 12px;
  font-weight: 700;
  font-size: 14px;
}
.header .detail .detail-wrapper .detail-main .title .line {
  height: 0;
  border-top: rgba(255, 255, 255, 0.2) 1px solid;
  flex: 1;
}
.header .detail .detail-wrapper .detail-main .supports {
  margin-top: 24px;
  margin-bottom: 28px;
  margin-left: 10%;
}
.header .detail .detail-wrapper .detail-main .supports .support-item {
  display: flex;
  margin-bottom: 12px;
}
.header .detail .detail-wrapper .detail-main .supports .support-item:last-child {
  margin-bottom: 0px;
}
.header .detail .detail-wrapper .detail-main .supports .support-item .icon {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  margin-right: 6px;
}
.header .detail .detail-wrapper .detail-main .supports .support-item .text {
  font-size: 12px;
  font-weight: 200;
  line-height: 16px;
}
.header .detail .detail-wrapper .detail-main .bulletin{
  width: 80%;
  margin: 24px auto 0;
  font-size: 12px;
  line-height: 24px;
}
.header .detail .detail-wrapper .detail-close {
  width: 100%;
  font-size: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 32px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  background: rgba(17, 17, 27, 0);
}
</style>
