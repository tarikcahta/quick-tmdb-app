// src/components/SignInPage/SignInPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../styles/SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleGmailSignIn = () => {
    // Implement Gmail OAuth sign-in logic
  };

  const handleOutlookSignIn = () => {
    // Implement Outlook OAuth sign-in logic
  };

  const handleEmailSignIn = () => {
    // Implement logic to send sign-in code to email
    setCodeSent(true);
  };

  const handleCodeVerification = () => {
    // Implement logic to verify the sign-in code
    navigate('/');
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      <button onClick={handleGmailSignIn}>Sign in with Gmail</button>
      <button onClick={handleOutlookSignIn}>Sign in with Outlook</button>
      {!codeSent ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSignIn}>Send Sign-In Code</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Enter the code sent to your email" />
          <button onClick={handleCodeVerification}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
