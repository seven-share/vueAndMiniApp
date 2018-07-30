<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='seller'>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "@/components/header/header";
import {urlParse} from "@/common/js/util"
const ERR_OK=0;

export default {
  name: "App",
  data: function() {
    return {
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          // console.log(queryParam)
          return queryParam.id
        })()
      }
    };
  },
  components: {
    "v-header": header
  },
  created:function(){
    this.$http.get('/api/seller')
      .then((respose)=>{
        respose=respose.data
        if(respose.errno==ERR_OK){
          this.seller=respose.data
          // console.log(this.seller)
        }
      })
  }
};
</script>

<style>
@import './common/stylus/style.css';
body{
  font-weight: 200;
  font-family: 'PingFang SC','STHeitiSC-Light';
}
#app .tab{
  display: flex;
  position: relative;
  width: 100%;  
  height: 40px;
  line-height: 40px;
}
.tab-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: rgb(77, 85, 93)
}
#app .tab:after{
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  content: ' ';
}
#app .tab .active{
  color: rgb(240, 20, 20)
}
</style>
