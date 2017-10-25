Ext.define('Demo.users.UserForm', {
    extend: 'Ext.form.Panel',
    xtype: 'users-userform',

    requires: [
        'Demo.users.UserFormModel'
    ],

    viewModel: {
        type: 'users-userform'
    },

    bodyPadding: 10,

    bind: {
        title: 'User: {userRec.name}'
    },

    items: [
        {
            xtype: 'image',
            cls: 'demo-users-avatar',
            bind: {
                src: '<@Users>avatars/{userRec.avatar}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name',
            bind: '{userRec.name}'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            bind: '{userRec.email}'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Phone',
            bind: '{userRec.phone}'
        }
    ]
});
