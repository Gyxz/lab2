class GoodstoPlanet extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('GoodstoPlanet')
        this.fields = this.fields.concat(['planet', 'goods'])
    }
}
