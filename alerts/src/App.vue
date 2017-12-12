<template>
  <div id="app">
    <header>
      <span>Runshaw Bus Alerts</span>
    </header>
    <main>
      <BusSelect></BusSelect>
    </main>
  </div>
</template>

<script>
import BusSelect from './components/BusSelect'
import Subscription from './components/SubscriptionHandler'

export default {
  name: 'app',
  components: {
    BusSelect,
    Subscription
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #5755d9;
  color: #ffffff;
}

h1 {
  font-size: 2em;
  margin: .67em 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: inherit;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: .5em;
  margin-top: 0;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-weight: 500;
}

h1,
.h1 {
  font-size: 2rem;
}

h2,
.h2 {
  font-size: 1.6rem;
}

h3,
.h3 {
  font-size: 1.4rem;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
