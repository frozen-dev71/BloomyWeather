import Main from "./Main.styled";
import TopContainer from "../top-container/TopContainer";
import CenterContainer from "../center-container/CenterContainer";
import BottomContainer from "../bottom-container/BottomContainer";


const WeatherContainer = ({ todayWeather, handleSubmit, handleValidation, formValue, formError , loading, noData}) => {
    return (
        <Main>
        <TopContainer formError={formError} handleSubmit={handleSubmit} handleValidation={handleValidation} formValue={formValue} />
        <CenterContainer todayWeather={todayWeather} loading={loading} noData={noData}/>
        <BottomContainer todayWeather={todayWeather} loading={loading} noData={noData}/>
        </Main>
    )
}

export default WeatherContainer;