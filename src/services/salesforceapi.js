import axios from "axios";

const BACKEND_URL = "http://localhost:4000";

const getHeaders = () => {
  const token = localStorage.getItem("sf_access_token");
  const instanceUrl = localStorage.getItem("sf_instance_url");
  return {
    Authorization: `Bearer ${token}`,
    "x-instance-url": instanceUrl,
    "Content-Type": "application/json",
  };
};

export const getValidationRules = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/validation-rules`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const toggleValidationRule = async (ruleId, isActive) => {
  await axios.patch(
    `${BACKEND_URL}/api/validation-rules/${ruleId}`,
    { isActive },
    { headers: getHeaders() }
  );
};

export const toggleAllRules = async (rules, isActive) => {
  const promises = rules.map((rule) => toggleValidationRule(rule.Id, isActive));
  await Promise.all(promises);
};
