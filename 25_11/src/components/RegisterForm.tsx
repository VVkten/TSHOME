import axios from "axios";
import { SyntheticEvent, useState } from "react";

type SignupParams = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Signup() {
  const [signupParams, setSignupParams] = useState<SignupParams>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://dogs.kobernyk.com/signup", signupParams);

      if (response.status === 200) {
        alert("Registration successful!");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up</h2>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={signupParams.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={signupParams.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={signupParams.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={signupParams.firstName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={signupParams.lastName}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
