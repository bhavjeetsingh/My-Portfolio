import "./globals.css";

export const metadata = {
  title: "Bhavjeet Singh — AI Product Engineer",
  description: "AI Product Engineer building production-ready Agentic Systems, LLM Applications, RAG Pipelines, and ML Solutions. BS Data Science at IIT Madras.",
  keywords: ["Bhavjeet Singh", "AI Product Engineer", "Agentic AI", "LLM", "RAG", "IIT Madras", "Machine Learning", "GenAI"],
  authors: [{ name: "Bhavjeet Singh" }],
  creator: "Bhavjeet Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
