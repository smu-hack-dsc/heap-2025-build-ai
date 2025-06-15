// YOU DO NOT NEED TO TOUCH THIS FILE
import { Button, Tooltip } from "@radix-ui/themes"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"


const ThemeToggle = ({ appearance, setAppearance }) => {

    const toggleTheme = () => {
        setAppearance((prev) => (prev === "dark" ? "light" : "dark"))
    }

  return (
    <div className="fixed top-2 right-4 z-50 p-2 rounded-full">
        <Tooltip content="Toggle theme">
            <Button
            variant="solid"
            color="teal"
            onClick={toggleTheme}
            >
                {appearance === "light" ? <SunIcon /> : <MoonIcon />}
            </Button>
        </Tooltip>
    </div>    
  )
}

export default ThemeToggle