class GoodstoStation extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('GoodstoStation')
        this.fields = this.fields.concat(['spacestation', 'goods'])
    }
}
