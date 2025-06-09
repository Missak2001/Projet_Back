const { Client } = require("pg");

const config = {
    connectionString: process.env.DATABASE_URL,
};

const waitForPostgres = async () => {
    let connected = false;
    let retries = 0;
    const maxRetries = 20;

    while (!connected && retries < maxRetries) {
        try {
            const client = new Client(config);
            await client.connect();
            await client.end();
            connected = true;
            console.log("✅ PostgreSQL est prêt !");
        } catch (err) {
            console.log("⏳ En attente de PostgreSQL...");
            await new Promise((res) => setTimeout(res, 3000));
            retries++;
        }
    }

    if (!connected) {
        console.error("❌ PostgreSQL n’a pas démarré à temps");
        process.exit(1);
    }

    // Démarre le vrai serveur après connexion
    require("./main.js");
};

waitForPostgres();
