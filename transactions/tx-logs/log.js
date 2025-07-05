const solanaWeb3 = require("@solana/web3.js");
const searchAddress = "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg"; //example 'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg'
const endpoint =
    "https://orbital-palpable-leaf.solana-devnet.quiknode.pro/f7c0b7b8d5673fb67176f3c5d4d39c7737d7e171";
const connection = new solanaWeb3.Connection(endpoint, "confirmed");
const getTransactionLogs = async (address, numTx) => {
    try {
        const transactionList = await connection.getSignaturesForAddress(
            new solanaWeb3.PublicKey(address),
            { limit: numTx }
        );
        let signatureList = transactionList.map(
            (transaction) => transaction.signature
        );
        let transactionDetails = await connection.getParsedTransactions(
            signatureList,
            { maxSupportedTransactionVersion: 0 }
        );
        transactionList.forEach((transaction, i) => {
            const date = new Date(transaction.blockTime * 1000);
            const transactionInstructions =
                transactionDetails[i].transaction.message.instructions;
            transactionInstructions.forEach((instruction, n) => {
                console.log(
                    `---Instructions ${
                        n + 1
                    }: ${instruction.programId.toString()}`
                );
            });
            console.log(`Transaction No ${i + 1}:`);
            console.log(`Signature: ${transaction.signature}`);
            console.log(`Date: ${date}`);
            console.log(`Status: ${transaction.confirmationStatus}`);
            console.log("-".repeat(20));
        });
    } catch (error) {
        console.error("Error fetching transaction logs:", error);
        return [];
    }
};
const main = async () => {
    await getTransactionLogs(searchAddress, 10);
};
main()
    .catch((error) => {
        console.error("Error in main function:", error);
    })
    .finally(() => {
        console.log("Execution completed.");
    });
