function fixFuckingCode(code) {
	let result = code.slice(0);
	if (code.length < 64) {
		for (let i = code.length - 1; i < 63; i++) {
			result.push(63 - i);
		}
    }

    for (let i = 0; i < 64; i++) {
    	if (result[i] == 'gh') {
    		result[i] = 64 - i;
    	}
    }

	return result;
}

var code = [2, 0, 6, 17, 27, 30, 1, 0, 6, 6, 6, "gh", "gh", "gh", "gh", 6,7,"gh","gh","gh","gh",
4,0,"gh",4,0,"gh",1,2,"gh",6,7,"gh","gh","gh","gh",4,2,"gh",4,2,"gh",4,0,"gh",4,0,"gh"];

console.log(code.length);
var fixed = fixFuckingCode(code);

console.log(JSON.stringify(fixed));