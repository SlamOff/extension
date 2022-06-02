const fs = require('fs-extra');
const manifest = require('../public/manifest.json');

const paths = {
  build: {
    root: './build/',
    images: './build/assets/images',
    js: 'static/js',
    css: 'static/css'
  },
  src: {
    root: './src/',
    popup: './src/popup/',
  }
};

/**
 * readFile uses a Regex to filter, match, and return the static file based on
 * the `prefix` and `extension` in the directory based on the `path`.
 *
 * @param {string} path File path relative to the build directory - `'static/js'`
 * @param {string} prefix File prefix for the file name - `'main'`
 * @param {string} extension File extension - 'js'
 * @returns {string} File name - `'main.66848e72.js'`
 */
function readFile(path, prefix, extension) {
  const file = new RegExp(`^${prefix}\.[a-z0-9]+\.${extension}$`)
  return fs.readdirSync(`./build/${path}`)
    .filter(filename => file.test(filename))
    .map(filename => {
      console.log(filename);
      return `${path}/${filename}`
    })[0];
};

const js = readFile(paths.build.js, 'main', 'js');
const css = readFile(paths.build.css, 'main', 'css');

const newManifest = {
  ...manifest,
  content_scripts: [
    {
      ...manifest.content_scripts[0],
      js: [js],
      css: [css],
    }
  ],
  web_accessible_resources: [
    {
      ...manifest.web_accessible_resources[0],
      ...manifest.web_accessible_resources[1],
      ...manifest.web_accessible_resources[2],
      resources: ['inject.js', 'static/media/*']
    }
  ],
};

fs.writeFileSync(`${paths.build.root}manifest.json`, JSON.stringify(newManifest, null, 2));
fs.writeFileSync(`${paths.build.root}popup.html`, fs.readFileSync(`${paths.src.popup}popup.html`));
fs.writeFileSync(`${paths.build.root}popup.js`, fs.readFileSync(`${paths.src.popup}popup.js`));
fs.writeFileSync(`${paths.build.root}inject.js`, fs.readFileSync(`${paths.src.root}inject.js`));


// fs.writeFileSync('./build/assets/images/', fs.readFileSync('./src/assets/images/*'));
// const srcDir = `path/to/file`;
// const destDir = `path/to/destination/directory`;
                              
// // To copy a folder or file  
// fse.copySync(srcDir, destDir, function (err) {
//   if (err) {                 ^
//     console.error(err);      |___{ overwrite: true } // add if you want to replace existing folder or file with same name
//   } else {
//     console.log("success!");
//   }
// });