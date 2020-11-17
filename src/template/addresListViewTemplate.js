export const renderAddrListView = () => window.Handlebars.compile(`
<div class="js-addr-errors text-error"></div>
{{#each this}}
<div class="address-item">
    <div class="address-item-text">{{this}}</div>
    <div class="address-delete-butoon round-delete-button js-delete-address"></div>
</div>
{{/each}}
`);
