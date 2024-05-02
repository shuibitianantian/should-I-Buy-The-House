import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const houses = ["🏡", "🏠", "🛖", "⛺"];

function RandomMovingBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight, // Adjust height here if necessary
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight, // Adjust height here if necessary
      });
    };

    window.addEventListener("resize", handleResize);

    const id = setTimeout(() => {
      navigate("/should-i-buy-the-one");
    }, 8000);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      const draw = () => {
        if (context) {
          context.fillStyle = "black";
          context.font = "80px Roboto";

          if (Math.random() < 0.3) {
            context.fillText(
              houses[Math.floor(Math.random() * 4)],
              Math.random() * width,
              Math.random() * height
            );
          }

          requestRef.current = requestAnimationFrame(draw);
        }
      };

      draw();

      return () => {
        if (requestRef.current !== undefined) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(id);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}

export default RandomMovingBox;
