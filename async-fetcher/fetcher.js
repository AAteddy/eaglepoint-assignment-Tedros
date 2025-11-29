/**
 * A mock fetch function that randomly succeeds or fails for testing purposes.
 * @returns {Promise<string>} A promise that resolves with "mock data" or rejects with an error.
 */
const mockFetch = () => {
    return new Promise((resolve, reject) => {
        // simulate network delay
        setTimeout(() => {
            // Randomly succeed or fail (approximately  50% chance of failure)
            if (Math.random() > 0.5) {
                resolve("Mock data successfully fetched");
            } else {
                reject(new Error("Network error: Failed to fetch data"));
            }
        }, 100);
    });
};

/**
 * 
 */
async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;

    for(let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt + 1} of ${maxRetries + 1}...`);
            const data = await mockFetch(url);

            console.log("Success!");
            return data;
            
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt + 1} failed: ${error.message}`);

            if (attempt < maxRetries) {
                console.log("Waiting 1 second before rtry...");

                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } 
        }
    }

    console.error(`All ${maxRetries + 1} attempts failed.`);
    throw lastError
    
}

// Example usage and testing
(async () => {
    try {
        const result = await fetchWithRetry('https://api.example.com/data', 2); // 2 retries = 3 total attempts
        console.log("Final Result:", result);
    } catch (error) {
        console.error("Final Error:", error.message);
    }
})();