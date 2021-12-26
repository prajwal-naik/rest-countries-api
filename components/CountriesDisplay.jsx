import { Router } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../recoil";
import CountryCard from "./CountryCard";






function CountriesDisplay({ countries }) { 

	// const [countries, setCountries] = useState({})
	

    const themeStore = useRecoilValue(theme);
	

	// console.log(countries)
	if(countries === "Sorry! Couldn't find the country."){
		return <div className={`${themeStore === "dark"?"bg-[#202c37] text-white":"bg-white"} flex grow items-center justify-center`}>{countries}</div>
	}
	return (
		
		<div className={`${themeStore === "dark"?"bg-[#202c37]":"bg-white"} px-[40px] sm:px-[150px] py-[40px] overflow-y-scroll scrollbar-hide`}>
			
			{/* {JSON.stringify(countries)} */}
			<div className="grid auto-rows grid-cols-1 sm:grid-cols-4 gap-[40px] sm:gap-[80px] scrollbar-hide">
				{
					countries.map((country) => {
						return(
							<CountryCard 
								key={country.alpha2Code}
								country = {country}
							/>
						);
					})
				}
			</div>
		</div>
	)
}



export default CountriesDisplay
