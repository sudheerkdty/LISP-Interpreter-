function Foo(){
	function func(self, x,y){
		return (x,y) ;
	}
	}
f = Foo.call();
console.log(Foo.call(10,20));

