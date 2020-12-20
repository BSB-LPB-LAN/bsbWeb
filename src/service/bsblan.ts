export interface Category {
  id: number;
  name: string;
  min: number;
  max: number;
}

export interface Parameter {
  id: number;
  name: string;
  value?: string;
  readonly: boolean;
  enum: { value: number; name: string }[];
  raw: object;
}

export class BSBLan {
    private useCache = true

    private version = 0

    private url = '/api/'

    constructor (url?: string) {
      if (url) {
        this.url = url
      }
    }

    private async getCategoriesV0 () {
      const json = await (await fetch('/api/JK=ALL')).json()

      const categories: Category[] = []

      for (const key in json) {
        const item = json[key]
        categories.push({
          id: parseInt(key, 10),
          name: item.name,
          min: item.min,
          max: item.max
        })
      }
      return categories
    }

    async getCategories () {
      // check if in cache
      // else fetch correct apiVersion
      let data: Category[] | null = null

      if (this.useCache) {
        const cacheValue = sessionStorage.getItem('Categories')

        if (cacheValue) {
          data = JSON.parse(cacheValue)
        }
      }

      if (!data) {
        data = await this.getCategoriesV0()

        if (this.useCache) {
          sessionStorage.setItem('Categories', JSON.stringify(data))
        }
      }

      return data ?? []
    }

    private async getCategoryV0 (id: number) {
      const json = await (await fetch('/api/JK=' + id)).json()

      const parameter: Parameter[] = []

      for (const key in json) {
        const item = json[key]
        parameter.push({
          id: parseInt(key, 10),
          name: item.name,
          readonly: item.readonly,
          enum: [],
          raw: item
        })
      }
      return parameter
    }

    async getCategory (id: number) {
      let data: Parameter[] | null = null

      if (this.useCache) {
        const cacheValue = sessionStorage.getItem('Category ' + id)

        if (cacheValue) {
          data = JSON.parse(cacheValue)
        }
      }

      if (!data) {
        data = await this.getCategoryV0(id)

        if (this.useCache) {
          sessionStorage.setItem('Category ' + id, JSON.stringify(data))
        }
      }

      return data ?? []
    }
}
