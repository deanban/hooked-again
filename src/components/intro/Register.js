import React, { useState, useEffect } from 'react';

const initForm = {
  username: '',
  email: '',
  password: ''
};

export default function Register() {
  const [form, setForm] = useState(initForm);
  const [user, setUser] = useState(null);

  const handleChange = event => {
    // ⬇️ also need to add on the rest of the form data
    // to setForm to update properly
    //usestate behavior is different this way for setState
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initForm);
  };

  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      <h2>Login</h2>
      {/* form>input*2+button:submit */}
      <form
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>
      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
