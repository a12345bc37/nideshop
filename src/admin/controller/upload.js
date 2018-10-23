const Base = require('./base.js');
const fs = require('fs');
const formidable = require('formidable');

module.exports = class extends Base {

    async uploadImgPicAction(file, req, res, next) {
        //const type = req.params.type;
        console.log(req);
        console.log(file);
        console.log("1----------------------------------------------111");


        try {
            //const image_path = await this.qiniu(req, type);
            const image_path = await this.getPath(req, res);
            const that = this;
            return that.success({
                status: 1,
                fileUrl: 'http://127.0.0.1:8360' + image_path
            });
        } catch (err) {
            console.log('上传图片失败', err);

            return this.fail({
                status: 0,
                type: 'ERROR_UPLOAD_IMG',
                message: '上传图片失败' + err
            });

        }
    }
    async getPath(req, res) {
        return new Promise((resolve, reject) => {
            var form = new formidable.IncomingForm();
            console.log(req);
            form.parse(req, function(err, fields, files) {

            });
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
        })
    }
    async brandPicAction() {
        const brandFile = this.file('file');
        if (think.isEmpty(brandFile)) {
            return this.fail('保存失败');
        }
        const that = this;
        const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
        const is = fs.createReadStream(brandFile.path);
        const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
        is.pipe(os);

        return that.success({
            name: 'brand_pic',
            fileUrl: 'http://127.0.0.1:8360' + filename
        });
    }

    async brandNewPicAction() {
        const brandFile = this.file('brand_new_pic');
        if (think.isEmpty(brandFile)) {
            return this.fail('保存失败');
        }
        const that = this;
        const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

        const is = fs.createReadStream(brandFile.path);
        const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
        is.pipe(os);

        return that.success({
            name: 'brand_new_pic',
            fileUrl: 'http://127.0.0.1:8360' + filename
        });
    }

    async categoryWapBannerPicAction() {
        const imageFile = this.file('wap_banner_pic');
        if (think.isEmpty(imageFile)) {
            return this.fail('保存失败');
        }
        const that = this;
        const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

        const is = fs.createReadStream(imageFile.path);
        const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
        is.pipe(os);

        return that.success({
            name: 'wap_banner_url',
            fileUrl: 'http://127.0.0.1:8360' + filename
        });
    }

    async topicThumbAction() {
        const imageFile = this.file('scene_pic_url');
        if (think.isEmpty(imageFile)) {
            return this.fail('保存失败');
        }
        const that = this;
        const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

        const is = fs.createReadStream(imageFile.path);
        const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
        is.pipe(os);

        return that.success({
            name: 'scene_pic_url',
            fileUrl: 'http://127.0.0.1:8360' + filename
        });
    }
};