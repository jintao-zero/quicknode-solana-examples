import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import { Drop, dropList } from "./dropList";
import secret from "./guideSecret.json";

const FROM_KEY_PAIR = Keypair.fromSecretKey(Uint8Array.from(secret));
const NUM_DROPS_PER_TX = 10; // Number of drops to process
const TX_INTERVAL = 1000; // Interval between transactions in milliseconds

function generateTransactions(
    batchSize: number,
    dropList: Drop[],
    fromWallet: PublicKey
): Transaction[] {
    const transactions: Transaction[] = [];
    for (let i = 0; i < dropList.length; i += batchSize) {
        const batch = dropList.slice(i, i + batchSize);
        const transaction = new Transaction();
        for (const drop of batch) {
            const instruction = SystemProgram.transfer({
                fromPubkey: FROM_KEY_PAIR.publicKey,
                toPubkey: new PublicKey(drop.walletAddress),
                lamports: drop.numLamports,
            });
            transaction.add(instruction);
        }
        transactions.push(transaction);
    }
    return transactions;
}
