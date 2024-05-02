import React, { useState, useEffect, useMemo } from "react";
import "./CountdownModal.css"; // Importing the CSS for styles

function CountdownModal({ initialCount = 7 }: any) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const timer = setInterval(() => setCount((prev: number) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const content = useMemo(() => {
    if (count > 5) return "Welcome!";

    if (count > 2 && count <= 5)
      return "You will be navigated to a random app shortly!";

    if (count === 1) return "Are you ready?";

    return "Let's go!";
  }, [count]);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 key={content} className="countdown-animation">
          {content}
        </h2>
      </div>
    </div>
  );
}

export default CountdownModal;
