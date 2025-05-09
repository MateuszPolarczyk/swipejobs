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
