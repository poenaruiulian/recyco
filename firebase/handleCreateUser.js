import { auth, database } from "./config";
import { ref, set } from "firebase/database";

export const handleCreateUser = ({ username, mail }) => {
  const userData = {
    mail,
    username,
    id: auth.currentUser.uid,
    totalPoints: 0,
    plasticObjects: 0,
    paperObjects: 0,
    aluminumObjects: 0,
    achivementPoints: 0,
    rewardsIDs: [-1],
  };

  const usersRef = ref(database, "users/" + auth.currentUser.uid);
  set(usersRef, userData).then(() => console.log("Registered with success"));
};
