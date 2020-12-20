<template>
  <ul id="array-with-index">
    <li v-for="item in infos" :key="item.id">
        <router-link :to="`/category/${item.id}`" class="dropdown-item">{{ item.name +" (" + item.min +" - " +item.max + ")" }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { BSBLan, Category } from '@/service/bsblan'

export default class Categories extends Vue {
    infos: Category[] = [];

    beforeCreate () {
      const bsb = new BSBLan()

      bsb.getCategories()
        .then((data) => {
          this.infos = data
        })
    }
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  text-align: left;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
