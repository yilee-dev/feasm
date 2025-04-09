import jwtAxios from "../util/jwtUtils";

export const rentalRegister = async (
  rentalForm: RentalForm
): Promise<number> => {
  const host = "http://localhost:8080";

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await jwtAxios.post(`${host}/api/rentals/pc`, rentalForm, header);
  return res.data;
};

export const getPcTypes = async () => {
  const host = "http://localhost:8080";
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await jwtAxios.get(`${host}/api/rentals/types`, header);
  return res.data;
};

export const getPcSpecs = async () => {
  const host = "http://localhost:8080";
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await jwtAxios.get(`${host}/api/rentals/specs`, header);
  return res.data;
};
