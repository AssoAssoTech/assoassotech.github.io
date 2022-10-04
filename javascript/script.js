let  contactSubmitButtons = document.querySelectorAll('button[type=submit]')
let sendEmailToServer = (event) => {
    console.log('HOE')
    event.preventDefault()
}
console.log(contactSubmitButtons)
contactSubmitButtons.forEach(button => {
    button.onsubmit = event => sendEmailToServer(event)
});
console.log(contactSubmitButtons[0].onsubmit)
