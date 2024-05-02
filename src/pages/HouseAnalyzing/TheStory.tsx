import { Blockquote, Button, Text, Tooltip } from "@mantine/core";
import {
  IconAlarm,
  IconBulb,
  IconHammer,
  IconSparkles,
  IconSquareRoundedArrowRight,
  IconSquareRoundedX,
  IconStar,
} from "@tabler/icons-react";
import { showStoryKey } from ".";

export default ({ onTimeout }: { onTimeout: () => void }) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="ml-2 border-dashed p-4 border border-slate-300 rounded-md overflow-auto max-h-[calc(100vh-36px)]">
        <Text fs="italic">The Little Story</Text>
        <Blockquote
          color="blue"
          iconSize={24}
          cite="– My dear wife"
          icon={<IconBulb />}
          className="mt-4 w-full"
        >
          Rental price is crazy in NY and NJ. Why not buying a home if we need
          to pay 4k+ for renting a 2b2b apartment?
        </Blockquote>
        <Blockquote
          color="green"
          iconSize={24}
          cite="– Me"
          icon={<IconHammer />}
          className="text-right mt-6 w-full"
        >
          Yeah, why not? Let's do it!
        </Blockquote>
        <Text ta="center" size="12px" className="my-2">
          ... after searching for a long time
        </Text>
        <Blockquote
          color="blue"
          iconSize={24}
          cite="– My dear wife"
          icon={<IconSparkles />}
          className="w-full"
        >
          Check this out, 700k is reasonable, right? Let's say downpay is 300k.
          We pay less than 4k monthly in 30 years.
        </Blockquote>
        <Blockquote
          color="red"
          iconSize={24}
          cite="– Me"
          icon={<IconAlarm />}
          className="text-right mt-6 w-full"
        >
          Hmmm..., sounds good! Let's check how much mortage we pay after 30
          years. WTF!!! 1M in total? We need to take it more seriously.
        </Blockquote>
        <Blockquote
          color="green"
          iconSize={24}
          cite="– Me"
          icon={<IconStar />}
          className="text-right mt-6 w-full"
        >
          Why can't we just write a program to calculate it? Is any better
          investment out there?
        </Blockquote>
      </div>
      {onTimeout && (
        <>
          <Tooltip label="I do not care you story, please hide it!">
            <Button
              color="red"
              onClick={() => {
                localStorage.setItem(showStoryKey, "false");
                onTimeout();
              }}
            >
              <IconSquareRoundedX size={18} />
            </Button>
          </Tooltip>
          <Button color="blue" onClick={onTimeout}>
            <IconSquareRoundedArrowRight size={18} className="mr-2" />
            Skip
          </Button>
        </>
      )}
    </div>
  );
};
