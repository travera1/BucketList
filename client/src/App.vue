<template>
  <div class="app">
    <h1 class="subtitle has-text-centered">Bucket List Maker:</h1>
    <hr>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" placeholder="Go to Mars..." class="input" v-model="description">
      </div>
      <div class="control">
        <button class="button is-danger" @click="addItem()" :disabled="!description">Add</button>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input v-if="isSelected(item)" type="text" class="input" v-model="editedDescription">
        <p v-else class="column">
            <span class="tag mr-3 is-primary">{{ i + 1 }}</span>{{ item.description }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-link pr-3" @click="isSelected(item) ? unselect() : select(item)">
            <i v-if="isSelected(item)" class="fas fa-window-close"></i>
            <i v-else class="fas fa-edit"></i>
          </span>
          <span class="icon has-text-danger" @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
            <i v-if="isSelected(item)"  class="fas fa-check"></i>
            <i v-else class="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
//import axios from 'axios'
import axios from "axios"
export default {
  name: 'App',
  data () {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {}
    }
  },
  async mounted() {
    const response = await axios.get("api/bucketListItems/")
    this.items = response.data
  },
  methods: {
    select(item) {
      this.selected = item
      this.editedDescription = item.description
    },
    unselect() {
      this.selected= {}
      this.editedDescription=""
    },
    isSelected(item) {
      return this.selected._id == item._id
    },
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
        description: this.description
      });
      this.items.push(response.data);
      this.description="";
    },
    async updateItem(item, i){
      const response = await axios.put("api/bucketListItems/"+item._id, {
        description: this.editedDescription
      })
      this.items[i] = response.data
      this.unselect();
    },
    async removeItem(item, i){
      await axios.delete("api/bucketListItems/"+item._id)
      this.items.splice(i, 1)
    }
  }
}
</script>

<style>
.app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
