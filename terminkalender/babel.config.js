/*module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}*/

/* Babel ist ein JavaScript Compiler. Sie dürfen Ihr Code mit modernstem JavaScript schreiben.
 Babel kommpiliert danach das moderne Javascript in ein Browser kompatibles JavaScript.
 Grund: Nicht jeder Browser versteht modernstes JavaScript.
 Im Standard-Preset, welches von Babel herausgegeben wird, siehe https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app.
 In der Option 'polyfills', welches modernes JavaScript, z.B. ein Promise, in JavaScript welches in älteren Browsern verstanden wird,
 kompiliert, wird automatisch ausgeschlossen.
 Ein weiterer Punkt: Unter https://babeljs.io/docs/babel-preset-env#corejs wird angegenben, dass der Standard 2.0 ist. Das beinhaltet aber
 nicht alle modernen JavaScript Funktionalitäten. Ich möchte aber die Version 3 verwenden.
 Die notwendigen 2 Änderungen sehen Sie unten! */

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: "core-js@3",
      },
    ],
  ],
};
