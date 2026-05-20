import axiosInstance from "../api/axios";

/* GET DASHBOARD STATS */

export const getDashboardStats = async () => {

  const response =
    await axiosInstance.get(
      "/api/dashboard/stats"
    );

  return response.data;
};

/* GET ASSESSMENTS */

export const getAssessments = async () => {

  const response =
    await axiosInstance.get(
      "/api/assessment/all"
    );

  return response.data;
};

/* GET RECENT ATTEMPTS */

export const getRecentAttempts = async () => {

  const response =
    await axiosInstance.get(
      "/api/assessment/recent"
    );

  return response.data;
};