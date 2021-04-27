/**
 * 转换为小程序代码
 */
const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

const cleanCache = () => gulp.src('mini/**/*.*').pipe(clean());

const replaceDeps = () =>
  gulp
    .src('src/**/*.{ts,tsx,css}', {
      ignore: [
        'src/{mini,index}.{ts,tsx}',
        'src/components/action-list/*.{ts,tsx}',
        'src/components/adaptive-popup/*.{ts,tsx}',
        'src/components/checkbox/*.{ts,tsx}',
        'src/components/date-picker/*.{ts,tsx}',
        'src/components/demo/*.{ts,tsx}',
        'src/components/file-picker/*.{ts,tsx}',
        'src/components/icon/*.{ts,tsx}',
        'src/components/menu/*.{ts,tsx}',
        'src/components/overlays/**/*.{ts,tsx}',
        'src/components/search-form/*.{ts,tsx}',
        'src/components/select/*.{ts,tsx}',
        'src/components/table/*.{ts,tsx}',
        'src/components/tag/*.{ts,tsx}',
        'src/components/time-picker/*.{ts,tsx}',
        'src/components/tree/*.{ts,tsx}',
        'src/components/virtual-list/*.{ts,tsx}',
      ],
    })
    .pipe(replace("import styled from 'styled-components';", "import { styled } from '@linaria/react';"))
    .pipe(replace('@rexd/one', 'remax/one'))
    .pipe(replace("from 'lodash'", "from 'lodash/core'"))
    .pipe(gulp.dest('mini'));

const replaceEntry = () =>
  gulp
    .src('src/**/mini.{ts,tsx}')
    .pipe(
      rename((path) => {
        path.basename = 'index';
      }),
    )
    .pipe(gulp.dest('mini'));

const copy = () => gulp.src('mini/**/*.{ts,tsx,css}').pipe(gulp.dest('../../../hippo-mini/packages/mini/src'));

exports.default = gulp.series(cleanCache, replaceDeps, replaceEntry, copy);
