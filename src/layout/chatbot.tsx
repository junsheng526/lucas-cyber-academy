import React, { useEffect } from "react";

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Load the Dialogflow Messenger script
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="learning-system"
      agent-id="2718cfc7-d28c-4e4f-bfe2-e07e679adb7d"
      language-code="en"
    ></df-messenger>
  );
};

export default Chatbot;
