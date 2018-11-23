const fs = require('fs-extra');

/**
 * Replace template placeholders with actual values from srcFile and write to dstFile
 * @param {*} srcFile
 * @param {*} dstFile
 * @param {*} replaceMap
 */
function replaceTemplates(srcFile, dstFile, replaceMap) {
	let content = fs.readFileSync(srcFile, 'utf-8');

	Object.keys(replaceMap).forEach((key) => {
		content = content.replace(new RegExp(`__${key}__`, 'g'), replaceMap[key]);
	});
	fs.writeFileSync(dstFile, content);
}

module.exports = {
	replaceTemplates,
};