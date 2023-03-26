import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';


export const PrisonContext = createContext();

const Context = ({ children }) => {
    // checking when authentication changes
    const [user, setUser] = useState([]);
    const [userTask, setUserTask] = useState([]);
    const [errorOne, setErrorOne] = useState([])
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const snapshot = await getDoc(doc(db, "wardens", user.uid))
                setUser(snapshot.data())
                // user tasks
                const tasksCollectionRef = collection(db, "wardens", user.uid, "tasks");
                getDocs(tasksCollectionRef).then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const fetchedTasks = [];
                        querySnapshot.forEach((doc) => {
                            fetchedTasks.push({ id: doc.id, ...doc.data() });
                        });
                        setUserTask(fetchedTasks);
                    } else {
                        setErrorOne("we did not find task collection");
                    }
                });

            } else {
                setErrorOne("this user is not available")
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
    // fetching prisoner data
    const [prisoner, setPrisoner] = useState([]);
    const prisonerData = []
    useEffect(() => {
        const fetchPrisoner = async () => {
            const querySnapshot = await getDocs(collection(db, "prisoners"));
            if (querySnapshot.docs.length) {
                const fetchedPrisoners = [];
                for (const doc of querySnapshot.docs) {
                    const prisonerData = { id: doc.id, ...doc.data() };
                    // Check if the visitor subcollection exists for the current prisoner document
                    const visitorQuerySnapshot = await getDocs(collection(doc.ref, "visitorRecords"));
                    if (visitorQuerySnapshot.docs.length) {
                        const fetchedVisitors = [];
                        visitorQuerySnapshot.forEach((taskDoc) => {
                            fetchedVisitors.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        prisonerData.visitorRecords = fetchedVisitors;
                    }
                    // Check if the visitor subcollection exists for the current prisoner document
                    const dutiesQuerySnapshot = await getDocs(collection(doc.ref, "dutiesRecords"));
                    if (dutiesQuerySnapshot.docs.length) {
                        const fetchedDuties = [];
                        dutiesQuerySnapshot.forEach((taskDoc) => {
                            fetchedDuties.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        prisonerData.duties = fetchedDuties;
                    }
                    // Check if the caseAppeal subcollection exists for the current prisoner document
                    const caseAppealQuerySnapshot = await getDocs(collection(doc.ref, "caseAppealRecords"));
                    if (caseAppealQuerySnapshot.docs.length) {
                        const fetchedCaseAppeal = [];
                        caseAppealQuerySnapshot.forEach((taskDoc) => {
                            fetchedCaseAppeal.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        prisonerData.caseAppeal = fetchedCaseAppeal;
                    }
                    // Check if the education records subcollection exists for the current prisoner document
                    const educationQuerySnapshot = await getDocs(collection(doc.ref, "educationRecords"));
                    if (educationQuerySnapshot.docs.length) {
                        const fetchedEducationRecords = [];
                        educationQuerySnapshot.forEach((taskDoc) => {
                            fetchedEducationRecords.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        prisonerData.educationRecords = fetchedEducationRecords;
                    }
                    // Check if the healthRecords subcollection exists for the current prisoner document
                    const healthQuerySnapshot = await getDocs(collection(doc.ref, "healthRecords"));
                    if (healthQuerySnapshot.docs.length) {
                        const fetchedHealthRecords = [];
                        healthQuerySnapshot.forEach((taskDoc) => {
                            fetchedHealthRecords.push({ id: taskDoc.id, ...taskDoc.data() });
                        });
                        prisonerData.healthRecords = fetchedHealthRecords;
                    }
                    // end of subcollection
                    fetchedPrisoners.push(prisonerData);
                }
                setPrisoner(fetchedPrisoners)
            } else {
                console.log("No documents found");
            }

        }
        fetchPrisoner();
    }, [])
    // prisoners all prisoner datas
    const [activePrisoner, setActivePrisoner] = useState([])
    const [visitorRecords, setVisitorRecords] = useState([])
    useEffect(() => {
        const getPrisonerDetails = async () => {
            const visitorCollectionRef = collection(db, "prisoners", activePrisoner.id, "visitorRecords");
            getDocs(visitorCollectionRef).then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const fetchedVisitors = [];
                    querySnapshot.forEach((doc) => {
                        fetchedVisitors.push({ id: doc.id, ...doc.data() });
                    });
                    console.log(fetchedVisitors)
                    setVisitorRecords(fetchedVisitors)
                } else {
                    setErrorOne("we did not find visitor collection");
                }
            });
        }
        getPrisonerDetails()
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
    // adding prisoner functions
    const registerPrisoner = (prisonerName, idNumber, age, homeTown, prisonerNumber, crime, url, imprisonment) => {
        const timestamp = serverTimestamp();
        const prisonerRef = collection(db, "prisoners");
        addDoc(prisonerRef, {
            fullName: prisonerName,
            identificationNumber: idNumber,
            age: age,
            address: homeTown,
            PrisonerAdm: prisonerNumber,
            prisonerImage: url,
            crime: crime,
            admissionDates: timestamp,
            imprisonmentDuration: imprisonment
        })

    }
    // updating prisoner details
    const [selectedPrisoner, setSelectedPrisoner] = useState([])
    const addPrisonerVisitor = async (name, relation) => {
        const prisonerRef = doc(db, "prisoners", selectedPrisoner.id);
        getDoc(prisonerRef).then((doc) => {
            if (doc.exists()) {
                const timestamp = serverTimestamp();
                const prisonerVisitorCollectionRef = collection(db, "prisoners", selectedPrisoner.id, "visitorRecords");
                addDoc(prisonerVisitorCollectionRef, {
                    visitorName: name,
                    relationshipWithPrisoner: relation,
                    visitedOn: timestamp,
                })

            }
        })
    }
    // updating prisoner case appeal record
    const addCaseAppealRecord = async (dates, courtNumber, lawyer, lawyerAddress) => {
        const prisonerRef = doc(db, "prisoners", selectedPrisoner.id);
        getDoc(prisonerRef).then((doc) => {
            if (doc.exists()) {
                const timestamp = serverTimestamp();
                const prisonerVisitorCollectionRef = collection(db, "prisoners", selectedPrisoner.id, "caseAppealRecords");
                addDoc(prisonerVisitorCollectionRef, {
                    updatedOn: timestamp,
                    appealDates: dates,
                    courtNumber: courtNumber,
                    lawyer: lawyer,
                    lawyerAddress: lawyerAddress
                })

            }
        })

    }
    // updating prisoner education
    const addEducationRecord = async (program, instructor, duration, level) => {
        const prisonerRef = doc(db, "prisoners", selectedPrisoner.id);
        getDoc(prisonerRef).then((doc) => {
            if (doc.exists()) {
                const timestamp = serverTimestamp();
                const prisonerVisitorCollectionRef = collection(db, "prisoners", selectedPrisoner.id, "educationRecords");
                addDoc(prisonerVisitorCollectionRef, {
                    updatedOn: timestamp,
                    program: program,
                    instructor: instructor,
                    duration: duration,
                    level: level
                })

            }
        })

    }
    // updating prisoner health record
    const addHealthRecord = async (illness, medication, attendee) => {
        const prisonerRef = doc(db, "prisoners", selectedPrisoner.id);
        getDoc(prisonerRef).then((doc) => {
            if (doc.exists()) {
                const timestamp = serverTimestamp();
                const prisonerVisitorCollectionRef = collection(db, "prisoners", selectedPrisoner.id, "healthRecords");
                addDoc(prisonerVisitorCollectionRef, {
                    updatedOn: timestamp,
                    illness: illness,
                    medication: medication,
                    attendee: attendee
                })

            }
        })

    }
    // updating prisoners duties
    const addDutiesRecord = async (duty, supervisor, location, dates) => {
        const prisonerRef = doc(db, "prisoners", selectedPrisoner.id);
        getDoc(prisonerRef).then((doc) => {
            if (doc.exists()) {
                const timestamp = serverTimestamp();
                const prisonerVisitorCollectionRef = collection(db, "prisoners", selectedPrisoner.id, "dutiesRecords");
                addDoc(prisonerVisitorCollectionRef, {
                    updatedOn: timestamp,
                    duty: duty,
                    supervisor: supervisor,
                    location: location,
                    day: dates

                })

            }
        })

    }











    return (
        <PrisonContext.Provider value={{
            loginInUser, logOutUser, wardens, user, handleAddTask,
            error, verifyWarden, userTask, removeWarden, registerPrisoner, prisoner,
            prisonerData, setActivePrisoner, activePrisoner, removeWarden, addPrisonerVisitor,
            visitorRecords, setSelectedPrisoner, selectedPrisoner, addCaseAppealRecord,
            addEducationRecord, addHealthRecord, addDutiesRecord
        }}>
            {children}
        </PrisonContext.Provider>
    )
}

export default Context