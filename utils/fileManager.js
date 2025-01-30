const fs = require('fs');

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.ensureFileExists();
    }

    ensureFileExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    read() {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }

    write(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = FileManager;
