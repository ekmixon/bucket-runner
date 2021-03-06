// Copyright 2015-2016 Spotify AB. All rights reserved.
//
// The contents of this file are licensed under the Apache License, Version 2.0
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

const debug = require('debug');
const pkg = require('../package.json');

const dbg = debug(`${pkg.name}:partition-by-size`);

module.exports = function partitionBySize(size, files) {
  const groups = [[]];

  files.forEach((filepath) => {
    const curr = groups[groups.length - 1]
      ? groups[groups.length - 1]
      : (groups[groups.length - 1] = []);

    dbg('partition curr %o, length %d', curr, curr.length);

    if (curr.length < size) {
      curr.push(filepath);
    } else {
      groups.push([filepath]);
    }
  });

  return {
    groups,
    names: [],
  };
};
