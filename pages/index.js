import Head from 'next/head'
import CountriesDisplay from '../components/CountriesDisplay'
import Header from '../components/Header'
import Axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { theme } from '../recoil';
import FadeIn from "react-fade-in"
// import countriesState from '../recoil/store';
// import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function Home({ countries }) {

	// console.log(countries);

	const [modalState, setModalState] = useState(false);
	const [region, setRegion] = useState("All Regions")
	const [countriesState, setCountriesState] = useState(countries)
	const [searchName, setSearchName] = useState("")

    const themeStore = useRecoilValue(theme);


	// const countriesRecoil = useRecoilValue(countriesState);
	// const setCountries = useSetRecoilState(countriesState);

	// setCountries((oldCountries) => countries);
	// console.log(countriesRecoil); 

	// async function changeCountries(selectedRegion){
	// 	await setRegion(selectedRegion)
	// 	console.log("chosen region:", region)
	// 	const filtered = countries.filter(a => a.region === region);
	// 	setCountriesState(filtered)
	// }

	useEffect(() => {
		// console.log("chosen region:", region)
		const nameFiltered = countries.filter(a => a.name.toLowerCase().startsWith(searchName.toLowerCase()));
		// console.log(`nameFiltered ${searchName}`, nameFiltered)
		const filtered = nameFiltered.filter(a => a.region === region);
		// if(region !== "All Regions")
		// 	setCountriesState(filtered)
		// else
		// 	if(nameFiltered.length === 0)
		// 		setCountriesState("Sorry! Couldn't find the country.")
		// 	else{
				
		// 		setCountriesState(nameFiltered)
		// 	}
		if(region === "All Regions"){
			if(nameFiltered.length === 0)
				setCountriesState("Sorry! Couldn't find the country.")
			else
				setCountriesState(nameFiltered)
		}

		else{
			if(filtered.length === 0)
				setCountriesState("Sorry! Couldn't find the country.")
			else
				setCountriesState(filtered)
		}
	}, [region, searchName]);

	// const changeInput = (e) => {
	// 	e.preventDefault();
	// 	setSearchName(e.value);
	// 	console.log(searchName);
	// }


	return (
		<div className={`${themeStore === "dark"?"bg-[#202c37]":"bg-white"} h-screen overflow-hidden flex flex-col`}>
			<Head>
				<title>Geidentify</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
				<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet"/>
			</Head>

			<Header />
			
			<div className={`${themeStore === "dark"?"bg-[rgb(32,44,55)]":"bg-white"} px-[20px] sm:px-[40px] py-[20px] flex flex-col gap-[20px] sm:flex-row items-center justify-between z-999 sticky top-0 bg-white`}>
				<div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} w-full flex items-center grow max-w-[600px] rounded-lg shadow-lg gap-[20px] px-[20px] py-[10px]`}>
					<BiSearchAlt size={"25px"}/>
					<input type={"text"} placeholder="Search for a country..." className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} w-full outline-0`} onChange={(e) => {setSearchName(e.target.value)}} />
				</div>
				<div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} flex w-[200px] self-start sm:self-center items-center justify-between gap-[20px] rounded-lg px-[20px] py-[10px] shadow-lg cursor-pointer relative`} onClick={() => {setModalState(!modalState)}}>
					<p>{region === "All Regions"?"Filter by Region":region}</p>
				
					<div className='transition-all duration-300'>
						{modalState?<BsChevronUp color="#888383" size={"15px"}  /> : <BsChevronDown color="#888383" size={"15px"} onClick={() => {setModalState(!modalState)}} />}
					</div>
					
					{/* <FadeIn> */}
					<div className= {`${!modalState?"hidden":"block"} ${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} absolute top-[100%] bg-white ml-[-20px] p-[10px] mt-[5px] rounded-md shadow-lg w-full`}>
						<p onClick = {() => {setRegion("All Regions")}}>All Regions</p>
						
						<p onClick = {() => {setRegion("Africa")}}>Africa</p>
						<p onClick = {() => {setRegion("Americas")}}>America</p>
						<p onClick = {() => {setRegion("Asia")}}>Asia</p>
						<p onClick = {() => {setRegion("Europe")}}>Europe</p>
						<p onClick = {() => {setRegion("Oceania")}}>Oceania</p>
					</div>
					{/* </FadeIn> */}
				</div>
			</div>
			
			<CountriesDisplay countries = {countriesState}/>
		</div>
	)
}

export async function getServerSideProps() {
	const res = await Axios.get("https://restcountries.com/v2/all");

	
	return {
		props: { countries: res.data },	
	};
}

