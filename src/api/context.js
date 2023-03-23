import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';


export const PrisonContext = createContext();

const Context = ({ children }) => {
    // checking when authentication changes
    const [user, setUser] = useState([]);
    const [userTask, setUserTask] = useState([]);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const fetchedUser = [];
                const snapshot = await getDoc(doc(db, "wardens", user.uid))
                setUser(snapshot.data())
                // user task
                const tasksCollectionRef = collection(db, "wardens", user.uid, "tasks");
                getDocs(tasksCollectionRef).then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const fetchedTasks = [];
                        querySnapshot.forEach((doc) => {
                            fetchedTasks.push({ id: doc.id, ...doc.data() });
                        });
                        setUserTask(fetchedTasks);
                    } else {
                        console.log("we did not find task collection");
                    }
                });

            } else {
                console.log("this user is not available")
            }
        });
    }, []);






    const loginInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
            })
            .catch((err) => console.log(err))


    }
    const logOutUser = () => {
        signOut(auth)
    }
    // Retrieve all data from warden collection
    const [wardens, setWardens] = useState([])
    useEffect(() => {
        const fetchWardens = async () => {
            const querySnapshot = await getDocs(collection(db, "wardens"));
            if (querySnapshot.docs.length) {
                const fetchedWardens = [];
                for (const doc of querySnapshot.docs) {
                    const wardenData = { id: doc.id, ...doc.data() };
                    // Check if the `tasks` subcollection exists for the current `warden` document
                    const tasksQuerySnapshot = await getDocs(collection(doc.ref, "tasks"));
                    if (tasksQuerySnapshot.docs.length) {
                        const fetchedTasks = [];
                        tasksQuerySnapshot.forEach((taskDoc) => {
                            fetchedTasks.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        wardenData.tasks = fetchedTasks;
                    }
                    fetchedWardens.push(wardenData);
                }
                setWardens(fetchedWardens);
            } else {
                console.log("No documents found");
            }
        };

        fetchWardens()
    }, [])



    // adding the task function
    const [error, setError] = useState("");
    const handleAddTask = async (task, id, description, taskId) => {
        console.log(id)
        if (task === " ") {
            setTimeout(() => {
                setError("your have not selected task")
            })
        } else {
            const wardenDocRef = doc(db, "wardens", id);
            getDoc(wardenDocRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const timestamp = serverTimestamp();
                        const tasksCollectionRef = collection(db, "wardens", id, "tasks");
                        addDoc(tasksCollectionRef, {
                            taskName: task,
                            taskDescription: description,
                            createdAt: timestamp,
                            taskId: taskId
                        });


                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    }

    // verifying wardens
    const verifyWarden = (id) => {
        const wardenDocRef = doc(db, "wardens", id);
        getDoc(wardenDocRef)
            .then((doc) => {
                if (doc.exists()) {
                    updateDoc(wardenDocRef, {
                        status: "active"
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    // removing wardens
    const removeWarden = (id) => {
        const wardenDocRef = doc(db, "wardens", id);
        getDoc(wardenDocRef)
            .then((doc) => {
                if (doc.exists()) {
                    updateDoc(wardenDocRef, {
                        status: "persive"
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

    }









    return (
        <PrisonContext.Provider value={{
            loginInUser, logOutUser, wardens, user, handleAddTask,
            error, verifyWarden, userTask, removeWarden
        }}>
            {children}
        </PrisonContext.Provider>
    )
}

export default Context