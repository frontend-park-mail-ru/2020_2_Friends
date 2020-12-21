// Regular expessions to check user input forms.
export const regTemplates = {
    url: /([^:]+):?(.+)?/,
    email: /^.+@.+\..+$/,
    username: /^[a-zA-Z0-9а-яА-Я_]{2,30}$/,
    password: /[a-zA-Z0-9_]{8,30}$/,
    number: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/, // eslint-disable-line
    address: /^[а-яА-Яa-zA-Z0-9.,-\s]{5,50}$/,
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
};
