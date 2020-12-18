<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the as
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.

      <br>
      <ul id="array-with-index">
        <li v-for="item in infos" :key="item.id">
            <router-link :to="`/category/${item.id}`" class="dropdown-item">{{ item.name +" (" + item.min +" - " +item.max + ")" }}</router-link>
        </li>
      </ul>
      <br>
      <button @click="increment">Add 13</button>
      The button above has been clicked {{ counter }} {{ test }} times.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

type categoryType = { id: number; name: string; min: number; max: number };

@Options({
  props: {
    msg: {
      type: String,
      required: false,
      readonly: false,
      default: 'test'
    }
  }
})
export default class HelloWorld extends Vue {
  msg!: string;
  counter = 0;

  infos: categoryType[] = [];

  test = 0;

  beforeMount () {
    this.counter = parseInt(this.$route.params.id as string, 10)
  }

  beforeCreate () {
    console.log('tot')
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

  public increment () {
    this.test++
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
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
