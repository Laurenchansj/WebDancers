import { auth, firestore as db } from "../_services/firebase";
import { collection, getDocs, getDoc, doc, where } from "firebase/firestore";

// export const getAuthorId = async (blogId) => {
//   try {
//     const query = query(
//       collection(db, "users"),
//       where(blogs2.id, "==", blogId)
//     );
//     const querySnapshot = await getDocs(query);
//     const authorId = querySnapshot.docs[0].id;
//     return authorId;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBlog = async (authorId, blogId) => {
  //   try {
  //     const blogSnapShot = await getDoc(doc(db, `users/${userId}/blogs2`, blogId));
  //     const blog = blogSnapShot.data();
  //     if (docSnap.exists()) {
  //       const blog = { id: docSnap.id, ...docSnap.data() };
  //       return blog;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
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
  //   try {
  //     const docRef = doc(db, "blogs2", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const blog = { id: docSnap.id, ...docSnap.data() };
  //       return blog;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
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

// let allUserList = [];
// export const getAllBlogs = async () => {
//   try {
//     const blogsSnapShot = await getDocs(collection(db, "users"));
//     const allUser = blogsSnapShot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     for (let i = 0; i < allUser.length; i++) {
//       const user = allUser[i];
//       const blogs = await getUserBlogs(user.id);
//       allUserList.push({ user, blogs });
//     }
//     console.log("allAllBlogs test: ", allUserList);

//     return allUserList;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllUsers = async () => {
//     try {
//       let allUserList = [];
//       const blogsSnapShot = await getDocs(collection(db, "users"));
//       const allUser = blogsSnapShot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       for (let i = 0; i < allUser.length; i++) {
//         const user = allUser[i];
//         const blogs = await getUserBlogs(user.id);
//         allUserList.push({ user, blogs });
//       }
//       console.log(allUserList);
//       console.log("allUser test");
//       console.log(allUser);

//       return allUser;
//     } catch (error) {
//       console.log(error);
//     }
//   };
