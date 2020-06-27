<template>
    
    <div id="home_box" >        <!-- border: 1px solid #000;  -->


        <div style=" width: 100%; height: 10%; " >

            <button id="button_size" v-on:click="change_page( 'shopping' )" >訂購</button>
            <button id="button_size" v-on:click="change_page( 'cart' )" >購物車</button>
            <button id="button_size" v-on:click="change_page( 'over' )" >已結清</button>
            <button id="button_size" v-on:click="change_page( 'member' )" >會員中心</button>
            <button id="button_size" v-on:click="change_page( 'logout' )" >登出</button>
        </div>

        
        
        <div v-if=" this.see_status == 'no_ready' "  style=" width: 100%; height: 90%; " >

            <p>  請稍候  </p>
            
        </div>




        <div v-else-if=" this.see_status == 'ready' "  style=" width: 100%; height: 90%; " >

            <p>已結清訂單</p>
                    
            <table id="product_table"  >

                <tr>        
 
                    <th width="25%" class="p311_th" > 結清日期 </th>
                    <th width="25%" class="p311_th" > 產品名稱 </th>
                    <th width="25%" class="p311_th" > 價格 </th>
                    <th width="25%" class="p311_th" > 數量 </th>

                </tr>
                
                
                <tr v-for="( item,index ) in member_order_over_box" :key="index" >           <!--  index = 0~21 直排 -->
                    
                    <td v-for=" i in member_order_over_param " :key="i" >                     <!--  i = 0~5 橫排 -->

                        <br>
                        {{ item[i] }}
                        <hr color=black SIZE=3 >
                        
                    </td>
                </tr> 
                
            </table>

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
                
                see_status: 'no_ready',
                member_order_over_box:[], member_order_over_param:[ 1,2,3,4 ]
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


            check_vuex_token(){   // 載入網頁後 先確認確認 token vuex

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

                                    that.member_order_over()
                                }) 
                            }
                        })
                    }
                }
                
                else{  this.test_token( "get_member_order_over" )  }
            },





            test_token( type, path ){    //判斷 token 是否過期, 任何跟後端抓取資料都要先經過
                var that = this;

                axios( {  method: 'post',  url: '/member/token',  data:{ token: that.user_token  }   } )
                
                .then( function ( result ) { 
                    
                    if( result.data.err ){  console.log( result.data.err ), that.$router.push({ name: "login" })  }
                    
                    else{ 
                
                        switch( type ){

                            case "get_member_order_over":  that.member_order_over(); break;
                            case "change_page": that.$router.push({  name: `${path}`  }); break;
                        }
                    
                    }
                })  
            },


            member_order_over(){    //  獲取 所有已結清的訂單

                var that = this;        
 
                axios( {  method: 'post',  url: '/order/over',  data:{  id: that.user_id  }  } )
                
                .then( function ( res ) {  that.make_member_order_over_list( res.data )   }) 
                
            },



            make_member_order_over_list( data ){     console.log( data )

                var member_order_over_box_temp=[]

                for( let i=0 ; i < data.length ; i++ ){

                    member_order_over_box_temp.push( [] )
                    member_order_over_box_temp[i].push( data[i].order_id, moment( data[i].update_date ).format('YYYY-MM-DD'), data[i].product_name, data[i].order_price, data[i].order_quantity )

                }

                this.member_order_over_box = member_order_over_box_temp
                console.log(this.member_order_over_box)
                this.see_status = 'ready'
    
            },









            change_page( path ){  // 頁面跳轉

                if( path == "over" ){  /*this.recovery_main_page()*/  }
                
                else if( path == "logout" ){ 

                    localStorage.clear()
                    sessionStorage.clear()
                    this.vuex_set_id( '' )
                    this.vuex_set_name( '' )
                    this.vuex_set_email( '' )
                    this.vuex_set_token( '' )
                    this.$router.push( { name: "login" })
                }

                else{  this.test_token( "change_page", path )  }
            },



        },


        mounted: function() {  this.check_vuex_token()  },
    
    }
    export default app;

</script>

    

<style>

    *{  margin:0;  padding:0; box-sizing: border-box;  }

    #home_box{  width: 98vw; height: 100vh; padding: 10px 0px 0px 20px;  } 

    #product_table{ 
        
        border: 1px solid #000; 
        font-family: 微軟正黑體; 
        font-size: 16px; 
        
        text-align: center;
        border-collapse: collapse;
        
        width: 100%;
        height: 40%;
        margin: 10px 0px;
    } 

</style>