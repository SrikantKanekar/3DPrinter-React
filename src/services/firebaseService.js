import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBTDlOidvCChxu7jqKPUOop-blmW-NJXJU",
    authDomain: "design-server-312705.firebaseapp.com",
    projectId: "design-server-312705",
    storageBucket: "design-server-312705.appspot.com",
    messagingSenderId: "1097772976324",
    appId: "1:1097772976324:web:fc9c6401f812fc4d7ce191"
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();

function uploadFirebaseFile(file, filename, id, progress) {
    const uploadTask = storageRef.child(id + '/' + filename).put(file)

    return new Promise((resolve, reject) => {
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => progress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            error => reject(error),
            async () => {
                const url = await uploadTask.snapshot.ref.getDownloadURL()
                resolve(url)
            }
        )
    })
}

function uploadFirebaseImage(image, id, progress) {
    const uploadTask = storageRef.child(id + '/image').putString(image, 'data_url')

    return new Promise((resolve, reject) => {
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => progress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            error => reject(error),
            async () => {
                const url = await uploadTask.snapshot.ref.getDownloadURL()
                resolve(url)
            }
        )
    })
}

function deleteFirebaseFolder(id, proceed) {
    let deletedOne = false;

    const deleteTask = storageRef.child(id);
    deleteTask.listAll().then(dir => {
        dir.items.forEach(fileRef => {
            const dirRef = firebase.storage().ref(fileRef.fullPath);
            dirRef.getDownloadURL().then(function (url) {
                const imgRef = firebase.storage().refFromURL(url);
                imgRef.delete().then(function () {
                    if (deletedOne) proceed();
                    deletedOne = true;
                }).catch(function (error) {
                    proceed()
                });
            });
        });
    }).catch(error => {
        proceed()
    });
}

const Firebase = {
    uploadFirebaseFile,
    uploadFirebaseImage,
    deleteFirebaseFolder
}

export default Firebase