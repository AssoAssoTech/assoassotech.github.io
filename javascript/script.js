let  contactSubmitButtons = document.querySelectorAll('button[type=submit]')
let formSubmittedSuccessTemplate = document.getElementById('form-submitted-success')
let formSubmittedErrorTemplate = document.getElementById('form-submitted-error')

let useTemplate = (nodeToReplace, template) => {
    let content = template.content.cloneNode(true) 
    let parentNode = nodeToReplace.parentNode
    parentNode.replaceChild(content, nodeToReplace)
} 

let displaySuccessMessage = (nodeToReplace) => {
    useTemplate(nodeToReplace, formSubmittedSuccessTemplate)
}
let displayErrorMessage = (nodeToReplace) => {
    useTemplate(nodeToReplace, formSubmittedErrorTemplate)
}

let sendEmailToServer = (formData, nodeToReplace) => {
    axios.post('http://127.0.0.1:3000/sales/leads.json', formData)
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