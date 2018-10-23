function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const page = _this.get('page') || 1;
            const size = _this.get('size') || 10;
            const name = _this.get('name') || '';

            const model = _this.model('topic');
            const data = yield model.where({ title: ['like', `%${name}%`] }).order(['id DESC']).page(page, size).countSelect();

            return _this.success(data);
        })();
    }
    countAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const model = _this2.model('topic');
            const data = yield model.countSelect();

            return _this2.success(data.count);
        })();
    }
    categoryByIdAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const id = _this3.get('id');
            const model = _this3.model('topic');
            const data = yield model.where({ id: id }).find();

            return _this3.success(data);
        })();
    }
    categoryAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const model = _this4.model('topic_category');
            const data = yield model.countSelect();

            return _this4.success(data);
        })();
    }
    infoAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const id = _this5.get('id');
            const model = _this5.model('topic');
            const data = yield model.where({ id: id }).find();

            return _this5.success(data);
        })();
    }

    storeCategoryAction() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (!_this6.isPost) {
                return false;
            }

            const values = _this6.post();
            console.log(values);
            const id = _this6.post('id');

            const model = _this6.model('topic_category');

            if (id > 0) {
                yield model.where({ id: id }).update(values);
            } else {
                delete values.id;
                yield model.add(values);
            }
            return _this6.success(values);
        })();
    }

    storeAction() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (!_this7.isPost) {
                return false;
            }

            const values = _this7.post();
            const id = _this7.post('id');

            const model = _this7.model('topic');
            values.is_show = values.is_show ? 1 : 0;
            values.is_new = values.is_new ? 1 : 0;
            if (id > 0) {
                yield model.where({ id: id }).update(values);
            } else {
                delete values.id;
                yield model.add(values);
            }
            return _this7.success(values);
        })();
    }

    destoryAction() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            const id = _this8.get('id');
            yield _this8.model('topic').where({ id: id }).limit(1).delete();
            // TODO 删除图片

            return _this8.success();
        })();
    }
};
//# sourceMappingURL=topic.js.map