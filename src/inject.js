function communityJSONObjects() {
    const { CoreNode, Page, User, Server } = window.LITHIUM.CommunityJsonObject;
    let communityJSONObject = { CoreNode, Page, User, Server } || null;
    return communityJSONObject;
}

window.postMessage({ type: "FROM_ATLASSIAN", communityData: communityJSONObjects() });