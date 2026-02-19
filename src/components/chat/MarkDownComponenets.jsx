// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// const markdownComponents = {
//   pre({ children }) {
//     return <div className="my-4">{children}</div>;
//   },

//   code({ inline, className, children }) {
//     const match = /language-(\w+)/.exec(className || "");

//     if (!inline) {
//       return (
//         <span className="block my-4">
//           <SyntaxHighlighter
//             style={vscDarkPlus}
//             language={match?.[1] ?? "text"}
//             PreTag="pre"
//           >
//             {String(children).replace(/\n$/, "")}
//           </SyntaxHighlighter>
//         </span>
//       );
//     }

//     return (
//       <code className="bg-gray-800 px-1 rounded">
//         {children}
//       </code>
//     );
//   },

//   p({ children }) {
//     return <p className="mb-2">{children}</p>;
//   }
// };
// export default markdownComponents
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const markdownComponents = {
  // ✅ For block code, wrap in <pre> not <span>/<div>
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");

    if (!inline && match) {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="pre"   // ✅ valid block wrapper
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    // ✅ Inline code stays inside <code>
    return (
      <code className="bg-gray-800 px-1 rounded" {...props}>
        {children}
      </code>
    );
  },

  // ✅ Paragraphs only wrap inline content
  p({ children }) {
    return <p className="mb-2">{children}</p>;
  },

  // ✅ Optional: handle <pre> explicitly if Markdown parser emits it
  pre({ children }) {
    return <pre className="my-4">{children}</pre>;
  }
};

export default markdownComponents;
