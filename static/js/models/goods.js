class Goods extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('goods')
        this.fields = this.fields.concat(['code', 'name', 'mass'])
    }
}
