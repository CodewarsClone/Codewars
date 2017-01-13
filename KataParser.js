/**
 * Created by Joshua Baert on 12/22/2016.
 */


const _ = {
	cleanStr(str) {
		str = str.replace(/\n\s*\./g, `.`)
			.replace(/\n/g, ` `)
			.replace(/\s+/g, ` `);
		return str
	},
	
	cleanSQL(str) {
		str = this.cleanStr(str);
		str = str.replace(/"/gi, `'`)
			.replace(/'/gi, `''`);
		return str
	},
	
	
	
	cleanDesc(str) {
		str = str.replace(/\n/g, '\\n')
			.replace(/'/gi, `''`);
		return str
	},
	
	testObjectify(arr) {
		let rtn = [];
		arr.forEach((ele, i) => {
			let temp = {
				test: this.cleanSQL(ele)
			};
			rtn.push(temp);
		});
		return JSON.stringify(rtn)
	},
	
	JSON(obj) {
		return JSON.stringify(obj)
	},
	
	cleanExample(str) {
		str = str.replace(/\n\s*\./g, `.`)
			.replace(/\n/g, ` \\n`)
			.replace(/"/gi, `'`)
			.replace(/'/gi, `''`);
		return JSON.stringify([
			{test: str}
		]).replace(/\\\\n/g, `\\n`)
	},
	
};

// Paste the languages into the array
let languages = [
	``,
];
// Paste the tags into the array
let tags = [
	``,
];

// Paste the Test Suite here
let tests = [
	`function test(n, expected) {
  let actual = solution(n);
  Test.assertEquals(actual, expected, \`Expected \${expected}, got \${actual}\`);
}

Test.describe("basic tests", function(){
  test(10,23);
  test(20,78);
  test(200,9168);
})

Test.describe("smallest cases", function() {
  test(-1,0);
  test(0,0);
  test(1,0);
  test(2,0);
  test(3,0);
  test(4,3);
  test(5,3);
  test(6,8);
})`
];


// Paste the example script here
let examples =
	`Test.assertEquals(multiply(2,2), 4);`;

// Introduction to the Kata Here
let description =
	``;
// Paste the starting script here
let startScript = `function multiply(a, b){
  a * b
}`;


// Paste your winning script here
let winScript = ``;

// Past a solution here and it will corrently parse it into the console for you
let solution = `const multiply = (a,b) => a * b;`;


// When this js file is ran you will get an output in your console of all the info in a format
// ready to go into the Sql DB Start files to then copy into those tables
console.log('Solution');
console.log(_.cleanSQL(solution));
console.log('\nTags');
console.log(_.JSON(tags));
console.log('\nLanguages');
console.log(_.JSON(languages));
console.log('\nWinning Script');
console.log(_.cleanStr(winScript));
console.log('\n\nStarter');
console.log(_.cleanStr(startScript));
console.log('\nDescription');
console.log(_.cleanDesc(description));
console.log('\n\n\nExampes');
console.log(_.cleanExample(examples));
console.log('\nTests');
console.log(_.testObjectify(tests));


Test.assertEquals(disemvowel("This website is for losers LOL!"),"Ths wbst s fr lsrs LL!");
Test.assertEquals(disemvowel("What are you, a communist?"),"Wht r y,  cmmnst?");
Test.assertEquals(disemvowel(	"No offense but,Your writing is among the worst I\\'ve ever read"),"N ffns bt,Yr wrtng s mng th wrst \\'v vr rd");
