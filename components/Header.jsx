import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { theme } from "../recoil";



function Header() {

    const themeStore = useRecoilValue(theme);
    const setThemeStore= useSetRecoilState(theme);

    const changeTheme = () => {
        console.log("before: ", themeStore)
        if(themeStore === "light"){
            setThemeStore((oldValue) => "dark")
        }
        else
            setThemeStore((oldValue) => "light")
        console.log("after: ", themeStore)
        
    }

    return (
        <div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} shadow-lg px-[20px] sm:px-[50px] py-[20px] flex items-center justify-between sticky top-0`}>
            <p className="text-[20px] sm:text-[30px] font-[600]">Where in the world?!</p>
            <div className="flex items-center justify-center sm:gap-[15px] px-[10px] py-[2px] shadow-lg rounded-lg cursor-pointer transition-all duration-1000" onClick={changeTheme}>
                <WiMoonAltThirdQuarter size={30}/>
                <p className="text-[12px] sm:text-[18px]">{`${themeStore === "light"?"Dark":"Light"}`} Mode</p>
            </div>
        </div>
    )
}

export default Header
