# validfile
[![NPM version][npm-image]][npm-url]

Assist developers to verify file size, file type, image size

## Instructions
- There are three functions
fileTypeCheck, 
fileSizeCheck, 
imageSizeCheck

### in fileTypeCheck
- receive 
file(type: file)  
allowTypes(type: array)
- return 
true/false

### in fileSizeCheck
- receive 
file - type: file
allowTypes - type: array
units - type: string ('GB'|'MB'|'KB')
- return 
true/false

### in imageSizeCheck
- receive 
file - type: file
width - type: number
height - type: number ('GB'|'MB'|'KB')
- return 
true/false

- imageSizeCheck is an asynchronous function
## Use example
```
import React, { useState } from "react";
import "./App.css";
import { fileTypeCheck, fileSizeCheck, iamgeSizeCheck } from "@nisqy/validfile";
import { Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = async (file) => {
    const typeCheck = fileTypeCheck(file, [".PNG"]);
    if (typeCheck) {
      console.log("文件类型 校验通过", "typeCheck ============", typeCheck);
    } else {
      console.log("文件类型 校验不通过", "typeCheck ============", typeCheck);
    }

    const sizeCheck = fileSizeCheck(file, 200, "KB");
    if (sizeCheck) {
      console.log("文件大小 校验通过", "sizeCheck ============", sizeCheck);
    } else {
      console.log("文件大小 校验不通过", "sizeCheck ============", sizeCheck);
    }

    iamgeSizeCheck(file, 1120, 760).then((valid) => {
      if (valid) {
        console.log("图片尺寸 校验通过", "valid ============", valid);
      } else {
        console.log("图片尺寸 校验不通过", "valid ============", valid);
      }
    });
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>

      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

export default App;
```
