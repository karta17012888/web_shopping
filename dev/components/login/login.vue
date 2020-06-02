<template>
    
    <div style=" padding:20px; " >

        <div>  <label>登入</label>  </div>

        <br>

        <div>
            <label>電子信箱:</label>
                
            <input type="text" v-model="login_1" >
        </div>

        <br>

        <div>
            <label>密碼:</label>
            <input type="text" v-model="login_2" >
        </div>

        <br>

        <input type="button" value="登入" v-on:click="bt_login()">
        
        <br>
        <br>
        
    
    </div>
    

</template>


<script>
    import axios from 'axios';
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' ;

    const app = {
        
        components: {  },
        data(){  
            return {
                
                login_1: "" ,  login_2: "" ,  
            }  
        },
        
        watch: {  },

        computed: {  ...mapState(  { user_id: "user_id" } ),  },
        
        methods: {  

            bt_login(){

                var that = this;        
 
                axios( {  
                    method: 'post',  url: '/member/login',  
                    data:{ account: that.login_1, password: that.login_2 }
                } )
                
                .then( function ( res ) {  
                    
                    if( res.data.status == "登入失敗" ){  alert( res.data )  }
                    
                    else{ 
                        
                        that.set_sessionStorage_and_vuex( res.data.data[0], res.headers.token )
                            
                            .then( function( result ){   that.$router.push( { name: "shopping" })  })
                    }
                })  
                
                .catch( function ( err ) {  console.log( err)  } ) 
            },


            set_sessionStorage_and_vuex( data_array, token ){    // 寫入sessionStorage 的 token 和 vuex

                var that = this

                return  new Promise( function( resolve, reject ){
                    
                    localStorage.clear()
                    sessionStorage.clear()
                    localStorage.setItem( 'token', token )


                    that.x_set_id( data_array.id )
                    that.x_set_name( data_array.name )
                    that.x_set_email( data_array.email )
                    that.x_set_token( token )

                    resolve( "sessionStorage_vuex_over" )
                })  
            },

            ...mapActions( {  x_set_id: 'set_id'  } ),
            ...mapActions( {  x_set_name: 'set_name'  } ),
            ...mapActions( {  x_set_email: 'set_email'  } ),
            ...mapActions( {  x_set_token: 'set_token'  } ),
        


        },
        
    

        mounted: function() {    },


    }
    export default app;

</script>

    

<style>

</style>