import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const BASE_URL = BASE_API_URL + "/api/purchase";

class PurchaseService {
    savePurchase(purchase) {
        return axios.post(BASE_URL, purchase, {headers: authHeader()})
    }

    getAllPurchaseItems() {
        return axios.get(BASE_URL, {headers: authHeader});
    }
}

export default new PurchaseService;