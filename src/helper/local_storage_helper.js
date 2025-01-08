const TokenStorageService = {
    /**
     * @param {string} token - The token to store
     */
    storeToken: (token) => {
      try {
        localStorage.setItem("authToken", token);
      } catch (error) {
        console.error("Error storing token:", error);
      }
    },
  
    /**
     * Retrieves the token from localStorage
     * @returns {string|null} - The stored token, or null if not available
     */
    getToken: () => {
      try {
        return localStorage.getItem("authToken");
      } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
      }
    },
  
    /**
     * Removes the token from localStorage (logout)
     */
    logout: () => {
      try {
        localStorage.removeItem("authToken");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  };
  
  export default TokenStorageService;
  