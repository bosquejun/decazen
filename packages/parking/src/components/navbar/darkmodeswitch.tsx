import { Button, Switch } from "@nextui-org/react";
import { Moon, Sun1 } from "iconsax-react";
import { useTheme as useNextTheme } from "next-themes";
import { Icon } from "../icons/Icon";


export const DarkModeSwitch = ({ iconMode }: { iconMode?: boolean }) => {
  const { setTheme, resolvedTheme } = useNextTheme();



  if (iconMode) {
    return <Button isIconOnly variant="light" onClick={() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }}>
      {
        resolvedTheme === "dark" ? <Icon as={Sun1} size="24" className="text-foreground stroke-foreground" /> : <Moon size="24" className="text-foreground  stroke-foreground" />
      }
    </Button>
  }

  return (
    <Switch
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
    />
  );
};
