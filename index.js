/**
 * @description  文件类型校验
 * @param {
 *  file: file // 校验的文件对象
 *  allowTypes: [] // 合法的文件类型
 * }
 * @return {boolean}
 * */
function fileTypeCheck(file, allowTypes) {
  let result;
  const fileName = file.name;
  const postfix = fileName.substring(fileName.lastIndexOf(".")).toUpperCase();
  if (allowTypes.indexOf(postfix) < 0) {
    result = false;
  } else {
    result = true;
  }
  return result;
}

/**
 * @description  文件大小校验
 * @param {
 *  file: file // 校验的文件对象
 *  allowSize: number // 允许的文件大小
 *  units: string 'GB'|'MB'|'KB' // 描述文件大小的单位
 * }
 * @return {boolean}
 * */
function fileSizeCheck(file, allowSize, units) {
  let result;
  const maps = {
    GB: 30,
    MB: 20,
    KB: 10,
  };
  const reallySize = allowSize * Math.pow(2, maps[units]);
  if (file.size > reallySize) {
    result = false;
  } else {
    result = true;
  }
  return result;
}

/**
 * @description  校验图片宽高
 * @param {
 *  file: file // 图片文件
 *  width: number
 *  height: number
 * }
 * @return {boolean}
 * */
function imageSizeCheck(file, width, height) {
  return new Promise((resolve) => {
    const URL = window.URL || window.webkitURL;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.addEventListener("load", function () {
      const valid = img.width === width && img.height === height;
      resolve(valid);
    });
  });
}

export { fileTypeCheck, fileSizeCheck, imageSizeCheck };
