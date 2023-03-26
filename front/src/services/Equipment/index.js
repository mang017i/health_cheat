import axios from "axios";

const API_URL = "http://localhost:8080/api/equipments";

class EquipmentService {
  getAllEquipments() {
    return axios.get(API_URL);
  }

  getAllEquipmentsForMaterial(materialId) {
    return axios.get(API_URL + "/material", { params: { material_id: materialId } });
  }

  getAllEquipmentsForCheat(cheatId) {
    return axios.get(API_URL + "/cheat", { params: { cheat_id: cheatId } });
  }

  findEquipmentByMaterialAndCheat(materialId, cheatId) {
    return axios.get(API_URL + "/material/cheat", {
      params: { material_id: materialId, cheat_id: cheatId },
    });
  }

  isCheatEquipmentedByMaterial() {
    return axios.get(API_URL + "/cheat/Equipmented");
  }

  addCheatToMaterial(data) {
    return axios.post(API_URL + "/add", data);
  }

  removeEquipmentFromMaterial(materialId, cheatId) {
    try {
      const response = axios.delete(API_URL +'/remove', {
        data: { material_id: materialId, cheat_id: cheatId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

}

const equipmentService = new EquipmentService();

export default equipmentService;
