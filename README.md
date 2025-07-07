# 🗳️ VoteChain – Blockchain Based Online Voting System

VoteChain is a secure and transparent **online voting platform** built using blockchain technology.  
It eliminates vote tampering, ensures voter anonymity, and offers real-time vote counting with integrity.

> 🔐 Built with HTML, CSS, JavaScript, Node.js, and Solidity (Ethereum Smart Contracts).

---

## 🚀 Features

- 🧑‍💼 **Admin Login** to add candidates and start/end elections
- 🧑‍💻 **Voter Registration** with verification
- 🗳️ **One-Vote Policy** enforced by smart contracts
- 🔐 **Immutable Voting** with blockchain ledger
- 📈 **Live Results** displayed in real-time
- 🧾 Transparent voting history for auditability

---

## ⚙️ Tech Stack

| Layer          | Technology Used          |
|----------------|---------------------------|
| Frontend       | HTML, CSS, Bootstrap, JS |
| Backend        | Node.js, Express.js       |
| Blockchain     | Solidity, Ethereum, Ganache, Web3.js |
| Smart Contract | Ethereum Smart Contract   |
| Dev Tools      | Truffle Suite, MetaMask   |
| Local Chain    | Ganache                   |

---

## 🧪 Prerequisites

- Node.js
- Ganache (local blockchain)
- MetaMask extension in browser
- Truffle (`npm install -g truffle`)

---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Rutvi2123/votechain.git
cd votechain

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Install dependencies

bash
npm install
Compile & migrate smart contracts

bash
truffle compile
truffle migrate
Run the development server

bash
npm start
Access the app in your browser

http://localhost:3000
Connect MetaMask to your Ganache local blockchain.


📚 Project Structure
csharp
Copy code
votechain/
│
├── contracts/         # Solidity Smart Contracts
├── src/               # Frontend files
├── migrations/        # Truffle migration scripts
├── routes/            # Express route handlers
├── public/            # Static assets
├── app.js             # Main Node.js server file
├── package.json
└── truffle-config.js  # Truffle configuration



📜 License
This project is open-source and free to use for educational and research purposes.


### ✅ Steps to Add README to GitHub

1. Open PowerShell inside your `votechain` project folder:
```bash
notepad README.md
Paste the content above, then Save and Close.

Run:

bash
Copy code
git add README.md
git commit -m "Add README for votechain project"
git push

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
