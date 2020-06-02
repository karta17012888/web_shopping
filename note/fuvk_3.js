var counts = 0 ;


module.exports = function( name ){

    counts ++ ;
    this.name = name ;

    this.cool = function(){
        
        console.log( "number = " + counts )
        
        console.log( name + " is cool" )
    };

    this.cool_1 = function(){

        console.log( "1123" )
    }

}