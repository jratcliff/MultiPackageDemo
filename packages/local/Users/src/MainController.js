/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Demo.users.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.usersmain',

    requires: [
        'Ext.form.Panel',
        'Ext.Img'
    ],

    routes: {
        'users/:id': 'loadUser',
        'users/:id/:submodule': 'loadUserSubModule'
    },

    loadUser: function (id) {
        var usersGrid = this.lookup('usersGrid'),
            usersStore = usersGrid && usersGrid.getStore(),
            userRec = usersStore && usersStore.getById(id);

        if (userRec) {
            this.addUserToTabPanel(userRec);
            usersGrid.setSelection(userRec);
        }
    },

    loadUserSubModule: function (id, subModule) {
        console.log('loading user submodel ' + subModule);
    },


    onItemSelected: function (sender, record) {
        var selectedUser = this.lookup('selectedUser'),
            viewModel = selectedUser.getViewModel();

        viewModel.set('userRec', record);
    },

    onItemDblClick: function (view, record, item, index, e) {
        //this.addUserToTabPanel(record, 3);
        this.addUserToTabPanel(record);
    },

    addUserToTabPanel: function (record, tabLimit) {
        var userDetailTabPanel = this.lookup('userDetailTabPanel'),
            tabs = userDetailTabPanel.items,
            tabCount = tabs.getCount(),
            userForm = userDetailTabPanel.child('[userId=' + record.data.id + ']'),
            userToRemove, i;

        if (!userForm) {

            // if we have a tabLimit, remove the tabs up to the limit before we add a new one
            if (tabLimit && tabCount >= tabLimit) {
                for (i = 0; i <= tabCount - tabLimit; i++) {
                    userToRemove = tabs.getAt(0); // yes, use 0 instead of i
                    userDetailTabPanel.remove(userToRemove);
                }
            }

            // add a new userForm to the userDetailTabPanel
            userForm = userDetailTabPanel.add({
                xtype: 'users-userform',
                closable: true,
                userId: record.data.id,
                viewModel: {
                    data: {
                        userRec: record
                    }
                }
            });
        }
        userDetailTabPanel.setActiveItem(userForm);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
