<template>
  <table>
    <tr v-for="item in parameter" :key="item.id">
      <td>{{ item.id +': ' + item.name }}</td>
      <td><input></td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

type parameterType = {id: number; name: string; value?: string};

export default class Category extends Vue {
    parameter: parameterType[] = [];

    updateView () {
      const id = (this.$route.params.id as string) ?? ''

      let found = false
      try {
        this.parameter = JSON.parse(localStorage[id])
        console.log(this.parameter)
        found = true
      } catch {
        found = false
      }

      if (!found) {
        fetch('/api/JK=' + id, {
          mode: 'cors',
          credentials: 'include'
        })
          .then((resp) => resp.json())
          .then((data) => {
            const parameter: parameterType[] = []

            for (const key in data) {
              const item = data[key]
              parameter.push({
                id: parseInt(key, 10),
                name: item.name
              })
            }
            localStorage[id] = JSON.stringify(parameter)
            this.parameter = parameter
          })
      }
    }

    created () {
      this.updateView()

      this.$watch('$route', () => {
        this.updateView()
      })
    }
}
</script>

<style scoped lang="scss">
td {
  //display: inline-block;
  text-align: left;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
