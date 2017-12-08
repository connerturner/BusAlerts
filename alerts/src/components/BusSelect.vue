<template>
  <div class="busselection">
    <h3>{{sectionTitle}}</h3>
    <div class="selection">
      <select class="select">
        <option v-for="bus in busList">{{bus.number}}</option>
      </select>
    </div>
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
      sectionTitle: 'Select your bus number:'
    }
  }
}
</script>

<style>
.selection {
  width: 100%;
}
.select {
  width: 20%;
}
</style>
