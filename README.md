# gulp-imerge

css合图工具，[imerge](https://github.com/Javey/imerge)封装成的gulp插件

## Install

```
npm install gulp-imerge --save-dev
```

## Usage

[gulpfile.js](https://github.com/Javey/gulp-imerge/blob/master/test/gulpfile.js)示例

```js
var gulp = require('gulp'),
    imerge = require('../src/index.js'),
    header = require('gulp-header');

gulp.task('default', function() {
    return gulp.src('./web/**/*.css')
        .pipe(imerge({
            spriteTo: './build/sprite',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(header('/*test*/'))
        .pipe(gulp.dest('./build'));
});
```

### Input

```
web
├── edit1.png
├── edit.png
├── index.html
├── index.js
├── main1.css
├── main.css
└── main.js
```

### Output

```
build
├── main1.css
├── main.css
└── sprite
    └── spirte_test.png
```

main.css

```css
/*test*/h1 {
  color: red;
  background: url("/sprite/spirte_test.png");
  background-position: 0px 0px;
}

h2 {
  background-image: url("/sprite/spirte_test.png");
  background-position: -46px 0px;
}
```