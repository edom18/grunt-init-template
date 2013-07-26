(function (win, doc, Class, ns) {

    /**
     * Gives a disposal function.
     * @constructor
     */
    var Disposable = Class.extend({
        dispose: function () {
            if (this.isDisposed()) {
                return false;
            }

            this._disposed = true;
        },
        isDisposed: function () {
            return this._disposed;
        }
    });


    /*! ---------------------------------------------------------
        EXPORTS
    ------------------------------------------------------------- */
    ns.Disposable = Disposable;

}(window, window.document, window.Class, window));
