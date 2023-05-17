const fs = require("fs");
const { getHostsFilePath } = require("../utils/hosts");
const path = require("path");
// This API uses the sync methods of fs to keep things in order

class SiteBlocker {
  constructor() {
    this._hostPath = getHostsFilePath();
    this._metaPath = this.getMetaDataDir();

    this._redirectTo = "127.0.0.1";
    this.websites = this.getMetaData();
  }

  getMetaDataDir() {
    let idx = __dirname.indexOf(`\blocker`);
    return path.join(__dirname.slice(0, idx - 6), "/data/sitesMetaData.json");
  }
  // get the data from the sitesMetaData.json file which will be created in the script folder
  getMetaData() {
    try {
      // reading the sitesMetaData.json file and storing this on data
      let data = fs.readFileSync(this._metaPath);
      // parsing the buffer data into string and then again parsing into Javascript Object data format
      let parsedData = JSON.parse(data.toString());
      // returning the sites from the sitesMetaData.json
      return parsedData.sites;
    } catch (error) {
      // if error returning empty arrau
      return [];
    }
  }

  // for updating the sitesMetaData.json file with newly added sites
  updateMetaData() {
    // checking is the file exist or not
    if (!fs.existsSync(this._metaPath)) {
      // creating the file with empty data
      fs.open(this._metaPath, "w", function (err, file) {
        if (err) throw err;
      });
    }
    // writing the new sites to the sitesmetaData.json file
    fs.writeFileSync(this._metaPath, JSON.stringify({ sites: this.websites }));
  }

  // add sites to the SiteBlocker which can be blocked and unblocked using @blockSites and @unBlockSites method
  addSites(...sites) {
    // looping through all of the sites
    for (let site of sites) {
      // checking is it already exits or not
      if (!this.websites.includes(site)) {
        // if not exits
        this.websites.push(site);
      }
    }
    // updating the siteMetaData.json file with new websites
    this.updateMetaData();
  }

  _removeSites() {
    // is the file exist
    if (!fs.existsSync(this._metaPath)) {
      fs.open(this._metaPath, "w", function (err, file) {
        if (err) throw err;
      });
    }
    fs.writeFileSync(this._metaPath, "");
    this.websites = [];
  }

  blockSite(site) {
    if (!this.websites.includes(site)) {
      // creating a single entry for the host file of the operating system
      let hostSingleEntry = "\n" + this._redirectTo + " " + site;
      // appending this entry into the host file
      fs.appendFileSync(this._hostPath, hostSingleEntry);
      console.log("Successfully Blocked :" + " " + site);

      this.websites.push(site);
      this.updateMetaData();
    }
  }

  blockSites() {
    // reading the host file
    let data = fs.readFileSync(this._hostPath);
    let hostContents = data.toString();
    let appendContents = "";
    for (let i = 0; i < this.websites.length; i++) {
      let hostSingleEntry = "\n" + this._redirectTo + " " + this.websites[i];
      // if the hostContents does not have the new created entry we are appending
      if (hostContents.indexOf(hostSingleEntry) < 0) {
        appendContents += hostSingleEntry;
      } else {
        console.log(this.websites[i] + " is present in blocks list.");
      }
    }

    if (appendContents) fs.appendFileSync(this._hostPath, appendContents);
    console.log(
      "Those sites are blocked using SiteBlocker :" +
        "\n " +
        this.websites.join(",")
    );
  }

  unBlockSite(site) {
    let idx = this.websites.indexOf(site);
    if (idx >= 0) {
      let hostContents = "";
      let hostData = fs.readFileSync(this._hostPath);
      hostData
        .toString()
        .split("\n")
        .forEach((line) => {
          // hostContents contain everything except the provided site entry
          if (line.indexOf(site) < 0) {
            hostContents += line + "\n";
          }
        });

      fs.writeFileSync(this._hostPath, hostContents);
      console.log("Successfully unblocked  : " + site);
      this.websites = this.websites.filter((val, i) => i !== idx);
      this.updateMetaData();
    } else console.log("this site is not blocked!");
  }

  unBlockSites() {
    let hostContents = "";
    let hostData = fs.readFileSync(this._hostPath);
    hostData
      .toString()
      .split("\n")
      .forEach((line, i) => {
        let shouldInclude = true;
        // everything should include except the website entry that found in the
        for (let i of this.websites) {
          if (line.includes(i)) {
            shouldInclude = false;
            break;
          }
        }
        if (shouldInclude) hostContents += line + "\n";
      });

    fs.writeFileSync(this._hostPath, hostContents);
    console.log("Successfully unblocked : " + this.websites.join(","));

    // is the file exist
    if (!fs.existsSync(this._metaPath)) {
      fs.open(this._metaPath, "w", function (err, file) {
        if (err) throw err;
      });
    }
    // emptything the sitesMetaData.json
    this.websites = [];
    this.updateMetaData();
  }
}

module.exports = SiteBlocker;
