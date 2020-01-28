<template>
  <div class="home">
    <div class="flex flex-col items-center">
      <div class="w-64">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Filter by username
          </label>
          <div class="flex">
            <input @keyup.enter="findPerson" v-model="searchPerson"
              name="input-filter"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username">
            <button v-if="showDelete" @click="resetFilter"
              class="resetFilter bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3">
              X
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Author</th>
              <th class="px-4 py-2">Views</th>
              <th class="px-4 py-2">Duplicate</th>
              <th class="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in data">
              <td class="border px-4 py-2">{{person.title}}</td>
              <td class="border px-4 py-2">{{person.name}}</td>
              <td class="border px-4 py-2">{{person.views}}</td>
              <td class="border px-4 py-2">
                <button @click="duplicatePerson(person)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  II
                </button>
              </td>
              <td class="border px-4 py-2">
                <button @click="deletePerson(person)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        duplicateData: null,
        searchPerson: '',
        showDelete: false,
        data: [{ name: 'Nico', views: 123, title: 'Articulo 1' },
        { name: 'Claudia', views: 100, title: 'Articulo 2' },
        { name: 'Taco', views: 50, title: 'Articulo 3' },
        { name: 'Maria', views: 500, title: 'Article 4' },
        { name: 'Jose', views: 300, title: 'Article 5' }]
      }
    },
    methods: {
      duplicatePerson(person) {
        let count = this.data.filter(x => { return x.name == person.name }).length
        let title = person.title.split('copy')[0] + ' copy (' + (count + 1) + ')'
        this.data.push({ name: person.name, views: person.views, title: title })
      },
      deletePerson(person) {
        this.data = this.data.filter(x => { return x.title != person.title })
      },
      findPerson() {

        this.duplicateData = this.data.slice()
        this.data = this.data.filter(x => { return x.name.toLowerCase().includes(this.searchPerson.toLowerCase()) })
        this.showDelete = true
      },
      resetFilter() {
        this.showDelete = false
        this.data = this.duplicateData.slice()
        this.searchPerson = ''
      }
    }
  }
</script>