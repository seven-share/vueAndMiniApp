<template>
  <div class="star" :class="starType">
      <div v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></div>
  </div>
</template>

<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off'
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    data () {
        return {

        };
    },
    computed:{
        starType:function(){
            return 'star-'+this.size;
        },
        itemClasses:function(){
            let result=[];
            let score=Math.floor(this.score*2)/2;
            let hasDecimal=score % 1 !==0;
            let intager=Math.floor(score);
            for(let i=0;i<intager;i++){
                result.push(CLS_ON)
            }
            if(hasDecimal){
                result.push(CLS_HALF)
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF);
            }
            return result
        }
    },
    components: {},
    methods: {}
}

</script>
<style scoped>
.star{
    display: flex;
}


.star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px; 
}
.star-48 .star-item:last-child{
    margin-right: 0px;
}
.star-48 .star-item.on{
    background-image: url('./star48_on@2x.png');
}
.star-48 .star-item.half{
    background-image: url('./star48_half@2x.png');
}
.star-48 .star-item.off{
    background-image: url('./star48_off@2x.png');
}

.star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px; 
}
.star-36 .star-item:last-child{
    margin-right: 0px;
}
.star-36 .star-item.on{
    background-image: url('./star36_on@2x.png')
}
.star-36 .star-item.half{
    background-image: url('./star36_half@2x.png')
}
.star-36 .star-item.off{
    background-image: url('./star36_off@2x.png')
}


.star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px; 
}
.star-24 .star-item:last-child{
    margin-right: 0px;
}
.star-24 .star-item.on{
    background-image: url('./star24_on@2x.png')
}
.star-24 .star-item.half{
    background-image: url('./star24_half@2x.png')
}
.star-24 .star-item.off{
    background-image: url('./star24_off@2x.png')
}
</style>