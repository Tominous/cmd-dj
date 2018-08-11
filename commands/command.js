class Command {
    constructor(data) {
        this._dj = data.dj;
        this._name = data.name;
        this._roles = data.roles;
        this._handler = data.handler;
        this._falseHandler = data.falseHandler;
        this._usage = data.usage;
        this._help = data.help;
        this._path = data.path;
        this._onLoad = data.onLoad;
        this._subCommands = data.subCommands;
        this.module = data.module;
        this.data = {};
        
        if (data.dj.ready) this._onLoad(this);
    }
    
    addSubCommand(name,handler) {
        this._subCommands[name] = handler;
    }
    
    run(message,args) {
        if (args[0] && args[0] in this._subCommands)
            this._subCommands[args[0]](message,args.slice(1),this._dj)
        else
            this._handler(message,args,this._dj);
    }
    
    falseRun(message,args) {
        this._falseHandler(message,args,this._dj);
    }
    
    get usage() {
        var prefix = this._dj.dj.get('prefix');
        return this._usage.split('{prefix}').join(prefix);
    }
}

module.exports = Command;