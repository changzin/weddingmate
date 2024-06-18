<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/productdetail">ProductDetail</router-link> |
      <router-link to="/qnawrite">QnAWrite</router-link> |
    </nav>
    <router-view/>
  </div>
</template>