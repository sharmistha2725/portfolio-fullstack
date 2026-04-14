// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
// import './contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//     return () => setIsVisible(false);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would normally send the form data to your backend or a service
//     console.log('Form submitted:', formData);
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitted(true);
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//       });
//       setTimeout(() => setIsSubmitted(false), 3000);
//     }, 500);
//   };

//   return (
//     <div className={`contact-container ${isVisible ? 'fade-in' : ''}`}>
//       <h1 className="section-title">Get In Touch</h1>
//       <div className="contact-content">
//         <div className="contact-info">
//           <h2>Contact Information</h2>
//           <div className="info-item">
//             <FaEnvelope className="info-icon" />
//             <p>sharmisthasivakumar@gmail.com</p>
//           </div>
//           <div className="info-item">
//             <FaPhone className="info-icon" />
//             <p>+91 9498098457</p>
//           </div>
//           <div className="info-item">
//             <FaMapMarkerAlt className="info-icon" />
//             <p>Chennai, India</p>
//           </div>
//           <div className="social-links">
//             <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
//               <FaLinkedin className="social-icon" />
//             </a>
//             <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
//               <FaGithub className="social-icon" />
//             </a>
//           </div>
//         </div>
        
//         <div className="contact-form-container">
//           {isSubmitted ? (
//             <div className="success-message">
//               <h3>Thank you for reaching out!</h3>
//               <p>I'll get back to you as soon as possible.</p>
//             </div>
//           ) : (
//             <form className="contact-form" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows="5"
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="submit-btn">Send Message</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;







import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ NEW

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // ✅ UPDATED FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://portfolio-backend-kt0w.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setIsSubmitted(false), 3000);

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className={`contact-container ${isVisible ? 'fade-in' : ''}`}>
      <h1 className="section-title">Get In Touch</h1>
      <div className="contact-content">

        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>sharmisthasivakumar@gmail.com</p>
          </div>
          <div className="info-item">
            <FaPhone className="info-icon" />
            <p>+91 9498098457</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Chennai, India</p>
          </div>
          <div className="social-links">
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
          </div>
        </div>
        <div className="contact-form-container">
          {isSubmitted ? (
            <div className="success-message">
              <h3>Thank you for reaching out!</h3>
              <p>I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
