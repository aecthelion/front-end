import axios from "axios";
import {
    IVacancyApplication,
    IVacancyApplicationListParams,
    IVacancyApplicationUpdatePayload
} from "./vacancyApplicationSlice";

const API_URL = "http://localhost:5000/api/vacancies";

const create = async (vacancyApplication: IVacancyApplication) => {
    const response = await axios.post(`${API_URL}`, vacancyApplication);

    return response.data;
};

const get = async (vacancyApplicationListParams: IVacancyApplicationListParams) => {
    const {
        page,
        pageSize,
        searchParams,
    } = vacancyApplicationListParams
    const response = await axios.get(`${API_URL}/list?page=${page}&pageSize=${pageSize}${searchParams ? `&searchParams=${searchParams}` : ''}`,);

    return response.data;
};

const update = async (vacancyApplication: IVacancyApplicationUpdatePayload) => {
    const response = await axios.patch(`${API_URL}/${vacancyApplication._id}`, {status: vacancyApplication.status});

    return response.data;
};

const vacancyApplicationService = {
    create,
    get,
    update,
};

export default vacancyApplicationService;
