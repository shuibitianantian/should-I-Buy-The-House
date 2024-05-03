import { useState } from "react";
import { Badge, Button, Title } from "@mantine/core";
import BasicConfiguration from "./components/BasicConfiguration";
import AdvanceConfiguration from "./components/AdvanceConfiguration";
import { IconHomeBolt } from "@tabler/icons-react";
import ReturnDiff from "./components/ReturnDiff";

export default ({ onViewStory }: { onViewStory: () => void }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-[1200px] min-w-[1200px]">
      <Title order={4} className="flex items-center mb-6">
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          radius="sm"
          className="mr-2"
          leftSection={<IconHomeBolt className="mr-2" />}
        >
          Should I buy the one?
        </Badge>
        <Button
          variant="light"
          size="compact-xs"
          className="ml-2 text-[12px]"
          onClick={onViewStory}
        >
          View the story
        </Button>
      </Title>
      {step === 0 && <BasicConfiguration onNext={() => setStep(1)} />}
      {step === 1 && (
        <AdvanceConfiguration
          onPrev={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && <ReturnDiff onPrev={() => setStep(0)} />}
    </div>
  );
};
