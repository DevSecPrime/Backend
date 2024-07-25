const File = require("../models/file");
const cloudinary = require("cloudinary").v2;



exports.localFileUpload = async (req, res) => {
    try {
        //1. fetch file from ----------> req.files.fileName
        const file = req.files.file;
        console.log("UPLOADED FILE IS :- ", file);

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "file not found..."
            });
        }

        //2. give path to file ----> __(currentDirName) + "/(new file path)/" + "(Date.now()---> for store name with todays date) + extension of the file ---> here, ($`.file.name.split(".")[1]`)
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;  //most imp to learn
        console.log("PATH ------------->", path);

        //3. move file to that path 
        file.mv(path, (error) => {
            if (error) {
                console.error("Error while moving file...", error);
                return;
            }
            console.log("File is moved successfully...")
        });

        //create success response....
        res.status(200).json({
            success: true,
            message: "Local file uloaded successfully..."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Opps!...Having error in Uploading image"
        })
    }
};

//verifies that fileType is supported to supportedFileType
function isSupportedFileType(type, supportedFileType) {
    return supportedFileType.includes(type)
}

///fucntion to upload the image on cloudinary
async function uploadFleToCloudinary(file, folder, quality) {
    const options = { folder };
    console.log("temp file path :- ", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
//imageUpload handler
exports.imageUpload = async (req, res) => {
    try {
        //fetch data from req.body...
        const { name, tags, email } = req.body;
        console.log("name:", name);
        console.log("tags:", tags);
        console.log("emai:", email);

        //req.files.fileName
        const file = req.files.imageFile;
        console.log("The file is:-", file)

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is Missing..."
            })
        }

        //validation of file
        const supportedFileType = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type :-", fileType);

        //now we need to verify that file type is existing in supportedFileType --> apni fileType supportedFileType mei hei ki nahi

        if (!isSupportedFileType(fileType, supportedFileType)) {
            return res.status(400).json({
                success: false,
                message: "Oops!...File type is not supported."
            })
        }
        ///if fileType is supported/existing upload it to cloudinary
        console.log("Uploading file to DevSecPrime----------------------")
        const response = await uploadFleToCloudinary(file, "DevSecPrime");
        console.log("response:- ", response);

        //store all data to database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

        //success response...
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully...",
            file: fileData

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong..."
        })
    }
}

//VIDEO UPLOAD
exports.videoUpload = async (req, res) => {
    try {
        //fetch data from req.body...
        const { name, tags, email } = req.body;
        console.log("name:", name);
        console.log("tags:", tags);
        console.log("emai:", email);

        //req.files.fileName
        const file = req.files.videoFile;
        console.log("The file is:-", file)

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is Missing..."
            })
        }


        //check if file size is greater than 5 MB

        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                messsage: "File size must be less than 50 MB..."
            })
        }

        //validation of file
        const supportedFileType = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type :-", fileType);

        //now we need to verify that file type is existing in supportedFileType --> apni fileType supportedFileType mei hei ki nahi

        if (!isSupportedFileType(fileType, supportedFileType)) {
            return res.status(400).json({
                success: false,
                message: "Oops!...File type is not supported."
            })
        }
        ///if fileType is supported/existing upload it to cloudinary
        console.log("Uploading file to DevSecPrime----------------------")
        const response = await uploadFleToCloudinary(file, "DevSecPrime");
        console.log("response:- ", response);

        //store all data to database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

        //success response...
        res.status(200).json({
            success: true,
            message: "Video uploaded successfully...",
            file: fileData

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong..."
        })
    }
}

//upload reduced size image
exports.reducedImageUpload = async (req, res) => {
    try {
        //fetch data from req.body...
        const { name, tags, email } = req.body;
        console.log("name:", name);
        console.log("tags:", tags);
        console.log("emai:", email);

        //req.files.fileName
        const file = req.files.imageFile;
        console.log("The file is:-", file)

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File is Missing..."
            })
        }

        //validation of file
        const supportedFileType = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type :-", fileType);

        //now we need to verify that file type is existing in supportedFileType --> apni fileType supportedFileType mei hei ki nahi

        if (!isSupportedFileType(fileType, supportedFileType)) {
            return res.status(400).json({
                success: false,
                message: "Oops!...File type is not supported."
            })
        }
        ///if fileType is supported/existing upload it to cloudinary
        console.log("Uploading file to DevSecPrime----------------------")
        const response = await uploadFleToCloudinary(file, "DevSecPrime", 50);
        console.log("response:- ", response);

        //store all data to database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

        //success response...
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully...",
            file: fileData

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong..."
        })
    }
}
