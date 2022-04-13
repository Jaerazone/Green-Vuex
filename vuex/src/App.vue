<template>
  <div id="app">
    <!-- $store.state.count를 통해서 값을 바로 들고 올수있다 -->
    <h1>카운터에서 가져온 값입니다{{count}}</h1>
    <button @click="$store.commit('addcount')">추가</button>
    <button @click="addcount">추가</button>
    <button @click="addcountaction">추가(Action)</button>
    <button @click="timer">1초 뒤 추가(Action)</button>
    <button @click="nTimer({count : 50, time:10000})">10초 뒤 50추가(Action)</button>
    <!-- 밀리세컨드라서 *1000 해줌 -->

    <!-- 버튼을 누르면 1초마다 count값이 1씩 증가하는 Action을 만들어 추가해주세요 -->
    <!-- setInterval -->
    <button @click="timersecond">1초마다 1씩추가(Action)</button>
    

    <!-- 버튼을 누르면 1감소하는 버튼을 추가해주세요 -->
    <button @click="$store.commit('subcount')" >감소</button>

    <ul>
      <li 
      v-for="(list,i) in $store.state.list" 
      :key="i"
      >
      {{list.memo}}
      </li>
    </ul>

    <!-- 
      index.js  name :['홍길동', '성춘향', '그린'] 을 추가하고 
      아래에 computed를 이용하여 간략하게 만들어 출력하세요
    -->
    <ul>
      <li
      v-for ="(name,i) in name"
      :key="i"
      >
      {{name}}
      </li>
    </ul>   


    <p>{{ doneTodosCount }}</p>
    <p>{{ $store.getters.doneTodosCountGetter }}</p>
    <p>{{ doneTodosCountGetter }}</p>

    <HelloWorld />

  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  computed : {
    //머스테치 안의 내용이 길어지면 coumputed를 통해서 출력해줄수있다
      count : function (){
        return this.$store.state.count;
      },
      name : function() {
        return this.$store.state.name;
      },
      doneTodosCount : function(){
        return this.$store.state.todos.filter(todo=> todo.done).length;
      },
      doneTodosCountGetter : function() {
        // store getters 를 통해 계산된 내용을 컴포넌트마다 가져와서 사용
        return this.$store.getters.doneTodosCountGetter;
      },
      todosReverse : function(){
        return this.$store.getters.todosReverse;
      }
    },
    methods: {
      // Mutations 메서드에 두개가 동시에 들어가있기 때문에

      addcount : function() {
        this.$store.commit('addcount');
      },
      //Action의 메서드는 dispatch를 통해 들고온다
      addcountaction : function() {
        this.$store.dispatch('addcount');
      },
      timer : function() {
        this.$store.dispatch('timer');
      },
      nTimer : function(time) {
        this.$store.dispatch('nTimer', time);
      },
      timersecond : function() {
        this.$store.dispatch('timersecond');
      }
    },

  components: {
    HelloWorld,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
