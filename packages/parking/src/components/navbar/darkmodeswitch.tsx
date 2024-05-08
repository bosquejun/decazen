import { Button, Switch } from "@nextui-org/react";
import { Moon, Sun1 } from "iconsax-react";
import { useTheme as useNextTheme } from "next-themes";


export const DarkModeSwitch = ({ iconMode }: { iconMode?: boolean }) => {
  const { setTheme, resolvedTheme } = useNextTheme();



  if (iconMode) {
    return <Button className="btn-icon" isIconOnly variant="light" onClick={() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }}>
      {
        resolvedTheme === "dark" ? <Sun1 size="24" color="text-foreground" /> : <Moon size="24" color="text-foreground" />
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
