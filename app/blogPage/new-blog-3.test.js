import React from "react";
import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import NewBlog2 from "./new-blog-3";
import { useUserAuth } from "@/app/_services/auth-context";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore as db } from "@/app/_services/firebase";

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock("@/app/_services/auth-context", () => ({
  useUserAuth: jest.fn(),
}));

jest.mock("@/app/_services/firebase", () => ({
  auth: {},
  db: {},
}));

describe("NewBlog2 Component", () => {
  beforeEach(() => {
    useUserAuth.mockImplementation(() => ({
      user: { uid: "testUid", displayName: "Test User" },
    }));
    addDoc.mockResolvedValue({ id: "newDocId" });
  });

  it("submits a new blog post successfully", async () => {
    const onAddBlog = jest.fn();
    const { getByLabelText, getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <NewBlog2 onAddBlog={onAddBlog} />
    );

    fireEvent.change(getByLabelText("From:"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(getByLabelText("To:"), {
      target: { value: "2023-01-02" },
    });
    fireEvent.change(getByPlaceholderText("Title..."), {
      target: { value: "My Test Title" },
    });
    fireEvent.change(getAllByPlaceholderText("Description...")[0], {
      target: { value: "My Test Memo" },
    });

    fireEvent.click(getByText("Post"));

    await waitFor(() => expect(addDoc).toHaveBeenCalledTimes(1));

    expect(onAddBlog).toHaveBeenCalledWith(expect.anything());
  });
});
