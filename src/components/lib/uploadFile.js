import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadFile = async(file) =>{

    return new Promise((resolve, reject)=>{
        const date= new Date();
        const storage = getStorage();
        const storageRef = ref(storage, `images/${date + file.name}`);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            // Handle unsuccessful uploads
            reject("Something went wrong while uploading Avatar!!!!")
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            });
        }
        );
    })
}

export default uploadFile;