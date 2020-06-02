<template>
    
    <div id="home_box" >        <!-- border: 1px solid #000;  -->


        <div style=" width: 100%; height: 10%; " >

            <button id="button_size" v-on:click="change_page( 'shopping' )" >訂購</button>
            <button id="button_size" v-on:click="change_page( 'cart' )" >購物車</button>
            <button id="button_size" v-on:click="change_page( '???' )" >已結清</button>
            <button id="button_size" v-on:click="change_page( 'member' )" >會員中心</button>

        </div>


        <div v-if=" this.see_status == 'ready_cart' "  style=" width: 100%; height: 90%; " >

            <p>購物車</p>
                    
            <table id="product_table"  >

                <tr>        
                    <th width="1%" class="p311_th" > </th>
                    <th width="20%" class="p311_th" > 訂購日期 </th>
                    <th width="20%" class="p311_th" > 產品名稱 </th>
                    <th width="20%" class="p311_th" > 訂購數量 </th>
                    <th width="10%" class="p311_th" > 數量X價格 </th>
                    <th width="9%" class="p311_th" > 總價 </th>

                    <th width="20%" class="p311_th" > 訂單編輯 </th>
                
                </tr>
                
                
                <tr v-for="( item,index ) in member_order_box" :key="index" >           <!--  index = 0~21 直排 -->
                    
                    <td v-for=" i in member_order_param " :key="i" >                     <!--  i = 0~5 橫排 -->

                        <div v-if=" black_line_box.includes( index ) ">  <hr color=black SIZE=3 >  </div> 
                        
                        <div v-else-if=" i == 0  &&  item[5] == null " >   <hr color=black SIZE=3 >   </div>
                        
                        <div v-else-if=" i==1 || i==3 || i==4 || i==5 " >    {{ item[i] }}    </div> 
                        
                        <div v-else-if=" i==2 && item[5] == null " >  {{ item[i][1] }}  </div>
                    
                        <div v-else-if=" i==6 && item[5] != null " >  
                            
                            <button v-on:click=" edit_order( index ) " > 編輯 </button> 
                            
                            <button v-on:click=" pay_for_order( index ) " > 結清款項 </button> 
                    
                        </div>
                        
                    </td>
                </tr> 
                
            </table>

        </div>



        <div v-if=" this.see_status == 'ready_edit' "  style=" width: 100%; height: 90%; " >

            <p>訂單編輯</p>
                    
            <table id="product_table"  >

                <tr>        
                    
                    <th width="20%" class="p311_th" > 訂購日期 </th>
                    <th width="20%" class="p311_th" > 產品名稱 </th>
                    <th width="15%" class="p311_th" > 訂購數量 </th>
                    <th width="15%" class="p311_th" > 單項價格 </th>
                    <th width="15%" class="p311_th" > 總價 </th>
                    <th width="15%" class="p311_th" > 取消訂單 </th>
                </tr>
                
                
                <tr v-for="( item,index ) in edit_order_box[0]" :key="index" >           
                    
                    <td v-for=" i in edit_order_param " :key="i" >                     

                        <div v-if=" i==1  &&  item[0] != null " >  {{ item[i][1] }}  </div>
                        
                        <div v-else-if=" i==2 && item[1] != null " >
                            
                            <button style=" display: inline-block; width:20px; height:25px; " v-on:click=" more_or_less_product_edit( 2, item[1][0] ) " > + </button>

                            {{ item[i]  }}
                        
                            <button style=" display: inline-block; width:20px; height:25px; " v-on:click=" more_or_less_product_edit( 1, item[1][0] ) " > - </button>
                        
                        </div>

                        <div v-else-if=" i==5 && item[1] != null " >
                            
                            <button style=" display: inline-block; width:60px; height:25px; " v-on:click=" more_or_less_product_edit( 0, item[1][0] ) " > 刪除 </button>

                        </div>

                        <div v-else >  {{ item[i] }}  </div>
                        
                    </td>

                </tr> 
                
            </table>

            <button v-on:click=" test_token( 'save_edit' ) " > 儲存編輯 </button>

            <button v-on:click=" recovery_main_page() " > 取消所有編輯 並返回 </button>


        </div>
    
    




        <div v-else-if=" this.see_status == 'no_ready' "  style=" width: 100%; height: 90%; " >

            <p>  請稍候  </p>
            
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
                member_order_box:[], member_order_param:[ 0,1,2,3,4,5,6 ], black_line_box:[],    // 客戶訂購車的資料,  訂購車的資料類數, 訂購車黑線
                edit_order_box:[], edit_order_param:[ 0,1,2,3,4,5 ],    // 編輯的資料,  編輯訂單的資料類數
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

                                    that.member_order()
                                }) 
                            }
                        })
                    }
                }
                
                else{  this.test_token( "get_member_order" )  }
            },



            test_token( type, path ){    //判斷 token 是否過期, 任何跟後端抓取資料都要先經過
                var that = this;

                axios( {  method: 'post',  url: '/member/token',  data:{ token: that.user_token  }   } )
                
                .then( function ( result ) { 
                    
                    if( result.data.err ){  that.$router.push({ name: "login" })  }
                    
                    else{ 
                
                        switch( type ){
                            
                            case "get_member_order":  that.member_order();  break;
                            case "change_page": that.$router.push({  name: `${path}`  });  break;
                            case "save_edit": that.save_edit_order();  break;
                        }
                    
                    }
                })  
            },



            member_order(){     // 獲取已下定的產品清單
               
                var that = this;      
 
                axios( {  method: 'post',  url: '/order/member',  data:{  id: that.user_id  }  } )
                
                .then( function ( res ) {  that.make_member_order_list( res.data )  }) 
            },



            make_member_order_list( data ){     // part:購物車  訂單資料分類   console.log( data )

                var member_order_box_temp=[], member_order_param_temp=[], black_line_box_temp=[]   
                
                for( var i=0, j=0, k=0; i < data.length ; i++, j++ ){           // i 為原本資料的索引, j 為新資料的索引

                    member_order_box_temp.push( [] )                                                                       
                    member_order_box_temp[j].push( data[i].order_id, moment( data[i].create_date ).format('YYYY-MM-DD'), [], data[i].order_quantity, data[i].order_price, null )
                    member_order_box_temp[j][2].push( data[i].product_id, data[i].product_name )
                    k++

                    if(  data[i+1] == undefined ||  data[i].order_id != data[i+1].order_id   ){     
                        var temp_price=0
  
                        for( var f=0; f < k ; f++ ){

                            temp_price = temp_price + member_order_box_temp[j-f][4]
                
                            if( f == k -1 ){     // 處理同一訂單 所有物品的 總價
                                    
                                member_order_box_temp.push( [] )   // 只有寫著 總價 的一行的資料     
                                j++ 
                                member_order_box_temp[j].push( null, null, null, null, null, temp_price )
                                
                                if( i != data.length -1 ){        // 在總價後 下一行 為空資料 並顯示 分行黑線 所以最後一項不需加黑線
                                    
                                    member_order_box_temp.push( [] )    // 黑線位置的在新資料裡是 []空盒子
                                    j++
                                    black_line_box_temp.push( j )       // 黑線位置的索引
                                }

                                k = 0
                            }
                        }
                    }
                }
                
                this.member_order_box = member_order_box_temp.slice(0)
                this.black_line_box = black_line_box_temp.slice(0)
                
                this.see_status = 'ready_cart'   //console.log( this.member_order_box )
            },




            edit_order( i ){       // part:編輯訂單  數據載入,    i 為總價橫行的 序列編號 往上數個是 同一訂單 的產品
                
                this.see_status = 'no_ready';

                var edit_order_box_temp=[];   this.edit_order_box=[]  // 清空

                for( var j = i ;  j>-1  &&  this.member_order_box[ j ].length > 1 ; j-- ){      // json轉換 讓 array 不與前資料關聯 

                    edit_order_box_temp.push(  JSON.parse(JSON.stringify(  this.member_order_box[ j ]  ) )  )
                }

                for( var k=0; k < edit_order_box_temp.length ; k++ ){   // 讓 json 轉換後的數字 str轉回int

                    for( var j=0; j< edit_order_box_temp[k]; j++ ){

                        if(  parseInt( edit_order_box_temp[k][j] ) != null  ){

                            edit_order_box_temp[k][j] = parseInt( edit_order_box_temp[k][j] )
                        }
                    }
                }
                
                edit_order_box_temp = edit_order_box_temp.reverse()

                
                this.edit_order_box.push( [] )      // edit_order_box[0] 為網頁展示用的矩陣
                this.edit_order_box.push( [] )      // edit_order_box[1] 為儲存時用的對照組
                    
                for( var h=0 ; h < edit_order_box_temp.length ; h++ ){    // 設定edit_order_box[0]

                    this.edit_order_box[0].push( [] )

                    for( var q=0; q < edit_order_box_temp[h].length ; q++ ){

                        if(  h == edit_order_box_temp.length - 1  ){

                            if(  q==0  ){  q++  }

                            this.edit_order_box[0][h].push(   edit_order_box_temp[h][q]  )
                        }

                        else if(  q==1 || q==2  ){
 
                            this.edit_order_box[0][h].push(  JSON.parse(JSON.stringify(  edit_order_box_temp[h][q]  ) )  )
                        }

                        else if(  q==3  ){

                            this.edit_order_box[0][h].push( parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q]  ) ) ) )
                        }

                        else if(  q==4  ){

                            this.edit_order_box[0][h].push( parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q]  ) ) )  / parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q-1]  ) ) )  )
                        }

                        else if(  q==5  ){  this.edit_order_box[0][h].push( parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q-1]  ) ) ) )   }
                    }

                }
                
                for( var h=0 ; h < edit_order_box_temp.length - 1 ; h++ ){   // 設定edit_order_box[1]

                    this.edit_order_box[1].push( [] )

                    for( var q=0; q < edit_order_box_temp[h].length ; q++ ){

                        if(  q==0 || q==3  ){
 
                            this.edit_order_box[1][h].push(  parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q] ) ) )  )
                        }

                        else if(  q==2  ){
 
                            this.edit_order_box[1][h].push(  JSON.parse(JSON.stringify(  edit_order_box_temp[h][q][0] ) )   )
                        }

                        else if(  q==4  ){

                            this.edit_order_box[1][h].push(  parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q] ) ) )  /  parseInt( JSON.parse(JSON.stringify(  edit_order_box_temp[h][q-1] ) ) )  )
                        }

                        else if(  q == edit_order_box_temp[h].length -1 ){

                            this.edit_order_box[1][h].push(  this.edit_order_box[1][h][2]  )
                        }
                    }
                }
                   
                this.see_status = 'ready_edit'  //console.log( this.edit_order_box )  
            },



            more_or_less_product_edit( n, product_id ){   // 編輯訂單頁面 的訂購數量 調整及取消訂單

                function fund_index( array, id ){
                                                        
                    for( var i=0 ; i < array.length ; i++ ){

                        if(  array[i][1] == id  || array[i][1][0] == id  ){  return  i  }
                    }
                }

                var index_0 = fund_index( this.edit_order_box[0], product_id )   // 產品 在 0,1 陣列的位置
                var index_1 = fund_index( this.edit_order_box[1], product_id )


                if(  n==2 || n==1  ){    // 增加或減少某項訂單的數量

                    if( n==2 ){ 
                        
                        if( this.edit_order_box[0][index_0][2] < this.edit_order_box[1][index_1][4] ){

                            this.$set( this.edit_order_box[0][index_0], 2 , this.edit_order_box[0][index_0][2] + 1 )
                            this.$set( this.edit_order_box[1][index_1], 2 , this.edit_order_box[1][index_1][2] + 1 )
                        }
                    }
                    
                    else if( n==1 ) {
                        
                        if( this.edit_order_box[0][index_0][2] > 0 ){
                            
                            this.$set( this.edit_order_box[0][index_0], 2 , this.edit_order_box[0][index_0][2] - 1 )
                            this.$set( this.edit_order_box[1][index_1], 2 , this.edit_order_box[1][index_1][2] - 1 )
                        }
                    }

                    this.$set( this.edit_order_box[0][index_0], 4 , this.edit_order_box[0][index_0][2] * this.edit_order_box[0][index_0][3] )
                }

                else{   // n==0 => 刪去某項訂單
                    
                    this.edit_order_box[0].splice( index_0 , 1 )   
                    this.$set( this.edit_order_box[1][index_1], 2 , 0 )
                }     

                var money = 0    // 計算訂單數量變動後的總價

                for( var k=0; k < this.edit_order_box[0].length ; k++ ){

                    if(  this.edit_order_box[0].length == 1  ){   this.$set( this.edit_order_box[0][k], 4 , null )   }

                    else if( k != this.edit_order_box[0].length - 1 ){   money = money + this.edit_order_box[0][k][4]   }

                    else{  this.$set( this.edit_order_box[0][k], 4 , money )  }
                }
                //console.log( this.edit_order_box )
            },



            save_edit_order(){   // 儲存編輯訂單

                if( confirm( "確定儲存編輯?" )  ){

                    var that = this, change_order_box=[] ;
                    
                    for( var i=0 ; i < that.edit_order_box[1].length ; i++ ){

                        if(  that.edit_order_box[1][i][2] != that.edit_order_box[1][i][4]  ){

                            change_order_box.push( that.edit_order_box[1][i] )
                        }
                    }
                    
                    axios( {  
                        
                        method: 'post',  url: '/order/edit',     
                        data:{  order_list: change_order_box  }
                    } )
                        
                    .then( function ( res ) {  that.recovery_main_page() })  
                        
                    .catch( function ( err ) {  console.log( err )  } )
                }
            },



            recovery_main_page(){  // 儲存編輯後 重整頁面

                this.see_status = 'no_ready'  
                this.member_order()
            },


            change_page( path ){  // 頁面跳轉

                if( path == "cart" ){  this.recovery_main_page()  }
                
                else{  this.test_token( "change_page", path )  }
            },

            pay_for_order( index ){
                var that = this

                var order_id = that.member_order_box[ index - 1 ][0]
                
                var message = `總額 ${ that.member_order_box[ index ][5] } 元, 確定付清本訂單的所有款項?`

                if( confirm( message )  ){
                    
                    axios( {  
                        
                        method: 'post',  url: '/order/pay',     
                        data:{  user_id: that.user_id, order_id: order_id, user_name: that.user_name, user_email: that.user_email  }
                    } )
                        
                    .then( function ( res ) { alert( res.data.status ) })  
                        
                    
                }


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