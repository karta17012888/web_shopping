<template>
    
    <div id="home_box" >        <!-- border: 1px solid #000;  -->
        
        <div style=" width: 100%; height: 10%; " >

            <button id="button_size" v-on:click="change_page( 'shopping' )" >訂購</button>
            <button id="button_size" v-on:click="change_page( 'cart' )" >購物車</button>
            <button id="button_size" v-on:click="change_page( 'over' )" >已結清</button>
            <button id="button_size" v-on:click="change_page( 'member' )" >會員中心</button>
            <button id="button_size" v-on:click="change_page( 'logout' )" >登出</button>

        </div>
        

    
        <div v-if=" this.see_status == 'ready' "  style=" width: 100%; height: 90%; " >

            <p>商品訂購</p>
                    
            <table id="product_table"  >

                <tr>        
                            
                    <th width="20%" class="p311_th" > 產品名稱 </th>
                    <th width="20%" class="p311_th" > 單價 </th>
                    <th width="20%" class="p311_th" > 庫存 </th>
                    <th width="20%" class="p311_th" > 產品說明 </th>
                    <th width="20%" class="p311_th" > 訂購數量 </th>
                </tr>

                <tr v-for="( item,index ) in product_box" :key="index" >

                    <td  v-for=" i in product_number_param " :key="i" >   
                                
                        <div v-if=" i!=4 ">   <p> {{ item[i] }} </p>   </div>
                                
                        <div v-else  >
                                                                                  
                            <button style=" display: inline-block; width:20px; height:25px; " v-on:click=" more_or_less_product_buy( 1, index ) " > + </button>
                                    
                            <p style=" display: inline-block; white-space:pre; " >    {{ buy_number( index )  }}   </p>
                                    
                            <button style=" display: inline-block; width:20px; height:25px; " v-on:click=" more_or_less_product_buy( 0, index ) " > - </button>
                                
                        </div>
                    </td>
                </tr>

            </table>


            <button style=" margin-top: 20px; " v-on:click=" test_token( 'send_order' ) " > 送出訂單 </button>



        </div>


        <div v-else-if=" this.see_status == 'no_ready' "  style=" width: 100%; height: 90%; " >

            <p>  請稍候  </p>
            
        </div>



    </div>
    

</template>


<script> 
    import axios from 'axios';
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex' ;



    const app = {
        
        components: {  },
        
        data(){  
            return {  
                see_status: 'no_ready',
                product_box:[], product_number_param:[], product_buy_number:[],  // 可購買的資料,  資料種類數,  想訂購的數量

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




            buy_number( n ){  return this.product_buy_number[n][1]  },  // 返回頁面中不同商品的選購數量





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

                                    that.product_menu()
                                }) 
                            }
                        })
                    }
                }
                
                else{  this.test_token( "get_product_meun" )  }
            },





            test_token( type, path ){    //判斷 token 是否過期, 任何跟後端抓取資料都要先經過
                var that = this;

                axios( {  method: 'post',  url: '/member/token',  data:{ token: that.user_token  }   } )
                
                .then( function ( result ) { 
                    
                    if( result.data.err ){  console.log( result.data.err ), that.$router.push({ name: "login" })  }
                    
                    else{ 
                
                        switch( type ){

                            case "get_product_meun":  that.product_menu(); break;
                            case "send_order": that.send_buy() ; break;
                            case "change_page": that.$router.push({  name: `${path}`  }); break;
                        }
                    
                    }
                })  
            },


            product_menu(){    //  獲取 所有產品清單
                
                var that = this;        
 
                axios( {  method: 'get',  url: '/product'  } )
                
                .then( function ( res ) {  that.make_product_list( res.data )  }) 
            },


            make_product_list( data ){     //  取得產品清單後 分類產品資訊

                var product_box_temp=[], product_buy_number_temp=[], product_number_param_temp=[]

                for( var j=0; j < data.length ; j++ ){   

                    product_box_temp.push( [] )
                
                    product_box_temp[j].push( data[j].name )
                    product_box_temp[j].push( data[j].price )
                    product_box_temp[j].push( data[j].quantity )
                    product_box_temp[j].push( data[j].remark )
                    product_box_temp[j].push( data[j].id )
                    
                    product_buy_number_temp.push( [] )
                    product_buy_number_temp[j].push( data[j].id )
                    product_buy_number_temp[j].push( 0 )
                }

                for( var i=0; i < product_box_temp[0].length ; i++ ){  product_number_param_temp.push( i )  }
                
                this.product_box = product_box_temp.slice(0)
                this.product_buy_number = product_buy_number_temp.slice(0)
                this.product_number_param = product_number_param_temp.slice(0)
                

                if(  this.product_box && this.product_buy_number && this.product_number_param  ){  this.see_status = 'ready' }

            },



            more_or_less_product_buy( n, index ){    // 訂購商品的 數量加減

                if( n==1 ){

                    if( this.product_buy_number[index][1] < this.product_box[index][2] ){

                        this.$set( this.product_buy_number[index], 1 , this.product_buy_number[index][1] + 1 )
                    }
                }

                else{

                    if( this.product_buy_number[index][1] > 0 ){
                        
                        this.$set( this.product_buy_number[index], 1 , this.product_buy_number[index][1] - 1 )
                    }
                }
            },




            send_buy(){  // 送出購買清單  
                
                const order = this.order_check()
                
                if( order == null ){ alert( "購買數量不能為零" ) }
                
                else{  
                    
                    var that = this ;
                    axios( {  
                        method: 'post',  url: '/order/add',  
                        
                        data:{  order_list: order,  member_id: that.user_id  }
                    } )
                    
                    .then( function ( res ) {  

                        if(  res.data.err  ){   alert( res.err )  }
                        
                        else{  alert( res.data )  }

                        that.recovery_main_page()
                    })  
                    
                    .catch( function ( err ) {  console.log( err )  } ) 
                }
            },



            order_check(){   // 送出購買清單前 拆解清單 去除無購買的清單項目 若訂購數量為0 回傳 null
                
                var product_order=[]           
                
                for( var i=0, j=0 ; i < this.product_buy_number.length ; i++ ){

                    if( this.product_buy_number[i][1] != 0 ){    
                        
                        product_order.push( [] )
                        
                        product_order[j].push( this.product_buy_number[i][0] )
                        
                        product_order[j].push( this.product_buy_number[i][1] )
                        j++
                    }
                }  
                
                if(  product_order.length > 0  ){  return product_order  }
                else{  return null  }
            },
           

            recovery_main_page(){  // 送出訂單後 重整頁面

                this.see_status = 'no_ready'  
                this.product_menu()
            },


            change_page( path ){  // 頁面跳轉

                if( path == "shopping" ){  this.recovery_main_page()  }
                
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