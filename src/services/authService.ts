// Authentication Service for Google and Apple Sign-In
// This implementation uses mock authentication for demonstration
// In production, replace with actual OAuth implementation

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'apple' | 'guest';
}

class AuthService {
  // Google OAuth Configuration
  private readonly GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  private readonly GOOGLE_REDIRECT_URI = window.location.origin;

  // Apple OAuth Configuration
  private readonly APPLE_CLIENT_ID = 'YOUR_APPLE_CLIENT_ID';
  private readonly APPLE_REDIRECT_URI = window.location.origin;

  /**
   * Initialize Google Sign-In
   * In production, you would load the Google Sign-In library
   */
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      // Show loading state
      console.log('Initiating Google Sign-In...');

      // MOCK IMPLEMENTATION - Replace with actual Google OAuth
      // Real implementation would use: gapi.auth2.getAuthInstance().signIn()
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful authentication
      const mockUser: AuthUser = {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Demo User',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        provider: 'google'
      };

      // Store user data
      localStorage.setItem('authUser', JSON.stringify(mockUser));
      
      return mockUser;

      /* 
      PRODUCTION IMPLEMENTATION:
      
      // Load Google Sign-In library
      await this.loadGoogleScript();
      
      // Initialize Google Auth
      const auth2 = await gapi.auth2.init({
        client_id: this.GOOGLE_CLIENT_ID,
        scope: 'profile email'
      });

      // Sign in
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      
      const user: AuthUser = {
        id: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        picture: profile.getImageUrl(),
        provider: 'google'
      };

      // Send to your backend for verification
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: googleUser.getAuthResponse().id_token })
      });

      return user;
      */
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw new Error('Failed to sign in with Google');
    }
  }

  /**
   * Initialize Apple Sign-In
   * In production, you would use AppleID.auth.signIn()
   */
  async signInWithApple(): Promise<AuthUser> {
    try {
      // Show loading state
      console.log('Initiating Apple Sign-In...');

      // MOCK IMPLEMENTATION - Replace with actual Apple OAuth
      // Real implementation would use: AppleID.auth.signIn()
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful authentication
      const mockUser: AuthUser = {
        id: 'apple_' + Math.random().toString(36).substr(2, 9),
        email: 'user@icloud.com',
        name: 'Demo User',
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        provider: 'apple'
      };

      // Store user data
      localStorage.setItem('authUser', JSON.stringify(mockUser));
      
      return mockUser;

      /* 
      PRODUCTION IMPLEMENTATION:
      
      // Load Apple Sign-In library
      await this.loadAppleScript();

      // Initialize Apple Auth
      await AppleID.auth.init({
        clientId: this.APPLE_CLIENT_ID,
        scope: 'name email',
        redirectURI: this.APPLE_REDIRECT_URI,
        usePopup: true
      });

      // Sign in
      const response = await AppleID.auth.signIn();
      
      const user: AuthUser = {
        id: response.user,
        email: response.authorization.id_token.email,
        name: `${response.user.name.firstName} ${response.user.name.lastName}`,
        provider: 'apple'
      };

      // Send to your backend for verification
      const backendResponse = await fetch('/api/auth/apple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idToken: response.authorization.id_token,
          code: response.authorization.code
        })
      });

      return user;
      */
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      throw new Error('Failed to sign in with Apple');
    }
  }

  /**
   * Guest sign-in (no authentication required)
   */
  async signInAsGuest(): Promise<AuthUser> {
    try {
      console.log('Continuing as guest...');
      
      // Simulate slight delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const guestUser: AuthUser = {
        id: 'guest_' + Math.random().toString(36).substr(2, 9),
        email: 'guest@nakshatra.ai',
        name: 'Guest User',
        provider: 'guest'
      };

      // Store user data
      localStorage.setItem('authUser', JSON.stringify(guestUser));
      
      return guestUser;
    } catch (error) {
      console.error('Guest Sign-In Error:', error);
      throw new Error('Failed to continue as guest');
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('authUser');
      
      // If using Google, sign out from Google
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          await auth2.signOut();
        }
      }

      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw new Error('Failed to sign out');
    }
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): AuthUser | null {
    try {
      const userJson = localStorage.getItem('authUser');
      if (!userJson) return null;
      
      return JSON.parse(userJson) as AuthUser;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Helper methods for loading OAuth scripts (for production)
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google SDK'));
      document.body.appendChild(script);
    });
  }

  private loadAppleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.AppleID) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Apple SDK'));
      document.body.appendChild(script);
    });
  }
}

// Type declarations for external libraries
declare global {
  interface Window {
    gapi: any;
    AppleID: any;
  }
}

// Export singleton instance
export const authService = new AuthService();
