# Chat with documents using LLM

This is a Bellingcat hackathon submission

## Team Members
Radu Ciocan - code / 
Ana State - design

## Tool Description
A chat interface that allows users to upload PDF/DOCX documents and and chat with them using ChatGPT as the large language model.

## Installation

1. Make sure you ave installed Node v18 or later
2. Download the tool's repository using the command:
```bash
git clone git@github.com:ciocan/bellingcat-hackhathon.git
```
3. Move to the tool's directory and install the tool
```bash
cd bellingcat-hackhathon
npm install
```
4. Copy the .env.example into .env file and add the following variables:

```bash
WEAVIATE_HOST= # do not use https:// just the domain like bellingcat-xxx.weaviate.network
WEAVIATE_API_KEY=

# cloudflare r2
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_SECRET_KEY=
CLOUDFLARE_SECRET_ACCESS_KEY=

# open ai key
OPENAI_API_KEY=
```

Weaviate is an open source vector database where the documents are vectorized and indexed. You can install it locally or use their free cloud at https://console.weaviate.cloud/

Cloudflare R2 is a object storage solution compatible with AWS S3. They have a free tier of 10gb. You can sign up at https://www.cloudflare.com/products/r2/

OpenAI is a large language model that can be used to generate text. You can sign up at https://platform.openai.com/

1. Start the tool
```bash
npm run dev
```

# Tech Stack

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Additional libraries:

- [Mantine UI](https://mantine.dev)
- [LangChain](https://js.langchain.com/docs/)
