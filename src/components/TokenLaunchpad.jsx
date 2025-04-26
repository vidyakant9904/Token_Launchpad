import {
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
  } from "@solana/spl-token";
  import {
    Keypair,
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
  } from "@solana/web3.js"

export function TokenLaunchpad (){
    async function createToken() {
        const connection = new Connection("https://api.devnet.solana.com");
        const payer = Keypair.generate(); 
        const mintKeypair = Keypair.generate(); 
        const mintAuthority = payer.publicKey;
        const freezeAuthority = payer.publicKey;
        const decimals = 9;
    
    
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
    
        const transaction = new Transaction().add(
          
          SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMint2Instruction(
            mintKeypair.publicKey,
            decimals,
            mintAuthority,
            freezeAuthority,
            TOKEN_PROGRAM_ID
          )
        );
    
        
        await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair]);
        console.log("Token Mint Created:", mintKeypair.publicKey.toBase58());
      }
    

      createToken().catch(console.error);
    


    return <div style={{ 
        height:'100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>

    <h1>Solana token Launchpad</h1>
     <input className='inputText' type='text' palceholder='Name'></input>
     <input className='inputText' type='text' placeholder='Symbol'></input>
     <input className='inputText' type='text' placeholder='Image URL'></input>
     <input className='inputText' type='text' placeholder='Initial supply'></input>
     <button style={{margin:'20px',  background: "linear-gradient(to right, #87CEEB, #00BFFF)"}}>creat token</button>
    </div>
}