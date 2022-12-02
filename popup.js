const profileNetworkApi = "https://www.linkedin.com/voyager/api/identity/profiles/ACoAAAC2eqYB5Eg-JCzGJxAmnBCGS72UBnYyaA8/networkinfo";
const converstionsApi = "https://www.linkedin.com/voyager/api/messaging/conversations";

const domain = "https://www.linkedin.com";


async function setConnectionCount(domain, api) {
    const JSESSIONID = await chrome.cookies.get({"url": domain, "name": "JSESSIONID"});

    const xhr = new XMLHttpRequest();
    xhr.open('GET', api, true);
    xhr.setRequestHeader("csrf-token", JSESSIONID.value.replace(/"/g, ''));

    xhr.onload = function() {
        if (xhr.status == 200) {
            let data = JSON.parse(this.response);
            document.getElementById("connectionsCount").innerText = data.connectionsCount;
        }
    }

    xhr.send();
}
async function setMessagesCount(domain, api) {
    const JSESSIONID = await chrome.cookies.get({"url": domain, "name": "JSESSIONID"});

    const xhr = new XMLHttpRequest();
    xhr.open('GET', api, true);
    xhr.setRequestHeader("csrf-token", JSESSIONID.value.replace(/"/g, ''));

    xhr.onload = function() {
        if (xhr.status == 200) {
            let data = JSON.parse(this.response);
            let messageCount = 0;
            data.elements.forEach(element => {
                messageCount = messageCount + element.totalEventCount;
            });
            document.getElementById("messagesCount").innerText = messageCount;
        }
    }

    xhr.send();
}
async function setFollowingCount(domain, api) {
    const JSESSIONID = await chrome.cookies.get({"url": domain, "name": "JSESSIONID"});

    const xhr = new XMLHttpRequest();
    xhr.open('GET', api, true);
    xhr.setRequestHeader("csrf-token", JSESSIONID.value.replace(/"/g, ''));

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(this.response);
            document.getElementById("followersCount").innerText = data.followersCount;
        }
    }

    xhr.send();
}



setConnectionCount(domain, profileNetworkApi);
setMessagesCount(domain, converstionsApi);
setFollowingCount(domain, profileNetworkApi);
