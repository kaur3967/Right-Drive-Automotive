const form = document.getElementById("complaintForm");

form.addEventListener("submit", function (event) {

    let valid = true;


    // Full Name

    const fullName =
        document.getElementById("fullName");

    const fullNameError =
        document.getElementById("fullNameError");

    if (fullName.value.trim().length < 2) {

        fullNameError.textContent =
            "Please enter your full name.";

        fullNameError.style.color = "red";

        valid = false;

    } else {

        fullNameError.textContent = "";
    }


    // Email

    const email =
        document.getElementById("email");

    const emailError =
        document.getElementById("emailError");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailError.style.color = "red";

        valid = false;

    } else {

        emailError.textContent = "";
    }


    // Phone

    const phone =
        document.getElementById("phone");

    const phoneError =
        document.getElementById("phoneError");

    const phonePattern =
        /^[0-9+\-\s()]{7,20}$/;

    if (!phonePattern.test(phone.value.trim())) {

        phoneError.textContent =
            "Please enter a valid phone number.";

        phoneError.style.color = "red";

        valid = false;

    } else {

        phoneError.textContent = "";
    }


    // Vehicle Make

    const vehicleMake =
        document.getElementById("vehicleMake");

    const vehicleMakeError =
        document.getElementById("vehicleMakeError");

    if (vehicleMake.value.trim() === "") {

        vehicleMakeError.textContent =
            "Vehicle make is required.";

        vehicleMakeError.style.color = "red";

        valid = false;

    } else {

        vehicleMakeError.textContent = "";
    }


    // Description

    const description =
        document.getElementById("description");

    const descriptionError =
        document.getElementById("descriptionError");

    if (description.value.trim().length < 10) {

        descriptionError.textContent =
            "Please provide at least 10 characters.";

        descriptionError.style.color = "red";

        valid = false;

    } else {

        descriptionError.textContent = "";
    }


    // Stop form if validation fails

    if (!valid) {
        event.preventDefault();
    }

});