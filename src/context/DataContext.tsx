import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Profile, JobsResponse } from "../api/types";
import {
  fetchWorkerProfile,
  fetchWorkerJobs,
  fetchAllWorkerData,
  rejectJob as apiRejectJob,
  acceptJob as apiAcceptJob,
} from "../api";

interface DataContextType {
  profile: Profile | null;
  jobs: JobsResponse;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchJobs: () => Promise<void>;
  refetchAll: () => Promise<void>;
  rejectJob: (jobId: string) => Promise<{ success: boolean; message?: string }>;
  acceptJob: (jobId: string) => Promise<{ success: boolean; message?: string }>;
  removeJob: (jobId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<JobsResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWorkerProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWorkerJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      console.error("Jobs fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchAll = async () => {
    try {
      setIsLoading(true);
      const { profile, jobs } = await fetchAllWorkerData();
      setProfile(profile);
      setJobs(jobs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectJob = async (jobId: string) => {
    if (!profile?.workerId) {
      throw new Error("Worker ID not available");
    }

    try {
      const result = await apiRejectJob(profile.workerId, jobId);
      if (result.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject job");
      console.error("Job rejection error:", err);
      return { success: false, message: "Failed to reject job" };
    }
  };

  const acceptJob = async (jobId: string) => {
    if (!profile?.workerId) {
      throw new Error("Worker ID not available");
    }

    try {
      const result = await apiAcceptJob(profile.workerId, jobId);
      if (result.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept job");
      console.error("Job acceptance error:", err);
      return { success: false, message: "Failed to accept job" };
    }
  };

  const removeJob = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
  };

  useEffect(() => {
    refetchAll();
  }, []);

  return (
    <DataContext.Provider
      value={{
        profile,
        jobs,
        isLoading,
        error,
        fetchProfile,
        fetchJobs,
        refetchAll,
        rejectJob,
        acceptJob,
        removeJob,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
