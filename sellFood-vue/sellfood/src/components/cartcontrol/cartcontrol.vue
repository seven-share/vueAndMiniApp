<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <div class="inner icon-remove_circle_outline"></div>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    data() {
        return {};
    },
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart: function(event) {
            if (!this.food.count) {
                Vue.set(this.food, "count", 1);
            } else {
                this.food.count++;
            }
            this.$emit('add', event.target);
        },
        decreaseCart: function() {
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
};
</script>
<style scoped>
.cartcontrol {
    display: flex;
}
.cartcontrol .cart-decrease {
    padding: 6px;
    color: rgb(0, 160, 220);
}
.cartcontrol .cart-decrease .inner{
    transition: all 0.4s linear;
}
.move-enter-active, .move-leave-active{
    transition: all 0.4s linear
}
.move-enter, .move-leave-to{
    opacity: 0;
    transform: translate3d(48px, 0, 0);
}
.move-enter .inner, .move-leave-to .inner{
    transform: rotate(180deg)
}


.cartcontrol .cart-count {
    width: 12px;
    text-align: center;
    font-size: 10px;
    line-height: 36px;
    color: rgb(147, 153, 159);
}
.cartcontrol .cart-add {
    padding: 6px;
    color: rgb(0, 160, 220);
}
</style>