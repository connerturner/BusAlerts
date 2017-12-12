<template>
  <div class="busselection">
    <h3>{{sectionTitle}}</h3>
    <div class="form-group selection">
      <select class="form-select Select" v-model="selected">
        <option v-for="bus in busList" v-bind:value="bus.number">{{bus.number}}</option>
      </select>
    </div>
    <button class="btn btn-primary btn-lg">Subscribe to {{ selected }} notifcations</button>
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

<style scoped>
select {
  margin: 10px 50px 10px 50px;
  border: 1px solid #111;
  background: transparent;
  width: 206px;
  padding: 5px 10px 5px 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(<%= htmlWebpackPlugin.files.publicPath %>static\img\icons\down.ico);
}

/* look I don't want to include IE specific styles but I have to.*/

select::-ms-expand { 
    display: none; /* remove default arrow in IE 10 and 11 */
}

/* target Internet Explorer 9 to undo the custom arrow */
@media screen and (min-width:0\0) {
    select {
        background:none\9;
        padding: 5px\9;
    }
}

.btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border: .05rem solid #5755d9;
  border-radius: .1rem;
  color: #5755d9;
  cursor: pointer;
  display: inline-block;
  font-size: .8rem;
  height: 1.8rem;
  line-height: 1rem;
  outline: none;
  padding: .35rem .4rem;
  text-align: center;
  text-decoration: none;
  transition: all .2s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.btn:focus {
  box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);
}

.btn:focus,
.btn:hover {
  background: #f1f1fc;
  border-color: #4b48d6;
  text-decoration: none;
}


.btn:active.loading::after,
.btn.active.loading::after {
  border-bottom-color: #fff;
  border-left-color: #fff;
}

.btn[disabled],
.btn:disabled,
.btn.disabled {
  cursor: default;
  opacity: .5;
  pointer-events: none;
}

.btn.btn-primary {
  background: #5755d9;
  border-color: #4b48d6;
  color: #fff;
}

.btn.btn-primary:focus,
.btn.btn-primary:hover {
  background: #4240d4;
  border-color: #3634d2;
  color: #fff;
}

.btn.btn-lg {
  font-size: .9rem;
  height: 2rem;
  padding: .45rem .6rem;
}

.btn.btn-primary:active,
.btn.btn-primary.active {
  background: #3a38d2;
  border-color: #302ecd;
  color: #fff;
}

.btn.btn-primary.loading::after,
.btn.btn-success.loading::after,
.btn.btn-error.loading::after {
  border-bottom-color: #fff;
  border-left-color: #fff;
}
</style>