module.exports = [
  {
    name: 'outputName',
    message: "What's the output file's name?",
    type: 'input',
    default: 'vendor'
  },
  {
    name: 'outputPath',
    message: "Where do you want to save the file?",
    type: 'input',
    default: 'public/vendor'
  },
  {
    name: 'noCache',
    message: "When you build again, would you like to clean the file you build the last time?",
    type: 'confirm',
    default: true
  }
]