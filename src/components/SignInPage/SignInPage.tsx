// src/components/SignInPage/SignInPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState<'email' | 'verify' | 'username' | 'done'>(
    'email'
  );
  const [status, setStatus] = useState('');
  const { user, profile, refreshProfile, setProfile, loading, signOut } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      void refreshProfile();
    }
  }, [user, loading, refreshProfile]);

  useEffect(() => {
    if (user && profile) {
      setStep('done');
    } else if (user && !profile) {
      setStep('username');
    }
  }, [user, profile]);

  const handleEmailSignIn = async () => {
    if (!email) return;

    setStatus('Sending code...');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/sign-in`,
      },
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus('Code sent. Check your email.');
    setStep('verify');
  };

  const handleCodeVerification = async () => {
    if (!email || !otp) return;

    setStatus('Verifying code...');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    await refreshProfile();
  };

  const handleUsernameSave = async () => {
    if (!user || !username.trim()) return;

    setStatus('Saving username...');
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        { id: user.id, username: username.trim(), email: user.email },
        { onConflict: 'id' }
      )
      .select('id, username, email')
      .single();

    if (error) {
      setStatus(error.message);
      return;
    }

    setProfile(data);
    setStatus('Username saved.');
    setStep('done');
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      {step === 'email' && (
        <div className="signin-card">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSignIn}>Send Sign-In Code</button>
        </div>
      )}
      {step === 'verify' && (
        <div className="signin-card">
          <p className="signin-note">Enter the code from your email.</p>
          <input
            type="text"
            placeholder="Enter the code sent to your email"
            value={otp}
            inputMode="numeric"
            maxLength={8}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleCodeVerification}>Verify Code</button>
        </div>
      )}
      {step === 'username' && (
        <div className="signin-card">
          <p className="signin-note">Pick a username for your comments.</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUsernameSave}>Save Username</button>
        </div>
      )}
      {step === 'done' && (
        <div className="signin-card">
          <p className="signin-note">
            Signed in as {profile?.username || user?.email}.
          </p>
          <div className="signin-actions">
            <button onClick={() => navigate('/')}>Go to Home</button>
            <button className="secondary" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      )}
      {status && <p className="signin-status">{status}</p>}
    </div>
  );
};

export default SignInPage;
