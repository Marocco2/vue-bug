<template>
	<swiper
	  :effect="'cards'"
	  :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :mousewheel="{
      sensitivity: 2,
    }"
    :freemode="{
      enabled: true,
      momentumBounce: false,
      momentumRatio: 30,
      momentumVelocityRatio: 0.001,
      sticky: true,
    }"
    :virtual="{
      addSlidesAfter: 2,
      addSlidesBefore: 2,
      enabled: true,
    }"
	  :grabCursor="true"
	  :modules="modules"
	  id="cards"
	>
	  <swiper-slide v-for="(slideContent, index) in randomUser"
      :key="index"
      :virtualIndex="index">{{slideContent}}</swiper-slide>
	</swiper>
  </template>
  <script lang="ts">
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css/bundle";
  
  import "swiper/css/effect-cards";
  
  import "../styles/cards.css";
  
  // import required modules
  import {FreeMode, Virtual, Autoplay, Mousewheel, EffectCards } from "swiper";
  
// const response = await fetch('https://randomuser.me/api/?results=100');
// const data = await response.json();

  export default {
	components: {
	  Swiper,
	  SwiperSlide,
	},
	setup() {
		const randomUser = Array.from({ length: 1000 }).map(
        (el, index) => `Slide ${index + 1}`
      );
	  return {
		randomUser,
		modules: [FreeMode, Virtual, Autoplay, Mousewheel, EffectCards],
	  };
	},
  };
  </script>