import a_l from "./components/login/login.vue"; 
import a_r from "./components/register/register.vue"; 

import a_h_r_t from "./components/home/home_root.vue"; 
import a_h_s from "./components/home/home_shopping.vue";   
import a_h_c from "./components/home/home_cart.vue";   
import a_h_m from "./components/home/home_member.vue";   



export const routes = [
    
    {  path: '/',  redirect: { name: "login"}  },

    
    {
        path: '/home' ,   
 
        component: a_h_r_t ,
        
        children: [
            
            {  path: "", name: "shopping", component: a_h_s  },   // 因設定 path:"" , 所以 配對 "/home" 後會自動跳轉至這個子路由  
            
            {  path: "cart", name: "cart",  component: a_h_c  },

            {  path: "member", name: "member",  component: a_h_m  },
            
        ]
        
    },      
        // 巢裝路由器(children) 在最外層的 渲染目標 內 須加上 <router-view></router-view> 標籤
        // 此標籤 用於 目標為子路由時 選染的內容將呈現在 目標上層的 <router-view></router-view> 內
        // ex: 
        //    在網頁 '/home'頁面的中  <router-view></router-view> 將不渲染
        //    而 '/home/cart'頁面的呈現為  '/home'之頁面 且內部的 <router-view></router-view> 將渲染為 "cart"之內容
    
    
    {
        path: "/login" ,  
        name: "login",
        components: {  default: a_l  }
    },
    

    {
        path: "/register",  
        name: "register",
        components: {  default: a_r  }
    },
    


    



];