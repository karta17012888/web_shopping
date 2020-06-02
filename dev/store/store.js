import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const store_in = new Vuex.Store({
    
    components: {    },

    state: { 

        user_id: "",

        user_name: "",

        user_email: "",

        user_token: "", 
    },
    
    getters: {   

        get_token: function( state ){  return state.user_token  }
    }, 
    

    actions: {  

        set_id( {commit, dispatch, rootState, state}, context ) {  commit( 'set_id' , context );  },
        set_name( {commit, dispatch, rootState, state}, context ) {  commit( 'set_name' , context );  },
        set_email( {commit, dispatch, rootState, state}, context ) {  commit( 'set_email' , context );  },
        set_token( {commit, dispatch, rootState, state}, context ) {  commit( 'set_token' , context );  },

    },
    
    
    mutations: {  
        
        set_id: function( state, data ){  state.user_id = data  } ,
        set_name: function( state, data ){  state.user_name = data  } ,
        set_email: function( state, data ){  state.user_email = data  } ,
        set_token: function( state, data ){  state.user_token = data  } ,
    },
    

})

export default store_in;  