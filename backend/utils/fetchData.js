const axios = require("axios");
const qs = require("qs");

async function getLoggerInfo(folderUrl) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/1",
    };

    // 发送初始 GET 请求
    const response = await axios.get(folderUrl, { headers });
    const html = response.data;

    // 使用正则表达式提取参数
    const kName = html.match(/'k':(.*?),/)[1];
    const tName = html.match(/'t':(.*?),/)[1];
    const fid = html.match(/'fid':(.*?),/)[1].replace(/'/g, "");
    const uid = html.match(/'uid':(.*?),/)[1].replace(/'/g, "");

    // 构造动态正则表达式
    const kRegex = new RegExp(`var ${kName} = '(.*?)';`);
    const tRegex = new RegExp(`var ${tName} = '(.*?)';`);

    const k = html.match(kRegex)[1];
    const t = html.match(tRegex)[1];

    // 构造请求 URL
    const mainUrl = folderUrl.split(".com")[0] + ".com";
    const postUrl = `${mainUrl}/filemoreajax.php?file=${fid}`;

    // 准备 POST 数据
    const data = qs.stringify({
      lx: "2",
      fid: fid,
      uid: uid,
      pg: "1",
      rep: "0",
      t: t,
      k: k,
      up: "1",
      vip: "0",
      webfoldersign: "",
    });
    // 发送 POST 请求
    const postResponse = await axios.post(postUrl, data, {
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // 解析 JSON 响应
    const jsonData = postResponse.data;
    jsonData.text.forEach((element) => {
      element.url = mainUrl + "/" + element["id"];
    });
    return jsonData.text;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getPluginCenterInfo(url) {
  try {
    let { data } = await axios.get(url);
    // 全局替换所有连续的 }{ 为 },{
    data = data.replace(/}{/g, "},{");
    // 包裹成JSON数组
    data = "[" + data + "]";
    return JSON.parse(data);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getSeerBiliBiliInfo(mid) {
  try {
    const url = `https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed/space?host_mid=${mid}`;
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    };
    const response = await axios.get(url, { headers });
    const jsonData = response.data.data.items;

    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getSeerServerInfo(url) {
  try {
    let { data } = await axios.get(url);
    data = JSON.stringify(data).replace(/\\\\/g, "");
    const json_data = JSON.parse(data);

    // 修复对象比较问题
    if (Object.keys(json_data).length === 0) {
      return data;
    }

    if (json_data[0]?.type === 1) {
      return JSON.stringify(json_data, null, 4);
    } else {
      return "未开服";
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  getLoggerInfo,
  getSeerBiliBiliInfo,
  getPluginCenterInfo,
  getSeerServerInfo,
};
