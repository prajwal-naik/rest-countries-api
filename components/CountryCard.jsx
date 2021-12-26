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
        <div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} h-max sm:h-auto col-span-1 row-span-1 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer`}
            onClick={enterCountry}
        >
            <img src = {country.flags.svg} className="h-[50%] w-full rounded-lg rounded-b-none" />
            <div className="px-[20px] py-[10px] flex flex-col gap-[10px]">
                <p className="text-[20px] truncate font-[600]">{country.name}</p>
                <div>
                    <p><b>Population:</b>{" "+country.population}</p>
                    <p><b>Region:</b>{" "+country.region}</p>
                    <p><b>Capital:</b>{" "+country.capital}</p>
                </div>
            </div>
            
        </div>
    )
}

export default CountryCard
