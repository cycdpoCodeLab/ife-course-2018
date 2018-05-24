module.exports = {
  plugins: [
    require('autoprefixer')({
      'browsers': [
        'last 10 versions',
        'ie >= 8',
        'ie_mob >= 8',
        'ff >= 30',
        'chrome >= 40',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.0',
      ],
    })
  ]
};
