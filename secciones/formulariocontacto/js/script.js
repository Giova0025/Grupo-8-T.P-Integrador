const form = document.getElementById("wizardForm");
const progress = document.querySelector(".progress");
const nextButtons = document.querySelectorAll(".next");
const previousButtons = document.querySelectorAll(".previous");

let currentStep = 0;
const steps = form.querySelectorAll("fieldset").length;

function updateProgressBar() {
	const percent = (currentStep / (steps - 1)) * 100;
	progress.style.width = `${percent}%`;
}

function showStep(stepIndex) {
	form.querySelectorAll("fieldset").forEach((step) => {
		step.style.display = "none";
	});

	form.querySelectorAll("fieldset")[stepIndex].style.display = "block";
	updateProgressBar();
}

function nextStep() {
	currentStep += 1;
	if (currentStep >= steps) {
		form.submit();
	} else {
		showStep(currentStep);
	}
}

function previousStep() {
	currentStep -= 1;
	showStep(currentStep);
}

nextButtons.forEach((button) => {
	button.addEventListener("click", nextStep);
});

previousButtons.forEach((button) => {
	button.addEventListener("click", previousStep);
});

showStep(currentStep);
