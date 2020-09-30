import {LoginView} from '/src/views/loginView';

const root = document.getElementById('root');
console.log('hi')

const loginView = new LoginView(root);
loginView.render();

// const Handlebars = require("handlebars");
// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));

// root.innerHTML = '';

//     const form = document.createElement('form');

//     const emailInput = createInput('email', 'Емайл', 'email');
//     const passwordInput = createInput('password', 'Пароль', 'password');
//     const ageInput = createInput('number', 'Возраст', 'age');

//     const submitBtn = document.createElement('input');
//     submitBtn.type = 'submit';
//     submitBtn.value = 'Зарегистрироваться!';

//     const back = document.createElement('a');
//     back.href = '/menu';
//     back.textContent = 'Назад';
//     back.dataset.section = 'menu';

//     form.appendChild(emailInput);
//     form.appendChild(passwordInput);
//     form.appendChild(ageInput);
//     form.appendChild(submitBtn);
//     form.appendChild(back);

//     root.appendChild(form);

//     function createInput(type, text, name) {
//         const input = document.createElement('input');
//         input.type = type;
//         input.name = name;
//         input.placeholder = text;
    
//         return input;
//     }function createInput(type, text, name) {
//         const input = document.createElement('input');
//         input.type = type;
//         input.name = name;
//         input.placeholder = text;
    
//         return input;
//     }