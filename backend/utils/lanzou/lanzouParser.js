const axios = require("axios");
const { JSDOM } = require("jsdom");

const UserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36";

async function parseLanzouUrl(params) {
  const { url: inputUrl, pwd, type, n: rename } = params;

  if (!inputUrl) {
    return { code: 1, msg: "请输入URL" };
  }

  const url = inputUrl;

  try {
    const firstResponse = await axios.get(url, {
      headers: getHeaders(url),
    });

    if (firstResponse.data.includes("文件取消分享了")) {
      return { code: 1, msg: "文件取消分享了" };
    }

    const dom = new JSDOM(firstResponse.data);
    const document = dom.window.document;

    let fileName =
      document.querySelector(
        'div[style="font-size: 30px;text-align: center;padding: 56px 0px 20px 0px;"]'
      )?.textContent ||
      document.querySelector(".n_box_3fn")?.textContent ||
      document.querySelector(".b span")?.textContent;

    const fileSize =
      document
        .querySelector(".n_filesize")
        ?.textContent.replace("大小：", "") ||
      document.querySelector("span.p7")?.nextSibling?.textContent?.trim();

    if (firstResponse.data.includes("function down_p()")) {
      if (!pwd) {
        return { code: 1, msg: "请输入分享密码" };
      }

      const sign = firstResponse.data
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .match(/'sign':'(.*?)',/)[1];
      const fileId = firstResponse.data
        .replace(`//url : '/ajaxm.php?file=1',//`, "")
        .match(/url\s*:\s*'\/ajaxm\.php\?file=(\d+)(?=[^\/]*')/)[1];

      const postResult = await axios.post(
        `${inputUrl.split(".com/")[0]}.com/ajaxm.php?file=${fileId}`,
        new URLSearchParams({
          action: "downprocess",
          sign,
          p: pwd,
          kd: 1,
        }),
        {
          headers: getHeaders(url),
        }
      );

      if (postResult.data.zt !== 1) {
        return { code: 1, msg: postResult.data.inf };
      }

      fileName = postResult.data.inf;
      return await handleFinalUrl(postResult.data, {
        fileName,
        fileSize,
        rename,
        type,
      });
    } else {
      const iframeSrc = document.querySelector("iframe")?.src;
      if (!iframeSrc) return { code: 1, msg: "无法解析下载页面" };

      const iframeResponse = await axios.get(
        `${inputUrl.split(".com/")[0]}.com${iframeSrc}`,
        {
          headers: getHeaders(url),
        }
      );

      const sign = iframeResponse.data.match(/wp_sign = '(.*?)'/)[1];
      const fileId = iframeResponse.data
        .replace(`//url : '/ajaxm.php?file=1',//`, "")
        .match(/url\s*:\s*'\/ajaxm\.php\?file=(\d+)(?=[^\/]*')/)[1];

      const postResult = await axios.post(
        `${inputUrl.split(".com/")[0]}.com/ajaxm.php?file=${fileId}`,
        new URLSearchParams({
          action: "downprocess",
          signs: "?ctdf",
          sign,
          kd: 1,
        }),
        { headers: getHeaders(`${inputUrl.split(".com/")[0]}.com${iframeSrc}`) }
      );

      if (postResult.data.zt !== 1) {
        return { code: 1, msg: postResult.data.inf };
      }

      return await handleFinalUrl(postResult.data, {
        fileName,
        fileSize,
        rename,
        type,
      });
    }
  } catch (error) {
    console.error("解析错误:", error);
    return {
      code: 1,
      msg: "解析异常",
      error: error?.message || error?.toString(),
    };
  }
}

async function handleFinalUrl(data, { fileName, fileSize, rename, type }) {
  const downUrl1 = `${data.dom}/file/${data.url}`;

  const response = await axios.head(downUrl1, {
    headers: {
      ...getHeaders("https://developer.lanzoug.com"),
      Cookie:
        "down_ip=1; expires=Sat, 16-Nov-2019 11:42:54 GMT; path=/; domain=.baidupan.com",
    },
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
  });

  let finalUrl = response.headers.location || downUrl1;

  if (rename) {
    const [base] = finalUrl.split("?fn=");
    finalUrl = `${base}?fn=${encodeURIComponent(rename)}`;
  }

  finalUrl = finalUrl.replace(/pid=.*?(&|$)/, "");

  if (type === "down") {
    return { code: 0, msg: "跳转下载", data: { redirect: finalUrl } };
  }

  return {
    code: 0,
    msg: "解析成功",
    data: {
      name: fileName,
      filesize: fileSize,
      downUrl: finalUrl,
    },
  };
}

function getHeaders(referer) {
  return {
    "User-Agent": UserAgent,
    "X-FORWARDED-FOR": randIP(),
    "CLIENT-IP": randIP(),
    Referer: referer,
  };
}

function randIP() {
  const arr = [
    "218",
    "218",
    "66",
    "66",
    "218",
    "218",
    "60",
    "60",
    "202",
    "204",
    "66",
    "66",
    "66",
    "59",
    "61",
    "60",
    "222",
    "221",
    "66",
    "59",
    "60",
    "60",
    "66",
    "218",
    "218",
    "62",
    "63",
    "64",
    "66",
    "66",
    "122",
    "211",
  ];
  return `${arr[Math.floor(Math.random() * arr.length)]}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

module.exports = parseLanzouUrl;
