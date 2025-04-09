import { ChangeEvent, useEffect, useState } from "react";
import { getPcSpecs, getPcTypes, rentalRegister } from "../../api/rentalApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useLocation, useNavigate } from "react-router";

export default function RentalComponent() {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [form, setForm] = useState({
    code: "",
    type: "",
    spec: "",
    feeOfMonth: 0,
    rentalStartDate: "",
    rentalEndDate: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "feeOfMonth" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await rentalRegister(form);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const [pcType, setPcType] = useState<string[]>([]);
  const [pcSpec, setPcSpec] = useState<string[]>([]);

  useEffect(() => {
    if (isLogin) {
      const fetchData = async () => {
        try {
          const pcTypes = await getPcTypes();
          const pcSpecs = await getPcSpecs();

          console.log(pcTypes, pcSpecs);
          setPcType(pcTypes);
          setPcSpec(pcSpecs);

          setForm((prev) => ({
            ...prev,
            type: pcTypes[0],
            spec: pcSpecs[0],
          }));
        } catch (err) {
          console.error("error");
        }
      };

      fetchData();
    } else {
      navigate("/members/login", {
        state: { from: location.pathname },
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>코드:</label>
        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>PC 종류:</label>
        <select name="type" value={form.type} onChange={handleChange}>
          {pcType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>스펙:</label>
        <select name="spec" value={form.spec} onChange={handleChange}>
          {pcSpec.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>월 요금:</label>
        <input
          type="number"
          name="feeOfMonth"
          value={form.feeOfMonth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>대여 시작일:</label>
        <input
          type="date"
          name="rentalStartDate"
          value={form.rentalStartDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>대여 종료일:</label>
        <input
          type="date"
          name="rentalEndDate"
          value={form.rentalEndDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
}
