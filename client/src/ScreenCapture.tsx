
import { useState, useRef } from "react";
import axios from "axios";
import { Copy } from "lucide-react"; // Icons
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Theme
import { Highlight, themes } from "prism-react-renderer"

const ScreenCapture = () => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [review, setReview] = useState("")
    const [loading, setLoading] = useState(false)
    const screenStreamRef = useRef<MediaStream | null>(null);
  
    const requestScreenShare = async () => {
      try {
        if (!screenStreamRef.current) {
          // Request screen capture only if not already requested
          screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
            video: true,
          });
        }
      } catch (error) {
        console.error("Error requesting screen share:", error);
      }
    };
  
    const captureScreen = async () => {
      if (!screenStreamRef.current) {
        await requestScreenShare();
        if (!screenStreamRef.current) return;
      }
  
      const video = document.createElement("video");
      video.srcObject = screenStreamRef.current;
  
      video.onloadedmetadata = async () => {
        video.play();
  
        // Capture the current screen frame
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
  
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL("image/png");
          setScreenshot(image);
        }
      };
      
        if(!screenshot) return;
        setLoading(true);
        const blob = await fetch(screenshot).then(res => res.blob())
        const formData = new FormData()
        formData.append("image", blob, "screenshot.png");
        try {
            
        const res = await axios.post("http://localhost:8000/api/analyze", formData);
        setReview(res.data.description);
        } catch (error) {
            console.log("Error sending image:", error)
        }
        setLoading(false);
      

    };
  // Send screenshot to backend
 
    // const downloadScreenshot = () => {
    //   if (!screenshot) return;
    //   const link = document.createElement("a");
    //   link.href = screenshot;
    //   link.download = "screenshot.png";
    //   link.click();
    // };

    const copyToClipboard = () => {
        if (review) {
          navigator.clipboard.writeText(review);
          alert("Copied to clipboard!");
        }
      };
  
    return (
      <div className="flex flex-col  items-center pt-9 p-5 bg-[#242424] min-h-screen">
        {/* <h1 className="text-2xl font-bold mb-4">Persistent Screen Capture</h1> */}
        <h1 className="text-2xl text-white font-bold text-center mb-4">SQLPal</h1>
        {/* <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={requestScreenShare}
        >
          Start Screen Share (One-Time)
        </button> */}
  
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={captureScreen}
        >
         {loading ? "Analyzing..." : "Start Prompt"}
        </button>
  
        {/* {screenshot && (
          <div className="mt-5 flex flex-col items-center">
            <img src={screenshot} alt="Screenshot" className="border rounded-lg shadow-md max-w-full" />
            <button
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={downloadScreenshot}
            >
              Download Screenshot
            </button>
          </div>
        )} */}

{review && (
 <div className="mt-5 p-5 bg-white dark:bg-gray-800 shadow-md border rounded-lg max-w-lg w-full">
 <div className="flex justify-between items-center">
   <h2 className="text-lg font-bold text-gray-800 dark:text-white">AI Response:</h2>
   <button onClick={copyToClipboard} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
     <Copy size={20} />
   </button>
 </div>
 <Highlight language="markdown" theme={themes.dracula} code={review}>
   {({ tokens, getLineProps, getTokenProps }) => (
     <pre className="rounded-md mt-2 overflow-x-auto">
       {tokens.map((line, i) => (
         <div {...getLineProps({ line, key: i })}>
           {line.map((token, key) => (
             <span {...getTokenProps({ token, key })} />
           ))}
         </div>
       ))}
     </pre>
   )}
 </Highlight>
</div>
      )}
      </div>
    );
  
}

export default ScreenCapture