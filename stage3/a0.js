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
function gt(){
	return arguments[0] > arguments[1];
}

function lt(){
	return arguments[0] < arguments[1];
}

function eq(){
	return arguments[0] == arguments[1];
}

global_env = {'+': add,'-': sub, '*': mul, '/' : div,'>': gt,'<' : lt, '=' : eq };

function eval(x, env ){
	env = env || global_env;
	if (typeof(x) == 'string'){
		return env[x];
	}
	else if (!(x instanceof Array)){
		return x;
	}
	else if (x[0] == 'define'){//to implement variables
		variable = x[1];
		exp = x[2];
		env[variable] = eval(exp, env);
	}
	else if (x[0] == 'if'){//implement if test then_expr else expr
		test = x[1];
		then_expr = x[2];
		else_expr = x[3];
		if (eval(test, env)){
			return eval(then_expr, env);
			}
		else{
			return eval(else_expr, env);
			} 
	}
	else{
		var  proc =eval(x[0],env);
		var args = [];
		xnew = x.slice(1);
		for (var i in xnew){
			args.push(eval(xnew[i], env));
		}
		return proc.apply(this,args);
	}
}
function tokenize(chars){
	var newchar = chars.replace(/\(/g,'( ').replace(/\)/g,' )')
	return newchar.split(/ +/).slice(0,newchar.length);
};
function read_from_tokens(tokens){
	var len = tokens.length;
	if (tokens.length == 0){
		throw "Unexpected EOF";
	}	
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
pgm1 = '(define x 10)';
eval(parse(pgm1));
pgm2 = '(define y (* 3 4))';
eval(parse(pgm2));
pgm3 ='(if (< x  y) (+ 1 2) (- 5 6))';
console.log(pgm1+"\n"+pgm2+"\n"+pgm3);
console.log(eval(parse(pgm3)));
