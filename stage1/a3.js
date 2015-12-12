function add(){
	return arguments[0] + arguments[1];
}

function sub(){
	return arguments[0] - arguments[1];
}

function mul(){
	return arguments[0] * arguments[1];
}

function div(){
	if (arguments[1] == 0){
		throw "Division by zero is undefined";
	}
	return arguments[0] / arguments[1];
}

global_env = {'+': add,'-': sub, '*': mul, '/' : div};

function eval(x, env ){
	env = env || global_env;
	if (typeof(x) == 'string'){
		//console.log("x is "+ x);
		return env[x];
	}
	else if (!(x instanceof Array)){
		//console.log("constants"+ x);
		return x;
	}
	else{
		//console.log("operator"+ x[0]);
		var  proc =eval(x[0],env);//x[0], env);
		//console.log("x="+x);//typeof(proc));
		var args = [];
		xnew = x.slice(1);
		for (var i in xnew){
			//console.log("x(i):"+typeof(xnew[i]));
			args.push(eval(xnew[i], env));
		}
		//console.log("args:"+args);
		//console.log("type of proc:"+typeof(proc));
		return proc.apply(this,args);
	}
}
console.log(eval('x'));
function tokenize(chars){
	var newchar = chars.replace(/\(/g,'( ').replace(/\)/g,' )')
	return newchar.split(/ +/).slice(0,newchar.length);
};
function read_from_tokens(tokens){
	var len = tokens.length;
	//console.log("tokens.length = "+ len);
	if (tokens.length == 0){
		throw "Unexpected EOF";
	}	
	//console.log("tokens"+ tokens);	
	var token = tokens.shift(0);
	if ('(' == token){
		var L = [];
		while (tokens[0] != ')' ){
			L.push(read_from_tokens(tokens));
			}	
		tokens.shift(0);
		return L;
		}
	else if ('(' == token ){
		throw "unexpected )";
		}
	else{
		//console.log("else" + tokens);
		return atom(token);
		}
	
};

function atom(token){
    if (isNaN(parseInt(token))){
      return token;
    }   
     else if(token.indexOf('.')!==-1){
       return parseFloat(token);
   }
   else{
      return parseInt(token);
  }
};
function parse(program){
	return read_from_tokens(tokenize(program));
	}

console.log("Eval************");
console.log(eval(parse("(+ 2 (* 3 4))")));
console.log(eval(parse("(+ 2 (* 3 (- 5 3)))")));
console.log(eval(parse("4")));
