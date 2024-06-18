import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicDetailsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully!');
      console.log({ name, email, gender });
      navigate('/TopicSelectionPage');
    } else {
      setErrors(errors);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2em', marginTop: '2rem', color: '#007bff' }}>Flipr MCQ Questions</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '500px' }}
      >
        <label style={{ marginTop: '2rem', color: '#007bff' }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem',
              borderRadius: '5px',
              borderColor: '#007bff',  // Change border color
              color: '#007bff',         // Change text color
            }}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </label>

        <label style={{ marginTop: '2rem', color: '#007bff' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem',
              borderRadius: '5px',
              borderColor: '#007bff',  // Change border color
              color: '#007bff',         // Change text color
            }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>

        <label style={{ marginTop: '2rem', color: '#007bff' }}>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px', borderColor: '#007bff', color: '#007bff' }}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            marginTop: '2rem',
            padding: '0.5rem',
            borderRadius: '5px',
            backgroundColor: '#007bff',  // Change background color
            color: 'white',              // Change text color
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BasicDetailsPage;
