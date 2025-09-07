import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    setLoading(true);

    e.preventDefault();
    if (!url) return;

    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.shortId) {
        setShortUrl(`${import.meta.env.VITE_BACKEND_URL}/${data.shortId}`);
      }
    } catch (error) {
      console.error("Error generating short URL:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-between">

      <nav className="w-full  bg-slate-950 p-2 text-center  ">
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
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          Generating Short URL...
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 text-lg break-words
 bg-white w-[80%] md:w-[50%] text-left p-4 rounded shadow">
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
