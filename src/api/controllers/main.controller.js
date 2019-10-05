const path = require('path');
const httpStatus = require('http-status');

module.exports.newsPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/news.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.blePage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/ble.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.homePage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/index.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.notFoundPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/404.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}