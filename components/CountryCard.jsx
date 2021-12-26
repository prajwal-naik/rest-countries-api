import getConfig from "next/config"

import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { theme } from "../recoil";

function CountryCard({ country }) {
    const themeStore = useRecoilValue(theme);


    const router = useRouter();
    // console.log("country: ", country)

    // const commonName = country.name

    const commonName = country.alpha3Code.toLowerCase()

    // console.log(sign3)

    const enterCountry = () => {
        router.push(`/country/${commonName}`);
    }

    // console.log("common name: ", commonName)

    return (
        <div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} h-max pb-[10px] sm:h-auto col-span-1 row-span-1 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer`}
            onClick={enterCountry}
        >
            {/* <Image src = {country.flags.svg}  /> */}
            <div className="h-[50%]">
                <img src = {country.flags.svg} className="h-full w-full object-cover rounded-lg rounded-b-none" />

            </div>
            <div className="px-[20px] py-[10px] flex flex-col gap-[10px]">
                <p className="text-[20px] truncate font-[800]">{country.name}</p>
                <div>
                    <p className="font-[300]"><span className = "font-[600]">Population:</span>{" "+country.population}</p>
                    <p className="font-[300]"><span className = "font-[600]">Region:</span>{" "+country.region}</p>
                    <p className="font-[300]"><span className = "font-[600]">Capital:</span>{" "+country.capital}</p>
                </div>
            </div>
            
        </div>
    )
}

export default CountryCard
