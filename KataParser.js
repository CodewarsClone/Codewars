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
	`Test.describe("generateRange(2, 10, 2)", function() {
  Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);
});

Test.describe("generateRange(1, 10, 3)", function() {
  Test.assertSimilar(generateRange(1, 10, 3), [1,4,7,10]);
});

Test.describe("generateRange(1, 10, 1)", function() {
  Test.assertSimilar(generateRange(1, 10, 1), [1,2,3,4,5,6,7,8,9,10]);
});

Test.describe("generateRange(1, 10, 4)", function() {
  Test.assertSimilar(generateRange(1, 10, 4), [1,5,9]);
});

Test.describe("generateRange(1, 10, 5)", function() {
  Test.assertSimilar(generateRange(1, 10, 5), [1,6]);
});

Test.describe("generateRange for random", function() {
  var generateRandom = function(min, max){
    return Math.floor(Math.random() * max) + min;
  };
  
  var range = function(min, max, step){
    var z = [];
    for(var i = min; i <= max; i += step){
      z.push(i);
    }
    return z;
  };
  
  for(var i = 0; i < 10; i++){
    var randomMax = generateRandom(30, 100),
        randomMin = generateRandom(1, 20),
        randomStep = generateRandom(1, 10);
  
    Test.assertSimilar(generateRange(randomMin, randomMax, randomStep), range(randomMin, randomMax, randomStep));
    }
});`,
];


// Paste the example script here
let examples =
	`Test.describe("generateRange(2, 10, 2)", function() {
  Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);
});`;

// Introduction to the Kata Here
let description =
	`Implement a function named generateRange(min, max, step), which takes three arguments and generates a range of integers from min to max, with the step. The first integer is the minimum value, the second is the maximum of the range and the third is the step. (min < max)

Task

Implement a function named

generateRange(2, 10, 2) // should return array of [2,4,6,8,10]
generateRange(1, 10, 3) // should return array of [1,4,7,10]
, which takes three arguments and generates a range of integers from min to max, with given step. The first is minimum value, second is maximum of range and the third is step.

Note

min < max
step > 0`;
// Paste the starting script here
let startScript = ``;


// Paste your winning script here
let winScript = `

`;

// Past a solution here and it will corrently parse it into the console for you
let solution = `


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
console.log(_.cleanExample(examples));
console.log('\nTests');
console.log(_.testObjectify(tests));



