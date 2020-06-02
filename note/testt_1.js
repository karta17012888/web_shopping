var number = 0 ;

function ccc(){
    number++
    console.log( number )

    ddd()

}

function ddd(){

    number++
    console.log( number )

}

function ggg( name ){

    this.name = name
    console.log( this.name )

    this.fff = function(){

        console.log( "I am " + this.name )

    }
}

module.exports = {

    ccc, ddd, ggg

}

/*  外部用以下方式呼叫

    test_1.ggg( "jason" )
    
    var test_2 = new test_1.ggg( 'jame' )
    test_2
    test_2.fff()

*/
