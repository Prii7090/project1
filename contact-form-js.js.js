document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });

    function validateForm() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (firstName.length < 5) {
            alert('First name should be at least 5 characters.');
            return false;
        }

        if (lastName.length < 5) {
            alert('Last name should be at least 5 characters.');
            return false;
        }

        if (!email.includes('@') || !email.split('@')[1].includes('.')) {
            alert('Email should contain a valid domain name (with "@" and ".").');
            return false;
        }

        if (!date) {
            alert('Please select a date.');
            return false;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert('Phone must contain exactly 10 digits.');
            return false;
        }

        if (message.length < 50 || !/^[a-zA-Z\s]{50,}$/.test(message)) {
            alert('Message must be at least 10 alphabetic characters.');
            return false;
        }

        return true;
    }
});
