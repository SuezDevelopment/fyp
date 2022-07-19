import Realm from "realm";

const chat = channel => {
    navigation.navigate('Chat', {
      channel,
      currentUser
    });
};



async function onVoteCountChange(objt:any,TaskSchema:any) {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [TaskSchema],
    });

    const obj = realm.objects(objt);
}

async function loadObj(objt:any,TaskSchema:any) {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [TaskSchema],
    });
    const obj = realm.objects(objt);
    return obj;
}

async function writeToObj(objt:any,Schema:any, id:any,variable:any, value:any) {
    const realm = await Realm.open({
        path: "myrealm",
        schema: [Schema],
    });
    realm.write(() => {
        const obj = realm.objectForPrimaryKey(objt, id);
        obj.variable = value;
    })
}

