angular.module('app').directive('colorDirective', function() {
  return {
    link: (scope, element, attr) => {
        var words = scope.solution.script.split(' ');
        let stringFlag = false;
        words = words.map((word, i) => {
          if ((word.charAt(word.length - 1) === "'" || word.charAt(word.length - 1) === '"' || word.charAt(word.length - 1) === "`") && (word.charAt(0) === '"' || word.charAt(0) === "'" || word.charAt(0) === "`")) {
            return `<span style="color:#9fca56">${word}</span>`;
          } else if (stringFlag === true && (word.charAt(word.length - 1) === "'" || word.charAt(word.length - 1) === '"' || word.charAt(word.length - 1) === "`")) {
           stringFlag = false;
           return `<span style="color:#9fca56">${word}</span>`;
         } else if (word.charAt(0) === '"' || word.charAt(0) === "'" || word.charAt(0) === "`") {
            stringFlag = true;
            return `<span style="color:#9fca56">${word}</span>`;
          } else if (stringFlag === true && word.charAt(word.length - 1) != "'"  && word.charAt(word.length -1) != '"' && word.charAt(word.length -1) != "`") {
            return `<span style="color:#9fca56">${word}</span>`;
          } else if (words[i-1] === "var" || words[i-1] === "let" || words[i-1] === "const") {
           return `<span style="color:#55b5db">${word}</span>`;
          } else if (word === "var" || word === "let" || word === "const") {
             return `<span style="color:#e6cd69">${word}</span>`
          } else if (word === "function") {
             return `<span style="color:#e6cd69">${word}</span>`;
          } else if (typeof parseInt(word) === "number" && word != "=") {
            return `<span style="color:#cd3f45">${word}</span>`;
          } else {
            return word;
          }
        });
        element.html(words.join(' '));
    }
  }
})


/*

Just spitballing here
let stringFlag = false;
if (word.charAt(0) === '"' || word.charAt(0) === "'" || word.charAt(0) === "`") {
  stringFlag = true;
  return `<span style="color:stringColor">${word}</span>`;
} else if (stringFlag === true && word.charAt(word.length - 1) != "'"  && word.charAt(word.length -1) != '"' && word.charAt(word.length -1) != "`") {
  return `<span style="color:stringColor">${word}</span>`;
} else if (stringFlag === true && (word.charAt(word.length - 1) === "'" || word.charAt(word.length - 1) === '"' || word.charAt(word.length - 1) === "`")) {
  stringFlag = false;
  return `<span style="color:stringColor">${word}</span>`;
} else if (words[i-1] === var || words[i-1] === let || words[i-1] === const) {
 return `<span style="color:varColor">${word}</span>`;
} else if (word === "function") {
  return `<span style="color:functionColor">${word}</span>`;
} else {
  return word;
}


words = words.map((word, i) => {
  return (word === "let") ? `<span style="color: blue">${word}</span>` : word;
});
*/
