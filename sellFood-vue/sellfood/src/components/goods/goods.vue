<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :class="{'current':currrntIndex===index}" @click="selectMenu(index,$event)">
          <div class="text">
            <div v-show="item.type>0" class="icon" :class="classMap[item.type]"></div>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" alt="food">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food='food' @add='addFood'></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice' :selectFoods='selectFoods'></shopcart>
    <food :food="selectedFood" ref="food" @add='addFood'></food>
  </div>
</template>

<script>
const ERR_OK = 0;
import BScroll from "better-scroll";
import shopcart from "@/components/shopcart/shopcart";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import food from "@/components/food/food";
export default {
    name: "Goods",
    data: function() {
        return {
            goods: [],
            classMap: [
                "decrease",
                "discount",
                "guarantee",
                "invoice",
                "special"
            ],
            listHeight: [],
            scrollY: 0,
            selectedFood:{}
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    computed: {
        currrntIndex: function() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let heightStart = this.listHeight[i];
                let heightEnd = this.listHeight[i + 1];
                if (this.scrollY >= heightStart && this.scrollY < heightEnd) {
                    return i;
                }
            }
        },
        selectFoods: function() {
            let sf=[];
            this.goods.forEach((good) => {
              good.foods.forEach((food)=>{
                if(food.count){
                  sf.push(food)
                }
              })
            });
            return sf;
        }
    },
    components: {
        shopcart,
        cartcontrol,
        food
    },
    created: function() {
        this.$http.get("/api/goods").then(response => {
            response = response.data;
            if (response.errno == ERR_OK) {
                this.goods = response.data;
                // console.log(this.goods);
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            }
        });
    },
    methods: {
        selectMenu: function(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
        _initScroll: function() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });

            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsScroll.on("scroll", pos => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
            // console.log(this.listHeight)
        },
        addFood: function(target) {
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        selectFood:function(food,event){
            if(!event._constructed){
                return;
            }
            this.selectedFood=food;
            this.$refs.food.show();
        }
    }
};
</script>

<style>
.goods {
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
}
.goods .menu-wrapper {
    width: 80px;
    background-color: #f3f5f7;
}
.goods .menu-wrapper ul li {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 200;
    line-height: 14px;
    height: 54px;
    position: relative;
    padding: 0 12px;
}
.goods .menu-wrapper ul li::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: " ";
}
.goods .menu-wrapper ul li .icon {
    display: inline-block;
    margin-right: -3px;
    width: 12px;
    height: 12px;
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
.goods .menu-wrapper ul li.current {
    background-color: #fff;
    font-weight: 700;
    margin-top: -1px;
    z-index: 10;
}
.goods .menu-wrapper ul li.current::after {
    border: none;
}

.goods .foods-wrapper {
    flex: 1;
}
.goods .foods-wrapper .title {
    font-size: 12px;
    color: rgb(147, 153, 159);
    height: 26;
    line-height: 26px;
    padding-left: 14px;
    background-color: #f3f5f7;
    border-left: 2px solid #d9ddd1;
}
.goods .foods-wrapper .food-item {
    display: flex;
    padding: 18px 0;
    margin: 0 18px;
    position: relative;
}
.goods .foods-wrapper .food-item:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: "";
}
.goods .foods-wrapper .food-item .icon img {
    width: 57px;
    height: 57px;
}
.goods .foods-wrapper .food-item .content {
    margin-top: 2px;
    margin-left: 10px;
}
.goods .foods-wrapper .food-item .content .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
}
.goods .foods-wrapper .food-item .content .desc {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 8px;
}
.goods .foods-wrapper .food-item .content .extra {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
}
.goods .foods-wrapper .food-item .content .extra span:first-child {
    margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .price .new {
    font-size: 14px;
    color: red;
    line-height: 24px;
    font-weight: 700px;
}
.goods .foods-wrapper .food-item .content .price .old {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    font-weight: 700;
    text-decoration: line-through;
}
.goods .foods-wrapper .food-item .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
    font-size: 24px;
}
</style>