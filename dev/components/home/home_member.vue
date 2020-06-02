<template>
    
    <div id="home_box" >        <!-- border: 1px solid #000;  -->


        <div style=" width: 100%; height: 10%; " >

            <button id="button_size" v-on:click="change_page( 'shopping' )" >訂購</button>
            <button id="button_size" v-on:click="change_page( 'cart' )" >購物車</button>
            <button id="button_size" v-on:click="change_page( '???' )" >已結清</button>
            <button id="button_size" v-on:click="change_page( 'member' )" >會員中心</button>

        </div>


        <div style="width: 100%; height: 90%;" >

            <hr color=black SIZE=3 >

            <div style=" margin: 15px 0px; " >

                <p>  更改資料 </p>
                        
                <div style=" margin: 20px 0px; " >
                        
                    <div>
                        <div style='white-space:pre; width:90px; display: inline-block; ' >  用戶名  : </div>  
                        <input type="text" v-model="edit_1" >
                    </div>
                            

                    <div>
                        <div style='white-space:pre; width:90px; display: inline-block; ' >  密碼      : </div>
                        <input type="text" v-model="edit_2" >
                    </div>
                
                </div>

                <input type="button" value="送出更改" v-on:click=" test_token( 'save_edit' ) ">

            </div>
                

            <hr color=black SIZE=3 >
                
            <div style=" margin: 15px 0px; " >

                <p>基本資料</p>

                <div style="  margin:25px 0px;" >

                    <label style='white-space:pre;' >用戶名 : </label> 

                    <label style='white-space:pre;' > {{ user_name }} </label> 
                </div>


                <div style="  margin:25px 0px; " >

                    <label style='white-space:pre;' >token : </label>

                    <p style=" word-break: break-all; margin:10px 0px;  " >  {{ user_token }} </p>
                </div>

            </div>

            <hr color=black SIZE=3 >

        </div>


    
    </div>
    

</template>


<script> 

    import axios from 'axios';
    import moment from 'moment';
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' ;


    const app = {
        
        components: {  },
        
        data(){  
            return {  
                
                edit_1:"", edit_2:"",
            }  
        },
        
        watch: {  },
        computed: { 

            ...mapState(  { user_id: "user_id" } ),   
            ...mapState(  { user_name: "user_name" } ), 
            ...mapState(  { user_email: "user_email" } ), 
            ...mapState(  { user_token: "user_token" } ), 
        },
        
        methods: {  

            ...mapActions( {  vuex_set_id: 'set_id'  } ),
            ...mapActions( {  vuex_set_name: 'set_name'  } ),
            ...mapActions( {  vuex_set_email: 'set_email'  } ),
            ...mapActions( {  vuex_set_token: 'set_token'  } ),




            check_vuex_token(){   // 載入網頁後 先確認 token vuex

                if(  !this.user_id &&  !this.user_name  &&  !this.user_email  &&  !this.user_token  ){

                    if(  !localStorage['token']  ){  that.$router.push({ name: "login" })  }

                    else{  

                        var that = this;

                        axios( {  method: 'post',  url: '/member/token',  data:{ token: localStorage['token']  }   } )
                        
                        .then( function ( result ) { 

                            if( result.data.err ){  localStorage.clear(), that.$router.push({ name: "login" })  }
                            
                            else{  

                                axios( {  method: 'post',  url: '/member/login/new_page',  data:{ id: result.data.id  }   } )
                                
                                .then( function( result ){  
                                    
                                    that.vuex_set_id(  result.data[0].id  )
                                    that.vuex_set_name(  result.data[0].name  )
                                    that.vuex_set_email(  result.data[0].email  )
                                    that.vuex_set_token(  localStorage['token']  )
                                }) 
                            }
                        })
                    }
                }
                
            },



            test_token( type, path ){    //判斷 token 是否過期, 任何跟後端抓取資料都要先經過
                var that = this;

                axios( {  method: 'post',  url: '/member/token',  data:{ token: that.user_token  }   } )
                
                .then( function ( result ) { 
                    
                    if( result.data.err ){  that.$router.push({ name: "login" })  }
                    
                    else{ 
                
                        switch( type ){
                            
                            case "save_edit":  that.member_edit();  break;
                            case "change_page": that.$router.push({  name: `${path}`  });  break;
                        }
                    
                    }
                })  
            },


            member_edit(){      // 更改會員資料

                var that = this;

                axios( {  
                    method: 'post',  url: '/member/edit',  
                    data:{ name: that.edit_1, password: that.edit_2, member_id: that.user_id  }
                } )
                
                .then( function ( res ) {  
                    
                    alert( "編輯成功" ), console.log( res.data )  
                    that.vuex_set_name( that.edit_1 )
                } )  
                .catch( function ( error ) {  alert( "編輯錯誤" ),  console.log( error )  } ) 
            },
 





            change_page( path ){  // 頁面跳轉

                if( path != "member" ){  this.test_token( "change_page", path )  }
            },





        },


        mounted: function() {  this.check_vuex_token()  },
    
    }
    export default app;

</script>

    

<style>

    *{  margin:0;  padding:0; box-sizing: border-box;  }

    #home_box{  width: 98vw; height: 100vh; padding: 10px 0px 0px 20px;  } 



</style>