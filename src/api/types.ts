export interface Address {
  formattedAddress: string;
  zoneId: string;
}

export interface Profile {
  address: Address;
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
}

export interface JobTitle {
  name: string;
  imageUrl: string;
}

export interface ReportTo {
  name: string;
  phone?: string;
}

export interface Company {
  name: string;
  address: Address;
  reportTo: ReportTo;
}

export interface Shift {
  startDate: string;
  endDate: string;
}

export interface Job {
  jobId: string;
  jobTitle: JobTitle;
  company: Company;
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: Shift[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
}

export type JobsResponse = Job[];