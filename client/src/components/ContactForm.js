import React, { useState } from 'react'

import axios from 'axios'

export default function ContactForm() {

    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        message: ''
    })

    // handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:8080/api/emails/send-email',
                formData
            )
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="email"
                        name="to"
                        id="to"
                        value={formData.to}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange} />
                    <br />


                    <label htmlFor="message">Message:</label>
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        ows="10"
                        value={formData.message}
                        onChange={handleChange}>
                    </textarea>

                    <br />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}
