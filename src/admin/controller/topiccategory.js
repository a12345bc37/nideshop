const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const page = this.get('page') || 1;
        const size = this.get('size') || 10;
        const name = this.get('name') || '';

        const model = this.model('topic');
        const data = await model.where({ title: ['like', `%${name}%`] }).order(['id DESC']).page(page, size).countSelect();

        return this.success(data);
    }
    async categoryByIdAction() {
        const id = this.get('id');
        const model = this.model('topic');
        const data = await model.where({ id: id }).find();

        return this.success(data);
    }
    async categoryAction() {
        const model = this.model('topic_category');
        const data = await model.countSelect();

        return this.success(data);
    }
    async infoAction() {
        const id = this.get('id');
        const model = this.model('topic_category');
        const data = await model.where({ id: id }).find();

        return this.success(data);
    }

    async storeCategoryAction() {
        if (!this.isPost) {
            return false;
        }

        const values = this.post();
        console.log(this.get('title'));
        console.log(values);
        const id = this.post('id');

        const model = this.model('topic_category');

        if (id > 0) {
            await model.where({ id: id }).update(values);
        } else {
            delete values.id;
            await model.add(values);
        }
        return this.success(values);
    }



    async destoryAction() {
        const id = this.post('id');
        await this.model('topic').where({ id: id }).limit(1).delete();
        // TODO 删除图片

        return this.success();
    }
};