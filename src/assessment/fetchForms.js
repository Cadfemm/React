import api from "../shared/api/apiClient";
import { API_URL } from "../platform/config/api.config";


const fetchForms = async (department) => {
    try {
        const response = await api.get(
            API_URL.fetchTemplate(department)
        )
        return response.data.results
    } catch (e) {
        return []
    }
}

export default fetchForms;