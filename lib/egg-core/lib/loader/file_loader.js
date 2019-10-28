const path = require('path');
const fs = require('fs');
const globby = require('globby');
const is = require('is-type-of');

class FileLoader {
    constructor(options) {
        this.options = options;
    }
    load() {
        const items = this.parse();
        const target = this.options.target;
        for (const item of items) {
            if (is.class(item.exports)) {
                item.exports = new item.exports();
            }
            target[item.properties[0]] = item.exports;
        }
        return target;
    }
    parse() {
        let files = this.options.match;
        if (!files) {
            files = ['**/*.js'];
        } else {
            files = Array.isArray(files) ? files : [files];
        }
        let directories = this.options.directory;
        if (!Array.isArray(directories)) {
            directories = [directories];
        }
        const items = [];
        for (const directory of directories) {
            const filepaths = globby.sync(files, { cwd: directory });
            for (const filepath of filepaths) {
                const fullpath = path.join(directory, filepath);
                if (!fs.statSync(fullpath).isFile()) continue;
                const properties = [
                    filepath
                        .substring(0, filepath.lastIndexOf('.'))
                        .split('/')
                        .pop()
                ];
                let exports = require(fullpath);
                if (exports == null) continue;
                items.push({ fullpath, properties, exports });
            }
        }
        return items;
    }
}

module.exports = FileLoader;
