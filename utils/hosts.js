function getHostsFilePath() {
  let osValue = process.platform;
  if (osValue == "darwin") {
    return "/private/etc/hosts";
  } else if (osValue == "win32") {
    return "C:/Windows/System32/drivers/etc/hosts";
  } else if (osValue == "linux") {
    return "/etc/hosts";
  } else {
    return "/etc/hosts";
  }
}

module.exports = {
  getHostsFilePath,
};
