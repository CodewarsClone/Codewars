INSERT INTO katas (kyu, name, tags, languages, starter_code, description, examples, test_script)
VALUES (8, 'var a should equal 1', 'var a = 1', 'Sumbit This','["Fake"]', '["JavaScript"]', '[{"test":"Test.assertEquals(a, 1)","result":""}]', '[{"test":"Test.assertEquals(a, 0)","result":""},{"test":"Test.assertEquals(a, 2)","result":""},{"test":"Test.assertEquals(a, 1)","result":""}]'),

(8, 'Generate range of integers', '["ALGORITHMS"]', '["Javascript","C#","Elixir"]', 'function generateRange(min, max, step){}', 'Implement a function named generateRange(min, max, step), which takes three arguments and generates a range of integers from min to max, with the step. The first integer is the minimum value, the second is the maximum of the range and the third is the step. (min < max)', '[{"test":"Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]);","result":""}]','[{"test":" Test.describe(''generateRange(2, 10, 2)'', function() { Test.assertSimilar(generateRange(2, 10, 2), [2,4,6,8,10]); }); Test.describe(''generateRange(1, 10, 3)'', function() { Test.assertSimilar(generateRange(1, 10, 3), [1,4,7,10]); }); Test.describe(''generateRange(1, 10, 1)'', function() { Test.assertSimilar(generateRange(1, 10, 1), [1,2,3,4,5,6,7,8,9,10]); }); Test.describe(''generateRange(1, 10, 4)'', function() { Test.assertSimilar(generateRange(1, 10, 4), [1,5,9]); }); Test.describe(''generateRange(1, 10, 5)'', function() { Test.assertSimilar(generateRange(1, 10, 5), [1,6]); }); Test.describe(''generateRange for random'', function() { var generateRandom = function(min, max){ return Math.floor(Math.random() * max) + min; }; var range = function(min, max, step){ var z = []; for(var i = min; i <= max; i += step){ z.push(i); } return z; }; for(var i = 0; i < 10; i++){ var randomMax = generateRandom(30, 100), randomMin = generateRandom(1, 20), randomStep = generateRandom(1, 10); Test.assertSimilar(generateRange(randomMin, randomMax, randomStep), range(randomMin, randomMax, randomStep)); } }); "}]'),

(7, 'Descending Order', '["FUNDAMENTALS","FUNCTIONS","CONTROL FLOW","BASIC LANGUAGE FEATURES"]', '["Javascript","C#","Haskell","Java","Clojure","Python","Ruby","Rust","Swift"]', 'function descendingOrder(n){}', 'Descending Order', '[{"test":"Test.assertEquals(descendingOrder(15), 51)","result":""}]', '[{"test":"Test.assertEquals(descendingOrder(0), 0)","result":""},{"test":"Test.assertEquals(descendingOrder(1), 1)","result":""},{"test":"Test.assertEquals(descendingOrder(111), 111)","result":""},{"test":"Test.assertEquals(descendingOrder(15), 51)","result":""},{"test":"Test.assertEquals(descendingOrder(1021), 2110)","result":""},{"test":"Test.assertEquals(descendingOrder(123456789), 987654321)","result":""}]'),

(7, 'Disemvowel Trolls', '["FUNDAMENTALS","STRINGS","REGULAR EXPRESSIONS","DECLARATIVE PROGRAMMING","ADVANCED LANGUAGE FEATURES"]', '["Javascript","C#","Clojure","CoffeeScript","F#","Haskell","Python","Ruby"]', 'function disemvowel(str) {}', 'Your task is to write a function that takes a string and return a new string with all vowels removed.',  '[{"test":"Test.assertEquals(disemvowel(''This website is for losers LOL!''), ''Ths wbst s fr lsrs LL!'');","result":""}]', '[{"test":"Test.assertEquals(disemvowel(''This website is for losers LOL!''), ''Ths wbst s fr lsrs LL!'') Test.assertEquals(disemvowel(''No offense but,Your writing is among the worst I''ve ever read''), ''N ffns bt,Yr wrtng s mng th wrst ''v vr rd'') Test.assertEquals(disemvowel(''What are you, a communist?''), ''Wht r y, cmmnst?'')","result":""}]'),

(6, 'Take a Ten Minute Walk', '["FUNDAMENTALS","ARRAYS"]', '["Javascript","Java","Haskell","F#","Python","Ruby"]', 'function isValidWalk(walk) {}', 'You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. [''n'', ''s'', ''w'', ''e'']). You know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don''t want to be early or late!) and will, of course, return you to your starting point. Return false otherwise. \n\nNote: you will always receive a valid array containing a random assortment of direction letters (''n'', ''s'', ''e'', or ''w'' only). It will never give you an empty array (that''s not a walk, that''s standing still!)', '[{"test":"Test.expect(!isValidWalk([''e'',''e'',''e'',''w'',''n'',''s'',''n'',''s'',''e'',''w'']));"},{"test":"Test.expect(isValidWalk([''n'',''s'',''e'',''w'',''n'',''s'',''e'',''w'',''n'',''s'']));"}]', '[{"test":"var fail = [ [''n''], [''n'',''s''], [''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s''], [''n'',''s'',''e'',''w'',''n'',''s'',''e'',''w'',''n'',''s'',''e'',''w'',''n'',''s'',''e'',''w''], [''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s'',''n'',''n''], [''e'',''e'',''e'',''w'',''n'',''s'',''n'',''s'',''e'',''w''] ]; var pass = [ [''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s'',''n'',''s''], [''e'',''w'',''e'',''w'',''n'',''s'',''n'',''s'',''e'',''w''], [''n'',''s'',''e'',''w'',''n'',''s'',''e'',''w'',''n'',''s''] ]; describe(''Walk Validator'', function(){ it (''should return false if walk is too short'', function(){ Test.expect(!isValidWalk(fail[0])); Test.expect(!isValidWalk(fail[1])); }); it (''should return false if walk is too long'', function(){ Test.expect(!isValidWalk(fail[2])); Test.expect(!isValidWalk(fail[3])); }); it (''should return false if walk does not bring you back to start'', function(){ Test.expect(!isValidWalk(fail[4])); Test.expect(!isValidWalk(fail[5])); }); it (''should return true for a valid walk'', function(){ Test.expect(isValidWalk(pass[0])); Test.expect(isValidWalk(pass[1])); Test.expect(isValidWalk(pass[2])); }); });"}]'),

(6, 'Multiples of 3 and 5', '["ALGORITHMS","MATHEMATICS","NUMBERS"]', '["Javascript","Clojure","CoffeeScript","C++","C#","Elixir","Haskell","Java","PHP","Python","Ruby","TypeScript"]', 'function solution(number){}', 'description', '[{"test":"Test.expect(solution(10) == 23)"}]', '[{"test":"Test.expect(solution(10) == 23)"},{"test":"Test.expect(solution(20) == 78)"},{"test":"Test.expect(solution(200) == 9168)"}]'),

(7, 'Bubblesort Once', '["ALGORITHMS","MATHEMATICS","NUMBERS"]', '["Javascript","C++","C#","PHP"]', 'function bubblesortOnce(arr) {}', 'description', '[{"test":"Test.assertSimilar(bubblesortOnce([9,7,5,3,1,2,4,6,8]),[7,5,3,1,2,4,6,8,9]);"}]', '[{"test":"Test.assertSimilar(bubblesortOnce([9,7,5,3,1,2,4,6,8]),[7,5,3,1,2,4,6,8,9]); Test.assertSimilar(bubblesortOnce([1,2]),[1,2]); Test.assertSimilar(bubblesortOnce([2,1]),[1,2]); Test.assertSimilar(bubblesortOnce([1,3]),[1,3]); Test.assertSimilar(bubblesortOnce([3,1]),[1,3]); Test.assertSimilar(bubblesortOnce([24,57]),[24,57]); Test.assertSimilar(bubblesortOnce([89,36]),[36,89]); Test.assertSimilar(bubblesortOnce([1,2,3]),[1,2,3]); Test.assertSimilar(bubblesortOnce([2,4,1]),[2,1,4]); Test.assertSimilar(bubblesortOnce([17,5,11]),[5,11,17]); Test.assertSimilar(bubblesortOnce([25,16,9]),[16,9,25]); Test.assertSimilar(bubblesortOnce([103,87,113]),[87,103,113]); Test.assertSimilar(bubblesortOnce([1032,3192,2864]),[1032,2864,3192]); Test.assertSimilar(bubblesortOnce([1,2,3,4]),[1,2,3,4]); Test.assertSimilar(bubblesortOnce([2,3,4,1]),[2,3,1,4]); Test.assertSimilar(bubblesortOnce([3,4,1,2]),[3,1,2,4]); Test.assertSimilar(bubblesortOnce([4,1,2,3]),[1,2,3,4]); Test.assertSimilar(bubblesortOnce([7,5,3,1]),[5,3,1,7]); Test.assertSimilar(bubblesortOnce([5,3,7,7]),[3,5,7,7]); Test.assertSimilar(bubblesortOnce([3,1,8,5]),[1,3,5,8]); Test.assertSimilar(bubblesortOnce([1,9,5,5]),[1,5,5,9]); Test.assertSimilar(bubblesortOnce([6,3,4,9,1,2,7,8,5]),[3,4,6,1,2,7,8,5,9]); Test.assertSimilar(bubblesortOnce([6,3,4,15,14,9,1,2,7,8,5,14,11,15,17,19]),[3,4,6,14,9,1,2,7,8,5,14,11,15,15,17,19]); function real(intArr) { var i; var temp1; var temp2; for (i = 0; i < intArr.length - 1; i++) { if (intArr[i] > intArr[i+1]) { temp1 = intArr[i]; temp2 = intArr[i+1]; intArr[i] = temp2; intArr[i+1] = temp1; } } return intArr; } var looper; for (looper = 0; looper < 100; looper++) { var aa = Math.round(10000 * Math.random()); var ab = Math.round(10000 * Math.random()); var ac = Math.round(10000 * Math.random()); var ad = Math.round(10000 * Math.random()); var ae = Math.round(10000 * Math.random()); var af = Math.round(10000 * Math.random()); var ag = Math.round(10000 * Math.random()); var ah = Math.round(10000 * Math.random()); var ai = Math.round(10000 * Math.random()); var aj = Math.round(10000 * Math.random()); var ak = Math.round(10000 * Math.random()); var al = Math.round(10000 * Math.random()); var am = Math.round(10000 * Math.random()); var an = Math.round(10000 * Math.random()); var ao = Math.round(10000 * Math.random()); var ap = Math.round(10000 * Math.random()); var randArr = [aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap]; Test.assertSimilar(bubblesortOnce(randArr),real(randArr)); }"}]'),

(6, 'Kebabize', '["FUNDAMENTALS","STRINGS"]', '["JavaScript","CoffeeScript","Crystal","Python","Ruby"]', 'function kebabize(str) {}', 'Modify the kebabize function so that it converts a camel case string into a kebab case.\n\nkebabize(''camelsHaveThreeHumps'') // camels-have-three-humps\nkebabize(''camelsHave3Humps'') // camels-have-humps\n\nNotes:\nthe returned string should only contain lowercase letters\n', '[{"test":"Test.assertEquals(kebabize(''myCamelCasedString''), ''my-camel-cased-string'');"},{"test":"Test.assertEquals(kebabize(''myCamelHas3Humps''), ''my-camel-has-humps'');"}]', '[{"test":" Test.describe(''tests'', _ => { Test.it(''fixed tests'', _ => { Test.assertEquals(kebabize(''myCamelCasedString''), ''my-camel-cased-string''); Test.assertEquals(kebabize(''myCamelHas3Humps''), ''my-camel-has-humps''); }); Test.it(''random tests'', _ => { function fixture (str) { return str.replace(/\\d/g,'''').split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(''-''); } for (let i = 0; i <= 100; i += 1) { let token = Test.randomToken(); let camel = token.split('''').map(c => { const rand = Math.random(); return rand > 0.9 ? c.toUpperCase() : c; }).join(''''); Test.assertEquals(kebabize(camel), fixture(camel)); } }); }); "}]')
;


-- December 27:
-- Here are some solutions to populate the solutions page. I forget what we decided regarding formatting, so I'm just copy/pasting them directly from codewars. Therefore, they have line breaks in them, which we can exhange with \n if we so desire.
INSERT INTO solutions (user_id, kata_id, script)
VALUES (1, 2, "function generateRange(min, max, step){
  let arr = [];
  for (let i=min; i<=max; i += step) {
    arr.push(i);
  }
  return arr;
}"),

(1, 3, "function descendingOrder(n){
  return parseInt(n.toString().split('').sort((a, b) => b - a).join(''));
}"),

(1, 4, "function disemvowel(str) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  return str.split('').map((letter) => {
    if (vowels.indexOf(letter.toLowerCase()) === -1) {
      return letter;
    }
  }).join('');
}"),

(1, 5, "function isValidWalk(walk) {

  var horizontal = 0;
  var vertical = 0;
  var total = 0;

  walk.forEach((word) => {
    switch (word) {
      case 'n':
        vertical += 1;
        total += 1;
        break;
      case 's':
        vertical -= 1;
        total += 1;
        break;
      case 'e':
        horizontal += 1;
        total += 1;
        break;
      case 'w':
        horizontal -= 1;
        total += 1;
        break;
      default:
        console.log("It's broken");
    }

  });

  if (horizontal === 0 && vertical === 0 && total === 10) {
    return true;
  } else {
    return false;
  }

}"),

(1, 6, "function solution(number){

  var arr = [];

  for (var i = 3; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      arr.push(i);
    }
  }

  var final = 0;
  if (arr[0]) {
    final = arr.reduce((a, b) => a + b)
  }

  return final;

}"),

(1, 7, "function bubblesortOnce(intArr) {

  var bubble;

  for (var i = 0; i < intArr.length; i++) {
    if (intArr[i] > intArr[i+1]) {
      bubble = intArr[i+1];
      intArr.splice(i + 1, 1);
      intArr.splice(i, 0, bubble);
    }
  }

  return intArr;
}"),

(1, 8, "function kebabize(str) {
  str = str.split('').map((letter) => {
    if (!isNaN(parseInt(letter))) {
      return "";
    }else if (letter === letter.toUpperCase()) {
      return "-" + letter.toLowerCase();
    } else {
      return letter;
    }
  }).join('');

  if (str.charAt(0) === "-") {
    str = str.slice(1);
  }

  return str;
}"),
(1, 1, 'var a = 1'),
(1,1, 'let a = 1'),
(1, 8, 'function kebabize(str) { return str.replace(/[^a-z]/ig, ''). replace(/^[A-Z]/, c => c.toLowerCase()). replace(/[A-Z]/g, c => `-${c.toLowerCase()}`); }')
;

INSERT INTO ratings (user_id, solution_id, liked)
VALUES (1, 1, true);

