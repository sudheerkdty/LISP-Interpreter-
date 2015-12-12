function tokenize(chars){
	var newchar = chars.replace(/\(/g,'( ').replace(/\)/g,' )')
	return newchar.split(/ +/).slice(0,newchar.length);
};

function read_from_token(tokens){
	var len = tokens.length;
	//console.log("tokens.length = "+ len);
	if (tokens.length == 0){
		throw "Unexpected EOF";
	}	
	//console.log("tokens"+ tokens);	
	if (tokens[0] == '('){
		var L = [];
		if (tokens[tokens.length-1] == ')' ){
			for(var token in tokens.slice(1,len-1)){
				//console.log("token" + tokens[token]);
				var newtokens = tokens.slice(1,-1);
				L.push(atom(newtokens[token]));
				}
			}	
		}
	else{
		//console.log("else" + tokens);
		return atom(tokens[0]);
		}
	return L;
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
	return read_from_token(tokenize(program));
	}

console.log(parse("4"));
console.log(parse("1.23"));
console.log(parse("(+ 1 2)"));
console.log(parse("(+ 1 2.3 45)"));

