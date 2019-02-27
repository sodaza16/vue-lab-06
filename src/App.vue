<template>
  <div id="app">
    <ul class="menu w-500px centered">
      <li>
        <router-link to="/news-feed">News Feed</router-link>
      </li>
      <li>
        <router-link to="/add-news-feed">Add News</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<style>
body{
  background: khaki;
}
.w-500px {
  width: 500px;
}
.centered {
  margin: 0 auto;
}
ul.menu{
  display: flex;
  flex-direction: row;
}
ul.menu li{
  display: block;
  text-align: center;
  margin: 0 2px;
  padding: 5px;
  background: teal;
  color: white;
  border: solid darkslategrey 1px;
  border-radius: 2px;
}
ul.menu li a{
  color: white;
  text-decoration-line: none;
}
</style>
