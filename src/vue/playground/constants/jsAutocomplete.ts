export const keywordsJS = "function class constant type var let namespace type interface enum for do while try catch import declare implemenets private protected public break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield setAttribute".split(" ").map(k => {
  return {
    type: 'keyword',
    value: k
  }
});
