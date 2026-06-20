import "./globals.css";

export const metadata = {
  title: "Bhavjeet Singh — AI/ML Backend Engineer",
  description: "AI/ML Backend Engineer building production-ready Agentic Systems, LLM Applications, RAG Pipelines, and ML Solutions. BS Data Science at IIT Madras.",
  keywords: ["Bhavjeet Singh", "AI/ML Backend Engineer", "AI Product Engineer", "Agentic AI", "LLM", "RAG", "IIT Madras", "Machine Learning", "GenAI"],
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
