
let currentStep = 1;
showStatus(currentStep);
//Displaying the block of form based on the step
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    document.querySelector(`.step[data-step="${step}"]`).style.display = 'block';
}
//throws alert if the forms are not filled
function nextStep(step) {
    const inputs = document.querySelectorAll(`.step[data-step="${step}"] input[required]`);
    if (Array.from(inputs).some(input => !input.value.trim())) {
        alert('Please fill out all required fields.');
        return;
    }
    const errorSpans = document.querySelectorAll('.errorName');
    if (Array.from(errorSpans).some(span => span.innerHTML !== '')) {
        alert('Please correct errors before proceeding.');
        return;
    }
    currentStep = step + 1;
    showStep(currentStep);
    showStatus(currentStep);
}

//for the button 
function prevStep(step) {
    currentStep = step - 1;
    showStep(currentStep);
}
//selecting the input type text
document.querySelectorAll('input[type="text"]').forEach(function (input) {
    input.addEventListener('input', validateForm);
});
//validating input type text and shows error
function validateForm(event) {
    var input = event.target;
    var inputValue = input.value.trim();
    var container = input.closest('.col-md-6');
    var errorSpan = container.querySelector('.errorName');

    if (/^[A-Za-z]+$/.test(inputValue) === false) {
        errorSpan.innerHTML = 'Field must be filled and contain only letters';
    } else {
        errorSpan.innerHTML = '';
    }
    const confirmationDiv = document.getElementById('confirmation');
    if (confirmationDiv) {
        updateNextButtonState();
    }
}

//displayig all the information in the final page
document.getElementById('multiStepForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.innerHTML = '';

    const formInputs = this.elements;
    for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];
        if (input.type === 'radio' && !input.checked) {
            continue;
        }
        if (input.type !== 'submit') {  
            confirmationDiv.innerHTML += `<p><strong>${input.name}:</strong> ${input.value}</p>`;
        }
    }
    updateNextButtonState()
});

//handles the button if there is error of input type
function updateNextButtonState() {
    const errorSpans = document.querySelectorAll('.errorName');
    const nextButton = document.querySelector('.nextBtn');
    if (Array.from(errorSpans).some(span => span.innerHTML !== '')) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}
//Top button status conditioning
function showStatus(step) {
    const buttons = document.querySelectorAll('.form-status .btns');
    buttons.forEach(button => button.classList.remove('blue'));
    const currentButton = document.querySelector(`.form-status .btns[data-step="${step}"]`);
    if (currentButton) {
        currentButton.classList.add('blue');
    }
}

document.getElementById('multiStepForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Perform final validation only if the current step is 4
    if (currentStep == 4) {
        showConfirmationMessage();
    }
}
);

// Function to show confirmation message
function showConfirmationMessage() {
    if (event.submitter.classList.contains('submit') && currentStep === 4) {
        alert('Form submitted successfully!');
        showStep(1)
    }

}