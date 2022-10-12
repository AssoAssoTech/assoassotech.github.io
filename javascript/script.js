let  contactSubmitButtons = document.querySelectorAll('button[type=submit]')
let formSubmittedSuccessTemplate = document.getElementById('form-submitted-success')
let formSubmittedErrorTemplate = document.getElementById('form-submitted-error')

let useTemplate = (nodeToReplace, content) => {
    let parentNode = nodeToReplace.parentNode
    parentNode.replaceChild(content, nodeToReplace)
    return parentNode.querySelector('.replacable')
} 

let displaySuccessMessage = (nodeToReplace) => {
    let content = formSubmittedSuccessTemplate.content.cloneNode(true) 
    return useTemplate(nodeToReplace, content)
}
let displayErrorMessage = (nodeToReplace) => {
    let content = formSubmittedErrorTemplate.content.cloneNode(true) 
    let newForm = useTemplate(nodeToReplace, content)
    newForm.onsubmit = event => handleFormSubmission(event)
}

let sendEmailToServer = (formData, nodeToReplace) => {
    axios.post('http://assoasso.tech/sales/leads.json', formData)
      .then(function () {
        displaySuccessMessage(nodeToReplace);
      })
      .catch(function () {
        displayErrorMessage(nodeToReplace);
      });

}

let handleFormSubmission = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    sendEmailToServer(
        formData,
        event.target
    )
}

contactSubmitButtons.forEach(button => {
    button.form.onsubmit = event => handleFormSubmission(event)
});