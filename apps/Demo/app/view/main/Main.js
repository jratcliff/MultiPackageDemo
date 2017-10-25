/**
 */
Ext.define('Demo.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    controller: 'main',
    viewModel: 'main',

    requires: [
        'Ext.layout.Fit',
        'Ext.window.MessageBox',
        'Ext.plugin.Viewport'
    ],

    plugins: 'viewport',

    tabBarPosition: 'bottom',

    defaults: {
        layout: 'fit',
        tab: {
            iconAlign: 'top'
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'x-fa fa-home',
        reference: 'home',
        hasItem: true,
        items: [{
            xtype: 'homelist'
        }]
    }, {
        title: 'Users',
        iconCls: 'x-fa fa-user',
        reference: 'users',
        package: 'Users',
        view: 'usersmain',
        tab: {
            iconAlign: 'top',
            closable: true
        }
    }, {
        title: 'Dashboard',
        iconCls: 'x-fa fa-users',
        reference: 'dashboard',
        package: 'Dashboard',
        view: 'dashboardmain'
    }, {
        title: 'Settings',
        iconCls: 'x-fa fa-cog',
        reference: 'settings',
        package: 'Settings',
        view: 'settingsmain'
    }],

    listeners: {
        tabchange: 'onItemActivate'
    }
});
