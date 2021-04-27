<template>
<div id="app">
  <div class="header">
    <router-link to="/">
    <h1>Books page</h1>
    </router-link>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p class="copyWrite">
      Rand Al Rabadi&copy; 2021
    </p>
    <ul class="footer-nav">
      <li><router-link to="/admin">Admin</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><a href="https://github.com/Rand1551997/CreativeProject4"> Github</a></li>
    </ul>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #cd5d7d;
  color: #a7c5eb;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

#app{
background-color: #f6ecf0;
}

.title {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title link{
  text-decoration: none;
}

.title h1 {
  font-size: 50px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

.footer-nav li + li{
  margin-left: 10px;
}

/* Footer */
.footer {
  height: 70px;
  padding: 20px 100px 0px 100px;
  background: #cd5d7d;
  font-size: 12px;
}
.copyWrite{
  float: left;
  font-size: 20px;
}
.footer-nav{
  list-style: none;
  float: right;
}
.footer-nav li{
  float: left;
  font-size: 20px;
}
.footer a {
  color: #000;
}
h1 {
  font-size: 20px;
}
h2 {
  font-size: 14px;
}
</style>
