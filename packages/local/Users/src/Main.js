/**
 * This view is an example list of people.
 */
Ext.define('Demo.users.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'usersmain',

    requires: [
        'Ext.grid.Panel',
        'Ext.tab.Panel',
        'Ext.grid.column.Template',
        'Demo.users.UserForm'
    ],

    controller: 'usersmain',

    title: 'Users',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    defaults: {
        flex: 1
    },

    items: [
        // grid
        {
            xtype: 'grid',
            reference: 'usersGrid',
            store: {
                type: 'users'
            },

            columns: [{
                xtype: 'templatecolumn',
                text: 'Name',
                flex: 1,
                tpl:
                '<img class="demo-users-avatar" src="{avatar:resource("<@Users>avatars/")}">' +
                // The name field could be malicious so encode it
                '<div class="demo-user-bio">{name}</div>'

            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1,

                cell: {
                    userCls: 'demo-users-cell'
                }
            }, {
                text: 'Phone',
                dataIndex: 'phone',
                width: 150
            }],

            listeners: {
                select: 'onItemSelected',
                itemdblclick: 'onItemDblClick'
            }
        },
        // currently selected user
        {
            xtype: 'users-userform',
            reference: 'selectedUser',
            bind: {
                title: 'Selected User: {usersGrid.selection.name}',
                hidden: '{!usersGrid.selection}'
            }
        },
        // all opened users
        {
            xtype: 'tabpanel',
            reference: 'userDetailTabPanel'
        }
    ]


});
