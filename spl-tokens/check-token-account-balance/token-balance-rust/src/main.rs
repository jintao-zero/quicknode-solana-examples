use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;
const TOKEN_ADDRESS: &str = "Token address";
fn main() {
    let associated_token_account = Pubkey::from_str(TOKEN_ADDRESS).unwrap();
    let connection = RpcClient::new("https://api.mainnet-beta.solana.com".to_string());
    let account_data = connection
        .get_token_account_balance(&associated_token_address)
        .unwrap();
    println!(
        "Token Balance (using Rust): {}",
        account_data.ui_amount_string
    );
}
