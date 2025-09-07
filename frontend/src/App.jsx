import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await fetch("http://localhost:8000/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.shortId) {
        setShortUrl(`http://localhost:8000/${data.shortId}`);
      }
    } catch (error) {
      console.error("Error generating short URL:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-between">

      <nav className="w-full  bg-slate-950 p-2 text-center md:text-left ">
        <h1 className="text-2xl md:pl-6 text-white font-bold">ShortcutURL</h1>
      </nav>

      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center w-full md:w-[80%] gap-3"
      >
        <input
          type="text"
          placeholder="Enter URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-[90%] md:w-[70%] p-3 rounded-md bg-slate-100 text-slate-900 m-2"
        />
        <button
          type="submit"
          className="bg-blue-800 w-[90%] md:w-[25%] text-gray-100 p-3 rounded-md active:scale-95 transition"
        >
          Get short URL
        </button>
      </form>

      
      {shortUrl && (
        <div className="mt-6 text-lg bg-white w-[80%] md:w-[50%] text-left p-4 rounded shadow">
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}

      
      <footer className="w-full bg-slate-950 p-2  mt-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ShortcutURL | Developed by nikhil chouksey
      </footer>
    </div>
  );
}

export default App;
