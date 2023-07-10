import React, { useState } from "react";
import '../styles/Form.css';
import fetch from 'cross-fetch'; // Import the fetch function

function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Event handlers
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            fName: firstName,
            lName: lastName,
            email: email,
            mobileNum: phoneNumber
        };

        try {
            const response = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            if (response.ok) {
                console.log('Message saved successfully');
                // Reset the form
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNumber("");
            } else {
                console.error('Error saving message');
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <p className="formHeader">Enter A New Record</p>
                <input
                    className="input"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="E-Mail"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Form;
