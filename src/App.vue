<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "@/components/header/Header"
  import {urlParse} from "./common/js/util";
  const  ERR_OK = 0;
  const debug = process.env.NODE_ENV !== 'production';

  export default {
    name: 'App',
    data(){
      return{
        seller:{
          id:(()=>{
            let queryParam = urlParse();
            console.log(queryParam)
            return queryParam.id
          })()
        }
      }
    },
    created() {
      const url = debug ? '/api/seller' : 'http://cx4390595.coding.me/sell/data/seller.json';
      this.$http.get(url+'?id='+this.seller.id).then((response) => {
        console.log(response)
          response = response.body;
          if(response.errno === ERR_OK){
            this.seller  = Object.assign({},this.seller,response.data);

          }
      })
    },
    components: {
      'v-header': header
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
