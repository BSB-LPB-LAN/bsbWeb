<template>
  <table>
    <tr v-for="item in parameter" :key="item.id">
      <td>{{ item.id +': ' + item.name }}</td>
      <td>{{ item.value }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { BSBLan, Parameter } from '@/service/bsblan'

export default class Category extends Vue {
    parameter: Parameter[] = [];

    private bsb = new BSBLan()

    async getValue (id: number) {
      const data = await fetch('/api/JQ=' + id)
      try {
        const json = await data.json()
        return json['' + id].value
      } catch (err) {
        debugger
        console.log(err)
      }
    }

    async updateView () {
      const id = parseInt((this.$route.params.id as string) ?? '', 10)
      if (!isNaN(id)) {
        const res = await this.bsb.getCategory(id)
        for (const item of res) {
          item.value = '... loading'
        }

        this.parameter = res

        for (const item of this.parameter) {
          item.value = await this.getValue(item.id)
        }
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
