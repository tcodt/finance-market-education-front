import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6935e3a86e75c985389f20f6", 
  requiresAuth: true // Ensure authentication is required for all operations
});
