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
} from "../api";

interface DataContextType {
  profile: Profile | null;
  jobs: JobsResponse;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchJobs: () => Promise<void>;
  refetchAll: () => Promise<void>;
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
