import {authReducer} from "../../auth/authReducer";
import {types} from "../../types/types";

describe("Testing authReducer", () => {

    test('should return default state', () => {
       const state = authReducer({logged:false}, {});

       expect(state).toEqual({logged:false})
    });

    test('should authenticate and enter the user name', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'test'
            }
        }

        const state = authReducer({logged:false}, action);

        expect(state).toEqual({
            logged:true,
            name: 'test'
        })

    });

    test('should delete the user name and set the logged in to false', () => {
        const action = {  type: types.logout }

        const state = authReducer({logged: true, name: 'test'}, action);

        expect(state).toEqual({ logged: false })
    })

});