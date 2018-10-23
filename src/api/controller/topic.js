const Base = require('./base.js');

module.exports = class extends Base {
    async listAction() {
        const cateid = this.get('cateid');

        const model = this.model('topic');
        if (cateid > 0) {
            model.where({ topic_category_id: cateid });
        }
        const data = await model.field(['id', 'title', 'price_info', 'scene_pic_url', 'subtitle', 'topic_category_id']).page(this.get('page') || 1, this.get('size') || 10).countSelect();

        return this.success(data);
    }

    async categoryAction() {
        const model = this.model('topic_category');
        const data = await model.field(['id', 'title', 'pic_url']).page(this.get('page') || 1, this.get('size') || 10).countSelect();

        return this.success(data);
    }



    async detailAction() {
        const model = this.model('topic');
        const data = await model.where({ id: this.get('id') }).find();

        return this.success(data);
    }

    async relatedAction() {
        const model = this.model('topic');
        const data = await model.field(['id', 'title', 'price_info', 'scene_pic_url', 'subtitle']).limit(4).select();

        return this.success(data);
    }
};