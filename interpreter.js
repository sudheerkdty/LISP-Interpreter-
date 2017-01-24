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

console.log(parse("4"));
console.log(parse("1.23"));
console.log(parse("(+ 1 2)"));
console.log(parse("(+ 1 2.3 45)"));

//nested expressions

console.log(parse("(+ 1 2 (* 3 4))"));
console.log(parse("(+ 1 2 (* 3 (- 5 4)))"));

