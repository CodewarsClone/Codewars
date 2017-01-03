angular.module('app').directive('codemirrorDirective', function() {
  return {
    link: (scope, element, attr) => {
      var ident = attr.id.split(' ')[1]
      var textarea = element[0];
      var codemirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        theme: 'seti',
        readOnly: true,
      });
      codemirror.setValue(scope.kataSolutions[ident].script);
      codemirror.setSize(null, 100);
    }
  }
})
