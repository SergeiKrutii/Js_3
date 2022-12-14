import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'), 
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
    
}
const STORAGE_KEY = "feedback-form-state";
let formData = {}


refs.form.addEventListener('input', throttle(onFormInput, 500))
refs.form.addEventListener('submit', onFormSubmit)

onSavedValue()

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    
}

function onSavedValue() {
    try {
        const { message, email } = JSON.parse(localStorage.getItem(STORAGE_KEY));
        
        if (STORAGE_KEY) {
            refs.textarea.value = message;
            refs.input.value = email;
        }
    }
    catch (e) {
        console.log('Заполните форму!')
    }
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData)
    e.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
}
