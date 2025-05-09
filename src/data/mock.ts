interface UIJob {
  id: string;
  jobImageUrl: string;
  jobTitle: string;
  jobCompany: string;
  jobHourlyRate: string;
  jobDistance: number;
  jobLocation: string;
}

export const mockJobs: UIJob[] = [
  {
    id: "1",
    jobImageUrl: "https://picsum.photos/300/150",
    jobTitle: "Construction General Helper",
    jobCompany: "Steve Smith Construction",
    jobHourlyRate: "13.50",
    jobDistance: 5.3,
    jobLocation: "430 Smith St, Chicago, IL 60654, USA",
  },
  {
    id: "2",
    jobImageUrl: "https://picsum.photos/300/150?2",
    jobTitle: "Warehouse Worker",
    jobCompany: "Logistics Inc.",
    jobHourlyRate: "15.00",
    jobDistance: 3.2,
    jobLocation: "800 Main St, Chicago, IL 60601, USA",
  },
];

export const getJobById = (id: string): UIJob | undefined =>
  mockJobs.find((job) => job.id === id);
