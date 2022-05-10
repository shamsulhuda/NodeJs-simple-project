// defendencies
const fs = require('fs');
const path = require('path');

// scaffolding
const lib = {};

// base directory of data folder

lib.basedir = path.join(__dirname, './../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (openEror, fileDescriptor) => {
        if (!openEror && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // write data to file and close it
            fs.writeFile(fileDescriptor, stringData, (writeError) => {
                if (!writeError) {
                    fs.close(fileDescriptor, (closeError) => {
                        if (!closeError) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Unable to create file, it may already exists!');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    console.log('Hello', callback);
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (readEror, data) => {
        callback(readEror, data);
    });
};

// update existing file
lib.update = (dir, file, data, callback) => {
    // let's open the file
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            // Empty the file
            fs.ftruncate(fileDescriptor, (error) => {
                if (!error) {
                    // write the file and close it
                    fs.writeFile(fileDescriptor, stringData, (writeError) => {
                        if (!writeError) {
                            // close the file
                            fs.close(fileDescriptor, (closeError) => {
                                if (!closeError) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    callback('Eror truncating file!');
                }
            });
        } else {
            callback('File may not exists!');
        }
    });
};

module.exports = lib;
