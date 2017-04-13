class DRedo {

    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    undoAction() {
        var action = this.undoStack.pop();
        this.redoStack.push(action);
        return this.getUndoStackHead();
    }

    redoAction() {
        var action = this.redoStack.pop();
        this.undoStack.push(action);
        return this.getUndoStackHead();
    }

    getUndoStackHead() {
        var action = this.undoStack[this.undoStack.length - 1];
        return action;
    }


    controlledActionAdding(action) {
        if (this.getUndoStackHead() == undefined) {
            this._newAction(action);
            return "";
        }
        else {
            var undoHeadLength = this.getUndoStackHead().length;
            var distance = action.length - undoHeadLength;
            if (Math.abs(distance) > 5) {
                this._newAction(action);
                return action;
            }
        }
        return "";

    }

    clearRedo() {
        this.redoStack = [];
    }

    _newAction(action) {
        this.undoStack.push(action);
        return action;
    }
}

module.exports.DRedo = DRedo;