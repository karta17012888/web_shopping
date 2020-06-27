<template>
    
    <div style=" padding:20px; " >

        <div>  <label>註冊</label>  </div>
        
        <br>

        <div>
            <label>姓名:</label>
                
            <input type="text" v-model="register_1" >
        </div>

        <br>

        <div>
            <label>信箱:</label>
            <input type="text" v-model="register_2" >
        </div>
        
        <br>

        <div>
            <label>密碼:</label>
            <input type="text" v-model="register_3" >
        </div>

        <br>

        <input type="button" value="註冊" v-on:click="bt_register()">

    </div>
    

</template>


<script>

    import axios from 'axios';

    const app = {
        
        components: {  },
        data(){  
            return {
                register_1: "", register_2: "", register_3: ""  
            }  
        
        },
        
        watch: {  },
        computed: {  },
        
        methods: {  

            bt_register(){
                
                var that = this  
                
                if(  !that.register_1  &&  !that.register_2  &&  !that.register_3  ){  alert( "請填妥資料" )  }

                else{  
                     
                    axios( {  
                        method: 'post',  url: '/member/register',  
                        data:{ name: that.register_1, email: that.register_2, password: that.register_3 }
                    } )
                    
                    .then( function( res ){  
                    
                        if( res.data.err ){  alert( res.data.err )  }
                        
                        else{  that.$router.push( { name: "login" })  }
                    })  

                }    
 

            }


        },
    }
    export default app;

</script>

    

<style>

</style>