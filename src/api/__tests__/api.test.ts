import {
    fetchWorkerProfile,
    fetchWorkerJobs,
    fetchAllWorkerData,
    acceptJob,
    rejectJob,
  } from "../../api";
  
  global.fetch = jest.fn();
  
  const mockProfile = {
    address: {
      formattedAddress: "1 Downing St, Chicago, IL 60654, USA",
      zoneId: "America/Chicago",
    },
    email: "jim.rose@gmail.com",
    firstName: "Jim",
    lastName: "Rose",
    maxJobDistance: 20,
    phoneNumber: "5096290220",
    workerId: "7f90df6e-b832-44e2-b624-3143d428001f",
  };
  
  const mockJobs = [
    {
      jobId: "5775d8e18a488e6c5bb08333",
      jobTitle: {
        name: "Construction General Helper",
        imageUrl: "https://imgs.swipejobs.com/js/job-category/construction-1.jpg",
      },
      company: {
        name: "Steve Smith Construction",
        address: {
          formattedAddress: "430 Smith St, Chicago, IL 60654, USA",
          zoneId: "America/Chicago",
        },
        reportTo: {
          name: "Judy Smith",
          phone: "2130010012",
        },
      },
      wagePerHourInCents: 950,
      milesToTravel: 3.4,
      shifts: [
        {
          startDate: "2019-09-04T21:00:00Z",
          endDate: "2019-09-05T05:00:00Z",
        },
      ],
      branch: "Downtown",
      branchPhoneNumber: "2531233322",
    },
  ];
  
  describe("API service", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("fetches worker profile successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile,
      });
  
      const result = await fetchWorkerProfile();
      expect(result).toEqual(mockProfile);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/profile"));
    });
  
    it("fails to fetch worker profile with bad status", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });
  
      await expect(fetchWorkerProfile()).rejects.toThrow(
        "Profile request failed with status 404"
      );
    });
  
    it("fetches worker jobs successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockJobs,
      });
  
      const result = await fetchWorkerJobs();
      expect(result).toEqual(mockJobs);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/matches"));
    });
  
    it("fetches all worker data in parallel", async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockProfile })
        .mockResolvedValueOnce({ ok: true, json: async () => mockJobs });
  
      const result = await fetchAllWorkerData();
      expect(result).toEqual({ profile: mockProfile, jobs: mockJobs });
    });
  
    it("accepts job successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => "application/json" },
        json: async () => ({ success: true }),
      });
  
      const result = await acceptJob("worker-123", "job-1");
      expect(result).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/accept"),
        expect.objectContaining({ method: "GET" })
      );
    });
  
    it("handles job rejection with failure response", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => "application/json" },
        json: async () => ({
          success: false,
          message: "Sorry, this role was no longer available",
          errorCode: "FAIL-101",
        }),
      });
  
      const result = await rejectJob("worker-123", "job-1");
      expect(result).toEqual({
        success: false,
        message: "Sorry, this role was no longer available",
        errorCode: "FAIL-101",
      });
    });
  
    it("handles non-JSON accept job response", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: { get: () => "text/html" },
        text: async () => "<html>Error</html>",
      });
  
      const result = await acceptJob("worker-123", "job-1");
  
      expect(result.success).toBe(false);
      expect(result.errorCode).toBe("NETWORK_ERROR");
      expect(result.message).toContain("Invalid content type");
    });
  
    it("handles fetch failure in rejectJob", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));
  
      const result = await rejectJob("worker-123", "job-1");
  
      expect(result.success).toBe(false);
      expect(result.message).toBe("Network failure");
      expect(result.errorCode).toBe("NETWORK_ERROR");
    });
  });
  