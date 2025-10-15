import axios from "axios";

export const resolvers = {
    Query: {
        getAPIcatfact: async () => {
        const baseURL = process.env.CATFACT_BASE_URL;
        const csrfToken = process.env.CATFACT_CSRF_TOKEN;

        if (!baseURL || !csrfToken) {
            throw new Error("Missing CATFACT_BASE_URL or CATFACT_CSRF_TOKEN in .env");
        }

        try {
            const { data } = await axios.get(baseURL, {
            headers: {
                accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            });

            return {
            fact: data.fact,
            length: data.length,
            };
        } catch (error) {
            throw new Error(
            `Error fetching cat fact: ${error.response?.data || error.message}`
            );
        }
        },
        getUserDetails: () => {
            const email = process.env.USER_EMAIL;
            const name = process.env.USER_NAME;
            const stack = process.env.USER_STACK;

            if (!email || !name || !stack) {
                throw new Error("Missing ADMIN details in .env file");
            }

            return { email, name, stack };
        },
        getRandomnfact: async () => {
            console.log("[getRandomnfact] Start");

            // 1) Load user details from env
            console.log("[getRandomnfact] Loading user env");
            const email = process.env.USER_EMAIL;
            const name = process.env.USER_NAME;
            const stack = process.env.USER_STACK;

            if (!email || !name || !stack) {
            console.error("[getRandomnfact] Missing USER env values");
            // Even if user env is missing, we can throw (so caller knows config issue)
            throw new Error("Missing USER details in the database");
            }

            // 2) Prepare API request details
            const baseURL = process.env.CATFACT_BASE_URL;
            const csrfToken = process.env.CATFACT_CSRF_TOKEN;

            if (!baseURL || !csrfToken) {
            console.error("[getRandomnfact] Missing CATFACT env values");
            throw new Error("Missing CATFACT_BASE_URL or CATFACT_CSRF_TOKEN in the database");
            }

            const timestamp = new Date().toISOString();
            console.log("[getRandomnfact] Timestamp:", timestamp);
            console.log("[getRandomnfact] Calling CatFacts API...");

            try {
            // 3) Fetch fact
            const { data } = await axios.get(baseURL, {
                headers: {
                accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                timeout: 10_000,
            });

            console.log("[getRandomnfact] API response received");
            const fact = typeof data?.fact === "string" ? data.fact : "";

            // 4) Build success payload
            const response = {
                status: "success",
                user: { email, name, stack },
                timestamp,
                fact,
            };

            console.log("[getRandomnfact] Success payload ready");
            return response;
            } catch (error) {
            // 5) Graceful fallback on failure
            const fallbackMessage = "Sorry, Error fetching randomn cat facts";
            console.error("[getRandomnfact] API error:", error?.message || error);

            const response = {
                status: "error",
                user: { email, name, stack },
                timestamp,
                fact: fallbackMessage,
            };

            console.log("[getRandomnfact] Returning fallback payload");
            return response;
            }
        },
    },
};
