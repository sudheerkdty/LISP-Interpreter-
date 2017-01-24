function tokenize(chars){
    return chars.replace(/\(/g,'( ').replace(/\)/g,' )').split(/ +/);
    }
console.log(tokenize('(+ 2 (* 3 4))'));
