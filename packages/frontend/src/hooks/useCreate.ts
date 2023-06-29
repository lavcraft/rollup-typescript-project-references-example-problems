import {create} from "@project/sdk/actions/create";
import {SDKUser} from "@project/sdk/models/user";

const user: SDKUser = {
    id: '2',
    name: 'name'
}

create(user);