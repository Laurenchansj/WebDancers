import { auth, firestore as db } from "../_services/firebase";
import { collection, getDocs, getDoc, doc, where } from "firebase/firestore";

export const getBlog = async (authorId, blogId) => {
  try {
    const docRef = doc(db, `users/${authorId}/blogs2`, blogId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const blog = { id: docSnap.id, ...docSnap.data() };
      return blog;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlogs = async (userId) => {
  try {
    const blogsSnapShot = await getDocs(
      collection(db, `users/${userId}/blogs2`)
    );
    const allBlogs = blogsSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allBlogs;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersId = async () => {
  try {
    const blogsSnapShot = await getDocs(collection(db, "users"));
    const allUser = blogsSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allUser;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const userIdList = await getAllUsersId();
    const all = [];
    const allBlogs = [];
    for (let i = 0; i < userIdList.length; i++) {
      const user = userIdList[i];
      const blogs = await getUserBlogs(user.id);
      all.push(blogs);
    }
    for (let i = 0; i < all.length; i++) {
      const blogs = all[i];
      for (let j = 0; j < blogs.length; j++) {
        const blog = blogs[j];
        allBlogs.push(blog);
      }
    }
    return allBlogs;
  } catch (error) {
    console.log(error);
  }
};
