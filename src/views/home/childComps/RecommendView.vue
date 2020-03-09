<template>
  <div class="recommend">
    <div :key="recommmend.index" v-for="recommmend in recommends" class="recommend-item">
      <a :href="recommmend.link">
        <img :src="recommmend.image" alt="">
        <div>{{recommmend.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        defaul(){
          return []
        }
      }
    }
  };
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 15px 0 20px;
  border-bottom: 10px solid #eee;

}
.recommend-item{
  flex:1
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}

</style>
