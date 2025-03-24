import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      <p className="text-sm">
        Made by <span className="font-semibold">Harshit Shetty</span> ·{" "}
        <a
          href="https://github.com/shettyharshit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GitHub
        </a>{" "}
        ·{" "}
        <a
          href="https://www.linkedin.com/in/harshit-shetty-4846b8127/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          LinkedIn
        </a>{" "}
        ·{" "}
        <a
          href="mailto:shettyharshit5@gmail.com"
          className="text-blue-400 hover:underline"
        >
          Email
        </a>
      </p>
    </footer>
  );
}

export default Footer;
