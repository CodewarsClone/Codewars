angular.module('app').directive('codemirrorDirective', function() {
  return {
    link: (scope, element, attr) => {
      var ident = attr.id;
      var textarea = element[0];
      var codemirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        theme: 'seti',
        readOnly: true,
        lineSeparator: '\\n'
      });
      codemirror.setSize(null, 100);
      if (attr.class.includes('home')) {
        codemirror.setValue(scope.userKatas[ident].script);
        codemirror.getWrapperElement().style.display="none";
      } else {
        codemirror.setValue(scope.kataSolutions[ident].script);
      }
    }
  }
})
