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
	}
	
};

// Paste the languages into the array
let languages = [
	`JavaScript`,
	`CoffeeScript`,
	`Crystal`,
	`Python`,
	`Ruby`
];
// Paste the tags into the array
let tags = [
	`FUNDAMENTALS`,
	`STRINGS`,
];

// Paste the Test Suite here
let tests = [
	`
	
`,

];


// Paste the example script here
let examples = [
	`Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);`,
	`Test.assertSimilar(generateRange(1, 10, 1), [1,2,3,4,5,6,7,8,9,10]);`,
];

// Introduction to the Kata Here
let description =
	`
	
`;
// Paste the starting script here
let startScript = ``;


// Paste your winning script here
let winScript = `

`;


let solution = `
function descendingOrder(n){
  return parseInt(n.toString().split('').sort((a, b) => b - a).join(''));
}

`


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
console.log(_.testObjectify(examples));
console.log('\nTests');
console.log(_.testObjectify(tests));