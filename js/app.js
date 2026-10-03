function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!]/.test(value) &&
        !/\s/.test(value);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    function setError(field, errorElement, message) {
        errorElement.textContent = message;

        if (message) {
            field.setAttribute("aria-invalid", "true");
        } else {
            field.setAttribute("aria-invalid", "false");
        }
    }

    function validateFullName() {
        const value = fullName.value.trim();

        if (!value) {
            setError(fullName, fullNameError, "Full name is required.");
            return false;
        }

        if (value.length < 2) {
            setError(fullName, fullNameError, "Full name must be at least two characters.");
            return false;
        }

        setError(fullName, fullNameError, "");
        return true;
    }

    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (!value) {
            setError(
                studentNumber,
                studentNumberError,
                "Student number is required."
            );
            return false;
        }

        if (!isValidStudentNumber(value)) {
            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );
            return false;
        }

        setError(studentNumber, studentNumberError, "");
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            setError(email, emailError, "Email address is required.");
            return false;
        }

        if (!emailPattern.test(value)) {
            setError(
                email,
                emailError,
                "Enter a valid email address."
            );
            return false;
        }

        setError(email, emailError, "");
        return true;
    }

    function validateMobileNumber() {
        const value = mobileNumber.value.trim();
        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!value) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Mobile number is required."
            );
            return false;
        }

        if (!mobilePattern.test(value)) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Enter 09 followed by 9 digits or +639 followed by 9 digits."
            );
            return false;
        }

        setError(mobileNumber, mobileNumberError, "");
        return true;
    }

    function validatePassword() {
        const value = password.value;

        if (!value) {
            setError(password, passwordError, "Password is required.");
            return false;
        }

        if (!isValidPassword(value)) {
            setError(
                password,
                passwordError,
                "Password must be at least 8 characters, include one uppercase letter, one digit, and one of @, $, or !, with no spaces."
            );
            return false;
        }

        setError(password, passwordError, "");
        return true;
    }

    function updatePasswordFeedback() {
        const value = password.value;

        if (!value) {
            passwordFeedback.textContent = "";
            return;
        }

        if (isValidPassword(value)) {
            passwordFeedback.textContent = "Password meets all requirements.";
        } else {
            passwordFeedback.textContent =
                "Password needs 8+ characters, an uppercase letter, a digit, and @, $, or !, with no spaces.";
        }
    }

    function validateConfirmPassword() {
        if (!confirmPassword.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );
            return false;
        }

        if (confirmPassword.value !== password.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );
            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");
        return true;
    }

    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );
            return false;
        }

        setError(course, courseError, "");
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            setError(
                terms,
                termsError,
                "You must agree to the terms and conditions."
            );
            return false;
        }

        setError(terms, termsError, "");
        return true;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const validFullName = validateFullName();
        const validStudentNumber = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobile = validateMobileNumber();
        const validPassword = validatePassword();
        const validConfirmPassword = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        updatePasswordFeedback();

        if (
            !validFullName ||
            !validStudentNumber ||
            !validEmail ||
            !validMobile ||
            !validPassword ||
            !validConfirmPassword ||
            !validCourse ||
            !validTerms
        ) {
            successMessage.textContent = "";
            registrationSummary.hidden = true;
            return;
        }

        successMessage.textContent =
            "Registration details validated successfully!";

        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        registrationSummary.hidden = false;
    });

    password.addEventListener("input", function() {
        updatePasswordFeedback();
        validatePassword();

        if (confirmPassword.value) {
            validateConfirmPassword();
        }
    });

    fullName.addEventListener("blur", function() {
        validateFullName();
    });

    course.addEventListener("change", function() {
        validateCourse();
    });

    terms.addEventListener("change", function() {
        validateTerms();
    });

    form.addEventListener("reset", function() {
        setTimeout(function() {
            fullNameError.textContent = "";
            studentNumberError.textContent = "";
            emailError.textContent = "";
            mobileNumberError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            courseError.textContent = "";
            termsError.textContent = "";

            passwordFeedback.textContent = "";
            successMessage.textContent = "";

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";

            registrationSummary.hidden = true;

            [
                fullName,
                studentNumber,
                email,
                mobileNumber,
                password,
                confirmPassword,
                course,
                terms
            ].forEach(function(field) {
                field.setAttribute("aria-invalid", "false");
            });
        }, 0);
    });

    registrationSummary.hidden = true;
}
