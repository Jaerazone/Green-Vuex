import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:10,
    list : [
      { id : 1, memo : "a"},
      { id : 2, memo : "b"}
    ],
    name :['홍길동', '성춘향', '그린'],
    todos : [
      { id : 1, text: '...', done: true},
      { id : 2, text: '...', done: false},
      { id : 3, text: '...', done: true},
    ]
  },
  getters: {
    doneTodosCountGetter: function(state){ // state에 있는값을 들고오기때문에 넣어줌
      return state.todos.filter(todo => todo.done).length;
      // 같은 위치에 있기때문에 $를 안쓴다
    },
    todosReverse : function(state) {
      return state.todos.reverse();
    },
    //todo id값을 통해 todo객체를 반환
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    },
  },
  mutations: { // data의 methods와 비슷한 역할 
    // 동기적으로 실행 : 반드시 앞의 명령어가 수행된 뒤 실행(순차적)
    // 여기 state 데이터가 바뀌는거라서 여기서 생성해준다
    addcount : function(state) {
      state.count++;
    },
    subcount : function(state) {
      state.count--;
    },
    ncount : function(state, n) {
      state.count += n;
    }
  },
  actions: {
    // 비동기적으로 실행 : 동시에 실행 (따로 빠져나와서 실행)
    // 요청한 결과가 그 자리에서 주어지지 않음
    // : 동시에 실행되기 때문에 다른 작업이 실행되고 나중에 결과가 나올수 있음
    addcount(context) {
      //mutations의 메서드를 들고와 상태변화(state)를 축척할수있다
      context.commit('addcount')
      //console.log(context);
    },
    //비동기로 실행
    timer : function(context) {
      setTimeout(function() {
        context.commit("addcount");
      }, 1000);
    },
    //비동기로 실행 + 인자값 받아오기
    nTimer : function(context, time) {
      setTimeout(function() {
        // Matation의 메소드를 commit할때 인자값을 전달하고 싶다면
        // , 를 통해 값(time.count)을 같이 보내준다.
        context.commit("ncount", time.count);
      }, time.time);
    },
    //비동기로 실행
    timersecond : function (context) {
      setInterval(function() {
        context.commit('addcount');
      }, 1000);
    }
  },
  modules: {
  }
})
