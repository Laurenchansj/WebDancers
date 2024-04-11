import { getBlog, getUserBlogs, getAllUsersId, getAllBlogs } from "./blog-service";
import { getDoc, getDocs } from "firebase/firestore";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("Blog Service Tests", () => {
   // Before each test, reset mocks to clear previous test's state and setup new mock implementations.
  beforeEach(() => {
    // Clear all mocks to avoid data leaking between tests
    getDoc.mockClear();
    getDocs.mockClear();

    // Mock getDoc to simulate fetching a single blog post
    // This mock simulates the case where a blog post does exist
    getDoc.mockImplementation(() =>
      Promise.resolve({
        // Simulate the blog post exists
        exists: () => true,
        id: "blogId",
        data: () => ({
          // Return blog post data
          title: "Test Blog",
          content: "This is a test blog",
        }),
      })
    );

    // Mock getDocs to simulate fetching documents from Firestore
    // This initial implementation is used in the "returns an array of user IDs" test
    getDocs.mockImplementation(() => 
      Promise.resolve({
        docs: [
          // Simulate documents found in the Firestore
          { id: "userId1", data: () => ({ name: "User 1" }) },
          { id: "userId2", data: () => ({ name: "User 2" }) },
        ],
      })
    );
  });

  // Test to verify if fetching a specific blog by authorId and blogId returns the correct blog data
  it("returns blog data if blog exists", async () => {
    const blog = await getBlog("authorId", "blogId");

     // Expect the fetched blog to match the mock data provided in getDoc implementation
    expect(blog).toEqual({
      id: "blogId",
      title: "Test Blog",
      content: "This is a test blog",
    });
  });

  // Test to verify if fetching blogs for a given user returns an array of blog data
  it("returns an array of blog data for a given user", async () => {
    // Override getDocs mock for this test to return specific blog data for a user
    getDocs.mockImplementationOnce(() =>
      Promise.resolve({
        docs: [
          // Simulate two blog posts belonging to the user
          {
            id: "blogId1",
            data: () => ({
              title: "Test Blog 1",
              content: "This is the first test blog",
            }),
          },
          {
            id: "blogId2",
            data: () => ({
              title: "Test Blog 2",
              content: "This is the second test blog",
            }),
          },
        ],
      })
    );

    const userId = "userId";
    const blogs = await getUserBlogs(userId);

    // Expect the fetched blogs array to match the mock data provided
    expect(blogs).toEqual([
      {
        id: "blogId1",
        title: "Test Blog 1",
        content: "This is the first test blog",
      },
      {
        id: "blogId2",
        title: "Test Blog 2",
        content: "This is the second test blog",
      },
    ]);
  });

  // Test to verify if fetching all user IDs returns an array of user ID objects
  it("returns an array of user IDs", async () => {
    const userIds = await getAllUsersId();

    // Expected user IDs array based on the getDocs mock implementation
    const expectedUserIds = [
      { id: "userId1", name: "User 1" },
      { id: "userId2", name: "User 2" },
    ];

    // Verify the returned user IDs match the expected array
    expect(userIds).toEqual(expectedUserIds);
  });

  // Test to verify if fetching all blogs from all users returns a combined array of all blogs
  it("returns all blogs from all users", async () => {
    // Reset and setup specific mock for this test
    // First call to getDocs simulates fetching user IDs
    // Following calls simulate fetching blogs for each user
    getDocs.mockReset().mockImplementationOnce(() =>
      Promise.resolve({
        docs: [
          // Simulate user ID documents found
          { id: "userId1", data: () => ({}) },
          { id: "userId2", data: () => ({}) },
        ],
      })
    ).mockImplementationOnce(() =>
      Promise.resolve({
        docs: [
          // Simulate blogs for the first user
          {
            id: "blogId1",
            data: () => ({
              title: "User 1 Blog 1",
              content: "Content for User 1 Blog 1",
            }),
          },
        ],
      })
    ).mockImplementationOnce(() =>
      Promise.resolve({
        docs: [
          // Simulate blogs for the second user
          {
            id: "blogId2",
            data: () => ({
              title: "User 2 Blog 1",
              content: "Content for User 2 Blog 1",
            }),
          },
        ],
      })
    );

    const allBlogs = await getAllBlogs();

    // Verify the length of the returned blogs array is correct and contains expected blog objects
    expect(allBlogs.length).toBe(2);
    expect(allBlogs).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
      })
    ]));
  });
});