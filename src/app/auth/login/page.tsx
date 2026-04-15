"use client";

import React, { useState } from 'react';
import styles from '../Auth.module.scss';
import FrontendLinks from '@/lib/FrontendLinks';
import { useAuth } from '@/lib/api/auth/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSafeNextPath } from '@/lib/api/auth/redirect';
import LoginGate from './LoginGate';


const Login = () => {
  const { login, error, clearError, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      clearError();
      await login({ email, password });

      const next = getSafeNextPath(
        searchParams.get('next'),
        FrontendLinks.dashboard
      );

      router.replace(next);
    } catch {
      // AuthContext already stores typed API error for UI display.
    } finally {
      setIsLoading(false);
    }
  };

  const submitLoading = isLoading || authLoading;

  return (
        <>
          <LoginGate />
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email"
                aria-label="Email address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {error?.message && (
              <div className={styles.errorMessage} role="alert" aria-live="polite">
                {error.message}
              </div>
            )}

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.showButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className={styles.errorMessage} role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <a href={FrontendLinks.forgotPassword} className={styles.forgotLink}>
              FORGOT PASSWORD?
            </a>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitLoading}
              aria-busy={submitLoading}
            >
              {submitLoading ? (
                <span className={styles.spinner}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              ) : (
                'LOG IN'
              )}
            </button>
          </form>
        </>
  );
};

export default Login;