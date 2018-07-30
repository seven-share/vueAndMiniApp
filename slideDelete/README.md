# 微信小程序侧滑删除
### 侧滑删除效果，目前我发现有两种做法
### 效果图  
![](GIF.gif)
### 1. 使用scroll-view实现
- 在scroll-view上bindtouchmove是无效的，bindtouchstart和end是可以的，非要使用bindtouchmove的话可以绑定在scroll-view内部
- 因为scroll-view本身就可以滑动，所以bindtouchemove影响不大，使用start和end就可以实现效果
- 由于scroll-view的scroll-left是数值，单位是px，所以删除按钮部分需要设置为px，不能设置为rpx
- 判断手指滑动距离，得出方向，设置sceoll-left数值即可
- 如果滑动距离短，使scroll-left恢复原状

### 2. 使用view实现
- 使用两个view，flex横向布局实现布局
- 使用相对定位，也可以使用绝对定位，但绝对定位脱离文档流，不太推荐
- 设置view，style的left绑定的值，改变它的值即可实现删除按钮的移动
- 使用transition，使滑动有一定的动效
- 在view上使用bindtouchmove，可以实现随手指滑动，删除按钮随时动，如果不用bindtouchmove也可以实现效果，但是手指滑动的时候，删除按钮不动，滑动结束后，才会移动
- 注意left的值需要加上rpx
### 3. 开发思考
- 由于从后端传来的数据肯定没有设置删除按钮的初始的left值，需要在前端将需要展示的数据添加left，并初始化赋值，其实不初始化，直接移动后动态添加left也可以，个人觉得有一个初始化添加较为严谨
