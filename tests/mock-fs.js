const fs = jest.createMockFromModule("fs");
fs.stat = (folderLocation, callback) => {
  callback(false, { isDirector: false });
};
fs.mkdir = (folderLocation, options, callback) => {
  callback(false);
};
module.exports = fs;
