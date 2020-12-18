<template>
  <ul id="array-with-index">
    <li v-for="item in infos" :key="item.id">
        <router-link :to="`/category/${item.id}`" class="dropdown-item">{{ item.name +" (" + item.min +" - " +item.max + ")" }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

type categoryType = { id: number; name: string; min: number; max: number };

export default class Categories extends Vue {
    infos: categoryType[] = [];

    beforeCreate () {
      fetch('/api/JK=ALL', {
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          const categories: categoryType[] = []

          for (const key in data) {
            const item = data[key]
            categories.push({
              id: parseInt(key, 10),
              name: item.name,
              min: item.min,
              max: item.max
            })
          }
          this.infos = categories
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
