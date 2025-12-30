import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = memo(({ personalInfo, socialLinks, emailjsConfig, contactContent }) => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        emailjsConfig?.serviceId,
        emailjsConfig?.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: personalInfo?.name,
        },
        emailjsConfig?.publicKey
      );

      setFormStatus({
        type: 'success',
        message: contactContent?.messages?.success || 'Message sent successfully!',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus({
        type: 'error',
        message: contactContent?.messages?.error || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'bi-envelope-fill',
      title: 'Email',
      value: personalInfo?.email,
      link: `mailto:${personalInfo?.email}`,
    },
    {
      icon: 'bi-geo-alt-fill',
      title: 'Location',
      value: personalInfo?.location,
      link: null,
    },
  ];

  const socialLinksArray = socialLinks
    ? Object.entries(socialLinks)
        .filter(([key]) => key !== 'email')
        .map(([platform, url]) => ({
          icon: `bi-${platform}`,
          url,
          label: platform.charAt(0).toUpperCase() + platform.slice(1),
        }))
    : [];

  return (
    <section 
      id="contact" 
      ref={elementRef}
      className={`contact-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <h2 className="section-title" data-aos="fade-down">
          {contactContent?.title || 'Get In Touch'}
        </h2>
        <p className="section-subtitle" data-aos="fade-down" data-aos-delay="100">
          {contactContent?.subtitle || "Let's work together"}
        </p>

        <div className="row">
          <div className="col-lg-5" data-aos="fade-right" data-aos-delay="200">
            <div className="contact-info-container">
              <h3 className="contact-info-title">
                {contactContent?.leftSection?.title || 'Contact Me'}
              </h3>
              <p className="contact-info-text">
                {contactContent?.leftSection?.description || 'Feel free to reach out!'}
              </p>

              {/* Contact Info Cards */}
              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  info.value && (
                    <div key={index} className="contact-info-card">
                      <i className={`bi ${info.icon}`}></i>
                      <div className="contact-info-details">
                        <h4>{info.title}</h4>
                        {info.link ? (
                          <a href={info.link}>{info.value}</a>
                        ) : (
                          <p>{info.value}</p>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Social Links */}
              {socialLinksArray.length > 0 && (
                <div className="social-links-contact">
                  {socialLinksArray.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.label}
                    >
                      <i className={`bi ${social.icon}`}></i>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="300">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">
                      {contactContent?.form?.name?.label || 'Your Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={contactContent?.form?.name?.placeholder || 'John Doe'}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">
                      {contactContent?.form?.email?.label || 'Your Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={contactContent?.form?.email?.placeholder || 'john@example.com'}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  {contactContent?.form?.subject?.label || 'Subject'}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={contactContent?.form?.subject?.placeholder || 'Project Inquiry'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  {contactContent?.form?.message?.label || 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={contactContent?.form?.message?.placeholder || 'Tell me about your project...'}
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  <i className={`bi ${formStatus.type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                  {formStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                className="modern-btn btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {contactContent?.form?.sending || 'Sending...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>
                    {contactContent?.form?.submit || 'Send Message'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

Contact.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
  }),
  socialLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
    email: PropTypes.string,
  }),
  emailjsConfig: PropTypes.shape({
    serviceId: PropTypes.string,
    templateId: PropTypes.string,
    publicKey: PropTypes.string,
  }),
  contactContent: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    leftSection: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    form: PropTypes.shape({
      name: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      email: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      subject: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      message: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      submit: PropTypes.string,
      sending: PropTypes.string,
    }),
    messages: PropTypes.shape({
      success: PropTypes.string,
      error: PropTypes.string,
    }),
  }),
};

Contact.defaultProps = {
  personalInfo: {},
  socialLinks: {},
  emailjsConfig: {},
  contactContent: {
    title: 'Get In Touch',
    subtitle: "Let's work together",
    leftSection: {
      title: 'Contact Me',
      description: 'Feel free to reach out!',
    },
    form: {
      name: { label: 'Your Name', placeholder: 'John Doe' },
      email: { label: 'Your Email', placeholder: 'john@example.com' },
      subject: { label: 'Subject', placeholder: 'Project Inquiry' },
      message: { label: 'Message', placeholder: 'Tell me about your project...' },
      submit: 'Send Message',
      sending: 'Sending...',
    },
    messages: {
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
  },
};

export default Contact;
