import Axios from "axios";
import Head from "next/head";
import Header from "../../components/Header";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
// import { useRecoilValue } from "recoil";
// import countriesState from "../../recoil/store";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { theme } from "../../recoil";
import Link from "next/link"



// function findElement(arr, propValue) {
//     for (var i=0; i < arr.length; i++)
//       if (arr[i].name.common == propValue)
//         return arr[i];
  
//     // will return undefined if not found; you could return a default instead
//   }

function country({ countryDetails }) {
    console.log(countryDetails)

    // const { query } = useRouter();

    const router = useRouter()

    const themeStore = useRecoilValue(theme);



	// const countries = useRecoilValue(countriesState);
    // console.log("from recoil: ", countries)
    // console.log("url param:", query.commonName)
    // var country = findElement(countries, query.commonName);


    // console.log("from filter: ",countryDetails)

    function getLangArray(arr){
        const r = []
        for(var i = 0; i<arr.length; i++){
            r.push(arr[i].name)
        }
        return r.join(", ");
    }

    // const enterCountry = (commonName) => {
    //     router.push(`/country/${commonName}`);
    // }

    

    return (
        <div className={`${themeStore === "dark"?"bg-[#202c37] text-white":"bg-white"} h-screen overflow-hidden flex flex-col box-content`}>
            <Head>
				<title>Geidentify</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap" rel="stylesheet" />
			</Head>

			<Header />

            <div className="flex grow flex-col px-[20px] sm:max-w-5xl sm:m-auto  overflow-y-scroll scrollbar-hide">
                <div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} w-min mt-[40px] flex gap-[10px] rounded-lg shadow-lg items-center justify-center p-[10px] px-[20px] cursor-pointer`} onClick={() => router.back()}>
                    <HiOutlineArrowNarrowLeft size={20}/>
                    <p>Back</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] sm:gap-[100px] py-[80px]">
                    <div className="flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <img src = {countryDetails.flags.svg} alt = "" className="rounded-lg"/>
                    </div>
                    <div className="flex flex-col items-center justify-between py-[40px]">
                        <div className="flex flex-col gap-[40px] sm:gap-[10px] w-full">
                            <p className="text-[24px] font-[500]">{countryDetails.name}</p>
                            <div className="flex flex-col gap-[40px] sm:flex-row items-start justify-between text-[14px]">
                                <div className="flex flex-col gap-[10px]">
                                    <p><b>Native Name:</b> {countryDetails.nativeName}</p>
                                    <p><b>Population:</b> {countryDetails.population}</p>
                                    <p><b>Region:</b> {countryDetails.region}</p>
                                    <p><b>Sub Region:</b> {countryDetails.subregion}</p>
                                    <p><b>Capital:</b> {countryDetails.capital}</p>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <p><b>Top Level Domain:</b> {countryDetails.topLevelDomain[0]}</p>
                                    <p><b>Currencies:</b> {getLangArray(countryDetails.currencies)}</p>
                                    <p><b>Languages:</b> {getLangArray(countryDetails.languages)}</p>
                                </div>
                            </div>
                            <div className="flex gap-[20px]">
                                <p>Border Countries: </p>
                                <div className="flex gap-[10px] flex-wrap">
                                    {
                                        countryDetails.borders.map((border) => {
                                            return(
                                                <Link key = {border} href = {`/country/${border.toLowerCase()}`}>
                                                    <div className={`${themeStore === "dark"?"bg-[#2b3945] text-white":"bg-white"} px-[20px] py-[2px] rounded-md cursor-pointer`} ><p>{border}</p></div>

                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex gap-[10px] flex-wrap">
                            <p>Border Countries: </p>
                            {
                                countryDetails.borders.map((country) => {
                                    
                                })
                            }
                        </div> */}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default country

export async function getServerSideProps(context) {
    // console.log(context.query.sign3)

	const res = await Axios.get(`https://restcountries.com/v2/alpha/${context.query.commonName}`);
    // var country = findElement(res.data, context.query.commonName);
    // console.log("Country: ", res.data)

	return {
		props: { countryDetails: res.data },	
	};
}