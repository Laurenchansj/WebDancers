import { db } from "./firebase";
import { collection, getDocs, getDoc, addDoc, doc } from "firebase/firestore";

export const getBlog = async (id) => {
  try {
    const docRef = doc(db, "blogs", id);
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

export const getAllBlogs = async () => {
  try {
    const blogsSnapShot = await getDocs(collection(db, "blogs"));
    const allBlogs = blogsSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allBlogs;
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = async (blog) => {
  try {
    let docRef = await addDoc(collection(db, "blogs"), blog);
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};
