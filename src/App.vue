<template>
    <div id="app">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/landing">Landing</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/live">Live</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/results">Results</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/voters">voters</router-link>
      </nav>
      <router-view></router-view> <!-- This will render the matched component -->
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  <style>
  /* Your styles here */
  </style>
  