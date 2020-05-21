class SpaceStation extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('spacestation')
        this.fields = this.fields.concat(['name', 'capasity','needs'])
    }
}
