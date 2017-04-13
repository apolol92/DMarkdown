var DRedoModule = require("../js/DRedo");
describe("DRedo", function () {
    it("should push an action on undo-stack..", function () {
        var action = "Hallo Welt";
        var dRedoer = new DRedoModule.DRedo();
        dRedoer.controlledActionAdding(action);
        expect(dRedoer.getUndoStackHead()).toEqual(action);
    });
    it("should not push current action on undo-stack..", function() {
        var action = "Hallo Welt";
        var currentAction = "Hallo Welt Tes";
        var dRedoer = new DRedoModule.DRedo();
        dRedoer.controlledActionAdding(action);
        dRedoer.controlledActionAdding(currentAction);
        expect(dRedoer.getUndoStackHead()).toEqual(action);
    });
    it("should push current action on undo-stack..", function() {
        var action = "Hallo Welt";
        var currentAction = "Hallo Welt! Das müsste auf den Stack!";
        var dRedoer = new DRedoModule.DRedo();
        dRedoer.controlledActionAdding(action);
        dRedoer.controlledActionAdding(currentAction);
        expect(dRedoer.getUndoStackHead()).toEqual(currentAction);
    });
    it("should get 'Hallo Welt!'", function() {
        var action = "Hallo Welt";
        var currentAction = "Hallo Welt! Das müsste auf den Stack!";
        var dRedoer = new DRedoModule.DRedo();
        dRedoer.controlledActionAdding(action);
        dRedoer.controlledActionAdding(currentAction);
        var result = dRedoer.undoAction();
        expect(result).toEqual(action);
    });
    it("should get 'Hallo Welt! Das müsste auf den Stack!'", function() {
        var action = "Hallo Welt";
        var currentAction = "Hallo Welt! Das müsste auf den Stack!";
        var dRedoer = new DRedoModule.DRedo();
        dRedoer.controlledActionAdding(action);
        dRedoer.controlledActionAdding(currentAction);
        dRedoer.undoAction();
        var result = dRedoer.redoAction();
        expect(result).toEqual(currentAction);
    });
});