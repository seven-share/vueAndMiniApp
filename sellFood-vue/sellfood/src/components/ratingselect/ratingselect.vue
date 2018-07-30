<template>
    <div class="ratingselect">
        <div class="rating-type">
            <div @click="select(2,$event)" class="positive" :class="{active:selectType==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></div>
            <div @click="select(1,$event)" class="positive" :class="{active:selectType==1}">{{desc.positive}}<span class="count">{{positives.length}}</span></div>
            <div @click="select(0,$event)" class="negative" :class="{active:selectType==0}">{{desc.negative}}<span class="count">{{negatives.length}}</span></div>
        </div>
        <div @click="toggleContent" class="switch" :class="{on:onlyContent}">
            <div class="icon-check_circle"></div>
            <div class="text">只看内容的评价</div>
        </div>
    </div>
</template>

<script>
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2
export default {
    data () {
        return {
        };
    },
    props:{
        ratings:{
            type:Array,
            default:function(){
                return []
            }
        },
        selectType:{
            type:Number,
            default:ALL
        },
        onlyContent:{
            type:Boolean,
            default:true
        },
        desc:{
            type:Object,
            default:function(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    computed:{
        positives:function(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===POSITIVE
            })
        },
        negatives:function(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===NEGATIVE
            })
        }
    },

    methods: {
        select:function(type,event){
            // this.selectType=type
            this.$emit('select', type);
        },
        toggleContent:function(){
            // this.onlyContent=!this.onlyContent;
            this.$emit('toggle');
        }
    }
}

</script>
<style scoped>
.ratingselect .rating-type{
    display: flex;
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
}
.ratingselect .rating-type div{
    padding: 8px 12px;
    font-size: 12px;
    line-height: 16px;
    border-radius: 2px;
    margin-right: 8px;
}
.ratingselect .rating-type div.active{
    color: #fff;
}
.ratingselect .rating-type div span{
    font-size: 8px;
    margin-left: 5px;
}
.ratingselect .rating-type div.positive{
    background-color: rgba(0, 160, 220,0.2)
}
.ratingselect .rating-type .positive.active{
    background-color: rgb(0, 160, 220)
}
.ratingselect .rating-type div.negative{
    background-color: rgba(77, 85, 93,0.2)
}
.ratingselect .rating-type .negative.active{
    background-color: rgb(77, 85, 93)
}
.ratingselect .switch{
    display: flex;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    line-height: 24px;
    color: rgb(147, 153, 156);
}
.ratingselect .switch .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
}
.ratingselect .switch .text{
    font-size: 12px;
}
.ratingselect .switch.on .icon-check_circle{
    color: #00c580
}
</style>