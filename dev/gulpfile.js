'use strict';

var gulp = require('gulp');

//--- bower ---
// [gulp-bower] bowerコマンド実行
var bower = require('gulp-bower');
// [main-bower-files] bower pluginjsファイル libコピー
var mainBowerFiles = require('main-bower-files');

//--- file ---
// [gulp-download] ファイルダウンロード
var download = require('gulp-download');
// [gulp-concat] ファイル結合
var concat = require('gulp-concat');
// [gulp-rename] ファイル名変更
var rename = require('gulp-rename');
// [gulp-filesize] ファイルサイズ出力
var size = require('gulp-filesize');
// [gulp-clean] ディレクトリクリア
var clean = require('gulp-clean');

//--- JavaScript ---
// [gulp-strip-debug] console, alert, debugger のコーディング削除
var stripDebug = require('gulp-strip-debug');
// [gulp-uglify] JavaScriptファイルの圧縮
var uglify = require('gulp-uglify');
// [gulp-typescript] TypeScriptコンパイル
var typescript = require('gulp-typescript');

//--- HTML ---
// [gulp-minify-html] HTMLファイル圧縮
var htmlmin = require('gulp-minify-html');

//--- CSS ---
// [gulp-cssmin] CSSファイル圧縮
var cssmin = require('gulp-cssmin');
// [gulp-sass] SASS
var sass = require('gulp-sass');
// [gulp-sourcemaps] Source Maps作成
var sourcemaps = require('gulp-sourcemaps');
// [gulp-autoprefixer] CSSベンダープレフィックス付与
var autoprefixer = require('gulp-autoprefixer');

//--- 開発 ---
// [gulp-webserver] Webサーバー実行
var webserver = require('gulp-webserver');

//--- JsDoc作成 ---
// [gulp-jsdoc] Webサーバー実行
var jsdoc = require('gulp-jsdoc3');

//--- task control ---
// [gulp-if] if文
var gulpif = require('gulp-if');
// [run-sequence] 指定順に実行
var runSequence = require('run-sequence');
// [gulp-plumber] Watch実行時のエラー停止を阻止
var plumber = require('gulp-plumber');
// [gulp-notify] 通知
var notify = require('gulp-notify');


/*---- 設定 ----*/
// MODE  NORMAL:圧縮あり DEBUG:圧縮なし 
var MODE = 'NORMAL';
var SASS_CSS_FILE_NAME = 'main.css';
var SRC_BASE = '../src';
var SRC_PATH = SRC_BASE + '/';
var OUT_PATH = '../release/';
var DOC_PATH = '../jsdoc/';

/*---- 条件 ----*/
var checkMode = function() {
    return MODE === 'NORMAL' ? true : false;
};


/*---- プライベートタスク ----*/
// Webサーバー
gulp.task('_webserver', function() {
    //Webサーバーで表示するサイトのルートディレクトリを指定
    return gulp.src(OUT_PATH)
        .pipe(webserver({
            //ライブリロード:有効
            livereload: true,
            //ブラウザー起動
            open: true,
            //directoryListing: true    //ディレクトリ一覧を表示するか。オプションもあり
        }));
});


// bower Pluginインストール
gulp.task('_bower-install', function() {
    return bower();
});

// bower PluginJS コピー
gulp.task('_bower-filecopy', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(SRC_PATH + 'libs/'));
});


// SASSコンパイル
gulp.task('_sass', function() {
    return gulp.src(SRC_PATH + 'sass/**/*.scss')
        .pipe(size())
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat(SASS_CSS_FILE_NAME))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SRC_PATH + 'css/'))
        //Outへcopy
        .pipe(gulpif(checkMode(), cssmin()))
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH + 'css/'));
});

// TypeScriptコンパイル
gulp.task('_ts', function() {
  // 対象となるファイルを全部指定
  return gulp.src(SRC_PATH + 'app_modules/**/*.ts')
        // 1対1でコンパイル
        .pipe(typescript({ target: "ES5", removeComments: true, noResolve: true }))
        // jsプロパティを参照
        .js
        .pipe(gulpif(checkMode(), stripDebug()))
        .pipe(gulpif(checkMode(), uglify()))
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH + 'app_modules/'));
});



// javaScriptファイルコピー
gulp.task('_copy_js', function() {
    return gulp.src([
            SRC_PATH + '**/*.js',
            '!' + SRC_PATH + 'libs/**/*.js'
        ], {
            base: SRC_BASE
        })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(gulpif(checkMode(), stripDebug()))
        .pipe(gulpif(checkMode(), uglify()))
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH));
});

// libraryファイルコピー
gulp.task('_copy_libs', function() {
    return gulp.src([
            SRC_PATH + 'libs/**/*.js'
        ], {
            base: SRC_BASE
        })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(gulpif(checkMode(), uglify()))
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH));
});

// htmlファイルコピー
gulp.task('_copy_html', function() {
    return gulp.src([
            SRC_PATH + '**/*.html'
        ], {
            base: SRC_BASE
        })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        /*.pipe(
            gulpif(
                checkMode(),
                htmlmin({
                    comments: false,
                    quotes: true,
                })
            )
        )*/
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH));
});

// cssファイルコピー
gulp.task('_copy_css', function() {
    var exceptFileName = '!' + SRC_PATH + '**/' + SASS_CSS_FILE_NAME;

    return gulp.src([
            SRC_PATH + '**/*.css',
            exceptFileName
        ], {
            base: SRC_BASE
        })
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(gulpif(checkMode(), cssmin()))
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH));
});

// その他ファイル(画像ファイル、JSONファイル 等)コピー
gulp.task('_copy_etc', function() {
    return gulp.src([
            SRC_PATH + '**/*.*',
            '!' + SRC_PATH + '**/*.js',
            '!' + SRC_PATH + '**/*.html',
            '!' + SRC_PATH + '**/*.css',
            '!' + SRC_PATH + '**/*.scss',
            '!' + SRC_PATH + '**/*.ts'
        ], {
            base: SRC_BASE
        })
        .pipe(size())
        .pipe(gulp.dest(OUT_PATH));
});



// 変更監視(SASS)
gulp.task('_watch_sass', function() {
    return gulp.watch([
            SRC_PATH + 'sass/**/*.scss'
        ],
        function(event) {
            console.log('scss files changed!');
            gulp.start('_sass');
        });
});

// 変更監視(JavaScript)
gulp.task('_watch_js', function() {
    return gulp.watch([
            SRC_PATH + '**/*.js',
            '!' + SRC_PATH + 'libs/**/*.js'
        ],
        function(event) {
            console.log('js files changed!');
            gulp.start('_copy_js');
        });
});

// 変更監視(TypeScript)
gulp.task('_watch_ts', function() {
    return gulp.watch([
            SRC_PATH + '**/*.ts'
        ],
        function(event) {
            console.log('ts files changed!');
            gulp.start('_ts');
        });
});

// 変更監視(JavaScript Library)
gulp.task('_watch_lib', function() {
    return gulp.watch([SRC_PATH + 'libs/*.js'],
        function(event) {
            console.log('libs files changed!');
            gulp.start('_copy_libs');
        });
});

// 変更監視(HTML)
gulp.task('_watch_html', function() {
    return gulp.watch([
            SRC_PATH + '**/*.html'
        ],
        function(event) {
            console.log('html files changed!');
            gulp.start('_copy_html');
        });
});

// 変更監視(CSS)
gulp.task('_watch_css', function() {
    //SASS作成cssファイル除外
    var exceptFileName = '!' + SRC_PATH + '**/' + SASS_CSS_FILE_NAME;

    return gulp.watch([
            SRC_PATH + '**/*.css',
            exceptFileName
        ],
        function(event) {
            console.log('css files changed!');
            gulp.start('_copy_css');
        });
});

// 変更監視(その他)
gulp.task('_watch_etc', function() {
    return gulp.watch([
            SRC_PATH + '**/*.*',
            '!' + SRC_PATH + '**/*.js',
            '!' + SRC_PATH + '**/*.html',
            '!' + SRC_PATH + '**/*.css',
            '!' + SRC_PATH + '**/*.scss',
            '!' + SRC_PATH + '**/*.ts'
        ],
        function(event) {
            console.log('etc files changed!');
            gulp.start('_copy_etc');
        });
});


// Outフォルダ クリア
gulp.task('_clean', function() {
    return gulp.src([OUT_PATH], {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});




/*---- パブリックタスク ----*/

// 1.Bower-install実行 + libへコピー
/*
gulp.task('bower-install', ['_bower-install'],
    function() {
        return gulp.start(['_bower-filecopy']);
    }
);
*/
gulp.task('bower-install', function() {
    console.log('-------------------------------------------------------------------------');
    console.log('bower-installに対応していない為、以下の順序でコマンドを実行してください。');
    console.log('    (1) bower install');
    console.log('    (2) gulp bower-filecopy');
    console.log('-------------------------------------------------------------------------');
});

gulp.task('bower-filecopy', function() {
    return gulp.start(['_bower-filecopy']);
});

// 2.開発タスク（デバッグモード）
gulp.task('debug', function() {
    MODE = 'DEBUG';
    return gulp.start(['default']);
});
　
// 3.開発タスク（リリース動作確認モード）[default]
gulp.task('default', function() {
    // runSequenceのSubFunctionは、終了を待たずに次が実行されてしまう為、
    // build Task と同じものを指定
    return　runSequence(
        '_clean', '_sass', ['_copy_js', '_copy_libs', '_copy_html', '_copy_css', '_ts'], ['_copy_etc'], ['_watch_js', '_watch_lib', '_watch_html', '_watch_css', '_watch_etc', '_watch_sass', '_watch_ts'], ['_webserver']
    );
});

// 4.テスト実行


// 5.JsDoc作成
gulp.task('jsdoc', function (callback) {
    //@TODO Templateの設定がうまく設定できていない
    gulp.src([
                SRC_PATH + 'js/**/*.js',
                '../README.md'
            ],
            {read: false}
        )
        .pipe(jsdoc(
            {
                'opts': {
                    'destination': DOC_PATH,
                    'template': '../../node_modules/jaguarjs-jsdoc/tmpl'
                }
            }, callback
        )
    );
});

// 6.リリースビルド
gulp.task('build', function() {
    return runSequence('_clean', '_sass', ['_copy_js', '_copy_libs', '_copy_html', '_copy_css', '_ts'], ['_copy_etc']);
});

// 7.デバッグビルド
gulp.task('build-d', function() {
    MODE = 'DEBUG';
    return gulp.start(['build']);
});

