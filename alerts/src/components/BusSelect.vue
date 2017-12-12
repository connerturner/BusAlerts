<template>
  <div class="busselection">
    <h3>{{sectionTitle}}</h3>
    <div class="form-group selection">
      <select class="form-select select" v-model="selected">
        <option v-for="bus in busList" v-bind:value="bus.number">{{bus.number}}</option>
      </select>
    </div>
    <button>Subscribe to {{ selected }} notifcations</button>
  </div>
</template>

<script>
export default {
  name: 'busselect',
  data () {
    return {
      busList: [
        {number: '762'},
        {number: '763'},
        {number: '764'},
        {number: '765'},
        {number: '766'}
      ],
      selected: 762,
      sectionTitle: 'Select your bus number:'
    }
  }
}
</script>
