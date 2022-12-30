import Main from "./Main.styled";
import TopContainer from "../top-container/TopContainer";

const WeatherContainer = ({ todayWeather, handleSubmit, handleValidation, formValue, formError , loading, noData}) => {
    return (
        <Main>
        <TopContainer formError={formError} handleSubmit={handleSubmit} handleValidation={handleValidation} formValue={formValue} />

        </Main>
    )
}

export default WeatherContainer;