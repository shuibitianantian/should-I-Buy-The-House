import { useEffect, useState } from "react";
import TheStory from "./TheStory";
import TheTool from "./TheTool";

export const showStoryKey = "showStoryKey";

export default () => {
  const [showStory, setShowStory] = useState<boolean>(
    localStorage.getItem(showStoryKey) !== "false"
  );

  useEffect(() => {
    if (showStory) {
      const id = setTimeout(() => {
        setShowStory(false);
      }, 20000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [showStory]);

  if (showStory) {
    return <TheStory onTimeout={() => setShowStory(false)} />;
  }

  return <TheTool onViewStory={() => setShowStory(true)} />;
};
