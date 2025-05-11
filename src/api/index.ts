import { Profile, JobsResponse } from "./types";
import { WORKER_ID, API_BASE_URL } from "@env";

export const fetchWorkerProfile = async (): Promise<Profile> => {
  if (!WORKER_ID) {
    throw new Error("WORKER_ID is not set in environment variables");
  }

  const response = await fetch(`${API_BASE_URL}/worker/${WORKER_ID}/profile`);

  if (!response.ok) {
    throw new Error(`Profile request failed with status ${response.status}`);
  }

  return await response.json();
};

export const fetchWorkerJobs = async (): Promise<JobsResponse> => {
  if (!WORKER_ID) {
    throw new Error("WORKER_ID is not set in environment variables");
  }

  const response = await fetch(`${API_BASE_URL}/worker/${WORKER_ID}/matches`);

  if (!response.ok) {
    throw new Error(`Jobs request failed with status ${response.status}`);
  }

  return await response.json();
};

export const fetchAllWorkerData = async (): Promise<{
  profile: Profile;
  jobs: JobsResponse;
}> => {
  const [profile, jobs] = await Promise.all([
    fetchWorkerProfile(),
    fetchWorkerJobs(),
  ]);

  return { profile, jobs };
};

export const rejectJob = async (
  workerId: string,
  jobId: string
): Promise<{
  success: boolean;
  message?: string;
  errorCode?: string;
}> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/worker/${workerId}/job/${jobId}/reject`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Job rejection failed",
        errorCode: data.errorCode || "UNKNOWN_ERROR",
      };
    }

    return data;
  } catch (error) {
    console.error("Reject job error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to reject job",
      errorCode: "NETWORK_ERROR",
    };
  }
};

export const acceptJob = async (
  workerId: string,
  jobId: string
): Promise<{
  success: boolean;
  message?: string;
  errorCode?: string;
}> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/worker/${workerId}/job/${jobId}/accept`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(
        `Invalid content type. Received: ${contentType}. Response: ${text.substring(
          0,
          100
        )}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Job acceptance failed",
        errorCode: data.errorCode || "UNKNOWN_ERROR",
      };
    }

    return data;
  } catch (error) {
    console.error("Accept job error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to accept job",
      errorCode: "NETWORK_ERROR",
    };
  }
};
