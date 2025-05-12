import {
  fetchWorkerProfile,
  fetchWorkerJobs,
  fetchAllWorkerData,
  acceptJob,
  rejectJob,
} from "../../api";

global.fetch = jest.fn();

const mockProfile = { name: "John Doe", workerId: "worker-123" };
const mockJobs = [{ id: "job-1" }, { id: "job-2" }];

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

  it("rejects job with API failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Job not found", errorCode: "NOT_FOUND" }),
    });

    const result = await rejectJob("worker-123", "job-1");
    expect(result).toEqual({
      success: false,
      message: "Job not found",
      errorCode: "NOT_FOUND",
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
  });

  it("handles fetch failure in rejectJob", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));

    const result = await rejectJob("worker-123", "job-1");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Network failure");
    expect(result.errorCode).toBe("NETWORK_ERROR");
  });
});
