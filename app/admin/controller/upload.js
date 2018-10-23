function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const fs = require('fs');
const formidable = require('formidable');

module.exports = class extends Base {

    uploadImgPicAction(file, req, res, next) {
        var _this = this;

        return _asyncToGenerator(function* () {
            //const type = req.params.type;
            console.log(req);
            console.log(file);
            console.log("1----------------------------------------------111");

            try {
                //const image_path = await this.qiniu(req, type);
                const image_path = yield _this.getPath(req, res);
                const that = _this;
                return that.success({
                    status: 1,
                    fileUrl: 'http://127.0.0.1:8360' + image_path
                });
            } catch (err) {
                console.log('上传图片失败', err);

                return _this.fail({
                    status: 0,
                    type: 'ERROR_UPLOAD_IMG',
                    message: '上传图片失败' + err
                });
            }
        })();
    }
    getPath(req, res) {
        return _asyncToGenerator(function* () {
            return new Promise(function (resolve, reject) {
                var form = new formidable.IncomingForm();
                console.log(req);
                form.parse(req, function (err, fields, files) {});
                // const form = formidable.IncomingForm();
                // form.uploadDir = './public/img';
                // form.parse(req, async(err, fields, files) => {

                //     const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16);
                //     const extname = path.extname(files.file.name);
                //     if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
                //         fs.unlinkSync(files.file.path);
                //         res.send({
                //             status: 0,
                //             type: 'ERROR_EXTNAME',
                //             message: '文件格式错误'
                //         })
                //         reject('上传失败');
                //         return
                //     }
                //     const fullName = hashName + extname;
                //     const repath = './public/img/' + fullName;
                //     try {
                //         fs.renameSync(files.file.path, repath);
                //         gm(repath)
                //             .resize(200, 200, "!")
                //             .write(repath, async(err) => {
                //                 // if(err){
                //                 // 	console.log('裁切图片失败');
                //                 // 	reject('裁切图片失败');
                //                 // 	return
                //                 // }
                //                 resolve(fullName)
                //             })
                //     } catch (err) {
                //         console.log('保存图片失败', err);
                //         if (fs.existsSync(repath)) {
                //             fs.unlinkSync(repath);
                //         } else {
                //             fs.unlinkSync(files.file.path);
                //         }
                //         reject('保存图片失败')
                //     }
                // });
            });
        })();
    }
    brandPicAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const brandFile = _this2.file('file');
            if (think.isEmpty(brandFile)) {
                return _this2.fail('保存失败');
            }
            const that = _this2;
            const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
            const is = fs.createReadStream(brandFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'brand_pic',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    brandNewPicAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const brandFile = _this3.file('brand_new_pic');
            if (think.isEmpty(brandFile)) {
                return _this3.fail('保存失败');
            }
            const that = _this3;
            const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(brandFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'brand_new_pic',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    categoryWapBannerPicAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const imageFile = _this4.file('wap_banner_pic');
            if (think.isEmpty(imageFile)) {
                return _this4.fail('保存失败');
            }
            const that = _this4;
            const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(imageFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'wap_banner_url',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    topicThumbAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const imageFile = _this5.file('scene_pic_url');
            if (think.isEmpty(imageFile)) {
                return _this5.fail('保存失败');
            }
            const that = _this5;
            const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(imageFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'scene_pic_url',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }
};
//# sourceMappingURL=upload.js.map