/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Demo.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.Package'  // from "package-loader"
    ],

    routes: {
        ':type': {
            before: 'loadPackage',
            action: 'showView'
        },
        ':type/:wildcard': {
            before: 'loadPackage',
            action: 'showView',
            conditions: {
                ':wildcard': '(.*)'
            }
        }
    },

    /**
     * This method is called before we take action on a route change. Before we can
     * create the proper view, we need to be sure the package that provides it is
     * loaded.
     */
    loadPackage: function () {
        var args = Ext.Array.slice(arguments),
            type = args.shift(), // always first
            action = args.pop(), // always last
            wildcard = args[0], // what is left
            token = wildcard ? type + '/' + wildcard : type,
            tabpanel = this.getView(),
            tab = this.lookup(type),
            pkg = tab.package;

        if (!pkg || Ext.Package.isLoaded(pkg)) {
            action.resume();
        }
        else {
            tabpanel.setMasked({
                message: 'Loading Package...'
            });

            Ext.defer(function (token) {  // so we can see the loading mask...
                Ext.Package.load(pkg).then(function () {
                    tabpanel.setMasked(null);
                    action.resume();

                    // manually call doRun passing the original token.  this will allow the new routes defined in the newly loaded package to now be examined for this token and run if a match.
                    Ext.route.Router.doRun([token]);
                });
            }, 500, this, [token]);
        }
    },

    /**
     * This method is called to take action on a route change. We create the associated
     * view and rely on our "before" handler (loadPackage) to ensure we can do so.
     */
    showView: function (type) {
        var tabpanel = this.getView(),
            tab = this.lookup(type);

        tabpanel.setActiveItem(tab);

        if (!tab.hasItem) {
            tab.hasItem = true;

            tab.add({
                xtype: tab.view
            });
        }
    },

    onItemActivate: function (tabpanel, tab) {
        var curTopLevelHash = Ext.util.History.hash.split('/').shift();

        if (curTopLevelHash !== tab.reference) {
            this.redirectTo(tab.reference);
        }
    }
});
