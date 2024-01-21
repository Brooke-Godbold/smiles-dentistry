<template>
  <BaseItem>
    <img :src="src" :class="$style.serviceImage" />
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </BaseItem>
</template>

<script setup>
import BaseItem from '../../ui/BaseItem.vue'

import { ref } from 'vue'

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisi consectetur leo dictum ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam scelerisque commodo ante, nec aliquet nulla euismod ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum est in odio malesuada fringilla. Ut vitae hendrerit felis, ut gravida nunc. Phasellus ac ex congue, pellentesque enim ac, sollicitudin lectus. Duis sed magna in nisl molestie tempor.
    
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed aliquam vitae nisi ut faucibus. Praesent tempor ut arcu sed ullamcorper. Nulla malesuada nulla nunc, vel lobortis dui mattis ut. Sed sed cursus leo. Quisque eu viverra velit. Duis et vehicula metus. Sed orci mi, semper ut suscipit et, accumsan quis ligula.
    
    Maecenas elementum nulla odio, fermentum pharetra mauris congue eget. Nulla ut odio eget ipsum ultrices molestie vitae at libero. Phasellus tempus fermentum metus, a euismod lorem tincidunt ut. Curabitur eget condimentum elit, sit amet venenatis erat. Mauris tellus risus, viverra porttitor ex lacinia, volutpat malesuada ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus in lorem in odio pellentesque lobortis quis in tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis placerat libero vel metus dictum, vitae euismod dui tincidunt. Pellentesque luctus nibh at fringilla sagittis. Praesent nec tincidunt lorem, et tempus magna. Sed et fringilla massa. Donec rutrum urna nec neque scelerisque aliquet. Quisque dignissim tortor nibh, eget varius felis lobortis vel. Nulla consectetur risus a dui egestas, id consectetur justo bibendum. In laoreet mi purus, a eleifend velit porttitor at.
    
    Curabitur augue massa, pharetra vitae vestibulum pulvinar, pulvinar eu urna. Aenean vel lacus et justo tempus volutpat. Phasellus laoreet dolor quis libero dignissim dignissim. Fusce pulvinar elit id aliquam viverra. Fusce vitae urna eu ante suscipit aliquam at nec nisl. Aenean ac efficitur orci. Pellentesque interdum pulvinar feugiat. Nunc sem enim, sagittis auctor commodo ac, tempus a nunc. Suspendisse fermentum tempus condimentum.
    
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean sed lacus efficitur orci consectetur consequat eu at tortor. Nullam sed urna quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eu odio ac velit faucibus ullamcorper ac eu tortor. Cras non urna scelerisque, dignissim felis nec, tincidunt erat. Pellentesque et nisi nulla. Proin vitae diam scelerisque, tempor tellus eget, pharetra ligula. Vestibulum consequat quam a magna finibus, id sollicitudin lectus egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla eget viverra dolor. Suspendisse maximus sollicitudin purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ullamcorper lacus eu tellus fermentum, quis dapibus mi viverra. Nam eu lobortis sem.`

const title = ref('Routine Check Ups')
const content = ref(lorem)
const src = `https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
</script>

<style src="./ServiceItem.styles.css" module />
