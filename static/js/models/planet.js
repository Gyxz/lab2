class Planet extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('planet')
        this.fields = this.fields.concat(['name', 'spacestation', 'capasity','mass'])
    }
}
