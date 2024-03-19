### BloodChainX is a blockchain-powered solution for blood donation and distribution management. It ensures donor data integrity and prevents fraud, effectively manages surplus blood supply, and promotes transparency in the process.


### Technologies Used :
<p>
    <img height='100px' width='100px' src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png">
    <img height='100px' width='100px' src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png">
    <img height='100px' width='100px' src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png">
     <img height='100px' width='100px' src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">
    <img height='100px' width='100px' src='https://global-uploads.webflow.com/617702c73410810254ccd237/622e683142e21d2ae89db970_Thirdweb%20Logo.jpeg'>
    <img height='100px' width='100px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCUug2VtoMAXz6S914SASnH5azq3Q3eEUE270TcY&s'> 
    <img height='100px' width='100px' src='https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png'> 
</p>



### What are we solving :

India faces a critical shortage of quality blood, with a deficit of 4 million units per year, particularly in rural and remote areas. The current blood management system is plagued by inefficiencies, lack of transparency, and wastage of blood due to poor storage and management practices. Additionally, the presence of fraudulent organizations exacerbates the challenges faced by those in need of blood transfusions. There is an urgent need for a reliable and efficient blood management system to improve the overall availability and quality of blood, increase transparency and accountability, and address the concerns of blood donors.

To address these problems we have built BloodChainX.

## How Our System Works :

- Information regarding donated blood is recorded on the blockchain as a new block of data. This block contains details such as blood group, blood ID, Aadhaar number, age, etc., and is added to the blood store.
- The donated blood is then taken to an inspection center for testing and classification as either "Tested and Safe" or "Tested and Unsafe."
- If the blood is "safe", then a QR code will be generated with a combination of Aadhaar numbers and blood id hash. This QR code will be automatically downloaded and can be used for the verfication at the hospital end.
- The blood, which is marked as ''Tested and Safe'' can now transfer it to the hospitals.
- On the hospital side, if blood is needed, they must specify the required blood group to maintain accountability.
- After searching the optimal blood bank(nearest and availability), the Blood will be transferred from that blood bank to the current Hospital.
- Then the Hospital can see details of the Blood that will be transfered. The hospital can access the location of the blood bank on google maps, and upon receipt of the blood, they can verify its authenticity by uploading the QR code on the app.
- Healthcare facilities such as hospitals and blood banks have the option for logging in or registering as new users. To ensure security, any transactions involving the transfer or creation of assets must be verified and confirmed through a MetaMask wallet.
- Donors will get RBC token for donating their blood that they can utilise for medical benefits

## Conclusion :

- The blockchain-based solution offers increased transparency through traceability.
- The use of QR code authentication and secure transactions guarantees the authenticity of blood reaching patients.
- The issue of unavailability of blood is addressed by instantly providing information about the nearest blood bank with the necessary blood type to the hospital.
- The traditional system's lack of transparency is addressed through decentralization.

## Installation Steps:

1. Clone The repository.
2. Open the Blood Chain folder. 
3. npm install --force in the terminal in the root directory.
4. Open terminal for contract folder and run install --force for it 
5. Add matic testnet in metamask and get some tokens from polygon faucet
6. Npm start - to open in localhost port 3000.
