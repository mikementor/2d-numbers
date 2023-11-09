module.exports = () => ({
    tests: ['/tests/**/*.spec.js'],
    env: {
      runner: 'node'
    },
    runMode: 'onsave',
    autoDetect:['vitest']
 });